import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/homework-helper-ai";

const seo: PageSEO = {
  "title": "Free AI Homework Helper – Get Step-by-Step Answers",
  "description": "Get instant AI-powered homework help for Math, Science, English, History, Coding and more. Step-by-step explanations tailored to your grade level. Free.",
  "canonical": `${SITE_URL}/homework-helper-ai`,
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
