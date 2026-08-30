# Time Pacing Report — AI Trainer Simulator

Author: opencode (glm-5.2), per brief `time-pacing-research.md`. Research only — no code changed.

## TL;DR

- Keep **3 periods/day**. Ship C-16's uniform **300 s/period now** (900 s = 15 min clock/day).
- Target pacing from Phase 3: **5 / 10 / 5 real minutes** (morning / afternoon / evening) = **1200 s = 20 min clock/day**. Afternoons are twice as long as mornings — true to office life.
- Keep **pause-during-dialogue**. The clock then only prices free-roam time, so expected real session ≈ **25–35 min/day**.
- 30-day arc ≈ **12–15 real hours** (600 min pure clock, ~810 min with dialogue). That straddles the brief's "focused" (450) and "immersive" (900) bands — the sweet spot.
- Add player speed control: **0.5× / 1× / 2×**, **Skip to next event**, **End day early**. Auto-pause on scheduled events. This directly fixes Lucas's complaint, which is as much "I missed what I was supposed to do" as "time was fast".

## 1. Reference research

| Game | In-game day | Total playtime | Pacing model | Lesson for us |
|---|---|---|---|---|
| Animal Crossing | 1 real day (1:1 clock) | months, 15–60 min/day | real-time scarcity | Drives return visits, but kills narrative arcs. Wrong model for a 30-day career story. |
| Stardew Valley | ~12–14 real min | 60–100+ h; 1 season ≈ 5–6 h | fixed day = one core loop | The "one more day" hook works because the day is exactly one full loop + ~30% slack. |
| The Sims 4 | ~24 real min at 1× | open-ended, 100s of h | player speed control (1×/2×/3× + ultra) | Nobody plays the fixed clock; the controls are the pacing. |
| Two Point Hospital | days are short bookkeeping ticks | 5–10 h per hospital | speed control; felt unit is the hospital-year objective | When the sim is deep, the unit of play is the objective, not the day. |
| Papers Please | ~5–6 real min | 5–8 h | day = level, fixed | A short fixed day works only when difficulty ramps and the game ends before fatigue. |
| Disco Elysium | no wall clock (time = actions) | 20–30 h | action-driven time | Narrative time should pass when the player does things, not while they think. |
| Oxygen Not Included | ~10–17 min/cycle at 1× | 20+ h per colony | pause/1×/2×/3× | Players default to 2×; design the 1× clock, expect it played at 2×. |
| Idle games | minutes | months | compression + offline | Only the "casual 10 min" profile maps here; serve it with skip, not with a shorter day. |

**Three meta-lessons:**
1. Successful day length = length of one full core loop, padded ~30–50% for slack. It is derived from content, not from a philosophy.
2. Every deep sim ships speed controls. A fixed slow clock is never actually played straight (Sims, ONI, TPH all confirm).
3. Dialogue/story time should be action-driven (Disco Elysium). Our pause-during-dialogue already gives us this for free — keep it.

## 2. The math for this game

Daily content budget from the brief, split by whether it consumes the clock (dialogue pauses time):

| Block | Activity | Paused? | Real minutes |
|---|---|---|---|
| Morning standup | 1–2 | yes | 1–2 |
| 2–3 NPC conversations | 3–5 | yes | 3–5 |
| Class / meeting | 5–8 | yes | 5–8 |
| End-of-day summary | 1–2 | yes | 1–2 |
| Afternoon work / quest | 5–10 | **no** (on-clock) | 5–10 |
| Navigation between rooms (multi-room office) | — | **no** | 3–6 |
| **Total** | | | **18–33** |

- Paused (narrative) time: **10–17 min**. On-clock (free-roam) time: **8–16 min**.
- A **20-min clock** covers the on-clock need with 25–50% slack — the Stardew ratio. A 30-min uniform clock (Phase 5 option) would leave the evening period mostly dead: evening content is 1–2 min of summary plus ambient socializing.
- Session length = clock (20) + paused (10–17 scaled by reading speed) ≈ **25–35 min/day**.
- Playthrough: 30 × 20 = 600 min pure clock; ~810 min realistic; with occasional 2×/skip, **12–15 h**.

## 3. Engagement vs. patience — which default?

Design target = the **25–35 min day-session**, which serves both profiles Lucas cares about:

