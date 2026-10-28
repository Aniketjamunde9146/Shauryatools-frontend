import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ImageMetadataViewer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/image-metadata-viewer";

const seo: PageSEO = {
  "title": "Image Metadata Viewer – View EXIF Data Online",
  "description": "View EXIF data, camera details, GPS location, resolution and more from any image file. Runs in your browser, so your photo is not uploaded. Free.",
  "canonical": `${SITE_URL}/image-metadata-viewer`
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
