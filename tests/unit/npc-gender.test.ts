/**
 * NPC data + gender tests (Phase 3.5).
 *
 * Lucas reported (2026-08-29):
 *   "Women look same as men, no difference at all."
 *
 * The fix is data-driven: every NPC has a `gender: "male" | "female"
 * | "dog"` field. A future task will use that to render a gendered
 * mesh. This test pins the data so:
 *   1. Every NPC has the field.
 *   2. The field is one of the three allowed values.
 *   3. Specific NPCs are male, specific ones are female, and Burek
 *      is a dog (per the original design — he's the CEO's dog).
 *
 * The 3.5 plan calls for visual gender rendering; that requires the
 * 3D scene update. This test only locks the data side.
 */
import { describe, expect, it } from "vitest";
import { NPCS, OFFICE_BOUNDS } from "../../src/content/npcs";
import type { NpcId } from "../../src/types";

const EXPECTED_GENDER: Record<NpcId, "male" | "female" | "dog"> = {
  bartek: "male",
  klaudia: "female",
  marek: "male",
  zosia: "female",
  pawel: "male",
  kasia: "female",
  tomek: "male",
  ania: "female",
  janusz: "male",
  burek: "dog",
  grazyna: "female",
  maciek: "male",
  przemek: "male",
  dawid: "male",
};

describe("NPCS data", () => {
  it("includes a gender field for every NPC", () => {
    for (const npc of NPCS) {
      expect(
        npc.gender,
        `${npc.id} is missing a gender field`,
      ).toBeDefined();
      expect(
        ["male", "female", "dog"],
        `${npc.id} has invalid gender ${(npc as { gender: string }).gender}`,
      ).toContain(npc.gender);
    }
  });

  it("assigns the expected gender to every NPC (per Lucas's intent)", () => {
    for (const npc of NPCS) {
      expect(
        npc.gender,
        `${npc.id}: expected ${EXPECTED_GENDER[npc.id]}, got ${npc.gender}`,
      ).toBe(EXPECTED_GENDER[npc.id]);
    }
  });

  it("marks Burek as a dog, not a humanoid", () => {
    const burek = NPCS.find((n) => n.id === "burek");
    expect(burek).toBeDefined();
    expect(burek?.gender).toBe("dog");
  });

  it("places every NPC inside the office bounds", () => {
    // C-35 / L-2026-08-31-02: the CEO (Dawid) sits in the CEO
    // office north of the main office (x=[-8, 8], z=[-19, -9]),
    // so his z is below OFFICE_BOUNDS.minZ by design. Every
    // other NPC stays inside the main office bounds.
    const CEO_OFFICE_MIN_Z = -19;
    for (const npc of NPCS) {
      expect(
        npc.position.x,
        `${npc.id}.x out of bounds`,
      ).toBeGreaterThanOrEqual(OFFICE_BOUNDS.minX);
      expect(npc.position.x).toBeLessThanOrEqual(OFFICE_BOUNDS.maxX);
      expect(
        npc.position.z,
        `${npc.id}.z out of bounds`,
      ).toBeGreaterThanOrEqual(npc.id === "dawid" ? CEO_OFFICE_MIN_Z : OFFICE_BOUNDS.minZ);
      expect(npc.position.z).toBeLessThanOrEqual(OFFICE_BOUNDS.maxZ);
    }
  });

  it("has at least one female NPC (Lucas noticed all looked the same)", () => {
    const females = NPCS.filter((n) => n.gender === "female");
    expect(females.length).toBeGreaterThan(0);
  });
});
