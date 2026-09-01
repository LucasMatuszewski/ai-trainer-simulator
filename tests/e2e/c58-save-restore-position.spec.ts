/**
 * C-58 visual + state regression: Continue restores the last player pose.
 *
 * Seeds localStorage with a returning save whose playerPose sits away
 * from the door spawn, reloads, clicks Continue on the title screen,
 * and asserts through the __aitrainer debug hook that the player is
 * back at the saved spot with the saved view yaw/pitch (not at the
 * office door defaults x=1, z=5, yaw=0).
 *
 * Then teleports (the QA hook drives setPlayerPose, the same path a
 * dialogue's conversation staging uses) and asserts the 1 Hz pose
 * tracker persists the new pose into the save blob.
 *
 * Run with: pnpm exec playwright test tests/e2e/c58-save-restore-position.spec.ts
 *
 * Refs: docs/CHANGELOG.md C-58, src/game/state.ts (set-player-pose),
 * src/main.ts (maybeSavePlayerPose / flushPlayerPose / startOffice restore).
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

// Mirrors GameState (saveVersion 1). The pose is at (2, 4.5) - open
// floor near the main door but clearly NOT the (1, 5) spawn - looking
// back toward +X/+Z with a slight downward tilt.
const SAVE = {
  saveVersion: 1 as const,
  cash: 2000,
  day: 3,
  timeOfDay: "morning" as const,
  character: { name: "Alex", specialization: "generalist" as const, trait: "debugger" as const },
  stats: { credibility: 50, caffeine: 30, patience: 50, focus: 50 },
  npcRelationships: { bartek: 50, klaudia: 50, marek: 50, zosia: 50, pawel: 50 },
  flags: { "_intro-played": true, "_seen-intro-toast": true },
  inventory: [],
  bankruptcyStartedOnDay: 0,
  totals: { cashEarned: 0, miniGamesWon: 0, miniGamesLost: 0, dialoguesFinished: 0 },
  playerPose: { x: 2, z: 4.5, yaw: 2.1, pitch: -0.15 },
};

test("C-58: Continue restores the saved player position and view rotation", async ({ page }) => {
  // Seed the save BEFORE any app code runs, so the title screen mounts
  // with hasSave() === true and Continue enabled.
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, SAVE);

  await page.goto("/");
  await expect(page.locator(".title-screen")).toBeVisible();
  await expect(page.locator('[data-action="continue"]')).toBeEnabled();
  await page.click('[data-action="continue"]');

  // Office loaded.
  await expect(page.locator(".hud")).toBeVisible();
  await page.waitForTimeout(600);

  // Player restored to the saved pose, not the door spawn.
  const pose = await page.evaluate(() => {
    const a = window.__aitrainer!;
    return { player: a.getPlayer(), yaw: a.getYaw(), pitch: a.getPitch(), camera: a.getCamera() };
  });
  expect(pose.player.x).toBeCloseTo(2, 4);
  expect(pose.player.z).toBeCloseTo(4.5, 4);
  expect(pose.yaw).toBeCloseTo(2.1, 4);
  expect(pose.pitch).toBeCloseTo(-0.15, 4);
  // First-person camera: eye height above the player, matching rotation.
  expect(pose.camera.y).toBeCloseTo(pose.player.y + 1.65, 3);
  expect(pose.camera.x).toBeCloseTo(2, 4);
  expect(pose.camera.z).toBeCloseTo(4.5, 4);

  await page.screenshot({ path: `${SCREENSHOT_DIR}/c58-01-restored-position.png` });
});

test("C-58: the pose tracker persists the live position into the save", async ({ page }) => {
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, SAVE);
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await expect(page.locator(".hud")).toBeVisible();

  // Teleport somewhere else (same code path dialogue staging uses).
  // (4, 2) is open office floor.
  await page.evaluate(() => window.__aitrainer!.teleport(4, 2, 0.5));

  // The tracker saves at ~1 Hz; give it a generous window.
  await expect
    .poll(async () => {
      return page.evaluate(() => {
        const raw = localStorage.getItem("aitrainer:save:v1");
        return raw ? (JSON.parse(raw) as { playerPose?: { x: number; z: number; yaw: number } }).playerPose : null;
      });
    }, { timeout: 5_000 })
    .toEqual({ x: 4, z: 2, yaw: 0.5, pitch: -0.15 });
});
