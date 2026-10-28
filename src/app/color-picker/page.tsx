import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ColorPicker";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/color-picker";

const seo: PageSEO = {
  "title": "Color Picker – HEX, RGB, HSL, CMYK Converter & Palettes",
  "description": "Free online color picker. Convert colors between HEX, RGB, HSL and CMYK, build palettes and check WCAG contrast ratios for accessible color pairs.",
  "canonical": `${SITE_URL}/color-picker`,
  "og": {
    "title": "Color Picker – HEX, RGB, HSL, CMYK & Palette Generator",
    "description": "Free color picker with format conversion, palette generation and WCAG accessibility checking.",
    "type": "website",
    "url": `${SITE_URL}/color-picker`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Online Color Picker & Palette Generator",
    "description": "Pick colors, convert formats and generate palettes. Free tool."
  }
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Color Picker",
    "url": `${SITE_URL}/color-picker`,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "description": "Free online color picker with HEX, RGB, HSL, CMYK conversion, palette generation and WCAG accessibility checker.",
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
