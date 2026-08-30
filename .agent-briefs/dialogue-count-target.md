# Brief: design the dialogue volume + structure for the multi-turn dialogue rewrite

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game. Lucas's feedback on 2026-08-29:
> "100x more dialogue options and live in this game, real work simulation"
> "after I provide answer to the question in the dialogue it's the end of the conversation.... WHAT???? WTF???? Only one question and one answer? thats it?"

PRD C-10 says "4-8 turns minimum per conversation," but Lucas's "100x more" suggests he wants significantly more than the current ~150 lines of dialogue for 13 NPCs.

The cast (13 NPCs):
- bartek (team lead), klaudia (LinkedIn), marek (DevOps), zosia (manager), pawel (intern), kasia (recruiter), tomek (junior dev), ania (marketing), janusz (janitor), burek (dog), grazyna (accountant), maciek (CTO), przemek (sales)

The game has 4 stats: credibility, caffeine, patience, focus. Quests are 30+ days. The current dialogue is in `src/content/dialogues.ts`.

## What I want from you (NO CODE, NO EDITS)

A design document. Answer:

### 1. The "right amount" of dialogue

For a 13-NPC office sim where the player runs a 30-day career arc, how much dialogue is enough? Answer in concrete numbers:
- Per NPC, how many lines? (A range: min for the quietest NPC, max for the loudest)
- Per conversation, how many turns? (A range: min for a "hi, bye" exchange, max for a "we're becoming friends" arc)
- Across the full 30 days, how many distinct player experiences should there be? (The Sims has roughly 200-400 hours of content; we need ~5-10 hours for a "first playthrough")
- The current tree is single Q-and-A. The new tree is multi-turn. How many total nodes in the data model?

### 2. The structure

What are the layers? Sketch:
- **Greeting lines** (the "hello" — varies by how many times talked today, last topic, relationship)
- **Topic threads** (the "meat" — each NPC has 3-5 threads, e.g. "your first sprint," "the CTO's pivot to AI," "your last interview")
- **Follow-up branches** (the "depth" — each topic thread has 2-3 deep branches, e.g. "tell me more about the pivot" → 2-3 sub-branches)
- **Memory callbacks** (the "texture" — NPCs reference past conversations, e.g. "you said yesterday you hated standups")
- **Gated options** (the "RPG" — some options only show if you have a flag, e.g. "I already pushed to main" only shows if you pushed to main)

For each, give a count target and a per-NPC example.

### 3. Tone + variety

The current tone is "IT Crowd + Silicon Valley, dry, ironic, self-deprecating." Lucas wants humor. How do we keep the dialogue from feeling repetitive across 30 days?
- Inter-NPC speech bubbles (we have these planned)
- NPC-specific verbal tics (each NPC has 1-2 catch-phrases they overuse)
- Topic drift (NPCs bring up things the player didn't ask about)
- "Comedy of errors" (the player accidentally triggers a chain of misunderstandings)

Give 2-3 examples per technique.

### 4. Implementation implications

- How big is the dialogue data model in LOC? (Estimate: ~50 lines per NPC, ~650 lines total? Or ~500 lines per NPC for the deep NPCs?)
- How long to write 13 NPCs at this volume? (Estimate by a human writer: 1-2 weeks at 8 hours/day for the minimum, 1-2 months for the max.)
- How to test? (Tree-traversal tests for gated options, snapshot tests for the welcome / farewell / topic-open lines.)
- How to scale? (The first 7 days are the most important. Can we ship a "thin" version of all 13 NPCs and then "deepen" the 4-5 most important NPCs over time?)

### 5. Recommendation

Concretely: how many lines per NPC, how many turns per conversation, what is the minimum viable set for Phase 1 (first 7 days), and what is the full set for the 30-day arc?

## Output

Write a 1-2 page report to `.agent-briefs/dialogue-count-report.md`. Use markdown. Be specific. Do not commit. Do not push.
