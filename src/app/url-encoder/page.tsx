import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/Urlencoderdecoder";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/url-encoder";

const seo: PageSEO = {
  "title": "Free URL Encoder / Decoder & Parser Online – ShauryaTools",
  "description": "Encode, decode, and parse URLs instantly. Supports encodeURIComponent, encodeURI, and strict query encoding. View query params in a clean table. Free.",
  "canonical": `${SITE_URL}/url-encoder`,
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
