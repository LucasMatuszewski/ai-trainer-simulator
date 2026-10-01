/**
 * WS7 MissionRuntime (AC-23..26, D-54): the pure conference-speech
 * state machine.
 *
 * Flow: start() -> talking points (advance folds a run of consecutive
 * points onto the next plant question) -> plant questions (answer via
 * 4 authored options) -> ... -> finish() -> outcome.
 * Abort/reload semantics: abort() grants nothing; the completion
 * marker is only set by finish() (via `missionResultActions`); a
 * fresh runtime after a reload starts clean; finishing twice returns
 * the SAME result object, so no payout can ever apply twice (D-54).
 *
 * Purity: the Jev judgment never runs in here. The UI resolves the
 * two steered surfaces (question pick, answer score) through the
 * mission-wrapper and hands the PRE-RESOLVED values to the runtime:
 *  - `steerQuestionPick(questionId | null)` for the current question
 *    step (null / never called = authored order, D-47);
 *  - `answer(optionId, steeredAdjustment)` with the bounded +/-1
 *    level (null / omitted / out of range = baseScore only).
 * The same judgment inputs therefore always produce the same run
 * (ADR-0009 key scenario 9), and a missing judgment degrades to the
 * authored default without touching the network (TAC-01b).
 *
 * Scoring: score = clamp(baseScore + adjustment, -2, 2); the panel
 * engagement meter moves score x ENGAGEMENT_PER_SCORE (max +/-10 per
 * answer) and clamps to 0..100. Outcome thresholds are authored
 * (`winEngagement`). The judgment is bounded to +/-1 level and can
 * NEVER decide the payout alone.
 */

import type { Action, NpcId } from "../types";
import type {
  MissionAnswerOption,
  MissionDef,
  MissionPlant,
  MissionTalkingPoint,
} from "../content/missions";
import { NPCS } from "../content/npcs";

/** Engagement points per score level (max |score| = 2 -> max step 10). */
export const ENGAGEMENT_PER_SCORE = 5;
/** Hard cap on one answer's engagement movement (brief: +/-10 max). */
export const MAX_ENGAGEMENT_STEP = 10;

export type MissionPhase =
  | "idle"
  | "talking-point"
  | "plant-question"
  | "complete"
  | "aborted";

export type MissionOutcome = "won" | "lost" | "aborted";

/** A bounded +/-1 judgment adjustment around the authored baseScore. */
export type MissionAdjustment = -1 | 0 | 1;

export interface MissionAnswerRecord {
  questionId: string;
  optionId: string;
  /** Authored baseline score of the chosen option. */
  baseScore: number;
  /** The (clamped) judgment adjustment applied on top. 0 = baseScore only. */
  steeredAdjustment: MissionAdjustment;
  score: number;
  engagementBefore: number;
  engagementAfter: number;
  reaction: string;
}

export interface MissionAnswerFeedback {
  questionId: string;
  optionId: string;
  score: number;
  engagement: number;
  reaction: string;
}

export interface MissionQuestionView {
  plantId: NpcId;
  plantName: string;
  plantRole: string;
  questionId: string;
  questionText: string;
  options: readonly MissionAnswerOption[];
  /** Set once this step has been answered (advance unlocks). */
  answeredOptionId: string | null;
  /** The reaction to the just-given answer (phase feedback). */
  lastReaction: string | null;
}

export interface MissionSnapshot {
  missionId: string;
  phase: MissionPhase;
  /** Index into the mission's authored script. */
  stepIndex: number;
  stepCount: number;
  engagement: number;
  point: MissionTalkingPoint | null;
  question: MissionQuestionView | null;
  lastAnswer: MissionAnswerRecord | null;
}

export interface MissionResult {
  outcome: MissionOutcome;
  engagement: number;
  credibilityDelta: number;
  cashReward: number;
  quotes: readonly string[];
  /** False when the persisted marker was already set (replay) or the run aborted. */
  payoutApplied: boolean;
}

