# Task: write morning-greeting content for "AI Trainer Simulator"

You are writing ONE TypeScript content file for a retro pixel-art office comedy game
(an IT-training company called Stack Underflow; the player is the new IT trainer).
Dry, deadpan IT-office humor. English. Short. Think the voice of "The Office" + dev Twitter.

Write the file to: `.agent-briefs/drafts/morning-greetings-glm.ts` (create the dir if needed).
Do NOT touch any other file. Do NOT commit.

## The roster (id - name - role)
- bartek - Bartek - Senior Consultant (IT)
- marek - Marek - DevOps / 10x Engineer (IT)
- tomek - Tomek - Junior Developer (IT)
- maciek - Maciek - The CTO
- dawid - Dawid - The CEO
- zosia - Zosia - The Manager
- ania - Ania - Marketing & Synergy
- klaudia - Klaudia - The LinkedIn Influencer
- kasia - Kasia - The Recruiter
- grazyna - Grazyna - The Accountant
- przemek - Przemek - Sales
- janusz - Janusz - The Janitor
- pawel - Pawel - The Intern
- burek - Burek - The Office Dog (barks, does not talk)

## What the lines are
One-liners an NPC says in a speech bubble when they walk into the office in the morning
(a greeting, flavored by their specialization: IT people greet differently than the CEO,
CTO, marketing, accounting, sales, HR, the janitor, the intern). 3-4 alternative lines
per NPC so different mornings vary. The CEO/CTO lines should sound like CEO/CTO lines
(vision, synergy, cost-cutting). Accounting: invoices, expenses, Excel. Marketing: engagement,
brand, LinkedIn. Recruiter: "quick call", candidate pipeline. Janitor: printers, cables,
who left this mess. Intern: overeager. Sales: pipeline, demos, quotas.

## Hard constraints
- Each line <= 72 characters (it renders in a 2-line speech bubble).
- Plain ASCII only (no em dashes, no smart quotes).
- No TypeScript imports; only type-free plain TS + one exported type + one exported function.
- The file must export EXACTLY this shape:

```ts
export type GreetingCategory = "it" | "management" | "ceo" | "cto" | "marketing" | "hr" | "accounting" | "sales" | "facilities" | "intern" | "dog" | "office";

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
  burek: "dog",
};

export const GREETINGS_BY_NPC: Record<string, ReadonlyArray<string>> = {
  // 3-4 lines per npc id above
};

export const GREETINGS_BY_CATEGORY: Record<GreetingCategory, ReadonlyArray<string>> = {
  // 3+ lines per category; "office" is the generic fallback pool
};

export function pickMorningGreeting(npcId: string, rng: () => number): string {
  // GREETINGS_BY_NPC[npcId] -> else GREETINGS_BY_CATEGORY[category] -> else "office".
  // Never returns an empty string. Deterministic given the same rng.
}
```

## Definition of done
- The file parses as valid TypeScript in your head: no missing keys, every category present.
- Every line <= 72 chars - count them.
- Every NPC from the roster has 3-4 lines.
- Funny beats generic. Specific beats abstract. "The printer is already broken" beats "Good morning team".
