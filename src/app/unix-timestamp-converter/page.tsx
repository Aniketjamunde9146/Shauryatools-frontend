import type { Metadata } from "next";
import Tool from "@/styles/tools/UnixTimestampConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/unix-timestamp-converter";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Unix Timestamp Converter – Epoch to Date and Back",
  description: "Convert Unix epoch timestamps to readable UTC dates, and dates back to timestamps. Seconds or milliseconds. Free.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
