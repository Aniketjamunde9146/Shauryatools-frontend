import { describe, expect, it } from "vitest";
import { parseAIResult } from "@/components/AIResultContent";

describe("AI result formatting", () => {
  it("recognizes headings, paragraphs, ordered and unordered lists, and quotes", () => {
    expect(parseAIResult(
      "# Overview\nA short introduction.\n\n## Next steps\n1. First action\n2. Second action\n\n- One option\n- Another option\n\n> Keep this in mind",
    )).toEqual([
      { type: "heading", level: 2, text: "Overview" },
      { type: "paragraph", text: "A short introduction." },
      { type: "heading", level: 3, text: "Next steps" },
      { type: "list", ordered: true, items: ["First action", "Second action"] },
      { type: "list", ordered: false, items: ["One option", "Another option"] },
      { type: "quote", text: "Keep this in mind" },
    ]);
  });

  it("keeps fenced code formatting and treats ordinary text as paragraphs", () => {
    expect(parseAIResult("A plain response.\nContinued on the next line.\n\n```js\nconst answer = 42;\n```")).toEqual([
      { type: "paragraph", text: "A plain response. Continued on the next line." },
      { type: "code", language: "js", text: "const answer = 42;" },
    ]);
  });
});
