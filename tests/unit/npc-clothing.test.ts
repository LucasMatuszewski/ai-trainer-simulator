import { describe, expect, it } from "vitest";
import { clothingForNpc, createNpcMesh } from "../../src/engine/npc-mesh";

describe("NPC clothing", () => {
  it("varies clothing between NPC ids", () => {
    const sets = ["klaudia", "zosia", "kasia"].map((id) => JSON.stringify(clothingForNpc(id, "female")));
    expect(new Set(sets).size).toBeGreaterThan(1);
  });

  it("keeps the same NPC clothing deterministic across mesh creation", () => {
    const first = createNpcMesh("female", 2, "zosia").userData.clothing;
    const second = createNpcMesh("female", 2, "zosia").userData.clothing;
    expect(second).toEqual(first);
  });
});
