import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/LandingPageGen";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/landing-page-generator";

const seo: PageSEO = {
  "title": "Landing Page Generator – AI Website Builder | ShauryaTools",
  "description": "Generate beautiful, production-ready landing pages instantly with AI. Customize hero, features, pricing, and more. Free landing page builder.",
  "canonical": `${SITE_URL}/landing-page-generator`,
  "robots": "index, follow",
  "author": "ShauryaTools",
  "og": {
    "title": "Landing Page Generator – AI Website Builder | ShauryaTools",
    "description": "Generate beautiful landing pages instantly with AI."
  },
  "twitter": {
    "card": "summary_large_image"
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
