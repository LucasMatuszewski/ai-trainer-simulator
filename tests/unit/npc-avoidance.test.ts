import { describe, expect, it } from "vitest";
import {
  BLOCKED_HALF_WIDTH,
  BLOCKED_LOOKAHEAD,
  BLOCKED_PROGRESS_RATIO,
  ESCAPE_DISTANCES,
  ESCAPE_HALF_WIDTH,
  ESCAPE_TURNS,
  MIN_SEPARATION,
  arrivalClearOf,
  capsuleBlocked,
  escapeWaypoint,
  separationCorrection,
  walkBlockedAhead,
  type XZPoint,
} from "../../src/engine/npc-avoidance";

function point(x: number, z: number): XZPoint {
  return { x, z };
}
const neverBlocked = (): boolean => false;

describe("walkBlockedAhead (C-48 v2 stop-at-distance)", () => {
  it("sees a walker dead ahead inside the lookahead", () => {
    expect(walkBlockedAhead(point(0, 0), 0, 1, [point(0, 1)])).toBe(true);
  });

  it("ignores a clear line, side traffic, and people behind", () => {
    expect(walkBlockedAhead(point(0, 0), 0, 1, [point(0, 5)])).toBe(false);
    expect(walkBlockedAhead(point(0, 0), 0, 1, [point(0.8, 0.8)])).toBe(false);
    expect(walkBlockedAhead(point(0, 0), 0, 1, [point(0, -1)])).toBe(false);
  });

  it("fires for someone inside the half-width of the walk line", () => {
    expect(walkBlockedAhead(point(0, 0), 0, 1, [point(0.4, 0.6)])).toBe(true);
  });

  it("does not block a stationary walker", () => {
    expect(walkBlockedAhead(point(0, 0), 0, 0, [point(0, 0.5)])).toBe(false);
  });
});

describe("capsuleBlocked (straight-line clearance)", () => {
  it("detects an NPC inside the corridor", () => {
    expect(capsuleBlocked(point(0, 0), point(0, 2), [point(0, 1)], BLOCKED_HALF_WIDTH)).toBe(true);
  });

  it("is clear when off to the side or beyond the far end", () => {
    expect(capsuleBlocked(point(0, 0), point(0, 2), [point(0.6, 1)], BLOCKED_HALF_WIDTH)).toBe(false);
    expect(capsuleBlocked(point(0, 0), point(0, 2), [point(0, 3)], BLOCKED_HALF_WIDTH)).toBe(false);
  });

  it("degenerates safely on a zero-length segment", () => {
    expect(capsuleBlocked(point(1, 1), point(1, 1), [point(1, 1)], BLOCKED_HALF_WIDTH)).toBe(false);
  });
});

describe("escapeWaypoint (C-48 v3 loop that never gives up)", () => {
  it("leads with the walker's own right when the way is clear", () => {
    const escape = escapeWaypoint(point(0, 0), 0, 1, 0, [], neverBlocked);
    expect(escape).not.toBeNull();
    expect(escape!.x).toBeGreaterThan(0);
    expect(escape!.z).toBeGreaterThan(0);
  });

  it("leads elsewhere on the next attempt (the fan rotates)", () => {
    const first = escapeWaypoint(point(0, 0), 0, 1, 0, [], neverBlocked)!;
    const second = escapeWaypoint(point(0, 0), 0, 1, 1, [], neverBlocked)!;
    expect(second.x).toBeLessThan(0);
    expect(Math.hypot(second.x - first.x, second.z - first.z)).toBeGreaterThan(0.5);
  });

  it("goes BACKWARD when everything forward and sideways is blocked", () => {
    // Lucas: "movement in new direction, even opposite direction if needed".
    const escape = escapeWaypoint(point(0, 0), 0, 1, 0, [], (_x, z) => z > -0.1);
    expect(escape).not.toBeNull();
    expect(escape!.z).toBeLessThan(0);
  });

  it("squeezes out of a crowd that rejects every fan candidate", () => {
    // Eight neighbours ringed at 0.85 m: every fan candidate is within
    // MIN_SEPARATION of someone, so only the last-resort step survives.
    const ring: XZPoint[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return point(Math.cos(angle) * 0.85, Math.sin(angle) * 0.85);
    });
    const escape = escapeWaypoint(point(0, 0), 0, 1, 0, ring, neverBlocked);
    expect(escape).not.toBeNull();
    // Dead centre of a symmetric ring: back the way it came.
    expect(escape!.z).toBeLessThan(0);
  });

  it("steps away from the crowd centroid when jammed off-centre", () => {
    const crowd = [point(0.5, 0.2), point(0.6, -0.3), point(0.55, 0.7), point(0.2, 0.5)];
    const escape = escapeWaypoint(point(0, 0), 0, 1, 0, crowd, neverBlocked);
    expect(escape).not.toBeNull();
    // Every candidate leads away from the mass on its right/front.
    expect(escape!.x).toBeLessThanOrEqual(0.05);
  });

  it("returns null only when even the last resort is furniture", () => {
    expect(escapeWaypoint(point(0, 0), 0, 1, 0, [point(0.4, 0.4)], () => true)).toBeNull();
    expect(escapeWaypoint(point(0, 0), 0, 0, 0, [], neverBlocked)).toBeNull();
  });
});

