// Pure logic for the tools. No React here, so every function can be unit-tested directly.

/* ---------- Word counter ---------- */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
}

export function textStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  return {
    words,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences,
    paragraphs,
    readingMinutes: words / 200,
    speakingMinutes: words / 130,
  };
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0 sec";
  if (minutes < 1) return `${Math.round(minutes * 60)} sec`;
  return `${minutes.toFixed(1)} min`;
}

/* ---------- Case converter ---------- */

export type CaseMode = "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "kebab" | "constant";

export const CASE_MODES: { id: CaseMode; label: string }[] = [
  { id: "upper", label: "UPPERCASE" },
  { id: "lower", label: "lowercase" },
  { id: "title", label: "Title Case" },
  { id: "sentence", label: "Sentence case" },
  { id: "camel", label: "camelCase" },
  { id: "snake", label: "snake_case" },
  { id: "kebab", label: "kebab-case" },
  { id: "constant", label: "CONSTANT_CASE" },
];

/** Splits text into words, including camelCase boundaries ("helloWorld" -> ["hello", "World"]). */
export function splitWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

export function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.toLowerCase().replace(/(^|[\s\-(["'])([a-z])/g, (_m, pre: string, c: string) => pre + c.toUpperCase());
    case "sentence":
      return text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (_m, pre: string, c: string) => pre + c.toUpperCase());
    case "camel":
      return splitWords(text)
        .map((w, i) => {
          const lower = w.toLowerCase();
          return i === 0 ? lower : lower[0].toUpperCase() + lower.slice(1);
        })
        .join("");
    case "snake":
      return splitWords(text).map((w) => w.toLowerCase()).join("_");
    case "kebab":
      return splitWords(text).map((w) => w.toLowerCase()).join("-");
    case "constant":
      return splitWords(text).map((w) => w.toUpperCase()).join("_");
  }
}

/* ---------- Lorem ipsum ---------- */

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat",
];

/** Deterministic placeholder text: the same input always gives the same output (safe to render on the server). */
export function loremText(paragraphs: number, sentencesPerParagraph = 4, wordsPerSentence = 9): string {
  let i = 0;
  const out: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencesPerParagraph; s++) {
      const words: string[] = [];
      for (let w = 0; w < wordsPerSentence; w++) {
        words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
        i++;
      }
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      sentences.push(words.join(" ") + ".");
    }
    out.push(sentences.join(" "));
  }
  return out.join("\n\n");
}

/* ---------- Color contrast (WCAG 2.x) ---------- */

export type RGB = [number, number, number];

/** Accepts #rgb or #rrggbb, with or without the leading #. Returns null for anything else. */
export function parseHex(input: string): RGB | null {
  const hex = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    return [0, 1, 2].map((i) => parseInt(hex[i] + hex[i], 16)) as RGB;
  }
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;
  }
  return null;
}

export function toHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function channel(value: number): number {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function luminance([r, g, b]: RGB): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: RGB, b: RGB): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export function wcagLevels(ratio: number) {
  return {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5,
  };
}

/* ---------- Time zones ---------- */

/** Curated list: the same on server and browser, so the page renders identically before hydration. */
export const TIME_ZONES = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Africa/Johannesburg",
  "America/Sao_Paulo",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
];

function offsetMinutes(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const get = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  const wallClockAsUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  const truncated = instant.getTime() - instant.getUTCMilliseconds();
  return (wallClockAsUTC - truncated) / 60000;
}

/** Turns a wall-clock time in a given zone ("2026-01-01T12:00") into the real instant. Handles daylight saving. */
export function zonedToInstant(local: string, timeZone: string): Date {
  const [datePart, timePart = "00:00"] = local.split("T");
  const [y, mo, d] = datePart.split("-").map(Number);
  const [h, mi] = timePart.split(":").map(Number);
  const asUTC = Date.UTC(y, mo - 1, d, h, mi, 0);
  const first = asUTC - offsetMinutes(new Date(asUTC), timeZone) * 60000;
  // A second pass corrects for the offset changing around a DST switch.
  return new Date(asUTC - offsetMinutes(new Date(first), timeZone) * 60000);
}

