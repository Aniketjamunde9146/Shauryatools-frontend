import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/speech-script-generator";

const seo: PageSEO = {
  "title": "Free AI Speech Script Generator – Practice-Ready Scripts",
  "description": "Generate a practice-ready speech script with AI. Choose your speech type, topic, audience and duration. Get delivery cues, practice tips and coaching notes.",
  "canonical": `${SITE_URL}/speech-script-generator`,
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
