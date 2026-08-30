# Brief: research the right level of stochastic NPC behavior for an office sim

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`. The user wants NPCs to feel alive but the office is small (13 NPCs in a 20x20 room, soon 50x50 multi-room). The plan has a deterministic-per-period schedule (each NPC's position, face, and state for morning / afternoon / evening) with a per-day random seed for stochastic events.

Lucas's exact words (2026-08-29):
> "some may be late and appology sometimes, but not always the same"
> "some may stay longer, they have mor work"
> "may stay to play video games on the TV and console"
> "make it random, every day should be different"

## What I want from you (NO CODE, NO EDITS)

This is a research + recommendation brief, not an implementation brief. Deliver a written report that answers:

### 1. Stochastic layer: bounded events vs unbounded day-uniqueness

**Option A (calm, current plan):** deterministic backbone + bounded stochastic. Max 2-3 late arrivals per day, max 0-1 staying late, max 1-2 in the kitchen in evening. The same day always replays the same stochastic decisions (regression-testable). Pros: predictable, testable, low cognitive load. Cons: the player learns the patterns fast and the office feels small.

**Option B (alive, more work):** every day has a "theme" — firedrill, birthday party, client visit, team lunch, hackathon, all-hands, quiet day, sickness day. The theme drives 5-8 stochastic events; the rest of the day is deterministic. Pros: feels alive, every day is genuinely different, gives the player something to plan around. Cons: harder to test, more content to write, more risk of over-stimulation.

**Option C (hybrid):** deterministic backbone + bounded stochastic + a "weekly event" that rotates (one bigger event per day, drawn from a 7-event pool: standup-day, retro-day, demo-day, training-day, social-day, sick-day, regular-day). The player can plan their week.

**Option D (your recommendation):** propose a fourth option or a refinement of one of the above.

For each option, give: complexity (1-5), test cost (1-5), perceived liveliness (1-5), and the failure mode if it goes wrong (e.g. "player feels overwhelmed," "NPCs are random for randomness's sake," "events repeat every 7 days, player notices").

### 2. Reference research

What does the existing literature / commercial games do? Look at:
- The Sims (NPC schedules, autonomous desires)
- Stardew Valley (per-day random events, character schedules)
- Two Point Hospital / Two Point Campus (staff schedules, daily events)
- Papers, Please (deterministic with daily random arrivals)
- Dwarf Fortress (chaotic emergent behavior)
- Disco Elysium (rigid schedules, internal monologue)

For each, note: deterministic vs stochastic, bounded vs unbounded, how the player experiences it, what makes it feel "alive" vs "scripted."

### 3. Recommendation for this game

Given the 13-NPC scale, the 50x50 multi-room world, the per-day reset, and the player's daily cycle (morning / afternoon / evening, 5-15 min real time per period), what is the right stochastic layer? Be specific: how many events per day, what kind, what seed, what fallback if a stochastic event breaks a deterministic schedule.

### 4. Implementation implications

If we go with Option B or C, what's the impact on:
- The quest chain (the daily event can chain into a quest or replace a quest for that day)
- The dialogue tree (some events unlock special NPC dialogue; how is that keyed?)
- The state machine (does the stochastic layer need its own reducer, or is it pure-data?)
- Testing (how do we test a per-day random seed?)

## Output

Write a 1-2 page report to `.agent-briefs/npc-stochastic-report.md`. Use markdown. Do not commit. Do not push.
