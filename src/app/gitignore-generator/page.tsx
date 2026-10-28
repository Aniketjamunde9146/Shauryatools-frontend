import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/GitignoreGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/gitignore-generator";

const seo: PageSEO = {
  "title": ".gitignore Generator – Create .gitignore Files Instantly",
  "description": "Generate a clean, ready-to-use .gitignore file for any tech stack. Pick languages, frameworks, IDEs and OS templates. Add custom rules and download instantly. Free.",
  "canonical": `${SITE_URL}/gitignore-generator`,
  "og": {
    "title": ".gitignore Generator – Free Online Tool",
    "description": "Instantly generate .gitignore files for any stack. Pick templates and download.",
    "type": "website",
    "url": `${SITE_URL}/gitignore-generator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": ".gitignore Generator Online",
    "description": "Generate perfect .gitignore files for any tech stack. Free and instant."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": ".gitignore Generator",
    "url": `${SITE_URL}/gitignore-generator`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "description": "Free online .gitignore generator. Create gitignore files for any language, framework, IDE or OS with one click.",
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
