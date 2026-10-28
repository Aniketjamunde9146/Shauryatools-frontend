import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/BmiCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/bmi-calculator";

const seo: PageSEO = {
  "title": "Free BMI Calculator – Body Mass Index Calculator Online",
  "description": "Calculate your Body Mass Index (BMI) instantly. Supports metric and imperial units. See your BMI category, healthy weight range, and visual gauge. Free, no signup.",
  "canonical": `${SITE_URL}/bmi-calculator`,
  "og": {
    "title": "Free BMI Calculator – Body Mass Index Online",
    "description": "Calculate your BMI instantly with metric or imperial units. Free online tool.",
    "type": "website",
    "url": `${SITE_URL}/bmi-calculator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Free BMI Calculator Online",
    "description": "Calculate your Body Mass Index in seconds. Metric & imperial supported."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BMI Calculator",
    "url": `${SITE_URL}/bmi-calculator`,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "description": "Free online BMI calculator. Calculate body mass index in metric or imperial units and see your health category.",
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
      <Tool />
    </>
  );
}
