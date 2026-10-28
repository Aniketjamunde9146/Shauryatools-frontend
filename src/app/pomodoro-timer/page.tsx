import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/PomodoroTimer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/pomodoro-timer";

const seo: PageSEO = {
  "title": "Free Pomodoro Focus Timer – Productivity Timer Online",
  "description": "Free online Pomodoro timer with customizable focus sessions, short & long breaks, task tracking, and sound alerts. Boost deep work and stay productive.",
  "canonical": `${SITE_URL}/pomodoro-timer`,
  "og": {},
  "twitter": {}
};

export const metadata: Metadata = buildMetadata(PATH, seo);

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
