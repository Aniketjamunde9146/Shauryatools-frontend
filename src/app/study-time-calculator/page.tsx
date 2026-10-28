import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/study-time-calculator";

const seo: PageSEO = {
  "title": "Free AI Study Time Calculator – Personalized Study Plans",
  "description": "Generate a personalized study schedule with AI. Add subjects, set difficulty, pick your technique and get a full weekly plan with tips. Free AI study planner.",
  "canonical": `${SITE_URL}/study-time-calculator`,
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
