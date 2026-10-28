import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/SIPCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/sip-calculator";

const seo: PageSEO = {
  "title": "SIP Return Calculator – Mutual Fund SIP Calculator",
  "description": "Calculate SIP returns. Enter monthly investment, expected rate and duration to see maturity value, total invested, estimated gains and a yearly growth chart.",
  "canonical": `${SITE_URL}/sip-calculator`,
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
