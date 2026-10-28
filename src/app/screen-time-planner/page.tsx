import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/screen-time-planner";

const seo: PageSEO = {
  "title": "Free AI Screen Time Tracker & Planner – Digital Wellness Plan",
  "description": "Track and reduce your screen time with a personalized AI-powered daily planner. Get a custom schedule, device budget, and digital wellness rules. Free tool.",
  "canonical": `${SITE_URL}/screen-time-planner`,
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
