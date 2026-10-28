import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageCompressor";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-compressor";

const seo: PageSEO = {
  "title": "Free Image Compressor – Compress JPG, PNG & WebP Online",
  "description": "Compress and resize images instantly in your browser. Supports JPG, PNG, WebP. No upload to server, 100% private. Free online image compressor tool.",
  "canonical": `${SITE_URL}/image-compressor`,
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
