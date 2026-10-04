/**
 * NPC↔NPC deep conversations — schema (C-78 REVISE contract).
 *
 * Authored conversation SCRIPTS for pairs of NPCs: 1-5 exchange levels
 * (starter/response pairs), with cast × band gating.
 *
 * Two-axis casting (Claude/Codex REVISE #1):
 *  - `cast`: STATIC — which NPCs may speak these lines (authored per
 *    script as an explicit pair list or role slots).
 *  - `band`: DYNAMIC — the live relationship band between the two actual
 *    NPCs at trigger time (hostile <35, neutral 35-65, warm >65).
 * A script is eligible when the live pair's band is in `bands` AND both
 * NPCs are in `cast` (if cast is non-empty).
 *
 * Branch representation (Codex P1): each response may carry `next` — the
 * id of the NEXT STARTER on the same level-chain — plus optional
 * `endings`: relationship-band-keyed closing lines. The runtime plays the
 * enumerated path; the whole PATH is pre-decided at pair formation (one
 * Choice over enumerated root-to-leaf paths), never per-branch mid-play.
 * `END` terminates the script.
 *
 * Lines are <= 69 chars (bubble ellipsis bound, bubbles.ts:71). Level =
 * one starter/response exchange; scripts declare 1-5 levels.
 */

import type { NpcId } from "../types";
import type { ReactionBucket } from "../game/social";

export type RelationshipBand = "hostile" | "neutral" | "warm";

/** One NPC's line in the conversation (level = one starter/response pair). */
export interface NpcNpcLine {
  /** Stable unique id within the script. */
  id: string;
  /** The spoken line, <= 69 chars (bubble bound). */
  text: string;
  /**
   * The NEXT starter id on the same chain (deeper level), or undefined /
   * "END" to finish after this line.
   */
  next?: string;
  /**
   * Band-specific closing line: when the conversation ends on this line
   * and the pair's live band matches, this ending plays instead of the
   * default silence (state-conditional endings — REVISE #6).
   */
  endings?: Partial<Record<RelationshipBand, string>>;
  /**
   * The relationship reaction this line carries (once per conversation,
   * settled at the end from the LAST delivered emotional beat).
   */
  reaction?: ReactionBucket;
  /**
   * Player-approach hush line: when the player comes within range while
   * this line is on screen, the NPCs hush with this instead ("...anyway.").
   */
  onPlayerApproach?: string;
}

/** A level: one starter line + its paired response line. */
export interface NpcNpcExchange {
  /** Stable unique id (the starter's id names the exchange). */
  starter: NpcNpcLine;
  /** The response to the starter. */
  response: NpcNpcLine;
}

/** An authored NPC↔NPC conversation script. */
export interface NpcNpcConversation {
  /** Stable unique id across all scripts. */
  id: string;
  /** Short debug label. */
  label: string;
  /** The two cast slots: line speaker A opens, speaker B responds. */
  cast: [NpcId, NpcId];
  /** Live relationship bands this script may run under. */
  bands: readonly RelationshipBand[];
  /** Exchanges in authored order; `next` may jump between levels. */
  exchanges: readonly NpcNpcExchange[];
  /**
   * Trigger priority: event-triggered scripts outrank evergreen ones
   * (Claude direction: causality beats length). Higher picks first.
   */
  priority: number;
  /**
   * Requires ALL these flags (event/quest anchoring — "the printer just
   * jammed" scripts).
   */
  requiresFlags?: readonly string[];
  /** Requires NONE of these flags. */
  blockedByFlags?: readonly string[];
  /** Eligible only in these periods. Missing = all periods. */
  periods?: readonly string[];
}

/** Validate one script; returns a list of problems (empty = valid). */
export function validateNpcNpcConversation(
  script: NpcNpcConversation,
  maxLevels = 5,
): string[] {
  const problems: string[] = [];
  if (script.exchanges.length === 0) problems.push(`${script.id}: no exchanges`);
  if (script.exchanges.length > maxLevels) {
    problems.push(`${script.id}: ${script.exchanges.length} exchanges > max ${maxLevels}`);
  }
  const ids = new Set<string>();
  for (const ex of script.exchanges) {
    for (const line of [ex.starter, ex.response]) {
      if (ids.has(line.id)) problems.push(`${script.id}: duplicate line id "${line.id}"`);
      ids.add(line.id);
      if (!line.text || line.text.length === 0) problems.push(`${line.id}: empty text`);
      if (line.text.length > 69) problems.push(`${line.id}: text > 69 chars (bubble bound)`);
      if (!line.next && line.reaction) {
        problems.push(`${line.id}: reaction on a terminal line is never settled`);
      }
    }
  }
  // Every `next` must resolve to a known starter id.
  const starterIds = new Set(script.exchanges.map((ex) => ex.starter.id));
  for (const ex of script.exchanges) {
    if (ex.starter.next && ex.starter.next !== "END" && !starterIds.has(ex.starter.next)) {
      problems.push(`${script.id}: starter "${ex.starter.id}" next "${ex.starter.next}" unresolved`);
    }
  }
  // Speakers must strictly alternate: starter ids at even depth, i.e. the
  // chain never has the same speaker twice in a row (enforced by cast slots).
  return problems;
}
