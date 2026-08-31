# C-37 Content Brief: NPC speech-bubble line pools

Target file: `src/content/npc-bubbles.ts` (new). Pure data module, no imports. Tone: IT Crowd + Silicon Valley. English, ASCII only, no em dashes, no profanity.

## Contract

- Hard cap 32 characters per line (small pixel bubble; lines past ~30 get truncated).
- Human NPCs: 6 `solo` + 4 `pair` lines each. Burek the dog: 6 `solo` + 2 `pair`.
- `solo` = muttered to self while working at the desk, no addressee.
- `pair` = said TO a nearby colleague, generic addressee (never use NPC names inside lines).
- Every line must be instantly attributable to that NPC's role and character.
- dawid: the 8 existing CEO lines appear VERBATIM, plus 2 new ones (marked with a comment).

## File content (src/content/npc-bubbles.ts)

```ts
/** Per-NPC speech-bubble line pools (C-37). */
export interface NpcBubblePool {
  /** Solo thought bubbles while working at the desk. */
  solo: string[];
  /** Lines said to another NPC when two are close (spoken TO a colleague, generic addressee). */
  pair: string[];
}

export const NPC_BUBBLE_POOLS: Record<string, NpcBubblePool> = {
  bartek: {
    solo: [
      "Another P1. Lovely.",
      "Who wrote this? Oh. Me.",
      "LGTM. It is not.",
      "I will fix it at 5pm.",
      "Ticket says urgent. Sure.",
      "Coffee first. Code later.",
    ],
    pair: [
      "Did you restart it?",
      "Who approved this PR?",
      "Tests? In this economy?",
      "Read the error. All of it.",
    ],
  },
  klaudia: {
    solo: [
      "Drafting a humble post.",
      "Engagement is down. Why?",
      "Day 41 of my journey.",
      "This will go viral. Trust.",
      "New headshot. New me.",
      "Tagged 12 people. Done.",
    ],
    pair: [
      "Say something quotable.",
      "Can I quote you? Thanks.",
      "Smile, we are content now.",
      "This convo is a post idea.",
    ],
  },
  marek: {
    solo: [
      "Prod is down. It is fine.",
      "Fire is just a metric.",
      "Rolling back. Again. Fine.",
      "The cluster is sad today.",
      "This is fine. Mostly.",
      "Alerts muted. Peace at last.",
    ],
    pair: [
      "It works on my machine.",
      "I deploy on Fridays. Bold.",
      "Have you tried rebooting?",
      "We ship. Then we pray.",
    ],
  },
  zosia: {
    solo: [
      "Booked 6 meetings. Productive.",
      "This email needs a meeting.",
      "Prep for the prep meeting.",
      "Where is my 1-on-1 agenda?",
      "Circling back on the circle.",
      "Sync about the next sync.",
    ],
    pair: [
      "Quick sync? It is never quick.",
      "Let us book a follow-up.",
      "Can you join my meeting?",
      "I will put time in calendar.",
    ],
  },
  pawel: {
    solo: [
      "Where is the bathroom? Again.",
      "I love this job. I think.",
      "Taking notes. About notes.",
      "How do I open the terminal?",
      "First coffee run. Nervous.",
      "Everyone here knows stuff.",
    ],
    pair: [
      "How do I clock out? Asking.",
      "One coffee or two sugars?",
      "Is this the right floor?",
      "Can I shadow you? Please?",
    ],
  },
  kasia: {
    solo: [
      "Pipeline is looking juicy.",
      "This CV is 14 pages. Bold.",
      "Ghosted again. Devs, why?",
      "Sourcing. Do not disturb.",
      "He listed Word as a skill.",
      "Reach out. Follow up. Repeat.",
    ],
    pair: [
      "I noticed your profile...",
      "Ever thought of contracting?",
      "You would test well. Trust.",
      "We are always hiring. Always.",
    ],
  },
  tomek: {
    solo: [
      "git push origin main. Oops.",
      "It compiled. Ship it.",
      "Why is main broken? Panic.",
      "Stack Overflow says maybe.",
      "One more force push. Fine.",
      "Friday deploy? Never again.",
    ],
    pair: [
      "Was that... production?",
      "I may have pushed to main.",
      "How do I revert? Quickly?",
      "The tests failed. Skip them?",
    ],
  },
  ania: {
    solo: [
      "Synergizing the roadmap.",
      "Circle back. Leverage. Done.",
      "The brand needs more pizazz.",
      "Quarterly vibe check today.",
      "Brainstorm about brainstorm.",
      "Going viral is a strategy.",
    ],
    pair: [
      "Let us ideate offline.",
      "Big if true. Very brand.",
      "Pitch me in one word. Go.",
      "We need a deck for that.",
    ],
  },
  janusz: {
    solo: [
      "The shredder was busy. Hmm.",
      "Mopped the CTO office. Again.",
      "I hear everything. Mop, mop.",
      "Someone napped in meeting 2.",
      "Keys open all doors. All.",
      "CEO leaves at 3. Noted.",
    ],
    pair: [
      "Psst. You did not hear this.",
      "Marketing fridge is a crime.",
      "Sales broke the coffee machine.",
      "I know who ate the cake.",
    ],
  },
  burek: {
    solo: [
      "WOOF.",
      "Is that bacon?",
      "Tail. Chase. Fail. Retry.",
      "The mailman fears me.",
      "Squirrel. Mandatory meeting.",
      "This floor smells of lunch.",
    ],
    pair: [
      "WOOF WOOF. Pet me. Now.",
      "Drop the sandwich. Drop it.",
    ],
  },
  grazyna: {
    solo: [
      "Rounded down. As tradition.",
      "This invoice has 3 commas.",
      "Audit in two weeks. Breathe.",
      "Who bought 40 monitors?!",
      "Excel is my religion.",
      "Expenses? In THIS economy?",
    ],
    pair: [
      "Receipts. I need receipts.",
      "Is that a business lunch?",
      "Budget says no. Always no.",
      "Sign here. And here. Here.",
    ],
  },
  maciek: {
    solo: [
      "In a meeting. Wink. Gone.",
      "Just draw one more box.",
      "Scale it. Then scale it.",
      "Microservices fix morale.",
      "Remote this afternoon. Busy.",
      "Rewrite it in Rust. Later.",
    ],
    pair: [
      "Have you tried Kubernetes?",
      "It is a load balancer. Sure.",
      "Architecture is art. Mine.",
      "Latency is a state of mind.",
    ],
  },
  przemek: {
    solo: [
      "Client wants a robot. Sure.",
      "Closed! In my imagination.",
      "The demo is 90% PowerPoint.",
      "Yes, we can. We cannot.",
      "Signature pending. Since May.",
      "Under-promise? Never heard.",
    ],
    pair: [
      "Is the AI feature done yet?",
      "Client asks for one tweak...",
      "Tell them it is in beta.",
      "This deal closes itself.",
    ],
  },
  dawid: {
    solo: [
      "Circle back? I never left.",
      "The graph must go up. Up!",
      "Who moved my hockey stick?",
      "Alignment is my cardio.",
      "We are family. KPIs apply.",
      "Pivot! But with confidence.",
    ],
    pair: [
      "Let us take this offline.",
      "Burek gets it. No meetings.",
      // new for C-37:
      "Trust the process. And me.",
      "Q4 is a state of mind.",
    ],
  },
};
```

## Directional gag lines (stretch goal, orchestrator may wire directional pairs later)

All lines 32 chars or fewer. Format: `from -> to: line`.

1. marek -> tomek: "Tomek. Main. Friday. WHY."
2. bartek -> pawel: "It is DNS. It is always DNS."
3. klaudia -> anyone: "This moment is content."
4. janusz -> bartek: "Psst. HR asked about you."
5. burek -> anyone: "WOOF. Drop the sandwich."
6. przemek -> maciek: "Client wants it by Monday."
7. maciek -> przemek: "It is a slide, not a product."
8. dawid -> zosia: "Less meetings. More graphs."

## Definition of done

- The TS block above lands in `src/content/npc-bubbles.ts` verbatim; no line text edited.
- Counts verified: 13 humans at 6 solo + 4 pair, burek at 6 solo + 2 pair.
- No line exceeds 32 characters; the whole file is pure ASCII, no em dashes.
- dawid's pool contains all 8 existing CEO lines exactly as written, plus the 2 marked new ones.
