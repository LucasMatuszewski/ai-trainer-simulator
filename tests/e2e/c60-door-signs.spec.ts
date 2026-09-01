/**
 * C-60 visual regression: "Kitchen" / "Meeting Room" door signs are
 * visible from the office when looking toward their doorway.
 *
 * Teleports to a natural approach spot in front of each door (facing
 * it) and captures what the player sees.
 *
 * Run with: pnpm exec playwright test tests/e2e/c60-door-signs.spec.ts
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
};

async function continueIntoOffice(page: import("@playwright/test").Page): Promise<void> {
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, SAVE);
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await expect(page.locator(".hud")).toBeVisible();
  await page.waitForTimeout(400);
}

test("C-60: Kitchen sign visible facing the kitchen door", async ({ page }) => {
  test.setTimeout(60_000);
  await continueIntoOffice(page);
  // 4.5m west of the east wall, level with the sign (z=2.3), facing
  // +X (yaw -pi/2): sign dead ahead, doorway in frame to the left.
  await page.evaluate(() => window.__aitrainer!.teleport(4.5, 2.3, -Math.PI / 2));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c60-01-kitchen-door-sign.png` });
});

test("C-60: Meeting Room sign visible facing the meeting room door", async ({ page }) => {
  test.setTimeout(60_000);
  await continueIntoOffice(page);
  // 5m north of the south wall, level with the sign (x=-2.4), facing
  // +Z (yaw pi): sign dead ahead, doorway in frame to the left.
  await page.evaluate(() => window.__aitrainer!.teleport(-2.4, 4, Math.PI));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c60-02-meeting-door-sign.png` });
});
