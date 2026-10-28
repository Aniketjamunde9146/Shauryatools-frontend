import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/ResumeBuilder";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/resume-builder";

const seo: PageSEO = {
  "title": "Free AI Resume Builder – ATS-Optimized Resume Generator",
  "description": "Build a professional ATS-optimized resume with AI. Get instant resume generation, ATS score, and improvement suggestions. Free, no sign-up.",
  "canonical": `${SITE_URL}/resume-builder`,
  "og": {
    "title": "Free AI Resume Builder – ATS-Optimized",
    "description": "Build a professional ATS-optimized resume with AI instantly. Free, no sign-up required.",
    "type": "website",
    "url": `${SITE_URL}/resume-builder`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "AI Resume Builder",
    "description": "Build ATS-optimized resumes with AI instantly. Free."
  }
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
