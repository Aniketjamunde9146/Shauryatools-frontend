import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/business-name-generator";

const seo: PageSEO = {
  "title": "Free AI Business Name Generator – Creative Brand Names",
  "description": "Generate unique, memorable business names with AI. Choose your industry and style to get brandable ideas with taglines and domain suggestions. Free.",
  "canonical": `${SITE_URL}/business-name-generator`,
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
