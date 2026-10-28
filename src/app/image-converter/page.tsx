import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-converter";

const seo: PageSEO = {
  "title": "Free Image Converter – JPG, PNG, WebP, GIF Online",
  "description": "Convert images between JPG, PNG, WebP and GIF formats instantly in your browser. No upload, 100% private. Free online image converter.",
  "canonical": `${SITE_URL}/image-converter`,
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
