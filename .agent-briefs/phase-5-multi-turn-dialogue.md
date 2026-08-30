# Phase 5.0 — Multi-turn dialogue trees (one NPC at a time, 2-3 turns minimum)

## Context

The current dialogues are single Q-and-A pairs. Each NPC has one
"greeting" node and one option. Lucas reported (2026-08-29):

> "After I clicked on the person for the first time I had some
> dialogue options, but in the middle of reading day passed and I
> was back outside..."

That bug was Phase 0 (C-17) — the dialogue state reset on screen
transition. We fixed that.

The next issue is that the dialogues themselves are too shallow.
Lucas wants real multi-turn conversations, like a real RPG, with
decisions affecting later conversations. The plan's Phase 5 says:

> "Multi-turn dialogues (C-10, D-17) — RPG-style branching, no hard
> turn count. Use the opencode dialogue-count report's 5-layer
> structure (greetings + threads + follow-up branches + memory
> callbacks + gated options) and the ~2,300 authored strings
> target. Each option leads to a different NPC follow-up. NPCs
> remember past conversations."

This task focuses on the **structural** change: each NPC dialogue
tree must have at least 2 turns (a greeting + a follow-up + at
least one option that branches). Specific authoring (the 2,300
strings) is a separate content task.

This task delivers:

1. The structure: each NPC has a greeting, a follow-up node, and
   at least one option that goes to the follow-up.
2. The runtime: a state machine that tracks the current node and
   walks the tree as the player picks options.
3. The "memory" mechanism: a small per-NPC memory of the last topic
   discussed, so a follow-up can mention it.
4. The effect system: when the player picks an option, a list of
   `Effect` objects is applied to the game state (already defined
   in `src/types.ts`).
5. Tests: every NPC tree has at least 2 nodes; picking an option
   applies the right effects; memory is updated.

## Files to read

- `src/types.ts` — `DialogueNode`, `DialogueOption`, `DialogueTree`,
  `Effect`.
- `src/content/dialogues.ts` — the existing single-node trees.
- `src/ui/dialogue.ts` — the current state machine (it already
  tracks `currentNodeId`).
- `src/game/state.ts` — `game.dispatch(action)` to apply effects.
- `docs/PRD.md` §13 C-10 (multi-turn dialogue).

## What to deliver

### 1. New file: `src/content/dialogue-memory.ts`

```ts
import type { NpcId } from "../types";

/** A small per-NPC memory of the last conversation. */
export interface NpcMemory {
  /** Last topic the player discussed with this NPC. */
  lastTopic: string | null;
  /** How many times the player has talked to this NPC. */
  visitCount: number;
  /** IDs of dialogue nodes the player has seen. */
  seenNodes: Set<string>;
}

export const NPC_MEMORY: Record<NpcId, NpcMemory>;
```

Initialise each NPC's memory to `{ lastTopic: null, visitCount: 0, seenNodes: new Set() }`. Export a function `getMemory(npcId)` and `setMemory(npcId, patch)` that the dialogue state machine calls.

### 2. The state machine

Extend `src/ui/dialogue.ts` to:
- Track the current node id (already does).
- On opening the dialogue, set the `lastTopic` for this NPC based
  on the first node's id.
- When the player picks an option, apply the option's `effects`
  via `game.dispatch({ type: ... })` (already partially done; you
  may need to add new Action types to `src/types.ts` if a needed
  one is missing).
- When a node has no options (or all options are "end"), the
  dialogue closes after the player clicks.

### 3. The multi-turn trees

Edit `src/content/dialogues.ts` so that EVERY NPC tree has at
least 2 nodes: a "greeting" and a "follow-up". For each tree, add
at least one option to the "greeting" that goes to the "follow-up".
The "follow-up" may have its own options that branch further (one
more level is fine).

Example for bartek:

```ts
greeting: {
  id: "greeting",
  text: "Welcome aboard! I have to say, the office is buzzing with
  new energy today. Where would you like to start?",
  options: [
    {
      text: "Tell me about the team.",
      nextNodeId: "team-intro",
      effects: [],
    },
    {
      text: "I just need a desk and a wifi password.",
      nextNodeId: "desk-chat",
      effects: [],
    },
  ],
},
team-intro: {
  id: "team-intro",
  text: "We've got a dozen specialists. Maciek runs the engineering
  side from the corner office, Zosia keeps the schedule running,
  and the interns rotate faster than the coffee. What do you want
  to know specifically?",
  options: [
    {
      text: "Who should I talk to first?",
      nextNodeId: "next-step",
      effects: [],
    },
    {
      text: "Actually, let me just get a desk.",
      nextNodeId: "desk-chat",
      effects: [],
    },
  ],
},
desk-chat: {
  id: "desk-chat",
  text: "Sure. Kasia from HR can set you up — she's usually by
  reception, in the corner. Just tell her I sent you and she'll
  wave the wifi paperwork.",
  options: [],
},
next-step: {
  id: "next-step",
  text: "I'd start with Bartek's standup at 9. He's the team lead.
  You'll know him by the 'B' on his badge. Or just ask anyone for
  the tall guy with the coffee — that's him.",
  options: [],
},
```

Use a similar structure for every NPC. Each tree should have at
least 2 nodes (greeting + follow-up) and at least one option.

### 4. Tests

`tests/unit/dialogue-tree.test.ts`:
- Every NPC tree has at least 2 nodes.
- Every NPC greeting node has at least 1 option.
- Every NPC option's `nextNodeId` exists in the same tree.
- Walking the tree: pick the first option, end up at the next
  node, pick its first option, etc. The tree terminates within
  5 hops.
- The `lastTopic` memory is updated when the player picks an
  option that has effects.
- Picking an option with `effects` applies those effects via
  the dispatch: simulate by mocking the `game` module.

### 5. Constraints

- You MAY add new `Action` types to `src/types.ts` and the reducer
  in `src/game/state.ts` if a needed one is missing. But do NOT
  remove existing actions.
- Do NOT add a new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-5-multi-turn-dialogue-sol.md`.

## Definition of done

- `src/content/dialogue-memory.ts` exists with `NpcMemory` type and
  `NPC_MEMORY` map.
- `src/content/dialogues.ts` is updated so every NPC tree has at
  least 2 nodes and a branching option.
- `src/ui/dialogue.ts` is updated to apply effects and update memory.
- `tests/unit/dialogue-tree.test.ts` exists with at least 6 test
  cases.
- `pnpm test tests/unit/dialogue-tree.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
