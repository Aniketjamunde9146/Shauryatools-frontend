import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/startup-validator";

const seo: PageSEO = {
  "title": "AI Startup Idea Validator – Get Brutal Honest Feedback",
  "description": "Validate your startup idea with AI. Get scores on problem strength, market size, competition, monetization, timing and more. Free startup validator tool.",
  "canonical": `${SITE_URL}/startup-validator`,
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
