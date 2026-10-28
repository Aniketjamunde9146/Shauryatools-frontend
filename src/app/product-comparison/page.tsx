import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/product-comparison";

const seo: PageSEO = {
  "title": "Free AI Product Comparison Generator – Compare Any Products",
  "description": "Compare any two or three products side-by-side with AI. Get detailed tables, pros & cons, in-depth reviews, and a clear buying recommendation. Free tool.",
  "canonical": `${SITE_URL}/product-comparison`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <SimpleAITool slug={PATH.slice(1)} />
    </>
  );
}
