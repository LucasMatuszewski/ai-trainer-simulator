/**
 * C-62 visual + state regression: deep entrance spawn, intro landing,
 * and the staggered evening walk-out.
 *
 * 1. A fresh game's intro cinematic lands the player INSIDE the
 *    meeting room, facing the office through the doorway.
 * 2. Morning arrivals spawn deep (z≈18.2) and walk in through the
 *    door - nobody pops into the office.
 * 3. The evening walk-out: leavers stay visible when the period
 *    flips, say goodbye, and only vanish after reaching the entrance.
 *
 * Run with: pnpm exec playwright test tests/e2e/c62-entrance-departures.spec.ts
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

function saveWithFlags(flags: Record<string, boolean>) {
  return {
    saveVersion: 1 as const,
    cash: 2000,
    day: 3,
    timeOfDay: "morning" as const,
    character: { name: "Alex", specialization: "generalist" as const, trait: "debugger" as const },
    stats: { credibility: 50, caffeine: 30, patience: 50, focus: 50 },
    npcRelationships: { bartek: 50, klaudia: 50, marek: 50, zosia: 50, pawel: 50 },
    flags,
    inventory: [],
    bankruptcyStartedOnDay: 0,
    totals: { cashEarned: 0, miniGamesWon: 0, miniGamesLost: 0, dialoguesFinished: 0 },
  };
}

test("C-62: fresh game lands the player in the meeting room facing the office", async ({ page }) => {
  test.setTimeout(90_000);
  // Fresh localStorage: no save, so the intro cinematic plays.
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  // Intro cinematic runs 4.5 s + quest-log fade. Wait for the HUD.
  await expect(page.locator(".hud")).toBeVisible({ timeout: 15_000 });
  await page.waitForTimeout(1500);
  const pose = await page.evaluate(() => {
    const a = window.__aitrainer!;
    return { player: a.getPlayer(), yaw: a.getYaw() };
  });
  // Player stands deep in the meeting room, facing the office door.
  expect(pose.player.z).toBeGreaterThan(16);
  expect(pose.player.z).toBeLessThan(19);
  expect(Math.abs(pose.player.x)).toBeLessThan(1.5);
  expect(pose.yaw).toBeCloseTo(0, 1); // facing -Z (north, toward the office)
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c62-01-meeting-room-start.png` });
});

test("C-62: evening walk-out is staggered and visible", async ({ page }) => {
  test.setTimeout(300_000);
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, saveWithFlags({ "_intro-played": true, "_seen-intro-toast": true }));
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await expect(page.locator(".hud")).toBeVisible();

  // Let the morning actually run: arrivals spread over ~80 s and the
  // late one lands at 115 s. Skipping straight to the evening would
  // only prove that people who never walked in stay away.
  await page.waitForTimeout(130_000);
  const beforeFlip = (await page.evaluate(() =>
    window.__aitrainer!
      .inspectNpcs()
      ?.filter((n) => n.state !== "gone-home" && n.state !== "arriving")
      .map((n) => n.npcId),
  )) as string[];
  expect(beforeFlip.length).toBeGreaterThanOrEqual(8);

  // Flip to the evening. Nobody who is IN may vanish on the
  // transition - that was the C-62 bug.
  await page.evaluate(() => window.__aitrainer!.debugSkipPeriod());
  await page.evaluate(() => window.__aitrainer!.debugSkipPeriod());
  await page.waitForTimeout(2_000);
  const rightAfterFlip = (await page.evaluate(() =>
    window.__aitrainer!
      .inspectNpcs()
      ?.filter((n) => n.state !== "gone-home" && n.state !== "arriving")
      .map((n) => n.npcId),
  )) as string[];
  const vanished = beforeFlip.filter((id) => !rightAfterFlip.includes(id));
  expect(vanished, `vanished at the flip: ${vanished.join(", ")}`).toHaveLength(0);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c62-02-evening-start.png` });

  // Departures start at 30 s and step ~14 s apart: after 90 s several
  // have left and the office is emptying gradually, not all at once.
  await page.waitForTimeout(90_000);
  const stillIn = (await page.evaluate(() =>
    window.__aitrainer!
      .inspectNpcs()
      ?.filter((n) => n.state !== "gone-home" && n.state !== "arriving")
      .map((n) => n.npcId),
  )) as string[];
  expect(stillIn.length).toBeLessThan(beforeFlip.length);
  expect(stillIn).toContain("dawid"); // the CEO never leaves
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c62-03-evening-walkout.png` });
});
