import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/whatsapp-generator";

const seo: PageSEO = {
  "title": "AI WhatsApp Cold Message Generator for Freelancers",
  "description": "Generate high-converting WhatsApp cold messages for freelancers. Personalized outreach with follow-up sequences. Free AI tool.",
  "canonical": `${SITE_URL}/whatsapp-generator`,
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
