import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/WatermarkAdder";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/watermark-adder";

const seo: PageSEO = {
  "title": "Free Watermark Adder – Add Text & Logo Watermarks Online",
  "description": "Add text or logo watermarks to your images with adjustable opacity, position and tiling. Runs in your browser, so your images are not uploaded. Free.",
  "canonical": `${SITE_URL}/watermark-adder`
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
