import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/PercentageCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/marks-percentage-calculator";

const seo: PageSEO = {
  "title": "Marks Percentage Calculator – Grade & GPA Calculator",
  "description": "Calculate your marks percentage, grade and GPA. Supports percentage, 10-point and 4-point grading. Add multiple subjects for a detailed result breakdown.",
  "canonical": `${SITE_URL}/marks-percentage-calculator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
