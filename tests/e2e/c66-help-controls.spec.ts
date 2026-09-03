import { expect, test, type Page } from "@playwright/test";
import { shot } from "./shots";

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

async function startOffice(page: Page): Promise<void> {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect.poll(() => page.evaluate(() => window.__aitrainer?.getScreen())).toBe("office");
}

test("? opens the complete controls help", async ({ page }) => {
  test.setTimeout(30_000);
  await startOffice(page);

  await page.keyboard.press("Shift+/");
  const help = page.locator(".help-modal.open");
  await expect(help).toBeVisible();
  await expect(help.getByRole("heading", { name: "Move & look" })).toBeVisible();
  await expect(help.getByText(/WASD/i)).toBeVisible();
  await expect(help.getByText(/Right mouse button/i)).toBeVisible();
  await expect(help.getByText(/Space/i)).toBeVisible();
  await expect(help.getByText(/Shift/i)).toBeVisible();
  // L-2026-09-03: F toggles in-page fullscreen; the modal is the complete
  // reference, so if this row disappears the binding must have gone too.
  await expect(help.getByText(/fullscreen/i)).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(help).toBeHidden();
});

test("Z opens the end-day confirmation; confirming ends the day", async ({ page }) => {
  test.setTimeout(30_000);
  await startOffice(page);

  // Z alone must NOT end the day anymore: it opens the confirm modal.
  // The key sits next to WASD and was ending the day on a stray press
  // (Lucas, 2026-09-02). The WebMCP end_day tool keeps bypassing this.
  await page.keyboard.press("z");
  const modal = page.locator(".endday-modal.open");
  await expect(modal).toBeVisible();
  await expect(page.locator(".endday-card")).toContainText("End the day?");

  // Escape cancels and stays in the office.
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.__aitrainer!.getScreen())).toBe("office");

  // Confirming ends the day and shows the summary.
  await page.keyboard.press("z");
  await expect(modal).toBeVisible();
  await modal.locator("[data-confirm]").click();
  await expect(page.getByRole("heading", { name: /day \d+ summary/i })).toBeVisible();
});

test("The roster End Day button confirms before ending the day", async ({ page }) => {
  test.setTimeout(30_000);
  await startOffice(page);

  await page.locator('[data-action="end-day"]').click();
  const modal = page.locator(".endday-modal.open");
  await expect(modal).toBeVisible();

  await modal.locator("[data-cancel]").click();
  await expect(modal).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.__aitrainer!.getScreen())).toBe("office");
});
