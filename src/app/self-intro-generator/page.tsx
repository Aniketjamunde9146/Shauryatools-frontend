import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/self-intro-generator";

const seo: PageSEO = {
  "title": "Free AI Self-Introduction Generator – Craft Your Perfect Intro",
  "description": "Generate a polished, personalized self-introduction for job interviews, networking events, LinkedIn bios, and more. Multiple tones and lengths. Free AI tool.",
  "canonical": `${SITE_URL}/self-intro-generator`,
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
