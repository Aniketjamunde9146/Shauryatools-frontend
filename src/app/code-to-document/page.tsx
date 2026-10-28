import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CodeToDoc";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/code-to-document";

const seo: PageSEO = {
  "title": "Code to Documentation Generator – Auto-generate Docs",
  "description": "Paste any code and instantly generate professional JSDoc, Markdown, or plain-text documentation. Supports JavaScript, TypeScript, Python, HTML, CSS, SQL and more.",
  "canonical": `${SITE_URL}/code-to-document`,
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
