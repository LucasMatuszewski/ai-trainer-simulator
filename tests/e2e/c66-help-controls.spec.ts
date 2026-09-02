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

  await page.keyboard.press("Escape");
  await expect(help).toBeHidden();
});

test("Z ends the current day from the office", async ({ page }) => {
  test.setTimeout(30_000);
  await startOffice(page);

  await page.keyboard.press("z");
  await expect(page.getByRole("heading", { name: /day \d+ summary/i })).toBeVisible();
});
