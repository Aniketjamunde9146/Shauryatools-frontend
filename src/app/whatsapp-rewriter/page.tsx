import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/whatsapp-rewriter";

const seo: PageSEO = {
  "title": "Free AI WhatsApp Message Rewriter – Rewrite Texts Instantly",
  "description": "Rewrite any WhatsApp message in seconds with AI. Choose your vibe — casual, funny, flirty, professional and more. Free WhatsApp message rewriter.",
  "canonical": `${SITE_URL}/whatsapp-rewriter`,
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
