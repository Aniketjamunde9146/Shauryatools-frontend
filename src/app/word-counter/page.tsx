import type { Metadata } from "next";
import Tool from "@/styles/tools/WordCounter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/word-counter";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free Word Counter – Words, Characters & Reading Time Online",
  description: "Count words, characters, sentences and paragraphs instantly. See reading and speaking time too. Free, no sign-up, runs in your browser.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
