import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/SchemaMarkupGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/schema-markup-generator";

const seo: PageSEO = {
  "title": "Schema Markup Generator – Free JSON-LD Structured Data",
  "description": "Generate valid JSON-LD schema markup for Article, Product, FAQ, LocalBusiness, Event, Recipe, and more. Free structured data generator for SEO.",
  "canonical": `${SITE_URL}/schema-markup-generator`,
  "robots": "index, follow",
  "author": "ShauryaTools",
  "og": {
    "title": "Schema Markup Generator – Free JSON-LD Structured Data | ShauryaTools",
    "description": "Generate valid JSON-LD schema markup for Article, Product, FAQ, LocalBusiness, Event, Recipe, and more. Free structured data generator for SEO.",
    "type": "website",
    "url": `${SITE_URL}/schema-markup-generator`,
    "siteName": "ShauryaTools"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Schema Markup Generator – Free JSON-LD Structured Data | ShauryaTools",
    "description": "Generate valid JSON-LD schema markup for Article, Product, FAQ, LocalBusiness, Event, Recipe, and more. Free."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
