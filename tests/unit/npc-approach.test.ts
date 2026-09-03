/**
 * The geometry behind "Bartek comes over when the tutorial finishes"
 * (Lucas, 2026-09-03). Pure, so it is tested without three.js.
 */
import { describe, expect, it } from "vitest";
import { approachSpotFor, APPROACH_DISTANCE } from "../../src/content/npc-approach";

const BOUNDS = { minX: -20, maxX: 20, minZ: -20, maxZ: 20 };

describe("approachSpotFor", () => {
  it("stops the approach distance away from the player", () => {
    const spot = approachSpotFor({ x: 0, z: 0 }, { x: 0, z: 10 }, BOUNDS, []);
    expect(Math.hypot(spot.position.x, spot.position.z)).toBeCloseTo(APPROACH_DISTANCE, 2);
  });

  it("approaches from the side the NPC is already on", () => {
    // Walking around the player to stand on the far side would read as
    // avoidance, and lengthens the walk for nothing.
    const spot = approachSpotFor({ x: 0, z: 0 }, { x: 0, z: 10 }, BOUNDS, []);
    expect(spot.position.z).toBeGreaterThan(0);

    const other = approachSpotFor({ x: 0, z: 0 }, { x: -10, z: 0 }, BOUNDS, []);
    expect(other.position.x).toBeLessThan(0);
  });

  it("faces the player", () => {
    const spot = approachSpotFor({ x: 0, z: 0 }, { x: 0, z: 10 }, BOUNDS, []);
    // Standing at +Z looking back at the origin means looking -Z, i.e. PI.
    expect(Math.abs(spot.face)).toBeCloseTo(Math.PI, 1);
  });

  it("nudges out of furniture rather than standing inside a desk", () => {
    const desk = { minX: 1, maxX: 4, minZ: -1, maxZ: 1 };
    const spot = approachSpotFor({ x: 0, z: 0 }, { x: 10, z: 0 }, BOUNDS, [desk]);
    const insideDesk =
      spot.position.x > desk.minX && spot.position.x < desk.maxX &&
      spot.position.z > desk.minZ && spot.position.z < desk.maxZ;
    expect(insideDesk).toBe(false);
  });

  it("does not divide by zero when the NPC is on top of the player", () => {
    const spot = approachSpotFor({ x: 5, z: 5 }, { x: 5, z: 5 }, BOUNDS, []);
    expect(Number.isFinite(spot.position.x)).toBe(true);
    expect(Number.isFinite(spot.position.z)).toBe(true);
    expect(Number.isFinite(spot.face)).toBe(true);
  });
});
