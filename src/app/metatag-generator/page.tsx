import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/MetaTagGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/metatag-generator";

const seo: PageSEO = {
  "title": "Free Meta Tag Generator – SEO, Open Graph & Twitter Cards",
  "description": "Generate SEO meta tags, Open Graph tags, and Twitter Card tags with live Google and social preview. Download or copy the HTML. Free online tool.",
  "canonical": `${SITE_URL}/metatag-generator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
