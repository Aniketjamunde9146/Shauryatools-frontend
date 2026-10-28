import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/readme-generator";

const seo: PageSEO = {
  "title": "Free GitHub README Generator – Professional README.md",
  "description": "Generate a professional, well-structured GitHub README.md file instantly. Add badges, installation steps, usage, and contributing sections. Free.",
  "canonical": `${SITE_URL}/readme-generator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <SimpleAITool slug={PATH.slice(1)} />
    </>
  );
}
