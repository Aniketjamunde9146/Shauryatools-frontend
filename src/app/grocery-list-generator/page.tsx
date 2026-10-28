import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/grocery-list-generator";

const seo: PageSEO = {
  "title": "Smart Grocery List Generator – AI Meal Planning",
  "description": "Generate a smart, organized grocery list with AI. Plan meals by diet, budget, people count and duration. Free grocery planner tool.",
  "canonical": `${SITE_URL}/grocery-list-generator`,
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
