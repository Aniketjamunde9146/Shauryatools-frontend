import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/FuelCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/fuel-expense-calculator";

const seo: PageSEO = {
  "title": "Fuel Expense Calculator – Daily, Monthly & Trip Cost",
  "description": "Calculate fuel cost for any trip. Enter distance, mileage, and fuel price to get per trip, daily, monthly and yearly fuel expenses. Supports petrol, diesel and CNG.",
  "canonical": `${SITE_URL}/fuel-expense-calculator`,
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
