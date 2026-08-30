import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const SCREENSHOT_DIR = resolve("tests/e2e/screenshots");
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const screenshots = [
  "visual-check-1-spawn.png",
  "visual-check-2-forward.png",
  "visual-check-3-doorway.png",
  "visual-check-4-training.png",
  "visual-check-5-cto.png",
  "visual-check-6-help.png",
  "visual-check-7-dialogue.png",
] as const;

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

async function capture(page: Page, filename: (typeof screenshots)[number]) {
  await page.waitForTimeout(250);
  await page.screenshot({ path: resolve(SCREENSHOT_DIR, filename) });
}

async function walk(page: Page, key: "w" | "a" | "s" | "d", presses: number) {
  for (let index = 0; index < presses; index += 1) {
    await page.keyboard.press(key, { delay: 400 });
    await page.waitForTimeout(80);
  }
}

async function walkUntil(
  page: Page,
  key: "w" | "a" | "s" | "d",
  reached: (position: { x: number; z: number }) => boolean,
  label: string,
) {
  for (let index = 0; index < 150; index += 1) {
    const position = await page.evaluate(() => window.__aitrainer!.getPlayer());
    if (reached(position)) return;
    await page.keyboard.press(key, { delay: 120 });
    await page.waitForTimeout(30);
  }
  const finalPosition = await page.evaluate(() => window.__aitrainer!.getPlayer());
  throw new Error(`${label}: player did not reach the target corridor; final=${JSON.stringify(finalPosition)}`);
}

test("visual check: office, new rooms, help, and dialogue", async ({ page }) => {
  test.setTimeout(120_000);
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await page.waitForTimeout(5_500);
  await expect(page.locator(".hud")).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.__aitrainer!.getScreen())).toBe("office");
  await page.locator("#game-canvas").click({ position: { x: 200, y: 200 } });

  await capture(page, screenshots[0]);

  await walk(page, "w", 3);
  await capture(page, screenshots[1]);

  // Route around the center table and desk rows, then line up with
  // the narrow north doorway at x=0.
  await walkUntil(page, "a", ({ x }) => x <= -5.4, "main west aisle");
  await walkUntil(page, "w", ({ z }) => z <= -8, "north wall approach");
  await walkUntil(page, "d", ({ x }) => x >= 0, "training doorway alignment");
  await capture(page, screenshots[2]);

  await walkUntil(page, "w", ({ z }) => z <= -13, "training room interior");
  await capture(page, screenshots[3]);

  // Back through the main office's west aisle, across its clear south
  // corridor, through the kitchen, then through the CTO doorway.
  await walkUntil(page, "s", ({ z }) => z >= -8, "return from training");
  await walkUntil(page, "d", ({ x }) => x >= 1.6, "clear Pawel desk east side");
  await walkUntil(page, "s", ({ z }) => z >= -4.2, "clear north desk row");
  await walkUntil(page, "a", ({ x }) => x <= -5.4, "main west aisle return");
  await walkUntil(page, "s", ({ z }) => z >= 5, "main south corridor");
  await walkUntil(page, "d", ({ x }) => x >= 8.5, "kitchen doorway approach");
  await walkUntil(page, "w", ({ z }) => z <= 0, "kitchen doorway alignment");
  await walkUntil(page, "d", ({ x }) => x >= 18, "kitchen interior");
  await walkUntil(page, "w", ({ z }) => z <= -4, "CTO doorway alignment");
  await walkUntil(page, "d", ({ x }) => x >= 22, "CTO office interior");
  await walkUntil(page, "w", ({ z }) => z <= -9, "CTO Batman view");
  await capture(page, screenshots[4]);

  await page.locator(".quest-log-help").click();
  await expect(page.locator(".help-modal.open")).toBeVisible();
  await capture(page, screenshots[5]);
  await page.locator(".help-modal-close").click();

  await page.locator(".roster-card:not(.away)").first().click();
  await expect(page.locator(".dialogue")).toBeVisible({ timeout: 15_000 });
  await capture(page, screenshots[6]);

  for (const filename of screenshots) {
    const size = statSync(resolve(SCREENSHOT_DIR, filename)).size;
    expect(size, `${filename} should contain a rendered canvas`).toBeGreaterThan(10 * 1024);
  }

  console.log(`VISUAL_CHECK_CONSOLE_ERRORS=${JSON.stringify(consoleErrors)}`);
  console.log(`VISUAL_CHECK_PAGE_ERRORS=${JSON.stringify(pageErrors)}`);
});
