import { describe, expect, it, vi } from "vitest";
import {
  BASE_DWELL_S,
  createNpcNpcRunner,
  dwellFor,
  flattenPath,
  type RunnerEvent,
} from "../../../src/engine/npc-npc-runner";
import { NPC_NPC_CONVERSATIONS } from "../../../src/content/npc-npc-conversations";
import type { NpcNpcConversation } from "../../../src/content/npc-npc-conversations-schema";
import { createSeededRng } from "../../../src/game/social";

function scriptById(id: string): NpcNpcConversation {
  const script = NPC_NPC_CONVERSATIONS.find((entry) => entry.id === id);
  if (script === undefined) throw new Error(`missing script ${id}`);
  return script;
}

function line(text: string, reaction?: RunnerEvent["reaction"]): RunnerEvent {
  return {
    id: `line-${text.slice(0, 6)}`,
    speaker: "A",
    text,
    dwellS: 0,
    reaction,
  };
}

describe("dwellFor", () => {
  it("scales the base dwell by text length (+1 s per 30 chars)", () => {
    expect(dwellFor("short", BASE_DWELL_S)).toBeCloseTo(BASE_DWELL_S + 1);
    // 31 chars -> two extra steps.
    expect(dwellFor("x".repeat(31), BASE_DWELL_S)).toBeCloseTo(
      BASE_DWELL_S + 2,
    );
  });

  it("caps the growth at +4 s over the base", () => {
    expect(dwellFor("x".repeat(600), BASE_DWELL_S)).toBeCloseTo(
      BASE_DWELL_S + 4,
    );
  });
});

describe("flattenPath", () => {
  it("walks the whole starter chain in authored order", () => {
    const pz = scriptById("npcnpc-pz-restore-drill");
    const events = flattenPath(
      pz,
      pz.exchanges[0]!.starter.id,
      "warm",
      createSeededRng(1),
    );
    // 3 exchanges x 2 lines = 6 events, then the warm band ending.
    expect(events).toHaveLength(7);
    expect(events.map((event) => event.id)).toEqual([
      "pz-s1",
      "pz-r1",
      "pz-s2",
      "pz-r2",
      "pz-s3",
      "pz-r3",
      "pz-r3#ending:warm",
    ]);
  });

  it("alternates speakers A/B starting with A (cast[0] opens)", () => {
    const km = scriptById("npcnpc-km-ticket-queue");
    const events = flattenPath(
      km,
      km.exchanges[0]!.starter.id,
      "hostile",
      createSeededRng(1),
    );
    expect(events.map((event) => event.speaker)).toEqual([
      "A", "B", "A", "B", "A", "B", "B",
    ]);
    // The trailing B is the hostile band ending authored on km-r3.
    expect(events[events.length - 1]!.id).toBe("km-r3#ending:hostile");
  });

  it("carries reactions and hush lines from the authored lines", () => {
    const km = scriptById("npcnpc-km-ticket-queue");
    const events = flattenPath(
      km,
      km.exchanges[0]!.starter.id,
      "hostile",
      createSeededRng(1),
    );
    const s1 = events.find((event) => event.id === "km-s1")!;
    expect(s1.reaction).toBe("annoyed");
    expect(s1.onPlayerApproach).toBeTruthy();
    const s3 = events.find((event) => event.id === "km-s3")!;
    expect(s3.reaction).toBe("offended");
  });

  it("appends the band ending only when the live band matches", () => {
    const pz = scriptById("npcnpc-pz-restore-drill");
    const warm = flattenPath(
      pz,
      pz.exchanges[0]!.starter.id,
      "warm",
      createSeededRng(1),
    );
    const hostile = flattenPath(
      pz,
      pz.exchanges[0]!.starter.id,
      "hostile",
      createSeededRng(1),
    );
    expect(warm[warm.length - 1]!.id).toBe("pz-r3#ending:warm");
    expect(hostile.some((event) => event.id.includes("#ending"))).toBe(false);
    expect(hostile).toHaveLength(6);
  });

  it("throws on an unknown start exchange", () => {
    const pz = scriptById("npcnpc-pz-restore-drill");
    expect(() =>
      flattenPath(pz, "no-such-exchange", "warm", createSeededRng(1)),
    ).toThrow(/unknown start exchange/);
  });

  it("caps the walk at maxLevels exchanges", () => {
    const chain: NpcNpcConversation = {
      id: "test-chain",
      label: "chain",
      cast: ["ania", "bartek"],
      bands: ["neutral"],
      priority: 1,
      exchanges: [1, 2, 3].map((level) => ({
        starter: {
          id: `tc-s${level}`,
          text: `starter ${level}`,
          next: level < 3 ? `tc-s${level + 1}` : undefined,
        },
        response: { id: `tc-r${level}`, text: `response ${level}` },
      })),
    };
    const events = flattenPath(
      chain,
      "tc-s1",
      "neutral",
      createSeededRng(1),
      2,
    );
    expect(events.map((event) => event.id)).toEqual([
      "tc-s1",
      "tc-r1",
      "tc-s2",
      "tc-r2",
    ]);
  });

  it("survives an authored cycle (visited exchanges never replay)", () => {
    const cycle: NpcNpcConversation = {
      id: "test-cycle",
      label: "cycle",
      cast: ["ania", "bartek"],
      bands: ["neutral"],
      priority: 1,
      exchanges: [
        {
          starter: { id: "cy-s1", text: "a", next: "cy-s2" },
          response: { id: "cy-r1", text: "b" },
        },
        {
          starter: { id: "cy-s2", text: "c", next: "cy-s1" },
          response: { id: "cy-r2", text: "d" },
        },
      ],
    };
    const events = flattenPath(
      cycle,
      "cy-s1",
      "neutral",
      createSeededRng(1),
    );
    expect(events).toHaveLength(4);
  });
});

