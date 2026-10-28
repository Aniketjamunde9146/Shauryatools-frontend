import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/PasswordGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/password-generator";

const seo: PageSEO = {
  "title": "Free Secure Password Generator – Strength Analyzer",
  "description": "Generate cryptographically secure passwords with strength scoring, crack-time estimation, and bulk export. Supports passphrases. 100% free, runs in browser.",
  "canonical": `${SITE_URL}/password-generator`,
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
