import type { Metadata } from "next";
import Tool from "@/styles/tools/RandomNamePicker";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/random-name-picker";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Random Name Picker – Pick a Name at Random",
  description: "Paste a list of names or options and pick one at random. Useful for giveaways, classes and team decisions. Free.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
