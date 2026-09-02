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
 * - classic MUD/Ultima conventions instead, in THREE standardized
 * marker forms (mixed freely, one or two per bubble):
 *   *sound*  - what you HEAR ("*woof!*")
 *   [action] - what you SEE ("[pizza falls]")
 *   (thought)- what the dog THINKS ("(i am ready!)")
 * e.g. "*woof!*\n(feed me)" or "[pizza falls]\n(i am ready!)".
 * Funny one-word doge lines survive as thoughts in parentheses.
 *
 * Constraints (enforced by tests/unit/dog-dialogues.test.ts):
 * - every line <= 40 chars INCLUDING the newline
 * - every row wrapped in exactly one of the three markers
 * - plain ASCII plus the newline separator
 * - no duplicates, no overlap with INTER_NPC_LINES or LUNCH_DIALOGUES_HUMAN
 */
export const BUREK_LINES: string[] = [
  "*woof!*\n(feed me)",
  "*woof woof!*\n(good morning)",
  "*aarf!*\n(throw the ball)",
  "*snorf*\n(is that pizza?)",
  "[sniff sniff]\n(you had a sandwich)",
  "[tail thump]\n(petting accepted)",
  "*yawn*\n(this standup is long)",
  "[sits]\n(I know 'sit'. that is it)",
  "[pizza falls]\n(i am ready!)",
  "[steals sandwich]\n(no witnesses)",
  "[sniffs CEO]\n(mid)",
  "[zoomies activated]\n*aarf aarf*",
  "[guards the kitchen]\n(grrr means no)",
  "[chases own tail]\n(quality assurance)",
  "*side eye*\n(the treat jar moved)",
  "*zzz*\n(deploying? amateur hour)",
  "[stares in dog]",
  "*snorf snorf*",
];
