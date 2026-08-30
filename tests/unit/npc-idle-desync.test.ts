import { describe, expect, it } from "vitest";
import { createInitialIdleState } from "../../src/engine/npc-idle";

describe("NPC idle schedule desynchronization", () => {
  it("gives different NPC ids different animation schedules", () => {
    expect(createInitialIdleState(10, "bartek").nextTypeAt).not.toBe(
      createInitialIdleState(10, "burek").nextTypeAt,
    );
  });

  it("reproduces the same schedule for the same NPC id", () => {
    expect(createInitialIdleState(10, "bartek")).toEqual(createInitialIdleState(10, "bartek"));
  });
});
