import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/water-intake-calculator";

const seo: PageSEO = {
  "title": "Free AI Water Intake Calculator – Daily Hydration Plan",
  "description": "Calculate your ideal daily water intake from weight, age, activity, climate and health goals. Get a personalized AI hydration plan instantly. Free tool.",
  "canonical": `${SITE_URL}/water-intake-calculator`,
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
