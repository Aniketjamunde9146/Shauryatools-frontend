import type { Metadata } from "next";
import Tool from "@/styles/tools/LoremIpsumGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/lorem-ipsum-generator";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Lorem Ipsum Generator – Placeholder Text for Designs",
  description: "Generate Lorem Ipsum placeholder paragraphs for mockups, page layouts and design tests. Choose 1 to 10 paragraphs and copy in one click.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
