import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/TextTools";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/text-tools";

const seo: PageSEO = {
  "title": "Free Word Counter & Case Converter Online – ShauryaTools",
  "description": "Count words, characters, sentences and paragraphs. Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free, instant.",
  "canonical": `${SITE_URL}/text-tools`,
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
