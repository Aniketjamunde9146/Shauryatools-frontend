import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/CoverLetterGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/cover-letter-generator";

const seo: PageSEO = {
  "title": "Free AI Cover Letter Generator – Personalized, ATS-Optimized",
  "description": "Generate professional, personalized cover letters with AI. Tailored to the job, company, and your experience. Free, no sign-up required.",
  "canonical": `${SITE_URL}/cover-letter-generator`,
  "og": {
    "title": "Free AI Cover Letter Generator – Personalized & ATS-Optimized",
    "description": "Generate professional cover letters tailored to any job and company with AI. Free, no sign-up.",
    "type": "website",
    "url": `${SITE_URL}/cover-letter-generator`
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "AI Cover Letter Generator",
    "description": "Generate personalized, ATS-optimized cover letters with AI instantly."
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
