/**
 * Dialogue architecture v2 — the authored pool model (C-77, PRD Flow A2).
 *
 * A conversation is a sequence of exchanges built PER TURN, not a walk of one
 * static tree. Every NPC owns authored pools: topics, each with option
 * candidates (what the player can say) and reply candidates (what the NPC
 * answers), tagged with context. Per turn, code hard-filters candidates by
 * context, then Jev curates <= 4 options and picks the reply. Exhausted
 * threads pivot; nothing ever loops (C-77: the "same stupid interaction" is
 * dead by construction).
 *
 * Layering rules:
 *  - This module is TYPES + validation + shared constants ONLY. It imports
 *    nothing from the engine, the UI, or the pool data files, so both the
 *    pure turn builder (`src/game/dialogue-turn.ts`) and the pool data files
 *    can depend on it without cycles.
 *  - Every line an NPC ever says under this model is authored here in data
 *    (D-45: Jev selects, it never writes).
 *  - Task offers set an EXISTING flag via the standard `set-flag` effect
 *    path — tasks are content, not a new engine.
 *
 * Tag vocabulary (context tags on candidates; ALL tags are hard filters —
 * a candidate is eligible only when every one of its tags holds):
 *   relationship:warm|neutral|hostile  — the player<->NPC band (social model)
 *   stats:low-<stat>|high-<stat>       — player stat bands (< 35 / > 65)
 *   period:morning|lunch|afternoon|evening — the current in-game period
 *   event:<flag>                       — a day-event flag that is set
 *   quest:<flag>                       — a quest/story flag that is set
 */

import type { GameStats, TimeOfDay } from "../types";
import type { ReactionBucket } from "../game/social";

// ---------------------------------------------------------------------------
// Context tags
// ---------------------------------------------------------------------------

export type RelationshipTag =
  | "relationship:warm"
  | "relationship:neutral"
  | "relationship:hostile";

export type StatName = keyof GameStats;

export type StatsTag =
  | `stats:low-${StatName}`
  | `stats:high-${StatName}`;

export type PeriodTag = `period:${TimeOfDay}`;

/** A day-event flag gate: eligible only while `state.flags[flag] === true`. */
export type EventTag = `event:${string}`;

/** A quest/story flag gate: eligible only while `state.flags[flag] === true`. */
export type QuestTag = `quest:${string}`;

export type ContextTag =
  | RelationshipTag
  | StatsTag
  | PeriodTag
  | EventTag
  | QuestTag;

/** Stat bands for `stats:` tags (< 35 low, > 65 high; matches the social bands). */
export const STATS_LOW_THRESHOLD = 35;
export const STATS_HIGH_THRESHOLD = 65;

/** Single source of truth for tag syntax (used by validatePool). */
export const CONTEXT_TAG_PATTERN =
  /^(relationship:(warm|neutral|hostile)|stats:(low|high)-(caffeine|credibility|patience|focus)|period:(morning|lunch|afternoon|evening)|event:[a-z0-9-]+|quest:[a-z0-9-]+)$/;

// ---------------------------------------------------------------------------
// Candidates
// ---------------------------------------------------------------------------

/** One authored thing the PLAYER can say. */
export interface OptionCandidate {
  /** Stable unique id (unique across the whole NPC pool, not just the topic). */
  id: string;
  /** The line as shown on the button. */
  text: string;
  /** The topic this candidate belongs to. */
  topicId: string;
  /** Hard context filters. Empty/undefined = always eligible. */
  tags?: readonly ContextTag[];
}

/** One authored thing the NPC answers. */
export interface ReplyCandidate {
  /** Stable unique id (unique across the whole NPC pool, not just the topic). */
  id: string;
  /** The line as spoken. */
  text: string;
  /** Hard context filters. Empty/undefined = always eligible. */
  tags?: readonly ContextTag[];
  /** When present, the reply carries the referenced task offer. */
  offersTaskId?: string;
  /**
   * Author-tagged social reaction bucket (D-45/D-50): the CODE maps this to
   * a bounded relationship delta via the social model's bucket table. The
   * model never returns numeric deltas. Missing = "neutral".
   */
  relationshipHint?: ReactionBucket;
}

