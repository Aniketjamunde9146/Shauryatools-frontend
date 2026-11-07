import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import type { ToolEntry } from "@/lib/tools";
import { SEARCH_KEYWORDS } from "@/data/searchKeywords";
import { getGroup } from "@/lib/toolMeta";
import { SITE_URL } from "@/lib/site";

export { SITE_URL } from "@/lib/site";
export const SITE_NAME = "ShauryaTools";
export const DEFAULT_DESCRIPTION =
  "Free online tools for developers, creators, students, and everyday tasks. No login, no signup, and instant results.";

/** Per-page SEO values (what each page used to pass to <Helmet>). Anything omitted falls back to toolsData. */
export interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  og?: { title?: string; description?: string; type?: string; url?: string; siteName?: string };
  twitter?: { card?: string; title?: string; description?: string };
  other?: Record<string, string>;
}

export function findTool(pathname: string): ToolEntry | undefined {
  return tools.find((item) => `/${item.slug}` === pathname);
}

/** Comma-separated keywords for a tool page, from src/data/searchKeywords.ts. Undefined for non-tool pages. */
export function getKeywords(pathname: string): string | undefined {
  const tool = findTool(pathname);
  const list = tool ? SEARCH_KEYWORDS[tool.slug] : undefined;
  return list?.length ? list.join(", ") : undefined;
}

export function buildMetadata(pathname: string, seo: PageSEO = {}): Metadata {
  const tool = findTool(pathname);
  const canonical = tool ? `${SITE_URL}/${tool.slug}` : seo.canonical ?? `${SITE_URL}${pathname}`;
  const title =
    tool
      ? `${tool.name} | Free Online Tool | ${SITE_NAME}`
      : seo.title ?? `Free Online Tools | ${SITE_NAME}`;
  const description = tool?.shortDescription ?? seo.description ?? DEFAULT_DESCRIPTION;
  const image = { url: `${SITE_URL}/og-image.png`, alt: `${title} - ${SITE_NAME}` };

  return {
    title: { absolute: title },
    description,
    keywords: seo.keywords ?? getKeywords(pathname),
    authors: seo.author ? [{ name: seo.author }] : undefined,
    robots: tool ? { index: tool.indexable, follow: true } : seo.robots,
    alternates: { canonical },
    openGraph: {
      type: (seo.og?.type ?? (pathname === "/" ? "website" : "article")) as "website" | "article",
      siteName: seo.og?.siteName ?? SITE_NAME,
      title: seo.og?.title ?? title,
      description: seo.og?.description ?? description,
      url: seo.og?.url ?? canonical,
      images: [image],
    },
    twitter: {
      card: (seo.twitter?.card ?? "summary_large_image") as "summary_large_image" | "summary",
      title: seo.twitter?.title ?? title,
      description: seo.twitter?.description ?? description,
      images: [image.url],
    },
    other: seo.other,
  };
}

/**
 * Site-wide schema.org graph: WebPage, BreadcrumbList, WebSite, Organization, plus (for tools)
 * a WebApplication. FAQPage markup is emitted alongside the visible FAQ content.
 * `includeApp: false` lets a page supply its own, more specific WebApplication without duplicating it.
 */
export function buildGraph(pathname: string, { includeApp = true }: { includeApp?: boolean } = {}) {
  const tool = findTool(pathname);
  const canonical = `${SITE_URL}${pathname}`;
  const title = tool ? `${tool.name} | Free Online Tool | ${SITE_NAME}` : `Free Online Tools | ${SITE_NAME}`;
  const description = tool?.shortDescription || DEFAULT_DESCRIPTION;

  const breadcrumb = tool
    ? {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: getGroup(tool).label, item: `${SITE_URL}/#${getGroup(tool).id}` },
          { "@type": "ListItem", position: 3, name: tool.name, item: canonical },
        ],
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        ...(breadcrumb ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo.png`,
        sameAs: ["https://instagram.com/aniket_jamunde_002", "https://github.com/Aniketjamunde9146"],
      },
      ...(breadcrumb ? [breadcrumb] : []),
      ...(tool && includeApp
        ? [
            {
              "@type": "WebApplication",
              "@id": `${canonical}#app`,
              name: tool.name,
              url: canonical,
              description,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any (web browser)",
              browserRequirements: "Requires JavaScript",
              isAccessibleForFree: true,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          ]
        : []),
    ],
  };
}
