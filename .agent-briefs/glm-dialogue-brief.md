# Brief for GLM 5.3: enrich existing dialogue trees

## Context
You are working on the AI Trainer Simulator (a 3D IT-trainer game
in the IT Crowd / Silicon Valley vein). Lucas (the user) said
NPCs repeat the same line when revisited and we have 13 NPC trees
with very few branches (most greetings have 2-3 options that
all lead to `_end`). You will enrich the existing trees so each
NPC feels like a person the player can actually get to know.

## What to read first
- `src/content/dialogues.ts` — the existing trees
- `src/content/dialogue-memory.ts` — the per-NPC option memory
  (so you know which option ids get used to suppress re-asks)
- `src/types.ts` — `DialogueTree`, `DialogueNode`, `DialogueOption`
- `src/content/npcs.ts` — names, roles, specializations, traits

## Constraints (HARD)
- Keep the existing option ids stable when you can; add new ids
  for new options following the pattern `${nextNodeId}-${index}`
  when an option's nextNodeId is duplicated within the same node.
- Do NOT change the 3-option default for greetings; keep one of
  the existing options so the test suite keeps passing.
- The new text must be IT Crowd / Silicon Valley — short, punchy,
  ironic, occasionally fourth-wall-breaking. The existing voice
  is the calibration target.
- English only.
- Add at least ONE new branch per NPC (a follow-up the NPC says
  after the player picks the FIRST available option, gated on
  a flag in game state). The branch should change what the NPC
  offers next time, in line with "decisions must affect parameters
  and must change what dialogue options are available".
- Effects are listed in `Effect` (see types.ts). Allowed values:
  add-cash, spend-cash, add-stat (credibility/caffeine/patience/focus),
  add-relationship, set-flag, increment-total.

## What to deliver
Write your output to `src/content/dialogues-more.ts` (a NEW file)
with the same shape as dialogues.ts. We will wire it in later.
Re-export a `MORE_DIALOGUES: Record<string, Record<string, DialogueTree>>`
keyed the same way as `DIALOGUES`.

For each of these 13 NPCs, produce ONE new tree (or one extra
option chain on the existing tree if a flag is already there):
  bartek, klaudia, marek, zosia, pawel, kasia, tomek, ania,
  janusz, burek, grazyna, maciek, przemek

## Workflow
- Read all four files first.
- Then plan a list of "after-visit" branches you want to add.
- Then write the file.
- Do NOT touch any other file. Do NOT commit. Do NOT push.
- You may consult a few web references for IT Crowd quotes if you
  want flavor, but your own voice is fine.

When you finish, write a one-paragraph summary to
`.agent-briefs/glm-dialogue-report.md` listing the new branches
you added, the flag each one depends on, and any NPCs you
skipped and why.
