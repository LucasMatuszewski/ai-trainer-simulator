/**
 * WS6 — NPC needs model (PRD Flow F, AC-22; ADR-0009 D-53).
 *
 * NPCs act on their OWN needs, not on the player's stats: an NPC with a
 * low caffeine band heads for the coffee machine; Jev reads the named
 * BAND (the projector language), never the raw number.
 *
 * ## Runtime-only by design (ADR-0009 §4)
 *
 * Needs are deliberately NOT part of GameState and never reach the save
 * blob — a loaded day starts with a fresh crew: `resetNeedsDaily()` is
 * the whole persistence story. The decay rates are ADR constants:
 * caffeine −8/hour-equivalent, social −6/h. At the C-67 1x pace one
 * real second is one in-game minute, so a full 10 h active day decays
 * caffeine by 80 and social by 60 — morning `ok` slides into an
 * afternoon `low` and a late-day `craving`, which is exactly the
 * steering gradient the Jev layer consumes.
 *
 * Everything here is pure: no mutation of inputs, no clocks, no rng.
 * The caller owns the table (Record<NpcId, NpcNeeds>) and the tick.
 */

/** One NPC's runtime needs. Both values clamp to 0..100. */
export interface NpcNeeds {
  caffeine: number;
  social: number;
}

/** ADR-0009 D-53 constants: hourly-equivalent decay rates. */
export const CAFFEINE_DECAY_PER_HOUR = 8;
export const SOCIAL_DECAY_PER_HOUR = 6;

/** Projector band thresholds: < 25 "craving", < 60 "low", else "ok". */
export const CAFFEINE_CRAVING_BELOW = 25;
export const CAFFEINE_LOW_BELOW = 60;

/** The named bands the Jev projector emits ("caffeine: low"), never raw numbers. */
export type CaffeineBand = "craving" | "low" | "ok";

/** Fresh needs for one NPC: fully caffeinated and social at day start. */
export function initialNeeds(): NpcNeeds {
  return { caffeine: 100, social: 100 };
}

/**
 * The daily reset — the ONLY persistence semantics needs have
 * (runtime-only; never saved). Returns fresh full needs.
 */
export function resetNeedsDaily(): NpcNeeds {
  return initialNeeds();
}

function clampNeeds(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Decay both needs over `dtMinutes` in-game minutes (hour-equivalent
 * scaling). Pure: returns a new object, never mutates the input. A
 * negative dt cannot push values above 100 (clamped both ends).
 */
export function decayNeeds(needs: NpcNeeds, dtMinutes: number): NpcNeeds {
  const hours = dtMinutes / 60;
  return {
    caffeine: clampNeeds(needs.caffeine - CAFFEINE_DECAY_PER_HOUR * hours),
    social: clampNeeds(needs.social - SOCIAL_DECAY_PER_HOUR * hours),
  };
}

/**
 * The projector language for Jev: a named band for a caffeine level.
 * < CAFFEINE_CRAVING_BELOW → "craving"; < CAFFEINE_LOW_BELOW → "low";
 * else "ok".
 */
export function caffeineBand(caffeine: number): CaffeineBand {
  if (caffeine < CAFFEINE_CRAVING_BELOW) return "craving";
  if (caffeine < CAFFEINE_LOW_BELOW) return "low";
  return "ok";
}

/** Per-NPC needs table (keyed by NpcId; kept as string for pure reuse). */
export type NpcNeedsTable = Record<string, NpcNeeds>;

/** One independent, fully fresh NpcNeeds per given NPC id. */
export function createNeedsTable(npcIds: readonly string[]): NpcNeedsTable {
  const table: NpcNeedsTable = {};
  for (const id of npcIds) table[id] = initialNeeds();
  return table;
}
