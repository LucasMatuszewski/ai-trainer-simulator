/**
 * Lunch-time kitchen dialogues (PRD C-45, Phase 3.6).
 *
 * Said by human NPCs when both members of a bubble pair are in the
 * "kitchen" state. Authored by a 4-way model contest (2026-08-31):
 * grok-4.5, agy / sonnet 4.6, a sonnet subagent, and GLM-5.2 via the
 * opencode CLI (which also contributed the hunger bonus section) -
 * merged quality-first by the orchestrator. Counts follow the relaxed
 * policy (Lucas, 2026-08-31: more than 50 good lines may stay).
 *
 * Constraints (enforced by tests/unit/lunch-dialogues.test.ts):
 * - every line <= 60 chars (bubble canvas: 32 chars x 2 lines)
 * - plain ASCII only
 * - no duplicates, no overlap with INTER_NPC_LINES or BUREK_LINES
 */
export const LUNCH_DIALOGUES_HUMAN: string[] = [
  // grok-4.5
  "Works on my machine. That's my lunch too.",
  "I'm keto until the pizza arrives.",
  "Burek just ate my salad. He is the intern now.",
  "Dawid's yogurt is labeled. Do not test fate.",
  "Oat milk again. We pivoted from dairy.",
  "We're a family. Families steal Tupperware.",
  "Is pineapple on pizza a breaking change?",
  "If you smelled that, file a ticket.",
  "Don't open the fridge. Production is in there.",
  "I'm not fat. I'm horizontally scaled.",
  "Don't microwave fish. That's a P0.",
  "We're carbon-neutral if you ignore the cloud.",
  "The pizza arrived. Suddenly we have quorum.",
  "Burek is the only one hitting his OKRs.",
  "Where do vegans get protein? The backlog.",
  "The fridge password is still admin.",
  "I asked ChatGPT if this is edible. It said yes.",
  "Grazyna billed lunch as a meeting. Fair.",
  "We estimated lunch as 15 minutes. Cute.",
  "One beer. Then a hotfix. Then three.",
  // agy / sonnet 4.6
  "I brought a salad so I can justify the beer later.",
  "Decaf is just brown disappointment water.",
  "Fair trade beans, sweatshop code.",
  "My doctor said less caffeine. I fired my doctor.",
  "It works on my machine. Ship my machine to prod.",
  "Burek has better equity options than junior devs.",
  "I didn't fart, the floorboard is just uncompressed.",
  "Free pizza: the universal cure for unpaid overtime.",
  "Was that the server cooling fan or your stomach?",
  // sonnet subagent (Claude session)
  "Series A means we finally afford real napkins.",
  "We're pre-revenue, post-hope.",
  "The pivot is complete. We're a cheese app now.",
  "Have you tried turning the CEO off and on?",
  "The CEO has two monitors and zero mercy.",
  "The dog got promoted. Lead Sniffer, effective now.",
  "Burek reviews all PRs. Nose first, no comments.",
  "My lunch was stolen. HR calls that 'culture'.",
  "The third coffee is purely emotional support.",
  "Dinner is cereal standing over the sink.",
  "Cold pizza is a lifestyle, not a failure.",
  "My diet starts next sprint. It always does.",
  "Vege Monday ended at 12:15. With kebab.",
  "Greta would not approve of this fridge.",
  "He who smelt it, deployed it.",
  "This beer is 0.0%. Like my motivation.",
  "I speedran this kitchen. World record: 45s.",
  // GLM-5.2 via opencode
  "The microwave has better uptime than prod.",
  "Someone put a Jira ticket on my sandwich.",
  "The CEO microwaves fish. Every Friday.",
  "I'm vegetarian except on deploy days.",
  "That fart shipped to production.",
  "I found a 2019 yogurt in the fridge. Legacy.",
  "I rate kitchens in GitHub stars.",
  "Lunch is my only meeting without an agenda.",
  "My smartwatch says I'm dead. Anyway, pizza?",
  "I identify as a server. Feed me.",
  "I muted my stomach. It keeps pinging.",
  "I asked the AI for a diet plan. It laughed.",
  "My lunch has a changelog. v2: no pickles.",
  "Kombucha is spicy vinegar with funding.",
  "My diet: free snacks and regret.",
  "The fridge is agile. Nobody knows what's in it.",
  "I'd code for food. Actually, I do.",
  "One snack away from read-only mode.",
  "Copilot wrote my resignation letter in Rust.",
  // GLM hunger bonus (US-native IT/startup hunger humor)
  "I'm so hungry my stomach filed a ticket.",
  "My stomach just paged me. It's a P1.",
  "I'd merge anything for a burrito now.",
  "Skip lunch? I don't have the bandwidth.",
  "Hunger level: production incident.",
];
