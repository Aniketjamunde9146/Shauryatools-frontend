import type { Metadata } from "next";
import Tool from "@/styles/tools/ColorContrastChecker";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/color-contrast-checker";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Color Contrast Checker – WCAG AA & AAA Accessibility Test",
  description: "Check the contrast ratio of text and background colors against WCAG 2 AA and AAA levels. Free accessibility contrast checker.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
