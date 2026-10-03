/**
 * WS7 (D-60 mission rows, D-47/D-49 fallback): the mission steerer
 * wrapper over a fake decision client.
 *
 * Two steered surfaces per D-60:
 *  - pickQuestion  — Choice over the plant's remaining authored
 *    questions. Cosmetic (question ORDER): confidence >= 0.3.
 *  - scoreOptions  — one Score question per answer option, batched in
 *    ONE request. Consequential (moves cash): conservative threshold
 *    (>= 0.6), bounded to a +/-1 adjustment around the authored
 *    baseScore — the judgment never decides the payout alone.
 *
 * Every failure mode (unconfigured, timeout, unknown id, low
 * confidence, shadow) degrades to the authored fallback: authored
 * question order / baseScore only.
 */

import { beforeEach, describe, expect, it } from "vitest";
import { FakeDecisionClient } from "../../../src/jev/fake-client";
import {
  MISSION_BUDGET_MS,
  MISSION_QUESTION_MIN_CONFIDENCE,
  MISSION_SCORE_MIN_CONFIDENCE,
  adjustmentFromScoreLevel,
  createMissionWrapper,
  type MissionPickQuestionRequest,
  type MissionScoreRequest,
} from "../../../src/jev/mission-wrapper";
import { counters, reset as resetLog } from "../../../src/jev/decision-log";

const pickRequest: MissionPickQuestionRequest = {
  missionId: "conference-acme-training",
  plantId: "marek",
  plantName: "Marek",
  plantRole: "DevOps / 10x Engineer",
  engagement: 45,
  engagementBand: "neutral",
  credibilityBand: "solid",
  questions: [
    {
      id: "mq-trust-numbers",
      text: "Why should we trust these numbers?",
      description: "Skeptic question about data provenance.",
    },
    {
      id: "mq-last-trainee",
      text: "Your last trainee quit in a week.",
      description: "Credibility attack on the track record.",
    },
  ],
};

const scoreRequest: MissionScoreRequest = {
  missionId: "conference-acme-training",
  plantId: "marek",
  plantName: "Marek",
  questionId: "mq-trust-numbers",
  questionText: "Why should we trust these numbers?",
  engagement: 45,
  engagementBand: "neutral",
  options: [
    { id: "own-it", text: "Own the numbers.", baseScore: 2 },
    { id: "cite-source", text: "Cite the source.", baseScore: 1 },
    { id: "deflect", text: "Deflect.", baseScore: -1 },
    { id: "bluff", text: "Bluff.", baseScore: -2 },
  ],
};

const PICK_QID = "mission-question:marek";
const scoreQid = (optionId: string): string =>
  `mission-score:mq-trust-numbers:${optionId}`;

describe("mission wrapper — pickQuestion (Choice, D-60 cosmetic row)", () => {
  beforeEach(() => resetLog());

  it("sends ONE choice question over the remaining questions with allowlisted facts", async () => {
    const client = new FakeDecisionClient();
    const steerer = createMissionWrapper({ client });
    await steerer.pickQuestion(pickRequest);

    expect(client.callCount).toBe(1);
    const request = client.requests[0]!;
    expect(request.questions).toHaveLength(1);
    const question = request.questions[0]!;
    expect(question.type).toBe("choice");
    expect(question.id).toBe(PICK_QID);
    expect(question.subjectId).toBe("marek");
    expect(question.candidates?.map((candidate) => candidate.id)).toEqual([
      "mq-trust-numbers",
      "mq-last-trainee",
    ]);
    expect(request.opts?.surface).toBe("mission-question");
    expect(request.opts?.timeoutMs).toBe(MISSION_BUDGET_MS);
    expect(request.opts?.retries).toBe(0);
    // D-59: allowlisted fictional fields only.
    const state = JSON.stringify(request.state);
    expect(state).toContain("marek");
    expect(state).toContain("neutral");
    expect(state).not.toContain("playerName");
  });

  it("applies a steered pick above the confidence threshold", async () => {
    const client = new FakeDecisionClient({
      [PICK_QID]: { type: "choice", id: "mq-last-trainee", confidence: 0.9 },
    });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.pickQuestion(pickRequest);
    expect(decision).toEqual({
      questionId: "mq-last-trainee",
      fallback: false,
    });
    expect(counters().applied).toBe(1);
  });

  it("falls back to the authored order on a provider timeout", async () => {
    const client = new FakeDecisionClient({ [PICK_QID]: { failure: "timeout" } });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.pickQuestion(pickRequest);
    expect(decision.questionId).toBeNull();
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toBe("provider-timeout");
    expect(counters().legacy).toBe(1);
  });

  it("falls back when the answer names an unknown question", async () => {
    const client = new FakeDecisionClient({
      [PICK_QID]: { type: "choice", id: "bogus-question", confidence: 0.9 },
    });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.pickQuestion(pickRequest);
    expect(decision.questionId).toBeNull();
    expect(decision.fallback).toBe(true);
    expect(counters().rejected).toBe(1);
  });

  it("falls back below the D-60 threshold (0.3)", async () => {
    expect(MISSION_QUESTION_MIN_CONFIDENCE).toBe(0.3);
    const client = new FakeDecisionClient({
      [PICK_QID]: { type: "choice", id: "mq-last-trainee", confidence: 0.2 },
    });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.pickQuestion(pickRequest);
    expect(decision.questionId).toBeNull();
    expect(counters().rejected).toBe(1);
  });

  it("does not request when only one question remains (authored default)", async () => {
    const client = new FakeDecisionClient();
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.pickQuestion({
      ...pickRequest,
      questions: pickRequest.questions.slice(0, 1),
    });
    expect(decision).toEqual({
      questionId: "mq-trust-numbers",
      fallback: true,
      fallbackReason: "single-candidate",
    });
    expect(client.callCount).toBe(0);
  });

  it("an unconfigured client never requests and never logs", async () => {
    const client = new FakeDecisionClient();
    client.setConfigured(false);
    const steerer = createMissionWrapper({ client });
    await steerer.pickQuestion(pickRequest);
    const decision = await steerer.pickQuestion(pickRequest);;
    expect(decision).toEqual({
      questionId: null,
      fallback: true,
      fallbackReason: "unconfigured",
    });
    expect(client.callCount).toBe(0);
    expect(counters().requested).toBe(0);
  });

  it("shadow mode judges, logs shadow, and never steers", async () => {
    const client = new FakeDecisionClient({
      [PICK_QID]: { type: "choice", id: "mq-last-trainee", confidence: 0.9 },
    });
    const steerer = createMissionWrapper({ client, shadow: true });
    expect(steerer.isShadow()).toBe(true);
    const decision = await steerer.pickQuestion(pickRequest);
    expect(decision.questionId).toBeNull();
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toBe("shadow");
    expect(counters().shadow).toBe(1);
    expect(counters().applied).toBe(0);
  });
});