describe("separationCorrection (C-48 hard separation)", () => {
  it("returns null when the pair is already at least MIN_SEPARATION apart", () => {
    expect(separationCorrection(point(0, 0), point(1, 0), MIN_SEPARATION)).toBeNull();
  });

  it("reports the unit axis from a toward b plus the missing distance", () => {
    const correction = separationCorrection(point(0, 0), point(0.3, 0), MIN_SEPARATION);
    expect(correction).not.toBeNull();
    expect(correction!.nx).toBe(1);
    expect(correction!.nz).toBe(0);
    expect(correction!.penetration).toBeCloseTo(MIN_SEPARATION - 0.3, 12);
  });

  it("de-stacks coincident points along the deterministic +x axis", () => {
    expect(separationCorrection(point(2, 2), point(2, 2), MIN_SEPARATION)).toEqual({
      nx: 1, nz: 0, penetration: MIN_SEPARATION,
    });
  });
});

describe("arrivalClearOf (C-48 arrival placement)", () => {
  it("returns the target untouched when nobody is near", () => {
    const target = point(14, 0);
    expect(arrivalClearOf(target, [point(5, 5)], MIN_SEPARATION, neverBlocked)).toEqual(target);
  });

  it("parks at least MIN_SEPARATION away from an occupant, off furniture", () => {
    const target = point(0, 0);
    const spot = arrivalClearOf(target, [point(0, 0.2)], MIN_SEPARATION, neverBlocked);
    const distance = Math.hypot(spot.x - 0, spot.z - 0.2);
    expect(distance).toBeGreaterThanOrEqual(MIN_SEPARATION - 1e-9);
    // The target itself was occupied, so the spot must have moved.
    expect(Math.hypot(spot.x - target.x, spot.z - target.z)).toBeGreaterThan(0);
  });

  it("falls back to the target when every ring spot is blocked", () => {
    const target = point(0, 0);
    expect(arrivalClearOf(target, [point(0, 0.1)], MIN_SEPARATION, () => true)).toEqual(target);
  });
});

describe("C-48 v3 constants", () => {
  it("exposes the tuned policy values", () => {
    expect(MIN_SEPARATION).toBe(0.8);
    expect(BLOCKED_LOOKAHEAD).toBe(1.1);
    expect(BLOCKED_HALF_WIDTH).toBe(0.5);
    expect(ESCAPE_HALF_WIDTH).toBe(0.4);
    expect(BLOCKED_PROGRESS_RATIO).toBe(0.25);
    expect(ESCAPE_DISTANCES).toEqual([1, 1.5]);
    // The fan ends with a straight-back option so a jam always has one.
    expect(ESCAPE_TURNS).toHaveLength(7);
    expect(ESCAPE_TURNS[ESCAPE_TURNS.length - 1]).toBeCloseTo(Math.PI, 12);
  });
});
