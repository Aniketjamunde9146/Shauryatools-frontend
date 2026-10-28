import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/KeywordDensityChecker";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/keyword-density-checker";

const seo: PageSEO = {
  "title": "Keyword Density Checker – Free SEO Keyword Analyzer",
  "description": "Analyze keyword density, frequency, and distribution in any text. Check single keywords, bigrams, and trigrams. Free SEO content analysis tool.",
  "canonical": `${SITE_URL}/keyword-density-checker`,
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
