import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/study-notes-mcq-generator";

const seo: PageSEO = {
  "title": "Free AI MCQ Generator – Study Notes Question Maker",
  "description": "Paste your study notes or enter a topic and instantly generate MCQs, True/False, and fill-in-the-blank questions with answer keys. Free AI exam prep tool.",
  "canonical": `${SITE_URL}/study-notes-mcq-generator`,
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
