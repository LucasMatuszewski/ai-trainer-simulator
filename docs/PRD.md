# PRD — AI Trainer Simulator (working title)

**Status:** Living document. Updated 2026-08-29 with major corrections from Lucas — see section 13 ("Corrections Log") for the full changelog. The corrections were substantial enough to trigger a re-design of the camera, controls, NPC presentation, intro cinematic, and dialogue system; this PRD reflects the post-correction direction.

---

## 1. Executive Summary

A single-player 3D retro pixel-art browser game where the player takes the role of an IT trainer/consultant trying to build a profitable training business without going bankrupt. The game is a **first-person 3D walk-around** inside a 20x20-unit office (NOT over-the-shoulder — see correction C-01), with an RPG-lite stats/dialogue system, mini-games that parody real IT-folk experiences, and a long-term escalating goal ("best IT trainer in the GALAXY"). Tone is IT Crowd + Silicon Valley. This document covers the **vertical slice MVP** — one location, one mini-game, deep dialogue system, core loop playable in 5 minutes. Larger scope is documented under "Further Iterations" in section 12.

The game is intended to be a real, playable, full game — not a tech demo. Lucas's directive: "make it the best simulator business retro game in the history, a real game, not just simple demo, make it huge and ambitious! ... Do not stop until you have detailed graphics, funny storyline, high engagement, working mechanics, and no bugs at all." The Definition of Done for the whole project is therefore much higher than for an MVP: every dialogue tree must be 4-8 questions deep, every NPC must have a real life (schedule, walk animation, inter-NPC bubbles), the office must look lived-in, and the intro must be a real cinematic.

---

## 2. Problem Statement

Lucas (developer, trainer) wants a long-running, ambitious, opinionated hobby game that:
- makes him and other IT people laugh (in-group humor),
- lets him practice building a 3D browser game from scratch,
- produces a public demo he can show off,
- is large enough to iterate on for weeks/months without feeling empty.

There is no off-the-shelf game that does this. Custom build.

---

## 3. Users / Personas

- **Lucas (developer-pilot).** Wants to build, iterate, and be amused by the result. Cares about technical quality, taste, and Easter eggs more than raw playtime.
- **IT/developer audience.** Visiting the public demo. Wants to recognize the jokes immediately, laugh, and explore. Sessions of 5-15 minutes. No install.
- **Curious gamers.** Found via Hacker News / Reddit / a blog post. Need the game to be self-explanatory in under 60 seconds.

All three want the same first impression: a charming, weird, *recognizable* pixel-art world that takes itself just seriously enough to be funny.

---

## 4. Main Flows

### 4.1 First-launch (new game)
1. Player loads the page. Game initializes in <2s on a mid-range laptop.
2. Title screen shows game name, "New Game" / "Continue" buttons. No save exists yet, so "Continue" is disabled.
3. Player clicks "New Game". A short character-creation modal appears.
4. Player picks a **starting specialization** (Frontend, Backend, DevOps, AI/ML, "Generalist" — placeholder text, real copy in section 5).
5. Player picks a **starting personality trait** (e.g. "Coffee-Fueled", "LinkedIn Influencer", "Debugger by Trade", "Wing-It").
6. Player names their character (or accepts a default like "Alex").
7. Game spawns the player in the office. A floating "thought bubble" plays for 5 seconds: an in-character monologue about their first day.

### 4.2 Walk and explore (the core loop) — REVISED 2026-08-29 (C-01, C-02, C-03, C-04)

**Camera mode: First-person (NOT over-the-shoulder).** The camera is the player's eyes; no player avatar is visible in the regular office view. The player sees the world from eye level (~1.65m). This is the standard 3D-RPG convention (Morrowind, Deus Ex, Stardew's "look-around" mode, modern immersive sims). Over-the-shoulder was tried first and rejected: the player can clip through walls (camera goes through the wall but the avatar cannot), the controls are confusing (the user reported "the mouse rotates the camera around the character, I want to simulate that I'm moving the direction of the character"), and at 480x270 a third-person avatar takes up too much screen real estate.

**Why first-person is the right choice for this game (research, see C-04):**
- The player IS the trainer. First-person = body ownership. The player sees what the trainer sees.
- The "office as world" framing works: the player is inside the office, not watching themselves inside the office.
- Wall collision is solved trivially: if the player can't go through the wall, the camera can't either. No special "camera collision" code needed.
- NPC interaction distance is obvious: the player walks to a desk and stands in front of it.

**Controls (default, see C-02 for the design research):**

The user's explicit request: "I want to simulate that I'm moving the direction of the character and then I can use WASD to move, with W to move in the direction when mouse is pointing." This is the standard FPS-RPG control scheme. After research, the chosen control scheme is:

- **WASD** = move the player in world-relative directions, OR camera-relative. **Default: camera-relative** (W = forward, where the camera is looking). The two layouts: **WASD** (modern) and **arrows + mouse-look** (oldschool). Player chooses in settings. Both work the same way internally — both move relative to camera yaw.
- **Mouse** = rotate the camera (yaw + pitch). The player avatar turns to face the new yaw, so what the player sees is consistent with what direction the avatar is "looking."
- **Right mouse button HOLD** = mouse-look mode (alternative to free mouse). In this mode, the OS cursor is hidden and the mouse moves rotate the view. Releasing RMB returns to free mouse for clicking UI buttons. (This is the model used in Deus Ex, Skyrim, many immersive sims — see C-02 research.)
- **Shift** = sprint.
- **E** = interact (talk to NPC, use object). Trigger volumes are around NPCs and objects. When inside a trigger, an on-screen prompt appears: "[E] Talk to Bartek" / "[E] Use Coffee Machine". Pressing E opens the dialogue or activates the object.
- **Click (left)** = also a way to interact (alternative to E). On a click, raycast from the camera through the cursor; if it hits an NPC or interactive object, activate it. The click-to-talk raycaster is the **primary** interaction for NPCs in third-person-friendly code paths; E is a convenience for keyboard-first players.
- **Esc** = open the in-game menu (Career, Inventory, Settings, Save, Quit to title). Also closes the dialogue overlay if one is open.
- **Tab** = toggle the office roster panel (the right-side card list of coworkers).
- **M** = mute / unmute audio (when added in a later phase).
- **?** (Shift+/) = open the help modal (added in Phase 1, persisted into MVP).

**Navigation model (C-02):**
- **Default state: free mouse.** The OS cursor is visible. The cursor is hidden ONLY when RMB is held for mouse-look. This solves the original problem ("my mouse gets out of the screen when I want to move more in one direction") because the mouse does not rotate the view at all when not in mouse-look mode.
- **Roster panel** is the primary way to choose who to talk to from a distance: it's a card list on the right side of the screen with each NPC's portrait, name, and role. Click a card → walk-to-NPC initiated OR direct dialogue open (decision per scope below). The roster is **larger and more readable** (C-06) than the current tiny names: 16-18px font, generous padding, pixel-art styled buttons.
- **Walk-to-talk**: when the player clicks a roster card or an in-world NPC, the player avatar automatically walks to a stand-in-front-of-the-NPC position (face-to-face). When the avatar arrives, the dialogue opens. See C-09 for the auto-walk spec.
- **NPC auto-turns to face the player** when the player is within talking range (C-09). The NPC rotates its body to look at the player. This is the standard RPG behavior and is missing in the current build.

**Custom cursor (C-03):**
- The OS cursor is REPLACED by a pixel-art Amiga/retro cursor inside the game. The default state: a small chunky crosshair / arrow sprite, hand-drawn in the same pixel art style as the rest of the game. This solves the "normal cursor, that should be hidden" complaint.
- Cursor states: **default** (arrow/crosshair), **hover NPC** (changes to a "speech bubble" icon, indicating "click to talk"), **hover interactive object** (changes to a "hand" icon), **busy** (a spinning loading icon when the game is loading a save / streaming a scene).
- The cursor is implemented as an HTML element on top of the canvas, NOT a CSS `cursor: url(...)` (CSS cursors are blurry at 480x270). The custom cursor element is `position: absolute`, follows `mousemove` events, hides the OS cursor (`cursor: none` on the canvas), and renders the pixel-art sprite.

**Trigger volumes and prompts:**
- Walking into a **trigger volume** (a desk, a colleague, a vending machine) shows a context prompt in the bottom-center of the screen: "[E] Talk to Bartek" / "[E] Use coffee machine" / "[E] Sit at your desk". The prompt respects the cursor state: when the cursor is over a different interactable, the prompt follows the cursor's hover target instead.
- Pressing E starts the interaction:
  - **NPCs** = open dialogue overlay (see 4.3).
  - **Objects** (coffee machine, whiteboard, vending machine, your own desk) = play a short gag animation and may give a small buff, a stat, or an Easter egg.
- The player can press **ESC** at any time to open the in-game menu: Career / Inventory / Settings / Save / Quit to title.

### 4.3 Dialogue — REVISED 2026-08-29 (C-09, C-10)

**The user explicitly called out the current dialogue as broken: "after I provide answer to the question in the dialogue it's the end of the conversation.... WHAT???? WTF???? Only one question and one answer? thats it? Is it how it looks like in any real office?????? SIMULATION!!! Remember!!! Not only simulation of the in-work life, but also meetings with clients, daily standups, courses where we are a trainer and we are in a class and people are listening (or not... ;) we can have funny situations with challenges)."**

The dialogue system must support:
- **Multi-turn conversations**, not single Q-and-A. A typical NPC conversation has 4-8 player turns and 8-12 NPC lines. Bartek's first-day onboarding is 6-10 turns minimum.
- **Contextual re-entries**: a player talking to Marek for the first time today vs. the third time today gets a different greeting, different lines, different outcome. NPCs track "how many times talked today" and "what was the last topic."
- **Long dialogue trees** (50+ nodes per important NPC, with branches gated on flags and stats). Important NPCs (Bartek, Zosia, the CTO, the client) have conversations that can last 5-10 minutes of real time.
- **Conversation modes**: 1-on-1 (standard), meeting (multiple NPCs in one dialogue), classroom (player is the trainer, NPCs are students, with Q&A), client call (NPC pretends to be a client, player has to handle their demands).
- **Topic continuity**: an NPC remembers what the player just told them ("oh, you mentioned you were late to the standup — guess who's late to the retro? Same person.").

**Dialogue spec (C-10):**

