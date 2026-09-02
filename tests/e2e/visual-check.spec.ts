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
  pressMs = 120,
) {
  for (let index = 0; index < 150; index += 1) {
    const position = await page.evaluate(() => window.__aitrainer!.getPlayer());
    if (reached(position)) return;
    await page.keyboard.press(key, { delay: pressMs });
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
  // No canvas click: the walk helpers drive window-level key events,
  // and a world click raycasts the scene — hitting an NPC would open
  // a dialogue and intentionally block the walk.

  await capture(page, screenshots[0]);

  await walk(page, "w", 3);
  await capture(page, screenshots[1]);

  // C-62/C-64: the player starts in the reception, so first leave
  // north through the clear centre doorway (x in [-1.5, 1.5]) into
  // the main office. Straight-line key walks cannot corner, so every
  // leg must END inside a collision-free lane: thread the ~1.3 m lane
  // between Maciek's desk column (x=[-4,-2], z=[-7,-6]) and the west
  // wall desks (x=[-7,-6], z=[4.5,6.5]), then west into the perimeter
  // aisle, north past the desk row, and east to line up with the
  // narrow north doorway at x=0.
  await walkUntil(page, "w", ({ z }) => z <= 5, "reception doorway into the main office");
  await walkUntil(page, "a", ({ x }) => x <= -4.4, "lane between the desk columns");
  await walkUntil(page, "w", ({ z }) => z <= -7.4, "north along the clear lane");
  await walkUntil(page, "a", ({ x }) => x <= -8.4, "main west perimeter aisle");
  await walkUntil(page, "w", ({ z }) => z <= -8, "north wall approach");
  await walkUntil(page, "d", ({ x }) => x >= 0, "training doorway alignment");
  await capture(page, screenshots[2]);

  await walkUntil(page, "w", ({ z }) => z <= -13, "training room interior");
  await capture(page, screenshots[3]);

  // Back south through the same clear lane between the desk columns
  // used on the outbound leg (the west aisle is not passable south of
  // z=-7.5: the server rack occupies x=[-9,-8], z=[7.9,8.9]), then
  // across to the kitchen and through the CTO doorway. Stay north of
  // the inflated north desk AABBs (edge z=-7.35) while crossing west.
  await walkUntil(page, "s", ({ z }) => z >= -8.5, "return from training", 40);
  await walkUntil(page, "a", ({ x }) => x <= -4.4, "lane between the desk columns (return)");
  await walkUntil(page, "s", ({ z }) => z >= 5, "main south corridor");
  // Stop north of the centre but SOUTH of Ania's desk (her inflated
  // AABB spans z=[-3.85,-1.15] at x=[6,7]): the east crossing needs
  // z inside (-1.15, 0.65), the lane between Ania's and Grazyna's
  // desks, even with key-press overshoot.
  await walkUntil(page, "w", ({ z }) => z <= -0.5, "clear meeting table north side");
  await walkUntil(page, "d", ({ x }) => x >= 8.5, "east wall lane approach");
  await walkUntil(page, "s", ({ z }) => z >= 0, "kitchen doorway alignment", 20);
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
