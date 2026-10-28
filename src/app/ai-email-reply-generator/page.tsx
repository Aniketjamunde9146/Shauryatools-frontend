import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/ai-email-reply-generator";

const seo: PageSEO = {
  "title": "Free AI Email Reply Generator – Write Perfect Email Replies",
  "description": "Paste any email and get a polished, professional reply instantly with AI. Choose your tone, length, and language. Free email reply generator.",
  "canonical": `${SITE_URL}/ai-email-reply-generator`,
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
