import type { Metadata } from "next";
import Tool from "@/styles/tools/Sha256HashGenerator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const PATH = "/sha256-hash-generator";

export const metadata: Metadata = buildMetadata(PATH, {
  title: "Free SHA-256 Hash Generator – Hash Text Online",
  description: "Generate a SHA-256 hash of any text. The hash is computed in your browser and nothing is sent to a server. Free.",
});

export default function Page() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <Tool />
    </>
  );
}
