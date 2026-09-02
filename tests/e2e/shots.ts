import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * E2E screenshots are OPT-IN: set E2E_SCREENSHOTS=1 to capture them.
 *
 * Why (Lucas, 2026-09-02): screenshots cost real CPU on the software-WebGL
 * headless runs (ReadPixels stalls that overheat the laptop), most vantage
 * points went stale after the C-62/C-64 layout moves, and nobody analyses
 * them on every run - they are artifacts for occasional vision QA, not
 * assertions. TODO(sacs-omcq): re-author the vantage points, then
 * consider making them default again.
 */
export const SHOTS_ENABLED = process.env.E2E_SCREENSHOTS === "1";

export async function shot(page: Page, path: string): Promise<void> {
  if (!SHOTS_ENABLED) return;
  const full = resolve(path);
  mkdirSync(dirname(full), { recursive: true });
  await page.screenshot({ path: full });
}
