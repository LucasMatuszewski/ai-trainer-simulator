import { describe, expect, it } from "vitest";

import { BUREK_LINES } from "../../src/content/dog-dialogues";
import { LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";
import { INTER_NPC_LINES } from "../../src/content/office-chatter";

const ASCII = /^[\x20-\x7E\n]+$/;
const MAX_DOG_LENGTH = 40;

describe("BUREK_LINES", () => {
  it("has between 10 and 18 lines", () => {
    expect(BUREK_LINES.length).toBeGreaterThanOrEqual(10);
    expect(BUREK_LINES.length).toBeLessThanOrEqual(18);
  });

  it("keeps every line at or under 40 characters including the newline", () => {
    for (const line of BUREK_LINES) {
      expect(line.length).toBeLessThanOrEqual(MAX_DOG_LENGTH);
    }
  });

  it("uses the MUD convention: bark in asterisks + bracketed subtitle", () => {
    // C-61 amendment (Lucas): the dog speaks in "*sound* [means: x]"
    // pairs or pure *action* lines - never human sentences.
    for (const line of BUREK_LINES) {
      const isPair = /^\*[^\n]+\*\n\[means: .+\]$/.test(line);
      const isPureAction = /^\*[^*]+\*$/.test(line);
      expect(isPair || isPureAction, `not dog-speech: ${JSON.stringify(line)}`).toBe(true);
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
