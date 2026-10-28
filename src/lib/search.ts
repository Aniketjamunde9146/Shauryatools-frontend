import { tools, type Tool } from "@/data/toolsData";
import { SEARCH_KEYWORDS } from "@/data/searchKeywords";
import { SEARCH_ALIASES, SYNONYM_GROUPS } from "@/data/searchAliases";
import { getGroup } from "@/lib/toolMeta";

/**
 * Client-side tool search. How it works is documented in docs/SEARCH.md.
 *
 *  1. Normalise and tokenise the query (lowercase, strip accents and punctuation, drop filler words, light stemming).
 *  2. Score every query word against five fields of each tool, weighted by how much each field says about intent.
 *  3. A tool must match every word (AND). If nothing does, fall back to tools that match some words.
 *  4. Rank by score, with bonuses when the whole query matches the name or a known phrase.
 *  5. With no results, suggest a corrected spelling.
 */

export const WEIGHTS = { name: 10, slug: 8, keywords: 6, category: 3, description: 2 } as const;

/** A synonym match counts for this share of an equivalent direct match. */
const SYNONYM_FACTOR = 0.6;

const STOPWORDS = new Set(
  "a an the to for of and in on with from by or is it my me your free online tool tools best new app".split(" "),
);

export interface SearchHit {
  tool: Tool;
  score: number;
  /** True when the tool matched only some of the words in the query. */
  partial: boolean;
}

export interface SearchResult {
  hits: SearchHit[];
  /** Words to highlight in the results. */
  terms: string[];
  /** "empty": nothing searchable was typed (blank or only filler words). */
  mode: "exact" | "partial" | "none" | "empty";
  /** A corrected query to offer when nothing matched. */
  suggestion?: string;
}

/* ── Text normalisation ── */

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const tokenize = (text: string): string[] => normalize(text).split(" ").filter(Boolean);

/** Drops a plural "s" ("calculators" → "calculator") but leaves "analysis", "bonus" and "class" alone. */
function stem(token: string): string {
  if (token.length > 3 && token.endsWith("s") && !/(ss|us|is)$/.test(token)) return token.slice(0, -1);
  return token;
}

const searchableTokens = (text: string): string[] =>
  tokenize(text)
    .filter((t) => !STOPWORDS.has(t))
    .map(stem);

/* ── Edit distance (optimal string alignment: counts a swapped pair as one typo) ── */

function osa(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2: number[] = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const cur: number[] = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, prev2[j - 2] + 1);
      }
      cur[j] = value;
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[b.length];
}

/* ── Index (built once, on first search) ── */

interface Field {
  tokens: string[];
  weight: number;
}

interface Entry {
  tool: Tool;
  nameNorm: string;
  fields: Field[];
  /** Normalised keyword and alias phrases, for whole-phrase bonuses. */
  phrases: string[];
}

let index: Entry[] | null = null;
let vocabulary: string[] = [];

const synonyms = new Map<string, Set<string>>();
for (const group of SYNONYM_GROUPS) {
  const stems = group.map((word) => stem(normalize(word)));
  for (const a of stems) {
    if (!synonyms.has(a)) synonyms.set(a, new Set());
    for (const b of stems) if (a !== b) synonyms.get(a)!.add(b);
  }
}

function buildIndex() {
  const vocab = new Set<string>();
  index = tools.map((tool) => {
    const extra = [...(SEARCH_KEYWORDS[tool.slug] ?? []), ...(SEARCH_ALIASES[tool.slug] ?? [])];
    const fields: Field[] = [
      { tokens: searchableTokens(tool.name), weight: WEIGHTS.name },
      { tokens: searchableTokens(tool.slug.replace(/-/g, " ")), weight: WEIGHTS.slug },
      { tokens: extra.flatMap(searchableTokens), weight: WEIGHTS.keywords },
      { tokens: searchableTokens(`${tool.category} ${getGroup(tool).label}`), weight: WEIGHTS.category },
      { tokens: searchableTokens(tool.description), weight: WEIGHTS.description },
    ];
    for (const field of fields) for (const token of field.tokens) if (token.length >= 3) vocab.add(token);
    return { tool, nameNorm: normalize(tool.name), fields, phrases: extra.map(normalize) };
  });
  vocabulary = [...vocab];
}

/* ── Scoring ── */

