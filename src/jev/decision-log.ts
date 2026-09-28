/**
 * WS1 decision log (ADR-0009 section 3.11, D-55).
 *
 * Identifier-only observability for the decision layer: a ring buffer
 * of the last 50 decision attempts plus reason-coded counters
 * (requested / applied / legacy / rejected / stale / skipped).
 *
 * Hygiene rules enforced by construction (D-59, key scenario 10):
 * entries carry stable fictional ids, surface names and numbers only —
 * never authored line text, never player text, never credentials.
 *
 * Counter semantics (pinned by tests/unit/jev/decision-log.test.ts):
 * `logDecision` counts one entry in `requested` and one entry in the
 * counter named by `outcome`, so `requested` always equals the sum of
 * the outcome counters. Batch-level request accounting (one request
 * covering several subjects) is a WS4 scheduler concern.
 */

import type { DecisionSurface } from "./contracts";

/** How a decision attempt ended. Drives the outcome counters. */
export type DecisionOutcome = "applied" | "legacy" | "rejected" | "stale" | "skipped";

export interface DecisionLogEntry {
  /** Wall-clock ms (caller's clock; injectable for tests). */
  time?: number;
  /** Stable fictional subject id (e.g. "bartek"), never player text. */
  subject: string;
  surface: DecisionSurface;
  outcome: DecisionOutcome;
  /** Candidate id that was applied, when one was. */
  chosenId?: string;
  /** Answer confidence in [0, 1] when the primitive carries one. */
  confidence?: number;
  latencyMs: number;
  /** True when the authored default (or nothing) was used instead. */
  fallback: boolean;
  /** Machine-readable reason code, e.g. "timeout", "low-confidence". */
  fallbackReason?: string;
  /** Relationship delta applied via the bucket table, when any. */
  relDelta?: number;
  /** Mood delta applied via the bucket table, when any. */
  moodDelta?: number;
}

export interface DecisionCounters {
  requested: number;
  applied: number;
  legacy: number;
  rejected: number;
  stale: number;
  skipped: number;
}

const MAX_ENTRIES = 50;

const entries: DecisionLogEntry[] = [];
const countersState: DecisionCounters = {
  requested: 0,
  applied: 0,
  legacy: 0,
  rejected: 0,
  stale: 0,
  skipped: 0,
};

export function logDecision(entry: DecisionLogEntry): void {
  entries.push(entry);
  if (entries.length > MAX_ENTRIES) entries.shift();
  countersState.requested += 1;
  countersState[entry.outcome] += 1;
}

/** Buffered entries, oldest to newest, capped at the last 50. */
export function recent(): readonly DecisionLogEntry[] {
  return entries;
}

export function counters(): Readonly<DecisionCounters> {
  return { ...countersState };
}

export function reset(): void {
  entries.length = 0;
  countersState.requested = 0;
  countersState.applied = 0;
  countersState.legacy = 0;
  countersState.rejected = 0;
  countersState.stale = 0;
  countersState.skipped = 0;
}
