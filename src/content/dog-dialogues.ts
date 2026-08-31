/**
 * Burek's dialogue pool (PRD C-45 amendment h, Phase 3.6).
 *
 * NOT lunch-specific (Lucas, 2026-08-31: "Dog dialogues should not be
 * LUNCH specific, always the same, lunch or outside the lunch, Burek
 * should say same dialogues at random, rarely, but many times a day"):
 * the same pool fires from the ambient bark trigger anywhere in the
 * office, in any period, and whenever Burek is the speaker of an
 * ordinary bubble pair.
 *
 * Picked from the 4-way lunch-dialogues contest (2026-08-31), merged
 * quality-first. Constraints (enforced by tests/unit/dog-dialogues.test.ts):
 * - every line <= 25 chars (dog sounds, not speech)
 * - plain ASCII only
 * - no duplicates, no overlap with INTER_NPC_LINES or LUNCH_DIALOGUES_HUMAN
 */
export const BUREK_LINES: string[] = [
  "*stares in dog*",
  "*smells pizza, glitches*",
  "sniffed the CEO. mid.",
  "pizza falls. i am ready.",
  "*snorf snorf*",
  "aaaaarf?",
  "*steals sandwich*",
  "woof means feed me",
];
