import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/budget-planner";

const seo: PageSEO = {
  "title": "Free AI Budget Planner – Personal Budget Optimizer",
  "description": "Plan your monthly budget with AI. Enter your income and expenses, get a personalized budget plan, savings tips, and goal strategies. Free budget planner tool.",
  "canonical": `${SITE_URL}/budget-planner`,
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
