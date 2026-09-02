/**
 * C-63 (Lucas, 2026-09-02): "I would also move working npc a little
 * closer to the desk, they are a little too far away now."
 *
 * The old 0.7 m legroom gap read as "standing near a desk" rather than
 * "working at it". This pins the new 0.45 m so a future layout pass
 * cannot quietly drift it back, and pins the two constraints that stop
 * "closer" from turning into "inside the furniture": the NPC's 0.3 m
 * body radius must still clear the desk AABB, and the spawn validator
 * must still accept every desk position.
 */
import { describe, expect, it } from "vitest";
import { NPCS, OBSTACLES } from "../../src/content/npcs";
import { NPC_SCHEDULES, type Period } from "../../src/content/npc-schedule";
import { NPC_DEFAULT_RADIUS, getNpcObstacles, isSpawnBlocked } from "../../src/engine/npc-spawn-validator";
import type { NpcId } from "../../src/types";

/** C-63: how far a working NPC stands from their desk's near edge. */
const DESK_STANDING_DISTANCE = 0.45;

/** NPCs whose "at-desk" spot is NOT a wall desk with a `desk-<id>` AABB:
 *  the CEO has his own executive desk in the CEO office (already 0.3 m
 *  away, untouched by C-63) and Burek is a dog on the floor. */
const NOT_AT_A_WALL_DESK: ReadonlySet<NpcId> = new Set(["dawid", "burek"]);

function distanceToAabb(
  point: { x: number; z: number },
  box: { minX: number; maxX: number; minZ: number; maxZ: number },
): number {
  const dx = Math.max(box.minX - point.x, 0, point.x - box.maxX);
  const dz = Math.max(box.minZ - point.z, 0, point.z - box.maxZ);
  return Math.hypot(dx, dz);
}

const deskFor = (npcId: NpcId) => OBSTACLES.find((obstacle) => obstacle.id === `desk-${npcId}`);

const PERIODS: readonly Period[] = ["morning", "afternoon", "evening"];

describe("working NPCs stand close to their desk (C-63)", () => {
  it("puts every wall-desk NPC 0.45 m from their desk edge in the roster", () => {
    for (const npc of NPCS) {
      if (NOT_AT_A_WALL_DESK.has(npc.id)) continue;
      const desk = deskFor(npc.id);
      expect(desk, `${npc.id} has no desk AABB`).toBeDefined();
      expect(distanceToAabb(npc.position, desk!), `${npc.id} stands too far from their desk`)
        .toBeCloseTo(DESK_STANDING_DISTANCE, 5);
    }
  });

  it("puts every at-desk schedule entry the same 0.45 m away", () => {
    for (const npc of NPCS) {
      if (NOT_AT_A_WALL_DESK.has(npc.id)) continue;
      const desk = deskFor(npc.id)!;
      for (const period of PERIODS) {
        const entry = NPC_SCHEDULES[npc.id][period];
        if (entry.state !== "at-desk") continue;
        expect(distanceToAabb(entry.position, desk), `${npc.id}/${period}`)
          .toBeCloseTo(DESK_STANDING_DISTANCE, 5);
      }
    }
  });

  it("keeps the NPC body clear of the desk it is standing at", () => {
    // 0.45 m of standing distance against a 0.3 m body radius leaves
    // 0.15 m of air. Closer than the radius would put the body inside
    // the desk AABB and the separation pass would fight the schedule.
    expect(DESK_STANDING_DISTANCE).toBeGreaterThan(NPC_DEFAULT_RADIUS);
  });

  it("leaves every desk position acceptable to the spawn validator", () => {
    const obstacles = getNpcObstacles();
    for (const npc of NPCS) {
      if (NOT_AT_A_WALL_DESK.has(npc.id)) continue;
      expect(
        isSpawnBlocked({ x: npc.position.x, z: npc.position.z, radius: NPC_DEFAULT_RADIUS }, obstacles),
        `${npc.id} spawns inside furniture`,
      ).toBe(false);
    }
  });

  it("keeps the roster position and the schedule position in sync", () => {
    for (const npc of NPCS) {
      const morning = NPC_SCHEDULES[npc.id].morning;
      if (morning.state !== "at-desk") continue;
      expect(morning.position.x, `${npc.id} x`).toBeCloseTo(npc.position.x, 5);
      expect(morning.position.z, `${npc.id} z`).toBeCloseTo(npc.position.z, 5);
    }
  });
});
