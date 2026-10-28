import type { Metadata } from "next";
import Tool from "@/styles/tools/TimezoneConverter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/timezone-converter";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Timezone Converter – Convert Time Between Time Zones",
  description: "Convert a date and time between world time zones, including daylight saving changes. Compare India, US, UK, Europe and more.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
