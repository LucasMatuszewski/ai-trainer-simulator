/**
 * WS7-v2 (C-78 REVISE): the NPC↔NPC conversation runner — a PURE state
 * machine that plays an authored script (1-5 exchanges) as a timed
 * bubble sequence, with hold state, an interruption table, and exactly-
 * once settlement.
 *
 * The orchestrator (main.ts) drives `advance(dt)` inside the unpaused
 * clock gate and renders `currentLine()` through the bubble system. The
 * runner NEVER mutates game state directly: the settled reaction bucket
 * is returned on completion and the caller dispatches the bounded
 * relationship delta through the standard action.
 *
 * Interruption table (Claude/Codex REVISE #4): the run ends early — with
 * the delivered lines kept and the pending reaction dropped — on:
 *   - player opens dialogue with a participant (caller calls `hush()`)
 *   - a participant leaves the radius / goes home (caller calls `abandon()`)
 *   - period transition / Tier-0 event (caller calls `abandon()`)
 * Each interruption plays the authored hush line ("...anyway.") when the
 * current line is a `onPlayerApproach` carrier, otherwise ends silently.
 */

import {
  type NpcNpcConversation,
  type NpcNpcExchange,
  type NpcNpcLine,
  type RelationshipBand,
} from "../content/npc-npc-conversations-schema";

export interface RunnerLine {
  id: string;
  /** Which cast slot speaks this line ("A" = script.cast[0], "B" = cast[1]). */
  speaker: "A" | "B";
  text: string;
  /** Seconds this line stays on screen (scaled by text length). */
  dwellS: number;
  /** Player-approach hush line, when authored for this line. */
  onPlayerApproach?: string;
}

export interface RunnerEvent {
  id: string;
  speaker: "A" | "B";
  text: string;
  dwellS: number;
  onPlayerApproach?: string;
  /** The reaction bucket this line carries (settled once, at the end). */
  reaction?: "offended" | "annoyed" | "neutral" | "pleased" | "delighted";
}

export type RunnerPhase = "running" | "hushed" | "complete" | "abandoned";

export interface RunnerSnapshot {
  phase: RunnerPhase;
  /** Index of the current line into the flattened line list. */
  lineIndex: number;
  /** Seconds the current line has been on screen. */
  elapsedOnLineS: number;
  /** Lines delivered so far (for "already delivered" effect bookkeeping). */
  deliveredCount: number;
  /** Total lines in the flattened path. */
  totalCount: number;
  /** The reaction bucket to settle (from the last emotional beat). */
  reaction: "offended" | "annoyed" | "neutral" | "pleased" | "delighted" | null;
}

export interface NpcNpcRunner {
  /** Advance time; flips lines / completes as timed. */
  advance(dt: number): void;
  /** The line currently on screen, or null when idle/finished. */
  currentLine(): RunnerLine | null;
  /** Player came within range: hush with the authored line, end early. */
  hush(): void;
  /** A participant left / period ended: end immediately, no hush. */
  abandon(): void;
  snapshot(): RunnerSnapshot;
}

export interface NpcNpcRunnerOptions {
  /** Flattened, ordered lines for the chosen path. */
  lines: readonly RunnerEvent[];
  /** Seconds of base dwell; scaled by text length downstream. */
  baseDwellS: number;
  /** Called once when the run completes naturally or is abandoned. */
  onEnd: (snapshot: RunnerSnapshot) => void;
}

/** Dwell scales with text length: ~3.8 s base, +1 s per 30 chars, capped. */
export function dwellFor(text: string, baseDwellS: number): number {
  return Math.min(baseDwellS + Math.ceil(text.length / 30), baseDwellS + 4);
}

