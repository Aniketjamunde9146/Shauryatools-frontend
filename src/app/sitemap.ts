import type { MetadataRoute } from "next";
import { tools } from "@/data/toolsData";
import { SITE_URL } from "@/lib/seo";

// Dates are left out on purpose: a fake "last modified" is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...tools.map((tool) => ({
      url: `${SITE_URL}/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
