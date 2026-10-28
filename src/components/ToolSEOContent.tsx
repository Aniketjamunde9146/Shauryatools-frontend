"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/data/toolsData";
import { getToolContent } from "@/lib/toolContent";
import { getGroup, relatedTools } from "@/lib/toolMeta";
import "./ToolSEOContent.css";

export default function ToolSEOContent() {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const tool = tools.find((item) => `/${item.slug}` === pathname);

  if (!tool) return null;

  const content = getToolContent(tool);
  const group = getGroup(tool);
  const related = relatedTools(tool, 6);

  return (
    <section className="tool-seo-content" aria-labelledby="tool-seo-heading">
      <div className="tool-seo-inner">
        <nav className="tool-seo-crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href={`/#${group.id}`}>{group.label}</Link></li>
            <li aria-current="page">{tool.name}</li>
          </ol>
        </nav>

        <h2 id="tool-seo-heading">About the {tool.name}</h2>
        <p>{content.summary}</p>

        <div className="tool-seo-block">
          <h3>How to use the {tool.name}</h3>
          <ol className="tool-seo-steps">
            {content.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="tool-seo-block">
          <h3>Frequently asked questions</h3>
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        {related.length > 0 && (
          <div className="tool-seo-block">
            <h3>More {group.label.toLowerCase()}</h3>
            <ul className="tool-seo-related">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`}>
                    <strong>{item.name}</strong>
                    <span>{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
