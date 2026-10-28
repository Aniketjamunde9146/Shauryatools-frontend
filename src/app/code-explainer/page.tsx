import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CodeExplainer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/code-explainer";

const seo: PageSEO = {
  "title": "Code Explainer — Understand Any Code Instantly | DevTools",
  "description": "Paste any code snippet and get a plain-English explanation. Supports JavaScript, Python, CSS, HTML, TypeScript, SQL, and more. Choose beginner to expert depth.",
  "canonical": `${SITE_URL}/code-explainer`,
  "og": {
    "title": "Code Explainer — Understand Any Code Instantly",
    "description": "Paste any code snippet and get a clear, line-by-line explanation at your skill level.",
    "type": "website"
  },
  "twitter": {
    "card": "summary",
    "title": "Code Explainer — DevTools",
    "description": "Paste code, get a plain-English explanation. Supports 10+ languages."
  }
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
