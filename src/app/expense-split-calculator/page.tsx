import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ExpenseSplitCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/expense-split-calculator";

const seo: PageSEO = {
  "title": "Free Expense Split Calculator – Split Bills with Tip & Tax",
  "description": "Split bills and shared expenses fairly. Supports equal, percentage, custom and share-based splits, plus tax and tip, and shows who pays whom.",
  "canonical": `${SITE_URL}/expense-split-calculator`
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
