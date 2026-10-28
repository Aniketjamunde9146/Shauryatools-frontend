import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageQualityEnhancer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-quality-enhancer";

const seo: PageSEO = {
  "title": "Image Quality Enhancer – Upscale Images to 2K & 4K",
  "description": "Enhance and upscale image quality to 2K or 4K resolution. Save as JPEG, PNG, WEBP, AVIF, BMP or TIFF. Free, browser-based, no upload.",
  "canonical": `${SITE_URL}/image-quality-enhancer`
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
