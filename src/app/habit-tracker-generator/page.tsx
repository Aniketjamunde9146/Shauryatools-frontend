import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import SimpleAITool from "@/components/SimpleAITool";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/habit-tracker-generator";

const seo: PageSEO = {
  "title": "Free AI Habit Tracker Generator – Printable PDF Templates",
  "description": "Generate a beautiful printable habit tracker PDF. Choose your layout, theme, habits and month — get a ready-to-print tracker with motivational quotes instantly.",
  "canonical": `${SITE_URL}/habit-tracker-generator`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <ClientOnly>
        <SimpleAITool slug={PATH.slice(1)} />
      </ClientOnly>
    </>
  );
}
