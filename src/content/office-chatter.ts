/**
 * General-office chatter as starter + response exchanges (PRD C-46).
 *
 * C-46 (Lucas, 2026-08-31): inter-NPC conversations are max TWO
 * turns - one NPC says the starter, the partner answers with one of
 * 2-3 candidate responses (picked randomly), and then the pair goes
 * on cooldown so a DIFFERENT pair talks next. This file is the
 * content for the "work hours" pool; the lunch-time pool is
 * hand-authored in `src/content/lunch-dialogues.ts` (LUNCH_CHATTER).
 *
 * Amended 2026-09-01 (Lucas): exchanges carry an optional `topic`
 * ("it" | "finance" | "janitor"; undefined = general). A speaker only
 * STARTS exchanges whose topic they are allowed (SPEAKER_TOPICS
 * below): non-tech roles do not tell IT jokes, finance exchanges are
 * for Grazyna (accountant) and Zosia (manager), janitor exchanges are
 * Janusz's. Responses are unrestricted - anyone can answer a joke.
 *
 * Constraints (enforced by tests/unit/lunch-dialogues.test.ts and
 * tests/unit/office-chatter.test.ts):
 * - every line <= 60 chars (bubble canvas: 32 chars x 2 lines)
 * - plain ASCII only
 * - no duplicates inside the pool, no overlap with the lunch pool
 * - every exchange has 1-3 responses
 */

export type ChatterTopic = "it" | "finance" | "janitor";

export interface ChatterExchange {
  /** The line the chattiness-weighted starter says. */
  starter: string;
  /** The partner answers with one of these (2-3 options). */
  responses: readonly string[];
  /** Undefined = general (everyone may start it). */
  topic?: ChatterTopic;
}

