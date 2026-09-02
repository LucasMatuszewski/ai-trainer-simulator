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
 * C-61 amendment (Lucas, 2026-09-02): dogs do not say human sentences
 * - classic MUD/Ultima conventions instead. A bark in asterisks, then
 * the bracketed translation as a subtitle, e.g. "*wuff*\n[means: feed
 * me]". Some lines are pure action ("*stares in dog*").
 *
 * Constraints (enforced by tests/unit/dog-dialogues.test.ts):
 * - every line <= 40 chars INCLUDING the newline (sound + subtitle)
 * - plain ASCII plus the newline separator
 * - no duplicates, no overlap with INTER_NPC_LINES or LUNCH_DIALOGUES_HUMAN
 */
export const BUREK_LINES: string[] = [
  "*wuff!*\n[means: feed me]",
  "*wuff wuff*\n[means: good morning]",
  "*aarf!*\n[means: throw the ball]",
  "*snorf*\n[means: is that pizza?]",
  "*whine*\n[means: the ball is RIGHT THERE]",
  "*bork!*\n[means: intruder! the intern]",
  "*sniff*\n[means: you had a sandwich]",
  "*tail thump*\n[means: petting accepted]",
  "*yawn*\n[means: this standup is long]",
  "*sits*\n[means: I know 'sit'. that is it]",
  "*side eye*\n[means: the treat jar moved]",
  "*stares in dog*",
  "*snorf snorf*",
  "*steals sandwich*",
  "*sniffs CEO*\n[means: mid]",
  "*chases cursor*",
];
