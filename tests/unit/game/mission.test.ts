/**
 * WS7 (AC-23..26, D-54): the pure MissionRuntime state machine.
 *
 * Flow (brief): start -> talking points -> plant questions (answered
 * via 4 options) -> finish -> outcome + rewards. The runtime is pure:
 * the Jev score adjustment and question pick arrive as PRE-RESOLVED
 * values (the UI resolves them through the steerer), so the same input
 * sequence is always the same run (ADR-0009 key scenario 9).
 */

import { describe, expect, it } from "vitest";
import { getMission } from "../../../src/content/missions";
import type { MissionDef } from "../../../src/content/missions";
import type { MissionQuestionView } from "../../../src/game/mission";
import {
  createMissionRuntime,
  credibilityBandOf,
  engagementBandOf,
  missionResultActions,
  type MissionResult,
  type MissionRuntimeDeps,
} from "../../../src/game/mission";

const mission = getMission("conference-acme-training")!;

function bestOption(question: MissionQuestionView) {
  return question.options.reduce((best, option) =>
    option.baseScore > best.baseScore ? option : best,
  );
}

function worstOption(question: MissionQuestionView) {
  return question.options.reduce((worst, option) =>
    option.baseScore < worst.baseScore ? option : worst,
  );
}

/** Drive one full run with a per-question answer choice. */
function runMission(
  missionDef: MissionDef = mission,
  deps: MissionRuntimeDeps = {},
  choose: (question: MissionQuestionView) => string = (q) => bestOption(q).id,
  steered: (question: MissionQuestionView) => number | null = () => null,
): { runtime: ReturnType<typeof createMissionRuntime>; result: MissionResult } {
  const runtime = createMissionRuntime(missionDef, deps);
  runtime.start();
  for (let guard = 0; guard < 64; guard += 1) {
    const snap = runtime.snapshot();
    if (snap.phase === "complete") break;
    if (snap.question !== null && snap.question.answeredOptionId === null) {
      runtime.answer(choose(snap.question), steered(snap.question));
    } else {
      runtime.advance();
    }
  }
  return { runtime, result: runtime.finish() };
}

/** A content-agnostic mission for clamp/guard tests. */
function syntheticMission(
  optionScores: number[],
  overrides: Partial<MissionDef> = {},
): MissionDef {
  return {
    id: "synthetic",
    title: "Synthetic speech",
    topic: "synthetic topic",
    intro: "An synthetic intro.",
    description: "A synthetic mission for tests.",
    unlockFlag: "flag-x",
    completionFlag: "mission-synthetic-done",
    talkingPoints: [{ id: "p1", text: "point one" }],
    plants: [
      {
        npcId: "marek",
        questions: [
          {
            id: "q1",
            text: "A hard question?",
            description: "desc",
            options: optionScores.map((baseScore, index) => ({
              id: `o${index}`,
              text: `option ${index}`,
              baseScore,
              reaction: `reaction ${index}`,
            })),
          },
        ],
      },
    ],
    script: [
      { kind: "point", pointId: "p1" },
      { kind: "question", plantIndex: 0, questionIndex: 0 },
    ],
    startingEngagement: 50,
    winEngagement: 90,
    rewardOnWin: { cash: 100, credibility: 5 },
    rewardOnLoss: { cash: 0, credibility: -2 },
    closingQuotes: { won: ["won quote"], lost: ["lost quote"] },
    ...overrides,
  };
}