export interface MissionRuntimeDeps {
  /**
   * Readout of the persisted completion/reward marker (save v2).
   * Production: the mission's completion flag in the game store.
   * Default: never completed (a bare runtime has no persistence).
   */
  isCompleted?: (mission: MissionDef) => boolean;
}

export interface MissionRuntime {
  readonly mission: MissionDef;
  /** (Re)start the speech from the first script step. */
  start(): void;
  snapshot(): MissionSnapshot;
  /**
   * Supply the steered question pick for the CURRENT question step.
   * Only accepted while the step is unanswered and the id names one of
   * this plant's remaining questions. Returns whether it applied.
   */
  steerQuestionPick(questionId: string | null): boolean;
  /**
   * Answer the current question. `steeredAdjustment` is the Jev Score
   * judgment, already bounded to +/-1 (or null/undefined = baseScore
   * only). Returns null when there is nothing to answer.
   */
  answer(optionId: string, steeredAdjustment?: number | null): MissionAnswerFeedback | null;
  /** Advance from a talking point, or from an answered question. */
  advance(): boolean;
  /** Finish the run. Idempotent; only a completed run can pay. */
  finish(): MissionResult;
  /** Abandon the speech: no reward, no completion marker. */
  abort(): void;
}

interface RuntimeState {
  phase: MissionPhase;
  stepIndex: number;
  engagement: number;
  answers: MissionAnswerRecord[];
  /** Remaining authored question indexes per plant. */
  remaining: number[][];
  /** Steered pick for the current question step. */
  steeredPick: string | null;
  answeredOptionId: string | null;
  result: MissionResult | null;
}

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}

/** Clamp a raw judgment level into the +/-1 band (defensive: the
 *  wrapper already bounds it; the runtime does not trust it). */
export function clampAdjustment(value: number | null | undefined): MissionAdjustment {
  if (value === null || value === undefined || !Number.isFinite(value)) return 0;
  if (value <= -1) return -1;
  if (value >= 1) return 1;
  return 0;
}

