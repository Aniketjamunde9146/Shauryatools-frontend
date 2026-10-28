import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CollageMaker";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/collage-maker";

const seo: PageSEO = {
  "title": "Free Image Collage Maker – Create Photo Collages Online",
  "description": "Create beautiful photo collages with multiple layouts. Drag and drop images, adjust gap and background. 100% in-browser, free, private.",
  "canonical": `${SITE_URL}/collage-maker`,
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
