import type { Metadata } from "next";
import Tool from "@/styles/tools/TipCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/tip-calculator";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Tip Calculator – Split the Bill and Tip Instantly",
  description: "Calculate the tip, total bill and each person's share. Pick 5 to 20 percent or enter your own. Free, no sign-up.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
