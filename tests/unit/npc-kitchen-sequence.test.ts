import { describe, expect, it } from "vitest";

import {
  KITCHEN_MICRO_STOPS,
  KITCHEN_STOP_DWELL,
  KITCHEN_STOP_JITTER_RADIUS,
  pickKitchenSequence,
} from "../../src/content/npc-schedule";

function seededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

describe("kitchen micro-sequences", () => {
  it("selects three or four unique stops", () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const sequence = pickKitchenSequence("bartek", seededRng(seed));
      expect(sequence.length).toBeGreaterThanOrEqual(3);
      expect(sequence.length).toBeLessThanOrEqual(4);
      expect(new Set(sequence.map((stop) => stop.id)).size).toBe(sequence.length);
    }
  });

  it("is deterministic for identical random streams", () => {
    expect(pickKitchenSequence("kasia", seededRng(42))).toEqual(
      pickKitchenSequence("kasia", seededRng(42)),
    );
  });

  it("uses the NPC id to separate jitter for identical random streams", () => {
    const first = pickKitchenSequence("bartek", seededRng(7));
    const second = pickKitchenSequence("tomek", seededRng(7));
    expect(first[0]?.id).toBe(second[0]?.id);
    expect(first[0]?.entry.position).not.toEqual(second[0]?.entry.position);
  });

  it("keeps every jittered position within the stop radius", () => {
    for (const stop of pickKitchenSequence("przemek", seededRng(99))) {
      const base = KITCHEN_MICRO_STOPS[stop.id].position;
      const dx = stop.entry.position.x - base.x;
      const dz = stop.entry.position.z - base.z;
      expect(Math.hypot(dx, dz)).toBeLessThanOrEqual(KITCHEN_STOP_JITTER_RADIUS + 1e-12);
      expect(stop.entry.position.y).toBe(base.y);
    }
  });

  it("uses the configured dwell duration for every chosen stop", () => {
    for (const stop of pickKitchenSequence("ania", seededRng(123))) {
      expect(stop.dwellSeconds).toBe(KITCHEN_STOP_DWELL[stop.id]);
    }
  });
});
