import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/FlipClock";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/flip-clock";

const seo: PageSEO = {
  "title": "Flip Clock – Live Clock, Countdown, Stopwatch & World Clock",
  "description": "All-in-one animated flip clock with countdown timer, stopwatch with lap times, 10-city world clock, dark/light mode, fullscreen & custom accent colours.",
  "canonical": `${SITE_URL}/flip-clock`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <ClientOnly>
        <Tool />
      </ClientOnly>
    </>
  );
}