/**
 * A task offer woven mid-conversation (funny, lore-grounded). Picking it
 * dispatches the standard `set-flag` action with `flagToSet` — tasks are
 * content, not a new engine (C-77). The flag MUST already exist in the
 * game's flag vocabulary; the pools test enforces that.
 */
export interface TaskOffer {
  id: string;
  title: string;
  description: string;
  flagToSet: string;
  rewardHint?: string;
}

// ---------------------------------------------------------------------------
// Topics and pools
// ---------------------------------------------------------------------------

/** One conversation thread for one NPC. */
export interface DialogueTopic {
  id: string;
  /** Short label (debug / roster-facing), never rendered as dialogue. */
  label: string;
  optionCandidates: readonly OptionCandidate[];
  replyCandidates: readonly ReplyCandidate[];
  /** Topic-level relationship window (inclusive). Missing = unbounded. */
  minRelationship?: number;
  maxRelationship?: number;
  /** All of these flags must be set for the topic to be eligible. */
  requiresFlags?: readonly string[];
  /** None of these flags may be set for the topic to be eligible. */
  blockedByFlags?: readonly string[];
  /** Eligible only in these periods. Missing = all periods. */
  periods?: readonly TimeOfDay[];
}

/** The full authored dialogue pool for one NPC (or the "generic" fallback). */
export interface NpcDialoguePool {
  /**
   * Owning id: an NpcId for registered pools, or "generic" for the fallback
   * pool any exhausted conversation may pivot its exit small talk from.
   */
  npcId: string;
  topics: readonly DialogueTopic[];
  taskOffers: readonly TaskOffer[];
}

// ---------------------------------------------------------------------------
// Exit constants (the always-available neutral exit, C-77 / AC-04)
// ---------------------------------------------------------------------------

/** Pseudo-topic id for the exit set. Never a real authored topic id. */
export const EXIT_TOPIC_ID = "__exit__";

/** Reserved id of the wrap-up option; always eligible, never suppressed. */
export const WRAP_UP_OPTION_ID = "exit:wrap-up";

/** The always-available exit option. Reserves one option slot (AC-04). */
export const WRAP_UP_OPTION: OptionCandidate = {
  id: WRAP_UP_OPTION_ID,
  text: "Wrap it up.",
  topicId: EXIT_TOPIC_ID,
};

/** The tree id v2 conversations use in the per-NPC option memory. */
export const V2_MEMORY_TREE_ID = "dialogue-v2";

/**
 * What the turn builder needs to know about already-consumed candidates.
 * Cross-session suppression comes from the per-NPC option memory
 * (`dialogue-memory.ts`, tree id above); per-conversation suppression lives
 * in the turn builder's session type.
 */
export interface DialogueTurnMemory {
  usedOptionIds: ReadonlySet<string>;
  usedReplyIds: ReadonlySet<string>;
}

/** Text bounds (characters). Replies may run long (the legacy trees do). */
export const OPTION_MIN_LENGTH = 4;
export const OPTION_MAX_LENGTH = 160;
export const REPLY_MIN_LENGTH = 20;
export const REPLY_MAX_LENGTH = 520;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/** The "no problems" value validatePool returns. Named for readable tests. */
export const VALIDATE_OK: readonly string[] = [];

/**
 * Validates one pool against the schema. Returns a list of human-readable
 * problems; `VALIDATE_OK` (an empty list) means the pool is valid. Pure;
 * used by the pools unit test (every registered pool must validate) and
 * safe to call in dev.
 */