export function createMissionRuntime(
  mission: MissionDef,
  deps: MissionRuntimeDeps = {},
): MissionRuntime {
  const isCompleted = deps.isCompleted ?? (() => false);
  let state: RuntimeState = freshState();

  function freshState(): RuntimeState {
    return {
      phase: "idle",
      stepIndex: 0,
      engagement: mission.startingEngagement,
      answers: [],
      remaining: mission.plants.map((plant) => plant.questions.map((_, index) => index)),
      steeredPick: null,
      answeredOptionId: null,
      result: null,
    };
  }

  function currentStep(): (typeof mission.script)[number] | undefined {
    return mission.script[state.stepIndex];
  }

  function currentPlant(): MissionPlant | undefined {
    const step = currentStep();
    if (step === undefined || step.kind !== "question") return undefined;
    return mission.plants[step.plantIndex];
  }

  /** The question this step will ask: the steered pick, else the
   *  first remaining question in authored order (D-47 fallback).
   *  While the step is ANSWERED, it is the question that was just
   *  answered — the reaction phase must stay resolvable (and the
   *  snapshot must keep exposing `answeredOptionId`) even when the
   *  answer consumed the plant's LAST remaining question. */
  function currentQuestion(): { questionIndex: number; id: string } | null {
    const plant = currentPlant();
    if (plant === undefined) return null;
    if (state.answeredOptionId !== null) {
      const lastAnswer = state.answers[state.answers.length - 1] ?? null;
      const answeredIndex =
        lastAnswer === null
          ? -1
          : plant.questions.findIndex((candidate) => candidate.id === lastAnswer.questionId);
      if (answeredIndex >= 0) {
        return { questionIndex: answeredIndex, id: plant.questions[answeredIndex]!.id };
      }
    }
    const remaining = state.remaining[mission.plants.indexOf(plant)] ?? [];
    if (remaining.length === 0) return null;
    const steeredIndex = state.steeredPick
      ? remaining.find((index) => plant.questions[index]?.id === state.steeredPick)
      : undefined;
    const questionIndex = steeredIndex ?? remaining[0]!;
    return { questionIndex, id: plant.questions[questionIndex]!.id };
  }

  function phaseForStep(stepIndex: number): MissionPhase {
    const step = mission.script[stepIndex];
    if (step === undefined) return "complete";
    return step.kind === "point" ? "talking-point" : "plant-question";
  }

  function start(): void {
    state = freshState();
    state.phase = phaseForStep(0);
  }

  function steerQuestionPick(questionId: string | null): boolean {
    if (state.phase !== "plant-question" || state.answeredOptionId !== null) return false;
    if (questionId === null) {
      state.steeredPick = null;
      return true;
    }
    const plant = currentPlant();
    if (plant === undefined) return false;
    const remaining = state.remaining[mission.plants.indexOf(plant)] ?? [];
    const ok = remaining.some((index) => plant.questions[index]?.id === questionId);
    if (!ok) return false;
    state.steeredPick = questionId;
    return true;
  }

  function answer(
    optionId: string,
    steeredAdjustment?: number | null,
  ): MissionAnswerFeedback | null {
    if (state.phase !== "plant-question" || state.answeredOptionId !== null) return null;
    const plant = currentPlant();
    const current = currentQuestion();
    if (plant === undefined || current === null) return null;
    const question = plant.questions[current.questionIndex];
    const option = question?.options.find((candidate) => candidate.id === optionId);
    if (question === undefined || option === undefined) return null;

    const adjustment = clampAdjustment(steeredAdjustment);
    const score = clampInt(option.baseScore + adjustment, -2, 2);
    const engagementBefore = state.engagement;
    const engagementAfter = clampInt(
      engagementBefore + score * ENGAGEMENT_PER_SCORE,
      0,
      100,
    );
    state.engagement = engagementAfter;
    state.answeredOptionId = optionId;
    const record: MissionAnswerRecord = {
      questionId: question.id,
      optionId,
      baseScore: option.baseScore,
      steeredAdjustment: adjustment,
      score,
      engagementBefore,
      engagementAfter,
      reaction: option.reaction,
    };
    state.answers.push(record);
    // Consume the question: it can never be asked twice (exactly-once).
    const remainingList = state.remaining[mission.plants.indexOf(plant)] ?? [];
    state.remaining[mission.plants.indexOf(plant)] = remainingList.filter(
      (index) => index !== current.questionIndex,
    );
    return {
      questionId: question.id,
      optionId,
      score,
      engagement: engagementAfter,
      reaction: option.reaction,
    };
  }

  function advance(): boolean {
    if (state.phase === "talking-point") {
      // Space continues to the next INTERACTIVE beat: a run of
      // consecutive talking points folds into one press and the speech
      // lands on the next plant question (or the end of the script).
      let next = state.stepIndex + 1;
      while (
        mission.script[next] !== undefined &&
        mission.script[next]!.kind === "point"
      ) {
        next += 1;
      }
      state.stepIndex = next;
      state.phase = phaseForStep(next);
      state.steeredPick = null;
      state.answeredOptionId = null;
      return true;
    }
    if (state.phase === "plant-question" && state.answeredOptionId !== null) {
      state.stepIndex += 1;
      state.phase = phaseForStep(state.stepIndex);
      state.steeredPick = null;
      state.answeredOptionId = null;
      return true;
    }
    return false;
  }

  function finish(): MissionResult {
    if (state.result !== null) return state.result;
    if (state.phase === "complete") {
      const outcome: MissionOutcome =
        state.engagement >= mission.winEngagement ? "won" : "lost";
      const payoutApplied = !isCompleted(mission);
      const reward = payoutApplied
        ? outcome === "won"
          ? mission.rewardOnWin
          : mission.rewardOnLoss
        : { cash: 0, credibility: 0 };
      const closing =
        outcome === "won" ? mission.closingQuotes.won : mission.closingQuotes.lost;
      state.result = {
        outcome,
        engagement: state.engagement,
        credibilityDelta: reward.credibility,
        cashReward: reward.cash,
        quotes: [...state.answers.map((record) => record.reaction), ...closing],
        payoutApplied,
      };
    } else {
      // Aborted or unfinished: no reward, no marker, no quotes.
      state.result = {
        outcome: "aborted",
        engagement: state.engagement,
        credibilityDelta: 0,
        cashReward: 0,
        quotes: [],
        payoutApplied: false,
      };
      state.phase = "aborted";
    }
    return state.result;
  }

  function abort(): void {
    if (state.phase === "idle") return;
    state.phase = "aborted";
  }

  function snapshot(): MissionSnapshot {
    const step = currentStep();
    let point: MissionTalkingPoint | null = null;
    let question: MissionQuestionView | null = null;
    if (state.phase === "talking-point" && step?.kind === "point") {
      point = mission.talkingPoints.find((candidate) => candidate.id === step.pointId) ?? null;
    }
    if (state.phase === "plant-question" && step?.kind === "question") {
      const plant = currentPlant();
      const current = currentQuestion();
      const npc = NPCS.find((candidate) => candidate.id === plant?.npcId);
      const questionData = plant?.questions[current?.questionIndex ?? -1];
      if (plant !== undefined && current !== null && questionData !== undefined) {
        question = {
          plantId: plant.npcId,
          plantName: npc?.name ?? plant.npcId,
          plantRole: npc?.role ?? "",
          questionId: questionData.id,
          questionText: questionData.text,
          options: questionData.options,
          answeredOptionId: state.answeredOptionId,
          lastReaction:
            state.answeredOptionId !== null
              ? (state.answers[state.answers.length - 1]?.reaction ?? null)
              : null,
        };
      }
    }
    return {
      missionId: mission.id,
      phase: state.phase,
      stepIndex: state.stepIndex,
      stepCount: mission.script.length,
      engagement: state.engagement,
      point,
      question,
      lastAnswer: state.answers[state.answers.length - 1] ?? null,
    };
  }

  return {
    mission,
    start,
    snapshot,
    steerQuestionPick,
    answer,
    advance,
    finish,
    abort,
  };
}

