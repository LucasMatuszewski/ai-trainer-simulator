/**
 * Lunch-time dialogues (PRD C-45, Phase 3.6; C-46 amendment).
 *
 * C-46 (Lucas, 2026-08-31): the pool is TIME-gated, not
 * location-gated - during the lunch window all human pairs use these
 * lines wherever they stand. The pool is served as starter + response
 * exchanges (LUNCH_CHATTER) so the conversation system can run its
 * max-2-turns format at lunch too.
 *
 * Amended 2026-09-01 (Lucas: "did you just mixed randomly the
 * responses and starters from lunch pool?"): LUNCH_CHATTER is now
 * HAND-AUTHORED call-and-response - a starter and its responses are
 * written to make sense together. The flat LUNCH_DIALOGUES_HUMAN is
 * derived as the union of exchange lines (for the length / ASCII /
 * pool-separation tests and any flat consumer).
 *
 * Original lines authored by a 4-way model contest (2026-08-31):
 * grok-4.5, agy / sonnet 4.6, a sonnet subagent, and GLM-5.2 via the
 * opencode CLI (which also contributed the hunger bonus section) -
 * merged quality-first by the orchestrator.
 *
 * Constraints (enforced by tests/unit/lunch-dialogues.test.ts):
 * - every line <= 60 chars (bubble canvas: 32 chars x 2 lines)
 * - plain ASCII only
 * - no duplicates, no overlap with INTER_NPC_LINES or BUREK_LINES
 */
import type { ChatterExchange } from "./office-chatter";

/**
 * Hand-authored lunch call-and-response. Starters are food/kitchen
 * openers any human can say; responses stay in the same scene.
 */
export const LUNCH_CHATTER: readonly ChatterExchange[] = [
  {
    starter: "Who ate my lunch? Be honest.",
    responses: [
      "Burek just ate my salad. He is the intern now.",
      "The fridge password is still admin.",
      "My lunch was stolen. HR calls that 'culture'.",
    ],
  },
  {
    starter: "The microwave smells like a war crime.",
    responses: [
      "Don't microwave fish. That's a P0.",
      "He who smelt it, deployed it.",
      "The CEO microwaves fish. Every Friday.",
    ],
  },
  {
    starter: "Pizza's here. Meeting is cancelled, right?",
    responses: [
      "The pizza arrived. Suddenly we have quorum.",
      "Free pizza: the universal cure for unpaid overtime.",
      "Is pineapple on pizza a breaking change?",
    ],
  },
  {
    starter: "I'm on a diet.",
    responses: [
      "I'm keto until the pizza arrives.",
      "My diet starts next sprint. It always does.",
      "Vege Monday ended at 12:15. With kebab.",
    ],
  },
  {
    starter: "This yogurt has a 2019 date on it.",
    responses: [
      "I found a 2019 yogurt in the fridge. Legacy.",
      "Don't open the fridge. Production is in there.",
      "Greta would not approve of this fridge.",
    ],
  },
  {
    starter: "Coffee machine's decaf only today.",
    responses: [
      "Decaf is just brown disappointment water.",
      "The third coffee is purely emotional support.",
      "My doctor said less caffeine. I fired my doctor.",
    ],
  },
  {
    starter: "How is the sprint going?",
    responses: [
      "Blocked. By this sandwich.",
      "On track. Unlike my diet.",
      "Don't ask. The burrito has more velocity.",
    ],
  },
  {
    starter: "Beer with lunch? It's Friday.",
    responses: [
      "One beer. Then a hotfix. Then three.",
      "This beer is 0.0%. Like my motivation.",
      "I brought a salad so I can justify the beer later.",
    ],
  },
  {
    starter: "Burek is staring at my sandwich again.",
    responses: [
      "Burek has better equity options than junior devs.",
      "Burek reviews all PRs. Nose first, no comments.",
      "Burek is the only one hitting his OKRs.",
    ],
  },
  {
    starter: "Working through lunch again?",
    responses: [
      "Dinner is cereal standing over the sink.",
      "Lunch is my only meeting without an agenda.",
      "I rate kitchens in GitHub stars.",
    ],
  },
  {
    starter: "The fridge is making a weird noise.",
    responses: [
      "The fridge is agile. Nobody knows what's in it.",
      "Someone put a Jira ticket on my sandwich.",
      "We're a family. Families steal Tupperware.",
    ],
  },
  {
    starter: "New cafe opened next door.",
    responses: [
      "My smartwatch says I'm dead. Anyway, pizza?",
      "I'd merge anything for a burrito now.",
      "Cold pizza is a lifestyle, not a failure.",
    ],
  },
  {
    starter: "Dawid labeled his yogurt again.",
    responses: [
      "Dawid's yogurt is labeled. Do not test fate.",
      "The CEO has two monitors and zero mercy.",
      "Have you tried turning the CEO off and on?",
    ],
  },
  {
    starter: "I'm so hungry I could merge to main.",
    responses: [
      "I'm so hungry my stomach filed a ticket.",
      "My stomach just paged me. It's a P1.",
      "That fart shipped to production.",
    ],
  },
  {
    starter: "Team lunch on the company card?",
    responses: [
      "Grazyna billed lunch as a meeting. Fair.",
      "Series A means we finally afford real napkins.",
      "We're carbon-neutral if you ignore the cloud.",
    ],
  },
  {
    starter: "Leftovers in the sink again.",
    responses: [
      "I didn't fart, the floorboard is just uncompressed.",
      "Was that the server cooling fan or your stomach?",
      "One snack away from read-only mode.",
    ],
  },
  {
    starter: "Our startup pivot is going great.",
    responses: [
      "The pivot is complete. We're a cheese app now.",
      "We're pre-revenue, post-hope.",
      "Kombucha is spicy vinegar with funding.",
    ],
  },
  {
    starter: "The vending machine ate my coin.",
    responses: [
      "I asked ChatGPT if this is edible. It said yes.",
      "I identify as a server. Feed me.",
      "I'd code for food. Actually, I do.",
    ],
  },
  {
    starter: "Standup moved to 12:30. Who approved that?",
    responses: [
      "I speedran this kitchen. World record: 45s.",
      "It works on my machine. Ship my machine to prod.",
      "Works on my machine. That's my lunch too.",
    ],
  },
  {
    starter: "Remote lunch over Zoom again?",
    responses: [
      "I muted my stomach. It keeps pinging.",
      "My lunch has a changelog. v2: no pickles.",
      "Copilot wrote my resignation letter in Rust.",
    ],
  },
  {
    starter: "Fair trade beans, sweatshop code.",
    responses: [
      "At least the coffee has ethics.",
      "My diet: free snacks and regret.",
    ],
  },
  {
    starter: "I asked the AI for a diet plan. It laughed.",
    responses: [
      "Rude. Accurate, but rude.",
      "Oat milk again. We pivoted from dairy.",
    ],
  },
  {
    starter: "Where do vegans get protein?",
    responses: [
      "The backlog. Same as the rest of us.",
      "If you smelled that, file a ticket.",
    ],
  },
];

/**
 * The flat pool, derived from the authored exchanges so every line is
 * used exactly once. Kept for the content tests and any flat consumer.
 */
export const LUNCH_DIALOGUES_HUMAN: string[] = LUNCH_CHATTER.flatMap((exchange) => [
  exchange.starter,
  ...exchange.responses,
]);
