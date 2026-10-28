import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Tool from "@/styles/tools/MarkdownPreviewer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, type PageSEO } from "@/lib/seo";

const PATH = "/markdown-previewer";

const seo: PageSEO = {
  "title": "Free Markdown Editor & Live Previewer Online – ShauryaTools",
  "description": "Write Markdown with a real-time split-pane preview. Supports tables, task lists, code blocks, syntax highlighting. Export to .md or .html. Free.",
  "canonical": `${SITE_URL}/markdown-previewer`,
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
