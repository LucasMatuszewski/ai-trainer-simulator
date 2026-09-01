/**
 * C-51 visual + behavioural check: the morning is a staggered arrival,
 * not a factory gate.
 *
 * Boots a fresh game, then samples the office roster (which shows each
 * NPC's LIVE location per the C-46 truthful-location rule) at several
 * points during the morning. The expectation:
 *   - at fade-in, some colleagues are already at their desks and
 *     several have not walked in yet ("Not in yet"),
 *   - the "Not in yet" count only ever goes DOWN,
 *   - by the end of the morning everyone is in.
 *
 * Screenshots land in tests/e2e/screenshots/ for visual QA.
 *
 * Run with: pnpm exec playwright test tests/e2e/c51-morning-arrivals.spec.ts
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

test.setTimeout(180_000);

test("C-51: the office fills up over the morning", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await page.waitForTimeout(5500);
  await expect(page.locator(".hud")).toBeVisible();

  const statuses = async (): Promise<string[]> =>
    page.locator("[data-status]").allTextContents();

  const notInYet = (rows: string[]): number =>
    rows.filter((row) => row.trim() === "Not in yet").length;

  // The roster must be on screen for the sample to mean anything - an
  // empty read would make "waiting === 0" pass vacuously.
  const rosterCount = await statuses().then((rows) => rows.length);
  expect(rosterCount).toBeGreaterThan(10);

  const samples: { t: number; screen: string; waiting: number; rows: string[] }[] = [];
  const record = async (t: number, shot: string): Promise<void> => {
    await expect
      .poll(async () => (await statuses()).length, { timeout: 5_000 })
      .toBe(rosterCount);
    const rows = await statuses();
    const screen = await page.evaluate(() => window.__aitrainer!.getScreen());
    samples.push({ t, screen, waiting: notInYet(rows), rows });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/${shot}` });
  };

  await record(6, "c51-01-fade-in.png");
  await page.waitForTimeout(40_000);
  await record(46, "c51-02-morning-mid.png");
  await page.waitForTimeout(50_000);
  await record(96, "c51-03-morning-late.png");
  await page.waitForTimeout(55_000);
  await record(151, "c51-04-morning-end.png");

  for (const sample of samples) {
    console.log(`t~${sample.t}s screen=${sample.screen} waiting=${sample.waiting} :: ${sample.rows.join(" | ")}`);
  }
  // Every sample read a full roster on the office screen.
  for (const sample of samples) {
    expect(sample.rows.length).toBe(rosterCount);
    expect(sample.screen).toBe("office");
  }

  // At fade-in the office is neither empty nor full: some are already
  // at their desks, several have not walked in yet.
  expect(samples[0]!.waiting).toBeGreaterThan(0);
  expect(samples[0]!.waiting).toBeLessThan(samples[0]!.rows.length);
  // The office only fills up - nobody un-arrives.
  for (let i = 1; i < samples.length; i += 1) {
    expect(samples[i]!.waiting).toBeLessThanOrEqual(samples[i - 1]!.waiting);
  }
  // And it does actually fill up.
  expect(samples[samples.length - 1]!.waiting).toBe(0);
  expect(samples[0]!.waiting).toBeGreaterThan(samples[samples.length - 1]!.waiting);
});
