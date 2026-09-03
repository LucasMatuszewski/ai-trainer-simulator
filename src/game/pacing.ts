/**
 * C-67: the office day is ten minutes of ACTIVE simulation time.
 * One active real second represents one in-game minute. Blocking UI,
 * dialogue, cinematics, and non-office screens do not feed delta time
 * into this module, so the game clock never catches up after a pause.
 */

import type { TimeOfDay } from "../types";

export const PERIOD_ORDER = ["morning", "lunch", "afternoon", "evening"] as const satisfies readonly TimeOfDay[];

export interface PeriodDefinition {
  label: string;
  startMinutes: number;
  durationSeconds: number;
}

export const PERIOD_DEFINITIONS: Readonly<Record<TimeOfDay, PeriodDefinition>> = {
  morning: { label: "Morning", startMinutes: 9 * 60, durationSeconds: 180 },
  lunch: { label: "Lunch", startMinutes: 12 * 60, durationSeconds: 120 },
  afternoon: { label: "Afternoon", startMinutes: 14 * 60, durationSeconds: 180 },
  evening: { label: "Evening", startMinutes: 17 * 60, durationSeconds: 120 },
};

export const SECONDS_PER_DAY = PERIOD_ORDER.reduce(
  (total, period) => total + PERIOD_DEFINITIONS[period].durationSeconds,
  0,
);

export function periodDuration(period: TimeOfDay): number {
  return PERIOD_DEFINITIONS[period].durationSeconds;
}

export function periodsUntilDayEnd(period: TimeOfDay): number {
  return PERIOD_ORDER.length - PERIOD_ORDER.indexOf(period);
}

export interface PeriodAdvance {
  periodsAdvanced: number;
  elapsedInPeriod: number;
}

/** Advance an active-time cursor across unequal period durations. */
export function advancePeriodElapsed(
  period: TimeOfDay,
  elapsedInPeriod: number,
  activeDeltaSeconds: number,
): PeriodAdvance {
  let elapsed = Math.max(0, elapsedInPeriod) + Math.max(0, activeDeltaSeconds);
  let periodIndex = PERIOD_ORDER.indexOf(period);
  let periodsAdvanced = 0;

  while (elapsed >= periodDuration(PERIOD_ORDER[periodIndex]!)) {
    elapsed -= periodDuration(PERIOD_ORDER[periodIndex]!);
    periodIndex = (periodIndex + 1) % PERIOD_ORDER.length;
    periodsAdvanced += 1;
  }

  return { periodsAdvanced, elapsedInPeriod: elapsed };
}

/** Format the in-world time in stable quarter-hour steps. */
export function formatGameClock(period: TimeOfDay, elapsedInPeriod: number): string {
  const quarterHour = Math.floor(Math.max(0, elapsedInPeriod) / 15) * 15;
  const minutes = PERIOD_DEFINITIONS[period].startMinutes + quarterHour;
  const hours = Math.floor(minutes / 60) % 24;
  const minutePart = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutePart).padStart(2, "0")}`;
}

export interface SimulationClockBlockers {
  screen: string;
  dialogueOpen?: boolean;
  cinematicPlaying?: boolean;
  helpOpen?: boolean;
  endDayModalOpen?: boolean;
}

export function shouldAdvanceSimulationClock(blockers: SimulationClockBlockers): boolean {
  return blockers.screen === "office"
    && blockers.dialogueOpen !== true
    && blockers.cinematicPlaying !== true
    && blockers.helpOpen !== true
    && blockers.endDayModalOpen !== true;
}
