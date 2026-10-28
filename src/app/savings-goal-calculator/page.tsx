import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/SavingsGoalCalculator";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/savings-goal-calculator";

const seo: PageSEO = {
  "title": "Free Savings Goal Calculator – Plan Your Savings with Interest",
  "description": "Find out how long it takes to reach your savings goal. Enter the goal, contributions and interest rate to get a timeline, milestones and growth chart. Free.",
  "canonical": `${SITE_URL}/savings-goal-calculator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <ClientOnly>
        <Tool />
      </ClientOnly>
    </>
  );
}
