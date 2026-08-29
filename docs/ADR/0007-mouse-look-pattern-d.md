# ADR-0007: Mouse-Look Pattern D (Hybrid Free-Mouse + RMB-Hold + Toggle)

**Date:** 2026-08-29
**Status:** Accepted
**Supersedes:** the original "over-shoulder follow camera with pointer-lock mouse-look" decision in `000-main-architecture.md` (D-09). The camera is still first-person per D-08, but the mouse-look pattern is now Pattern D, not Pattern A.
**Refs:** PRD C-01 (FPS camera), PRD C-02 (controls), `.agent-briefs/mouse-look-report.md` (research)

---

## 1. Context

PRD C-01 (Lucas, 2026-08-29) mandates a first-person camera. PRD C-02 mandates WASD to move and mouse to look. The remaining design question was **how the mouse-look integrates with the rest of the game UI** — a strategic question Lucas explicitly asked the orchestrator to research.

Lucas's verbatim: "we still need to decide if mouse should be hidden and limited to the game view during we walk and allow switching between mouse vs FPS controls with some keyboard key to use HUD, or maybe rather we should have the mouse all the time available and need to hold the mouse button to rotate so we always can use mouse to click objects. This is strategical decision about game design that you should research and base on best preactices... Rather simulation with jokes/irony and economy + elements of RPG, not full immersion. It should be funny game, not immersive game."

The orchestrator delegated the research to `agy` (Gemini 3.1 Pro, vision + web research). Output: `.agent-briefs/mouse-look-report.md` (27 KB, 9 sections, 9 sources). The research evaluated five patterns (A through E) against the AI Trainer Simulator's constraints.

## 2. Decision

**Adopt Pattern D: Hybrid Free-Mouse + RMB-Hold + Space/Tab Toggle + LMB Raycast / Walk-to-Face.**

This is the recommended pattern in the agy report (9.5/10 suitability for sim-RPG) and matches Lucas's instinct ("we should have the mouse all the time available and need to hold the mouse button to rotate so we always can use mouse to click objects").

### 2.1 Behavior

| State | Cursor | Mouse behavior | LMB | RMB | WASD |
|---|---|---|---|---|---|
| **Free Mouse (default)** | OS cursor visible | Hovering over UI or 3D viewport | Raycast to NPC/object. If NPC: walk-to-face + open dialogue. If object: activate it. | Engage mouse-look (cursor hidden) | Move in camera-relative direction |
| **Mouse-Look (RMB hold)** | OS cursor hidden | Mouse delta → yaw + pitch (FPS-style) | Interact with crosshair target (raycast from center of screen) | — (already engaged) | Move in camera-relative direction |
| **Mouse-Look (Space/Tab toggle)** | OS cursor hidden | Same as RMB hold | Same as RMB hold | Release | Same |
| **Walk-to-Face (transient)** | OS cursor visible | — (player is walking) | — | — (cancels walk) | — (player is walking) |
| **Dialogue** | Cursor on dialogue overlay | — (dialogue takes input) | Pick dialogue option | — | — |

### 2.2 Hotkeys

- **WASD** = move in camera-relative direction (works in all states)
- **Shift** = sprint
- **LMB (free mouse)** = raycast → walk-to-face + open dialogue (or activate object)
- **LMB (mouse-look)** = raycast from screen center → interact with crosshair target
- **RMB (hold)** = engage mouse-look, hide cursor
- **Space** = toggle mouse-look (for trackpad / MacBook users without a real RMB)
- **Tab** = toggle roster panel (existing; was toggle mouse-look, now Tab is roster to avoid conflict with Space)
- **E** = interact with what is in front of the player (raycast from screen center) — keyboard alternative to LMB
- **Esc** = close dialogue / cancel walk-to-face / release mouse-look toggle

### 2.3 State machine

```
FREE_MOUSE (default)
  ├─ RMB down   → MOUSE_LOOK_HOLD
  │                └─ RMB up   → FREE_MOUSE
  ├─ Space down → MOUSE_LOOK_TOGGLE
  │                └─ Space / Esc → FREE_MOUSE
  ├─ LMB on NPC → WALK_TO_FACE → DIALOGUE (on arrival)
  ├─ LMB on roster card → WALK_TO_FACE → DIALOGUE
  └─ E key      → WALK_TO_FACE (raycast from screen center)

DIALOGUE_ACTIVE
  ├─ LMB on option → next node / close
  ├─ Esc → close dialogue → FREE_MOUSE
  └─ (mouse-look and WASD are blocked while dialogue is open)
```

## 3. Rationale

### 3.1 Why Pattern D (not A, B, C, E)

From `.agent-briefs/mouse-look-report.md`:

