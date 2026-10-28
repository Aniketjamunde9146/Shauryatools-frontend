import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/youtube-title-optimizer";

const seo: PageSEO = {
  "title": "Free YouTube Title Optimizer – AI-Powered CTR & SEO Scores",
  "description": "Generate and score YouTube titles with AI. Get CTR, SEO, and emotional hook scores. Includes thumbnail tips, A/B variants, and keyword targeting. Free.",
  "canonical": `${SITE_URL}/youtube-title-optimizer`,
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
