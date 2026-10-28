import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/JsonYamlconverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/json-to-yaml";

const seo: PageSEO = {
  "title": "Free JSON to YAML Converter Online – ShauryaTools",
  "description": "Convert between JSON and YAML instantly. Paste, upload or drag & drop files. Supports syntax highlighting, download, and swap direction. Free & no login.",
  "canonical": `${SITE_URL}/json-to-yaml`,
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
