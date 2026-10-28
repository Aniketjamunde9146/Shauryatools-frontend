import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ScreenshotEditor";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/screenshot-editor";

const seo: PageSEO = {
  "title": "Free Screenshot Editor – Crop, Blur, Annotate | ShauryaTools",
  "description": "Free browser-based screenshot editor. Crop, blur sensitive info, add arrows, highlight areas, draw rectangles and add text. No upload, works instantly.",
  "canonical": `${SITE_URL}/screenshot-editor`,
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
