import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/QrCodeGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/qr-code-generator";

const seo: PageSEO = {
  "title": "Free QR Code Generator – URL, WiFi & vCard | ShauryaTools",
  "description": "Generate QR codes for URLs, WiFi credentials, contact cards, and plain text. Customize colors and size. Download as PNG or SVG. Free, instant.",
  "canonical": `${SITE_URL}/qr-code-generator`,
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
