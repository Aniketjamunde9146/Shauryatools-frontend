import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/Uuidgenerator";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/uuid-generator";

const seo: PageSEO = {
  "title": "Free UUID Generator Online – v1, v4, NIL with Anatomy View",
  "description": "Generate UUIDs in v1, v4 or NIL format. Supports multiple output formats including URN and no-dash. Bulk generate, download, and view UUID anatomy. Free.",
  "canonical": `${SITE_URL}/uuid-generator`,
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
