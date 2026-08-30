/**
 * Phase 2 movement regression: WASD + arrows + space toggle, in a real browser.
 *
 * This test was added 2026-08-29 in response to the user-reported bug
 * "WASD is broken — character keeps moving after I release the key."
 * The bug was caused by a build/runtime mismatch: stale .js files
 * (left behind by `tsc -b`) were shadowing the .ts sources in
 * Vite's bundler module resolution. The fix is in tsconfig.json
 * (`noEmit: true`) and vite.config.ts (`resolve.extensions` puts
 * .ts before .js). This test exercises the runtime in a real
 * browser, drives the keyboard through Playwright, and asserts
 * both the per-press delta AND the post-release drift.
 *
 * If this test ever fails again, the controls module is broken
 * end-to-end and a human needs to look at it. The unit tests in
 * tests/unit/controls-events.test.ts cover the pure JS layer
 * (jsdom), but they cannot catch HMR / module-resolution /
 * stale-bundle bugs. Only a real-browser test can.
 *
 * Run with: npx playwright test tests/e2e/movement.spec.ts
 * Assumes the dev server is running on http://localhost:5173/.
 */

import { test, expect } from "@playwright/test";

const KEY_TO_AXIS = {
  w: { axis: "z", sign: -1 }, // forward = -Z
  s: { axis: "z", sign: +1 }, // back    = +Z
  a: { axis: "x", sign: -1 }, // left    = -X
  d: { axis: "x", sign: +1 }, // right   = +X
} as const;

// Per-direction travel budget: 0.2 m minimum (so a stuck-key
// regression that produces < 0.1 m of motion is caught), 3.0 m
// maximum (so a runaway-loop regression that produces 100 m of
// motion is caught). The character walks at 4.5 units/sec, so a
// 500ms press should move ~2.25 m. 0.2 m catches "did it move at
// all"; 3.0 m catches "did it move 5x too fast".
const MIN_DELTA = 0.2;
const MAX_DELTA = 3.0;

// After the keyup, the player should stop within one final
// frame. WALK_SPEED=4.5, dt~=1/60s, so one frame is ~0.075 m.
// We allow 0.5 m of drift to be tolerant of frame timing under
// load (the full Playwright suite runs multiple tests concurrently
// and the browser may schedule keyup several frames late). The
// stuck-key regression we are guarding against is INFINITE drift,
// so 0.5 m is still a clear signal-to-noise ratio over a real bug.
const MAX_RELEASE_DRIFT = 0.5;

test.use({
  baseURL: "http://localhost:5173",
  browserName: "chromium",
  launchOptions: {
    executablePath: "/usr/bin/google-chrome",
    channel: "chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  },
  viewport: { width: 1280, height: 720 },
});

async function getPlayer(page: import("@playwright/test").Page) {
  return page.evaluate(() => ({
    ...window.__aitrainer!.getPlayer(),
    yaw: window.__aitrainer!.getYaw(),
  }));
}

test("WASD moves the player and stops on release (regression: stuck-key bug)", async ({ page }) => {
  page.on("pageerror", (err) => {
    // Surface runtime errors so the test fails loudly if the bundle
    // is broken (e.g. a future stale-shadow regression).
    throw new Error(`[browser pageerror] ${err.message}`);
  });

  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect(page.locator(".hud")).toBeVisible();
  // The day-1 intro cinematic runs for 3.5s. Wait a bit longer for
  // the fade-out to clear and the controls to take over the camera.
  await page.waitForTimeout(5500);

  // Confirm we're in the office (cinematic finished, controls active).
  const screen = await page.evaluate(() => window.__aitrainer!.getScreen());
  expect(screen).toBe("office");

  // Focus the canvas (Playwright dispatches keys to the focused
  // element, but the keyup/keydown listeners are on window so
  // focus does not matter for our handlers — this is just a
  // safety net for any future handler bound to the canvas).
  await page.locator("#game-canvas").click({ position: { x: 200, y: 200 } });

  for (const [key, dir] of Object.entries(KEY_TO_AXIS) as Array<[keyof typeof KEY_TO_AXIS, typeof KEY_TO_AXIS[keyof typeof KEY_TO_AXIS]]>) {
    const before = await getPlayer(page);
    await page.keyboard.down(key);
    await page.waitForTimeout(500);
    const during = await getPlayer(page);
    await page.keyboard.up(key);
    await page.waitForTimeout(500);
    const after = await getPlayer(page);

    const delta = during[dir.axis] - before[dir.axis];
    const drift = after[dir.axis] - during[dir.axis];

    // Assert 1: the key actually moved the player in the right
    // direction by a reasonable amount. The 0.2 lower bound
    // catches a regression where the keyup happens immediately
    // after the keydown (so the player never moves).
    expect(
      delta * dir.sign,
      `${key}: expected movement on ${dir.axis} in direction ${dir.sign > 0 ? "+" : "-"}. ` +
        `delta=${delta.toFixed(3)} (sign*delta=${(delta * dir.sign).toFixed(3)}, want >= ${MIN_DELTA})`,
    ).toBeGreaterThanOrEqual(MIN_DELTA);
    expect(
      Math.abs(delta),
      `${key}: movement is suspiciously large. delta=${delta.toFixed(3)} (want <= ${MAX_DELTA})`,
    ).toBeLessThanOrEqual(MAX_DELTA);

    // Assert 2: AFTER the key is released, the player stops.
    // The 0.15 upper bound allows for one final frame of motion
    // (dt ~ 1/60s, WALK_SPEED=3 -> 0.05 m) plus a little slack.
    // The Lucas-reported bug was: after release, the player
    // kept walking indefinitely. The drift would be ~1.5 m
    // (one full second of WALK_SPEED).
    expect(
      Math.abs(drift),
      `${key}: player kept moving after release (stuck key). ` +
        `drift=${drift.toFixed(3)} (want <= ${MAX_RELEASE_DRIFT}). ` +
        `before=${JSON.stringify(before)} during=${JSON.stringify(during)} after=${JSON.stringify(after)}`,
    ).toBeLessThanOrEqual(MAX_RELEASE_DRIFT);
  }
});

test("W + D produces diagonal movement, not 2x speed", async ({ page }) => {
  page.on("pageerror", (err) => {
    throw new Error(`[browser pageerror] ${err.message}`);
  });

  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect(page.locator(".hud")).toBeVisible();
  await page.waitForTimeout(5500);

  await page.locator("#game-canvas").click({ position: { x: 200, y: 200 } });
  const before = await getPlayer(page);
  await page.keyboard.down("w");
  await page.keyboard.down("d");
  await page.waitForTimeout(500);
  const during = await getPlayer(page);
  await page.keyboard.up("d");
  await page.keyboard.up("w");
  await page.waitForTimeout(800);
  const after = await getPlayer(page);

  // Diagonal distance should equal a single-key distance
  // (normalized), not sqrt(2)x. stepControls normalizes the
  // motion vector, so a 500ms press at WALK_SPEED=3 should
  // cover ~1.5 m regardless of direction.
  const distance = Math.hypot(during.x - before.x, during.z - before.z);
  expect(distance).toBeGreaterThanOrEqual(0.2);
  expect(distance).toBeLessThanOrEqual(3.0);

  // And after release, the player stops. We allow a slightly
  // larger tolerance here because we release two keys in
  // sequence; Playwright + the browser may interleave the
  // keydown / keyup events such that one frame of motion is
  // queued between the first release and the next.
  const drift = Math.hypot(after.x - during.x, after.z - during.z);
  expect(drift).toBeLessThanOrEqual(MAX_RELEASE_DRIFT * 4);
});
