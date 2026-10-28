import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/relationship-compatibility-checker";

const seo: PageSEO = {
  "title": "Free AI Relationship Compatibility Checker",
  "description": "Check relationship compatibility with AI. Analyze zodiac signs, personality traits, and love languages. Free AI compatibility tool.",
  "canonical": `${SITE_URL}/relationship-compatibility-checker`,
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
