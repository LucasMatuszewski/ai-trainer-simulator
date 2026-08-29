# Brief: research the current (2026) best practice for testing three.js code

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`. The codebase is TypeScript + Vite + vitest. We have:
- `vitest` already configured (`pnpm test` runs `vitest run`)
- `Playwright` already installed for browser testing/screenshots
- 42 unit tests passing (as of 2026-08-29) — these are pure functions only (AABB collision, reducer, controls math)
- 13 NPCs in a three.js scene, 480x270 internal canvas with CSS pixelated upscale, low-res WebGLRenderTarget

The user (Lucas) flagged: "not sure how to test 3D game in three.js - you should research this (I suggest to delegate this task and writing tests to other agent)."

## What I want from you (NO CODE, NO EDITS)

A research report. Answer the following, citing sources (URLs, GitHub repos, blog posts, papers):

### 1. What can be unit-tested in three.js code?

Specifically:
- Math (vector / matrix / quaternion operations)
- Raycasting (pure function, deterministic)
- AABB / OBB / sphere collision (we already do this)
- Quaternion-based lookAt math
- Animation blending logic
- Scene-graph queries (find object by name, find all objects of type)
- The reducer / state machine (we already do this)
- The dialogue tree (pure function over a tree)
- NPC schedule lookup (pure function)
- The walk-to-face planner (pure function)
- The cinematic timeline (pure function)
- Save/load round-trip

For each, give: yes/no, what's the assertion style, and an example test pattern.

### 2. What requires a headless browser?

Specifically:
- three.js scene setup (does it need WebGL?)
- Renderer config
- Camera math (the actual rendered output)
- UI components
- Audio playback
- The first frame after `new Game()` runs
- Does `jsdom` + a WebGL stub work? Or do we need real Chromium?

For each, give: jsdom/WebGL stub vs real Chromium (Playwright), and a code snippet showing how to set it up.

### 3. What requires visual regression?

- Comparing two screenshots pixel-by-pixel
- AI description diff (agy describes the screenshot, the description is checked for "no NPCs visible" / "looks like a roof" / "lighting off" regressions)
- A reference image + image-diff library (e.g. pixelmatch, resemble.js)
- Playwright's `toHaveScreenshot` matcher

For each, give: a code snippet and the trade-off (false positives from anti-aliasing, slow CI runs, etc.).

### 4. Recommended minimal stack for this project

Given:
- 13 NPCs, ~50x50 multi-room world, WebGL renderer
- 480x270 internal canvas (low resolution — good for visual regression!)
- vitest already configured
- Playwright already installed
- The team is "me + Codex + agy + opencode + grok" — agy can describe screenshots for visual QA

What is the recommended minimal testing stack? Specifically:
- How many unit tests for pure functions (we already have 42; what's the right number for this game's pure-function surface area?)
- How many headless browser tests (Playwright tests that boot the game and assert something)?
- How many visual regression tests (Playwright screenshot + agy description)?
- A test pyramid for this game: ratio of unit : browser : visual

### 5. Tooling landscape (2026)

- `three-test` — does it exist? Is it maintained?
- `vitest-canvas-mock` — does it exist? Does it support three.js?
- `@playwright/test` with `toHaveScreenshot` — current state, gotchas
- `pixelmatch` / `resemble.js` — current state
- `happy-dom` vs `jsdom` for three.js tests
- Any newer libraries in 2025-2026 specifically for game testing

## Output

Write a 2-3 page report to `.agent-briefs/threejs-testing-report.md`. Use markdown. Include code snippets. Cite sources. Do not commit. Do not push.