| Profile | Session | Days/session | Playthrough |
|---|---|---|---|
| Binge (Lucas's mandate) | 4–6 h | 8–12 | **2–4 days** / one long weekend |
| Engagement | 45–60 min, 3×/week | 1.5–2 | **4–6 weeks** |
| Casual | 10 min/day | ~1 (with fast + End-day-early) | 1–2 months |

- 12–15 h total is normal for the genre (Stardew year ≈ 20 h; ONI arc 20 h+) and matches "huge and ambitious." It is not "15 h of slow game" because the player holds 2× and Skip.
- Casual players are served by **controls** (2×, Skip to next event, End day early), not by shortening the day — shortening it would re-create the "day passed me by" bug for everyone else.

## 4. Pause-during-dialogue — does it change the recommendation?

Yes, fundamentally: the day length becomes a **cap on free-roam time**, not a content timer.

- Expected timed:paused ratio ≈ 40:60, so a 20-min clock yields a 30-min session for a slow reader and a 24-min session for a fast one. Reading speed stops being a difficulty setting.
- Without pause you would need 30+ min days AND slow readers would still miss scheduled events. With pause, 30-min uniform clocks are unnecessary — kill the Phase 5 "600 s/period" idea in favor of asymmetric 5/10/5.
- Corollary: **auto-pause on scheduled events** (standup starts, class starts, period change). The player physically cannot lose the day to a conversation anymore. This, plus the HUD countdown, is the actual fix for Lucas's 2026-08-29 complaint.

## 5. Concrete recommendation

| Period | Game hours | Real seconds | Clock rate |
|---|---|---|---|
| Morning | 08:00–12:00 | **300** | 0.8 game-min / real-s |
| Afternoon | 12:00–17:00 | **600** | 0.5 game-min / real-s |
| Evening | 17:00–20:00 | **300** | 0.6 game-min / real-s |
| **Day** | 12 game-h | **1200 (20 min)** | HUD derives time-of-day from period progress, so the varying rate is invisible |

Implement as one config map (e.g. `PERIOD_SECONDS = { morning: 300, afternoon: 600, evening: 300 }`) so the Phase 3 change is a one-line diff. Note C-16 (uniform 300) stays literally true today; Phase 3 only extends the afternoon.

**Speed settings (settings menu + hotkeys):**

| Control | Value | Hotkey | Guard |
|---|---|---|---|
| Slow | 0.5× | `1` | never during minigames |
| Normal (default) | 1× | `2` | — |
| Fast | 2× | `3` | never during minigames |
| Skip to next event | — | `N` | resolves/simulates scheduled events, never cancels; blocked during minigames |
| End day early ("go home") | — | `H` | only after 14:00; skips evening social, small morale/economy tradeoff |
| Pause | ∞ | `Space` | already implicit in dialogue |

Plus: **auto-pause + toast** when a scheduled event fires ("Standup is starting — Join / Catch up later (morale −)"), and a HUD line "Next event in mm:ss".

## 6. Rollout by phase

1. **Now (Phase 0):** ship C-16 uniform 300 s (15 min/day). The current 20×20 office fills ~10–12 min; 20 min would already feel dead. Add auto-pause on period change + HUD countdown.
2. **Phase 1 (quests):** unchanged clock; quest dialogue already pauses. Add "next objective" to the HUD.
3. **Phase 3 (schedules, bubbles, multi-room):** go to 5/10/5 = 1200 s. Ship the speed hotkeys + Skip + End-day-early in the same phase — the longer clock and the controls must land together.
4. **Phase 5:** reassess via playtest/screenshot review. If there's dead time, add ambient content (bubbles, side errands), **do not** lengthen the clock.

## 7. Risks / open notes

- **Dead time is the real risk**, not day length. Every period needs at least one player-visible thing happening (schedule moves, bubbles, prompts).
- **Onboarding ≠ pacing.** Day 1 should be gated: the tutorial quest chain should effectively hold the morning open until standup + first conversation + first quest step are done (auto-pause does most of this).
- **Weekends (optional, Phase 5+):** 30 consecutive workdays is grim; 5-day weeks turn the arc into 6 weeks and give natural "week recap" beats. Scope call for Lucas, not part of this recommendation.
- **The 3-min shipped day is 10× too short**; C-16's 15 min is the correct floor; 20 min + controls is the ceiling I'd defend.
