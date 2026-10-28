import type { Metadata } from "next";
import Tool from "@/styles/tools/DateDifferenceCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/date-difference-calculator";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Date Difference Calculator – Days Between Two Dates",
  description: "Calculate the exact days, weeks, months and years between two dates. See total days and hours. Free, no sign-up.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
