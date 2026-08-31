import { describe, expect, it } from "vitest";
import { computeAvoidancePush, type AvoidanceAgent } from "../../src/engine/npc-avoidance";

function agent(id: string, x: number, z: number, vx = 1, vz = 0, priority = 3): AvoidanceAgent {
  return { id, position: { x, z }, velocity: { x: vx, z: vz }, priority };
}

describe("computeAvoidancePush", () => {
  it("pushes perpendicular to travel away from a nearby moving agent", () => {
    const push = computeAvoidancePush(agent("self", 0, 0), [agent("other", 0, 0.5)]);
    expect(push.x).toBeCloseTo(0); expect(push.z).toBeCloseTo(-0.2);
  });
  it("returns zero outside the avoidance radius", () => {
    expect(computeAvoidancePush(agent("self", 0, 0), [agent("other", 0, 2)])).toEqual({ x: 0, z: 0 });
  });
  it("returns zero when either agent is stationary", () => {
    expect(computeAvoidancePush(agent("self", 0, 0, 0, 0), [agent("other", 0, 0.5)])).toEqual({ x: 0, z: 0 });
    expect(computeAvoidancePush(agent("self", 0, 0), [agent("other", 0, 0.5, 0, 0)])).toEqual({ x: 0, z: 0 });
  });
  it("uses the two nearest contributors so the middle agent gets the strongest push", () => {
    const middle = computeAvoidancePush(agent("middle", 0, 0), [agent("near", 0, 0.3), agent("next", 0, 0.6), agent("far", 0, 1.2)]);
    const edge = computeAvoidancePush(agent("edge", 0, 0), [agent("one", 0, 0.6)]);
    expect(Math.abs(middle.z)).toBeGreaterThan(Math.abs(edge.z));
  });
  it("does not push a higher-priority agent for a lower-priority one", () => {
    expect(computeAvoidancePush(agent("ceo", 0, 0, 1, 0, 1), [agent("rest", 0, 0.5, 1, 0, 4)])).toEqual({ x: 0, z: 0 });
  });
});