/** How well query word `q` matches indexed word `t`, from 0 (no match) to 1 (identical). */
function matchToken(q: string, t: string, allowFuzzy: boolean): number {
  if (q === t) return 1;
  if (q.length < 2) return 0;
  if (t.startsWith(q)) return 0.7 + 0.25 * (q.length / t.length); // typing "calc" finds "calculator"
  if (q.length >= 4 && t.includes(q)) return 0.3; // short words never match mid-word, so "age" won't find "image"
  if (allowFuzzy && q.length >= 4 && q[0] === t[0]) {
    const max = q.length <= 5 ? 1 : 2;
    const distance = osa(q, t, max);
    if (distance <= max) return distance === 1 ? 0.55 : 0.4;
  }
  return 0;
}

/** Best weighted score for one query word across all fields of one tool, including synonyms. */
function tokenScore(q: string, entry: Entry): number {
  const alternatives = synonyms.get(q);
  let best = 0;
  for (const field of entry.fields) {
    for (const token of field.tokens) {
      let score = matchToken(q, token, true) * field.weight;
      if (alternatives) {
        for (const alt of alternatives) {
          score = Math.max(score, matchToken(alt, token, false) * field.weight * SYNONYM_FACTOR);
        }
      }
      if (score > best) best = score;
    }
  }
  return best;
}

function phraseBonus(entry: Entry, phrase: string): number {
  if (entry.nameNorm === phrase) return 60;
  if (entry.nameNorm.startsWith(phrase)) return 25;
  if (entry.nameNorm.includes(phrase)) return 15;
  if (phrase.length >= 3 && entry.phrases.some((p) => p.includes(phrase))) return 8;
  return 0;
}

/** Equal scores keep catalogue order (toolsData ids), so the more established tool comes first. */
const byRank = (a: SearchHit, b: SearchHit) => b.score - a.score || a.tool.id - b.tool.id;

function run(query: string): Omit<SearchResult, "suggestion"> & { words: string[]; stems: string[] } {
  const words = tokenize(query).filter((t) => !STOPWORDS.has(t));
  if (!words.length) return { hits: [], terms: [], mode: "empty", words, stems: [] };

  if (!index) buildIndex();
  const stems = words.map(stem);
  const phrase = normalize(query);
  const terms = [...new Set([...words, ...stems])];

  const scored = index!.map((entry) => ({ entry, per: stems.map((q) => tokenScore(q, entry)) }));

  const strict: SearchHit[] = scored
    .filter(({ per }) => per.every((v) => v > 0))
    .map(({ entry, per }) => ({
      tool: entry.tool,
      score: per.reduce((a, b) => a + b, 0) + phraseBonus(entry, phrase),
      partial: false,
    }))
    .sort(byRank);
  if (strict.length) return { hits: strict, terms, mode: "exact", words, stems };

  if (stems.length >= 2) {
    const loose: SearchHit[] = scored
      .filter(({ per }) => per.some((v) => v > 0))
      .map(({ entry, per }) => {
        const matched = per.filter((v) => v > 0).length;
        return {
          tool: entry.tool,
          score: per.reduce((a, b) => a + b, 0) * (matched / stems.length) * 0.5,
          partial: true,
        };
      })
      .sort(byRank);
    if (loose.length) return { hits: loose, terms, mode: "partial", words, stems };
  }

  return { hits: [], terms, mode: "none", words, stems };
}

/** Replaces unknown words with the closest known word, but only if the corrected query finds something. */
function suggest(words: string[], stems: string[]): string | undefined {
  let changed = false;
  const corrected = words.map((word, i) => {
    const q = stems[i];
    if (q.length < 4 || vocabulary.includes(q)) return word;
    let best: string | undefined;
    let bestDistance = 3;
    for (const candidate of vocabulary) {
      if (candidate[0] !== q[0]) continue;
      const distance = osa(q, candidate, 2);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    }
    if (best && bestDistance <= 2) {
      changed = true;
      return best;
    }
    return word;
  });
  if (!changed) return undefined;
  const suggestion = corrected.join(" ");
  return run(suggestion).hits.length ? suggestion : undefined;
}

export function searchTools(query: string): SearchResult {
  const { words, stems, ...result } = run(query);
  if (result.mode === "none") return { ...result, suggestion: suggest(words, stems) };
  return result;
}

/* ── Highlighting ── */

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Splits `text` into pieces, marking the parts that start with a search term. */
export function highlightParts(text: string, terms: string[]): { text: string; match: boolean }[] {
  const safe = [...new Set(terms)]
    .filter((t) => t.length >= 2)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (!safe.length) return [{ text, match: false }];

  const pattern = new RegExp(`\\b(?:${safe.join("|")})`, "gi");
  const parts: { text: string; match: boolean }[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const start = m.index ?? 0;
    if (start > last) parts.push({ text: text.slice(last, start), match: false });
    parts.push({ text: m[0], match: true });
    last = start + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), match: false });
  return parts.length ? parts : [{ text, match: false }];
}
