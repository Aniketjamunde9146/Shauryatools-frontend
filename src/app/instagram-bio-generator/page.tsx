import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/instagram-bio-generator";

const seo: PageSEO = {
  "title": "Free Instagram Bio Generator – Create the Perfect Bio",
  "description": "Generate up to 5 Instagram bio variations instantly. Customize emoji style, tone, and layout with a live phone preview. 100% free, no sign-up.",
  "canonical": `${SITE_URL}/instagram-bio-generator`,
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
