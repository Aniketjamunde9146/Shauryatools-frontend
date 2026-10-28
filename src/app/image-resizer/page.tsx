import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageResizer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-resizer";

const seo: PageSEO = {
  "title": "Free Image Resizer – Resize JPG, PNG & WebP Online",
  "description": "Resize images to exact dimensions or use presets like Instagram, YouTube, Twitter and more. 100% in-browser, private, free.",
  "canonical": `${SITE_URL}/image-resizer`,
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
