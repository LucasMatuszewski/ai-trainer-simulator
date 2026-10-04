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