/**
 * Map a finished result onto the EXISTING reducer actions (AC-25):
 * rewards through add-cash / add-stat, the completion/reward marker
 * through set-flag. Pure; the caller dispatches. A result without
 * `payoutApplied` (replay or abort) maps to nothing.
 */
export function missionResultActions(mission: MissionDef, result: MissionResult): Action[] {
  if (!result.payoutApplied) return [];
  const reward =
    result.outcome === "won" ? mission.rewardOnWin : mission.rewardOnLoss;
  const actions: Action[] = [];
  // Wave-3 verdict fix: the completion flag is set FIRST — an interruption
  // between the saves can then only LOSE the reward, never pay twice
  // (AC-25's durable exactly-once claim).
  actions.push({ type: "set-flag", flag: mission.completionFlag, value: true });
  if (reward.cash !== 0) {
    actions.push({ type: "add-cash", amount: reward.cash, reason: `mission:${mission.id}` });
  }
  if (reward.credibility !== 0) {
    actions.push({ type: "add-stat", stat: "credibility", delta: reward.credibility });
  }
  return actions;
}

/** Pre-computed named engagement band for the projection (D-49). */
export function engagementBandOf(engagement: number): string {
  if (engagement < 35) return "restless";
  if (engagement < 55) return "neutral";
  if (engagement < 75) return "engaged";
  return "captivated";
}

/** Pre-computed named credibility band for the projection (D-49). */
export function credibilityBandOf(credibility: number): string {
  if (credibility < 30) return "low";
  if (credibility < 60) return "solid";
  return "high";
}
