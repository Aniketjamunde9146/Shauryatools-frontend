import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/GSTCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/gst-calculator";

const seo: PageSEO = {
  "title": "GST Calculator – Add & Remove GST Online | ShauryaTools",
  "description": "Calculate GST instantly. Add GST to a base price or remove it from an inclusive price. All slabs (0%, 5%, 12%, 18%, 28%) with CGST, SGST and IGST split.",
  "canonical": `${SITE_URL}/gst-calculator`,
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
