import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/linkedin-post-generator";

const seo: PageSEO = {
  "title": "Free LinkedIn Post Generator – AI-Powered | ShauryaTools",
  "description": "Generate scroll-stopping LinkedIn posts with AI. Choose post format, tone, and length. Includes hashtag picker and live LinkedIn preview. Free, instant results.",
  "canonical": `${SITE_URL}/linkedin-post-generator`,
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
