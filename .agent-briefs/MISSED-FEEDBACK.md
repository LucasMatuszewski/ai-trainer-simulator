# Missed feedback (this session)

Each entry: [msg #N | timestamp | category] one-line summary — exact quote.

Status legend (added for triage; quotes are verbatim from
`.agent-briefs/ALL-LUCAS-FEEDBACK-THIS-SESSION.txt`):

- **[NOT CAPTURED]** — not in `docs/LUCAS-FEEDBACK-INDEX.md` AND no matching
  PRD §13 correction / ADR / AGENTS.md rule could be found. Must be added.
- **[VERIFY]** — believed implemented or captured elsewhere, but never
  confirmed back to Lucas (or Lucas explicitly doubted it was documented).
- **[FIXED in-session]** — bug resolved later in the same session; listed for
  the record + regression-test check.
- Messages #107, #111 and the kitchen part of #114 are already captured as
  L-2026-08-30-01/02/03 and are excluded here.

## Visual bugs

- **[NOT CAPTURED]** [msg #110 | 2026-08-30 12:26 | visual-bug] Character model torso: the chest must render in a different color than the rest of the shirt — "Man has Brest!!! Brest has different color than the rest of the shirt!!! There is ZERO interaction and live in this office!!!!" (the chest/shirt two-tone model change itself is nowhere in the index or known corrections)
- **[FIXED in-session — verify regression coverage]** [msg #53/#54 | 2026-08-29 18:50 | visual-bug] desks too deep, NPC stands in the middle of the desk — "you can keep existing width of the desk but make it half the depth, so that person can stend at front of them, not in the middle of them"
- **[FIXED in-session — verify it persisted]** [msg #55 | 2026-08-29 18:51 | visual-bug] second toast/notification hid the first before it could be read — "We need to either show both or wait these 5-7s for the first one to disapear before we show the next one. Ideally show both at once, one under the other, but waiting is also fine" (msg #60 confirms a 2-at-a-time version was shipped)

## Gameplay bugs

- **[FIXED in-session — advanced regression tests exist, see PR-11]** [msgs #56–#100 | 2026-08-29 18:56 – 20:58 | gameplay-bug] WASD stuck-key bug: movement kept going after key release, W never worked, phantom `keyup 'w'` events — "When I keep any of WSAD keys pressed it should keep moving, when I release it should stop... IS IT SO FUCKING COMPLICATED?????????" — eventually fixed via Sol delegation + sequence test ("move forward for 3s, move right for 1s move left for 5s and movee back 2s, and we should expect specific position")

## Design ideas

- **[NOT CAPTURED]** [msg #11 quote | 2026-08-29 ~03:40 | design] location + currency selection in the character-creation form — "aha, do not use only PLN Zł. You may add location inside the initial form to create the user and in case of PL it could be PLN, but user may choose US and use USD or PT and use Eur etc. We can allow any location I guess and any currency, but for now use only English language."
- **[NOT CAPTURED]** [msg #11 quote | 2026-08-29 ~03:40 | design] NPC and place names should follow the chosen location — "Names could be also based on location, not only polish everywhere for everybody! Align NPC names and places names to game location."
- **[NOT CAPTURED]** [msg #7 quote | 2026-08-29 early (pre-02:42) | design] multiple starting professions + full RPG progression economy (currently only stats exist, no XP/levels/skill points/upskilling purchases) — "IT trainer is one of the paths, it could also be a web designer, game developer, but always as a independent individual and with a lot of AI tools and AI agents that he works with. Like in RPG and similators player may choose initial profession and skills (some skill system with points, levels and experience points + economy system + upskilling by attending courses/conferences buying books etc.)"
- **[NOT CAPTURED]** [msg #13 quote | 2026-08-29 ~04:00 | design] phone calls and laptop email as simulated work interactions — "does user need to talk to npc, call phones, send emails on laptop, etc? simulate work in funny ans simple way"
- **[NOT CAPTURED]** [msg #13 quote | 2026-08-29 ~04:00 | design] engagement/replayability design goal: dopamine loop, hazard/randomness, high score — "make it addictive with dopamine increase and some hazard / randomnes elements that will make people want to try, and try again, and try harder, and play and get high score"
- **[VERIFY]** [msg #51 quote | 2026-08-29 ~17:00 | design] genre guardrail (explicit, worth having verbatim in the PRD vision) — "Rather simulation with jokes/irony and economy + elements of RPG, not full immersion. It should be funny game, not immersive game."

## Content ideas

- **[VERIFY — partially built]** [msg #13 quote | 2026-08-29 ~04:00 | content] desk prop wishlist — "paper, desk equipement, laptop/PC, pencil, mug with some funny text/graphic, poster on the wall, callenda, pictures of family in pixel style? etc. etc. be creative, get ideas from GLM." (papers/posters/plain mugs exist; pencil, funny-text mug graphic, wall calendar, pixel family pictures not confirmed anywhere)
- **[NOT CAPTURED — detail]** [msg #21 + #39 | 2026-08-29 13:16 / 16:43 | content] evening behavior: some NPCs stay to play video games on an office TV + console (needs a TV/console prop; C-15 covers "stochastic life" generally, this specific prop/behavior is unconfirmed in the PRD) — "or may stay to play video games on the TV and console - make it random, every day should be different"
- **[VERIFY]** [msg #11 quote | 2026-08-29 ~03:40 | content] GLM dialogue QA pass for humor AND realism vs real IT life (routing to GLM is in PR-5, but the recurring "review dialogues for funniness + realism" QA step is not documented as a workflow) — "use GLM 5.3 for funny ideas and dialogues and make also review of dialogues if they are funny and if they simulate real situations in live of developer / IT admin / AI Engineer / AI Trainer etc."

## Audio

- **[NOT CAPTURED — specifics beyond index L-01]** [msg #8 | 2026-08-29 02:57 | audio] GMI audio pipeline specifics: use ONLY the 3 models from .env (`minimax-tts-speech-2.8-hd`, `minimax-music-3.0`, `MiniMax-M3`), exploit emotion tags ("Emotion auto, calm, happy, sad, angry, fearful, di") and sound-effect tags ("spacious_echo etc. so use them to make the souds more realistic!!!"), English first, then localizations — "you can also check what other languages does Minimax speech support and also generate some popular alternative localizations, e.g. spanish, portuguese, chinese, polish. but first generate English and start other languages only if we still can generate more (if we have quota)". NOTE: the 7-day free window from 2026-08-29 has likely expired — re-check quota before planning around this.
- **[NOT CAPTURED]** [msg #8 | 2026-08-29 02:57 | audio/design] optional LLM logic in game characters — "You can also add some LLM logic to the game and characters if you decide it will help to make it more interactive, but this is optional for now."
- **[COVERED by L-01, keep as example]** ambient keyboard-typing SFX was explicitly named — "Remember also that we need sound effects and music. even keyboard typing would be nice."

## Controls

- **[VERIFY]** [msg #101 | 2026-08-29 21:19 | controls] combined/diagonal movement (W+D, W+A, S+D, S+A must all work simultaneously) — "when I keep presing W and also press D I want to got forward and right, so I can play it as any other game with real controls on the axis of obth forward and right, and both forward and left, and same with backword." (believed implemented via the keys-Set rewrite — confirm and pin with a test)
- **[VERIFY]** [msg #101 | 2026-08-29 21:19 | controls] movement speed tuning / Shift-to-run — "BTW, movement is a little too slow, make it a bit faster. Or add press-shift for running." (SPRINT_MULT exists since the early controls; final tuning never confirmed with Lucas)
- **[OBSOLETE? — decide + record]** [msg #13 quote | 2026-08-29 ~04:00 | controls] scroll-wheel zoom — "Scroll should also change the distance/zoom maybe?" (asked in the over-shoulder era; under FPS C-01 it may be moot or could map to FOV zoom — make an explicit yes/no decision in the PRD)

## NPCs / dialogue

- **[VERIFY]** [msg #103 | 2026-08-29 23:14 | npc] NPC must rotate to look the player in the eyes, WITH animation, the moment a dialogue starts — "not sure if it is in the plan file but make sure that the npc changes direction and looks in players eyes when player starts talking to the NPC so it should rotate when we start talking, rotate with animation" (C-09 walk-to-face says "the NPC turns to face the player" but the animated-rotation requirement was never confirmed back to Lucas)

## WebMCP / tooling

- **[NOT CAPTURED]** [msg #114 | 2026-08-30 12:55 | tooling] save the feedback-extraction as a reusable script under scripts/ — "MAybe a script should extract only my messages longer than ~100-200 characters, and save them in a new file, so you don't have to extract them again, and you can just run this script in the future again if you would need to update the file with my feedback, as a tool in scripts?" (a one-off extraction produced the transcript file; the durable `scripts/` tool was requested and is unconfirmed)

## Other

- **[NOT CAPTURED as a rule]** [msgs #16, #75, #102 | 2026-08-29 05:13 / 19:50 / 22:58 | workflow] use Claude Code monitors to watch delegated CLI agents/processes and auto-retrigger work — "monitor tool should let you iterate and e.g. on 5-30s delay should trigger you again, just to keep you moving and working on the game." / "set the monitor script inside Claude Code, as a tool you have here, to monitor processes and cli agents you delegated to. this will keep you updated on changes." / "use monitors in Claude code cli"
- **[NOT CAPTURED as a rule]** [msg #16 quote | 2026-08-29 ~05:00 | workflow] auto-navigate straight to the 3D office state for visual validation instead of re-screenshotting the title screen — "you make another screen of the first page of the game.... it works, the problem is after we enter 3d view... just automate clicking maybe so that you go stright to 3d to validate it?"
- **[VERIFY — make it a permanent rule]** [msgs #90/#91 + #92 | 2026-08-29 20:28 | workflow] bump and console-log a build/bugfix version after EVERY change so Lucas can always verify he is running the right build — "Maybe you should update some bugfix version after every change so I see if we render new version all the time? maybe in console? We need to have a simple method to test if I test correct version after your changes all the time." (implemented once during the WSAD saga; keep it as a standing rule)
- **[VERIFY — align with PR-11 wording]** [msgs #96 + #98 + #101 | 2026-08-29 20:58 / 21:08 / 21:19 | workflow] never modify a test to make it pass; fix the code until the unchanged test passes — "Do not change the test! Fix the code until the full test pass." / "The full test previouslly correctly tested that the code was broken, the full test should pass after the fix without test code changes.... why you needed to change the test???"
- **[VERIFY]** [msg #63 | 2026-08-29 19:23 | docs] the 5173-vs-4173 port table must also be in README.md, not only AGENTS.md — "Make it clear in README.md and AGENTS.md so agents also know the difference!"
- **[NOT CAPTURED — open decision]** [msg #7 quote | 2026-08-29 early | repo] repo intended to be PUBLIC for promotion (it was created private after a classifier denial; the flip was never revisited) — "yes, it could be public repo for promotional reasons as edukey + devpowers colaboration"
- **[DOC CONFLICT — reconcile]** [msgs #44 + #45 | 2026-08-29 17:08 / 17:17 | docs] time pacing: Lucas said both "10 min/period should be enough. lets test it." AND accepted the opencode 5/10/5 (20 min/day) + speed controls recommendation ("ok, let's test it. we can always change it after tests"). PRD C-16 was revised to 5/10/5 but project AGENTS.md still documents 10 min/period = 30 min/day. One of the two docs is stale — pick one and align AGENTS.md, PRD C-16 and the plan.

## Already reflected elsewhere (found in transcript, not in the index — no doc action needed)

Listed so this audit is exhaustive; each maps to an existing PRD §13 correction / ADR / AGENTS.md rule:

- Founding spec (msgs #4/#5): economic IT-trainer sim, IT Crowd/Silicon Valley humor, pixel-art retro 90s, GALAXY goal, easter eggs/minigames, few high-quality locations, tests+QA+screenshots, delegation → PRD core + ADR-000 + PR-5.
- Mandate / stop-hook goals (msgs #6, #57, incl. "single person mode 100% working and confirmed by me" gate before MMORPG) → C-26 / PR-10 / C-25.
- FPS camera, mouse-look strategy research, Amiga cursor, camera-never-through-walls, 3rd-person cutscenes (msg #36, msg #51 quote) → C-01..C-04, ADR-0007 Pattern D.
- Intro cinematic from a distance (~50-80m), people entering, sky/trees/birds/buildings/road, exterior meshes disposed after (msgs #21, #36.7, #44 ad.1) → C-07.
- NPCs AT desks facing monitors, idle animations, procedural desk/NPC variation (msgs #21, #36.6) → C-08 / C-19.
- Multi-turn dialogue volume + RPG branching + memory (msgs #11, #21, #35, #44 ad.2, #45 Q2) → C-10.
- Walk-to-face before dialogue + meetings/standups/classroom/client-call conversation modes (msg #35) → C-09 / D-17.
- Multi-room world + CTO office + Batman sign + glass wall + "DO NOT BREAK existing room" (msg #34) → C-12 / D-18.
- DevPowers + Edukey branding + WebMCP hackathon (msg #24) → C-13 / C-14.
- NPC stochastic life "BOTH!!!" deterministic + random + named events; 2-4 micro-events/day (msgs #44 ad.3, #45 Q1) → C-15.
- Time scaling + time NEVER advances during dialogue (msgs #21, #44 ad.4) → C-16 hard rule (see doc-conflict entry above for the 5/10/5 vs 10/10/10 discrepancy).
- Stuck-dialogue bug after end-of-day (msg #21) → C-17 / D-24 (fixed, regression-tested).
- Onboarding: cinematic + quest log + Bartek quest + help + in-dialogue introductions, "longer and more clear" (msgs #21, #22 answer, #44 ad.5) → C-18.
- TTS only for important moments; looped lyric-free background music that never interrupts dialogue (msgs #11, #21) → C-20 + index L-01.
- Never show the building from the top / no flying during gameplay (msg #21) → C-21.
- Office-themed quests/goals + 30-day 5-chapter questline (msgs #21, #45 Q4) → C-22 / D-29.
- NPC portraits: simple vector/programmatic, more variation, not all clones (msg #45 Q5) → C-12a.
- MMORPG endgame: players + agents via WebMCP, cooperation, rivalisation, rankings, only after single-player is confirmed (msgs #44 ad.3, #57) → C-25.
- Delegate / team of game developers / character designer / story writer (msgs #21, #39) → C-24 / PR-5.
- Commit granularly, push at end of phase, revert on serious breakage, research 3D testing + TDD (msg #38) → PR-4 / PR-8 / PR-11.
- "STOP, add all insights + rules to AGENTS.md" and do-not-ignore rules (msgs #33, #44) → HR-1 / PR-9.
- Mood and aggression when reporting bugs must stay (msg #37) → C-11.
- Live preview requirement + 5173 vs 4173 confusion (msgs #52, #58–#63, #66) → AGENTS.md "Which port to use" section.
- Keep the task list aligned with doc changes, e.g. Phase 2 re-labelled to FPS (msgs #49/#50, #105) → process, done at the time.
- QA every visual change + Sol/Codex code reviews (msgs #106, #64) → PR-2 / PR-4 step 6.
- First-note-then-search ordering of feedback capture (msgs #108, #112, #116/#117) → PR-12.
- Early-session rendering bugs (near-black scene, missing lights, single-axis mouse-look, `movementX/Y`=0 when unlocked, pointer-lock failures in headless, imperceptible walk speed, Playwright blank-WebGL screenshots) — all fixed same session (msgs #10–#32); methodology captured in the threejs-visual-qa skill + PR-11.
