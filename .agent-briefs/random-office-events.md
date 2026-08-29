# Brief: write the random office events pool

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`. The player is an IT trainer in a Polish-style IT office. The user explicitly asked for "scenes, simulations, dialogues, fun" beyond just walking around and clicking NPCs in the roster.

We already have:
- 13 NPCs (bartek, klaudia, marek, zosia, pawel + 8 new: kasia, tomek, ania, janusz, burek, grazyna, maciek, przemek)
- Dialogue trees with effects (relationship, stat, flag changes)
- An end-of-day economy tick (rent, coffee, ramen, LinkedIn Premium, optional ACME contract income)
- 3 in-game periods per day (morning, afternoon, evening) that auto-advance every 60 real seconds

This task: write the copy + effects for a "Random Office Events" pool that fires when a period transitions (morning→afternoon, afternoon→evening, evening→next day morning when we wrap). Each event is a small slice-of-IT-life that the player reacts to.

## What to deliver

Write a NEW file: `src/content/events.ts` exporting `RANDOM_EVENTS: RandomEvent[]` and the type `RandomEvent`.

A `RandomEvent` looks like:
```ts
export interface RandomEvent {
  id: string;              // kebab-friendly slug, e.g. "slack-mention"
  /** Weight (higher = more likely). Roughly 1-10, sum of all weights should be ~100. */
  weight: number;
  /** Time-of-day filter. If set, event only fires during these periods. */
  periods?: Array<"morning" | "afternoon" | "evening">;
  /** Hard requirements: a flag must be set (true) for the event to be available. */
  requiresFlags?: string[];
  /** Hard requirements: a flag must be NOT set (false) for the event to be available. */
  blocksFlags?: string[];
  /** Headline toast text the player sees. Should be 1 short sentence, punchy, IT-flavored. Use the existing showToast API (single string). */
  toast: string;
  /** Optional secondary toast line (e.g. "you gained focus."). Keep it under 30 chars. */
  subline?: string;
  /** Toast type: 'info' | 'success' | 'warning' | 'error'. */
  toastType: "info" | "success" | "warning" | "error";
  /** Effects applied to game state when the event fires. */
  effects: Array<
    | { type: "add-cash"; delta: number }
    | { type: "spend-cash"; delta: number }
    | { type: "add-stat"; stat: "credibility" | "caffeine" | "patience" | "focus"; delta: number }
    | { type: "add-relationship"; npcId: "klaudia" | "marek" | "zosia" | "pawel" | "bartek" | "kasia" | "tomek" | "ania" | "janusz" | "burek" | "grazyna" | "maciek" | "przemek"; delta: number }
    | { type: "set-flag"; flag: string; value: true }
  >;
}
```

## Comedy style guide (READ THIS)

- IT Crowd + Silicon Valley. Self-aware meta-jokes about IT culture.
- Long run-on sentences with parentheticals, em-dashes, and "(lol)" tags are FINE in the toast.
- Specific to the trainer job: clients, deadlines, LinkedIn, "agile", "10x engineer", Stack Overflow, README, meetings that should have been emails.
- One-liner punchlines that punch YOU.
- Reference Polish IT-folk experience without making it specifically Polish (it's EN-first per CLAUDE.md).
- **Max 1 event should be a direct hit on cash for amounts > 100 zl.** Most events are +/- 5-50 zl or stat changes.
- Some events should be 100% flavor (zero effects, just a toast) - this is fine and adds life.

## Event ideas (use, expand, or invent similar — try to deliver at least 25-35 events)

1. Slack @here ping from Bartek - "Bartek pinged #general: 'quick sync?' (You cannot.)" - small patience loss
2. Coffee machine is broken - spend 15 zl on a coffee, lose caffeine if you do, lose patience if you don't
3. LinkedIn recruiter DM (Kasia flavor) - "Kasia slid into your DMs. She is in your city. She says you would be perfect for a role. The role is Java. You don't know Java." - lose patience, lose 5 credibility
4. Birthday cake for someone (random coworker) - gain 5 patience, gain 3 focus, lose 50 zl
5. Fire drill - lose 5 focus, gain 2 patience (silence, fresh air)
6. Printer jam (Tomek's printer) - lose 8 patience, optionally gain 1 focus (if you fix it, you become the office hero)
7. Client email at 17:30 - "Client sent 'just one quick thing' at 5:30pm." - lose 10 patience, lose 5 focus
8. Free pizza in the kitchen - "Marek ordered too much pizza, again." - gain 10 patience, lose 30 zl
9. CEO walkthrough (Maciek) - "Maciek is doing a 'casual walkthrough'. Hide your second monitor." - lose 5 focus, gain 2 credibility
10. Office dog (Burek) demands pets - gain 8 patience, gain 5 focus
11. Janusz (the janitor) has life advice - "Janusz tells you the secret to a good life: 'naps'." - gain 5 patience, gain 2 credibility
12. Spilled coffee on keyboard - "Coffee: now in your keyboard. RIP." - lose 10 caffeine, lose 5 patience
13. Tomek's Stack Overflow copy-paste breaks prod - "Tomek pushed to main. Production is on fire. Not the good kind." - lose 5 patience, lose 10 credibility
14. Klaudia posts a LinkedIn carousel - lose 5 patience, gain 3 credibility (it's actually informative)
15. Kasia's "exciting opportunity" - lose 5 patience, gain 50 zl (you read it, you feel dirty)
16. Ania wants a 'synergy webinar' - "Ania wants you to 'do a 30-min thought-leadership drop'." - lose 10 patience, lose 5 focus
17. Przemek 'circles back' on an email you already answered - lose 5 patience
18. Free coffee in the kitchen (rare) - gain 20 caffeine, gain 3 patience
19. Quiet office - "It's quiet. Suspiciously quiet. You get 2 hours of actual focus." - gain 15 focus
20. WiFi goes down - "WiFi is down. You reflect on your life choices." - lose 15 focus, gain 5 patience (you read a book)
21. GitHub Actions quota exceeded - "You hit the Actions quota. Free tier strikes again." - lose 5 focus, lose 20 zl (you pay for the team)
22. Stack Overflow question goes viral - "Your 4-year-old SO answer got 50 upvotes overnight." - gain 5 credibility, gain 10 focus
23. Standup that should have been an email (afternoon only) - lose 5 patience, lose 2 focus
24. The intern (Pawel) asks you a 'quick question' - lose 5 patience, gain 2 credibility (you're a mentor now)
25. Maciek pivots to AI (random) - "Maciek: 'We should pivot to AI. AI is the future. This is the AI pivot slide.'" - lose 5 focus, gain 1 credibility
26. Zosia asks for a status update - "Zosia wants a 'quick status update'." - lose 3 patience, gain 5 credibility (you write a good one)
27. Grażyna reminder about expense reports - lose 50 zl (you forgot), lose 5 patience
28. Klaudia tags you in a LinkedIn post - lose 10 patience, gain 2 credibility
29. Random 'all-hands' meeting (morning only) - "There's an all-hands. There is no agenda. There is also no food." - lose 10 patience, lose 5 focus
30. The office plant (Zosia's desk) is wilting - lose 1 focus, gain 1 patience (you watered it)

For each event, write:
- `id` (kebab-case)
- `weight` (1-10, with rare events being 1-2, common being 5-7, super common 8-10)
- `periods` (optional, restrict to morning/afternoon/evening)
- `requiresFlags` / `blocksFlags` (use sparingly, e.g. `requiresFlags: ["got-acme-contract"]` to gate some events until you have a client)
- `toast` (1 sentence, IT-flavored humor, what the player sees)
- `subline` (optional, max ~30 chars, the consequence text like "+10 patience" or "ouch")
- `toastType` ("info" | "success" | "warning" | "error")
- `effects` (the reducer-shaped payload that gets dispatched)

## Effect target IDs (exact strings)

Stats: `"credibility" | "caffeine" | "patience" | "focus"` (clamped 0-100)
Relationships (use NpcId strings exactly): `bartek | klaudia | marek | zosia | pawel | kasia | tomek | ania | janusz | burek | grazyna | maciek | przemek`
Flags: any string you like; lowercase kebab-case; don't collide with existing flags:
- Existing: `got-acme-contract`, `bartek-advanced-contract`, `ran-debug-game`, `_seen-intro-toast`, `_reset-bankruptcy`
- Use namespaced: `event-coffee-broken`, `event-firedrill-day-X` (X = day number is appended at runtime by caller, NOT by you).

## Hard rules

- ONLY touch `src/content/events.ts` (create it new)
- DO NOT edit any other file
- TypeScript: no `any`, strict types
- DO NOT add new dependencies
- Each effect's `delta` must be an integer (the existing `add-stat` clamps to int via Math.round in renderHud, but we want clean numbers anyway)
- Cash deltas: max 1 event should award/lose more than 100 zl. Most are 5-50 zl.
- Total events: aim for **30+**
- Weight sum: roughly 100 (so callers can `pickWeighted` against normalized probabilities)

## Picking logic (informational only — the caller in `src/game/events.ts` will handle this)

```ts
export function pickRandomEvent(state: Readonly<GameState>, now: TimeOfDay): RandomEvent | null {
  const eligible = RANDOM_EVENTS.filter(e =>
    (!e.periods || e.periods.includes(now)) &&
    (!e.requiresFlags || e.requiresFlags.every(f => state.flags[f] === true)) &&
    (!e.blocksFlags || !e.blocksFlags.some(f => state.flags[f] === true))
  );
  if (eligible.length === 0) return null;
  const total = eligible.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;
  for (const e of eligible) {
    r -= e.weight;
    if (r <= 0) return e;
  }
  return eligible[eligible.length - 1]!;
}
```

You are NOT writing the dispatcher — the orchestrator will wire `pickRandomEvent` into the `advance-time` flow. You write ONLY the data.

## Verification

After writing, run `pnpm typecheck`. If it passes, you're done. The orchestrator will:
1. Create `src/game/events.ts` with the dispatcher + `pickRandomEvent` + a `runPeriodEvent(state, now, hud)` function that calls `pickRandomEvent`, dispatches the effects, and shows the toast.
2. Wire `runPeriodEvent` into the main loop in `src/main.ts` after `advance-time` is called.
3. Verify in the browser.

Do not commit. Do not push. Just leave the file for review.

## Output

When done, print:
- A count of how many events you wrote
- A one-line summary of the rarest / most flavorful event you wrote
- The typecheck result