describe("MissionRuntime — happy path (AC-25)", () => {
  it("a well-answered speech is won, paid, and quoted", () => {
    const { runtime, result } = runMission();
    expect(runtime.snapshot().phase).toBe("complete");
    expect(result.outcome).toBe("won");
    expect(result.engagement).toBe(90); // 50 + 4 x (+2 x 5)
    expect(result.cashReward).toBe(mission.rewardOnWin.cash);
    expect(result.credibilityDelta).toBe(mission.rewardOnWin.credibility);
    expect(result.payoutApplied).toBe(true);
    // The four per-answer reactions plus the closing quotes.
    expect(result.quotes).toHaveLength(4 + mission.closingQuotes.won.length);
    // The first quote is the reaction to the first asked question's answer.
    const firstQuestion = mission.plants[1]!.questions[0]!;
    const firstBest = firstQuestion.options.reduce((best, option) =>
      option.baseScore > best.baseScore ? option : best,
    );
    expect(result.quotes[0]).toBe(firstBest.reaction);
  });

  it("a poorly-answered speech is lost and costs credibility", () => {
    const { result } = runMission(mission, {}, (q) => worstOption(q).id);
    expect(result.outcome).toBe("lost");
    expect(result.engagement).toBe(10); // 50 - 4 x (2 x 5)
    expect(result.cashReward).toBe(mission.rewardOnLoss.cash);
    expect(result.credibilityDelta).toBe(mission.rewardOnLoss.credibility);
    expect(result.payoutApplied).toBe(true);
  });

  it("two different answer paths produce different engagement outcomes (AC-26)", () => {
    const good = runMission().result;
    const bad = runMission(mission, {}, (q) => worstOption(q).id).result;
    expect(good.engagement).not.toBe(bad.engagement);
    expect(good.outcome).toBe("won");
    expect(bad.outcome).toBe("lost");
  });

  it("same answers + same judgment inputs => identical outcome math (scenario 9)", () => {
    const a = runMission().result;
    const b = runMission().result;
    expect(a).not.toBe(b);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});

describe("MissionRuntime — abort, reload and duplicate finish (AC-26)", () => {
  it("abort grants no reward and sets no completion marker", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.advance();
    runtime.abort();
    const result = runtime.finish();
    expect(result.outcome).toBe("aborted");
    expect(result.payoutApplied).toBe(false);
    expect(result.cashReward).toBe(0);
    expect(result.credibilityDelta).toBe(0);
    expect(result.quotes).toHaveLength(0);
    expect(missionResultActions(mission, result)).toHaveLength(0);
  });

  it("a fresh runtime after a reload starts clean (in-flight progress resets)", () => {
    const first = createMissionRuntime(mission);
    first.start();
    first.advance();
    first.advance();
    expect(first.snapshot().stepIndex).toBe(2);

    const second = createMissionRuntime(mission);
    second.start();
    const snap = second.snapshot();
    expect(snap.stepIndex).toBe(0);
    expect(snap.engagement).toBe(mission.startingEngagement);
    expect(snap.phase).toBe("talking-point");
  });

  it("a replay after the persisted completion marker pays nothing", () => {
    const deps: MissionRuntimeDeps = { isCompleted: () => true };
    const { result } = runMission(mission, deps);
    expect(result.outcome).toBe("won"); // the speech still happened
    expect(result.payoutApplied).toBe(false);
    expect(result.cashReward).toBe(0);
    expect(result.credibilityDelta).toBe(0);
  });

  it("finishing twice returns the same result — no double payout", () => {
    const { runtime, result } = runMission();
    expect(runtime.finish()).toBe(result);
    const actions = missionResultActions(mission, result);
    expect(missionResultActions(mission, runtime.finish())).toEqual(actions);
  });
});

describe("MissionRuntime — Jev inputs are bounded (D-54/D-60)", () => {
  it("timeout / low-confidence judgment (null) means baseScore only", () => {
    const runtime = createMissionRuntime(syntheticMission([1, 2, -1, 0]));
    runtime.start();
    runtime.advance();
    expect(runtime.answer("o1", null)?.score).toBe(2);
  });

  it("an omitted judgment also means baseScore only", () => {
    const runtime = createMissionRuntime(syntheticMission([1, 2, -1, 0]));
    runtime.start();
    runtime.advance();
    expect(runtime.answer("o0")?.score).toBe(1);
  });

  it("a judgment is clamped to +/-1 level no matter what it claims", () => {
    const up = createMissionRuntime(syntheticMission([-1, 2, -1, 0]));
    up.start();
    up.advance();
    expect(up.answer("o0", 5)?.score).toBe(0); // -1 + clamp(5) = -1 + 1

    const down = createMissionRuntime(syntheticMission([1, 2, 1, 0]));
    down.start();
    down.advance();
    expect(down.answer("o0", -9)?.score).toBe(0); // 1 + clamp(-9) = 1 - 1
  });

  it("engagement moves at most 10 per answer and clamps to 0..100", () => {
    const up = createMissionRuntime(
      syntheticMission([2], { startingEngagement: 95, winEngagement: 99 }),
    );
    up.start();
    up.advance();
    const feedback = up.answer("o0", 1);
    expect(feedback?.engagement).toBe(100); // 95 + 10, not 105

    const down = createMissionRuntime(
      syntheticMission([-2], { startingEngagement: 5 }),
    );
    down.start();
    down.advance();
    const sunk = down.answer("o0", -1);
    expect(sunk?.engagement).toBe(0); // 5 - 10, not -5
  });
});

describe("MissionRuntime — question selection (AC-24)", () => {
  it("without Jev the authored order is used", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    const asked: string[] = [];
    for (let guard = 0; guard < 64; guard += 1) {
      const snap = runtime.snapshot();
      if (snap.phase === "complete") break;
      if (snap.question !== null && snap.question.answeredOptionId === null) {
        asked.push(snap.question.questionId);
        runtime.answer(bestOption(snap.question).id);
      } else {
        runtime.advance();
      }
    }
    expect(asked).toEqual([
      "kq-linkedin",
      "mq-trust-numbers",
      "mq-last-trainee",
      "kq-headhunt",
    ]);
  });

  it("a steered question pick replaces the authored default for that step", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.advance(); // point 1
    runtime.advance(); // point 2
    expect(runtime.snapshot().question?.questionId).toBe("kq-linkedin");
    expect(runtime.steerQuestionPick("kq-headhunt")).toBe(true);
    expect(runtime.snapshot().question?.questionId).toBe("kq-headhunt");
  });

  it("a pick that is not one of this plant's remaining questions is rejected", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.advance();
    runtime.advance();
    // marek's question cannot be steered into kasia's step.
    expect(runtime.steerQuestionPick("mq-trust-numbers")).toBe(false);
    expect(runtime.snapshot().question?.questionId).toBe("kq-linkedin");
  });

  it("steering after answering is rejected", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.advance();
    runtime.advance();
    runtime.answer(bestOption(runtime.snapshot().question!).id);
    expect(runtime.steerQuestionPick("kq-headhunt")).toBe(false);
  });

  it("each plant's questions are consumed exactly once across the run", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.advance();
    runtime.advance();
    expect(runtime.steerQuestionPick("kq-linkedin")).toBe(true);
    runtime.answer(bestOption(runtime.snapshot().question!).id);
    runtime.advance();
    runtime.advance();
    // kq-linkedin is spent; the remaining kasia question comes next.
    expect(runtime.steerQuestionPick("kq-linkedin")).toBe(false);
    expect(runtime.snapshot().question?.questionId).toBe("mq-trust-numbers");
  });
});