describe("createNpcNpcRunner — advance timing", () => {
  it("flips to the next line only after its dwell elapsed", () => {
    const onEnd = vi.fn();
    const runner = createNpcNpcRunner({
      lines: [line("hello there"), line("second line for the reply")],
      baseDwellS: BASE_DWELL_S,
      onEnd,
    });
    const firstDwell = dwellFor("hello there", BASE_DWELL_S);
    runner.advance(firstDwell - 0.01);
    expect(runner.currentLine()?.text).toBe("hello there");
    runner.advance(0.01);
    expect(runner.currentLine()?.text).toBe("second line for the reply");
    expect(onEnd).not.toHaveBeenCalled();
  });

  it("completes after the last line and fires onEnd exactly once", () => {
    const onEnd = vi.fn();
    const texts = ["alpha", "beta", "gamma"];
    const runner = createNpcNpcRunner({
      lines: texts.map((text) => line(text)),
      baseDwellS: BASE_DWELL_S,
      onEnd,
    });
    for (const text of texts) runner.advance(dwellFor(text, BASE_DWELL_S));
    expect(runner.currentLine()).toBeNull();
    expect(runner.snapshot().phase).toBe("complete");
    expect(onEnd).toHaveBeenCalledTimes(1);
    // Advancing a finished runner is a no-op.
    runner.advance(100);
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(runner.snapshot().phase).toBe("complete");
  });

  it("scales dwell with length: longer lines hold the screen longer", () => {
    const short = createNpcNpcRunner({
      lines: [line("hi")],
      baseDwellS: BASE_DWELL_S,
      onEnd: () => {},
    });
    const long = createNpcNpcRunner({
      lines: [line("x".repeat(69))],
      baseDwellS: BASE_DWELL_S,
      onEnd: () => {},
    });
    // "hi" -> dwell = base + 1; 69 chars -> base + 3. Just before the
    // short line's dwell both still hold; at it, the short one rolls
    // over while the long one is still held.
    short.advance(BASE_DWELL_S + 1);
    long.advance(BASE_DWELL_S + 1);
    expect(short.currentLine()).toBeNull();
    expect(long.currentLine()).not.toBeNull();
    expect(long.snapshot().phase).toBe("running");
  });
});

describe("createNpcNpcRunner — interruption table", () => {
  it("hush keeps the delivered lines and ends the run", () => {
    const onEnd = vi.fn();
    const runner = createNpcNpcRunner({
      lines: [line("delivered opener", "pleased"), line("pending reply")],
      baseDwellS: BASE_DWELL_S,
      onEnd,
    });
    runner.advance(dwellFor("delivered opener", BASE_DWELL_S));
    runner.hush();
    const snapshot = runner.snapshot();
    expect(snapshot.phase).toBe("hushed");
    expect(snapshot.deliveredCount).toBe(1);
    expect(runner.currentLine()).toBeNull();
    expect(onEnd).toHaveBeenCalledTimes(1);
    // The delivered beat survives the interruption.
    expect(snapshot.reaction).toBe("pleased");
  });

  it("hush drops the PENDING reaction of the line still on screen", () => {
    const onEnd = vi.fn();
    const runner = createNpcNpcRunner({
      lines: [line("first", "pleased"), line("second", "delighted")],
      baseDwellS: BASE_DWELL_S,
      onEnd,
    });
    // Deliver line 1, then hush before line 2's dwell completes: its
    // delighted beat never settles.
    runner.advance(dwellFor("first", BASE_DWELL_S));
    runner.advance(0.5);
    runner.hush();
    expect(runner.snapshot().reaction).toBe("pleased");
  });

  it("abandon ends immediately without a hush line state", () => {
    const onEnd = vi.fn();
    const runner = createNpcNpcRunner({
      lines: [line("one"), line("two")],
      baseDwellS: BASE_DWELL_S,
      onEnd,
    });
    runner.abandon();
    expect(runner.snapshot().phase).toBe("abandoned");
    expect(runner.currentLine()).toBeNull();
    expect(onEnd).toHaveBeenCalledTimes(1);
    // A dead runner ignores further advances.
    runner.advance(50);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("settles the LAST delivered emotional beat on natural completion", () => {
    const onEnd = vi.fn();
    const runner = createNpcNpcRunner({
      lines: [
        line("opener", "annoyed"),
        line("escalation", "offended"),
        line("closing", "delighted"),
      ],
      baseDwellS: BASE_DWELL_S,
      onEnd,
    });
    runner.advance(dwellFor("opener", BASE_DWELL_S));
    runner.advance(dwellFor("escalation", BASE_DWELL_S));
    runner.advance(dwellFor("closing", BASE_DWELL_S));
    expect(runner.snapshot().phase).toBe("complete");
    expect(runner.snapshot().reaction).toBe("delighted");
    expect(onEnd).toHaveBeenCalledTimes(1);
  });
});
