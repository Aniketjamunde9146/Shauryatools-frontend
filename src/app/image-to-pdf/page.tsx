import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageToPDF";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-to-pdf";

const seo: PageSEO = {
  "title": "Image to PDF Converter – JPG PNG WebP to PDF | ShauryaTools",
  "description": "Convert multiple images to PDF free. Supports JPG, PNG, WebP, GIF. Choose page size, orientation, margin. Reorder images. All browser-based, no upload.",
  "canonical": `${SITE_URL}/image-to-pdf`,
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
