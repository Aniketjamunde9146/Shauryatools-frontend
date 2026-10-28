import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/story-generator";

const seo: PageSEO = {
  "title": "Free AI Story Generator – Create Original Stories Instantly",
  "description": "Generate original, immersive stories instantly with AI. Choose from 12 genres, set tone, length, POV and language. Free AI story writer tool.",
  "canonical": `${SITE_URL}/story-generator`,
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
