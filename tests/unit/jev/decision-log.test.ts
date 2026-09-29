import { beforeEach, describe, expect, it } from "vitest";
import {
  counters,
  logDecision,
  recent,
  reset,
} from "../../../src/jev/decision-log";

/**
 * WS1 decision log (ADR-0009 section 3.11, D-55): identifier-only ring
 * buffer of the last 50 decision attempts plus reason-coded counters
 * (requested / applied / legacy / rejected / stale / skipped).
 *
 * Counter semantics pinned here: `logDecision` counts ONE entry in
 * `requested` and ONE entry in the counter named by `outcome`, so
 * requested always equals the sum of the outcome counters. Entries
 * carry ids and numbers only — never authored text, never credentials.
 */

function baseEntry(overrides: Partial<Parameters<typeof logDecision>[0]> = {}) {
  return {
    time: 1_000,
    subject: "bartek",
    surface: "greeting" as const,
    outcome: "applied" as const,
    latencyMs: 42,
    fallback: false,
    ...overrides,
  };
}

describe("decision log", () => {
  beforeEach(() => {
    reset();
  });

  it("starts empty with zeroed counters", () => {
    expect(recent()).toEqual([]);
    expect(counters()).toEqual({
      requested: 0,
      applied: 0,
      legacy: 0,
      rejected: 0,
      stale: 0,
      skipped: 0,
    shadow: 0,
    });
  });

  it("stores entries in order and reports them oldest to newest", () => {
    logDecision(baseEntry({ subject: "bartek" }));
    logDecision(baseEntry({ subject: "marek", outcome: "legacy", fallback: true }));
    const entries = recent();
    expect(entries.map((e) => e.subject)).toEqual(["bartek", "marek"]);
    expect(entries[1]).toMatchObject({
      subject: "marek",
      outcome: "legacy",
      fallback: true,
      surface: "greeting",
      latencyMs: 42,
    });
  });

  it("keeps only the last 50 entries", () => {
    for (let i = 0; i < 60; i += 1) {
      logDecision(baseEntry({ subject: `npc-${i}` }));
    }
    const entries = recent();
    expect(entries).toHaveLength(50);
    // The first 10 were evicted from the head of the ring.
    expect(entries[0]?.subject).toBe("npc-10");
    expect(entries[49]?.subject).toBe("npc-59");
  });

  it("keeps counters above the ring size (60 entries -> requested 60)", () => {
    for (let i = 0; i < 60; i += 1) {
      logDecision(baseEntry({ subject: `npc-${i}` }));
    }
    expect(counters().requested).toBe(60);
    expect(counters().applied).toBe(60);
  });

  it("increments the counter named by the outcome", () => {
    logDecision(baseEntry({ outcome: "applied" }));
    logDecision(baseEntry({ outcome: "legacy", fallback: true }));
    logDecision(baseEntry({ outcome: "rejected", fallback: true, fallbackReason: "low-confidence" }));
    logDecision(baseEntry({ outcome: "stale", fallback: true, fallbackReason: "day-changed" }));
    logDecision(baseEntry({ outcome: "skipped", fallback: true, fallbackReason: "unconfigured" }));
    expect(counters()).toEqual({
      requested: 5,
      applied: 1,
      legacy: 1,
      rejected: 1,
      stale: 1,
      skipped: 1,
      shadow: 0,
    });
  });

  it("round-trips optional identifier fields (chosenId, confidence, deltas)", () => {
    logDecision(
      baseEntry({
        chosenId: "bartek:greeting:2",
        confidence: 0.87,
        relDelta: 1,
        moodDelta: -2,
      }),
    );
    expect(recent()[0]).toMatchObject({
      chosenId: "bartek:greeting:2",
      confidence: 0.87,
      relDelta: 1,
      moodDelta: -2,
    });
  });

  it("reset() clears both the buffer and the counters", () => {
    logDecision(baseEntry());
    reset();
    expect(recent()).toEqual([]);
    expect(counters().requested).toBe(0);
    expect(counters().applied).toBe(0);
  });
});
