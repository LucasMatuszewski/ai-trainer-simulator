import { describe, expect, it } from "vitest";
import { CHATTER_RADIUS } from "../../src/engine/chatter";
import { NPC_SCHEDULES } from "../../src/content/npc-schedule";

/**
 * C-57 (Lucas): "The friends sitting on the desk next to each other
 * should talk sometimes." The chatter radius must cover every pair of
 * desk neighbours - people who share a desk column are the natural
 * office pairs. Before this the radius was 2.5 m while adjacent desks
 * sit 2.5-4.5 m apart, so desk neighbours could NEVER chat.
 */
describe("desk neighbours are within chatter radius (C-57)", () => {
  it("covers every adjacent pair in a desk column", () => {
    // Morning at-desk positions, grouped by desk column (same x).
    const columns = new Map<number, number[]>();
    for (const schedule of Object.values(NPC_SCHEDULES)) {
      const entry = schedule.morning;
      if (entry.state !== "at-desk") continue;
      const key = Math.round(entry.position.x * 2) / 2;
      const zs = columns.get(key) ?? [];
      zs.push(entry.position.z);
      columns.set(key, zs);
    }

    expect(columns.size).toBeGreaterThanOrEqual(2);
    const neighbours: Array<{ a: number; b: number; gap: number }> = [];
    for (const zs of columns.values()) {
      zs.sort((p, q) => p - q);
      for (let i = 1; i < zs.length; i += 1) {
        const gap = zs[i]! - zs[i - 1]!;
        // Seats 8+ m apart merely share a column line (pawel's and
        // maciek's desks are both on x = -3, at opposite ends of the
        // office); they are not "sitting next to each other".
        if (gap >= 8) continue;
        neighbours.push({ a: zs[i - 1]!, b: zs[i]!, gap });
      }
    }
    expect(neighbours.length).toBeGreaterThanOrEqual(5);
    for (const pair of neighbours) {
      expect(pair.gap).toBeLessThanOrEqual(CHATTER_RADIUS);
    }
  });

  it("still keeps the two desk columns out of each other's range", () => {
    // The west and east desk columns are ~15 m apart; a radius big
    // enough for desk neighbours must not merge them into one chatter
    // pool (the whole office would be one conversation).
    expect(Math.abs(7.7 - -7.7)).toBeGreaterThan(CHATTER_RADIUS);
  });
});
