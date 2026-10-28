import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ExamCountdown";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/exam-countdown";

const seo: PageSEO = {
  "title": "Free Exam Countdown Timer – Track All Your Exams",
  "description": "Track all your upcoming exams with live countdowns. Add exam dates, set priorities, get urgency alerts and never miss an exam again. Free student tool.",
  "canonical": `${SITE_URL}/exam-countdown`,
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