1. **Walk-to-face**: when the player initiates a conversation (via E, click, or roster card), the player avatar auto-walks to a "stand in front of the NPC" position. The NPC turns to face the player. The camera stays first-person. The dialogue opens only when both are in position and facing each other. (C-09 — solves "now I talk to the back... And after I provide answer to the question in the dialogue it's the end of the conversation" — current bug: talking to the back of the NPC's head with one question/answer.)
2. **Multi-line node**: each dialogue node is an NPC line PLUS a player question/response choice. The structure is:
   ```
   NPC: "Did you see Tomek's commit this morning?"
   Player options:
     A. "Yeah, that's a hard pass from code review."
     B. "I'm staying out of it."
     C. "I have thoughts. Several."
   ```
3. **Per-option NPC reaction**: each option leads to a different NPC follow-up line (A might lead to "I knew you'd say that. Want me to revert it?" B to "Wise. Cowardly, but wise." C to "Go on, I'm listening."). This is what makes a conversation feel real — the NPC reacts to what you said, not just advances to a script.
4. **Gating**: dialogue options can be gated on flags (e.g. "Did you read the docs?" only appears if `readDocs` flag is set), stats (e.g. credibility > 50 unlocks a tougher/funnier option), or relationship (e.g. NPCs share gossip only at high relationship). The current build has none of this.
5. **Multi-NPC conversation**: in meetings and classrooms, multiple NPCs speak in sequence. The dialogue UI shows the current speaker's portrait and name; the player can pick "OK" or "Reply" between speakers. Decisions made in a meeting can affect all present NPCs' relationships.
6. **Conversation memory**: after a conversation ends, the NPC's `lastTopic` and `lastMet` flags are set. The next conversation starts from those flags. "Oh, you came back. Last time you were asking about Tomek's commit. I have an update: he pushed another one. The same one."
7. **Time pause**: while any dialogue overlay is open, the in-game time clock is paused. No more "day passed while I was reading." (Already added in Phase 0, but reinforce as AC.)
8. **Camera**: the dialogue overlay covers the bottom 40% of the screen. The top 60% shows the office, with the NPC the player is talking to clearly visible (because the player walked to face them).

**Dialogue UI:**

- Bottom 40% of screen, semi-transparent dark panel.
- Left: NPC portrait (64x64 pixel art, possibly animated blink; 96x96 for important NPCs).
- Top of panel: NPC name + small role subtitle ("Senior Consultant", "The Manager", "The Intern").
- Center: NPC's current line, word-wrapped, pixel font, animated typewriter effect (one character at a time, fast, ~30 chars/sec, so 4-6 seconds for a typical line). Click anywhere to skip the typewriter.
- Bottom: 2-4 response options as horizontal pill buttons, hover effect, click to choose. The current speaker's name and the current turn count are shown in the top-right ("Bartek · turn 3/8").
- Top-right: a small "Skip" button that auto-advances to the last line; holds for 2 seconds to confirm.
- When a conversation has more than one NPC present (a meeting), the portrait area shows the current speaker, with a small "next: Zosia" indicator below.

**Conversations to ship with the MVP (examples, full list in `content/dialogues.ts`):**
- Bartek (team lead) — onboarding (6-10 turns), first assignment (4-6 turns), how-is-the-team-going (3-5 turns), asking for a raise (4-6 turns).
- Zosia (the manager) — first impression (4-6 turns), weekly 1-on-1 (6-8 turns), how is the project going (4-6 turns), performance review (8-12 turns).
- Marek (the engineer) — coffee, code review request, "did you see this PR", rant about Jira.
- Klaudia (LinkedIn) — networking pitch, "thoughts on this post?", career advice, gossip.
- Janusz (the janitor) — knows everything, "let me tell you about that guy in accounting", office lore.
- Burek (the office dog) — not a conversationalist, but approaches the player and accepts pets.

**The "SIMULATION" promise (C-10):** every NPC has a daily life, a schedule, an opinion about every other NPC, and a memory of past conversations. Talking to the same NPC 3 times in a day gives 3 different conversations. The conversations get more interesting (or more awkward) based on the player's choices. The "real playable game" definition of done is: a player can spend 30 minutes in the office talking to NPCs, attending meetings, and going to the coffee machine without ever feeling like the game is repeating itself.

### 4.4 Mini-game (Debug the Script)
1. Triggered by a specific NPC ("Hey, can you fix this script?") or by clicking a specific computer.
2. A side panel opens with a fake code editor showing a 30-50 line script in some IT-flavored language (Python-ish, with comments).
3. Three lines are subtly wrong (off-by-one, typo, missing semicolon, wrong import). One is just a stylistic issue. The player must click on the actual bugs.
4. Time limit: 60 seconds. Wrong clicks reduce a "credibility" bar; running out of time fails.
5. Success pays the player (random amount, e.g. 200-500 zł) and adds a small XP boost. Failure loses credibility and (sometimes) a small amount of money (a "refund" you have to give back).
6. The whole mini-game is skippable after a few failures (player gets a "maybe IT isn't for you" gag and walks away).

### 4.5 End of day / economy tick
1. At the end of each in-game day (or every 5 minutes of real time for the MVP), the game tallies income vs expenses and shows a "Daily Summary" screen:
   - **Income:** mini-game payouts, passive contract payments.
   - **Expenses:** rent for the office, coffee, ramen, "LinkedIn Premium" (joke subscription), incidentals.
   - **Net cash change.**
2. If cash < 0, the player gets a "You're in the red" warning screen with a countdown to bankruptcy (e.g. "30 in-game days until you can't afford rent").
3. If cash > some threshold (e.g. 5,000 zł) for several days, the player can pay to **expand the office** (one new piece of furniture / one new NPC / one new mini-game). The expansion is announced with a "trophy" or "achievement" gag.

### 4.6 Game over
1. Bankruptcy triggers a Game Over screen with a final leaderboard-style line: "You survived X days, earned Y zł, and made it to the rank of [NPC-derogatory title]."
2. Player can return to title or load a manual save.

---

## 5. User Stories

- **As a new player**, I want to be confused for at most 30 seconds so that I can start having fun immediately.
- **As a returning player**, I want a manual save so that I can come back tomorrow.
- **As an IT worker**, I want to recognize every NPC and every line of dialogue so that I laugh out loud.
- **As Lucas**, I want to be able to add a new mini-game in a single sitting so that the game keeps growing.
- **As a player who just wants to explore**, I want to find at least 3 hidden Easter eggs per location so that I feel rewarded for wandering.
- **As a player who keeps losing money**, I want a difficulty curve that punishes me for one bad day but doesn't bankrupt me in week one.
- **As a casual visitor**, I want the game to load fast and not require a tutorial so that I can show it to a friend in 30 seconds.

---

## 6. Acceptance Criteria

### AC-General
- AC-G-01: Game loads in <3s on a mid-range laptop (Intel i5 / 8GB / integrated graphics) in modern Chrome.
- AC-G-02: No console errors during normal play.
- AC-G-03: Save/load works in `localStorage`; no server, no account.
- AC-G-04: All text in the MVP is in English. (Polish voiceover is out of scope for MVP.)

### AC-Movement
- AC-M-01: WASD moves the player smoothly at a reasonable walk speed (3 units/sec, sprint 5).
- AC-M-02: The player cannot walk through walls, desks, or NPCs (collision works).
- AC-M-03: The camera follows the player and rotates with mouse movement, clamped between -45° and +60° pitch.

### AC-Dialogue
- AC-D-01: Pressing E near an NPC opens a dialogue overlay with at least 2 response options.
- AC-D-02: Each dialogue option is a full sentence that fits the character.
- AC-D-03: Dialogue closes on the last line and returns to gameplay without freezing.

### AC-Mini-Game
- AC-MG-01: The "Debug the Script" mini-game can be opened, played, won, lost, and re-entered without page reload.
- AC-MG-02: On a win, the player's cash increases by the displayed amount and a success animation plays.
- AC-MG-03: On a loss, no cash is added and a "try again" prompt appears.

### AC-Economy
- AC-E-01: The cash counter updates in real time when money is gained or spent.
- AC-E-02: A daily summary screen appears at the end of each in-game day.
- AC-E-03: Bankruptcy (cash < 0 for 30 in-game days) triggers a Game Over screen.

### AC-Comedy
- AC-C-01: The MVP has at least 20 distinct dialogue lines and at least 10 hidden Easter eggs (signs, posters, console logs, etc.).
- AC-C-02: Every NPC has at least 5 dialogue options across all visits.

---

## 7. Out of Scope (MVP)

- **Multiplayer / online features.**
- **Mobile / touch controls.** Desktop browser only for MVP.
- **Sound effects / music.** Deferred to a later iteration (but the game should be designed so sound is easy to add).
- **Localization.** English only for MVP; copy should be authored in a way that makes translation easy.
- **More than one location.** One office for MVP.
- **More than one mini-game.** "Debug the Script" only for MVP.
- **Procedural content.** All dialogues and Easter eggs are hand-authored for MVP.
- **Real-life tracking of training, billing, etc.** This is a parody sim, not an enterprise tool.
- **Auth, accounts, cloud saves.** `localStorage` only.
- **Achievements, leaderboards, daily challenges.** All post-MVP.
- **AI opponents / LLM-driven dialogue.** All NPC dialogue is pre-written.
- **Vehicle, mount, or any "fast travel" mechanic.** Walking only.
- **Photo mode, replay, or spectator features.** (Could be a fun post-MVP add.)

---

## 8. Constraints

### Business
- No third-party legal risk. All copy is original or short fair-use references. No copyrighted character sprites, no third-party trademarked logos in screenshots. (Half-Life lambda symbol is a possible easter egg but should be stylized, not a direct asset copy.)
- Open-source friendly: code is intended to be released as a public repo.
- No telemetry, no third-party analytics. The game does not phone home.

### Functional
- Browser: latest Chrome and Firefox. No Internet Explorer, no Safari required for MVP.
- Single tab. No background tabs.
- No login.
- Resolution: works at 1280x720 minimum. Up to 1920x1080 tested. UI scales.
- Performance: 60 FPS target on integrated graphics at native resolution, post-process upscale is cheap.
- Save file is JSON in `localStorage`, under a versioned key. Save format is documented for forward-compat.

### External References
- All art assets are hand-authored or procedurally generated. No third-party 3D model files. (Pixel-art texture atlases are fair game if made from scratch.)
- All copy is original.

---

## 9. UI Description (wireframe level)

### 9.1 Title screen
- Full-screen pixel-art splash (the office with the player character standing outside the door).
- Center: game title in chunky pixel font.
- Below: two buttons, "New Game" / "Continue". Continue is disabled if no save.
- Bottom: small text "v0.0.1 MVP — a Lucas Matuszewski project".
- Background: subtle parallax (ceiling fan turning, pixel-art clouds outside the window).

### 9.2 Character creation
- Modal: name input, two-column list for specialization and trait (radio buttons with pixel-art icons).
- Right side: live preview of the character (the office character, swapping hat / shirt / accessory per selection).
- Bottom: "Begin" button. Disabled until name is non-empty.

### 9.3 Office (main game view)
- 3D viewport, ~70% of the screen.
- Bottom-left: cash counter, day counter, current time-of-day icon.
- Bottom-right: 4 quick-slot icons (empty for MVP, reserved for future items).
- Top-right: settings cog, save icon.
- Bottom-center: context prompt when near an interactable: "[E] Talk to Bartek" / "[E] Use Coffee Machine".
- Top-left: a small minimap (post-MVP, but a placeholder "Minimap — coming soon" gag in MVP).

### 9.4 Dialogue overlay
- Bottom 40% of screen, semi-transparent.
- Left: NPC portrait (64x64 pixel art, possibly animated blink).
- Center-top: NPC name and a small role subtitle ("Senior Consultant", "The Manager", "The Intern").
- Center: dialogue text, word-wrapped, no typewriter effect for MVP (chunky instant text for retro feel).
- Bottom: 2-4 response options as horizontal pill buttons, hover effect, click to choose.
- Top-right of overlay: small "Skip" button (auto-advances to the last line, holds for 2s to confirm).

### 9.5 Mini-game (Debug the Script)
- Side panel slides in from the right, ~40% width.
- Title: "Debug the script — earn up to 500 zł".
- Body: a fake code editor. Monospace pixel font, syntax highlighting (very basic — keywords in one color, strings in another, comments grey).
- One of the lines is highlighted on hover; click to flag it as a bug. Flagged lines get a red squiggle underline.
- Bottom: "Credibility" bar (green to red), "Time" countdown, "Submit" button.
- On win: confetti animation, payout popup, "Done" button to close.
- On loss: a "FAILED" splash, refund/gig-loss popup, "Try Again" / "Walk Away" buttons.

### 9.6 Daily summary
- Modal: "Day X Summary".
- Line items, with green (+) and red (-) labels and zł amounts.
- A "Daily Meme" at the bottom — a single line in pixel font, different each day, mostly IT jokes. ("Today's meme: 'This is a 10x engineer.' — A quote that has never applied to anyone.")
- "Continue" button.

### 9.7 Game over
- Full-screen black with white pixel text.
- "YOU WENT BANKRUPT ON DAY X."
- Stats: cash earned total, mini-games won, days survived, NPCs befriended.
- A final line: "Maybe try [NPC-derogatory title] next time."
- "Back to Title" button.

---

## 10. User Flow Diagram

```mermaid
flowchart TD
    Start[Page Load] --> Title[Title Screen]
    Title --> NewGame[New Game]
    Title --> Continue[Continue]
    NewGame --> CharCreate[Character Creation]
    CharCreate --> Office[Office - Day 1]
    Continue --> Office

    Office --> Move{Walk around}
    Move --> NearNPC[Near NPC?]
    Move --> NearObj[Near Object?]
    Move --> NearComputer[Near Computer?]

    NearNPC --> Talk[Press E: Dialogue]
    Talk --> Choice{Pick response}
    Choice --> NextLine[Next dialogue line]
    NextLine --> More{More lines?}
    More -->|Yes| Choice
    More -->|No| Office

    NearObj --> ObjAction[Use object]
    ObjAction --> Gag[Short gag animation]
    Gag --> Office

    NearComputer --> Debug[Open Debug mini-game]
    Debug --> BugCheck{Win or lose?}
    BugCheck -->|Win| Pay[Payout]
    BugCheck -->|Lose| Punish[Lose credibility]
    Pay --> Office
    Punish --> Office

    Office --> Tick[End of day tick]
    Tick --> Summary[Daily summary]
    Summary --> CheckBankruptcy{Cash < 0?}
    CheckBankruptcy -->|No| Office
    CheckBankruptcy -->|30 days in red| GameOver[Game Over Screen]
    GameOver --> Title
```

---

## 11. Agent / System Behavior Specification

Not applicable. There is no LLM/AI agent in the MVP. All NPC dialogue is pre-written.

(If a future iteration adds an "AI-driven HR Manager" NPC that improvises dialogue via an LLM, this section will be expanded. For MVP, the player does not interact with any AI/LLM.)

---

## 12. NPC life, world simulation, intro, and visual variety — NEW 2026-08-29

This section captures all the new "world feels alive" requirements from Lucas's feedback. They are not MVP-blockers individually, but they are the difference between "a working demo" and "a real playable game."

### 11.1 NPC life (per-period schedule) — Phase 3

Each NPC has a per-period schedule (morning / afternoon / evening) that defines where they are, what they're doing, and which way they face. The schedule is deterministic — same NPC, same period, same place — but the player perceives variation because NPCs move at different times and go to different places.

Examples:
- **Marek** — morning: at his desk, head down. Mid-morning: at the coffee machine, talking to Zosia. Afternoon: in a meeting in the meeting room. End of day: gone home.
- **Pawel** — the social one. Morning: walking around talking to people. Mid-morning: coffee machine. Lunch: gone. Afternoon: meeting. Evening: gone.
- **Burek** (the office dog) — random walk around the office, follows whoever has food, sleeps under a desk in the afternoon.
- **The CTO** — only appears in the morning. Afternoon: gone (he's "remote"). Evening: gone.
- **Janusz** (the janitor) — arrives late (10am), cleans, leaves by 5pm. In between: he tells you the office gossip.

The schedule is in `src/content/npc-schedule.ts` and is pure data, fully unit-testable. The runtime walks each NPC toward their current period's target with the same AABB collision the player uses.

### 11.2 Inter-NPC dialogue and speech bubbles

When two NPCs are within 2.5m of each other, every 8-12 seconds there's a 25% chance one of them "says something" to the other. A small speech bubble (a `THREE.Sprite` with `CanvasTexture`, `sizeAttenuation: false` for constant on-screen size) appears above the speaker's head for 4-6 seconds with one line of text.

The text is drawn from a curated pool of inter-NPC lines (50+ lines, hand-written for comedy, GLM-brainstormed for variety). Examples:
- "Did you read the daily meme?"
- "Did you push to main again?"
- "The coffee is cold. Again."
- "I have a meeting about a meeting."
- "Have you tried turning it off and on again?"
- "Jira is down. I repeat: Jira is down."

Bubble is drawn at the NPC's head position, with a small tail pointing to the speaker. Multiple bubbles stack vertically if two NPCs are talking to each other at the same time.

### 11.3 NPC variation, sitting positions, and animations

The user explicitly called out: "People are still sitting in the middle of the desks, not next to the desk working. It's strange. We also should add some animations, now they sit like robots/objects, not like humans, and they should not sit all in exact same position. Desks also should not be exact clones, add some variations."

Per the corrected build:
- **NPCs sit AT the desk, not in the middle of it.** The sitting position is at the chair (behind the desk, facing the monitor), not in the middle of the desk surface.
- **Monitor is on the BACK edge of the desk, facing the NPC.** The NPC's monitor and the player's view of the NPC's monitor must look the same.
- **NPCs rotate to face their monitor** (or their current schedule target) when "at desk."
- **NPCs have idle animations:** while at desk, they occasionally:
  - Type (the hands move up and down for 0.5-1.5 seconds, every 4-8 seconds)
  - Stretch (the avatar's arms go up, 1-2 second animation, every 8-15 seconds)
  - Sip coffee (hand goes to mouth, 1 second, every 6-12 seconds if they have a coffee mug)
  - Look around (head rotates ±30° once, every 5-10 seconds)
  - Lean back (1-2 second lean, every 10-20 seconds)
- **NPC walk animation:** while `state === "walking"`, a sine-wave bob on Y (±0.05m, 4Hz) plus an arm-swing.
- **NPCs are not in identical positions.** Each NPC's chair is offset by a small random amount in the X/Z plane (e.g. ±0.05m), so they don't look like clones. The desk positions are also randomized slightly per-NPC.
- **Desks are not exact clones.** Each desk has a random tint of wood color (warm, dark, or light), a random mug color (red, blue, green, yellow, white), and a random set of items on it (mug, laptop, notebook, sticky notes, plant, family photo). Procedurally varied at scene-build time, not hand-placed.
- **NPC body color is varied per-NPC.** The body color, hair color, and skin color differ per NPC. The user mentioned wanting a "feel" of individuality.

### 11.4 Day-1 intro cinematic

**Before correction:** the game started abruptly at a broken camera angle (the player was outside the office looking at the roof). The user: "I still see the building from the outside when we start, only the roof or the wall, and it moves to inside after a while."

**After correction (C-07):**

A real, multi-stage intro cinematic that runs ONCE on the player's very first session (subsequent day-starts skip the cinematic and pan inside instead):

1. **Fade from black** (0.5s).
2. **Exterior establishing shot** (1.5s). Camera at (0, 4, 35) looking at (0, 4, 0). The office building is visible. Around it: trees, a skybox with moving pixel-art clouds, birds flying across (3-4 small sprites on a loop), a road with the occasional pixel-art car driving past, neighboring buildings (other offices, lower-poly to save performance). A short title overlay: "AI Trainer Simulator — A day in the life of [player name]."
3. **Camera dollies toward the entrance** (2.0s). Camera at (0, 4, 35) → (0, 1.7, 8). Music fades in (chiptune, per-period theme).
4. **Approach the door** (1.5s). Camera at (0, 1.7, 8) → (0, 1.65, 0). Player sees the door approach.
5. **Walk through the door** (0.7s). Camera passes through the door, fading to black briefly.
6. **Fade in inside the office** (0.5s). The player is at the door, inside the office, first-person. Time-of-day is morning. Several NPCs are visible — some walking in from the door (Tomek, Klaudia), some already at their desks (Marek, Bartek), the dog Burek is sniffing around.
7. **First-message** (3s on screen). A dialogue from the player character (inner monologue, not voiced): "Day one. Don't mess up. Don't mess up. Don't mess up."
8. **Cinematic ends.** Control handed to the player. The roster panel slides in from the right with a "Click a coworker to talk" tooltip. A quest log appears bottom-right: "Talk to Bartek — your team lead."

**Memory management:** all exterior meshes (trees, skybox, road, neighboring buildings, birds) are unloaded after the cinematic completes. They are not kept in memory during office play because the player never sees them again (except on game-over, where a brief "you walk out of the office" plays). Unloading is done with `dispose()` on geometries/materials and `removeFromParent()` on the meshes.

**Subsequent day-start (every morning, days 2+):** a shorter, 3-second "day start" pan. Camera at the spawn position, slowly panning across the office to a "view of the office" angle, then settling into first-person. No exterior shown. Quest log shows today's first quest.

### 11.5 The "real playable game" promise

The user's mandate: "Remember, your goal is to make this game perfect, real playable game, best game in this category on the market!" and "Continue until you make this game perfect!"

The Definition of Done for the whole project, not just the MVP, includes:
- The player can spend 30 minutes in the office without feeling like the game is repeating itself. (NPC schedules, varied dialogues, daily events, classroom mode.)
- Every NPC has a "personality" the player can articulate after 5 minutes of play. ("That's the guy who pushes to main on Fridays." "That's the one who knows all the gossip." "That's the dog.")
- The office feels lived-in: mugs are not all the same color, the whiteboard has yesterday's standup notes still on it, the calendar on the wall is wrong (showing last week's dates — someone forgot to flip it).
- The intro is real: trees, birds, neighboring buildings, the works. Players screenshot the intro.
- Dialogue is real: 4-8 turns minimum per conversation, NPC reacts to what the player said, NPCs remember past conversations.
- The game keeps surprising: random events, classroom mode, "Tomek pushed to main" notifications, the coffee machine is broken, etc.

This is a 30+ day project, not a 1-week MVP. The phased plan in `.claude/plans/glistening-napping-hinton.md` is the working roadmap.

---

## 13. Corrections Log

This section is the authoritative list of corrections Lucas has given. New corrections are appended with the date and a unique ID. Each correction IDs the section it changes.

### 2026-08-29 (corrections-log entry) — C-16 conflict resolved

A C-16 contradiction between two of Lucas's messages was surfaced and resolved.

- **Conflict:** C-16 was first revised to "10 real minutes per period, uniform, 30 min/day" in response to Lucas's earlier "10 min/period should be enough, let's test it" message. But Lucas's later answer to the explicit question "5/10/5 (20 min/day) + speed controls — take it?" was "ok, let's test it. we can always change it after tests." The earlier override and the later acceptance of the opencode recommendation were in tension.
- **Resolution:** Adopt the opencode 5/10/5 + speed controls recommendation. The user's later explicit confirmation supersedes the earlier override. C-16 has been re-revised to "5/10/5 asymmetric = 20 min/day + speed controls (0.5x / 1x / 2x / Skip / End-day-early / Pause)." Constants: `PERIOD_SECONDS = { morning: 300, afternoon: 600, evening: 300 }` = 1200s total. The rollout per phase (Phase 0 uniform 300s → Phase 1 auto-pause + HUD countdown → Phase 3 5/10/5 + speed controls) is preserved.
- **HR-2 / HR-4 lesson:** when a later user message contradicts an earlier one, surface the conflict and ask; do not silently pick one. The orchestrator did surface it. The later explicit confirmation wins.

### C-01 — First-person instead of over-the-shoulder (2026-08-29)

- **Section changed:** §4.2 (Walk and explore), §6 AC-Movement, §11 (NPC life).
- **Was:** Camera was over-the-shoulder (camera 4m behind the player, FOV 42, looking at the player's chest). Player avatar always visible.
- **Now:** First-person. Camera is the player's eyes. No avatar visible during play. Player avatar IS visible in cutscenes (intro, end-of-day "leave the office" cinematic) where the camera dollies around them.
- **Reason:** The user found the over-the-shoulder controls confusing ("the mouse rotates the camera around the character, I want to simulate that I'm moving the direction of the character"). First-person = the player IS the trainer. Wall collision is trivial. Matches standard 3D-RPG convention.
- **Implementation:** `src/engine/controls.ts` is rewritten to use `camera.position = player.position + (0, EYE_HEIGHT, 0)` and `camera.rotation = (pitch, yaw, 0)`. Mouse delta updates yaw/pitch directly. The mouse does NOT orbit around the player; the player avatar turns to face the yaw direction.

### C-02 — Mouse-look mode and navigation decision (2026-08-29) — REVISED 2026-08-29 (ADR-0007: Pattern D)

- **Section changed:** §4.2 (Controls spec).
- **Was:** Mouse always rotates the view. Player's mouse "got out of the screen" because the mouse was driving the view continuously.
- **Now (Pattern D, per ADR-0007):** Default state is **free mouse** (OS cursor visible, mouse does not rotate the view). RMB-hold = mouse-look mode (cursor hidden, mouse moves rotate the view). Space (or Tab-when-not-roster) toggles mouse-look for trackpad / MacBook users. Roster panel is the primary way to choose who to talk to from a distance. LMB in free-mouse mode is a screen-space raycast: if it hits an NPC, the player walks to face the NPC and the dialogue opens. LMB in mouse-look mode is a center-screen raycast (FPS-style crosshair). Tab = roster toggle (existing).
- **Reason:** The user explicitly asked: "Mouse should be blocked after click on the game area maybe? To let me move without getting out of the screen? OR, well... we have these buttons, so we need mouse also to click these buttons to choose the characters in the office... we need to decide how we design navigations." And later (verbatim): "we should have the mouse all the time available and need to hold the mouse button to rotate so we always can use mouse to click objects." After research (`.agent-briefs/mouse-look-report.md`), the best-practice for a 3D RPG with economy/simulation is **Pattern D** (Deus Ex / Skyrim / WoW model): free mouse for UI, RMB for view rotation, walk-to-face for in-world interactions, plus a key toggle for trackpads.
- **Rejected alternatives (see ADR-0007 §3.4 for full reasoning):**
  - **Always-rotating mouse with pointer lock (Pattern A)**: too aggressive, breaks the UI (player has to press Esc every time to click a button). Verdict in research: 4/10 suitability.
  - **Always-free mouse, view rotates with arrow keys only**: feels sluggish, doesn't match the "look around" expectation.
  - **Cursor-on-edge pan (Pattern C)**: incompatible with first-person interior navigation. Verdict: rejected.
  - **Free mouse + edge pan + RMB snap (Pattern E)**: unpredictable, causes rotational nausea in first-person. Verdict: rejected.
  - **Plain Pattern B (no Space/Tab toggle)**: works on desktops with a real RMB, fails on trackpads. Pattern D adds the toggle.
- **Implementation:** `src/engine/controls.ts` is rewritten. State machine: FREE_MOUSE (default) / MOUSE_LOOK_HOLD (RMB down) / MOUSE_LOOK_TOGGLE (Space). LMB mousedown calls `raycastNpc(x, y)` in free-mouse mode and triggers `walkToFace(npc)` + `openDialogue(npc)`. WASD works in all states. `contextmenu` is `preventDefault`-ed. `src/engine/interaction-raycaster.ts` is a new pure module for the raycast math. `src/engine/walk-to-face.ts` is a new pure function for the walk planner. `src/ui/cursor.ts` is the custom pixel-art cursor. Detail in ADR-0007 §4.
- **Tests:** `tests/unit/controls.test.ts` extended with FPS camera state, pitch clamp, mouse-look toggle. `tests/unit/interaction-raycaster.test.ts` (new). `tests/unit/walk-to-face.test.ts` (new). TDD per PR-8.

### C-03 — Custom pixel-art cursor (2026-08-29)

- **Section changed:** §4.2 (Controls spec), §9 (UI).
- **Was:** OS cursor (arrow) visible over the canvas.
- **Now:** Custom pixel-art cursor (Amiga/retro style). Default state: a small chunky crosshair/arrow. Hover-NPC: speech bubble. Hover-object: hand. Busy: spinning loading.
- **Reason:** User: "Use some nice cursor inside the game, retro Amiga style maybe? Or other retro style. Not normal cursor, that should be hidden."
- **Implementation:** An HTML `<div>` (or `<canvas>` overlay) on top of the game canvas. `position: absolute`, follows `mousemove` events. Hides OS cursor via `canvas.style.cursor = 'none'`. Renders one of 4 pixel-art sprites depending on the current hover target. Sprites are 16x16 or 32x32 pixel-art, drawn with `image-rendering: pixelated` for crispness.

### C-04 — Camera must NEVER go through walls; first-person solves this (2026-08-29)

- **Section changed:** §11.4 (Intro), §6 AC-Movement.
- **Was:** Over-the-shoulder camera could go through walls (the user reported: "camera can get out from the office right now, and we can't see through the walls so very often I don't see the character when we are in above the sholder view").
- **Now:** First-person. The camera is the player's eyes. The player cannot go through walls (AABB collision), so the camera cannot either. The wall-clipped-camera bug is impossible by construction.
- **Reason:** The user proposed two solutions: (a) first-person, (b) camera collision. We chose (a) because it is simpler and matches the standard 3D-RPG convention.
- **Implementation:** None needed beyond C-01. The AABB collision in `src/engine/collision.ts` already prevents the player from going through walls; the camera is the player's eyes, so it follows.

### C-05 — Cutscenes show the avatar in 3rd person (2026-08-29)

- **Section changed:** §11.4 (Intro).
- **Was:** The player is in 1st person the whole time, even during cutscenes. The player never sees what they look like.
- **Now:** During the intro and end-of-day cinematics, the camera is in 3rd person (over-the-shoulder or free orbital) so the player can see their own avatar. The camera animates from 3rd person to 1st person at the end of the intro (a 0.5s tween).
- **Reason:** The user: "Even with first person view, in cutscenes and intros we should be able to see ourself, the main character, from 3rd person perspective, so we know how we look. And then we animate the camera move to change to the first person perspective."
- **Implementation:** During the intro cinematic, the camera is detached from the player. After the cinematic ends, the camera tweens (lerp position, slerp rotation) from the cinematic-end position to the 1st-person player-eye position over 0.5s. The `controls.ts` module exposes a `setMode(mode: 'fps' | 'cinematic' | 'free')` API for the cinematic to call.

### C-06 — Roster panel and prompt text must be larger / more readable (2026-08-29)

- **Section changed:** §4.2, §9.3.
- **Was:** Roster names were 12px pixel font, hard to read at 480x270.
- **Now:** Roster cards are 16-18px font, ~50% larger cards, generous padding. The hover prompt "[E] Talk to Bartek" is 14-16px. Trigger prompts are always visible when in range.
- **Reason:** The user: "position next to person name is too small, hard to read."
- **Implementation:** `src/ui/office-roster.ts` is updated with larger fonts and padding. The trigger prompt is a new component `src/ui/interaction-prompt.ts` that shows the current hover target's name and role in 14-16px pixel font, bottom-center.

### C-07 — Day-1 intro is a real cinematic, not a roof shot (2026-08-29) — REVISED 2026-08-29 (Lucas)

- **Section changed:** §4.1 (First-launch), §11.4.
- **Was (initial):** The intro showed the building from the outside, focusing on the roof, with no sky, no trees, no people. The user called this "nothing interesting."
- **Was (revised complaint 2026-08-29):** "we can show building from outside for intro but it should be from the distance, now we see like the closeup of the wall, not nice animated intro or cut-scene." The first attempt at an exterior shot was a wall closeup, not a distance shot. The user wants the building seen from far away, as a real establishing shot, not as a wall texture.
- **Now:** A full multi-stage cinematic (see §11.4) with:
  1. **Establishing shot from a distance.** Camera at ~50-80m, looking at the building. Sky, trees, birds, neighboring buildings, road with cars — all visible. The building's exterior signage shows "DevPowers Group — DevPowers + Edukey." Hold for 2-3 seconds, slow dolly forward.
  2. **Approach the door.** Camera dollies down to shoulder height, walks toward the entrance.
  3. **Walk through.** The player takes control at the doorway.
  4. **Lunch in the kitchen.** On subsequent days, after the morning standup, the player walks to the kitchen for lunch (no cinematic — just normal walking). The kitchen is a real place inside the building.
  5. **Fade in inside the office, first-message, quest log, roster slide-in.**
- **The building from the outside is shown ONCE, on day 1.** The distance is important — the user is explicit: "from the distance, now we see like the closeup of the wall." A closeup is the wrong move; a wide establishing shot is the right move.
- **Reason:** "GAMES NEED INTRO, some animation, introduction. Both on the start of the game and in the start of a day." The intro must set the tone, the world, and the stakes.
- **Implementation:** `src/engine/cinematic.ts` (new) handles the intro. The exterior is a separate scene loaded only during the intro and disposed after. The exterior camera is at `(0, 28, 80)` looking at `(0, 12, 0)`, NOT `(0, 28, 4)` — the difference between "wall closeup" and "establishing distance shot" is the z coordinate.

### C-08 — NPCs sit AT desks (not in the middle), face their monitors, animate (2026-08-29)

- **Section changed:** §4.2, §11.3.
- **Was:** NPC bodies sit in the middle of the desk, screens behind them. NPCs were static, no idle animations. All desks and NPCs looked identical.
- **Now:** NPCs sit at the chair (behind the desk), face the monitor. NPCs have idle animations (type, stretch, sip coffee, look around, lean back). Each NPC has a slightly different position, different mug, different items. Desks have random wood tints.
- **Reason:** "People are still sitting in the middle of the desks, not next to the desk working. It's strange. We also should add some animations, now they sit like robots/objects, not like humans, and they should to sit all in exact same position. Desks also should not be exact clones, add some variations."
- **Implementation:** `src/engine/scene.ts:makeNpcMarker` is rewritten to position the NPC behind the chair, facing the monitor. `src/engine/npc-idle.ts` (new) handles the per-NPC idle animation state. The procedural variation is in `src/engine/scene-variation.ts` (new).

### C-09 — Walk-to-face: player and NPC face each other before dialogue (2026-08-29)

- **Section changed:** §4.3.
- **Was:** Player could open a dialogue while standing anywhere — including behind the NPC. The conversation opened with the player looking at the NPC's back.
- **Now:** When the player initiates a conversation (E, click, roster card), the player avatar auto-walks to a "stand in front of the NPC" position (1.5m in front of the NPC's facing direction). The NPC rotates to face the player. Dialogue opens when both are in position and facing each other.
- **Reason:** "When we talk to somebody we should simulate that we walk to this person and this person should move also in our direction, like it would look on us when we talk. now I talk to the back..."
- **Implementation:** A new `src/engine/walk-to-face.ts` module. Pure function `planWalkToFace(player, npc): {target, npcTargetYaw}` returns a target position and the NPC's target yaw. The dialogue system calls `walkToFace` before opening. If the player cancels (Esc), the walk aborts.

### C-10 — Multi-turn dialogues (4-8 turns minimum per conversation) (2026-08-29) — REVISED 2026-08-29 (Lucas: "no hard number, just RPG-style")

- **Section changed:** §4.3.
- **Was:** Dialogue was single Q-and-A. Pick an option, dialogue ends. "Only one question and one answer? thats it? Is it how it looks like in any real office?"
- **Was (initial 4-8 turn target):** Each NPC conversation is 4-8 player turns minimum.
- **Now (revised per Lucas 2026-08-29):** **No hard turn count.** Lucas: "I don't have one number in my head as a goal. I just need this game to be real game, not a demo, so we need enough options, branching, decisions trees etc to make this a real simulation, with simulation of relations, previous actions influencing future actions and dialogues and answer options. Like in real RPG!"
- **What this means in practice (from the opencode dialogue-count report):**
  - **5 layers per NPC:** greeting pool + topic threads + follow-up branches + memory callbacks + gated options.
  - **Per Tier-A NPC (Bartek, Zosia, Maciek):** 220-300 authored lines, 50+ nodes, 5-6 threads.
  - **Per Tier-B NPC:** 130-150 lines, 3-4 threads.
  - **Per Tier-C NPC (Pawel, Janusz, Burek):** 50-110 lines, 1-2 threads.
  - **Total:** ~2,300 authored strings across ~730 tree nodes (13x today's volume, ~100x perceived variety).
  - **Hard cap on a single conversation: 14 turns** (the dialogue walker enforces it; deeper arcs are split across multiple conversations, not single ultra-long ones).
  - **RPG-style branching:** previous decisions change future options, gate new threads, shift NPC memory. The dialogue tree is not a single path; it is a graph of options that depend on `state.relationships[npcId]`, `state.flags`, `state.day`, `state.lastTopic[npcId]`.
  - **Memory callbacks:** NPCs reference past conversations, e.g. "you said yesterday you hated standups" — this is what makes the simulation feel real.
- **Reason:** "Not only simulation of the in-work life, but also meetings with clients, daily standups, courses where we are a trainer and we are in a class and people are listening (or not... ;) we can have funny situations with challenges" AND "Like in real RPG" with branching and decision influence.
- **Implementation:** `src/ui/dialogue.ts` is rewritten to support multi-turn trees, gated options, NPC reactions per option, and conversation memory. The dialogue data model in `src/content/dialogues.ts` is upgraded to support 50+ nodes per important NPC with conditional branches. The 5-layer structure (greetings/threads/branches/callbacks/gated) is the canonical pattern.

### C-12 — Multi-room world: training room, kitchen, meeting room, CTO office with view (2026-08-29)

- **Section changed:** §1 (Executive Summary), §4.2 (Walk and explore), §11 (NPC life), and creates a new §15 (World layout).
- **Was:** The game is a single 20x20-unit office. The user repeatedly called this out as too small: "Where are other rooms and maybe even buildings?"
- **Now:** The game world is a small open-plan floor with the existing 20x20 office PLUS 3-4 adjoining rooms, connected by open doorways (no real doors — keep it simple, the world is openspace). The rooms are:
  1. **The Main Office** (existing 20x20 unit room) — desks, NPCs at desks, current behaviour. **MUST NOT BE BROKEN.** The user explicitly said: "DO NOT BREAK existing room! I like how it looks like!"
  2. **Training Room** — a classroom-style room with a projector screen, a desk/lectern for the player (this is where the player TEACHES courses; the "we are trainer and we are in a class and people are listening" scenario from C-10), rows of seats for the audience (NPC students), a whiteboard on the wall. Accessed through a wide open doorway from the main office.
  3. **Kitchen / Coffee Room** — a smaller room with a coffee machine, a fridge, a microwave, a small table with 2-3 chairs. The "office dog" Burek hangs out here sometimes. NPCs come here to get coffee, eat lunch, gossip. Has a sink, mugs, maybe a "today's menu" sign.
  4. **Meeting Room** — a medium room with a long table, 6-8 chairs, a whiteboard or projector screen on the wall, a "next meeting" calendar on the door. The team leads hold their daily standup and weekly retros here. The player can attend (sit in a chair) and the meeting runs as a multi-NPC dialogue.
  5. **CTO's Office** — a corner office with **a huge window with a view of the whole open-space floor** (the player can see the main office through the window — both ways). Inside the CTO office: a big desk, a chair, bookshelves, and on the wall behind the desk a **HUGE Batman sign** (per the user: "huge batman sign on the wall behind him"). Glass walls (or one big glass wall facing the main office) with a **three.js glass/transparency effect** so the player can see through to the main office.
  - Optional: a **small lobby / reception** at the building entrance where the player spawns. Not required, can be skipped for scope.
- **Reason:** The user explicitly said: "We need to get out sometimes, at least to the training room for courses, or to the kitchen and to the meeting room, and CEO/CTO should have their own office with huge window view on the whole openspace and huge batman sign on the wall behind him! ... add this elements later, on later stages but do not miss this! Add this to PRD, ADR, Plans to do not forget!!"
- **CRITICAL constraint:** The existing main office MUST NOT BE BROKEN. The user: "DO NOT BREAK existing room! I like how it looks like!" This means:
  - The 20x20 office stays in the same world coordinates, same NPCs, same desks, same floor, same walls.
  - The new rooms are added by REMOVING one or two walls of the existing office (the east or north wall, depending on layout) and adding new rooms on the other side.
  - The current `OBSTACLES`, `OFFICE_BOUNDS`, NPC positions, and player spawn stay valid.
  - If a collision wall is removed to create a doorway, the doorway width is at least 2.5 units (two NPCs can walk through side by side).
  - The existing intro cinematic, the existing title screen, the existing dialogue system, the existing roster panel — all keep working unchanged.
- **Doors:** No real doors. Open doorways (the wall simply has a gap). This keeps it simple and matches the "open plan" office aesthetic. The user: "we do not need real doors to keep it simple, it's openspace."
- **Glass effect (CTO office):** The CTO office has a large glass wall facing the main office. Implemented in three.js as:
  - A `THREE.Mesh` with `THREE.MeshPhysicalMaterial` (or `MeshStandardMaterial` with `transparent: true, opacity: 0.25`).
  - Refraction / reflection for the "glass" look: `transmission: 0.9, thickness: 0.5, roughness: 0.1, ior: 1.5` (requires `MeshPhysicalMaterial`).
  - A subtle reflection cubemap (the office interior) so the glass reflects the room.
  - The glass wall is a `THREE.Plane` (or thin `BoxGeometry`) at the boundary between the main office and the CTO office. It does NOT block player movement (the player can pass through it, like a window), but it does block line-of-sight raycasting for the "talk to NPC through the window" feature (raycasts stop at the glass; the player has to enter the CTO office to talk to the CTO).
  - Performance: glass is expensive. The CTO office wall is ONE glass panel (not the whole office). Tested with 1-2 NPCs visible through it; if frame rate drops, fall back to `MeshStandardMaterial` with `transparent: true`.
- **Roof / building envelope:** Each room has the same opaque ceiling as the existing office (the ceiling stays — only the player can't see the roof from inside). The exterior is only visible during the intro cinematic. **The player can NEVER go outside the building** (this is a work-floor simulation; the player is at work). If a future iteration wants "leave the building" gameplay, that gets a new ADR.
- **Scope / phasing:** The new rooms are added in later stages (after the main office is solid). The user: "We can add this elements later, on later stages but do not miss this!" Suggested phasing in the plan file: see `~/.claude/plans/glistening-napping-hinton.md` Phase 4 (revised to "More rooms, glass effect, Batman sign" instead of "More buildings"). Phase 4 is NOT a separate "buildings" phase anymore — it's "expand the floor plan."
- **World navigation:** The player walks between rooms with WASD. There is no loading screen, no door transition, no separate scene per room. It is one continuous world. The rooms are connected by open doorways, so the player can see from one room into the next (line-of-sight), which is important for the "CTO office with view of the openspace" requirement.
- **NPC schedules go through doorways:** The NPC schedule (per C-NN) now includes transitions between rooms. Marek's morning is "at his desk in the main office"; his mid-morning is "at the coffee machine in the kitchen." His walk goes through the doorway. The AABB collision lets him pass through the open doorway.
- **Quests reference the new rooms:** "Go to the training room to set up for the 9am course." "Find Janusz in the kitchen — he has gossip." "The CTO wants to see you in his office. Walk through the glass door."
- **Memory/perf:** Adding ~3-4 new rooms roughly triples the world's static geometry. The exterior meshes are already disposed after the intro. The new room meshes are loaded at game start and stay in memory (they are visible from the main office, so unloading per-room is not viable). The three.js scene graph is flat enough that this should be fine for 60 FPS on integrated graphics.
- **Test strategy:** AABB collision tests in `tests/unit/collision.test.ts` are unchanged. New test: the open doorway between the main office and the training room is wide enough for a player of radius 0.3 to walk through without colliding. New test: the glass wall is registered as a non-blocking collision object (the player can pass through it) but a line-of-sight raycaster does not pass through it.
- **Implementation order (later stages, do NOT do now):**
  1. Add the 3 new rooms to `src/content/world-layout.ts` (new file, with the world floor plan as data).
  2. Update `src/engine/scene.ts` to add the room meshes (walls, floor, furniture) without breaking the existing main office.
  3. Add the glass wall material to the CTO office (`src/engine/glass.ts`, new).
  4. Update NPC schedules to use the new rooms (`src/content/npc-schedule.ts`).
  5. Update the roster to show which room each NPC is currently in (small label, e.g. "in kitchen").
  6. Update the intro cinematic to fly through the new rooms in the walk-through-the-door section.
  7. Add quests that reference the new rooms.
  8. Re-run all tests; visual QA with Playwright screenshots.
- **Why this rule:** The user has been burned twice by the agent forgetting things between sessions. C-12 is the multi-room world — it is now in the PRD, the ADR, the plan, and the project's AGENTS.md. It will not be forgotten.

### C-11 — Mood and aggression when reporting bugs (2026-08-29)

- **Section changed:** Cross-cutting (every user-facing interaction).
- **Was:** Sometimes the agent proceeded with work the user had explicitly told it to stop, did not update documents when asked, and committed work without confirming the user wanted it.
- **Now (the rule going forward):** when the user says "STOP", "wait", "before you continue", "update the PRD first", or similar, the agent MUST stop all in-progress work, update the requested documents, and confirm with the user before resuming. The agent does not "continue the previous task" — it picks up the new instruction only.
- **Reason:** Lucas is fed up with the agent ignoring his messages. This is a hard rule.
- **Implementation:** Recorded in `~/AGENTS.md` under "Hard rules — never break these." Every agent on this machine reads AGENTS.md.

### C-12a — NPC portraits: prefer simple vector / programmatic pixel art over heavy raster images (2026-08-29)

- **Section changed:** §9 (UI), `src/ui/office-roster.ts`, `src/ui/dialogue.ts`.
- **Was:** The agy npc-portraits report (`.agent-briefs/npc-portraits-report.md`) specifies 13 full pixel-art portraits with hex palettes and color-by-character guidance. This implied hiring a pixel artist or using a heavy raster pipeline.
- **Now (Lucas 2026-08-29):** "simple vector images/portraits close to what we have now as faces but a little more variant, more options, not all clones." Prefer programmatic / vector approaches: SVG portraits generated at boot, three.js sprite text-or-primitive portraits, or small base64 PNGs (a few KB each) drawn in a consistent pixel-art style. The roster's 13 NPCs should look different but share a visual family. Heavy raster images (Qwen, Gemini, midjourney) are out for v1; the cost (file size, visual inconsistency, license) outweighs the benefit.
- **Implementation:** New `src/ui/npc-portraits.ts` with a `getPortraitSvg(npcId, mood)` function returning an inline `<svg>` string. Each NPC has: skin tone, hair color, hair style, eye color, accessory (glasses, beard, hat, etc.) — drawn from a curated palette per `npc-portraits-report.md`. The dialogue UI swaps portraits on mood change. Total file size: < 50 KB.
- **Visual variety target:** no two NPCs should look the same. Each NPC has 2-3 unique traits. The 13 NPCs cover: bald, short hair, long hair, ponytail, beard, mustache, glasses, hat, headphones, headband, freckles, mole, scar. Skin tones: a curated 5-color palette (avoids uncanny-valley extremes).
- **Reason:** Lucas: "images will be much bigger and heavier. probably for pixel game we can have simple vector images/portraits close to what we have now as faces but a little more variant, more options, not all clones."

### C-13 — Two-company branding: DevPowers + Edukey (2026-08-29)

- **Section changed:** §1, §9 (UI), and adds a new §16 (Branding).
- **Was:** Game has no in-world brand identity. Office is generic.
- **Now:** The game world is the **DevPowers Group** floor: two sub-brands under one group, **DevPowers** (development and web dev) and **Edukey** (AI/IT training). The company name on the office wall poster / whiteboard is "DevPowers Group" with the two sub-brands listed below. The classroom mode is branded as Edukey ("Edukey Training — React for Beginners"). The coding / minigame work is branded as DevPowers ("DevPowers Engineering — 2026 Sprint 14"). The CEO/CTO office displays the DevPowers logo. The day-end summary shows two KPIs: "DevPowers revenue: $X" and "Edukey enrollments: Y". The intro cinematic and the end-of-day cinematic show the building's exterior signage: "DevPowers Group — DevPowers + Edukey".
- **Reason:** The user: "the company name should be DevPowers (development and web dev) and Edukey (AI/IT Training) so 2 companies in the game depending on the task, withing one group. Like 2 brands we use for clients. It will help us promote our real companies."
- **Status:** Lucas flagged this as a proposal: "if you already have a lot of assets, dialogues, audio around underflow company, we can skip it, but I would prefer to promote edukey and DevPowers!" The default is **soft rebrand** (add logos, posters, intro signage; do not touch existing dialogue copy that mentions "underflow" / "the company" / generic terms). A full hard rebrand (sweep all dialogue for company names) is a separate task if requested.

### C-14 — WebMCP integration (2026-08-29)

- **Section changed:** adds a new §17 (WebMCP / agent-playable layer) and a new endgame phase in the plan.
- **Was:** Game is a player-only experience. No external agent can control it.
- **Now:** The game exposes its state and actions as a set of MCP tools (WebMCP protocol). External agents (LLMs in another tab, on another machine, or in a different process) can connect and play the game. Tools include `get_game_state`, `move(direction, durationMs)`, `look(yawDelta, pitchDelta)`, `interact`, `pick_dialogue_option(optionIndex)`, `advance_period`, `get_roster`, `get_quests`. An in-game settings toggle enables/disables the WebMCP listener (default ON for the public demo).
- **Reason:** The user wants to enter the **OpenAI WebMCP challenge** (https://openai.com/webmcp-challenge/, https://github.com/webmachinelearning/webmcp, https://developer.chrome.com/docs/ai/webmcp). The challenge's goal: enable AI agents to control web apps via a standardized tool API. This game is a good fit because the simulation depth (NPC schedules, dialogue trees, quests) makes it a benchmark for "can an LLM play a real game."
- **Status:** Plan only. Implementation starts after Phase 6, or in parallel with Phase 5 if there is bandwidth. The WebMCP layer is additive (no impact on the user-facing UX).

### C-15 — NPC life: deterministic schedule + per-day stochastic variation + random events like birthdays (2026-08-29) — REVISED 2026-08-29 (Lucas: "MIX BOTH, do not ignore my message again")

- **Section changed:** §11.1 (NPC schedule).
- **Was:** NPCs are static 3D markers at desks. No movement, no variation between days.
- **Was (initial revision):** Each NPC has a deterministic per-period schedule (the backbone) PLUS a per-day random seed. Bounded stochastic (2-3 events/day).
- **Now (Lucas's explicit "MIX BOTH"):** **All three layers are required, not one or two:**
  1. **Deterministic backbone.** Each NPC has a per-period schedule (morning/afternoon/evening) that the player can learn. The schedule handles the "expected" office life.
  2. **Per-day random seed.** A `murmur3("aitrainer:day:" + dayNumber + ":" + saveSlotId)` seed controls the stochastic layer: who arrives late, who stays late, who goes to the kitchen for coffee, who plays video games, who's sick, who apologises on arrival. Same day = same stochastic decisions (testable). Different days = different stochastic decisions (lively).
  3. **Random events like birthdays.** On top of the per-day stochastic layer, there is a separate **event calendar** that draws from a pool of named, hand-written events: **birthdays** (with cake in the kitchen, an NPC's "favorite" cake flavor is part of their profile), **team lunches**, **client visits**, **firedrills**, **all-hands**, **hackathons**, **sick days** (a named NPC is sick and absent). These events chain into quests, change the dialogue for the day, and override the per-period schedule.
- **Mix both/all, not one or the other:** Lucas was explicit: "you should mix both your ideas, so some random numbers of people in different situations/places/times + Events like birthdays etc. BOTH!!! Not one of them only." This means: deterministic schedule is in, per-day random is in, event calendar is in. The agy report's "Option D" (4-tier priority stack) is the right architecture, but the "events" tier needs to be much richer than the report's 15 quirks.
- **Concrete examples from the user:**
  - "some may be late and appology sometimes, but not always the same" — every day, 1-2 NPCs are late. The "late" set is deterministic-per-day. The apology line is varied.
  - "some may stay longer, they have mor work" — every day, 0-1 NPCs stay late (after the player's day ends). They show up in the kitchen or the meeting room.
  - "may stay to play video games on the TV and console" — 1-2 NPCs occasionally do this in the kitchen in the evening. It's random per day.
  - "make it random, every day should be different" — covered by the per-day seed.
  - **NEW: Events** — birthdays, team lunches, client visits, firedrills, hackathons, all-hands, sick days. These are higher-impact than the per-day stochastic events and chain into quests.
- **Reason:** "People should walk, should go to lead the training/course, should have a meeting, should go eat something, should enter the office in the morning (some may be late and appology sometimes, but not always the same), and leave office in the evening (some may stay longer, they have mor work, or may stay to play video games on the TV and console - make it random, every day should be different)" AND "NPC should life, but with some level of randomnes... mix both your ideas, so some random numbers of people in different situations/places/times + Events like birthdays etc. BOTH!!!"
- **Implementation:**
  - Deterministic: `src/content/npc-schedule.ts` (already planned for Phase 3).
  - Per-day random: `src/engine/npc-stochastic.ts` (Phase 3, new).
  - Event calendar: `src/content/events.ts` (already exists from Phase 3.5) — needs expansion to include birthdays, team lunches, etc. The current 41 random events are good but they're mostly micro-events. The expansion adds 12-20 named "calendar" events.
  - Birthday profile: each NPC's profile gains `birthdayDayOfYear`, `favoriteCake` (e.g. "chocolate" for Klaudia, "lemon" for Janusz, "carrot" for Burek). The birthday event chains into a quest: "find a gift for Klaudia's birthday."
- **Reuses the agy report's recommendation:** Option D (4-tier priority stack) is the right architecture for the per-day stochastic layer. The event calendar is a separate, higher-priority layer (Tier 0 — above the quest hard-pins) that overrides even quest-pinned NPCs.

### C-16 — Time scaling: 5/10/5 asymmetric = 20 min/day + speed controls (2026-08-29) — REVISED 2026-08-29 (Lucas: "ok, let's test it. we can always change it after tests")

- **Section changed:** §4.5 (End of day) and the time constants in `src/main.ts`.
- **Was:** 60 real seconds = 1 in-game period; 3 periods per day = 180s/day. The user reported: "days go way too fast, I did not even manage to understand anything what I should do there and the day passed and I was back outside the building (looking on the roof...)"
- **Was (initial revision C-16):** 5 real minutes per period, 3 periods per day = 15 min/day.
- **Was (second revision C-16):** 10 real minutes per period, 3 periods per day = 30 min/day.
- **Was (opencode report recommendation):** 5/10/5 asymmetric (morning/afternoon/evening) = 20 min/day + speed controls.
- **Now (Lucas 2026-08-29, final):** **5/10/5 asymmetric = 20 real minutes per in-game day** + player speed controls. Lucas: "ok, let's test it. we can always change it after tests." This adopts the opencode report recommendation and ADDS the speed controls.
- **Constants:** `PERIOD_SECONDS = { morning: 300, afternoon: 600, evening: 300 }`. Total 1200s = 20 min/day. Period rates are: morning 0.8 game-min/real-s, afternoon 0.5 game-min/real-s, evening 0.6 game-min/real-s. The HUD derives time-of-day from period progress so the varying rate is invisible to the player.
- **Player speed controls (default ON):** 0.5x / 1x (default) / 2x / Skip-to-next-event / End-day-early / Pause. Hotkeys: `1` / `2` / `3` / `N` / `H` / `Space`. Auto-pause on scheduled events ("Standup is starting — Join / Catch up later (morale −)"). A HUD line shows "Next event in mm:ss".
- **Tunable:** constants are exported so a future "speed run" mode can drop them back. The default for the public demo is 300/600/300 with speed controls enabled.
- **HARD RULE — time NEVER advances while a dialogue is open.** Lucas was explicit: "never interupt in the middle of the dialogue, we should pause the time or at least prevent the tday change." This is a stronger statement than the original Phase 0 "pause during dialogue" — it means:
  - Dialogue is open → period-advance loop is paused, period NEVER rolls over, day NEVER ends.
  - Multi-NPC modes (standup, meeting, classroom, client call) are part of "dialogue" and pause time too.
  - If the player reads 8 lines of dialogue, 8 lines of dialogue is all the time that passes.
  - The period-rollover toast ("Period 2 of 3 — Afternoon, 6:00 PM") does NOT fire while a dialogue is open.
  - The speed controls cannot bypass this — even at 2x, time does not advance during dialogue.
- **Implementation note:** the day-advance loop already wraps in `if (!dialogue?.isOpen())` (Phase 0 fix). C-16 reinforces that this is a hard rule, not a soft one. If a future change makes the period advance during dialogue, the change is rejected at code review. The speed controls (Phase 3) gate the period-advance differently: speed-multiplier scales the `dt` value going into the period-advance check, but the dialogue-pause still wins.
- **Why I am adopting the opencode 5/10/5 + speed controls recommendation:** Lucas's third message explicitly answered "ok, let's test it" to the question of whether to take the opencode 5/10/5 (20 min/day) + speed controls recommendation. That supersedes the earlier "10 min/period should be enough" message. The agent surfaces the change in the corrections log so the earlier override is not silently lost.
- **Rollout per phase (per opencode report):** Phase 0 ships the C-16-revised-1 uniform 300s (15 min/day) and the dialogue-pause hard rule. Phase 1 adds auto-pause on period change + HUD countdown. Phase 3 ships the 5/10/5 (20 min/day) + speed controls together — the longer clock and the controls must land together. Phase 5+ reassesses via playtest; if there's dead time, add ambient content (bubbles, side errands) rather than lengthening the clock.

### C-17 — Stuck-dialogue bug: state must reset on screen transition (2026-08-29)

- **Section changed:** §4.3 (Dialogue), `src/ui/dialogue.ts`, `src/main.ts:setScreen`.
- **Was:** `dialogue.open()` early-returns on `if (state) return;` (line 28 of `src/ui/dialogue.ts`). When `endDay()` calls `setScreen("summary")` which calls `uiRoot.innerHTML = ""` (clearing the dialogue DOM), the dialogue's `state` variable is still set, so the next day's `dialogue.open(npc)` call early-returns. The user: "then when I tried to talk to anymode dialog never apeared again, so there is some bug. maybe end of the day did not change some state in proper way and game thinks that the dialogue is still open and will never open again?"
- **Now:** Two changes:
  1. `dialogue.close()` sets `state = null` (and removes the DOM). The current `close()` only sets `display: none` — that's why the next `open()` early-returns.
  2. `setScreen()` calls `dialogue?.close()` before transitioning to `summary` / `minigame` / `gameover`, so the dialogue state is always clean.
- **Already done in Phase 0; logged here for traceability.** A regression test in `tests/unit/dialogue-state.test.ts` (new) covers: open, close, open again; open, setScreen('summary'), open again. The test fails if the bug returns.

### C-18 — Onboarding, help icon, quest log (Phase 1 deliverables) (2026-08-29) — REVISED 2026-08-29 (Lucas: "longer, more clear, like a game")

- **Section changed:** §4.1 (First-launch), §9.2 (Character creation), §9.3 (Office).
- **Was:** The user has no idea what to do, no first-day guidance, no in-game help.
- **Was (initial revision):** A first-day quest chain (start with "Talk to Bartek"), a quest log panel, a help button, a ? key.
- **Now (Lucas 2026-08-29):** "Onboarding should be mixed with help and intro, longer and more clear what we are doing here, who we are, what is a goal, and more like simulations, we should have dialogs explaining who we are like in a game!!!"
- **The five elements of onboarding, mixed together:**
  1. **Intro cinematic.** Tells the player who they are (a new IT trainer at DevPowers + Edukey, day 1), where they are (a small open-plan office in a multi-room building), and what the world is (a 30-day career arc with quests, meetings, courses).
  2. **First quest ("Talk to Bartek").** Walks the player to their first conversation, which is itself an onboarding conversation: "Welcome, this is your desk, this is your team, this is your first assignment." Bartek explains the company, the team, the project, the goals, in-character.
  3. **In-dialogue explanations.** When Bartek introduces you to the team (Klaudia, Marek, Zosia, Tomek, Ania, Janusz, Burek, Grazyna, Maciek, Przemek, Kasia, Pawel), each introduction is a 2-3 line dialogue that explains WHO this person is and WHY they matter. The player is not reading a wiki page — they are being introduced by their team lead, in-character, with humor.
  4. **Help modal (?).** A static reference: WASD to move, click NPC or roster to talk, [E] for proximity-interact, [Esc] to close dialog, [End Day] button location, stat explanations, game goal. Opens on `?` key (Shift+/) or by clicking the ? icon. Always available, not just on day 1.
  5. **Quest log.** A persistent bottom-right panel showing the current quest, its title, its objective, and a chain-arrow icon. Click on the quest title to expand a body text describing what to do.
- **Why the mix matters:** "Onboarding should be mixed with help and intro" — the player should not experience onboarding as a separate tutorial phase. The cinematic sets the scene, the first quest walks the player, the in-dialogue explanations teach the world, the help modal is the always-available reference, the quest log is the persistent goal tracker. They are not separate features; they are one continuous experience.
- **Longer is the explicit goal:** Lucas said "longer and more clear what we are doing here, who we are, what is a goal." The intro cinematic is 60+ seconds, the first quest chain is 5+ steps, the in-dialogue explanations cover all 13 NPCs, the help modal is 10+ entries, the quest log body text is 2-3 sentences per quest.
- **Like a game:** "more like simulations, we should have dialogs explaining who we are like in a game." The onboarding is IN-CHARACTER, not a UI tutorial. The player is not "learning the controls" — they are meeting the team and starting a job.
- **Reason:** "I have no idea what I'm doing here, what is my goal, where I should start, who I should talk to... Am I on the first day in work? Or maybe I'm already on some project? Do I need to take assignment? We need some onboarding, tutorial, more GUI HUD elements, some [?] help icon, etc." AND "Onboarding should be mixed with help and intro, longer and more clear what we are doing here, who we are, what is a goal, and more like simulations, we should have dialogs explaining who we are like in a game!!!"
- **Status:** Phase 1 in the plan. The Phase 1 scope is now bigger than originally scoped: 5 elements mixed together, not 3 separate features.

### C-19 — NPCs at desks (NOT in the middle), with idle animations, with variation (C-08 enhancement) (2026-08-29)

- **Section changed:** §11.3 (NPC variation, sitting positions, animations).
- **Was:** NPCs sit in the middle of the desk with screens behind them. All NPCs are at the same position. All desks are identical. No animations. "all people sit in the middle of the desk, and look in my direction (which is fine) with the screens behing them... like they would not work but rather sit with computers behind them."
- **Now:** NPCs sit AT the chair (0.4m behind the desk surface), facing the monitor. Each NPC has a per-tick idle animation: type, stretch, sip coffee, look around, lean back. Each NPC's position is offset by a small random XZ amount. Each desk has a random wood tint, a random mug color, and a random set of items. NPCs rotate to face their monitor (or schedule target).
- **Reason:** "We also should add some animations, now they sit like robots/objects, not like humans, and they should to sit all in exact same position. Desks also should not be exact clones, add some variations."
- **Status:** Already in C-08. Logged here to make the cross-reference explicit.

### C-20 — Audio scope: text-only dialogue, audio only for intro / chapter / event (2026-08-29)

- **Section changed:** §7 (Out of scope), §9 (UI), §10 (Data flow).
- **Was:** "TTS for all dialogue" was an early assumption. The user pushed back: that would be huge.
- **Now:** TTS / speech audio is generated only for: the intro cinematic, chapter intros, the day-end summary voice-over, and major random events. All other dialogue is text-only (read by the player). Background music is instrument-only (no lyrics) — chiptune or similar retro style. The TTS manifest structure exists; it is NOT expanded to cover every line.
- **Reason:** "you do not need to make speech audio for all dialogues, maybe only for most important, like intro, chapters, events. For all other dialogues you may keep it text only, and we can have some background music, mostly without lyrics. I want 100x more dialogue options and live in this game, real work simulation, so we do not need audio for most of them, it would be huge amount of audio, so skip it for now. Maybe in v2 someday."

### C-21 — Never show the building from the top during gameplay (only intro) (2026-08-29)

- **Section changed:** §4.2 (Walk and explore), §11.4 (Intro).
- **Was:** The over-the-shoulder camera could clip out of the building and the user would see the roof from the outside. "now when I see there is an office inside and we can see all the people, I would like to be able to control the character and walk inside the building again! But: we should not fly!!!"
- **Now:** During gameplay (FPS mode), the camera is locked to the player's eyes. The player cannot go through walls (AABB collision), so the camera cannot either. The "view from the top" only happens in the intro cinematic, which the player cannot control. There is no "free camera" / "fly" mode.
- **Reason:** "So never show the building from the top when we control character (maybe only on the intro we can make some animation but not just top of the roof, there is nothing iteresting, maybe better animation when people enter the building in the morning, they come to work, talk to eachother, somebody lought, somebody argue, somebody is late, and we enter the building controlling the character and can walk around and click on people directly to talk + there are these buttons also all the time so we can also click on persons name."
- **Consequence for the intro:** the intro's establishing shot can show the building from the top / from a fly-over, but the moment the player takes control, the camera is FPS and stays FPS. The "people enter the building in the morning" montage is part of the intro (before the player takes control), not a thing the player watches from above during gameplay.

### C-22 — Quests: RPG-like task chain from day 1 (2026-08-29)

- **Section changed:** §4.1 (First-launch), §9 (UI), and the plan's Phase 1.
- **Was:** No quest system. The player has no goals.
- **Now:** A quest chain that starts on day 1 with "Talk to Bartek — your team lead." Subsequent quests chain off the dialogue: after Bartek's onboarding, "Accept the training assignment" (this already exists in Bartek's tree at the `tutorial-yes` option); after the first training session, "Get your first client" or "Survive the first sprint review." Each quest has a clear objective and a clear reward (cash, XP, stat buff, NPC relationship). The quest log (C-18) shows the current quest.
- **Reason:** "we do not know who we should talk to and why, we need some goals, intro, like in RPG we need tasks/quests but in office theme."

### C-23 — Style and office look are good — protect them (2026-08-29)

- **Section changed:** cross-cutting.
- **Was:** Nothing in the docs said "the current style is good, do not regress it."
- **Now:** The current pixel-art style and the existing 20x20 office layout are **approved by the user**. Any future work that touches the visual style or the office layout must (a) keep the existing look, (b) extend it (not replace it), and (c) get explicit Lucas approval before merging a regression.
- **Reason:** "It's still very very far away from that point. But I like the style of the characters and the office looks nice! So there is progress! I love the style and how the game looks like!"
- **Consequence for the multi-room work (C-12):** the new rooms should match the existing style (same character pipeline, same lighting setup, same wood-tint palette, same pixel-art aesthetic). No style drift.

### C-24 — "Create a team of game developers" — delegate to other agents (2026-08-29)

- **Section changed:** cross-cutting; project AGENTS.md PR-5 / PR-6 / PR-7.
- **Was:** The agent was working alone.
- **Now:** The agent orchestrates a "team" of CLI agents and subagents. Each has a clear role:
  - **Codex (gpt-5.6 Sol)** — workhorse for implementation, bulk code, refactors, backend. Delegated via `codex exec --sandbox workspace-write`. Brief: `.agent-briefs/<task>.md`.
  - **agy (Gemini)** — research (best Google data access), image/screenshot description, independent second opinion. Delegated via `agy --mode accept-edits --add-dir <workdir> --print-timeout 15m -p "..."`.
  - **opencode (GLM 5.2)** — taste work (UI, GUI, copy, dialogue humor, marketing). Delegated via `opencode run "..."` (NOT `opencode run --auto` without explicit authorization).
  - **grok (Grok 4.5)** — fast mechanical batches, overflow, second-best taste fallback.
  - **Claude (this session)** — architecture, plans, final review, judgment.
  - **Subagents within Claude** — only for tasks where Claude does the substantive work; never as a thin wrapper around a CLI (the CLI is called directly via Bash).
- **Reason:** "Remember to delegate to other CLI Agents and subagents, ask for QA, review, ideas, make brain storming with them, ask for opinions, etc. Create a team of game developers! We need for sure some character designed and somebody to write a storyline, to make this game playable, now it is not interesting at all and I have no idea what I should do..."
- **Workflow:**
  1. The agent identifies the next sub-task.
  2. The agent writes a self-contained brief to `.agent-briefs/<task>.md`.
  3. The agent calls the appropriate CLI via Bash.
  4. The agent verifies the result (read diff, run cheap checks, drive the UI).
  5. The agent commits. The delegate does not commit.
  6. The agent reports to Lucas and shows the user-visible artifact (screenshot, dialogue tree, etc.).
- **Roles for THIS game that need external help:**
  - **Character designer** (agy or opencode): produce pixel-art portraits for each NPC (consistent style across the roster). Output: `.agent-briefs/character-portraits.md` brief, response is a set of portrait sketches (text description, since GLM is text-only and agy can do image but we should be careful).
  - **Storyline writer** (opencode / GLM): write the 30-day quest chain. Output: `.agent-briefs/quest-storyline.md` brief, response is a structured quest tree for 30 days.
  - **Dialogue writer** (opencode / GLM, then agy for review): write the multi-turn dialogue trees for the 13 NPCs. Output: per-NPC dialogue data.
  - **Comedy reviewer** (opencode / GLM): review all dialogue for humor, in-group accuracy, and "would an IT person laugh at this?"
  - **QA reviewer** (Codex or agy): per-phase review of the diff for regressions, debug logs, console errors.
  - **Visual QA** (agy): describe every Playwright screenshot; flag "this looks like a roof" / "no NPCs visible" regressions.

### C-25 — MMORPG office sim: players + AI agents in the same world (2026-08-29) — ENDGAME GOAL (post-Phase 6)

- **Section changed:** adds a new §18 (Multiplayer vision) and a new endgame phase in the plan.
- **Was:** The game is single-player. NPCs are the only other actors.
- **Now (Lucas's vision):** "Later we can add WebMCP and let players play with eachother or rather agents to play with each other, so we can make it MMORPG office simulator in IT/AI/Training space :D But this is something to add as a final goal when we have all basic mechanics working, so players can play with NPC and also cooperate, talk and compete with other players, either people or agents controling via WebMCP"
- **The vision:** an MMORPG-style office simulator where:
  - **Players** (humans) join a shared office and can talk to each other, cooperate on quests, compete for promotions, attend meetings together.
  - **AI agents** (external LLM-controlled players via WebMCP, C-14 / D-21) join the same world as NPCs — indistinguishable from human players to other players. They can be played by external AI services, by Lucas, or by a friend.
  - **NPCs** stay the same (the 13 office characters with their schedules, dialogue, and quests).
  - **Cooperation and competition:** the office is one shared world. Multiple "junior trainers" can compete for the same "lead trainer" promotion slot. Multiple "managers" can hold standups that the player attends. Multiple "interns" can collaborate on a project.
- **Scope (Lucas's explicit phasing):** "this is something to add as a final goal when we have all basic mechanics working." The MMORPG layer is post-Phase 6, after:
  1. The single-player career arc is shippable (Phase 6: 30-day arc with quests, dialogue, NPC life, multi-room world).
  2. The WebMCP layer is in (C-14 / D-21): external agents can control a player.
  3. The networking layer is added (a server that hosts the shared world, syncs game state, handles player connections, anti-cheat).
- **Relationship to C-14 (WebMCP):** the MMORPG layer is built ON TOP of WebMCP. WebMCP is the per-player API; the MMORPG layer is the multi-player world that uses WebMCP. WebMCP without the MMORPG is a single-player game controllable by AI agents. WebMCP with the MMORPG is a shared world where humans and AI agents coexist.
- **The "IT/AI/Training space" angle:** the game is set in the IT/AI training industry. Players are trainers, consultants, junior devs, managers, etc. The "training" mode is the heart of the game — players can run classes, attend standups, deliver code reviews, and respond to client calls, with the same NPC roster and quest structure.
- **Reason:** Lucas's literal request: "we can make it MMORPG office simulator in IT/AI/Training space." This is the long-term vision for the game. The single-player version is the foundation; the MMORPG version is the future.
- **Status:** vision only. Not a phase. The plan includes this as the final endgame, after Phase 6 ships. No implementation work yet.

### C-26 — Lucas's overall mandate: "the best simulator business retro game in the history" (2026-08-29)

- **Section changed:** cross-cutting. This is the project's north star, captured in the PRD so it can never be lost between sessions.
- **Lucas's mandate (verbatim):** "make this the best simulator business retro game in the history, a real game, not just simple demo, make it huge and ambitious! Do not stop untill you have detailed graphics, funny storyline, high engagement, working mechanics, and not bugs at all. confirm this all with other AI agents as judges and in QA / Code Reviews. Do not stop untill you all agree that this game is perfect and you can't make it better. Do not make it just a simple ugly demo! Make it a full game with long story and a lot of simulations and dialogues and with beautiful graphics!"
- **What this means in practice:**
  1. **Not a demo.** The MVP is the full game, not a prototype. Every phase ships a polished feature, not a stub.
  2. **Detailed graphics.** The pixel-art style is the aesthetic. No ugly placeholder meshes. Each NPC is recognizable. Each room has visible detail (desks, plants, posters, items). Lighting is intentional.
  3. **Funny storyline.** Tone is IT Crowd + Silicon Valley. Comedy is the differentiator. The 30-day arc is a long story with character development, recurring jokes, callbacks.
  4. **High engagement.** The player should want to play the next day. Quest chains, NPC relationships, stochastic events, the day-end summary with fun facts — all contribute to engagement.
  5. **Working mechanics.** No half-wired features. Every button, every shortcut, every quest step works. The Definition of Done (PRD §14) is enforced.
  6. **No bugs.** The Phase 0 typecheck + tests + Playwright + agy description + codex QA pipeline catches bugs before they ship. Reverts are always available.
  7. **Multi-agent QA.** Every phase gets an independent QA pass (Codex, agy, or both). The agent does not declare a phase "done" until QA passes.
  8. **Iterate until perfect.** "Do not stop untill you all agree that this game is perfect." This is the long-term commitment. Each phase is an iteration toward the perfect game; the agent reports progress, shows screenshots, and waits for Lucas's review before the next phase.
- **Reason:** Lucas said this verbatim. It is the project definition. Every decision in this PRD, ADR, plan, and AGENTS.md serves this mandate.
- **Status:** always-on rule. The agent checks every phase against this mandate before declaring it "done."

### L-2026-08-31-01 — Remove the NPC chest "clothing-shirt" rectangle (2026-08-31)

- **Section changed:** `src/engine/npc-mesh.ts`.
- **Was:** a 0.42 × 0.3 × 0.3 BoxGeometry named `clothing-shirt` was added on top of the NPC torso for ~50% of NPCs. The material was one of `SHIRT_COLORS = [0x3b82f6, 0xef4444, 0x22c55e, 0xf59e0b, 0x8b5cf6]`, which read on the chest as a flat colored rectangle against the brown body. Lucas called it out and asked for the rectangle removed entirely.
- **Now:** the `clothing-shirt` box, the `SHIRT_COLORS` palette, the `clothing.shirt` flag, the `clothing.shirtColor` field, the `chestRadiusForNpc` helper, the `darkenColor` helper, and the `shirtColor` / `npcId` parameters on `createFemaleMesh` are all gone. The NPC torso is the bare `body` box in the NPC's `bodyColor` for both male and female NPCs. The breast is two `bodyMaterial` spheres of the same color as the body, so the chest reads as part of the same mesh. Per-NPC individuality comes from `bodyColor`, `hairColor`, the male `belt` + `tie`, the lower-body clothing, and the per-id lower-body / shoes flags.
- **Why:** the colored shirt-rectangle was a low-poly hack that made the chest look like a clipping glitch. The breast is already part of the body model, so the shirt box had no visual job. Removing it cleans up the silhouette and makes the body color the dominant readable color of the NPC.
- **Implementation:** `src/engine/npc-mesh.ts` (deletions only — no new code); `tests/unit/npc-mesh-parenting.test.ts` (new "no clothing-shirt object" regression test); `tests/unit/npc-mesh.test.ts` and `tests/unit/female-body.test.ts` updated to look for `breast` (the new mesh name) instead of the old `chest` (which was a per-NPC-radius single sphere, replaced by a fixed-radius pair of body-color spheres on L-2026-08-30). Build version bumped to `v2026.08.31-01`.

### C-34 — Dog (Burek) has its own life, plays, interacts (2026-08-31)

- **Section changed:** `src/content/npc-schedule.ts`, `src/engine/npc-controller.ts`, `src/engine/dog-behavior.ts` (new).
- **Was:** Burek is a static mesh in the main office. He sits at one position. He has no walk, no play, no interaction with NPCs.
- **Now:** Burek has a dedicated behavior system, distinct from the human NPC schedule:
  - **Wander** — every 20-60s picks a random walkable spot (a desk, a chair, the coffee machine, a plant, an NPC's chair) and walks to it with the same walk animation humans use.
  - **Follow NPC** — 30% of the time, picks a random human NPC within 6m and follows them for 30-90s (sits next to them at their desk, walks with them on their coffee break).
  - **Play** — 2-4 times a day, performs a "play" animation: 3 quick jumps (Y bob ±0.15m at 6Hz) and a tail-wag, then lies down for 10-20s.
  - **Sleep** — during afternoon and evening periods, has a 30% chance to be sleeping under a desk (mesh still visible but lying down — body rotated 90° on Z, head resting on paws).
  - **Sniff** — when standing still, occasionally (every 6-12s) lowers the head 0.15m for 1.5s and bobs the head side-to-side.
- **Why:** "dog should move around the office! It should be a dog! either laying or playing, interacting with people."
- **Implementation:** new `src/engine/dog-behavior.ts` with `DogBehavior` interface (`update(dt, npc, position, rng, otherNpcs) → action`). The `npc-controller.ts` runs the dog's update alongside the human schedule interpolation. The dog's animation reuses the same walk-bob/sway from the human controller.

### C-35 — CEO office moves to where the Training Room is; glass wall looking into the main office (2026-08-31)

- **Section changed:** `src/content/world-layout.ts`, `src/content/npc-schedule.ts`, `src/engine/scene.ts`.
- **Was:** The CEO office is east of the kitchen. The training room is north of the main office. The Batman sign is visible only by walking to the CEO office. Lucas: "the CEO office should be in the place where the Training room is right now (so next to the office) with the glass wall looking to inside the office so CEO can watch the employees! And the batman sign on the wall in CEO room should be visible through this glass wall from the office! So everybody knows the bat is there!"
- **Now:**
  - The CEO office is in the same footprint as the training room (north of the main office). It has a glass wall on its south side looking INTO the main office. The Batman sign is on the north wall of the CEO office so the player in the main office can see it through the glass.
  - The training room is moved to where the CEO office was (east of the kitchen, with its own doorway from the kitchen).
  - The CEO character (Maciek) has a permanent desk in the CEO office; his schedule has him at his CEO desk every period.
- **Why:** the CEO is the focal point of the company. He should be visible from the office. The Batman sign is a visual joke — it should be seen by everyone in the office through the glass wall.
- **Implementation:** swap the `training-room` and `cto-office` room definitions in `WORLD_ROOMS`. Update `MAIN_OFFICE_DOORWAYS` (the doorway into the training room at z=-9 becomes the doorway into the CEO office). Move the old `cto-to-kitchen` doorway to be the new training-room entry. The glass wall is the south wall of the CEO office, from x=19 to x=27, z=-8. The Batman sign is a `WorldSign` at the north wall (z=-13) facing south (face=PI). Maciek's schedule is fixed to the CEO desk.

### C-36 — Kitchen gets a detailed high-quality pixelart pass (2026-08-31)

- **Section changed:** `src/engine/scene.ts`, `src/content/world-layout.ts`, new `src/engine/furniture/kitchen.ts` (and new `src/engine/furniture/` directory).
- **Was:** The kitchen has a coffee machine, a fridge, a microwave, a sink, and a table — all simple boxes with one color each. The user: "kitchen equipment looks like some random blocks.... very low quality! Make a great nice high quality detailed pixelart kitchen!!! Fridge, microwave, bin, sink, dishwasher, some funny stickers or other funny elements, etc."
- **Now (the kitchen, end of phase):**
  - **Fridge** with door handle, top-freezer split, magnets on the door ("DO NOT EAT MY YOGURT", a "GIT PUSH --FORCE" sticker, a Hello Kitty magnet, a Barcelona souvenir).
  - **Microwave** with a digital clock display, two control buttons, a beeper, a glass door with a plate visible inside.
  - **Sink** with a faucet (two-tone: spout + handle), a dish rack with three plates and a cup, a soap dispenser.
  - **Dishwasher** with a control panel and a "LOADED — 47 ITEMS" sign gag.
  - **Kettle** on the counter with steam.
  - **Bin** with a foot pedal and a "RECYCLING" label.
  - **Coffee grinder** next to the coffee machine.
  - **Menu board** sign on the wall: "TODAY'S MENU: COFFEE ☕ / TOMORROW'S MENU: ALSO COFFEE / SPECIAL: COFFEE, BUT DECAF" (the existing sign, kept).
  - **Stickers / decoration**: a fire-extinguisher near the door, a small houseplant on the counter, a "CLEAN AS YOU GO" poster (joke, also motivational).
- **3D models in separate files (per ADR-0016):** each new piece of furniture is a function in `src/engine/furniture/<name>.ts` that returns a `THREE.Group`. The world layout imports the function and places the mesh.
- **Why:** "kitchen equipment looks like some random blocks" — the user wants real detail, not placeholder boxes. The kitchen is also one of the most-photographed rooms in any office sim; it's the first thing a player shows off in a screenshot.

### C-37 — Per-NPC unique speech bubbles + think-bubbles for every NPC (2026-08-31)

- **Section changed:** `src/engine/bubbles.ts`, new `src/content/npc-bubbles.ts`.
- **Was:** there is one shared `INTER_NPC_LINES` pool of 10 generic lines, and bubbles only fire when two NPCs are within 2.5m of each other. The user: "all people should say something in the bubble from time to time. ideally something unique for them, connected with their profession and character."
- **Now:**
  - Each NPC has its own bubble line pool, 5-10 lines, tied to their role and personality (e.g. Marek: "Did the deploy go out? Anything on fire? / Slack is down again." Klaudia: "Networking is just friendships with ROI / Thoughts on this post?"). Burek has dog-appropriate lines ("WOOF! / Is that bacon?").
  - **Bubbles fire on two triggers:**
    1. **Two NPCs within 2.5m** — bubble from one of them (existing).
    2. **Solo thought bubble** — every 30-60s per NPC, drawn from the NPC's solo pool, fires only if no inter-NPC bubble is currently on screen.
  - **The CEO has a special "team motivation" line pool** — he occasionally says pseudo-motivational startup things to the room: "We are a family. A very productive family. With KPIs."
- **Why:** every NPC should have a personality the player can articulate. Speech bubbles are the cheapest way to show personality. The same pool of 10 lines for everyone is the difference between "they have dialogue" and "they have character."
- **Implementation:** `src/content/npc-bubbles.ts` exports `NPC_BUBBLE_POOLS: Record<NpcId, { solo: string[]; pair: string[] }>`. The bubble system picks from the right pool depending on whether the bubble is solo (any NPC) or pair (the speaker's `pair` pool).

### C-38 — Add a CEO character with GLM-authored IT/startup dialogues (2026-08-31)

- **Section changed:** `src/content/npcs.ts`, `src/content/dialogues.ts` (new CEO tree), `src/content/npc-schedule.ts`.
- **Was:** Maciek is "the CTO" with a small dialogue tree. There is no CEO.
- **Now:** **Add a new character: the CEO.**
  - **Name:** "Dawid" (Lucas's first suggestion; final name comes from GLM).
  - **Role:** "CEO".
  - **Personality:** typical IT/startup CEO. Funny, pseudo-motivational, mentors in a funny way, pushes, fires a one-liner every 30 seconds.
  - **Availability:** at the start of the game (first 1-2 days), Dawid is "in a meeting" or "not in the office" and refuses to talk to the player. After the player completes the first training quest (flag `got-acme-contract`), Dawid becomes available.
  - **Dialogue (delegate to GLM-5.3 via `opencode`):** ~50 lines across a 3-5 turn first-meeting tree, an "announce a company event" tree, a "give the player a new client" tree, a "performance review" tree, and a "fireside chat" easter-egg tree (Lucas's suggestion to GLM).
  - **Schedule:** the CEO is at his CEO desk every period. He does not random-walk. He is always reachable in the CEO office.
- **Why:** "where is CEO? Add new character, the CEO of the company, with unique personality, and unique dialogues ... CEO should sit inside the CEO office on his huge desk! GLM should create dialogues typical to IT/startup CEOs! funny, pseudo-motivational, mentoring in funny way, or pushing, etc. CEO may not want to talk to us at the beginning when we just started work, later CEO may give us tasks, come to us and ask directly for something."
- **Implementation:** the NPC is `dawid` (id), `Dawid` (name), `CEO` (role). The new dialogue tree is in `src/content/dialogues.ts` under `dawid: { first-meeting, announce-event, give-task, performance-review, fireside }`. The first-meeting tree is gated on `got-acme-contract`; without the flag, talking to Dawid gives a one-line brush-off. The CEO task tree chains a new quest after the first meeting ("Dawid wants you to lead the React workshop — earn $1500").

### C-39 — NPC rotates ANIMATED to face the player on dialogue, returns to previous direction after (2026-08-31)

- **Section changed:** `src/engine/npc-controller.ts`, `src/ui/dialogue.ts`, `src/engine/walk-to-face.ts`.
- **Was:** when the player initiates a conversation, the NPC's `rotation.y` is set to the face-the-player angle INSTANTLY. The user: "when we start conversation the NPC should always rotate in our direction, so we talk to NPCs face, not in the back like now... after conversation NPC should get back to previous position. [with animation]"
- **Now:**
  - **On dialogue open:** the controller stores the NPC's current `rotation.y` as `previousFaceY` and sets a target `facePlayerY`. Over 0.4s the controller slerps the actual `rotation.y` from the current value to `facePlayerY`. If the rotation needs to go the "long way" (more than 180°), it picks the short way (existing `shortestPathYaw` helper).
  - **During dialogue:** the NPC's `rotation.y` is pinned to the slerped target. Idle animations on the NPC are paused (no typing, no sipping).
  - **On dialogue close:** the controller slerps back from the current `rotation.y` to `previousFaceY` over 0.6s. After the slerp completes, the NPC returns to its schedule or its idle animation.
- **Why:** "after conversation NPC should get back to previous position" and "rotate with animation" — both are explicit user requests. The current instant-snap is jarring.
- **Implementation:** the controller keeps a per-NPC `faceOverride: { target: number; from: number; t: number; duration: number } | null`. On dialogue open the controller is told `setFaceOverride(id, facePlayerY, 0.4)`. The per-frame update slerps `rotation.y` toward `target` while `t < 1`. On dialogue close the controller is told `setFaceOverride(id, previousFaceY, 0.6)`. The schedule and bubble systems use the OVERRIDDEN face, not the schedule face, while an override is active.

### C-40 — Women NPC arms and shoulders a little wider (2026-08-31)

- **Section changed:** `src/engine/npc-mesh.ts`.
- **Was:** `addHumanoidArms(group, bodyColor, x = 0.38)` for males, `x = 0.22` for females. Lucas: "women arms/shoulder are too close to body, they should be a little bit, just a little bit wider, now they are almost inside the body."
- **Now:** female arms `x = 0.30` (was 0.22) — wider by 0.08m on each side. Shoulder box width also increased from 0.5m to 0.55m (matching the male 0.6m better). The arms are still inside the body silhouette (no clipping), but the gap between arm and body is now visible.
- **Why:** user feedback. The female silhouette was too narrow.
- **Implementation:** the constants in `addHumanoidArms` and `createFemaleMesh` are the only changes. The breast and lower-body positions are unchanged.

### C-41 — Intro cinematic explains the game, the goal, and the rules (2026-08-31)

- **Section changed:** `src/engine/cinematic.ts`, `src/main.ts`.
- **Was:** the intro cinematic exists but shows only "Day one. Don't mess up. Don't mess up." (C-07). The user: "where are intos with dialogues and explaining what this game is, the goal and rules etc????"
- **Now:** a multi-stage intro that mixes visuals and dialogue:
  1. **Exterior establishing shot** (existing).
  2. **Approach the door** (existing).
  3. **Walk through the door** (existing).
  4. **First NPC wave (cutscene):** a short "day 1 morning" sequence — the player avatar (third-person) walks in through the door, sees the NPCs already at their desks and a few walking in (Burek sniffs the player's shoe, Marek waves, Zosia checks her watch). The player avatar then walks to their own desk and sits down. Total length 8-12 seconds.
  5. **Inner monologue overlay** (3 lines, auto-advanced, the player's inner voice):
     - "Day one at DevPowers + Edukey. 30 days. Don't go bankrupt. Don't embarrass yourself."
     - "I'm an IT trainer now. Clients, contracts, courses. The whole thing."
     - "Bartek is my team lead. He said 'see you Monday.' Today is Monday. I'm terrified."
  6. **First quest appears in the quest log:** "Talk to Bartek — your team lead."
- **Why:** Lucas wants the player to know what they are doing, what the goal is, and what the rules are, BEFORE the player is dropped into the office. The intro is the onboarding. The first quest is the next step.
- **Implementation:** new `src/engine/intro-cinematic.ts` (or a section in `cinematic.ts`) with the multi-stage timeline. The inner monologue is drawn on the lower-third of the screen with the same typewriter effect used in dialogue. The "first NPC wave" is a tween of the existing NPCs to their "walking in" positions, then to their "at desk" positions.

### C-42 — Cutscenes and events (2026-08-31)

- **Section changed:** `src/engine/cutscene.ts` (new), `src/game/events.ts`, `src/content/events.ts`.
- **Was:** the game has no cutscenes. Random events are just text in the quest log. Lucas: "where are cutscenes and events in the game????"
- **Now:** two new cutscene types:
  - **Day-start cutscene (morning, 4-6s).** The camera dollies from the player's spawn position to a "view of the office" angle. NPCs that have not yet arrived at their desk walk in. The player is then given control.
  - **CEO entrance cutscene (random per day, 1-2 times).** When the CEO enters his office in the morning, the camera pans to the glass wall, shows the CEO walking to his desk, the Batman sign glints briefly. The player is then given control.
  - **Event cutscene (random, 1-2 per day).** When a major event fires (e.g. "the printer caught fire", "Tomek pushed to main on a Friday", "it's Klaudia's birthday and the office has cake"), the camera pans to the relevant NPC / object, plays a 3-5s tween, then returns to the player.
- **Why:** cutscenes are how the player LEARNS the world. They are the cheapest way to make the office feel alive. A player who never sees a cutscene thinks the office is static.
- **Implementation:** new `src/engine/cutscene.ts` with a small timeline runner. The cutscene timeline is an array of `(dt: number, scene: Scene, camera: Camera) => void` steps plus durations. The main loop pauses user input while a cutscene is running, and a small "skip" hint appears in the bottom-right. Events declare a `cutscene?: CutsceneStep[]` field; the main loop fires the cutscene when the event is eligible.

### C-43 — 3D model library: one .ts per object, reusable across rooms and cutscenes (2026-08-31) — captures ADR-0016

- **Section changed:** new `src/engine/furniture/` directory, `src/content/world-layout.ts` uses the furniture factories.
- **Was:** every piece of furniture is an inline anonymous function or a single line in `src/engine/scene.ts`. There is no separate file per object.
- **Now:** every reusable 3D object is a function in `src/engine/furniture/<name>.ts` that returns a `THREE.Group`. The world layout imports the function and places the mesh. Examples: `fridge.ts`, `microwave.ts`, `kettle.ts`, `dishwasher.ts`, `bin.ts`, `coffee-grinder.ts`, `soap-dispenser.ts`, `dish-rack.ts`, `plant-counter.ts`. The new kitchen pass (C-36) is the first user of this convention. Future passes (CEO office decoration, meeting-room whiteboard, training-room desks) will use the same convention.
- **Why:** "All 3D models in the game must be saved in SEPARATE FILES (separate objects, reusable, easy to import anywhere)." Reuse avoids drift: a single `fridge` function is used in the kitchen, the CEO office, and the future office pantry.

---

## 14. Definition of Done (per phase, used by the orchestrator and QA agents) — REVISED 2026-08-29

The agent orchestrator uses the following per-phase Definition of Done. A phase is "done" only when ALL of the following are true. The agent does NOT push and does NOT tell Lucas the phase is "done" until every check is green.

1. **Type-checks.** `pnpm typecheck` exits 0.
2. **Unit tests pass.** `pnpm test` exits 0. New tests are added for any new pure functions (TDD: test first, see it fail, then implement — see `AGENTS.md` PR-8).
3. **E2E smoke test passes** (where applicable). The Playwright smoke for the phase's key state exits 0. New e2e tests are added for any new user-facing flow.
4. **Visually verified.** A Playwright screenshot of the key state of the phase is taken and saved to `screenshots/<phase>-<state>.png`. The screenshot is described by `agy -p "describe this screenshot, including: what room is shown, are NPCs visible, is the player visible, is there any 'roof' or 'outside' visible, is the lighting correct"`. The description is saved as `screenshots/<phase>-<state>.txt` (or in the commit body) and is part of the PR. The description does not contain regression phrases ("looks like a roof from outside", "no clear office interior visible", "no NPCs visible", "player avatar clipped through wall").
5. **QA-reviewed.** A QA pass by an independent CLI agent (`codex exec --sandbox workspace-write "..."` or `agy -p "..."`). The reviewer confirms: no regressions, no debug logs left in, no new console errors, the new code follows the project's patterns, the PRD acceptance criteria for the phase are met. The verdict is "pass" or "pass with minor nits"; "fail" means the phase is not done.
6. **Committed in logical chunks.** `git log` shows the new work as one or more granular commits (one logical change per commit). The commit messages say WHAT and WHY, not "WIP" or "fixes". The agent does NOT use `git add -A` / `-.` / `--all`.
7. **Pushed to GitHub.** `git push origin <current-branch>` runs after steps 1-6 are all green. The push is the phase boundary. The agent reports the push URL to Lucas in the final message. Mid-phase pushes are forbidden.
8. **Revert-on-break is always available.** Because every phase is committed AND pushed, if a phase breaks something seriously and the agent can't fix it within one round of attempts, the agent reverts (`git revert <bad-commit>` or `git reset --hard <last-good>` after a clean working tree), reports what was reverted, and continues. The agent does NOT keep going on a broken state hoping to fix it later.
9. **Lucas has seen the screenshot and the QA verdict.** The agent shows the screenshot to Lucas, summarizes the QA verdict, and waits for Lucas to ack the phase before starting the next one. The agent does NOT auto-advance.
10. **TDD process applied.** Any new pure function in `src/` was test-first (a failing test, then the function). The test commit precedes the function commit (or the cycle is collapsed into one commit when the function is small). This is enforced by PR-8 in the project AGENTS.md.
11. **3D-testing research completed (one-time, project-wide).** Before the next phase that adds non-trivial 3D logic, the agent has run a research brief delegated to `agy -p` (or `codex exec`) on the current (2026) best practice for testing three.js code. The output is in `.agent-briefs/threejs-testing-research.md`. The agent adopts the recommendation or documents the deviation. This is a one-shot task; it does not block phase progress but must be done before the next 3D-heavy phase starts.

The user MUST see a screenshot (or summary) of each phase's key state before the next phase begins. If the user is interrupted and gives a new instruction, the new instruction overrides the current phase's plan; the phase's in-progress work is parked. The agent does NOT mark a phase "done" while the user is still reviewing.

This Definition of Done is mirrored in `AGENTS.md` PR-4 and PR-8 and in `~/AGENTS.md` HR-6.

---

## 12. Further Notes

### Open questions deferred
- **Music / SFX**: To be discussed after MVP ships. Chiptune is the obvious aesthetic match; either procedurally generated or pulled from a CC0 library.
- **Title**: Working title is "AI Trainer Simulator" — placeholder, will be replaced by a GLM-suggested title (see ADR for current decision).
- **Polish/English**: Copy is in English for MVP. If the audience wants Polish later, the dialogue file is structured for easy translation.
- **Save format versioning**: A `version: 1` field will be added to the save JSON from day one. Future format changes will include migration logic.

### Deferred to later iterations
1. Second location (a coworking space, a client office, a conference venue).
2. More mini-games (Stack Overflow, Vendor Demo, Survive the Meeting, Kill the Prod Server).
3. Long-term "become the best in the GALAXY" arc: as the player levels up, NPCs start mentioning "the Galaxy Trainers Association", "the Interstellar IT Cup", etc. The arc is narrative-only; the gameplay loop stays the same.
4. More NPCs (5 in MVP, scaling to 12-20 in later iterations).
5. Photo mode.
6. Sound design and music.
7. Polish translation.
8. A simple "career path" tree: Junior → Senior → Principal → "Galaxy-Class Trainer" with stat-gated branches.
9. Replayable daily challenges with leaderboard (local only).

### Assumptions made (no user interview conducted by request)
Per Lucas's brief, the user-interview step was skipped and the PRD was written directly from his detailed brief. The following assumptions were baked in:

- **A1.** Lucas is OK with English-only MVP and is willing to read the tech docs in English.
- **A2.** Lucas is OK with no music/SFX in the MVP (deferred to a later iteration).
- **A3.** Lucas is OK with the MVP being a single location (one office).
- **A4.** The "best in the GALAXY" is a long-running narrative arc, not a literal space-faring mechanic. The comedy comes from escalation, not from literal galaxy-hopping.
- **A5.** The MVP will run as a static-served Vite dev server (or built static site) with no backend. All state in `localStorage`.
- **A6.** The game's tone is adult-but-not-cringe. Off-color jokes are OK if they're accurate to IT culture; slurs, sexism, racism are not.
