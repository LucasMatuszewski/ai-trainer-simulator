/**
 * C-56: every NPC that shows up in the morning fires ONE short
 * greeting bubble. Door-entering NPCs greet on `releaseArrival`; the
 * already-in crowd drops staggered hellos during the first 2-12 s of
 * the day so the office wakes up talking. Burek is always already-in
 * (`mode: "already-in"` in npc-schedule.ts) and greets in dog
 * (C-61 amendment: bark + bracketed translation).
 *
 * Shape: GREETING is a short hello (hi/hello/morning/hey/yo/...) with
 * at most ONE short category-flavor tag. Lines are <= 30 chars so a
 * two-line bubble wraps the whole thing without truncation.
 */
export type GreetingCategory =
  | "it"
  | "management"
  | "ceo"
  | "cto"
  | "marketing"
  | "hr"
  | "accounting"
  | "sales"
  | "facilities"
  | "intern"
  | "office";

export const NPC_GREETING_CATEGORY: Record<string, GreetingCategory> = {
  bartek: "it",
  marek: "it",
  tomek: "it",
  maciek: "cto",
  dawid: "ceo",
  zosia: "management",
  ania: "marketing",
  klaudia: "marketing",
  kasia: "hr",
  grazyna: "accounting",
  przemek: "sales",
  janusz: "facilities",
  pawel: "intern",
  // burek: dogs don't talk and don't get a line
};

export const GREETINGS_BY_NPC: Record<string, ReadonlyArray<string>> = {
  // C-61 amendment (Lucas): Burek greets too - MUD conventions, a
  // bark plus the bracketed translation. Previously the unmapped id
  // fell through to the generic "office" pool and the dog said
  // human "Morning." lines.
  burek: [
    "*wuff wuff!*\n[means: good morning]",
    "*aarf!*\n[means: hello. feed me]",
    "*yawn*\n[means: morning already?]",
    "*tail thump*\n[means: nice to sniff you]",
  ],
  // IT (Bartek, Marek, Tomek) - one short IT tag
  bartek: [
    "Morning. Standup in 5.",
    "Hi. Build is red.",
    "Hello. Prod is on fire.",
    "Morning. Slack is down.",
  ],
  marek: [
    "Hi. I am tired.",
    "Hello. Yaml wins again.",
    "Morning. Backup worked.",
    "Yo. Curl is my debugger.",
  ],
  tomek: [
    "Hello. Lgtm.",
    "Hi. Works on my machine.",
    "Morning. Stack overflow.",
    "Yo. First push today.",
  ],
  // CTO (Maciek) - short CTO tag
  maciek: [
    "Morning. Synergy time.",
    "Hi. Where is the deck?",
    "Hello. Cost cutting time.",
    "Yo. Cloud native things.",
  ],
  // CEO (Dawid) - short CEO tag
  dawid: [
    "Hi. Vision check in.",
    "Morning. Quarterly review.",
    "Hello. Profits up.",
    "Yo. Win the quarter.",
  ],
  // Management (Zosia) - short management tag
  zosia: [
    "Hi. Status meeting at 9.",
    "Morning. Calendar full.",
    "Hello. Bring me data.",
    "Yo. Roadmap to discuss.",
  ],
  // Marketing (Ania, Klaudia) - short marketing tag
  ania: [
    "Hi. Newsletter draft ready.",
    "Morning. Engagement is up.",
    "Hello. Campaign goes live.",
    "Yo. Synergy unlocked.",
  ],
  klaudia: [
    "Hi. New post went viral.",
    "Morning. LinkedIn loves it.",
    "Hello. DM me opportunities.",
    "Yo. Personal brand updated.",
  ],
  // HR (Kasia) - short HR tag
  kasia: [
    "Hi. 300 applicants today.",
    "Morning. Quick chat at 10?",
    "Hello. Pipeline looks good.",
    "Yo. Candidate wants 200k.",
  ],
  // Accounting (Grazyna) - short accounting tag
  grazyna: [
    "Hi. Invoices on your desk.",
    "Morning. Budget reconciled.",
    "Hello. Excel is acting up.",
    "Yo. Audit starts tomorrow.",
  ],
  // Sales (Przemek) - short sales tag
  przemek: [
    "Hi. Demo at 11.",
    "Morning. Closed another one.",
    "Hello. Pipeline is fat.",
    "Yo. Quota is dead.",
  ],
  // Facilities (Janusz) - short facilities tag
  janusz: [
    "Hi. Your coffee is waiting.",
    "Morning. I mopped.",
    "Hello. Printer is sad.",
    "Yo. The cables are in knots.",
  ],
  // Intern (Pawel) - short intern tag
  pawel: [
    "Hi. Day one. Kinda.",
    "Morning. I brought cookies.",
    "Hello. What is Jira?",
    "Yo. I will work for free.",
  ],
};

export const GREETINGS_BY_CATEGORY: Record<GreetingCategory, ReadonlyArray<string>> = {
  it: [
    "Hi. Build is green.",
    "Morning. Ship it.",
    "Hello. Wifi sucks.",
    "Yo. Force push time.",
  ],
  management: [
    "Hi. Schedule sync?",
    "Morning. Priorities?",
    "Hello. Need signoff.",
    "Yo. Time to align.",
  ],
  ceo: [
    "Hi. The vision.",
    "Morning. Big year.",
    "Hello. Win.",
    "Yo. Think big.",
  ],
  cto: [
    "Hi. Tech debt.",
    "Morning. Roadmap.",
    "Hello. Velocity.",
    "Yo. Scale it.",
  ],
  marketing: [
    "Hi. Brand synergy.",
    "Morning. Engagement up.",
    "Hello. Leads.",
    "Yo. Go viral.",
  ],
  hr: [
    "Hi. New candidate.",
    "Morning. Culture fit.",
    "Hello. Hiring spree.",
    "Yo. Quick chat?",
  ],
  accounting: [
    "Hi. Books balanced.",
    "Morning. Expenses due.",
    "Hello. Numbers.",
    "Yo. Receipts.",
  ],
  sales: [
    "Hi. Quota met.",
    "Morning. Demos.",
    "Hello. Cold call time.",
    "Yo. Pipeline.",
  ],
  facilities: [
    "Hi. I mopped.",
    "Morning. Coffee ready.",
    "Hello. Restroom fixed.",
    "Yo. Cables again.",
  ],
  intern: [
    "Hi. First day.",
    "Morning. What is Jira?",
    "Hello. I will learn.",
    "Yo. Coffee?",
  ],
  // generic fallback for any unmapped id
  office: [
    "Hi.",
    "Morning.",
    "Hello.",
    "Hey.",
  ],
};

const FALLBACK: ReadonlyArray<string> = ["Hi."];

function pickFromPool<T>(pool: ReadonlyArray<T>, rng: () => number): T {
  // Length is guarded by every caller; the ! is for the strict index
  // type, not an unverified assumption.
  return pool[Math.floor(rng() * pool.length) % pool.length]!;
}

export function pickMorningGreeting(npcId: string, rng: () => number): string {
  const npcPool = GREETINGS_BY_NPC[npcId];
  if (npcPool !== undefined && npcPool.length > 0) return pickFromPool(npcPool, rng);
  const category = NPC_GREETING_CATEGORY[npcId];
  const categoryPool = category !== undefined ? GREETINGS_BY_CATEGORY[category] : undefined;
  const pool = categoryPool !== undefined && categoryPool.length > 0 ? categoryPool : GREETINGS_BY_CATEGORY.office;
  return pool.length > 0 ? pickFromPool(pool, rng) : FALLBACK[0]!;
}
