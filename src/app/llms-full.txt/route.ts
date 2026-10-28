import { tools } from "@/data/toolsData";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getToolContent } from "@/lib/toolContent";
import { GROUPS, getGroup, isAiTool } from "@/lib/toolMeta";

export const dynamic = "force-static";

/**
 * Full plain-text knowledge file for AI assistants (https://llmstxt.org): every tool with its
 * summary, how-to steps, FAQ answers and whether it runs in the browser or uses the AI service.
 * Same content as the visible page, so it stays consistent with what the page says.
 */
export function GET() {
  const parts: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    `Each tool below has its own page at ${SITE_URL}/<slug>. All tools are free and need no account.`,
    "",
  ];

  for (const group of GROUPS) {
    const items = tools.filter((t) => getGroup(t).id === group.id);
    if (!items.length) continue;
    parts.push(`## ${group.label}`, "", group.blurb, "");

    for (const tool of items) {
      const content = getToolContent(tool);
      parts.push(
        `### ${tool.name}`,
        `URL: ${SITE_URL}/${tool.slug}`,
        `Runs: ${isAiTool(tool.slug) ? "AI-powered (input is sent to the AI service)" : "in the browser"}`,
        "",
        content.summary,
        "",
      );
      if (content.steps.length) {
        parts.push("How to use:", ...content.steps.map((step, i) => `${i + 1}. ${step}`), "");
      }
      for (const faq of content.faqs) {
        parts.push(`Q: ${faq.question}`, `A: ${faq.answer}`, "");
      }
    }
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
