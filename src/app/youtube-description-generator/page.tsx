import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/youtube-description-generator";

const seo: PageSEO = {
  "title": "Free YouTube Description Generator – AI SEO Descriptions",
  "description": "Generate SEO-optimized YouTube video descriptions with AI. Add timestamps, links, and hashtags. Includes live YouTube preview. Free, no sign-up.",
  "canonical": `${SITE_URL}/youtube-description-generator`,
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
