import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageShapeCrop";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-shape-converter";

const seo: PageSEO = {
  "title": "Free Image Shape Converter – Crop to Circle, Star & More",
  "description": "Crop images into circles, squares, hexagons, stars, hearts and more. Free browser-based shape converter with rotation, flip and custom crop. No upload required.",
  "canonical": `${SITE_URL}/image-shape-converter`,
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
