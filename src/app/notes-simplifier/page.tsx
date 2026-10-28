import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/notes-simplifier";

const seo: PageSEO = {
  "title": "Free AI Notes Simplifier – Summarize & Simplify Notes",
  "description": "Paste messy notes and get clean bullet points, summaries, flashcards, Cornell notes, or a TL;DR instantly with AI. Free study tool.",
  "canonical": `${SITE_URL}/notes-simplifier`,
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