export function validatePool(pool: NpcDialoguePool): string[] {
  const problems: string[] = [];
  const push = (problem: string): void => {
    problems.push(`${pool.npcId}: ${problem}`);
  };

  if (!pool.npcId || typeof pool.npcId !== "string") push("pool has no npcId");
  if (!Array.isArray(pool.topics) || pool.topics.length === 0) {
    push("pool has no topics");
    return problems;
  }
  if (!Array.isArray(pool.taskOffers)) push("taskOffers is not an array");

  const topicIds = new Set<string>();
  const seenCandidateIds = new Set<string>();
  const taskIds = new Set<string>();

  for (const task of pool.taskOffers) {
    if (taskIds.has(task.id)) push(`duplicate task id "${task.id}"`);
    taskIds.add(task.id);
    if (!task.title || task.title.length < 4) push(`task "${task.id}" title too short`);
    if (!task.description || task.description.length < 20) {
      push(`task "${task.id}" description too short`);
    }
    if (!task.flagToSet || !/^[a-z0-9-]+$/.test(task.flagToSet)) {
      push(`task "${task.id}" flagToSet missing or malformed`);
    }
  }

  for (const topic of pool.topics) {
    if (topicIds.has(topic.id)) push(`duplicate topic id "${topic.id}"`);
    topicIds.add(topic.id);
    if (!topic.label || topic.label.length < 3) push(`topic "${topic.id}" label too short`);
    if (!Array.isArray(topic.optionCandidates) || topic.optionCandidates.length === 0) {
      push(`topic "${topic.id}" has no option candidates`);
    }
    if (!Array.isArray(topic.replyCandidates) || topic.replyCandidates.length === 0) {
      push(`topic "${topic.id}" has no reply candidates`);
    }
    if (topic.minRelationship !== undefined && topic.maxRelationship !== undefined
      && topic.minRelationship > topic.maxRelationship) {
      push(`topic "${topic.id}" relationship window is inverted`);
    }
  }

  for (const topic of pool.topics) {
    for (const option of topic.optionCandidates) {
      if (seenCandidateIds.has(option.id)) push(`duplicate candidate id "${option.id}"`);
      seenCandidateIds.add(option.id);
      if (option.topicId !== topic.id) {
        push(`option "${option.id}" topicId "${option.topicId}" does not match its topic "${topic.id}"`);
      }
      if (!topicIds.has(option.topicId)) push(`option "${option.id}" references unknown topic`);
      const textProblem = textProblemOf(option.text, OPTION_MIN_LENGTH, OPTION_MAX_LENGTH);
      if (textProblem) push(`option "${option.id}" ${textProblem}`);
      for (const tag of option.tags ?? []) {
        if (!CONTEXT_TAG_PATTERN.test(tag)) push(`option "${option.id}" has malformed tag "${tag}"`);
      }
    }
    for (const reply of topic.replyCandidates) {
      if (seenCandidateIds.has(reply.id)) push(`duplicate candidate id "${reply.id}"`);
      seenCandidateIds.add(reply.id);
      const textProblem = textProblemOf(reply.text, REPLY_MIN_LENGTH, REPLY_MAX_LENGTH);
      if (textProblem) push(`reply "${reply.id}" ${textProblem}`);
      for (const tag of reply.tags ?? []) {
        if (!CONTEXT_TAG_PATTERN.test(tag)) push(`reply "${reply.id}" has malformed tag "${tag}"`);
      }
      if (reply.relationshipHint !== undefined
        && !["offended", "annoyed", "neutral", "pleased", "delighted"].includes(reply.relationshipHint)) {
        push(`reply "${reply.id}" has unknown relationshipHint "${reply.relationshipHint}"`);
      }
      if (reply.offersTaskId !== undefined && !taskIds.has(reply.offersTaskId)) {
        push(`reply "${reply.id}" offers unknown task "${reply.offersTaskId}"`);
      }
    }
  }

  return problems;
}

function textProblemOf(text: string, min: number, max: number): string | null {
  if (typeof text !== "string" || text.trim().length === 0) return "text is empty";
  if (text.length < min) return `text too short (${text.length} < ${min})`;
  if (text.length > max) return `text too long (${text.length} > ${max})`;
  return null;
}
