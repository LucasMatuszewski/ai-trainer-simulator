/**
 * WS3 dialogue wrapper — the steered turn layer (C-77, PRD Flow A2, D-60).
 *
 * Two steered surfaces per conversation turn, following the greeting-wrapper
 * pattern (prefetch -> store -> instant serve -> honest logging):
 *
 *  1. OPTION CURATION — one Score question per eligible option candidate
 *     ("how relevant is this line right now"), ranked by level with authored
 *     priority as the tie-break. Cosmetic surface (D-60): lenient threshold,
 *     live.
 *  2. REPLY SELECTION — one Choice over the reply candidates ("which line
 *     fits"). Consequential surface: conservative threshold; the social
 *     reaction is NOT a judgment — code maps the chosen reply's
 *     author-tagged `relationshipHint` through the social model's bucket
 *     table (D-45/D-50: no numeric deltas cross the model boundary).
 *
 * Both live in ONE batched request per turn (output tokens are free; the
 * dialogue clock is frozen so a ~100 ms judgment never ticks the world).
 * Every outcome falls back to the pure builder output (authored priority /
 * first-unused) the moment anything is off: unconfigured, provider error,
 * timeout, unknown candidate, or low confidence. Fallback is invisible.
 *
 * The memo is keyed by (npcId, topicId, used-option-set fingerprint): the
 * same situation is judged once per session. `?jev=shadow` (D-55) judges and
 * logs `shadow` outcomes but never stores, so the game plays the authored
 * fallback while the log accumulates calibration data.
 *
 * Projection is allowlist-only (D-59): fictional actor ids plus the
 * caller-supplied named facts. Player-typed text never enters a projection.
 */

import type { DecisionClient, JevQuestion } from "./contracts";
import { createResolvingClient } from "./client";
import { logDecision } from "./decision-log";
import { usedSetFingerprint } from "../game/dialogue-turn";
import type { OptionCandidate, ReplyCandidate } from "../content/dialogue-schema";
import type { ReactionBucket } from "../game/social";

/** D-60 option-curation row: cosmetic surface, confidence >= 0.3, live. */
export const DIALOGUE_CURATION_MIN_CONFIDENCE = 0.3;
/** D-60 reply-selection row: consequential -> conservative threshold. */
export const DIALOGUE_REPLY_MIN_CONFIDENCE = 0.6;
/** PRD dialogue deadline: the judgment budget starts at input acceptance. */
export const DIALOGUE_BUDGET_MS = 1200;

export interface SteeredTurnRequest {
  npcId: string;
  topicId: string;
  /** Eligible, unused option candidates for this turn (from buildTurn). */
  options: readonly OptionCandidate[];
  /** Eligible reply candidates for this turn (from buildTurn). */
  replies: readonly ReplyCandidate[];
  /** Used-option ids this turn was built against (part of the memo key). */
  usedOptionIds: readonly string[];
  usedReplyIds: readonly string[];
  /** Pre-computed named facts (allowlisted state; D-59). */
  facts?: Readonly<Record<string, string | number | boolean>>;
}

export interface SteeredTurnDecision {
  /** Steered option order (best first); null = authored order fallback. */
  optionIds: readonly string[] | null;
  /** Steered reply id; null = first-unused fallback. */
  replyId: string | null;
  /** Code-mapped social bucket of the chosen reply (null when no reply). */
  bucket: ReactionBucket | null;
  confidence: number | null;
  fallback: boolean;
  fallbackReason?: string;
}

export interface DialogueWrapperOptions {
  /** Decision client. Default: the resolving client (key provider). */
  client?: DecisionClient;
  /** D-55: requests run and log `shadow`, but nothing ever steers. */
  shadow?: boolean;
  /** D-60 threshold overrides (tests). */
  minCurationConfidence?: number;
  minReplyConfidence?: number;
  /** Request budget in ms. Default 1200 (PRD dialogue deadline). */
  timeoutMs?: number;
  /** Injectable clock (tests). */
  now?: () => number;
}

