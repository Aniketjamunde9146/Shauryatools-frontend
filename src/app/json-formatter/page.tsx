import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/JsonFormator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/json-formatter";

const seo: PageSEO = {
  "title": "Free JSON Formatter & Validator Online – ShauryaTools",
  "description": "Format, validate, minify and explore JSON instantly in your browser. Collapsible tree view, syntax highlighting, search, and download. No install needed.",
  "canonical": `${SITE_URL}/json-formatter`,
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
