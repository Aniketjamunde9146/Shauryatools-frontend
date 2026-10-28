import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/LicenseGenerator";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/license-generator";

const seo: PageSEO = {
  "title": "Free Open Source License Generator – MIT, GPL, Apache & More",
  "description": "Generate a LICENSE file for your project in seconds. Choose from MIT, Apache 2.0, GPL, BSD, ISC, CC0 and more. Download ready-to-use files instantly.",
  "canonical": `${SITE_URL}/license-generator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <ClientOnly>
        <Tool />
      </ClientOnly>
    </>
  );
}