describe("mission wrapper — scoreOptions (Score, D-60 consequential row)", () => {
  beforeEach(() => resetLog());

  it("scores every option in ONE batched request at the 700ms ambient budget", async () => {
    const client = new FakeDecisionClient();
    const steerer = createMissionWrapper({ client });
    await steerer.scoreOptions(scoreRequest);

    expect(client.callCount).toBe(1);
    const request = client.requests[0]!;
    expect(request.questions).toHaveLength(4);
    expect(request.questions.map((question) => question.id)).toEqual(
      scoreRequest.options.map((option) => scoreQid(option.id)),
    );
    for (const question of request.questions) {
      expect(question.type).toBe("score");
      expect(question.subjectId).toBe(question.id.slice("mission-score:".length).split(":")[1]);
      expect(question.prompt).toContain(scoreRequest.questionText);
    }
    expect(request.opts?.surface).toBe("mission-answer");
    expect(request.opts?.timeoutMs).toBe(MISSION_BUDGET_MS);
    expect(request.opts?.retries).toBe(0);
    expect(request.opts?.decisionId).toContain("conference-acme-training");
  });

  it("maps the 3 authored levels to bounded -1/0/+1 adjustments", async () => {
    const client = new FakeDecisionClient({
      [scoreQid("own-it")]: { type: "score", level: 1, confidence: 0.9 },
      [scoreQid("cite-source")]: { type: "score", level: 3, confidence: 0.9 },
      [scoreQid("deflect")]: { type: "score", level: 2, confidence: 0.9 },
      [scoreQid("bluff")]: { type: "score", level: 2.5, confidence: 0.9 },
    });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.scoreOptions(scoreRequest);
    expect(decision).toEqual({
      // 2.5 rounds to 3 -> +1 (a strongly-leaning-good answer still lands
      // within the bounded band).
      adjustments: { "own-it": -1, "cite-source": 1, deflect: 0, bluff: 1 },
      fallback: false,
    });
  });

  it("a low-confidence score falls back to baseScore for that option only", async () => {
    expect(MISSION_SCORE_MIN_CONFIDENCE).toBe(0.6);
    const client = new FakeDecisionClient({
      [scoreQid("own-it")]: { type: "score", level: 3, confidence: 0.5 },
    });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.scoreOptions(scoreRequest);
    expect(decision.adjustments).toEqual({
      "cite-source": 0,
      deflect: 0,
      bluff: 0,
      // own-it missing: baseScore only for THAT option (D-49 per-subject).
    });
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toBe("partial");
    expect(counters().rejected).toBe(1);
    expect(counters().applied).toBe(3);
  });

  it("a total provider failure falls back for every option", async () => {
    const client = new FakeDecisionClient({ "*": { failure: "network" } });
    const steerer = createMissionWrapper({ client });
    const decision = await steerer.scoreOptions(scoreRequest);
    expect(decision.adjustments).toEqual({});
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toBe("provider-network");
    expect(counters().legacy).toBe(4);
  });

  it("shadow scoring logs shadow and never returns adjustments", async () => {
    const client = new FakeDecisionClient({
      [scoreQid("own-it")]: { type: "score", level: 9, confidence: 0.9 },
    });
    const steerer = createMissionWrapper({ client, shadow: true });
    const decision = await steerer.scoreOptions(scoreRequest);
    expect(decision.adjustments).toEqual({});
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toBe("shadow");
    expect(counters().shadow).toBe(4);
    expect(counters().applied).toBe(0);
  });
});

describe("adjustmentFromScoreLevel — the +/-1 band around neutral", () => {
  it("maps the 3 authored levels to the +/-1 band (fractional rounds)", () => {
    expect(adjustmentFromScoreLevel(1)).toBe(-1);
    expect(adjustmentFromScoreLevel(1.5)).toBe(-1);
    expect(adjustmentFromScoreLevel(2)).toBe(0);
    expect(adjustmentFromScoreLevel(2.5)).toBe(1);
    expect(adjustmentFromScoreLevel(3)).toBe(1);
  });
});
