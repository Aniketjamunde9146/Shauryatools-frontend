import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/PassportPhotoMaker";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/passport-photo-maker";

const seo: PageSEO = {
  "title": "Passport Photo Maker – Crop, Remove Background, Print",
  "description": "Create passport photos for India, USA, UK and 20+ countries. Crop to size, remove or recolor the background and print a ready-to-cut photo sheet.",
  "canonical": `${SITE_URL}/passport-photo-maker`
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
