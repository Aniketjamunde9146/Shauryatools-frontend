import { tools } from "@/data/toolsData";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { GROUPS, getGroup } from "@/lib/toolMeta";

export const dynamic = "force-static";

/** Plain-text site summary for AI assistants and answer engines (https://llmstxt.org). */
export function GET() {
  const sections = GROUPS.map((group) => {
    const items = tools.filter((tool) => getGroup(tool).id === group.id);
    if (!items.length) return "";
    const lines = items.map((tool) => `- [${tool.name}](${SITE_URL}/${tool.slug}): ${tool.description}`);
    return `## ${group.label}\n\n${lines.join("\n")}`;
  }).filter(Boolean);

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    `${SITE_NAME} is a collection of ${tools.length} single-purpose web tools. Every tool has its own page, is free to use, and needs no account. Tools marked as AI-powered send the user's input to an AI service; the rest run in the browser.`,
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
