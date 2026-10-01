/**
 * WS7 mission steerer (D-54/D-60, PRD Flow G): the two steered
 * mission surfaces over the decision client.
 *
 *  1. `pickQuestion`  — Choice over the plant's REMAINING authored
 *     questions ("which question fits this audience right now").
 *     Cosmetic surface (D-60 mission-question row): confidence >= 0.3.
 *     Fallback: authored pool order (D-47). With one question left
 *     there is nothing to judge — the authored default is returned
 *     without a request.
 *
 *  2. `scoreOptions`  — one Score question PER answer option, batched
 *     into ONE request ("how does this answer land with this
 *     audience: lands poorly / lands / lands well"). Consequential
 *     surface (D-60 mission-answer row — it moves cash): conservative
 *     confidence threshold (>= 0.6) and the result is BOUNDED to a
 *     +/-1 adjustment around the authored `baseScore`. A judgment can
 *     never decide the payout alone (D-54). Fallback: baseScore only,
 *     per option (D-49 per-subject degradation).
 *
 * 700 ms ambient budget, no retries (D-48). `shadow` (D-55) judges and
 * logs `shadow` but returns the fallback, so nothing steers. Logging
 * is identifier-only per subject (plant / question:option); projections
 * are allowlisted fictional fields (D-59) — never player text.
 */

import type { DecisionClient, JevQuestion } from "./contracts";
import { createResolvingClient } from "./client";
import { logDecision } from "./decision-log";

/** D-48 ambient budget: 700 ms hard cutoff, never retried. */
export const MISSION_BUDGET_MS = 700;
/** D-60 mission-question row: cosmetic, confidence >= 0.3, live. */
export const MISSION_QUESTION_MIN_CONFIDENCE = 0.3;
/** D-60 mission-answer row: consequential -> conservative >= 0.6. */
export const MISSION_SCORE_MIN_CONFIDENCE = 0.6;

/** The bounded score adjustment the wrapper may return. */
export type ScoreAdjustment = -1 | 0 | 1;

/**
 * Score semantics: 2-10 levels, 5 = neutral. <= 4 lands poorly, 5
 * lands, >= 6 lands well — always within the +/-1 band (D-54).
 */
export function adjustmentFromScoreLevel(level: number): ScoreAdjustment {
  if (!Number.isFinite(level)) return 0;
  if (level < 5) return -1;
  if (level > 5) return 1;
  return 0;
}

export interface MissionQuestionCandidate {
  id: string;
  text: string;
  /** Jev-facing description of what the question tests (D-52). */
  description: string;
}

export interface MissionPickQuestionRequest {
  missionId: string;
  plantId: string;
  plantName: string;
  plantRole: string;
  engagement: number;
  /** Pre-computed named band (D-49): "restless" | "neutral" | ... */
  engagementBand: string;
  /** Pre-computed named band: "low" | "solid" | "high". */
  credibilityBand: string;
  /** The plant's REMAINING questions in authored order. */
  questions: readonly MissionQuestionCandidate[];
}

export interface MissionPickQuestionDecision {
  /** Steered question id, or null = use the authored order. */
  questionId: string | null;
  fallback: boolean;
  fallbackReason?: string;
}

export interface MissionScoreOption {
  id: string;
  text: string;
  baseScore: number;
}

export interface MissionScoreRequest {
  missionId: string;
  plantId: string;
  plantName: string;
  questionId: string;
  questionText: string;
  engagement: number;
  engagementBand: string;
  options: readonly MissionScoreOption[];
}

export interface MissionScoreDecision {
  /**
   * optionId -> bounded adjustment. A MISSING key means "baseScore
   * only" for that option (fallback, D-49 per-subject).
   */
  adjustments: Readonly<Record<string, ScoreAdjustment>>;
  fallback: boolean;
  fallbackReason?: string;
}

export interface MissionSteerer {
  pickQuestion(request: MissionPickQuestionRequest): Promise<MissionPickQuestionDecision>;
  scoreOptions(request: MissionScoreRequest): Promise<MissionScoreDecision>;
  isShadow(): boolean;
}

