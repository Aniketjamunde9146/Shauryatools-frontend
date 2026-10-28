import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/diet-plan-generator";

const seo: PageSEO = {
  "title": "Free AI Diet Plan Generator – Personalized Meal Plans",
  "description": "Generate a personalized diet plan with AI. Choose your goal, diet type and activity level to get a full meal plan with a grocery list and tips. Free.",
  "canonical": `${SITE_URL}/diet-plan-generator`,
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
