# Visual check after Phase 2-6 (run Playwright + take screenshots)

## Context

We are building AI Trainer Simulator. After shipping Phase 2
(WASD, mouse-look, FPS), Phase 3 (NPC schedule, idle, bubbles,
multi-mesh, gender), Phase 4 (multi-room world), Phase 5
(multi-turn dialogues), and Phase 6 (WebMCP tool definitions), the
user wants to see a screenshot of the current state to verify
nothing is visually broken. Lucas specifically said:

> "screen with eyes that sees if our changes are good or have
>  bugs"

This task runs the game in a real browser, takes a screenshot of
the office + the new rooms, and reports any visual anomalies
(missing meshes, blank rooms, NPC clipping, doorways that don't
look like doorways, glass walls missing, Batman sign missing,
dialogue bubbles missing, etc.).

## Files to read

- `tests/e2e/phase-2-fps-spawn.spec.ts` — the existing screenshot
  test. Use it as a template.

## What to deliver

### 1. New file: `tests/e2e/visual-check.spec.ts`

A Playwright test that:
- Goes through title → character creation → office (5.5s
  cinematic wait).
- Takes a screenshot of the office from the spawn position
  (saved as `tests/e2e/screenshots/visual-check-1-spawn.png`).
- Uses `page.keyboard.press("w")` repeatedly (with waits) to walk
  forward into the office, takes a screenshot
  (`visual-check-2-forward.png`).
- Walks to a doorway (e.g. one of the main-office doorways to the
  new rooms), takes a screenshot
  (`visual-check-3-doorway.png`).
- Walks into the Training Room (north), takes a screenshot
  (`visual-check-4-training.png`).
- Walks back to the main office, then into the CTO Office
  (glass + Batman), takes a screenshot
  (`visual-check-5-cto.png`).
- Opens the help modal and the dialogue UI (clicks a roster
  card) and takes a screenshot
  (`visual-check-6-dialogue.png`).
- Verifies that all 7 screenshots were actually created and have
  a non-trivial file size (at least 10 KB each, indicating the
  canvas has content).

The test SHOULD NOT make strict visual assertions (pixel diffs)
because we don't have a baseline. It only verifies that the
screenshots were saved.

### 2. Report

Write a report `.agent-briefs/visual-check-sol.md` summarizing:
- Whether each screenshot was created.
- The size of each screenshot in KB.
- Any console errors observed during the run.
- Any page errors observed.
- Any obviously-wrong visual elements the agent notices by
  reading the screenshot bytes (e.g. a 0 KB screenshot, or one
  much smaller than the others).

### 3. Constraints

- The test must run on the dev server (`http://localhost:5173/`)
  using the system Chrome at `/usr/bin/google-chrome`.
- Do NOT commit the screenshots themselves (they are gitignored).
  Just the test file and the report.
- Do NOT modify any other file.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/visual-check-sol.md`.