export interface MissionWrapperOptions {
  /** Decision client. Default: the resolving client (key provider). */
  client?: DecisionClient;
  /** D-55 `?jev=shadow`: judge + log `shadow`, never steer. */
  shadow?: boolean;
  /** Request budget in ms. Default 700 (D-48). */
  timeoutMs?: number;
  /** D-60 threshold overrides (tests). */
  minQuestionConfidence?: number;
  minScoreConfidence?: number;
  /** Injectable clock (tests). */
  now?: () => number;
}

export function createMissionWrapper(options: MissionWrapperOptions = {}): MissionSteerer {
  const client = options.client ?? createResolvingClient();
  const shadow = options.shadow ?? false;
  const timeoutMs = options.timeoutMs ?? MISSION_BUDGET_MS;
  const minQuestion = options.minQuestionConfidence ?? MISSION_QUESTION_MIN_CONFIDENCE;
  const minScore = options.minScoreConfidence ?? MISSION_SCORE_MIN_CONFIDENCE;
  const now = options.now ?? (() => Date.now());
  let requestSeq = 0;

  function fallbackPick(reason: string): MissionPickQuestionDecision {
    return { questionId: null, fallback: true, fallbackReason: reason };
  }

  function fallbackScore(reason: string): MissionScoreDecision {
    return { adjustments: {}, fallback: true, fallbackReason: reason };
  }

  async function pickQuestion(
    request: MissionPickQuestionRequest,
  ): Promise<MissionPickQuestionDecision> {
    if (!client.isConfigured()) return fallbackPick("unconfigured");
    const questions = request.questions;
    if (questions.length === 0) return fallbackPick("no-questions");
    if (questions.length === 1) {
      // Nothing to judge: the authored default IS the answer (D-47),
      // and a request would spend tokens to re-derive it.
      return { questionId: questions[0]!.id, fallback: true, fallbackReason: "single-candidate" };
    }

    const questionId = `mission-question:${request.plantId}`;
    const projection = {
      mission: {
        id: request.missionId,
        engagement: request.engagement,
        "engagement.band": request.engagementBand,
        "credibility.band": request.credibilityBand,
      },
      plant: {
        id: request.plantId,
        name: request.plantName,
        role: request.plantRole,
      },
    };
    const questions_: JevQuestion[] = [
      {
        id: questionId,
        type: "choice",
        subjectId: request.plantId,
        prompt:
          `During the player's speech (${request.missionId}), plant ${request.plantId} ` +
          `(${request.plantName}, ${request.plantRole}) is about to ask one of their hard ` +
          `questions. Audience engagement: ${request.engagement}/100 (${request.engagementBand}). ` +
          "Choose the candidate id of the question that fits this moment best.",
        candidates: questions.map((candidate, index) => ({
          id: candidate.id,
          description: candidate.description,
          priority: index,
        })),
      },
    ];

    const startedAt = now();
    let result;
    try {
      result = await client.request(projection, questions_, {
        decisionId: `mission-question:${request.missionId}-${(requestSeq += 1)}`,
        generation: `mission-${request.missionId}`,
        surface: "mission-question",
        timeoutMs,
        retries: 0,
      });
    } catch {
      result = { ok: false as const, reason: "network" as const };
    }
    const latencyMs = Math.max(0, now() - startedAt);
    const entry = {
      time: now(),
      subject: request.plantId,
      surface: "mission-question" as const,
      latencyMs,
    };

    if (!result.ok) {
      logDecision({
        ...entry,
        outcome: "legacy",
        fallback: true,
        fallbackReason: `provider-${result.reason}`,
      });
      return fallbackPick(`provider-${result.reason}`);
    }
    const answer = result.answers.find((candidate) => candidate.questionId === questionId);
    if (answer === undefined) {
      logDecision({ ...entry, outcome: "rejected", fallback: true, fallbackReason: "missing-answer" });
      return fallbackPick("missing-answer");
    }
    if (answer.type !== "choice") {
      logDecision({ ...entry, outcome: "rejected", fallback: true, fallbackReason: "malformed-answer" });
      return fallbackPick("malformed-answer");
    }
    if (!questions.some((candidate) => candidate.id === answer.id)) {
      logDecision({
        ...entry,
        outcome: "rejected",
        fallback: true,
        fallbackReason: "unknown-candidate",
        confidence: answer.confidence,
      });
      return fallbackPick("unknown-candidate");
    }
    if (!Number.isFinite(answer.confidence) || answer.confidence < minQuestion) {
      logDecision({
        ...entry,
        outcome: "rejected",
        fallback: true,
        fallbackReason: "low-confidence",
        confidence: answer.confidence,
      });
      return fallbackPick("low-confidence");
    }
    logDecision({
      ...entry,
      // D-55: in shadow mode the judgment lands in the log but never steers.
      outcome: shadow ? "shadow" : "applied",
      fallback: false,
      chosenId: answer.id,
      confidence: answer.confidence,
    });
    if (shadow) return fallbackPick("shadow");
    return { questionId: answer.id, fallback: false };
  }

  async function scoreOptions(
    request: MissionScoreRequest,
  ): Promise<MissionScoreDecision> {
    if (!client.isConfigured()) return fallbackScore("unconfigured");
    const options = request.options;
    if (options.length === 0) return fallbackScore("no-options");

    const projection = {
      mission: {
        id: request.missionId,
        engagement: request.engagement,
        "engagement.band": request.engagementBand,
      },
      plant: { id: request.plantId, name: request.plantName },
      question: { id: request.questionId, text: request.questionText },
    };
    const questions: JevQuestion[] = options.map((option) => ({
      id: `mission-score:${request.questionId}:${option.id}`,
      type: "score",
      subjectId: option.id,
      prompt:
        `The trainer answers the question "${request.questionText}" with: "${option.text}". ` +
        `Audience engagement: ${request.engagement}/100 (${request.engagementBand}). ` +
        "How does this answer land with THIS audience? Score 2-4 = lands poorly, " +
        "5 = lands, 6-10 = lands well.",
    }));

    const startedAt = now();
    let result;
    try {
      result = await client.request(projection, questions, {
        decisionId: `mission-score:${request.missionId}-${(requestSeq += 1)}`,
        generation: `mission-${request.missionId}`,
        surface: "mission-answer",
        timeoutMs,
        retries: 0,
      });
    } catch {
      result = { ok: false as const, reason: "network" as const };
    }
    const latencyMs = Math.max(0, now() - startedAt);

    if (!result.ok) {
      for (const option of options) {
        logDecision({
          time: now(),
          subject: `${request.questionId}/${option.id}`,
          surface: "mission-answer",
          outcome: "legacy",
          latencyMs,
          fallback: true,
          fallbackReason: `provider-${result.reason}`,
        });
      }
      return fallbackScore(`provider-${result.reason}`);
    }

    // Per-subject validation (D-49): a bad answer degrades THAT option
    // to baseScore only; valid siblings still steer.
    const adjustments: Record<string, ScoreAdjustment> = {};
    for (const option of options) {
      const questionId = `mission-score:${request.questionId}:${option.id}`;
      const entry = {
        time: now(),
        subject: `${request.questionId}/${option.id}`,
        surface: "mission-answer" as const,
        latencyMs,
      };
      const answer = result.answers.find((candidate) => candidate.questionId === questionId);
      if (answer === undefined) {
        logDecision({ ...entry, outcome: "rejected", fallback: true, fallbackReason: "missing-answer" });
        continue;
      }
      if (answer.type !== "score") {
        logDecision({ ...entry, outcome: "rejected", fallback: true, fallbackReason: "malformed-answer" });
        continue;
      }
      if (!Number.isFinite(answer.confidence) || answer.confidence < minScore) {
        logDecision({
          ...entry,
          outcome: "rejected",
          fallback: true,
          fallbackReason: "low-confidence",
          confidence: answer.confidence,
        });
        continue;
      }
      const adjustment = adjustmentFromScoreLevel(answer.level);
      logDecision({
        ...entry,
        outcome: shadow ? "shadow" : "applied",
        fallback: false,
        confidence: answer.confidence,
      });
      if (!shadow) adjustments[option.id] = adjustment;
    }
    if (shadow) return fallbackScore("shadow");
    if (Object.keys(adjustments).length === 0) return fallbackScore("all-fell-back");
    if (Object.keys(adjustments).length < options.length) {
      return { adjustments, fallback: true, fallbackReason: "partial" };
    }
    return { adjustments, fallback: false };
  }

  return {
    pickQuestion,
    scoreOptions,
    isShadow: () => shadow,
  };
}
