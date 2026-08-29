/**
 * Phase 2 visual regression: FPS view at spawn.
 *
 * Walks the player from title through to the office and captures:
 *  1. The default FPS view at the spawn (player at the office door,
 *     eye height, looking into the office at -Z).
 *  2. The view after a small WASD walk forward.
 *  3. The player position + camera position from the __aitrainer
 *     debug hook, so a future agent can assert the camera is at
 *     the player's eye height (1.65m) and not at the over-shoulder
 *     default (1.7-2.5m).
 *
 * Run with: pnpm exec playwright test tests/e2e/phase-2-fps-spawn.spec.ts
 * Screenshots are saved to tests/e2e/screenshots/.
 *
 * Visual QA: agy -p "describe this screenshot" should report an
 * OFFICE INTERIOR, desks visible at eye level, no roof / no sky.
 *
 * Refs: ADR-0007 Pattern D, C-01 FPS camera, C-21 no roof.
 */

import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SCREENSHOT_DIR = resolve("tests/e2e/screenshots");
mkdirSync(SCREENSHOT_DIR, { recursive: true });

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

test("Phase 2 FPS spawn: eye-height camera looking into the office", async ({ page }) => {
  // Always start from a fresh state so the day-1 intro plays
  // deterministically (the cinematic hands the camera to controls
  // when it finishes; the default `__aitrainer.getCamera` is what
  // we want to assert).
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // New game -> office.
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');

  // Wait for the intro cinematic to finish (3.5s in playIntroCinematic
  // + a generous buffer for fade and quest-log reveal). The fade-out
  // overlay is full-screen and intercepts clicks; the cinematic sets
  // opacity:0 on a CSS transition, which can take ~600ms after the
  // requestAnimationFrame. We wait 5.5s to be safe.
  await page.waitForTimeout(5500);

  // The HUD is the source of truth that the office has loaded.
  await expect(page.locator(".hud")).toBeVisible();

  // The intro toast is also a good signal — it appears at ~4.1s.
  await page.screenshot({ path: `${SCREENSHOT_DIR}/phase-2-01-fps-spawn.png` });

  // The roster is on the right. The canvas should fill the LEFT
  // side; we should see the office interior, not the roof.
  const { camera, player, yaw, mouseLook } = await page.evaluate(() => {
    const a = window.__aitrainer!;
    return {
      camera: a.getCamera(),
      player: a.getPlayer(),
      yaw: a.getYaw(),
      mouseLook: a.isMouseLook(),
    };
  });
  console.log("camera =", camera, "player =", player, "yaw =", yaw, "mouseLook =", mouseLook);

  // Camera is at the player's eye height (1.65m above the player's
  // y, which is 0.5m at spawn, so total 2.15m). The previous
  // over-shoulder default put the camera at 1.7m+ at a different
  // XZ; the broken wide-shot at 0.5m. We want 2.15m at the player's
  // exact XZ.
  expect(camera.y).toBeCloseTo(player.y + 1.65, 1);
  // Camera XZ matches the player XZ (FPS camera = player position).
  expect(camera.x).toBeCloseTo(player.x, 1);
  expect(camera.z).toBeCloseTo(player.z, 1);

  // Walk forward briefly to confirm WASD is wired and the camera
  // follows the player.
  await page.locator("#game-canvas").click({ position: { x: 200, y: 200 } });
  await page.waitForTimeout(100);
  const beforeZ = (await page.evaluate(() => window.__aitrainer!.getPlayer().z)) ?? 0;
  await page.keyboard.down("w");
  await page.waitForTimeout(500);
  await page.keyboard.up("w");
  await page.waitForTimeout(100);
  const afterZ = (await page.evaluate(() => window.__aitrainer!.getPlayer().z)) ?? 0;
  // W moves the player in -Z (forward into the office). beforeZ
  // should be greater than afterZ.
  expect(afterZ).toBeLessThan(beforeZ);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/phase-2-02-fps-walked.png` });

  // Mouse-look toggle via Space (Pattern D trackpad fallback). The
  // cursor should hide while mouse-look is engaged. We then release
  // with Space.
  await page.keyboard.press("Space");
  await page.waitForTimeout(100);
  const mouseLookAfter = await page.evaluate(() => window.__aitrainer!.isMouseLook());
  expect(mouseLookAfter).toBe(true);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/phase-2-03-mouse-look.png` });
  await page.keyboard.press("Space");
  await page.waitForTimeout(100);
  const mouseLookReleased = await page.evaluate(() => window.__aitrainer!.isMouseLook());
  expect(mouseLookReleased).toBe(false);
});
