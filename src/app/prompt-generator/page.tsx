import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/prompt-generator";

const seo: PageSEO = {
  "title": "Free AI Prompt Generator – ChatGPT, Claude, Midjourney & More",
  "description": "Generate perfectly structured AI prompts in 3 steps. Select your AI tool, describe your goal, choose tone and length. Free prompt builder for all AI models.",
  "canonical": `${SITE_URL}/prompt-generator`,
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