export interface DialogueSteererHandle {
  /**
   * Judge one turn (memoized). Resolves with the steered decision, or the
   * fallback decision (nulls + fallback=true). Never throws.
   */
  steerTurn(request: SteeredTurnRequest): Promise<SteeredTurnDecision>;
  /** WS4-verdict fix: bump the session token, fencing in-flight steers. */
  nextSession(): number;
  /** The current session token (compare before applying an answer). */
  currentSession(): number;
  /** Stored steered option order for the situation, or null. */
  memoOptionOrder(
    npcId: string,
    topicId: string,
    usedOptionIds: readonly string[],
  ): readonly string[] | null;
  /** Stored steered reply + bucket for the situation, or null. */
  memoReply(
    npcId: string,
    topicId: string,
    usedOptionIds: readonly string[],
  ): { replyId: string; bucket: ReactionBucket } | null;
  /** Clears the session memo (called when a conversation ends). */
  resetSession(): void;
  isShadow(): boolean;
}

interface MemoEntry {
  decision: SteeredTurnDecision;
}

/** Code-side mapping of the author-tagged hint to the social bucket (D-50). */
export function bucketOfReply(reply: ReplyCandidate): ReactionBucket {
  return reply.relationshipHint ?? "neutral";
}

export function createDialogueWrapper(options: DialogueWrapperOptions = {}): DialogueSteererHandle {
  const client = options.client ?? createResolvingClient();
  const shadow = options.shadow ?? false;
  const minCuration = options.minCurationConfidence ?? DIALOGUE_CURATION_MIN_CONFIDENCE;
  const timeoutMs = options.timeoutMs ?? DIALOGUE_BUDGET_MS;
  const now = options.now ?? (() => Date.now());

  const memo = new Map<string, MemoEntry>();
  let requestSeq = 0;

  const memoKey = (npcId: string, topicId: string, usedOptionIds: readonly string[]): string =>
    `${npcId}|${topicId}|${usedSetFingerprint(usedOptionIds)}`;

  const FALLBACK = (reason: string): SteeredTurnDecision => ({
    optionIds: null,
    replyId: null,
    bucket: null,
    confidence: null,
    fallback: true,
    fallbackReason: reason,
  });

  async function steerTurn(request: SteeredTurnRequest): Promise<SteeredTurnDecision> {
    const key = memoKey(request.npcId, request.topicId, request.usedOptionIds);
    const hit = memo.get(key);
    if (hit !== undefined) return hit.decision;

    // Nothing to judge: the pure builder output IS the answer.
    if (request.options.length === 0 && request.replies.length === 0) {
      return FALLBACK("empty-turn");
    }
    if (!client.isConfigured()) return FALLBACK("unconfigured");

    const facts = request.facts ?? {};
    const questions: JevQuestion[] = [];
    for (const option of request.options) {
      questions.push({
        id: `dialogue:option:${request.npcId}:${option.id}`,
        type: "score",
        prompt:
          `How well does this player line fit the current conversation with ` +
          `coworker ${request.npcId}? Situation: ${JSON.stringify(facts)}. ` +
          `Line: "${option.text}"`,
        subjectId: request.npcId,
        // PR review fix: the provider needs the LEVELS as criteria — the
        // old prompt alone described a 0-10 scale it could not answer with.
        criteria: [
          "does not fit this conversation at all right now",
          "barely fits — an odd or off-key thing to say",
          "a neutral, reasonable thing to say",
          "fits well — natural and fitting for this moment",
          "exactly the right thing to say to this coworker right now",
        ],
      });
    }

    const startedAt = now();
    // Closure verdict Medium 4: fence the MEMO WRITE, not just the UI
    // application - capture the session now and refuse to repopulate
    // the memo if close/reopen bumped the token while we were in
    // flight (a stale curation must never serve a later conversation).
    const sessionAtRequest = currentSession();
    let result;
    try {
      result = await client.request(
        { ...facts },
        questions,
        {
          decisionId: `dialogue-${request.npcId}-${(requestSeq += 1)}`,
          surface: "option-curation",
          timeoutMs,
          retries: 0, // a conversation must never stall on a judgment
        },
      );
    } catch {
      result = { ok: false as const, reason: "network" as const };
    }
    if (currentSession() !== sessionAtRequest) {
      logDecision({ time: now(), subject: request.npcId, latencyMs: Math.max(0, now() - startedAt), surface: "option-curation", outcome: "stale", fallback: true, fallbackReason: "session-changed" });
      return FALLBACK("session-changed");
    }
    const latencyMs = Math.max(0, now() - startedAt);
    const base = { time: now(), subject: request.npcId, latencyMs };

    if (!result.ok) {
      // One honest log entry: curation is the only judged surface.
      logDecision({ ...base, surface: "option-curation", outcome: "legacy", fallback: true, fallbackReason: `provider-${result.reason}` });
      return FALLBACK(`provider-${result.reason}`);
    }

    // ---- option curation (cosmetic, lenient) ----
    const ranked: { optionId: string; level: number; confidence: number }[] = [];
    let curationRejected = 0;
    for (const answer of result.answers) {
      if (answer.type !== "score" || !answer.questionId.startsWith(`dialogue:option:${request.npcId}:`)) {
        continue;
      }
      const optionId = answer.questionId.slice(`dialogue:option:${request.npcId}:`.length);
      if (!request.options.some((option) => option.id === optionId)) continue; // unknown candidate
      if (!Number.isFinite(answer.level)) {
        curationRejected += 1;
        continue;
      }
      if (answer.confidence < minCuration) {
        curationRejected += 1;
        continue;
      }
      ranked.push({ optionId, level: answer.level, confidence: answer.confidence });
    }
    let optionIds: readonly string[] | null = null;
    let curationFallbackReason: string | undefined;
    let topConfidence: number | undefined;
    if (ranked.length > 0) {
      const rankedIds = new Set(ranked.map((entry) => entry.optionId));
      const rankedSorted = [...ranked].sort((a, b) =>
        b.level - a.level
        || request.options.findIndex((o) => o.id === a.optionId) - request.options.findIndex((o) => o.id === b.optionId),
      );
      // Ranked options first (best score), then the unranked in authored
      // order. The caller slices to <= 4; the builder already reserves the
      // exit slot.
      optionIds = [
        ...rankedSorted.map((entry) => entry.optionId),
        ...request.options.filter((option) => !rankedIds.has(option.id)).map((option) => option.id),
      ];
      topConfidence = rankedSorted[0]!.confidence;
      logDecision({
        ...base,
        surface: "option-curation",
        outcome: shadow ? "shadow" : "applied",
        fallback: false,
        chosenId: optionIds[0],
        confidence: topConfidence,
      });
    } else {
      curationFallbackReason = curationRejected > 0 ? "low-confidence" : "missing-answer";
      logDecision({
        ...base,
        surface: "option-curation",
        outcome: "rejected",
        fallback: true,
        fallbackReason: curationFallbackReason,
      });
    }

    // ---- C-78: reply selection is DETERMINISTIC (paired to the clicked
    // option); the steerer only curates which options surface. ----

    const decision: SteeredTurnDecision = {
      optionIds,
      replyId: null,
      bucket: null,
      confidence: topConfidence ?? null,
      fallback: optionIds === null,
      fallbackReason: curationFallbackReason,
    };
    if (shadow) {
      // D-55: the judgments were logged above as `shadow`, but neither the
      // memo nor the return value may steer — the game plays the authored
      // fallback while the log accumulates calibration data.
      return FALLBACK("shadow");
    }
    memo.set(key, { decision });
    return decision;
  }

  let sessionToken = 0;
  /** WS4-verdict fix: bumping the token fences every in-flight steer —
   *  answers arriving after a close/reopen apply to nothing. */
  function nextSession(): number {
    sessionToken += 1;
    return sessionToken;
  }
  function currentSession(): number {
    return sessionToken;
  }

  return {
    nextSession,
    currentSession,
    steerTurn,
    memoOptionOrder: (npcId, topicId, usedOptionIds) =>
      memo.get(memoKey(npcId, topicId, usedOptionIds))?.decision.optionIds ?? null,
    memoReply: (npcId, topicId, usedOptionIds) => {
      const decision = memo.get(memoKey(npcId, topicId, usedOptionIds))?.decision;
      if (decision === undefined || decision.replyId === null) return null;
      return { replyId: decision.replyId, bucket: decision.bucket ?? "neutral" };
    },
    resetSession: () => memo.clear(),
    isShadow: () => shadow,
  };
}
