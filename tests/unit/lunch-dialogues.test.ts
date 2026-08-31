import { describe, expect, it } from "vitest";

import { LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";
import { BUREK_LINES } from "../../src/content/dog-dialogues";
import { INTER_NPC_LINES } from "../../src/engine/bubbles";

const ASCII = /^[\x20-\x7E]+$/;
const MAX_HUMAN_LENGTH = 60;

describe("LUNCH_DIALOGUES_HUMAN", () => {
  it("has at least 45 lines (quality-first relaxed cap per Lucas, 2026-08-31)", () => {
    expect(LUNCH_DIALOGUES_HUMAN.length).toBeGreaterThanOrEqual(45);
    expect(LUNCH_DIALOGUES_HUMAN.length).toBeLessThanOrEqual(70);
  });

  it("keeps every line at or under 60 characters (bubble canvas limit)", () => {
    for (const line of LUNCH_DIALOGUES_HUMAN) {
      expect(line.length).toBeLessThanOrEqual(MAX_HUMAN_LENGTH);
    }
  });

  it("is plain ASCII only (no em dashes, smart quotes, emoji)", () => {
    for (const line of LUNCH_DIALOGUES_HUMAN) {
      expect(line).toMatch(ASCII);
    }
  });

  it("contains no empty lines and no duplicates", () => {
    for (const line of LUNCH_DIALOGUES_HUMAN) {
      expect(line.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(LUNCH_DIALOGUES_HUMAN).size).toBe(LUNCH_DIALOGUES_HUMAN.length);
  });

  it("never overlaps INTER_NPC_LINES", () => {
    const workPool = new Set(INTER_NPC_LINES);
    for (const line of LUNCH_DIALOGUES_HUMAN) {
      expect(workPool.has(line)).toBe(false);
    }
  });

  it("never overlaps BUREK_LINES", () => {
    const dogPool = new Set(BUREK_LINES);
    for (const line of LUNCH_DIALOGUES_HUMAN) {
      expect(dogPool.has(line)).toBe(false);
    }
  });
});
