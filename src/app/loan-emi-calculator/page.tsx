import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/LoanEMICalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/loan-emi-calculator";

const seo: PageSEO = {
  "title": "Free Loan EMI Calculator – Monthly Installment & Amortization",
  "description": "Calculate your monthly EMI, total interest, and full amortization schedule instantly. Supports multiple currencies. Free loan calculator, no sign-up.",
  "canonical": `${SITE_URL}/loan-emi-calculator`,
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
