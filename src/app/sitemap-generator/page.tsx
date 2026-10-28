import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/SitemapGenerator";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/sitemap-generator";

const seo: PageSEO = {
  "title": "Free XML Sitemap Generator – SEO Sitemap Builder",
  "description": "Generate a valid XML sitemap instantly. Add URLs with priority, change frequency, and last modified date. Download or copy your sitemap.xml for free.",
  "canonical": `${SITE_URL}/sitemap-generator`,
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
