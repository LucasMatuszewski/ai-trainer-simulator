/**
 * C-61 visual regression: inter-NPC speech bubbles are sharp DOM text.
 *
 * Waits for the controller's chatter to fire (first exchange lands
 * 4-8 s after mount), polls until a bubble is visible AND in the
 * viewport, then captures it - the whole point of the refactor is
 * that the text reads at native resolution from any distance, unlike
 * the old GPU-scaled canvas sprites.
 *
 * Run with: pnpm exec playwright test tests/e2e/c61-bubble-text.spec.ts
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

test("C-61: inter-NPC bubble renders as sharp DOM text", async ({ page }) => {
  test.setTimeout(120_000);
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, SAVE);
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await expect(page.locator(".hud")).toBeVisible();

  // Vantage far from the old phantom camera's frame (origin, -Z):
  // east side, facing WEST across the office at the desk columns.
  // With the C-61 camera bug, bubbles projected from a fixed camera at
  // the origin and were unreadable/absent from anywhere else.
  await page.evaluate(() => window.__aitrainer!.teleport(6, 3, Math.PI / 2));

  // Poll until a bubble with text is visible AND inside the viewport
  // (its projected position lives in the transform). Exchanges last
  // 6-8 s and repeat, so this resolves within a couple of exchanges.
  const found = await page.evaluate(() => {
    return new Promise<string>((resolvePromise) => {
      const started = performance.now();
      const scan = (): void => {
        for (const el of document.querySelectorAll<HTMLElement>(".npc-bubble:not([hidden])")) {
          const text = el.textContent?.trim() ?? "";
          const match = /translate\(([\d.]+)px,\s*([\d.]+)px\)/.exec(el.style.transform);
          if (text === "" || match === null) continue;
          const x = Number(match[1]);
          const y = Number(match[2]);
          if (x > 150 && x < 950 && y > 120 && y < 620) {
            resolvePromise(`${x}|${y}|${text}`);
            return;
          }
        }
        if (performance.now() - started < 90_000) requestAnimationFrame(scan);
        else resolvePromise("");
      };
      scan();
    });
  });
  expect(found).not.toBe("");

  // Shoot immediately while the bubble is still up.
  await page.screenshot({ path: `${SCREENSHOT_DIR}/c61-01-bubble-dom-text.png` });
});
