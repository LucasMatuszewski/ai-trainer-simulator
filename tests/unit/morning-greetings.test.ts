import { describe, expect, it } from "vitest";
import {
  GREETINGS_BY_CATEGORY,
  GREETINGS_BY_NPC,
  NPC_GREETING_CATEGORY,
  pickMorningGreeting,
} from "../../src/content/morning-greetings";
import { NPCS } from "../../src/content/npcs";

/**
 * C-56 (Lucas: "NPCs should always say hello when they enter the
 * room in the morning! Now it is so unnatural and strange, and dead").
 * Pins both the file shape (every rostered NPC has a line pool, every
 * category has a fallback pool) and the runtime contract
 * (pickMorningGreeting never returns an empty string and falls back
 * npc -> category -> "office" without an rng bias).
 */
describe("morning greetings content (C-56)", () => {
  it("has a pool for every rostered human NPC (Burek never enters)", () => {
    for (const npc of NPCS) {
      if (npc.gender === "dog") continue; // Burek is always already-in and never greets.
      const pool = GREETINGS_BY_NPC[npc.id];
      expect(pool, `missing pool for ${npc.id}`).toBeDefined();
      expect(pool?.length ?? 0).toBeGreaterThanOrEqual(3);
    }
  });

  it("every line fits the two-line bubble (<= 72 chars, plain ASCII)", () => {
    for (const [id, pool] of Object.entries(GREETINGS_BY_NPC)) {
      for (const line of pool) {
        expect(line.length, `${id} too long: ${line.length} chars`).toBeLessThanOrEqual(72);
        // eslint-disable-next-line no-control-regex
        expect(/^[\x20-\x7e]+$/.test(line), `${id} not plain ASCII: ${line}`).toBe(true);
      }
    }
  });

  it("every human NPC maps to a known specialization category (Burek never enters)", () => {
    for (const npc of NPCS) {
      if (npc.gender === "dog") continue;
      expect(NPC_GREETING_CATEGORY[npc.id], `missing category for ${npc.id}`).toBeDefined();
    }
  });

  it("every specialization category has a fallback pool", () => {
    for (const category of Object.keys(GREETINGS_BY_CATEGORY) as Array<keyof typeof GREETINGS_BY_CATEGORY & string>) {
      const pool = GREETINGS_BY_CATEGORY[category];
      expect(pool.length, `${category} pool empty`).toBeGreaterThan(0);
    }
  });

  it("pickMorningGreeting returns a non-empty line for every NPC and any rng", () => {
    const rngs = [() => 0, () => 0.5, () => 0.99];
    for (const npc of NPCS) {
      for (const rng of rngs) {
        const line = pickMorningGreeting(npc.id, rng);
        expect(line.length, `${npc.id} empty pick`).toBeGreaterThan(0);
      }
    }
  });

  it("falls back to the 'office' pool for unknown ids", () => {
    const office = GREETINGS_BY_CATEGORY.office;
    const line = pickMorningGreeting("nobody-ever-named-this", () => 0);
    expect(office).toContain(line);
  });
});
