import { describe, expect, it } from "vitest";
import {
  GOODBYE_BY_NPC,
  pickEveningGoodbye,
} from "../../src/content/evening-goodbyes";
import { NPCS } from "../../src/content/npcs";

/**
 * C-62: evening goodbye bubbles mirror the C-56 morning greetings -
 * every rostered human has a pool, every line fits the bubble, plain
 * ASCII, and the rng never returns an empty line. Burek speaks in the
 * C-61 dog markers.
 */
describe("evening goodbyes content (C-62)", () => {
  it("has a pool for every rostered human NPC (Burek speaks dog)", () => {
    for (const npc of NPCS) {
      if (npc.gender === "dog") continue;
      const pool = GOODBYE_BY_NPC[npc.id];
      expect(pool, `missing goodbye pool for ${npc.id}`).toBeDefined();
      expect(pool?.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it("every line fits the two-line bubble (<= 72 chars, plain ASCII)", () => {
    for (const [id, pool] of Object.entries(GOODBYE_BY_NPC)) {
      for (const line of pool) {
        expect(line.length, `${id} too long: ${line.length} chars`).toBeLessThanOrEqual(72);
        expect(/^[\x20-\x7e\n]+$/.test(line), `${id} not plain ASCII: ${line}`).toBe(true);
      }
    }
  });

  it("pickEveningGoodbye returns a non-empty line for every NPC and any rng", () => {
    const rngs = [() => 0, () => 0.5, () => 0.99];
    for (const npc of NPCS) {
      for (const rng of rngs) {
        const line = pickEveningGoodbye(npc.id, rng);
        expect(line.length, `${npc.id} empty pick`).toBeGreaterThan(0);
      }
    }
  });

  it("the dog goodbye uses the C-61 marker convention, not human speech", () => {
    for (const rng of [() => 0, () => 0.5, () => 0.99]) {
      const line = pickEveningGoodbye("burek", rng);
      const rows = line.split("\n");
      for (const row of rows) {
        expect(
          /^(\*[^*\n]+\*|\[[^\]\n]+\]|\([^)\n]+\))$/.test(row),
          `not dog-speech: ${JSON.stringify(row)}`,
        ).toBe(true);
      }
    }
  });
});
