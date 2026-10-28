import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { tools } from "@/data/toolsData";
import { SEARCH_KEYWORDS } from "@/data/searchKeywords";

describe("tool catalogue", () => {
  it("has unique slugs and ids", () => {
    const slugs = tools.map((t) => t.slug);
    const ids = tools.map((t) => t.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every tool a name, description and icon", () => {
    for (const t of tools) {
      expect(t.name.trim(), t.slug).not.toBe("");
      expect(t.description.trim(), t.slug).not.toBe("");
      expect(t.icon.trim(), t.slug).not.toBe("");
    }
  });

  it("gives every tool its own page", () => {
    for (const t of tools) {
      expect(existsSync(path.join(process.cwd(), "src/app", t.slug, "page.tsx")), t.slug).toBe(true);
    }
  });

  it("gives every tool search keywords, and no keyword entry is orphaned", () => {
    const slugs = new Set(tools.map((t) => t.slug));
    for (const t of tools) {
      expect(SEARCH_KEYWORDS[t.slug]?.length ?? 0, t.slug).toBeGreaterThan(0);
    }
    for (const key of Object.keys(SEARCH_KEYWORDS)) {
      expect(slugs.has(key), `orphan keywords: ${key}`).toBe(true);
    }
  });
});