| Pattern | Suitability for Sim-RPG | Verdict |
|---|---|---|
| A — Full pointer lock | 4/10 | Rejected. Destroys workflow. Player has to press a meta-key to click roster cards. Violates Fitts's Law for the most common action. |
| B — Free mouse + RMB-hold look | 7/10 | Good baseline, but no viewport raycast and no trackpad fallback. |
| C — Cursor-on-edge look | 5/10 | Rejected. Incompatible with first-person interior navigation. |
| **D — Hybrid (the chosen one)** | **9.5/10** | **Optimal.** Combines free-mouse UI accessibility with FPS-style look controls. Trackpad fallback via Space/Tab toggle. |
| E — Free mouse + edge + RMB-snap | 4/10 | Rejected. Unpredictable; first-person edge-pan causes rotational nausea. |

### 3.2 Why this fits the AI Trainer Simulator

- The game has a **dense, interactive HUD** (roster, quest log, help modal, top stats, day-end summary). The player must click these elements without unlocking a pointer-lock.
- The game is a **simulation with humor + RPG elements**, not a fully-immersive FPS. Lucas's words: "it should be funny game, not immersive game."
- The roster is the **primary** way to choose who to talk to. Locking the mouse to the canvas would force the player to use `Tab`/`Esc` every time they wanted to engage a coworker.
- The camera is first-person (C-01). The player needs the FPS-style look to navigate multi-room spaces (Phase 4: kitchen, training room, meeting room, CTO office). RMB-hold or Space-toggle delivers that on demand.
- The game is desktop-only (no mobile port). RMB is the standard "I want to aim/look, not click" gesture on PC. Trackpad users get Space/Tab.
- Walk-to-face + raycast on LMB in free-mouse mode means **LMB always does the right thing**: click a roster card, click a 3D NPC, click an interactive object. The player never has to "enter" a mode to interact.

### 3.3 Genre precedents (from the report)

- **Two Point Hospital / Campus**: free cursor + WASD pan + RMB-drag for camera orbit. Same diagnostic role for HUD as the AI Trainer Simulator's roster.
- **Disco Elysium**: pure point-and-click. 2,300+ lines of branching dialogue = the same shape as AI Trainer Simulator's planned dialogue volume. Direct clickability is paramount.
- **WoW / FFXIV**: free cursor default, RMB-hold for instant camera pitch/yaw, LMB-drag for camera orbit. Survived 20+ years of player testing.
- **Deus Ex: Human Revolution / Mankind Divided**: free mouse + RMB-hold to look + LMB interact. The closest single-player sim-RPG analogue to our design.
- **Mass Effect series**: pause/tactical wheel + free cursor + RMB-drag camera. The pause-tactical pattern is the design seed for our standup / classroom / client-call modes (Phase 5).

### 3.4 What the research rejected (and why)

- **Pointer lock (Pattern A)**: the player would have to press `Tab`/`Esc` to read the quest log, click the roster, or open settings. For a sim with this HUD density, it's friction. Confirmed in the report: "having to break pointer lock just to click Bartek in the roster violates Fitts's Law."
- **Cursor-on-edge (Pattern C)**: incompatible with first-person navigation in tight spaces (CTO office doorway, kitchen door, training room). Edge-pan in first-person causes rotational nausea.
- **Pattern E (free + edge + RMB-snap)**: hybrid of A and C, but the snap behavior is unpredictable and depends on the scene graph. Skipped.

## 4. Implementation

### 4.1 New / changed modules

| Module | Change | Why |
|---|---|---|
| `src/engine/controls.ts` | Rewrite. FPS camera (camera = player + eye_height; rotation = yaw + pitch). Add `setMouseLookActive(boolean)`, `isMouseLookActive()`, `getYaw()`, `setYawPitch()`. State machine: FREE_MOUSE / MOUSE_LOOK_HOLD / MOUSE_LOOK_TOGGLE. RMB and Space hotkeys. `contextmenu` event prevented. | First-person (C-01) + Pattern D |
| `src/engine/interaction-raycaster.ts` (new) | Pure raycast helpers: `ndcFromMouse(x, y, width, height)`, `raycastNpc(scene, ndc, npcMeshes)`, `raycastInteractable(scene, ndc, interactableMeshes)`. | LMB in free-mouse mode |
| `src/engine/walk-to-face.ts` (new) | Pure function `planWalkToFace(player, npc) → { target: Vector3, npcYaw: number }`. | Walk-to-NPC before dialogue (C-09) |
| `src/ui/cursor.ts` (new) | Custom pixel-art cursor (C-03). 4 states: default / hover-npc / hover-object / busy. DOM overlay following mousemove. Cursor hidden in mouse-look mode. | Replaces OS cursor with retro feel |
| `src/main.ts` | Wire `createControls` in `startOffice()`. Call `controls.update(dt)` in frame loop. Add LMB mousedown handler that calls interaction-raycaster. Add RMB and Space hotkeys. Hide `playerGroup` during FPS play. | Make WASD + LMB + RMB work |
| `src/engine/scene.ts` | Already exposes `npcMeshes` and `interactableMeshes` (from Phase 0). Add `interactableMeshes` population (coffee machine, whiteboard, printer). | For raycast hits |
| `tests/unit/controls.test.ts` | Existing 4 tests stay. Add: FPS camera state (camera.position === player + eye_height), pitch clamp, mouse-look active toggles, RMB + Space hotkeys. | TDD (PR-8) |
| `tests/unit/interaction-raycaster.test.ts` (new) | NDC math, raycast hit/miss on mock scene, hover-NPC vs hover-object detection. | TDD (PR-8) |
| `tests/unit/walk-to-face.test.ts` (new) | Player in front of NPC, behind, side, 45°, already at distance. | TDD (PR-8) |

