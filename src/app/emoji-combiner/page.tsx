import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/emoji-combiner";

const seo: PageSEO = {
  "title": "AI Emoji Combiner – Decode Your Emoji Combos | ShauryaTools",
  "description": "Pick 2–6 emojis and let AI decode the vibe, tell a story, generate a caption, reveal hidden meanings and more. Fun, free emoji combination tool.",
  "canonical": `${SITE_URL}/emoji-combiner`,
  "og": {
    "title": "AI Emoji Combiner – Decode Your Emoji Combos",
    "description": "Combine emojis and let AI decode the vibe, story, and meaning. Free fun tool.",
    "type": "website",
    "url": `${SITE_URL}/emoji-combiner`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "AI Emoji Combiner – Free Online Tool",
    "description": "Pick emojis and let AI decode what they mean together. Fun and free."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Emoji Combiner",
    "url": `${SITE_URL}/emoji-combiner`,
    "applicationCategory": "EntertainmentApplication",
    "operatingSystem": "All",
    "description": "Free AI-powered emoji combiner. Pick 2–6 emojis and get a vibe check, story, caption, hidden meaning and more.",
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
