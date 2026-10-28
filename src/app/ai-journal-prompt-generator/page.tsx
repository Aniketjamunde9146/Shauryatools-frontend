import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/ai-journal-prompt-generator";

const seo: PageSEO = {
  "title": "Free AI Journal Prompt Generator – Daily Writing Prompts",
  "description": "Generate personalized daily journal prompts with AI. Pick a theme and tone: gratitude, self-growth, mindfulness, morning or evening prompts. Free journaling tool.",
  "canonical": `${SITE_URL}/ai-journal-prompt-generator`,
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
