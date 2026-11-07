import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/tools", {
  title: "Tools Directory | ShauryaTools",
  description: "Browse free online tools by category, including calculators, developer utilities, image tools, and writing helpers.",
  canonical: `${SITE_URL}/tools`,
});

export default function ToolsPage() {
  const groupedTools = tools
    .filter((tool) => tool.indexable)
    .reduce<Record<string, typeof tools>>((groups, tool) => {
      (groups[tool.category] ??= []).push(tool);
      return groups;
    }, {});

  return (
    <main className="tools-directory">
      <header>
        <h1>All online tools</h1>
        <p>Browse free tools by category and open the one that fits your task.</p>
      </header>
      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <section key={category} aria-labelledby={`tools-${category}`}>
          <h2 id={`tools-${category}`}>{category}</h2>
          <ul>
            {categoryTools.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/${tool.slug}`}>{tool.name}</Link>
                <p>{tool.shortDescription}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
