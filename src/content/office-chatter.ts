/**
 * General-office chatter as starter + response exchanges (PRD C-46).
 *
 * C-46 (Lucas, 2026-08-31): inter-NPC conversations are now max TWO
 * turns - one NPC says the starter, the partner answers with one of
 * 2-3 candidate responses (picked randomly), and then the pair goes
 * on cooldown so a DIFFERENT pair talks next. This file is the
 * content for the "work hours" pool; the lunch-time pool is derived
 * in `src/content/lunch-dialogues.ts` (LUNCH_CHATTER).
 *
 * The 30 lines of the 2026-08-31 contest INTER_NPC_LINES pool are all
 * preserved here - reused as starters or as responses - plus new
 * response lines written for the exchange format. Constraints
 * (enforced by tests/unit/lunch-dialogues.test.ts and
 * tests/unit/office-chatter.test.ts):
 * - every line <= 60 chars (bubble canvas: 32 chars x 2 lines)
 * - plain ASCII only
 * - no duplicates inside the pool, no overlap with the lunch pool
 * - every exchange has 1-3 responses
 */

export interface ChatterExchange {
  /** The line the chattiness-weighted starter says. */
  starter: string;
  /** The partner answers with one of these (2-3 for randomness). */
  responses: readonly string[];
}

export const OFFICE_CHATTER: readonly ChatterExchange[] = [
  {
    starter: "Who broke the build? Again!",
    responses: [
      "I recycle bugs. It's called QA.",
      "The intern pushed to main. We're so proud.",
      "I asked AI to fix it. Now there are two bugs.",
    ],
  },
  {
    starter: "Can you review my PR?",
    responses: [
      "I have 47 tabs open and one fear.",
      "LGTM. I read the first line.",
      "After standup. Or a sprint. Whichever first.",
    ],
  },
  {
    starter: "The printer is jammed again.",
    responses: [
      "Just KISS, ok?",
      "I'm not touching it. It blinked at me last time.",
    ],
  },
  {
    starter: "Standup in 5, be ready.",
    responses: [
      "At 5?! Am or Pm?",
      "The standup ran 40 minutes. Nobody stood.",
      "I'll say 'no blockers'. I always say it.",
    ],
  },
  {
    starter: "Did the deploy go out?",
    responses: [
      "Define 'out'.",
      "It's Friday. Whatever happens is canon now.",
    ],
  },
  {
    starter: "Coffee? I just had 4.",
    responses: [
      "That is not a drink, that is a lifestyle.",
      "My blood type is espresso.",
    ],
  },
  {
    starter: "The wifi is being weird today.",
    responses: [
      "Have you tried sacrificing a router?",
      "It works. Nobody knows why. Touch nothing.",
    ],
  },
  {
    starter: "Chat Bot is down again.",
    responses: [
      "It learned from us. We are sorry.",
      "Good. It was starting to have opinions.",
      "!!! $#%#$@$% !!!",
    ],
  },
  {
    starter: "I'll merge it after lunch.",
    responses: [
      "Famous last words, v2.",
      "The merge conflicts are load-bearing now.",
    ],
  },
  {
    starter: "Is he still staring at me?",
    responses: [
      "Shh... They are watching...",
      "Act natural. Open a spreadsheet.",
    ],
  },
  {
    starter: "What Freud would say about that bat?",
    responses: [
      "I guess it's some bat-complex",
      "He bills by the hour. Just like us.",
    ],
  },
  {
    starter: "Have you seen my pierogi?",
    responses: [
      "Check the fridge. Then check Burek.",
      "The fridge is a lossy storage system.",
    ],
  },
  {
    starter: "Kubernetes is just astrology for sysadmins.",
    responses: [
      "And the cluster is 'in a mood' today.",
      "My horoscope said avoid prod. I ignored it.",
    ],
  },
  {
    starter: "I left a TODO in 2019. It's load-bearing now.",
    responses: [
      "We do not touch it. We gesture respectfully.",
      "Ancient code works best. Nobody knows why.",
    ],
  },
  {
    starter: "We don't need tests, our users test in prod for free.",
    responses: [
      "Bold strategy. The users are winning.",
      "HR wants a word about that sentence.",
    ],
  },
  {
    starter: "My rubber duck got upgraded to an LLM. It lies.",
    responses: [
      "Mine quoted my own sprint goals back. Brutal.",
      "At least it does not judge. Out loud.",
    ],
  },
  {
    starter: "I'm not asleep, I'm doing deep mental architecture.",
    responses: [
      "With the eyes closed? Advanced technique.",
      "Save often. And maybe breathe too.",
    ],
  },
  {
    starter: "Did you restart it?",
    responses: [
      "Twice. Now it fails at a higher speed.",
      "That is our only tool and it never works.",
    ],
  },
];

/** Flat union of every line in OFFICE_CHATTER. Kept as a named export
 *  for the pool-separation tests (lunch / dog pools must not overlap
 *  it) and for any consumer that just wants all work-chatter lines. */
export const INTER_NPC_LINES: string[] = OFFICE_CHATTER.flatMap((exchange) => [
  exchange.starter,
  ...exchange.responses,
]);

/**
 * Chattiness weights (C-46, Lucas: "lower the chance of talking for
 * outsiders (CTO and DevOps), maybe make it higher for typical
 * talkative people (marketing, sales?)"). The weight only decides who
 * STARTS an exchange inside an already-chosen close pair; it does not
 * gate whether a pair talks. Unlisted NPCs weigh 1.
 */
export const TALKATIVE_WEIGHTS: Readonly<Record<string, number>> = {
  // Talkative: sales, marketing, recruiting, LinkedIn, management.
  przemek: 1.8, // Sales
  ania: 1.8, // Marketing & Synergy
  klaudia: 1.6, // The LinkedIn Influencer
  kasia: 1.5, // The Recruiter
  zosia: 1.2, // The Manager
  pawel: 1.2, // The Intern
  // Baseline.
  bartek: 1.0, // Senior Consultant
  tomek: 1.0, // Junior Developer
  burek: 1.0, // Office Dog
  // Quiet.
  grazyna: 0.7, // The Accountant
  janusz: 0.6, // The Janitor
  marek: 0.4, // DevOps / 10x Engineer (lunch outsider)
  maciek: 0.3, // The CTO (lunch outsider)
  dawid: 0.3, // The CEO
};

export function chatterWeightFor(npcId: string): number {
  return TALKATIVE_WEIGHTS[npcId] ?? 1;
}
