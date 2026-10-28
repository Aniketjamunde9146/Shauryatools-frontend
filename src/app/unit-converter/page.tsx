import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/UnitConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/unit-converter";

const seo: PageSEO = {
  "title": "Free Unit Converter – Length, Weight, Temperature & More",
  "description": "Instantly convert units across length, weight, temperature, area, volume, speed, data storage, and time. Free online unit converter with all results shown.",
  "canonical": `${SITE_URL}/unit-converter`,
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
