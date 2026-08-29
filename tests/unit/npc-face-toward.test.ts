/**
 * NPC face-toward-player rotation tests (Phase 3.5).
 *
 * Lucas (2026-08-29) requested: when a player starts talking to an
 * NPC, the NPC should rotate to look the player in the eyes, with
 * a small animation. The plan's "NPC body rotation" bullet is
 * extended to cover this conversation-triggered rotation.
 *
 * The pure function `yawToFace(from, to)` returns the yaw the NPC
 * should hold so that it faces `to` from `from`. The convention is
 * the same as in `src/engine/controls.ts`: yaw=0 means facing -Z.
 * The helper inverts the sign of dx because a positive yaw rotates
 * the body to face -X (left) in the standard FPS convention.
 */
import { describe, expect, it } from "vitest";
import { yawToFace } from "../../src/engine/npc-face";

describe("yawToFace", () => {
  it("faces -Z when the target is directly to the north", () => {
    // NPC at (0, 0, 0), target at (0, 0, -5) — target is in -Z direction.
    // The NPC should face -Z, which is yaw=0.
    expect(yawToFace({ x: 0, z: 0 }, { x: 0, z: -5 })).toBeCloseTo(0, 5);
  });

  it("faces +Z when the target is directly to the south", () => {
    expect(yawToFace({ x: 0, z: 0 }, { x: 0, z: 5 })).toBeCloseTo(Math.PI, 5);
  });

  it("faces -X when the target is to the west", () => {
    // Convention: yaw=π/2 means facing -X. So a target at -X
    // direction needs yaw=+π/2.
    expect(yawToFace({ x: 0, z: 0 }, { x: -5, z: 0 })).toBeCloseTo(Math.PI / 2, 5);
  });

  it("faces +X when the target is to the east", () => {
    // yaw=-π/2 means facing +X. So a target at +X needs yaw=-π/2.
    expect(yawToFace({ x: 0, z: 0 }, { x: 5, z: 0 })).toBeCloseTo(-Math.PI / 2, 5);
  });

  it("handles 45° angles correctly", () => {
    // Target at (1, 0, -1) is to the north-east. The NPC should
    // face yaw=-π/4 (between 0 and -π/2).
    expect(yawToFace({ x: 0, z: 0 }, { x: 1, z: -1 })).toBeCloseTo(-Math.PI / 4, 5);
  });

  it("returns zero when the two positions are identical (degenerate)", () => {
    // The function should not throw or return NaN when the target
    // is the same as the source. We pick a sensible default of 0.
    expect(yawToFace({ x: 3, z: 4 }, { x: 3, z: 4 })).toBe(0);
  });

  it("clamps the result to [-π, π]", () => {
    // Going east and wrapping around should clamp to -π/2, not
    // 3π/2 or 2π.
    const y = yawToFace({ x: 0, z: 0 }, { x: 100, z: 0 });
    expect(y).toBeGreaterThanOrEqual(-Math.PI);
    expect(y).toBeLessThanOrEqual(Math.PI);
  });
});
