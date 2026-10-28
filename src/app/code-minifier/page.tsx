import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CodeMinifier";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/code-minifier";

const seo: PageSEO = {
  "title": "HTML CSS JS Minifier & Prettifier – Free Online Tool",
  "description": "Minify or prettify HTML, CSS and JavaScript in your browser. Reduce file size, improve load time and format messy code with no build tools. 100% free.",
  "canonical": `${SITE_URL}/code-minifier`,
  "og": {
    "title": "HTML CSS JS Minifier & Prettifier – Free Online Tool",
    "description": "Minify or beautify HTML, CSS, and JS code instantly. Free browser-based tool.",
    "type": "website",
    "url": `${SITE_URL}/code-minifier`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Code Minifier & Prettifier Online",
    "description": "Free tool to minify or prettify HTML, CSS and JavaScript code instantly."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Code Minifier & Prettifier",
    "url": `${SITE_URL}/code-minifier`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "description": "Free online HTML, CSS and JavaScript minifier and prettifier. Reduce file size instantly without any build tools.",
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
