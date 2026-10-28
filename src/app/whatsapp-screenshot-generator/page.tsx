import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/WhatsAppScreenshot";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/whatsapp-screenshot-generator";

const seo: PageSEO = {
  "title": "WhatsApp Chat Screenshot Generator – Fake WhatsApp Chat Maker",
  "description": "Create realistic WhatsApp chat screenshots. Set contact name, status, time, and messages between two people. Download as PNG instantly. Free tool.",
  "canonical": `${SITE_URL}/whatsapp-screenshot-generator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
