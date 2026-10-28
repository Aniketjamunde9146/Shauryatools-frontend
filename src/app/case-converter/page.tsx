import type { Metadata } from "next";
import Tool from "@/styles/tools/CaseConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/case-converter";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Case Converter – Title, Upper, Lower, camelCase & snake_case",
  description: "Convert text between UPPERCASE, lowercase, Title Case, sentence case, camelCase, snake_case and kebab-case. Free and instant.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
