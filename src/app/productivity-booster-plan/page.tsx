import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/productivity-booster-plan";

const seo: PageSEO = {
  "title": "Free AI Productivity Plan Generator – Personalized Plans",
  "description": "Generate a personalized AI productivity plan. Choose your role, focus areas and duration to get strategies, time-blocking schedules, habit plans and metrics.",
  "canonical": `${SITE_URL}/productivity-booster-plan`,
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
