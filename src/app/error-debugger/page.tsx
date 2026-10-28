import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/error-debugger";

const seo: PageSEO = {
  "title": "Error Debugger – AI-Powered Bug Fixer | ShauryaTools",
  "description": "Paste any error message and code snippet to get an instant AI-powered explanation, root cause analysis, and step-by-step fix. Free.",
  "canonical": `${SITE_URL}/error-debugger`,
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
