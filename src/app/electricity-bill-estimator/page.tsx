import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ElectricityBillEstimator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/electricity-bill-estimator";

const seo: PageSEO = {
  "title": "Electricity Bill Estimator India – Slab Rate Calculator",
  "description": "Estimate your monthly electricity bill by appliance. Supports Indian state slab tariffs for Maharashtra, Delhi, Karnataka, Tamil Nadu and more. Free tool.",
  "canonical": `${SITE_URL}/electricity-bill-estimator`,
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
