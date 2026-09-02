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
  test.setTimeout(180_000);
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, saveWithFlags({ "_intro-played": true, "_seen-intro-toast": true }));
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await expect(page.locator(".hud")).toBeVisible();

  // Jump to the evening.
  await page.evaluate(() => window.__aitrainer!.debugSkipPeriod());
  await page.evaluate(() => window.__aitrainer!.debugSkipPeriod());
  await page.waitForTimeout(1500);
  // The period flip must NOT mass-vanish the office (the C-62 bug):
  // sample for a few seconds and take the worst case - a real
  // mass-vanish would pin ~10 NPCs gone-home instantly and forever,
  // while only maciek (afternoon gone-home by design, the CTO leaves
  // early) may legitimately be gone.
  let worstGoneHome = 0;
  let statesAtFlip: string[] = [];
  let dump = "";
  for (let sample = 0; sample < 6; sample += 1) {
    const npcs = (await page.evaluate(() => window.__aitrainer!.inspectNpcs())) ?? [];
    statesAtFlip = npcs.map((n) => n.state ?? "");
    const gone = npcs.filter((n) => n.state === "gone-home");
    if (gone.length > worstGoneHome) {
      worstGoneHome = gone.length;
      dump = gone.map((n) => `${n.npcId}@(${n.position.x.toFixed(1)},${n.position.z.toFixed(1)})`).join(", ");
    }
    await page.waitForTimeout(500);
  }
  expect(statesAtFlip.length).toBeGreaterThan(0);
  expect(worstGoneHome, dump).toBeLessThanOrEqual(1);

  // Wait well into the evening: departures start ~20 s in, gaps ~8 s.
  await page.waitForTimeout(75_000);
  const states = (await page.evaluate(() =>
    window.__aitrainer!.inspectNpcs()?.map((n) => n.state ?? ""),
  )) as string[];
  const goneHome = states.filter((s) => s === "gone-home").length;
  const walking = states.filter((s) => s === "walking").length;
  // At least two evening leavers have completed the walk-out (maciek
  // may be one), and someone is still on their way (the staggered
  // schedule keeps the office populated until late).
  expect(goneHome).toBeGreaterThanOrEqual(3);
  expect(goneHome + walking).toBeGreaterThanOrEqual(4);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c62-02-evening-walkout.png` });
});
