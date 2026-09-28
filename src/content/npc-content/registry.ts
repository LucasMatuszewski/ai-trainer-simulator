/**
 * NPC content registry (ADR-0009 section 4 / D-52, created by WS0).
 *
 * The Wave-3 content authors (WS5) write one file per NPC group into
 * `src/content/npc-content/<npc>.ts` and register it here; nobody ever
 * edits this file again. NOTHING imports content yet — the registry is
 * deliberately empty at the WS0 seam commit. The detailed schema v2
 * types (Jev-facing descriptions, relationship bands, requiresFlags)
 * arrive with WS3; the shapes below are the minimal stable skeleton.
 */

import type { NpcId } from "../../types";

/** One authored reply the NPC may give (Jev picks among candidates). */
export interface NpcReplyCandidate {
  id: string;
  /** The actual line spoken. */
  text: string;
  /** Jev-facing description (D-52: every candidate carries one). */
  description?: string;
  /** Ordering hint; the deterministic fallback is candidates[0] (D-47). */
  priority?: number;
}

/** A pool of argument lines (per pair-class/topic; WS3 refines). */
export interface NpcArgumentPool {
  id: string;
  topic?: string;
  lines: readonly string[];
}

/** A pool of authored questions (WS7 conference slice consumes these). */
export interface NpcQuestionPool {
  id: string;
  topic?: string;
  questions: readonly string[];
}

/** Everything authored for one NPC in the expanded content schema. */
export interface NpcContentEntry {
  replyCandidates?: readonly NpcReplyCandidate[];
  argumentPools?: readonly NpcArgumentPool[];
  questionPools?: readonly NpcQuestionPool[];
}

/**
 * Registered content per NPC id. Entries start undefined until a
 * content module calls `registerNpcContent` for that NPC.
 */
export const NPC_CONTENT: Record<NpcId, NpcContentEntry | undefined> =
  {} as Record<NpcId, NpcContentEntry | undefined>;

/** Register (or replace) the authored content entry for one NPC. */
export function registerNpcContent(npcId: NpcId, entry: NpcContentEntry): void {
  NPC_CONTENT[npcId] = entry;
}
