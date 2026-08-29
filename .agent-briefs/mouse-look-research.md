# Mouse-Look Decision Research Brief

**Date:** 2026-08-29
**Author:** Orchestrator (Claude / fable-5)
**Target project:** `AI Trainer Simulator` (3D first-person browser game, three.js, 480x270 internal canvas)

## Context

PRD C-01 (Lucas, 2026-08-29) mandates a first-person camera. PRD C-02 (Lucas) sets the control scheme: WASD to move, mouse to look, E to interact. The remaining design question is **how the mouse-look mode integrates with the rest of the game UI**, which is a strategic question Lucas wants answered by data, not by the agent.

Lucas's words (verbatim): "we still need to decide if mouse should be hidden and limited to the game view during we walk and allow switching between mouse vs FPS controls with some keyboard key to use HUD, or maybe rather we should have the mouse all the time available and need to hold the mouse button to rotate so we always can use mouse to click objects. This is strategical decision about game design that you should research and base on best preactices. Did you already delegate research about this? you should make this decision based on data and analyses, experiences of other game designer and best practices in the industry for this type of games mixing RPG with economy and simulations where we have also some interactive HUD, or maybe we should make the full RPG immersive game? Rather simulation with jokes/irony and economy + elements of RPG, not full immersion. It should be funny game, not immersive game. But this is decision to make based on research data".

## The research question

What is the best mouse-look + HUD-interaction pattern for a **simulation game with RPG elements, humor, and an interactive HUD** — NOT a fully-immersive RPG? Compare the major patterns (full pointer lock vs. RMB-hold vs. free-mouse), and recommend one with reasoning grounded in 2024-2026 player research and design precedents.

## What "interactive HUD" means for this game

The AI Trainer Simulator has:
- A roster panel on the right (NPC cards: click to talk). The roster is the **primary** way to choose who to talk to.
- A quest log on the bottom-right.
- A help modal (top-right `?`).
- HUD readouts: time of day, current period, money, engagement.
- Speech bubbles above NPCs (3D, not DOM).
- Dialogue overlay (full-screen modal).

In a fully-immersive game, the mouse is locked; the player must press a key to free the mouse, then click. In a simulator with a busy HUD, this is friction.

## The major patterns

### Pattern A — Full pointer lock (FPS / immersive sim)
- Mouse locked to canvas on click. The OS cursor is hidden.
- All mouse movement rotates the view.
- To use HUD buttons, press `Esc` (or a key) to release the lock.
- **Precedents:** Doom, Half-Life, Skyrim, Deus Ex, modern immersive sims.
- **Pros:** the most "you are there" feel; precise mouse-look.
- **Cons:** the player must alt-tab mental context every time they want to read the quest log. For a sim with a busy HUD, this is friction. Lucas said: "it should be funny game, not immersive game."

