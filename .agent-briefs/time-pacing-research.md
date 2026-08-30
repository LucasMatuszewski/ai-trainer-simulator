# Brief: research + recommend the right in-game day length for an office sim

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game. Lucas complained on 2026-08-29:
> "days go way too fast, I did not even manage to understand anything what I should do there and the day passed and I was back outside the building (looking on the roof...)"
> "time should go much slower"

The current state (Phase 0, 2026-08-29): 60 real seconds per in-game period, 3 periods per day = 180 real seconds per in-game day (3 minutes).
The plan (PRD C-16): 300 real seconds per period, 3 periods per day = 900 real seconds per in-game day (15 minutes).
Phase 5 may bump to 600 real seconds per period = 1800 real seconds per in-game day (30 minutes).

## What I want from you (NO CODE, NO EDITS)

A recommendation. Answer:

### 1. Reference research

What is the right in-game day length for these games?
- Animal Crossing (real-time clock, days are real days)
- Stardew Valley (in-game day = ~12 real minutes, year = 2 real years)
- The Sims 4 (1 sim day = ~25 real minutes, sim week = ~3 real hours)
- Two Point Hospital (campaign has 5-10 hours per hospital, days are 10-15 real minutes)
- Papers Please (1 in-game day = ~5 real minutes, full game = ~5 real hours)
- Disco Elysium (full game = ~20 real hours, but it's a single long day)
- Oxygen Not Included (1 in-game day = ~17 real minutes, full colony arc = 20+ real hours)
- Idle games (vary widely)

For each, note: in-game day length, total play time, what's the right ratio.

### 2. The math for this game

Given:
- 13 NPCs (each has 5-10 dialogue topics)
- 30-day career arc
- 4 conversation modes (1-on-1, meeting, standup, classroom)
- Each "day" needs: morning standup (1-2 min), 2-3 NPC conversations (3-5 min total), 1 class / meeting (5-8 min), afternoon work / quest (5-10 min), end-of-day summary (1-2 min)
- A "perfect" first playthrough is 5-10 real hours = 300-600 real minutes
- 30 days × 5-15 min/day = 150-450 real minutes (covers a focused playthrough)
- 30 days × 30-60 min/day = 900-1800 real minutes (covers an immersive playthrough)

How long should an in-game day be?

### 3. Engagement vs. patience trade-off

The user already said "time should go much slower." But if a day is 30 real minutes and a full playthrough is 30 days, the player is committing 15 real hours to one playthrough. Is that OK?
- An "engagement" target: the player comes back 2-3 times per week, each session is 30-60 minutes, the playthrough takes 2-3 weeks.
- A "binge" target: the player plays 4-6 hours straight, the playthrough takes 2-4 days.
- A "casual" target: the player plays 5-10 minutes per day, the playthrough takes 1-2 months.

Which one is the right default? Lucas said "make it the best simulator business retro game" — that suggests binge-able but not exhausting.

### 4. The pause-during-dialogue concern

The plan already pauses time during dialogue. So the day length is a cap, not a floor. If the player reads 8 lines of dialogue, that's 8 lines of time, not 30 seconds. Does this change the recommendation?

### 5. Recommendation

Concretely: how many real minutes per in-game period (morning / afternoon / evening), how many periods per day, how many real minutes per in-game day, and what's the right "time scale" so the player feels "I'm at work" without "I'm wasting my evening on a slow game"?

Also: should the player be able to set the time scale (slow / normal / fast / instant)? Lucas's tone suggests he wants a "real work" feel, but a power-user might want to speed-run a quest.

## Output

Write a 1-2 page report to `.agent-briefs/time-pacing-report.md`. Use markdown. Be specific. Do not commit. Do not push.
