import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/AgeCalculator";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/age-calculator";

const seo: PageSEO = {
  "title": "Free Age Calculator – Find Your Exact Age Online",
  "description": "Calculate your exact age in years, months and days. See your zodiac sign, Chinese zodiac, day of birth, leap year status and days until your next birthday.",
  "canonical": `${SITE_URL}/age-calculator`,
  "og": {
    "title": "Free Age Calculator – Find Your Exact Age Online",
    "description": "Enter your birthday and instantly see your exact age plus fun facts: zodiac sign, Chinese zodiac, day of week born and days until your next birthday.",
    "type": "website",
    "url": `${SITE_URL}/age-calculator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Free Age Calculator Online",
    "description": "Find your exact age in years, months & days. Plus zodiac sign, leap year info and days until your next birthday. Free, no signup."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Age Calculator",
    "url": `${SITE_URL}/age-calculator`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "description": "Calculate your exact age in years, months and days. Includes zodiac sign, Chinese zodiac, day of week born, and days until next birthday.",
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
        <Tool />
      </ClientOnly>
    </>
  );
}
