import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/hashtag-generator";

const seo: PageSEO = {
  "title": "Free Hashtag Generator – Instagram, Twitter, TikTok & More",
  "description": "Generate trending hashtags for Instagram, Twitter, TikTok, YouTube and LinkedIn with AI. Pick your platform, set the count and build your caption. Free.",
  "canonical": `${SITE_URL}/hashtag-generator`,
  "og": {
    "title": "Free Hashtag Generator – Instagram, Twitter, TikTok & More",
    "description": "Generate trending hashtags for any social media platform instantly. Free AI-powered tool.",
    "type": "website",
    "url": `${SITE_URL}/hashtag-generator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Free Hashtag Generator Online",
    "description": "AI-powered hashtag generator for Instagram, TikTok, Twitter and more. Free."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hashtag Generator",
    "url": `${SITE_URL}/hashtag-generator`,
    "applicationCategory": "SocialNetworkingApplication",
    "operatingSystem": "All",
    "description": "Free AI-powered hashtag generator for Instagram, Twitter, TikTok, YouTube, and LinkedIn.",
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