export function createNpcNpcRunner(options: NpcNpcRunnerOptions): NpcNpcRunner {
  const lines = [...options.lines];
  let index = 0;
  let elapsedOnLine = 0;
  let phase: RunnerPhase = "running";
  let lastReaction: RunnerSnapshot["reaction"] = null;

  function currentLine(): RunnerLine | null {
    return phase === "running" && index < lines.length ? lines[index]! : null;
  }

  function snapshot(): RunnerSnapshot {
    return {
      phase,
      lineIndex: index,
      elapsedOnLineS: elapsedOnLine,
      deliveredCount: index,
      totalCount: lines.length,
      reaction: lastReaction,
    };
  }

  return {
    advance(dt: number): void {
      if (phase !== "running") return;
      const line = lines[index];
      if (line === undefined) {
        phase = "complete";
        options.onEnd(snapshot());
        return;
      }
      elapsedOnLine += dt;
      const dwell = dwellFor(line.text, options.baseDwellS);
      if (elapsedOnLine >= dwell) {
        if (line.reaction) lastReaction = line.reaction;
        index += 1;
        elapsedOnLine = 0;
        if (index >= lines.length) {
          phase = "complete";
          options.onEnd(snapshot());
        }
      }
    },
    currentLine,
    hush(): void {
      // Hushing keeps the delivered lines' memory (the relationship
      // settles on what was actually said) but ends the run now.
      phase = "hushed";
      options.onEnd(snapshot());
    },
    abandon(): void {
      phase = "abandoned";
      options.onEnd(snapshot());
    },
    snapshot,
  };
}

/** The always-available authored hush line when none is authored. */
export const DEFAULT_HUSH = "…anyway.";

// ---------------------------------------------------------------------------
// Path flattening (C-78 REVISE: the whole path is pre-decided at pair
// formation — one deterministic walk of the authored `next` chain)
// ---------------------------------------------------------------------------

/**
 * Base dwell seconds handed to `dwellFor` by the controller. Matches
 * the legacy RESPONSE_DELAY_S cadence (chatter.ts), so a deep line
 * holds roughly as long as a starter bubble did before the reply.
 */
export const BASE_DWELL_S = 3.8;

function toRunnerEvent(line: NpcNpcLine, speaker: "A" | "B"): RunnerEvent {
  return {
    id: line.id,
    speaker,
    text: line.text,
    dwellS: dwellFor(line.text, BASE_DWELL_S),
    onPlayerApproach: line.onPlayerApproach,
    reaction: line.reaction,
  };
}

/**
 * Flattens ONE authored path into the ordered RunnerEvent[] the runner
 * plays: starter (A) + response (B) per exchange, following the chain
 * link (`response.next` if authored, else `starter.next`) until END, a
 * missing link, a revisited exchange (cycle guard) or maxLevels.
 *
 * When the path's final response carries an `endings` line for the
 * LIVE band, that closing line is appended as one extra event spoken
 * by the same cast slot (state-conditional endings, REVISE #6).
 *
 * `_rng` is accepted for the future Jev branch-picking wave (one Choice
 * per authored branch point) and deliberately unused in v1: every line
 * here has at most one `next`, so playback is fully deterministic.
 *
 * @throws when `startExchangeId` does not name an exchange of the
 *         script (a caller bug, never a runtime condition).
 */
export function flattenPath(
  script: NpcNpcConversation,
  startExchangeId: string,
  bandValue: RelationshipBand,
  _rng: () => number = Math.random,
  maxLevels = 5,
): RunnerEvent[] {
  const byStarter = new Map<string, NpcNpcExchange>(
    script.exchanges.map((exchange) => [exchange.starter.id, exchange]),
  );
  const first = byStarter.get(startExchangeId);
  if (first === undefined) {
    throw new Error(
      `flattenPath: unknown start exchange "${startExchangeId}" in script "${script.id}"`,
    );
  }
  const events: RunnerEvent[] = [];
  const visited = new Set<string>();
  let current: NpcNpcExchange = first;
  let lastResponse: NpcNpcLine = first.response;
  while (!visited.has(current.starter.id) && visited.size < maxLevels) {
    visited.add(current.starter.id);
    events.push(toRunnerEvent(current.starter, "A"));
    events.push(toRunnerEvent(current.response, "B"));
    lastResponse = current.response;
    const nextId = current.response.next ?? current.starter.next;
    if (nextId === undefined || nextId === "END") break;
    const next = byStarter.get(nextId);
    if (next === undefined) break;
    current = next;
  }
  const ending = lastResponse.endings?.[bandValue];
  if (ending !== undefined) {
    events.push({
      id: `${lastResponse.id}#ending:${bandValue}`,
      speaker: "B",
      text: ending,
      dwellS: dwellFor(ending, BASE_DWELL_S),
    });
  }
  return events;
}
