/**
 * WS3 dialogue v2 turn builder (C-77, PRD Flow A2) — PURE.
 *
 * A conversation is a sequence of exchanges built per turn, not a walk of
 * one static tree. Per turn this module:
 *   1. hard-filters every candidate by context (relationship band, player
 *      stat bands, period, event/quest flags) and by the used-id sets
 *      (cross-session memory + this session's usage),
 *   2. chooses the thread: stay on the current topic while it has >= 2
 *      unused options, otherwise PIVOT to the richest eligible topic,
 *   3. and when NOTHING is left, returns the always-available exit set
 *      ("Wrap it up" + generic small talk that is never suppressed) —
 *      the C-77 "same stupid interaction" loop is dead by construction.
 *
 * Deterministic fallback order everywhere: authored priority (array order),
 * first-unused first. Jev (via the dialogue wrapper) may reorder/curate on
 * top; with Jev off the game plays exactly this order.
 *
 * No module state, no DOM, no engine imports — every input is an argument.
 */

import { band } from "./social";
import type { GameStats, GameState, TimeOfDay } from "../types";
import {
  EXIT_TOPIC_ID,
  STATS_HIGH_THRESHOLD,
  STATS_LOW_THRESHOLD,
  WRAP_UP_OPTION,
  type DialogueTopic,
  type DialogueTurnMemory,
  type NpcDialoguePool,
  type OptionCandidate,
  type ReplyCandidate,
  type TaskOffer,
} from "../content/dialogue-schema";
import {
  GENERIC_DIALOGUE_POOL,
  dialoguePoolFor,
} from "../content/npc-content/dialogue-pools";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Per-topic bookkeeping of what this conversation already consumed. */
export interface TopicUsage {
  usedOptionIds: ReadonlySet<string>;
  usedReplyIds: ReadonlySet<string>;
}

/** Session-scoped state for one open conversation. */
export interface ConversationSession {
  /** Thread the conversation is currently on (null before the first turn). */
  currentTopicId: string | null;
  usage: Record<string, TopicUsage>;
}

/** The pre-computed facts one turn is filtered against. */
export interface TurnContext {
  /** Player<->NPC relationship value (0-100; 50 default). */
  relationship: number;
  flags: Record<string, boolean>;
  period: TimeOfDay;
  stats: GameStats;
}

/** One option as shown for a turn. The exit option is always last. */
export interface TurnOption {
  option: OptionCandidate;
  isExit: boolean;
}

/** One built turn. */
export interface DialogueTurn {
  /** Active topic id; EXIT_TOPIC_ID when the exit set is being served. */
  topicId: string;
  /** When the builder pivoted, the thread it pivoted away from. */
  pivotedFromTopicId: string | null;
  /** Up to 4 options; the wrap-up exit always reserves the last slot. */
  options: readonly TurnOption[];
  /**
   * Eligible replies for this turn (the union of the visible options'
   * paired replies), in authored order. Legacy consumers and the Jev
   * curation request read this; the DETERMINISTIC answer to a picked
   * option comes from repliesFor(option.id) — pairing is the contract.
   */
  replyCandidates: readonly ReplyCandidate[];
  /**
   * C-78: the replies THAT ANSWER the given option id (its authored
   * pair, or the positional/legacy fallback). Deterministic; no Jev.
   */
  repliesFor(optionId: string): readonly ReplyCandidate[];
  /** Task offers referenced by this turn's replies, resolved. */
  taskOffers: readonly TaskOffer[];
  /** True when every authored thread is exhausted (exit set served). */
  exhausted: boolean;
}

/** AC-04: the dialogue panel never shows more than 4 options. */
export const MAX_VISIBLE_OPTIONS = 4;

// ---------------------------------------------------------------------------
// Context + tag evaluation
// ---------------------------------------------------------------------------

/** Reads the turn context for one NPC out of the game state. Pure. */
export function turnContextFor(state: Readonly<GameState>, npcId: string): TurnContext {
  return {
    // C-78: an unknown NPC is a stranger, not a 50-friend.
    relationship: state.npcRelationships[npcId] ?? 20,
    flags: state.flags,
    period: state.timeOfDay,
    stats: state.stats,
  };
}

/**
 * True when every context tag holds. Tags are hard filters (a candidate is
 * eligible only when ALL of its tags hold); an unknown tag never passes.
 * Pure.
 */
