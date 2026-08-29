# Brief: add 5+ more NPCs with full dialogue trees

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`. The player is an IT trainer. The game is a dialogue-driven economic sim — the 3D office is just a backdrop, and the player clicks a name in the roster panel to talk to them. We already have 5 NPCs (Bartek, Klaudia, Marek, Zosia, Pawel). The player has been clear: more NPCs, more dialogues, more fun. You (GLM) are the best model for comedy writing in English and Polish, so this task is for you.

## What to deliver

**Add 5 NEW NPCs (don't change the existing 5) to the office, with full dialogue trees.** Each new NPC needs:

1. **An entry in `src/content/npcs.ts`** with:
   - `id` (kebab-friendly slug like `recruiter-it`)
   - `name` (single first name, IT-flavored: Kasia, Tomek, Maciek, Ania, Filip, Przemek, etc. — use the user's "real IT folk in Poland" vibe)
   - `role` (one of: Recruiter, Junior Dev, Marketing Person, Janitor, Office Dog, Accountant, CTO, Sales, etc.)
   - `emoji` (one character — single letter or emoji, this is the portrait)
   - `position: { x, y, z }` placed in unused office space (current grid: x in [-4,4], z in [-9,9]; avoid overlapping existing desks)
   - `triggerRadius: 1.8`
   - `dialogues: { default: DIALOGUES.<id>!.default! }` (and other trees if you make any)

2. **An entry in `src/content/dialogues.ts`** with a default tree containing:
   - A `greeting` node with 3 dialogue options
   - At least 2 follow-up nodes
   - At least one of the options must use `effects` (relationship, stat, or flag changes) — this is the gameplay loop
   - IT Crowd / Silicon Valley humor: dry, ironic, self-deprecating. The new trainer just started; NPCs are slightly hostile, confused, or absurdly corporate.
   - Each option should have a distinct consequence (good relationship, bad relationship, or a different follow-up)

3. **An `OBSTACLES` entry** in `npcs.ts` for the new NPC's desk, with `id: "desk-<npc-id>"` and AABB coords enclosing the desk. Match the pattern of existing desks (2x2 area).

## Comedy style guide (READ THIS)

Read `src/content/dialogues.ts` for the existing tone. Key things:
- Long run-on sentences with parentheticals, em-dashes, and "(You cannot.)" tags
- Self-aware meta-jokes about IT culture
- Specific to the trainer job: clients, deadlines, LinkedIn, "agile", "10x engineer", Stack Overflow, README
- One-liner punchlines that punch YOU
- Reference real Polish IT-folk experience without making it specifically Polish (it's EN-first per CLAUDE.md)

## Position grid (office is 20x20, walls at -9..9)

Existing NPC positions (avoid these):
- bartek: (-4, 0, -3)
- klaudia: (4, 0, -3)
- marek: (-4, 0, 3)
- zosia: (4, 0, 3)
- pawel: (0, 0, -6)

Unused positions (suggestions, feel free to pick others):
- (-7, 0, -3) — far west back
- (7, 0, -3) — far east back
- (-7, 0, 0) — far west middle
- (7, 0, 0) — far east middle
- (-7, 0, 3) — far west front
- (7, 0, 3) — far east front
- (0, 0, 6) — center south (this is the player start, avoid)

NPCs must be inside the office bounds `OFFICE_BOUNDS = { minX: -9, maxX: 9, minZ: -9, maxZ: 9 }`. Their desk obstacles can extend up to 1 unit from their position.

## Hard rules

- DO NOT change the existing 5 NPCs (no edits to bartek, klaudia, marek, zosia, pawel blocks)
- DO NOT change any other file besides `src/content/npcs.ts` and `src/content/dialogues.ts`
- DO NOT use `any` in TypeScript
- DO NOT add new dependencies
- All effect targets must be one of: `cash`, `credibility`, `patience`, `caffeine`, `focus`, `reputation` (for stat) OR an npc id (for relationship) OR a string flag name (for set-flag). The npc relationships dict uses the same id.
- The `npcRelationships` map will be created on first read of an npc id, so you don't need to seed it elsewhere

## Suggested new NPC archetypes (pick 5 from this list or invent similar)

1. **The Recruiter** (Kasia) — calls you "talent", doesn't know what you do
2. **The Junior Dev** (Tomek) — copy-paste from Stack Overflow, won't take ownership
3. **The Marketing Person** (Ania) — wants you to do a "synergy webinar", thinks AI = ChatGPT
4. **The Janitor** (Janusz) — knows more about the company than anyone, sardonic
5. **The Office Dog** (Burek) — doesn't talk but has a reaction tree (yes, dialogue for a dog NPC — one option "pet", one "ignore", one "feed")
6. **The Accountant** (Grażyna) — knows the real numbers, has a side-hustle energy
7. **The CTO** (Maciek) — hasn't written code in 5 years, talks about "scale" a lot
8. **The Sales Guy** (Przemek) — oversells, "circle back", emoji in emails

If you can make ALL 8, great. Minimum is 5. Make each one feel distinct — the player should be able to guess the archetype from the emoji + first line of the greeting.

## Effect examples (use these patterns)

```ts
{ type: "add-cash", target: "cash", delta: -50 } // money
{ type: "add-stat", target: "credibility", delta: 5 } // stat change
{ type: "add-relationship", target: "kasia", delta: 10 } // friendship
{ type: "set-flag", target: "kasia-met", delta: 1 } // quest flag
{ type: "increment-total", target: "dialoguesFinished", delta: 1 } // bookkeeping
```

## Verification

After editing, run `pnpm typecheck` (the project uses Vite + TypeScript; the script in package.json is `tsc --noEmit` or similar — check package.json). If typecheck passes, the change is good. Do not commit; do not push. Just leave the diff for the orchestrator to review.

## Output

When done, print:
- List of 5 (or more) new NPC ids and names
- A 2-sentence summary of each NPC's comedic premise
- The typecheck result
