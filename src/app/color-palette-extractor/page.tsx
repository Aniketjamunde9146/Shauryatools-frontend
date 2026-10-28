import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ColorPaletteExtractor";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/color-palette-extractor";

const seo: PageSEO = {
  "title": "Color Palette Extractor – Extract Colors from Images",
  "description": "Extract dominant colors from any image. Get hex codes, RGB values and percentages instantly in your browser. Free, private, no upload.",
  "canonical": `${SITE_URL}/color-palette-extractor`,
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