export function tagsEligible(tags: readonly string[] | undefined, ctx: TurnContext): boolean {
  if (tags === undefined) return true;
  for (const tag of tags) {
    if (tag.startsWith("relationship:")) {
      if (band(ctx.relationship) !== tag.slice("relationship:".length)) return false;
    } else if (tag.startsWith("stats:")) {
      const match = /^(low|high)-([a-z]+)$/.exec(tag.slice("stats:".length));
      if (match === null) return false;
      const value = ctx.stats[match[2] as keyof GameStats];
      if (typeof value !== "number" || !Number.isFinite(value)) return false;
      if (match[1] === "low" && value >= STATS_LOW_THRESHOLD) return false;
      if (match[1] === "high" && value <= STATS_HIGH_THRESHOLD) return false;
    } else if (tag.startsWith("period:")) {
      if (ctx.period !== tag.slice("period:".length)) return false;
    } else if (tag.startsWith("event:") || tag.startsWith("quest:")) {
      const flag = tag.slice(tag.indexOf(":") + 1);
      if (ctx.flags[flag] !== true) return false;
    } else {
      return false;
    }
  }
  return true;
}

/** Topic-level hard gates (flags, relationship window, periods). Pure. */
export function topicEligible(topic: DialogueTopic, ctx: TurnContext): boolean {
  if (topic.periods !== undefined && !topic.periods.includes(ctx.period)) return false;
  if (topic.minRelationship !== undefined && ctx.relationship < topic.minRelationship) return false;
  if (topic.maxRelationship !== undefined && ctx.relationship > topic.maxRelationship) return false;
  for (const flag of topic.requiresFlags ?? []) {
    if (ctx.flags[flag] !== true) return false;
  }
  for (const flag of topic.blockedByFlags ?? []) {
    if (ctx.flags[flag] === true) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Session helpers (pure)
// ---------------------------------------------------------------------------

/** A fresh, empty conversation session. */
export function newConversationSession(): ConversationSession {
  return { currentTopicId: null, usage: {} };
}

/**
 * Records one exchange (an option the player picked + the reply they heard)
 * into a NEW session; the input is never mutated. The current topic moves
 * to `topicId` unless the exchange happened on the exit pseudo-topic.
 */
export function recordExchange(
  session: ConversationSession,
  topicId: string,
  optionId: string,
  replyId: string,
): ConversationSession {
  const prev = session.usage[topicId] ?? emptyUsage();
  return {
    currentTopicId: topicId === EXIT_TOPIC_ID ? session.currentTopicId : topicId,
    usage: {
      ...session.usage,
      [topicId]: {
        usedOptionIds: new Set([...prev.usedOptionIds, optionId]),
        usedReplyIds: new Set([...prev.usedReplyIds, replyId]),
      },
    },
  };
}

/** Stable, order-independent fingerprint of a used-id set (wrapper memo key). */
export function usedSetFingerprint(ids: Iterable<string>): string {
  return [...ids].sort().join(",");
}

function emptyUsage(): TopicUsage {
  return { usedOptionIds: new Set<string>(), usedReplyIds: new Set<string>() };
}

function unionUsed(a: ReadonlySet<string>, b: ReadonlySet<string> | undefined): ReadonlySet<string> {
  if (b === undefined || b.size === 0) return a;
  return new Set([...a, ...b]);
}

// ---------------------------------------------------------------------------
// buildTurn
// ---------------------------------------------------------------------------

/**
 * Builds one conversation turn for the NPC. Returns null when the NPC has
 * no registered v2 pool and no override was given (the caller falls back to
 * the legacy dialogue tree). Pure.
 */
export function buildTurn(
  state: Readonly<GameState>,
  npcId: string,
  memory: DialogueTurnMemory,
  session: ConversationSession,
  poolOverride?: NpcDialoguePool,
): DialogueTurn | null {
  const pool = poolOverride ?? dialoguePoolFor(npcId);
  if (pool === undefined) return null;

  const ctx = turnContextFor(state, npcId);
  // Task offers whose flag is already set are done: never re-offered.
  const doneTaskIds = new Set(
    pool.taskOffers.filter((task) => ctx.flags[task.flagToSet] === true).map((task) => task.id),
  );

  // Eligible slices per topic, in authored order.
  const slices = pool.topics
    .filter((topic) => topicEligible(topic, ctx))
    .map((topic) => sliceOf(topic, ctx, memory, session, doneTaskIds));

  const active = session.currentTopicId === null
    ? undefined
    : slices.find((slice) => slice.topic.id === session.currentTopicId);

  // Stay on the current thread while it has >= 2 unused options.
  if (active !== undefined && active.options.length >= 2) {
    return serveSlice(pool, active, null, false);
  }

  // Otherwise pivot to the richest eligible thread (ties: authored order).
  let best: Slice | undefined;
  for (const slice of slices) {
    if (slice.options.length === 0) continue;
    if (best === undefined || slice.options.length > best.options.length) best = slice;
  }
  if (best !== undefined && (active === undefined || best.topic.id !== active.topic.id)) {
    return serveSlice(pool, best, active?.topic.id ?? null, false);
  }
  if (active !== undefined && active.options.length >= 1) {
    return serveSlice(pool, active, null, false);
  }

  return exitTurn(ctx, session);
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

interface Slice {
  topic: DialogueTopic;
  options: readonly OptionCandidate[];
  /** C-78: replies resolve from the CHOSEN option (paired), not a pool. */
  repliesFor: (optionId: string) => ReplyCandidate[];
  /** Task ids whose flags are already set (never re-offered). */
  doneTaskIds: ReadonlySet<string>;
}

function sliceOf(
  topic: DialogueTopic,
  ctx: TurnContext,
  memory: DialogueTurnMemory,
  session: ConversationSession,
  doneTaskIds: ReadonlySet<string>,
): Slice {
  const usage = session.usage[topic.id];
  const usedOptions = unionUsed(memory.usedOptionIds, usage?.usedOptionIds);
  const usedReplies = unionUsed(memory.usedReplyIds, usage?.usedReplyIds);

  const options = topic.optionCandidates.filter(
    (option) => !usedOptions.has(option.id) && tagsEligible(option.tags, ctx),
  );

  // C-78 (dialogue architecture v3): replies are PAIRED to the option
  // they answer — the author writes "question -> its answers", and the
  // engine serves exactly the chosen option's replies. The topic-level
  // pool (legacy shape) is treated as a positional 1:1 author pairing:
  // option i is answered by reply i. Deterministic, zero cost, always
  // the answer to the question that was actually asked.
  const repliesFor = (optionId: string): ReplyCandidate[] => {
    const option = topic.optionCandidates.find((candidate) => candidate.id === optionId);
    // 1. Explicit paired variants authored on the option (v3 nesting).
    if (option !== undefined && Array.isArray(option.replies) && option.replies.length > 0) {
      return [...option.replies];
    }
    // 2. Positional author pairing (option i <-> reply i) — deterministic.
    const index = topic.optionCandidates.findIndex((candidate) => candidate.id === optionId);
    const positional = topic.replyCandidates?.[index];
    if (positional && !usedReplies.has(positional.id) && tagsEligible(positional.tags, ctx)) {
      return [positional];
    }
    // 3. Recycle: an option must never dead-end (the old contract —
    // replies recycle before options repeat).
    const recycled = (topic.replyCandidates ?? []).filter(
      (reply) => tagsEligible(reply.tags, ctx),
    );
    return recycled.length > 0 ? recycled : [...(topic.replyCandidates ?? [])];
  };

  return { topic, options, repliesFor, doneTaskIds };
}

function serveSlice(
  pool: NpcDialoguePool,
  slice: Slice,
  pivotedFromTopicId: string | null,
  exhausted: boolean,
): DialogueTurn {
  const shown = slice.options.slice(0, MAX_VISIBLE_OPTIONS - 1);
  // C-78: the served replies are the union of the visible options' paired
  // replies — the panel/steerer can only answer an option on screen.
  // Deduplicated (the recycle fallback can return the same fresh reply
  // for several options) and ordered by first appearance.
  const served: ReplyCandidate[] = [];
  const seenReplyIds = new Set<string>();
  const repliesFor = (optionId: string): readonly ReplyCandidate[] =>
    slice.repliesFor(optionId);
  for (const option of shown) {
    for (const reply of repliesFor(option.id)) {
      if (!seenReplyIds.has(reply.id)) {
        seenReplyIds.add(reply.id);
        served.push(reply);
      }
    }
  }
  // Task replies stay visible while their flag is unset — even when their
  // paired option was already consumed (offers are the point of tasks).
  for (const task of pool.taskOffers) {
    if (slice.doneTaskIds.has(task.id)) continue;
    const taskReply = (slice.topic.replyCandidates ?? []).find(
      (reply) => reply.offersTaskId === task.id,
    );
    if (taskReply && !seenReplyIds.has(taskReply.id)) {
      seenReplyIds.add(taskReply.id);
      served.push(taskReply);
    }
  }
  // Authored pool order (deterministic; the task reply sorts naturally).
  const poolOrder = new Map(
    (slice.topic.replyCandidates ?? []).map((reply, index) => [reply.id, index]),
  );
  served.sort(
    (a, b) => (poolOrder.get(a.id) ?? 999) - (poolOrder.get(b.id) ?? 999),
  );
  return {
    topicId: slice.topic.id,
    pivotedFromTopicId,
    options: [
      ...shown.map((option) => ({ option, isExit: false }) as TurnOption),
      { option: WRAP_UP_OPTION, isExit: true },
    ],
    replyCandidates: served,
    repliesFor,
    taskOffers: pool.taskOffers.filter((task) =>
      served.some((reply) => reply.offersTaskId === task.id),
    ),
    exhausted,
  };
}

/**
 * The exit set: "Wrap it up" + generic small talk from the fallback pool.
 * Exit small talk is deliberately NOT memory-suppressed (C-77) — it is the
 * conversation's holding pattern and can never dead-end. Replies prefer
 * session-unused generic lines and recycle when out.
 */
function exitTurn(ctx: TurnContext, session: ConversationSession): DialogueTurn {
  const exitReplyUsage = session.usage[EXIT_TOPIC_ID]?.usedReplyIds ?? new Set<string>();

  let bestTopic: DialogueTopic | undefined;
  for (const topic of GENERIC_DIALOGUE_POOL.topics) {
    if (!topicEligible(topic, ctx)) continue;
    const unusedReplies = (topic.replyCandidates ?? []).filter(
      (reply) => !exitReplyUsage.has(reply.id) && tagsEligible(reply.tags, ctx),
    ).length
      + topic.optionCandidates.filter((option) =>
          (option.replies ?? []).some(
            (reply) => !exitReplyUsage.has(reply.id) && tagsEligible(reply.tags, ctx),
          )).length;
    const bestUnused = bestTopic === undefined
      ? -1
      : (bestTopic.replyCandidates ?? []).filter(
          (reply) => !exitReplyUsage.has(reply.id) && tagsEligible(reply.tags, ctx),
        ).length
        + bestTopic.optionCandidates.filter((option) =>
            (option.replies ?? []).some(
              (reply) => !exitReplyUsage.has(reply.id) && tagsEligible(reply.tags, ctx),
            )).length;
    if (unusedReplies > bestUnused) bestTopic = topic;
  }

  const options: TurnOption[] = [{ option: WRAP_UP_OPTION, isExit: true }];
  let replies: readonly ReplyCandidate[] = [];
  if (bestTopic !== undefined) {
    for (const option of bestTopic.optionCandidates) {
      if (options.length >= MAX_VISIBLE_OPTIONS) break;
      if (!tagsEligible(option.tags, ctx)) continue;
      options.push({ option, isExit: false });
    }
    // C-78: count the options that still have a fresh PAIRED reply —
    // the pivot serves per-option answers, not a topic reply pool.
    replies = bestTopic.optionCandidates.flatMap((option) =>
      option.replies?.filter(
        (reply) => !exitReplyUsage.has(reply.id) && tagsEligible(reply.tags, ctx),
      ) ?? (bestTopic.replyCandidates
        ? [bestTopic.replyCandidates[bestTopic.optionCandidates.indexOf(option)]]
            .filter((reply): reply is ReplyCandidate => reply !== undefined)
        : []),
    );
    if (replies.length === 0) {
      replies = (bestTopic.replyCandidates ?? []).filter((reply) => tagsEligible(reply.tags, ctx));
    }
  }

  return {
    topicId: EXIT_TOPIC_ID,
    pivotedFromTopicId: session.currentTopicId,
    options,
    replyCandidates: replies,
    // C-78: the exit set's replies resolve from the same pairing —
    // positional over whichever topic the pivot landed on.
    repliesFor: (optionId: string): readonly ReplyCandidate[] => {
      const index = (bestTopic?.optionCandidates ?? []).findIndex(
        (candidate) => candidate.id === optionId,
      );
      const paired = index >= 0
        ? [bestTopic!.replyCandidates?.[index]].filter(
            (reply): reply is ReplyCandidate => reply !== undefined,
          )
        : [];
      return paired.length > 0 ? paired : replies;
    },
    taskOffers: [],
    exhausted: true,
  };
}
