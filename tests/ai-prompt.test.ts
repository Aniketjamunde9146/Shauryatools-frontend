import { describe, expect, it } from "vitest";
import { AI_TOOLS, LANGUAGES, TONES, buildAIPrompt } from "@/lib/aiTools";

const toneTools = ["linkedin-post-generator", "blog-post-generator", "social-media-caption-generator",
  "cold-email-generator", "email-generator", "ai-email-reply-generator", "instagram-bio-generator",
  "excuse-generator", "product-description-generator", "self-intro-generator", "speech-script-generator",
  "story-generator", "whatsapp-generator", "whatsapp-rewriter", "youtube-description-generator"];

describe("AI tool prompt builder", () => {
  it("writes only filled fields, using their labels", () => {
    const cfg = AI_TOOLS["diet-plan-generator"];
    const prompt = buildAIPrompt(cfg, { age: "24", weight_kg: "70", height_cm: "170", diet_type: "Vegan", goal: "Lose weight", activity: "" }, "Simple", "English");
    expect(prompt).toContain("- Age: 24");
    expect(prompt).toContain("- Diet type: Vegan");
    expect(prompt).not.toContain("Activity level");
  });

  it("omits the Details section when no field has a value", () => {
    const cfg = AI_TOOLS["daily-affirmation-generator"];
    const prompt = buildAIPrompt(cfg, { focus: "   " }, "Simple", "English");
    expect(prompt).not.toContain("Details:");
  });

  it("includes the Tone line only for tools where tone matters", () => {
    expect(buildAIPrompt(AI_TOOLS["email-generator"], { purpose: "leave" }, "Formal", "English")).toContain("Tone: Formal");
    expect(buildAIPrompt(AI_TOOLS["diet-plan-generator"], { age: "24" }, "Formal", "English")).not.toContain("Tone:");
  });

  it("always includes the Language line", () => {
    for (const cfg of Object.values(AI_TOOLS)) {
      expect(buildAIPrompt(cfg, {}, TONES[0], LANGUAGES[1])).toContain("Language: write the whole answer in Hindi.");
    }
  });

  it("has exactly the 15 writing tools with tone, and every tool offers language", () => {
    const withTone = Object.entries(AI_TOOLS).filter(([, cfg]) => cfg.showTone).map(([slug]) => slug).sort();
    expect(withTone).toEqual([...toneTools].sort());
    for (const cfg of Object.values(AI_TOOLS)) expect(cfg.showLanguage).toBe(true);
  });

  it("gives every tool at least one field, unique field ids, and options on every select", () => {
    for (const [slug, cfg] of Object.entries(AI_TOOLS)) {
      expect(cfg.fields.length).toBeGreaterThan(0);
      const ids = cfg.fields.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const field of cfg.fields) {
        if (field.type === "select") expect(Boolean(field.options?.length)).toBe(true);
        if (field.type !== "select") expect(field.options === undefined).toBe(true);
      }
    }
    expect(Object.keys(AI_TOOLS).length).toBe(43);
  });

  it("marks the required fields on the diet plan and budget tools", () => {
    const diet = AI_TOOLS["diet-plan-generator"].fields.filter((f) => f.required).map((f) => f.id);
    expect(diet).toEqual(["age", "weight_kg", "height_cm", "diet_type", "goal"]);
    const budget = AI_TOOLS["budget-planner"].fields.filter((f) => f.required).map((f) => f.id);
    expect(budget).toEqual(["income"]);
  });
});
