import { describe, expect, it } from "vitest";

import { LUNCH_CHATTER, LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";
import { BUREK_LINES } from "../../src/content/dog-dialogues";
import { INTER_NPC_LINES } from "../../src/content/office-chatter";

const ASCII = /^[\x20-\x7E]+$/;
const MAX_HUMAN_LENGTH = 60;

describe("LUNCH_DIALOGUES_HUMAN", () => {
  it("has at least 45 lines (upper bound grew with authored exchanges, C-46 amendment)", () => {
    expect(LUNCH_DIALOGUES_HUMAN.length).toBeGreaterThanOrEqual(45);
    expect(LUNCH_DIALOGUES_HUMAN.length).toBeLessThanOrEqual(95);
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

describe("LUNCH_CHATTER (C-46 starter+response exchanges)", () => {
  it("derives the flat pool from the authored exchanges without dropping lines", () => {
    const flattened = LUNCH_CHATTER.flatMap((exchange) => [exchange.starter, ...exchange.responses]);
    expect(flattened).toEqual(LUNCH_DIALOGUES_HUMAN);
  });

  it("gives nearly all starters 2+ responses for randomness", () => {
    const withTwoResponses = LUNCH_CHATTER.filter((exchange) => exchange.responses.length >= 2);
    expect(withTwoResponses.length).toBeGreaterThanOrEqual(LUNCH_CHATTER.length - 3);
  });

  it("responses belong to their starter's scene (hand-authored pairs)", () => {
    // Spot-check the amended authoring rule with three scenes.
    const stolen = LUNCH_CHATTER.find((e) => e.starter === "Who ate my lunch? Be honest.");
    expect(stolen?.responses.some((r) => r.includes("Burek"))).toBe(true);
    const microwave = LUNCH_CHATTER.find((e) => e.starter === "The microwave smells like a war crime.");
    expect(microwave?.responses).toContain("Don't microwave fish. That's a P0.");
    const diet = LUNCH_CHATTER.find((e) => e.starter === "I'm on a diet.");
    expect(diet?.responses).toContain("I'm keto until the pizza arrives.");
  });
});
