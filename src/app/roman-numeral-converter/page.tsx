import type { Metadata } from "next";
import Tool from "@/styles/tools/RomanNumeralConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/roman-numeral-converter";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Roman Numeral Converter – Number to Roman and Back",
  description: "Convert numbers from 1 to 3999 into Roman numerals, and Roman numerals back to numbers. Free and instant.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