export const OFFICE_CHATTER: readonly ChatterExchange[] = [
  // --- IT-topic exchanges -----------------------------------------
  {
    starter: "Who broke the build? Again!",
    topic: "it",
    responses: [
      "I recycle bugs. It's called QA.",
      "The intern pushed to main. We're so proud.",
      "I asked AI to fix it. Now there are two bugs.",
    ],
  },
  {
    starter: "Can you review my PR?",
    topic: "it",
    responses: [
      "I have 47 tabs open and one fear.",
      "LGTM. I read the first line.",
      "After standup. Or a sprint. Whichever first.",
    ],
  },
  {
    starter: "Did the deploy go out?",
    topic: "it",
    responses: [
      "Define 'out'.",
      "It's Friday. Whatever happens is canon now.",
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
    topic: "it",
    responses: [
      "Famous last words, v2.",
      "The merge conflicts are load-bearing now.",
    ],
  },
  {
    starter: "Kubernetes is just astrology for sysadmins.",
    topic: "it",
    responses: [
      "And the cluster is 'in a mood' today.",
      "My horoscope said avoid prod. I ignored it.",
    ],
  },
  {
    starter: "I left a TODO in 2019. It's load-bearing now.",
    topic: "it",
    responses: [
      "We do not touch it. We gesture respectfully.",
      "Ancient code works best. Nobody knows why.",
    ],
  },
  {
    starter: "We don't need tests, our users test in prod for free.",
    topic: "it",
    responses: [
      "Bold strategy. The users are winning.",
      "HR wants a word about that sentence.",
    ],
  },
  {
    starter: "My rubber duck got upgraded to an LLM. It lies.",
    topic: "it",
    responses: [
      "Mine quoted my own sprint goals back. Brutal.",
      "At least it does not judge. Out loud.",
    ],
  },
  {
    starter: "Did you restart it?",
    topic: "it",
    responses: [
      "Twice. Now it fails at a higher speed.",
      "That is our only tool and it never works.",
    ],
  },
  // --- General exchanges (everyone) --------------------------------
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
    starter: "I'm not asleep, I'm doing deep mental architecture.",
    responses: [
      "With the eyes closed? Advanced technique.",
      "Save often. And maybe breathe too.",
    ],
  },
  {
    starter: "Did you see the game last night?",
    responses: [
      "I only watch esports. Same heartbreak.",
      "I fell asleep at halftime. Again.",
    ],
  },
  {
    starter: "This office is freezing again.",
    responses: [
      "I'm dressed for the tundra.",
      "Facilities says 18 degrees is 'energy efficient'.",
    ],
  },
  {
    starter: "Another meeting that could've been an email.",
    responses: [
      "It could've been a nap.",
      "I billed an hour to 'synergy'.",
    ],
  },
  {
    starter: "Someone brought cake. Kitchen. Now.",
    responses: [
      "I'm only here for the cake.",
      "HR said no candles. Fire code.",
    ],
  },
  {
    starter: "Marketing hit 10k followers today.",
    responses: [
      "Half are bots. The good half.",
      "Do the bots click the ads though?",
    ],
  },
  {
    starter: "The client asked for 'something pop' again.",
    responses: [
      "Tell them pop costs extra.",
      "Make it bigger. Make it POP.",
    ],
  },
  // --- Finance exchanges (Grazyna the accountant, Zosia the manager)
  {
    starter: "Quarter closes on Friday. No expenses.",
    topic: "finance",
    responses: [
      "I've been charging snacks to 'team building'.",
      "My budget spreadsheet has trust issues.",
    ],
  },
  {
    starter: "The audit found a receipt for a single bean.",
    topic: "finance",
    responses: [
      "That bean was a team lunch. Allegedly.",
      "Write it off as morale.",
    ],
  },
  {
    starter: "Invoices go out today.",
    topic: "finance",
    responses: [
      "May the payment terms be ever in our favor.",
      "Net 60 means they pay in 60 years, right?",
    ],
  },
  {
    starter: "The budget forecast reads like a horror story.",
    topic: "finance",
    responses: [
      "Excel said yes, reality said no.",
      "We are one coffee run from bankruptcy.",
    ],
  },
  // --- Janitor exchanges (Janusz only, C-46 amendment story) -------
  // Janusz was hired to clean, quietly automated his own job with a
  // self-built AI cleaning-bot fleet, and since nobody ever checked
  // his contract he has been shipping code as a "developer" for
  // years. He keeps the mop "for old times' sake".
  {
    starter: "I was hired to mop. Nobody asked about the commits.",
    topic: "janitor",
    responses: [
      "Wait, YOU rewrote the deploy script?",
      "The mop pays less. The code ships more.",
    ],
  },
  {
    starter: "My cleaning bots handle floor two now.",
    topic: "janitor",
    responses: [
      "The Roomba fleet has better uptime than prod.",
      "Did you name them? Please tell me you did.",
    ],
  },
  {
    starter: "My server rack lives in the janitor closet.",
    topic: "janitor",
    responses: [
      "Best uptime per square metre in the building.",
      "The mop is load-bearing. Don't ask.",
    ],
  },
];

/**
 * Which NON-general topics each NPC may start. Everyone may always
 * start general exchanges. Absent = general only. Per the C-46
 * amendment: techies + CEO tell IT jokes; Grazyna (accountant) and
 * Zosia (manager) tell finance ones; Janusz tells janitor ones.
 */
export const SPEAKER_TOPICS: Readonly<Record<string, readonly ChatterTopic[]>> = {
  bartek: ["it"],
  tomek: ["it"],
  marek: ["it"],
  maciek: ["it"],
  pawel: ["it"],
  dawid: ["it"],
  zosia: ["finance", "it"],
  grazyna: ["finance"],
  janusz: ["janitor"],
  // przemek (Sales), ania (Marketing), kasia (Recruiter),
  // klaudia (Influencer), burek (dog) -> general only.
};

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
  janusz: 0.6, // The Janitor (with the highest uptime in the building)
  marek: 0.4, // DevOps / 10x Engineer (lunch outsider)
  maciek: 0.3, // The CTO (lunch outsider)
  dawid: 0.3, // The CEO
};

export function chatterWeightFor(npcId: string): number {
  return TALKATIVE_WEIGHTS[npcId] ?? 1;
}
