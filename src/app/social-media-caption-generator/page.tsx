import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/social-media-caption-generator";

const seo: PageSEO = {
  "title": "AI Caption Generator – Instagram, Twitter & More",
  "description": "Generate social media captions with AI for Instagram, Twitter/X, LinkedIn, YouTube, Facebook and Threads. Available in English, Hindi and Marathi. Free.",
  "canonical": `${SITE_URL}/social-media-caption-generator`,
  "og": {
    "title": "AI Caption Generator – Instagram, Twitter & More",
    "description": "Generate viral captions for Instagram, Twitter, LinkedIn and more with AI. Free tool.",
    "type": "website",
    "url": `${SITE_URL}/social-media-caption-generator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "AI Caption Generator – Free Online Tool",
    "description": "Create viral social media captions with AI. Supports 6 platforms and 3 languages."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Caption Generator",
    "url": `${SITE_URL}/social-media-caption-generator`,
    "applicationCategory": "SocialNetworkingApplication",
    "operatingSystem": "All",
    "description": "Free AI-powered caption generator for Instagram, Twitter, LinkedIn, YouTube, Facebook and Threads.",
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
      <SimpleAITool slug={PATH.slice(1)} />
    </>
  );
}
