import type { Metadata } from "next";
import Tool from "@/styles/tools/PxRemConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/px-rem-converter";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free PX to REM Converter for CSS",
  description: "Convert pixels to rem for CSS with a 16px base or your own base size. Also converts rem back to pixels. Free.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
