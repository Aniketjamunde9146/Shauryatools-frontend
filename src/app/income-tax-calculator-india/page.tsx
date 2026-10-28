import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/IncomeTaxCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/income-tax-calculator-india";

const seo: PageSEO = {
  "title": "Income Tax Calculator India FY 2024-25 – New & Old Regime",
  "description": "Calculate income tax for FY 2024-25 (AY 2025-26) under the New and Old Regime. Slab-wise breakdown, 87A rebate, surcharge, cess, deductions and comparison.",
  "canonical": `${SITE_URL}/income-tax-calculator-india`,
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
