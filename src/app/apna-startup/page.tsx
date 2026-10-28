import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/apna-startup";

const seo: PageSEO = {
  "title": "ApnaStartup – AI Startup Analyzer & Advisor | ShauryaTools",
  "description": "Get AI-powered startup analysis in minutes. Market research, competitor analysis, tech stack, MVP plan, pitch deck outline & more. Free startup advisor tool.",
  "canonical": `${SITE_URL}/apna-startup`,
  "og": {
    "title": "ApnaStartup – AI Startup Analyzer & Advisor",
    "description": "Analyze your startup idea with AI. Get market data, competitors, tech stack, MVP plan, hiring roadmap & pitch outline.",
    "type": "website",
    "url": `${SITE_URL}/apna-startup`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "ApnaStartup – Free AI Startup Advisor",
    "description": "Validate your startup idea with AI analysis. Market research, competitors, tech recommendations & more."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ApnaStartup",
    "url": `${SITE_URL}/apna-startup`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "description": "Free AI-powered startup analyzer & advisor. Get comprehensive startup analysis including market research, competitor analysis, tech stack recommendations, MVP planning, and pitch deck outlines.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
];

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} extra={structuredData} />
      <ClientOnly>
        <SimpleAITool slug={PATH.slice(1)} />
      </ClientOnly>
    </>
  );
}
