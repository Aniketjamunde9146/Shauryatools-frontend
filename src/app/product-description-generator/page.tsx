import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/product-description-generator";

const seo: PageSEO = {
  "title": "Free AI Product Description Generator for eCommerce",
  "description": "Generate SEO-optimized product descriptions for Amazon, Shopify, Etsy, Flipkart & more. AI-powered eCommerce copywriter. Free, no sign-up required.",
  "canonical": `${SITE_URL}/product-description-generator`,
  "og": {
    "title": "Free AI Product Description Generator",
    "description": "Generate SEO-optimized product descriptions for any platform instantly with AI.",
    "type": "website",
    "url": `${SITE_URL}/product-description-generator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "AI Product Description Generator",
    "description": "Generate SEO-optimized product descriptions for Amazon, Shopify, Etsy & more."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <SimpleAITool slug={PATH.slice(1)} />
    </>
  );
}
