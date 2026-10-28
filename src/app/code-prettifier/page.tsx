import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CodePrettifier";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/code-prettifier";

const seo: PageSEO = {
  "title": "Code Prettifier – Format & Lint JS, CSS, HTML, Python",
  "description": "Free online code prettifier with syntax highlighting and error detection. Auto-format JavaScript, TypeScript, JSX, CSS, HTML and Python. Catches bracket mismatches.",
  "canonical": `${SITE_URL}/code-prettifier`,
  "og": {
    "title": "Code Prettifier – Format & Lint JS, CSS, HTML, Python",
    "description": "Free online code prettifier with syntax highlighting, auto-formatting and error detection. No install needed.",
    "type": "website",
    "url": `${SITE_URL}/code-prettifier`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Free Code Prettifier & Formatter Online",
    "description": "Format JS, CSS, HTML and Python code instantly. Catch errors too. Free, no signup."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Code Prettifier",
    "url": `${SITE_URL}/code-prettifier`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "description": "Free online code prettifier and formatter. Auto-format JavaScript, TypeScript, JSX, CSS, HTML and Python with syntax highlighting and error detection.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
];

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} extra={structuredData} />
      <Tool />
    </>
  );
}
