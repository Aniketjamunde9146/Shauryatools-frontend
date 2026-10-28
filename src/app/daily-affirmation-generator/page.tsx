import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/daily-affirmation-generator";

const seo: PageSEO = {
  "title": "Free AI Daily Affirmation Generator – Personal Affirmations",
  "description": "Generate personalized daily affirmations with AI. Choose your focus, tone, and mood to receive uplifting affirmations with meditation and journal prompts. Free.",
  "canonical": `${SITE_URL}/daily-affirmation-generator`,
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
