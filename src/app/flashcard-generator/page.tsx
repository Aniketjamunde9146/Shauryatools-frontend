import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/flashcard-generator";

const seo: PageSEO = {
  "title": "Free AI Flashcard Generator – Study Cards from Notes",
  "description": "Generate AI flashcards from your study notes or any topic. Flip cards, use study mode, star important cards and download your deck. Free tool.",
  "canonical": `${SITE_URL}/flashcard-generator`,
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
