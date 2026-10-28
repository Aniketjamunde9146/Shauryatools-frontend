import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/cold-email-generator";

const seo: PageSEO = {
  "title": "AI Cold Email Generator for Freelancers – Land More Clients",
  "description": "Generate high-converting cold emails for freelancers. Personalized outreach for any skill, industry, and goal. Includes follow-up sequences. Free AI tool.",
  "canonical": `${SITE_URL}/cold-email-generator`,
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
