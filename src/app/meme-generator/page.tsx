import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/MemeGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/meme-generator";

const seo: PageSEO = {
  "title": "Free Meme Generator – Add Text to Images Online",
  "description": "Create memes with top/bottom text, custom fonts, stroke outline and live preview. 100% in-browser, free, no account needed.",
  "canonical": `${SITE_URL}/meme-generator`,
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