describe("MissionRuntime — guards", () => {
  it("answering with an unknown option id is a no-op", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.advance();
    runtime.advance();
    const before = runtime.snapshot().engagement;
    expect(runtime.answer("nope")).toBeNull();
    expect(runtime.snapshot().engagement).toBe(before);
    expect(runtime.snapshot().question?.answeredOptionId).toBeNull();
  });

  it("answering or advancing outside their phases is rejected", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    // Still on the first talking point: nothing to answer.
    expect(runtime.answer("o0")).toBeNull();
    // A question step cannot be advanced before it is answered.
    runtime.advance();
    runtime.advance();
    expect(runtime.advance()).toBe(false);
    runtime.answer(bestOption(runtime.snapshot().question!).id);
    expect(runtime.advance()).toBe(true);
  });

  it("restart() via start() resets a finished run", () => {
    const runtime = createMissionRuntime(mission);
    runtime.start();
    runtime.abort();
    runtime.start();
    expect(runtime.snapshot().phase).toBe("talking-point");
    expect(runtime.snapshot().engagement).toBe(mission.startingEngagement);
  });
});

describe("missionResultActions — rewards through existing actions (AC-25)", () => {
  it("a win pays cash, credibility and the completion flag", () => {
    const result: MissionResult = {
      outcome: "won",
      engagement: 90,
      credibilityDelta: mission.rewardOnWin.credibility,
      cashReward: mission.rewardOnWin.cash,
      quotes: [],
      payoutApplied: true,
    };
    expect(missionResultActions(mission, result)).toEqual([
      { type: "add-cash", amount: 400, reason: "mission:conference-acme-training" },
      { type: "add-stat", stat: "credibility", delta: 8 },
      { type: "set-flag", flag: "mission-conference-acme-done", value: true },
    ]);
  });

  it("a loss applies the loss reward and still marks completion once", () => {
    const result: MissionResult = {
      outcome: "lost",
      engagement: 10,
      credibilityDelta: mission.rewardOnLoss.credibility,
      cashReward: 0,
      quotes: [],
      payoutApplied: true,
    };
    const actions = missionResultActions(mission, result);
    expect(actions).toEqual([
      { type: "add-stat", stat: "credibility", delta: -3 },
      { type: "set-flag", flag: "mission-conference-acme-done", value: true },
    ]);
  });

  it("a result without payout dispatches nothing", () => {
    const result: MissionResult = {
      outcome: "aborted",
      engagement: 40,
      credibilityDelta: 0,
      cashReward: 0,
      quotes: [],
      payoutApplied: false,
    };
    expect(missionResultActions(mission, result)).toEqual([]);
  });
});

describe("named bands for the projection (D-49)", () => {
  it("engagement bands", () => {
    expect(engagementBandOf(10)).toBe("restless");
    expect(engagementBandOf(45)).toBe("neutral");
    expect(engagementBandOf(65)).toBe("engaged");
    expect(engagementBandOf(90)).toBe("captivated");
  });

  it("credibility bands", () => {
    expect(credibilityBandOf(10)).toBe("low");
    expect(credibilityBandOf(50)).toBe("solid");
    expect(credibilityBandOf(80)).toBe("high");
  });
});
