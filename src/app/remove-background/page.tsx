import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/RemoveBg";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/remove-background";

const seo: PageSEO = {
  "title": "Free AI Background Remover – Remove Image Background Online",
  "description": "Remove image backgrounds instantly with AI. Replace with transparent, white, black, blurred, or any custom color background. 100% free, runs in your browser.",
  "canonical": `${SITE_URL}/remove-background`,
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
