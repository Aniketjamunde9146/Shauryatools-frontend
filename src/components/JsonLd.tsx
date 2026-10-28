import { buildGraph } from "@/lib/seo";

// "<" is escaped so the JSON can never close the <script> tag early.
const serialize = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

interface Props {
  pathname: string;
  /** Extra page-specific schema.org objects (e.g. the tool's WebApplication). */
  extra?: object[];
}

export default function JsonLd({ pathname, extra }: Props) {
  // A page-specific WebApplication replaces the generic one instead of sitting beside it.
  const hasOwnApp = !!extra?.some((item: any) => item?.["@type"] === "WebApplication");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(buildGraph(pathname, { includeApp: !hasOwnApp })) }}
      />
      {extra?.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
      ))}
    </>
  );
}
