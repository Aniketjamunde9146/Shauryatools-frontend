import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/excuse-generator";

const seo: PageSEO = {
  "title": "Free AI Excuse Generator – Believable Excuses Instantly",
  "description": "Generate convincing, creative excuses instantly with AI. Choose from 12 excuse types, set your tone, believability and recipient. Free AI excuse writer tool.",
  "canonical": `${SITE_URL}/excuse-generator`,
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
