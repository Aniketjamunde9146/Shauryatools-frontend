import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/StudyStreakTracker";
import JsonLd from "@/components/JsonLd";
import ClientOnly from "@/components/ClientOnly";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/study-streak-tracker";

const seo: PageSEO = {
  "title": "Study Streak Tracker – Track Daily Study Sessions",
  "description": "Track your daily study streaks, log study sessions by subject, visualise your progress with a heatmap calendar, and hit your daily study goals. Free tool.",
  "canonical": `${SITE_URL}/study-streak-tracker`,
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
