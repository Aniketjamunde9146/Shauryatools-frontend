"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";
import RelatedTools from "@/components/RelatedTools";
import "./ToolSEOContent.css";

const serialize = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function ToolSEOContent() {
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const tool = tools.find((item) => `/${item.slug}` === pathname);

  if (!tool) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="tool-seo-content" aria-labelledby="tool-seo-heading">
      <div className="tool-seo-inner">
        <nav className="tool-seo-crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/tools">{tool.category}</Link></li>
            <li aria-current="page">{tool.name}</li>
          </ol>
        </nav>

        <h2 id="tool-seo-heading">About the {tool.name}</h2>
        <p>{tool.intro}</p>

        <div className="tool-seo-block">
          <h3>How to use the {tool.name}</h3>
          <ol className="tool-seo-steps">
            {tool.howToSteps.map((step, index) => (
              <li key={`${tool.slug}-step-${index}`}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="tool-seo-block">
          <h3>Frequently asked questions</h3>
          {tool.faqs.map((faq, index) => (
            <details key={`${tool.slug}-faq-${index}`}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>

        <RelatedTools tool={tool} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(faqJsonLd) }}
      />
    </section>
  );
}
