import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/Base64Converter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/base64";

const seo: PageSEO = {
  "title": "Base64 Encode & Decode Online – Free Tool | ShauryaTools",
  "description": "Encode text or files to Base64 and decode Base64 strings back to text instantly in your browser. Free, fast, no signup required. Supports drag & drop file encoding.",
  "canonical": `${SITE_URL}/base64`,
  "og": {
    "title": "Base64 Encode & Decode Online – Free Tool",
    "description": "Encode text or files to Base64 and decode Base64 strings instantly. Free browser-based tool.",
    "type": "website",
    "url": `${SITE_URL}/base64`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Base64 Encode & Decode Online",
    "description": "Free online Base64 encoder and decoder. Works with text and files."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 Converter",
    "url": `${SITE_URL}/base64`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "description": "Free online Base64 encoder and decoder tool. Encode text or files to Base64, or decode Base64 strings back to text.",
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
