import { beforeEach, describe, expect, it, vi, afterAll } from "vitest";
import type { ScheduleEntry } from "../../../src/content/npc-schedule";
import type { NpcId } from "../../../src/types";

// The destination fallback in events.ts captures Math.random when the
// module is loaded, so the spy must be hoisted above the imports to
// make the legacy roll deterministic (0.99 always yields a non-null
// destination).
const randomSpy = vi.hoisted(() => vi.spyOn(Math, "random").mockReturnValue(0.99));

import { runPeriodEvent, registerNpcController } from "../../../src/game/events";
import { jevDecisionHooks } from "../../../src/engine/npc-controller";

// A stand-in destination; only its identity matters here because the
// fake controller's setOverride records the reference.
const steeredEntry = { state: "at-desk" } as unknown as ScheduleEntry;

const overrides: Array<ScheduleEntry | null> = [];
const fakeController = {
  setOverride: (_npcId: NpcId, entry: ScheduleEntry | null) => {
    overrides.push(entry);
  },
  getNpcIds: () => ["bartek"] as NpcId[],
  hasArrived: () => true,
};

describe("events.ts destination seam (WS0)", () => {
  beforeEach(() => {
    overrides.length = 0;
    delete jevDecisionHooks.pickRandomDestination;
    randomSpy.mockClear();
    registerNpcController(fakeController);
  });

  afterAll(() => {
    randomSpy.mockRestore();
  });

  it("applies the steered destination when the hook is installed", () => {
    jevDecisionHooks.pickRandomDestination = () => steeredEntry;
    runPeriodEvent(null, "afternoon");
    expect(overrides).toEqual([steeredEntry]);
  });

  it("applies a steered stay-at-desk (null) without falling through to the legacy roll", () => {
    jevDecisionHooks.pickRandomDestination = () => null;
    runPeriodEvent(null, "afternoon");
    // With the buggy `??` wiring a steered null fell through to the
    // legacy roll — which the 0.99 stub deterministically makes a
    // non-null destination, so this assertion catches the fall-through.
    expect(overrides).toEqual([null]);
  });

  it("falls back to the legacy roll when no hook is installed", () => {
    runPeriodEvent(null, "afternoon");
    expect(overrides.length).toBe(1);
    expect(overrides[0]).not.toBeNull();
    expect(randomSpy).toHaveBeenCalled();
  });
});
