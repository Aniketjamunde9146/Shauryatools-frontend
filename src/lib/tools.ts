import { tools as catalog, type Tool } from "@/data/toolsData";
import { getToolContent, type ToolContent } from "@/lib/toolContent";
import { relatedTools } from "@/lib/toolMeta";

export type ToolEntry = Tool & {
  shortDescription: string;
  intro: string;
  howToSteps: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  indexable: boolean;
};

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function trimToWordBoundary(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength + 1).replace(/\s+\S*$/, "").trim();
}

function makeShortDescription(tool: Tool): string {
  const suffix = ` Try the free ${tool.name} online with no sign-up.`;
  const extra = " Get a quick result for everyday use.";
  const ending = tool.description.length + suffix.length < 140 ? `${suffix}${extra}` : suffix;
  const description = trimToWordBoundary(
    tool.description.replace(/[.!?]+$/, ""),
    160 - ending.length - 1,
  );
  let result = `${description}.${ending}`;

  for (const additional of [" No sign-up needed.", " Use it for quick results.", " Made for everyday use."]) {
    if (result.length >= 140) break;
    if (result.length + additional.length <= 160) result += additional;
  }

  return result;
}

function makeIntro(tool: Tool): string {
  return [
    `${tool.name} is a focused ${tool.category.toLowerCase()} utility for the task described on this page.`,
    tool.description,
    `Use it when you want to complete this specific task without setting up a separate application. Follow the steps below, then review the result before copying, downloading, or applying it elsewhere.`,
    `The page is focused on this workflow, not a substitute for broader review. For important financial, health, legal, or technical decisions, verify the relevant details with an authoritative source before relying on the result.`,
  ].join(" ");
}

function makeFaqs(tool: Tool, content: ToolContent): ToolEntry["faqs"] {
  const faqs = content.faqs;
  const selectedFaqs = faqs.slice(0, 5);

  if (tool.slug === "jwt-decoder" && faqs.length > 5) {
    selectedFaqs[4] = faqs[5];
  }

  return selectedFaqs.map(({ question, answer }) => ({ q: question, a: answer }));
}

const entries = catalog.map((tool) => {
  const content = getToolContent(tool);
  const intro = makeIntro(tool);
  const howToSteps = content.steps;
  const faqs = makeFaqs(tool, content);
  const relatedSlugs = relatedTools(tool, 6).map((related) => related.slug);

  for (let offset = 0; relatedSlugs.length < 6 && offset < catalog.length; offset += 1) {
    const candidate = catalog[(tool.id + offset) % catalog.length];
    if (candidate.slug !== tool.slug && !relatedSlugs.includes(candidate.slug)) {
      relatedSlugs.push(candidate.slug);
    }
  }

  return {
    ...tool,
    shortDescription: makeShortDescription(tool),
    intro,
    howToSteps,
    faqs,
    relatedSlugs,
    indexable: countWords(intro) >= 80,
  };
});

const duplicateIntros = new Set<string>();
const introCounts = new Map<string, number>();

for (const tool of entries) {
  introCounts.set(tool.intro, (introCounts.get(tool.intro) ?? 0) + 1);
}

for (const tool of entries) {
  if ((introCounts.get(tool.intro) ?? 0) > 1) duplicateIntros.add(tool.slug);
}

export const tools: ToolEntry[] = entries.map((tool) => ({
  ...tool,
  indexable: tool.indexable && !duplicateIntros.has(tool.slug),
}));
