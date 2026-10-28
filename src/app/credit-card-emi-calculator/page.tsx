import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CreditCardEMICalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/credit-card-emi-calculator";

const seo: PageSEO = {
  "title": "Credit Card EMI Calculator – Monthly Payment & Interest",
  "description": "Calculate your credit card EMI, total interest, and amortization schedule. Compare tenures, see your full repayment breakdown and decide the best plan. Free tool.",
  "canonical": `${SITE_URL}/credit-card-emi-calculator`,
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
