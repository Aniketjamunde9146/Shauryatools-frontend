import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Home from "@/components/Home";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const seo: PageSEO = {
  "title": "ShauryaTools – Free Online Developer & Creator Tools",
  "description": "Fast, free utilities for developers and creators. JSON formatter, password generator, regex tester, unit converter and more — no sign-up, no nonsense.",
  "keywords": "free developer tools, online utilities, json formatter, password generator, regex tester, unit converter, markdown previewer",
  "canonical": `${SITE_URL}/`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata("/", seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname="/" />
      <Home />
    </>
  );
}
