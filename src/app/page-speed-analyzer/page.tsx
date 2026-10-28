import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/PageSpeedAnalyzer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/page-speed-analyzer";

const seo: PageSEO = {
  "title": "Page Speed Analyzer – Free Website Speed Test | ShauryaTools",
  "description": "Analyze your website's page speed with Google Lighthouse scores. Check Core Web Vitals, performance metrics, and get actionable optimization tips. Free.",
  "canonical": `${SITE_URL}/page-speed-analyzer`,
  "robots": "index, follow",
  "author": "ShauryaTools",
  "og": {
    "title": "Page Speed Analyzer – Free Website Speed Test | ShauryaTools",
    "description": "Check your website's Lighthouse scores, Core Web Vitals, and get optimization tips. Free page speed analysis tool.",
    "type": "website",
    "url": `${SITE_URL}/page-speed-analyzer`,
    "siteName": "ShauryaTools"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Page Speed Analyzer – Free Website Speed Test | ShauryaTools",
    "description": "Analyze your website speed with Google Lighthouse. Check Core Web Vitals: LCP, FCP, CLS, TTI and more. Free."
  }
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
