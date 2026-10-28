import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/daily-planner-generator";

const seo: PageSEO = {
  "title": "Free AI Daily Planner Generator – Personalized Daily Schedule",
  "description": "Generate a personalized daily planner and schedule instantly with AI. Choose your focus, energy level, wake time, and planning style. Free AI daily planner tool.",
  "canonical": `${SITE_URL}/daily-planner-generator`,
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
