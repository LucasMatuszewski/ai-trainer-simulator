import { describe, expect, it } from "vitest";
import { NPCS } from "../../src/content/npcs";

describe("NPC desk-side mix", () => {
  it("places male and female NPCs on both office sides", () => {
    for (const gender of ["male", "female"] as const) {
      const npcs = NPCS.filter((npc) => npc.gender === gender);
      expect(npcs.some((npc) => npc.position.x < 0)).toBe(true);
      expect(npcs.some((npc) => npc.position.x > 0)).toBe(true);
    }
  });

  it("does not place two NPCs at the same position", () => {
    const positions = NPCS.map((npc) => `${npc.position.x},${npc.position.y},${npc.position.z}`);
    expect(new Set(positions).size).toBe(positions.length);
  });
});