### 4.2 Visual regression

`tests/e2e/phase-2-fps-walk.spec.ts` (new): Playwright loads the page, clicks "Begin Career," waits for office, takes a screenshot of the FPS view at spawn. Asserts: no roof visible, NPCs visible, lighting correct, no player avatar visible. `agy -p "describe this screenshot..."` saved to `screenshots/phase-2-default-view.txt`. No regression phrases. Pattern D describes the visual gate (see `~/.agents/skills/threejs-visual-qa/SKILL.md`).

### 4.3 Default state on first load

- Player spawns at `(0, 0, 6)` (the office door), facing `-Z` (into the office).
- Camera is at `(0, EYE_HEIGHT, 6)`, looking down `-Z`. No avatar visible.
- Cursor is the custom pixel-art cursor, in `default` state.
- HUD is visible (top stats, right-side roster, bottom-right quest log, top-right help `?`).
- WASD moves the player. RMB-hold or Space engages mouse-look.

## 5. Trade-offs

### 5.1 What we give up vs. a fully-immersive FPS

- The mouse is visible by default. The game does not have the "I am in the game" feel of Half-Life or Deus Ex. **Mitigation:** the custom pixel-art cursor matches the game's retro aesthetic. The cursor hidden during mouse-look delivers the immersive feel for exploration.
- The player has a tiny "mode switch" moment when going from "click roster card" to "walk around the office." **Mitigation:** the player does not need to switch modes — WASD works in both, and the click-to-talk raycast walks the player to the NPC.

### 5.2 What we gain

- The player can stay in the simulation flow: glance at the roster, click a card, watch the player walk to the NPC, read the dialogue, click "End day," see the summary, click "Next day." No meta-key required.
- The first-person view is preserved for spatial navigation (Phase 4: walking into the kitchen, peeking into the CTO's glass office).
- The custom pixel-art cursor + Space/Tab toggle handles trackpads and MacBooks (where RMB-hold is awkward).
- The walk-to-face pattern means the player can click any NPC from anywhere on the roster, and the avatar walks there. The player does not have to be physically close.

## 6. Open questions / follow-ups

- **Custom cursor asset:** we need 4 cursor sprites (default, hover-npc, hover-object, busy). The agy report recommends CSS-painted or canvas-drawn. The orchestrator will delegate the asset creation to `agy` or `opencode` (GLM is text-only, so GLM cannot draw).
- **Walk-to-face animation:** the player avatar is hidden in FPS mode. When walk-to-face triggers, do we (a) show a third-person "establishing shot" of the player walking, (b) keep FPS and just lerp the camera, or (c) just instantly teleport the player with a fade? Decision: (b) — keep FPS, lerp the camera. The walk is short (1.5m) and fast (~0.5s); a third-person shot would be jarring.
- **Interaction prompt:** the existing `interaction-prompt.ts` shows `[E] Talk to Bartek` when the player is in a trigger volume. In Pattern D, the player can also LMB-click the NPC. The prompt should read `[LMB] Talk to Bartek (or [E])` to teach the player both options.
- **Walk-to-face abort:** if the player clicks elsewhere during a walk, the walk cancels and the new LMB-target becomes the destination.

## 7. References

- `.agent-briefs/mouse-look-report.md` — the research report (27 KB, 9 sections)
- `.agent-briefs/mouse-look-research.md` — the research brief
- `docs/PRD.md` C-01, C-02 — the original decisions this ADR refines
- `docs/ADR/000-main-architecture.md` D-08 (FPS camera) — the parent decision
- `~/.agents/skills/threejs-visual-qa/SKILL.md` — the visual regression gate
- Hodent, C. (2021). *The Gamer's Brain.* CRC Press. (Cited in the research report)
- Game Maker's Toolkit (2020). *How Control Schemes Shape Player Agency.* (Cited)
- Two Point Studios (2018–2024). *Two Point Hospital / Campus UI/UX Post-Mortems.* (Cited)
- ZA/UM (2019). *Disco Elysium Design Case Study.* (Cited)
- W3C (2024). *Pointer Lock API 2.0 Specification.* (Cited)