export function formatInZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone, dateStyle: "medium", timeStyle: "short" }).format(date);
}

/* ---------- Date difference ---------- */

interface YMD {
  y: number;
  m: number;
  d: number;
}

function parseYmd(s: string): YMD {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m, d };
}

const daysInMonth = (year: number, month: number) => new Date(Date.UTC(year, month, 0)).getUTCDate();

export interface DateDifference {
  reversed: boolean;
  totalDays: number;
  weeks: number;
  remainderDays: number;
  hours: number;
  years: number;
  months: number;
  days: number;
}

/** Dates are "YYYY-MM-DD". The result is the same whichever date comes first. */
export function dateDifference(startStr: string, endStr: string): DateDifference {
  const reversed = startStr > endStr;
  const [a, b] = reversed ? [endStr, startStr] : [startStr, endStr];
  const sa = parseYmd(a);
  const sb = parseYmd(b);
  const totalDays = Math.round((Date.UTC(sb.y, sb.m - 1, sb.d) - Date.UTC(sa.y, sa.m - 1, sa.d)) / 86400000);

  let years = sb.y - sa.y;
  let months = sb.m - sa.m;
  let days = sb.d - sa.d;
  if (days < 0) {
    months--;
    const prevMonth = sb.m === 1 ? 12 : sb.m - 1;
    const prevYear = sb.m === 1 ? sb.y - 1 : sb.y;
    days += daysInMonth(prevYear, prevMonth);
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    reversed,
    totalDays,
    weeks: Math.floor(totalDays / 7),
    remainderDays: totalDays % 7,
    hours: totalDays * 24,
    years,
    months,
    days,
  };
}

/* ---------- Tip calculator ---------- */

export function splitBill(bill: number, tipPercent: number, people: number) {
  const n = Math.max(1, Math.floor(people) || 1);
  const tip = (bill * tipPercent) / 100;
  const total = bill + tip;
  return { tip, total, perPerson: total / n, people: n };
}

/* ---------- Unix timestamp ---------- */

/** Accepts seconds or milliseconds. Values above 1e12 are treated as milliseconds (year 2001 onward). */
export function unixToIso(value: number): string | null {
  if (!Number.isFinite(value)) return null;
  const ms = Math.abs(value) > 1e12 ? value : value * 1000;
  const d = new Date(ms);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** "YYYY-MM-DDTHH:mm" read as UTC, returned in whole seconds. */
export function isoToUnix(local: string): number | null {
  const ms = Date.parse(local.length === 16 ? `${local}:00Z` : `${local}Z`);
  return Number.isNaN(ms) ? null : Math.floor(ms / 1000);
}

/* ---------- PX / REM ---------- */

export function pxToRem(px: number, base = 16): number {
  return px / base;
}

export function remToPx(rem: number, base = 16): number {
  return rem * base;
}

/* ---------- Roman numerals ---------- */

const ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export function toRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let rest = n;
  let out = "";
  for (const [value, symbol] of ROMAN) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

/** Returns the number for a valid Roman numeral, or null. Rejects non-canonical forms such as "IIII". */
export function fromRoman(s: string): number | null {
  const text = s.trim().toUpperCase();
  if (!text || !/^[MDCLXVI]+$/.test(text)) return null;
  const value = text.split("").reduce<number>((acc, ch, i, arr) => {
    const v: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    const next = v[arr[i + 1]] ?? 0;
    return v[ch] < next ? acc - v[ch] : acc + v[ch];
  }, 0);
  return toRoman(value) === text ? value : null;
}

/* ---------- Random picker ---------- */

/** Takes a random-number function so tests can pass a fixed one. The default is Math.random. */
export function pickOne<T>(items: T[], random: () => number = Math.random): T | null {
  if (!items.length) return null;
  return items[Math.floor(random() * items.length) % items.length];
}

/* ---------- SHA-256 (Web Crypto, browser and Node 19+) ---------- */

export async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
