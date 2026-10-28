import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  convertCase,
  dateDifference,
  formatDuration,
  loremText,
  parseHex,
  textStats,
  wcagLevels,
  zonedToInstant,
} from "@/lib/toolLogic";

describe("word counter", () => {
  it("counts words, characters, sentences and paragraphs", () => {
    const s = textStats("Hello world. This is a test!");
    expect(s.words).toBe(6);
    expect(s.characters).toBe(28);
    expect(s.charactersNoSpaces).toBe(23);
    expect(s.sentences).toBe(2);
  });
  it("returns zero for empty input", () => {
    expect(textStats("   ").words).toBe(0);
  });
  it("counts paragraphs separated by blank lines", () => {
    expect(textStats("one\n\ntwo\n\nthree").paragraphs).toBe(3);
  });
  it("formats short durations in seconds", () => {
    expect(formatDuration(0.5)).toBe("30 sec");
    expect(formatDuration(2)).toBe("2.0 min");
  });
});

describe("case converter", () => {
  it("converts to each style", () => {
    expect(convertCase("hello world", "upper")).toBe("HELLO WORLD");
    expect(convertCase("Hello World", "title")).toBe("Hello World");
    expect(convertCase("hello world. it works", "sentence")).toBe("Hello world. It works");
    expect(convertCase("hello world foo", "camel")).toBe("helloWorldFoo");
    expect(convertCase("helloWorld", "snake")).toBe("hello_world");
    expect(convertCase("Hello World", "kebab")).toBe("hello-world");
    expect(convertCase("hello world", "constant")).toBe("HELLO_WORLD");
  });
});

describe("lorem ipsum", () => {
  it("is deterministic and starts with the classic opening", () => {
    expect(loremText(2)).toBe(loremText(2));
    expect(loremText(1).startsWith("Lorem ipsum dolor sit amet")).toBe(true);
  });
  it("produces the requested number of paragraphs", () => {
    expect(loremText(3).split("\n\n")).toHaveLength(3);
  });
});

describe("color contrast", () => {
  it("parses short and full hex", () => {
    expect(parseHex("#fff")).toEqual([255, 255, 255]);
    expect(parseHex("1f2937")).toEqual([31, 41, 55]);
    expect(parseHex("zzz")).toBeNull();
  });
  it("gives 21:1 for black on white", () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 1);
  });
  it("passes AA for normal text at #767676 on white", () => {
    const ratio = contrastRatio([0x76, 0x76, 0x76], [255, 255, 255]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
    expect(wcagLevels(ratio).normalAA).toBe(true);
    expect(wcagLevels(ratio).normalAAA).toBe(false);
  });
});

describe("timezone converter", () => {
  it("converts Kolkata time to UTC", () => {
    expect(zonedToInstant("2026-01-01T12:00", "Asia/Kolkata").toISOString()).toBe("2026-01-01T06:30:00.000Z");
  });
  it("accounts for daylight saving in New York", () => {
    expect(zonedToInstant("2026-07-01T12:00", "America/New_York").toISOString()).toBe("2026-07-01T16:00:00.000Z");
    expect(zonedToInstant("2026-01-01T12:00", "America/New_York").toISOString()).toBe("2026-01-01T17:00:00.000Z");
  });
});

describe("date difference", () => {
  it("counts total days, weeks and hours", () => {
    const d = dateDifference("2026-01-01", "2026-12-31");
    expect(d.totalDays).toBe(364);
    expect(d.weeks).toBe(52);
    expect(d.remainderDays).toBe(0);
    expect(d.hours).toBe(364 * 24);
  });
  it("gives calendar years, months and days", () => {
    const d = dateDifference("2020-01-15", "2026-03-10");
    expect([d.years, d.months, d.days]).toEqual([6, 1, 23]);
  });
  it("gives the same result regardless of order", () => {
    const forward = dateDifference("2026-01-01", "2026-03-01");
    const backward = dateDifference("2026-03-01", "2026-01-01");
    expect(backward.totalDays).toBe(forward.totalDays);
    expect(backward.reversed).toBe(true);
  });
});
