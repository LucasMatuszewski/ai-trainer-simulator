import { describe, expect, it } from "vitest";

import { BUREK_LINES } from "../../src/content/dog-dialogues";
import { LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";
import { INTER_NPC_LINES } from "../../src/content/office-chatter";

const ASCII = /^[\x20-\x7E]+$/;
const MAX_DOG_LENGTH = 25;

describe("BUREK_LINES", () => {
  it("has between 5 and 8 lines", () => {
    expect(BUREK_LINES.length).toBeGreaterThanOrEqual(5);
    expect(BUREK_LINES.length).toBeLessThanOrEqual(8);
  });

  it("keeps every line at or under 25 characters (dog sounds, not speech)", () => {
    for (const line of BUREK_LINES) {
      expect(line.length).toBeLessThanOrEqual(MAX_DOG_LENGTH);
    }
  });

  it("is plain ASCII only (no em dashes, smart quotes, emoji)", () => {
    for (const line of BUREK_LINES) {
      expect(line).toMatch(ASCII);
    }
  });

  it("contains no empty lines and no duplicates", () => {
    for (const line of BUREK_LINES) {
      expect(line.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(BUREK_LINES).size).toBe(BUREK_LINES.length);
  });

  it("never overlaps INTER_NPC_LINES", () => {
    const workPool = new Set(INTER_NPC_LINES);
    for (const line of BUREK_LINES) {
      expect(workPool.has(line)).toBe(false);
    }
  });

  it("never overlaps LUNCH_DIALOGUES_HUMAN", () => {
    const lunchPool = new Set(LUNCH_DIALOGUES_HUMAN);
    for (const line of BUREK_LINES) {
      expect(lunchPool.has(line)).toBe(false);
    }
  });
});
