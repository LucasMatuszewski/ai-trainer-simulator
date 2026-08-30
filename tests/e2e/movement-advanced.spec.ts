import { expect, test, type Page } from "@playwright/test";

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

const AFTER_RELEASE_MS = 300;
const BETWEEN_KEYS_MS = 200;
// Playwright's `page.keyboard.down/up` and `page.waitForTimeout`
// run with a real browser engine. The frame rate is variable when
// the suite is under load (multiple parallel test contexts). A
// loose final-position tolerance is required to avoid flakes.
const RELEASE_DRIFT_TOLERANCE = 0.25;
const FINAL_POSITION_TOLERANCE = 1.0;

type MovementKey = "w" | "a" | "s" | "d";

async function playerPosition(page: Page) {
  return page.evaluate(() => window.__aitrainer!.getPlayer());
}

test("WASD advanced: full sequence with multiple A presses, asymmetric final position", async ({ page }) => {
  page.on("pageerror", (error) => {
    throw new Error(`[browser pageerror] ${error.message}`);
  });

  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect(page.locator(".hud")).toBeVisible();
  await page.waitForTimeout(5_500);
  await expect.poll(() => page.evaluate(() => window.__aitrainer!.getScreen())).toBe("office");
  await page.locator("#game-canvas").click({ position: { x: 200, y: 200 } });

  const start = await playerPosition(page);
  expect(start.x).toBeCloseTo(0, 5);
  expect(start.y).toBeCloseTo(0.5, 5);
  expect(start.z).toBeCloseTo(6, 5);

  async function pressAndAssertStop(key: MovementKey, durationMs: number) {
    const before = await playerPosition(page);
    await page.keyboard.down(key);
    await page.waitForTimeout(durationMs);
    await page.keyboard.up(key);

    // Sample only after keyup has been dispatched. Sampling before keyup
    // incorrectly counts browser scheduling time as post-release drift.
    const released = await playerPosition(page);
    await page.waitForTimeout(AFTER_RELEASE_MS);
    const rested = await playerPosition(page);

    const movement = Math.hypot(released.x - before.x, released.z - before.z);
    const drift = Math.hypot(rested.x - released.x, rested.z - released.z);

    expect(
      movement,
      `${key}: expected movement during ${durationMs}ms press; ` +
        `before=${JSON.stringify(before)} released=${JSON.stringify(released)}`,
    ).toBeGreaterThan(0.2);
    expect(
      drift,
      `${key}: player kept moving after keyup (stuck key); ` +
        `drift=${drift.toFixed(3)}, limit=${RELEASE_DRIFT_TOLERANCE}; ` +
        `released=${JSON.stringify(released)} rested=${JSON.stringify(rested)}`,
    ).toBeLessThanOrEqual(RELEASE_DRIFT_TOLERANCE);

    await page.waitForTimeout(BETWEEN_KEYS_MS);
  }

  // Keep the path south of the desk row at z=3.5. Longer forward/right
  // legs made this controls regression depend on the current desk layout.
  // The repeated A still catches the reported "works once, then blocks"
  // failure without routing through furniture.
  await pressAndAssertStop("w", 300);
  await pressAndAssertStop("d", 300);
  await pressAndAssertStop("a", 300);
  await pressAndAssertStop("s", 300);
  await pressAndAssertStop("a", 300);

  // WALK_SPEED=4.5m/s. Expected net displacement:
  // W -1.35Z, D +1.35X, A -1.35X, S +1.35Z, A -1.35X.
  const expected = { x: -1.35, y: 0.5, z: 6 };
  const final = await playerPosition(page);

  expect(
    Math.abs(final.x - expected.x),
    `final X mismatch: expected=${expected.x.toFixed(3)} actual=${final.x.toFixed(3)}`,
  ).toBeLessThanOrEqual(FINAL_POSITION_TOLERANCE);
  expect(
    Math.abs(final.y - expected.y),
    `final Y mismatch: expected=${expected.y.toFixed(3)} actual=${final.y.toFixed(3)}`,
  ).toBeLessThanOrEqual(FINAL_POSITION_TOLERANCE);
  expect(
    Math.abs(final.z - expected.z),
    `final Z mismatch: expected=${expected.z.toFixed(3)} actual=${final.z.toFixed(3)}`,
  ).toBeLessThanOrEqual(FINAL_POSITION_TOLERANCE);
});
