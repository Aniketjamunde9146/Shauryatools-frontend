import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/RegexTester";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/regex-tester";

const seo: PageSEO = {
  "title": "Free Regex Tester & Debugger Online – Live Match Highlighting",
  "description": "Build and test regular expressions with live match highlighting, capture groups, and a replace tab. Includes a full reference guide. Free regex tool.",
  "canonical": `${SITE_URL}/regex-tester`,
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
