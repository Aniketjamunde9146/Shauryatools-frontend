import { describe, expect, it } from "vitest";
import { tools } from "@/lib/tools";
import { tools as catalog } from "@/data/toolsData";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import sitemap from "@/app/sitemap";

const wordCount = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

describe("tool SEO registry", () => {
  it("covers every catalogued tool with complete unique metadata and content", () => {
    expect(tools).toHaveLength(catalog.length);
    expect(new Set(tools.map((tool) => tool.name)).size).toBe(tools.length);
    expect(new Set(tools.map((tool) => tool.shortDescription)).size).toBe(tools.length);
    expect(new Set(tools.map((tool) => tool.intro)).size).toBe(tools.length);

    for (const tool of tools) {
      expect(tool.shortDescription.length).toBeGreaterThanOrEqual(140);
      expect(tool.shortDescription.length).toBeLessThanOrEqual(160);
      expect(wordCount(tool.intro)).toBeGreaterThanOrEqual(80);
      expect(wordCount(tool.intro)).toBeLessThanOrEqual(150);
      expect(tool.howToSteps.length).toBeGreaterThanOrEqual(3);
      expect(tool.howToSteps.length).toBeLessThanOrEqual(5);
      expect(tool.faqs.length).toBeGreaterThanOrEqual(3);
      expect(tool.faqs.length).toBeLessThanOrEqual(5);
      expect(tool.relatedSlugs.length).toBeGreaterThanOrEqual(4);
      expect(tool.relatedSlugs.length).toBeLessThanOrEqual(6);
      expect(tool.indexable).toBe(true);

      const metadata = buildMetadata(`/${tool.slug}`);
      expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/${tool.slug}`);
      expect(metadata.title).toEqual({ absolute: `${tool.name} | Free Online Tool | ShauryaTools` });
      expect(metadata.description).toBe(tool.shortDescription);
    }
  });

  it("includes only indexable tools in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    const toolUrls = urls.filter((url) => url !== `${SITE_URL}/` &&
      url !== `${SITE_URL}/tools` &&
      url !== `${SITE_URL}/about`);

    expect(toolUrls).toEqual(
      tools.filter((tool) => tool.indexable).map((tool) => `${SITE_URL}/${tool.slug}`),
    );
  });
});
