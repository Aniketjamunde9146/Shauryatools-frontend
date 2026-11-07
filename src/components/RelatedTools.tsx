"use client";

import Link from "next/link";
import { tools, type ToolEntry } from "@/lib/tools";

export default function RelatedTools({ tool }: { tool: ToolEntry }) {
  const related = tool.relatedSlugs
    .map((slug) => tools.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is ToolEntry => !!candidate && candidate.indexable);

  if (related.length === 0) return null;

  return (
    <div className="tool-seo-block">
      <h3>Related tools</h3>
      <ul className="tool-seo-related">
        {related.map((item) => (
          <li key={item.slug}>
            <Link href={`/${item.slug}`}>
              <strong>{item.name}</strong>
              <span>{item.shortDescription}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
