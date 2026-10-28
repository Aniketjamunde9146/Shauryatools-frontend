import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/JwtDecoder";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/jwt-decoder";

const seo: PageSEO = {
  "title": "JWT Decoder – Decode & Inspect JSON Web Tokens Online",
  "description": "Decode a JWT in your browser. Read the header, payload and claims, check exp, nbf and iat dates, and spot unsafe settings. Nothing is uploaded.",
  "canonical": `${SITE_URL}/jwt-decoder`
};

export const metadata: Metadata = buildMetadata(PATH, seo);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JWT Decoder",
    "url": `${SITE_URL}/jwt-decoder`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any (web browser)",
    "isAccessibleForFree": true,
    "description": "Free online JWT decoder. Reads the header, payload and standard claims of a JSON Web Token and shows whether it has expired. Runs in the browser and does not verify signatures.",
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
