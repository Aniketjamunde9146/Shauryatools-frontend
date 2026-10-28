import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/interview-generator";

const seo: PageSEO = {
  "title": "Free AI Interview Question Generator – Prep Smarter",
  "description": "Generate tailored interview questions for any job role and experience level. Get behavioral, technical, situational and leadership questions with answer hints.",
  "canonical": `${SITE_URL}/interview-generator`,
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
