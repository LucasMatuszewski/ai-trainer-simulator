/**
 * Tests for planWalkToFace (pure planner).
 *
 * The planner returns a target position + facing yaws for a player
 * walking toward an NPC to start a conversation. It is a pure
 * function: same input, same output, no side effects. See
 * src/engine/walk-to-face.ts for the math.
 *
 * Reference cases (C-09, ADR-0007 §4.3):
 *  - player in front of NPC
 *  - player behind NPC
 *  - player to the side
 *  - player at 45 degrees
 *  - player already at conversational distance
 *  - degenerate case: player standing on top of NPC
 */

import { describe, expect, it } from "vitest";
import {
  planWalkToFace,
  CONVERSATION_DISTANCE,
  yawToward,
} from "../../src/engine/walk-to-face";

const BOUNDS = { minX: -9, maxX: 9, minZ: -9, maxZ: 9 };

function distXZ(
  a: { x: number; z: number },
  b: { x: number; z: number },
): number {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

describe("planWalkToFace", () => {
  it("returns a target CONVERSATION_DISTANCE from the NPC", () => {
    // Player is south of the NPC (positive z = south, NPC at origin).
    const r = planWalkToFace({
      player: { x: 0, y: 0, z: 4 },
      npc: { x: 0, y: 0, z: 0 },
      officeBounds: BOUNDS,
    });
    expect(r.alreadyClose).toBe(false);
    expect(r.target[2]).toBeCloseTo(CONVERSATION_DISTANCE, 5);
    // Distance from NPC to target = CONVERSATION_DISTANCE.
    expect(distXZ({ x: r.target[0], z: r.target[2] }, { x: 0, z: 0 })).toBeCloseTo(
      CONVERSATION_DISTANCE,
      5,
    );
  });

  it("player and NPC face each other when the walk ends", () => {
    // Player is northeast of NPC. Target should be ~1.6m from NPC
    // along the NPC->player direction. When the player is at target,
    // they face the NPC; the NPC faces the player.
    const r = planWalkToFace({
      player: { x: 4, y: 0, z: 4 },
      npc: { x: 0, y: 0, z: 0 },
      officeBounds: BOUNDS,
    });
    // playerYaw: player should face the NPC, i.e. toward (-x, -z)
    const expectedPlayerYaw = yawToward({ x: r.target[0], z: r.target[2] }, { x: 0, z: 0 });
    expect(r.playerYaw).toBeCloseTo(expectedPlayerYaw, 5);
    // npcYaw: NPC should face the player at target
    const expectedNpcYaw = yawToward({ x: 0, z: 0 }, { x: r.target[0], z: r.target[2] });
    expect(r.npcYaw).toBeCloseTo(expectedNpcYaw, 5);
  });

  it("marks alreadyClose=true when the player is within conversational distance", () => {
    const r = planWalkToFace({
      player: { x: 0, y: 0, z: 1.0 },
      npc: { x: 0, y: 0, z: 0 },
      officeBounds: BOUNDS,
    });
    expect(r.alreadyClose).toBe(true);
    // Target equals the player's current position.
    expect(r.target[0]).toBe(0);
    expect(r.target[2]).toBe(1.0);
  });

  it("marks alreadyClose=false when the player is just beyond conversational distance", () => {
    const r = planWalkToFace({
      player: { x: 0, y: 0, z: CONVERSATION_DISTANCE + 1.0 },
      npc: { x: 0, y: 0, z: 0 },
      officeBounds: BOUNDS,
    });
    expect(r.alreadyClose).toBe(false);
  });

  it("handles the degenerate case where the player is on the NPC", () => {
    const r = planWalkToFace({
      player: { x: 0, y: 0, z: 0 },
      npc: { x: 0, y: 0, z: 0 },
      officeBounds: BOUNDS,
    });
    // Picks a deterministic fallback (south of NPC).
    expect(r.target[2]).toBeCloseTo(-CONVERSATION_DISTANCE, 5);
    expect(r.alreadyClose).toBe(true);
  });

  it("clamps the target to the office bounds", () => {
    // Player is right at the south wall; target would naturally land
    // outside the bounds. The clamp pulls it back inside.
    const r = planWalkToFace({
      player: { x: 0, y: 0, z: 9 },
      npc: { x: 0, y: 0, z: 8 },
      officeBounds: BOUNDS,
    });
    expect(r.target[0]).toBeGreaterThanOrEqual(BOUNDS.minX);
    expect(r.target[0]).toBeLessThanOrEqual(BOUNDS.maxX);
    expect(r.target[2]).toBeGreaterThanOrEqual(BOUNDS.minZ);
    expect(r.target[2]).toBeLessThanOrEqual(BOUNDS.maxZ);
  });

  it("returns a target on the line from NPC to player", () => {
    // The target should be collinear with the NPC and the player.
    const r = planWalkToFace({
      player: { x: 3, y: 0, z: 4 },
      npc: { x: 0, y: 0, z: 0 },
      officeBounds: BOUNDS,
    });
    // Cross product of (npc -> target) and (npc -> player) is zero
    // (modulo a small epsilon). I.e. they point the same way.
    const tx = r.target[0] - 0;
    const tz = r.target[2] - 0;
    const px = 3;
    const pz = 4;
    // Cross in XZ: tx*pz - tz*px = 0 means collinear.
    const cross = tx * pz - tz * px;
    expect(Math.abs(cross)).toBeLessThan(1e-4);
  });
});
