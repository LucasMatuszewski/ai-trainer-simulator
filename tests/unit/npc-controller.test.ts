import { describe, expect, it } from "vitest";
import { NPC_SCHEDULES } from "../../src/content/npc-schedule";
import {
  createNpcController,
  interpPosition,
  interpolate,
  shortestPathYaw,
} from "../../src/engine/npc-controller";

describe("createNpcController", () => {
  it("supports an empty NPC list without inventing a fallback object", () => {
    const controller = createNpcController([], {} as never, () => "morning");

    expect(() => controller.update(1 / 60)).not.toThrow();
    expect(() => controller.destroy()).not.toThrow();
  });
});

describe("shortestPathYaw", () => {
  it("interpolates a half turn", () => {
    expect(Math.abs(shortestPathYaw(0, Math.PI, 0.5))).toBeCloseTo(Math.PI / 2);
  });

  it("crosses the wrap point by the shortest path", () => {
    expect(Math.abs(shortestPathYaw(Math.PI * 0.9, -Math.PI * 0.9, 0.5))).toBeCloseTo(Math.PI);
  });

  it("does not move when the angles match", () => {
    expect(shortestPathYaw(0, 0, 0.5)).toBe(0);
  });

  it("returns the starting yaw at zero progress", () => {
    expect(shortestPathYaw(Math.PI / 4, -Math.PI / 4, 0)).toBeCloseTo(Math.PI / 4);
  });

  it("returns the destination yaw at full progress", () => {
    expect(shortestPathYaw(Math.PI / 4, -Math.PI / 4, 1)).toBeCloseTo(-Math.PI / 4);
  });
});

describe("interpPosition", () => {
  const from = { x: -2, y: 1, z: 4 };
  const to = { x: 6, y: 3, z: -2 };

  it("returns the start and clamps progress below zero", () => {
    expect(interpPosition(from, to, -1)).toEqual(from);
  });

  it("returns the end and clamps progress above one", () => {
    expect(interpPosition(from, to, 2)).toEqual(to);
  });

  it("returns the midpoint", () => {
    expect(interpPosition(from, to, 0.5)).toEqual({ x: 2, y: 2, z: 1 });
  });
});

describe("interpolate", () => {
  it("uses the source entry at progress zero", () => {
    const result = interpolate("pawel", "morning", "afternoon", 0);
    expect(result.position).toEqual(NPC_SCHEDULES.pawel.morning.position);
    expect(result.face).toBeCloseTo(NPC_SCHEDULES.pawel.morning.face);
    expect(result.state).toBe("walking");
  });

  it("uses the destination entry and state at progress one", () => {
    const result = interpolate("pawel", "morning", "afternoon", 1);
    expect(result.position).toEqual(NPC_SCHEDULES.pawel.afternoon.position);
    expect(result.face).toBeCloseTo(NPC_SCHEDULES.pawel.afternoon.face);
    expect(result.state).toBe(NPC_SCHEDULES.pawel.afternoon.state);
  });

  it("uses the midpoint and walking state during transit", () => {
    const result = interpolate("pawel", "morning", "afternoon", 0.5);
    const from = NPC_SCHEDULES.pawel.morning.position;
    const to = NPC_SCHEDULES.pawel.afternoon.position;
    expect(result.position.x).toBeCloseTo((from.x + to.x) / 2, 2);
    expect(result.position.y).toBeCloseTo((from.y + to.y) / 2, 2);
    expect(result.position.z).toBeCloseTo((from.z + to.z) / 2, 2);
    expect(result.state).toBe("walking");
  });
});
