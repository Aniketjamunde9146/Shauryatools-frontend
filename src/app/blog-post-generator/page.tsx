import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/blog-post-generator";

const seo: PageSEO = {
  "title": "AI Blog Post Generator – SEO Optimized Blog Writer",
  "description": "Generate SEO-optimized blog posts instantly. Supports multiple languages, post types, and word counts. Free AI blog writer tool.",
  "canonical": `${SITE_URL}/blog-post-generator`
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
