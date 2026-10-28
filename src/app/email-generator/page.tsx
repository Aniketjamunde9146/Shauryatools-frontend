import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/email-generator";

const seo: PageSEO = {
  "title": "Free AI Email Generator – Write Professional Emails Instantly",
  "description": "Generate professional emails instantly with AI. Choose from 12 email types, set your tone, length and language. Free AI email writer tool.",
  "canonical": `${SITE_URL}/email-generator`,
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