### Pattern B — Free mouse + RMB-hold for look (Deus Ex / modern immersive sim variant)
- The OS cursor is visible by default. The player can click HUD buttons immediately.
- Holding **right mouse button** hides the cursor and rotates the view. Releasing RMB returns to free-mouse.
- LMB is reserved for "interact with what's under the cursor" (raycast).
- **Precedents:** Deus Ex: Human Revolution / Mankind Divided, modern immersive sims, ARMA.
- **Pros:** the player can use HUD without alt-tabbing; RMB is the standard for "I want to aim/look, not click." The LMB is for "I want to interact."
- **Cons:** the RMB has to be reachable. On a laptop without a real right mouse button, this is a problem (trackpads can usually two-finger-click, but it's not great).

### Pattern C — Free mouse + cursor-on-edge look (Sims / strategy hybrids)
- The OS cursor is always visible.
- Moving the cursor to the edge of the canvas rotates the view. Moving the cursor to the center stops rotation.
- The cursor is the player's "I am here" pointer. Clicking NPC cards / buttons is always available.
- **Precedents:** The Sims, SimCity, Rollercoaster Tycoon, Stardew Valley's "look-around" mode (with mouse wheel / hotkey).
- **Pros:** the most natural for a sim / management game. The player can read the HUD and the world simultaneously.
- **Cons:** the look-controls are imprecise. "Edge of screen" look is fine for slow sims; for walking around a 3D world, it's tedious.

### Pattern D — Hybrid: free mouse + RMB-hold + LMB-walk-toward (the recommendation to evaluate)
- Default: free mouse, OS cursor visible. Player can click HUD buttons.
- RMB-hold: cursor hidden, mouse-look active. LMB is still "interact with what's under the cursor." WASD works in both modes.
- Releasing RMB: cursor returns.
- LMB in free-mouse mode: raycast from camera through cursor; if it hits an NPC or interactable, walk-to-face + open dialogue.
- LMB in RMB-hold mode: same raycast, but no walk-to-face (player is already aiming).
- **Precedents:** the in-game pause menus of Mass Effect (the cursor is the UI), combined with the immersive-sim look controls of Deus Ex.
- **Pros:** the player can stay in free-mouse mode for slow sim-paced play (click roster cards, read quest log) AND switch to RMB-hold for precise looking or combat-style moments. WASD works in both modes.
- **Cons:** the mode-switching has to be discoverable. The HUD has to teach the player "RMB to look around" with a one-time prompt.

### Pattern E — Hybrid: free mouse + mouse-to-edge + RMB-snap
- Free mouse by default. Mouse at edge = look.
- RMB = "snap" to center and engage pointer lock (a la Half-Life 2's quick-zoom).
- Releasing RMB = back to free mouse.

## What the research should answer

1. **What is the current (2024-2026) consensus in the simulation-RPG genre?** Examples: Stardew Valley (free mouse + scroll-to-zoom), Two Point Hospital (free mouse + WASD), Rollercoaster Tycoon (free mouse + edge-look), The Sims (free mouse + camera-pan), Papers Please (free mouse only), Disco Elysium (free mouse only). What's the median?
2. **What do players of simulation games say they prefer?** Look at Steam reviews, Reddit r/gamedesign, GDC talks, and design blogs (e.g. Game Maker's Toolkit). What are the friction points?
3. **What is the best pattern for a game with a roster panel + quest log + dialogue overlay + speech bubbles?** This is the key constraint. The HUD is not just a HUD; it's a primary interface (the roster is how you choose NPCs).
4. **What does the agent team recommend for this specific game (simulation with RPG elements, humor, not fully immersive)?** Give a concrete recommendation with reasoning.
5. **What are the edge cases?** Trackpad users (no RMB), gamepad users (Xbox controller / PS5), accessibility (one-handed play, eye-gaze), mobile (this is desktop only, but worth noting).

## Output format

The output should be a 4-8 page markdown report at `.agent-briefs/mouse-look-report.md`. The report should include:

- **TL;DR** with a concrete recommendation (which pattern).
- **Pattern comparison** (A, B, C, D, E) with pros, cons, and game precedents for each.
- **Player-research data** — what simulators do today, what reviews say, what GDC talks recommend.
- **Genre analysis** — what simulation-RPG games (Stardew, Two Point, Papers Please, Disco Elysium, The Sims) do and why.
- **Edge cases** — trackpads, gamepads, accessibility.
- **Recommendation** — one pattern, with a 2-3 paragraph justification grounded in the data.
- **Implementation outline** — what changes in `src/engine/controls.ts`, `src/main.ts`, the HUD, and the click-to-talk raycaster.

## How to invoke

```bash
agy --mode accept-edits --add-dir /home/lucas/DEV/Projects/ai-trainer-simulator --print-timeout 30m -p "Read .agent-briefs/mouse-look-research.md. Then research the current (2024-2026) best practices for mouse-look + HUD-interaction patterns in simulation games with RPG elements. Output: .agent-briefs/mouse-look-report.md, a 4-8 page report following the structure in the brief. Do not edit any code. Do not commit. Do not push. Cite sources."
```

After the report lands, the orchestrator writes an ADR (`.agent-briefs/0007-mouse-look-decision.md` or similar) summarizing the decision, updates the PRD C-02 entry, and starts implementation in Phase 2.

## Definition of done

- The report exists at `.agent-briefs/mouse-look-report.md`.
- It contains: TL;DR with a concrete recommendation, pattern comparison (A-E), player-research data, genre analysis, edge cases, recommendation, implementation outline.
- It cites at least 5 specific game precedents (e.g. Stardew, Two Point, Papers Please, Disco Elysium, The Sims) with what they do and why.
- It cites at least 2-3 sources (GDC talks, Steam review analyses, design blogs) for player-research data.
- It gives ONE concrete recommendation, not a survey. The orchestrator will adopt it (or override it with a strong argument, surfaced).
