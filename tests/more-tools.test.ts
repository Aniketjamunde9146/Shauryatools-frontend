import { describe, expect, it } from "vitest";
import {
  fromRoman,
  isoToUnix,
  pickOne,
  pxToRem,
  remToPx,
  sha256Hex,
  splitBill,
  toRoman,
  unixToIso,
} from "@/lib/toolLogic";

describe("tip calculator", () => {
  it("adds the tip and splits the total", () => {
    const r = splitBill(1000, 10, 4);
    expect(r.tip).toBe(100);
    expect(r.total).toBe(1100);
    expect(r.perPerson).toBe(275);
  });
  it("never divides by zero people", () => {
    expect(splitBill(500, 0, 0).perPerson).toBe(500);
  });
});

describe("unix timestamp", () => {
  it("reads seconds and milliseconds the same way", () => {
    expect(unixToIso(0)).toBe("1970-01-01T00:00:00.000Z");
    expect(unixToIso(1700000000)).toBe("2023-11-14T22:13:20.000Z");
    expect(unixToIso(1700000000000)).toBe("2023-11-14T22:13:20.000Z");
  });
  it("converts a date back to seconds", () => {
    expect(isoToUnix("2023-11-14T22:13:20")).toBe(1700000000);
    expect(isoToUnix("2023-11-14T22:13")).toBe(1699999980);
  });
  it("rejects garbage input", () => {
    expect(unixToIso(Number.NaN)).toBeNull();
  });
});

describe("px and rem", () => {
  it("converts with a 16px base by default", () => {
    expect(pxToRem(24)).toBe(1.5);
    expect(remToPx(1.5)).toBe(24);
  });
  it("supports a custom base size", () => {
    expect(pxToRem(20, 10)).toBe(2);
  });
});

describe("roman numerals", () => {
  it("converts numbers", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
    expect(toRoman(0)).toBeNull();
    expect(toRoman(4000)).toBeNull();
  });
  it("converts numerals back and rejects non-standard forms", () => {
    expect(fromRoman("MCMXCIV")).toBe(1994);
    expect(fromRoman("iv")).toBe(4);
    expect(fromRoman("IIII")).toBeNull();
    expect(fromRoman("ABC")).toBeNull();
  });
});

describe("random picker", () => {
  it("picks deterministically with a fixed random source", () => {
    expect(pickOne(["a", "b", "c"], () => 0)).toBe("a");
    expect(pickOne(["a", "b", "c"], () => 0.99)).toBe("c");
  });
  it("returns null for an empty list", () => {
    expect(pickOne([], () => 0)).toBeNull();
  });
});

describe("sha-256", () => {
  it("matches the known digest of 'abc'", async () => {
    expect(await sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
});
