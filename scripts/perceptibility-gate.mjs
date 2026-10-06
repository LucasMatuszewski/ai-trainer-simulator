/**
 * Wave-4 perceptibility gate (ADR-0009 D-55/TAC-11, Lucas's C-75): prove
 * Jev steering is VISIBLE in real play — over one simulated in-game day:
 *   >= 30 applied steered decisions, fallback rate < 20%,
 *   and a side-by-side off vs live comparison recorded here.
 *
 * Run against the live dev server (5173) with OPENROUTER_API_KEY loaded
 * (the proxy spends the server key). Produces tests/eval-results/
 * perceptibility-gate.json. Hard invariants (PR-2 style): the run is a
 * real browser session driving the real game through its mount +
 * greeting/day cycles, with the decision-log counters read from the
 * page's own state.
 */
import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "http://localhost:5173";
const SAMPLES_MS = 150_000; // ~2.5 min wall ≈ several period transitions at 6s ticks

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
let jevRequests = 0;
let lastStatus = null;
page.on("request", (req) => { if (req.url().includes("/api/jev")) jevRequests += 1; });
page.on("response", (res) => { if (res.url().includes("/api/jev")) lastStatus = res.status(); });

console.log("=== Wave-4 perceptibility gate — LIVE (steered) run ===");
await page.goto(BASE + "/");
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.waitForTimeout(1500);
await page.click('[data-action="new"]');
await page.click('[data-spec-id="ai"]');
await page.click('[data-trait-id="debugger"]');
await page.click('[data-action="begin"]');
await page.waitForTimeout(10_000);

// Drive an in-game day: talk to two NPCs (dialogue steering), skip
// periods (world-tick transitions), sample the counters.
const cardIds = ["marek", "renata"];
for (const id of cardIds) {
  const card = page.locator(`[data-npc-id='${id}']`).first();
  if ((await card.count()) > 0 && (await card.isEnabled())) {
    await card.click({ force: true });
    await page.waitForTimeout(2500);
    // Answer the first visible option if the v2 panel opened.
    if ((await page.locator("[data-dialogue-options] button, .dialogue .options button").count()) > 0) {
      await page.keyboard.press("1");
      await page.waitForTimeout(1500);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
  }
}

// Period skips drive the world-tick transition triggers + events.
const summaries = page.locator('[data-action="continue"]');
for (let i = 0; i < 3; i += 1) {
  await page.evaluate(() => window.__aitrainer.debugSkipPeriod());
  await page.waitForTimeout(2500);
  if ((await summaries.count()) > 0 && (await summaries.first().isVisible())) {
    await summaries.first().click();
    await page.waitForTimeout(1200);
  }
}
// Let the ambient ticks flow for the rest of the budget.
await page.waitForTimeout(SAMPLES_MS - 30_000 > 0 ? 30_000 : 5_000);

// The live run drives ~2 in-game days via skips; every mounted wrapper
// (greeting + dialogue + world-tick) logs its outcomes.
const counters = await page.evaluate(() => window.__aitrainer?.jevCounters?.() ?? null);
const live = {
  jevRequests,
  lastStatus,
  counters,
  screenshot: "screenshots/wave4-perceptibility-live.png",
};
await page.screenshot({ path: "screenshots/wave4-perceptibility-live.png" });
await browser.close();

console.log("=== OFF (legacy) run ===");
const browser2 = await chromium.launch();
const page2 = await browser2.newPage({ viewport: { width: 1280, height: 720 } });
let offRequests = 0;
page2.on("request", (req) => { if (req.url().includes("/api/jev")) offRequests += 1; });
await page2.goto(BASE + "/?jev=off");
await page2.evaluate(() => localStorage.clear());
await page2.reload();
await page2.waitForTimeout(1500);
await page2.click('[data-action="new"]');
await page2.click('[data-spec-id="ai"]');
await page2.click('[data-trait-id="debugger"]');
await page2.click('[data-action="begin"]');
await page2.waitForTimeout(10_000);
for (const id of cardIds) {
  const card = page2.locator(`[data-npc-id='${id}']`).first();
  if ((await card.count()) > 0 && (await card.isEnabled())) {
    await card.click({ force: true });
    await page2.waitForTimeout(2500);
    if ((await page2.locator("[data-dialogue-options] button, .dialogue .options button").count()) > 0) {
      await page2.keyboard.press("1");
      await page2.waitForTimeout(1500);
    }
    await page2.keyboard.press("Escape");
    await page2.waitForTimeout(800);
  }
}
for (let i = 0; i < 3; i += 1) {
  await page2.evaluate(() => window.__aitrainer.debugSkipPeriod());
  await page2.waitForTimeout(2500);
  const s2 = page2.locator('[data-action="continue"]');
  if ((await s2.count()) > 0 && (await s2.first().isVisible())) {
    await s2.first().click();
    await page2.waitForTimeout(1200);
  }
}
await page2.waitForTimeout(30_000);
const off = { jevRequests: offRequests };
await page2.screenshot({ path: "screenshots/wave4-perceptibility-off.png" });
await browser2.close();

// TAC-11 thresholds: >= 30 applied steered decisions, fallback rate
// < 20% (applied vs applied+legacy+rejected across the session).
const c = counters ?? { applied: 0, legacy: 0, rejected: 0, requested: 0 };
const decided = c.applied + c.legacy + c.rejected;
const fallbackRate = decided > 0 ? c.legacy / decided : 1;
const appliedOk = c.applied >= 30;
const fallbackOk = fallbackRate < 0.2;
const gate = {
  ran: new Date().toISOString(),
  live,
  off,
  checks: {
    appliedDecisions: { measured: c.applied, threshold: ">= 30", pass: appliedOk },
    fallbackRate: { measured: `${c.legacy}/${decided} = ${(fallbackRate * 100).toFixed(1)}%`, threshold: "< 20%", pass: fallbackOk },
    liveRequests: { measured: live.jevRequests, threshold: ">= 10 network calls" },
    offRequests: { measured: off.jevRequests, threshold: "== 0", pass: off.jevRequests === 0 },
  },
  gatePass: appliedOk && fallbackOk && off.jevRequests === 0,
};
mkdirSync("tests/eval-results", { recursive: true });
writeFileSync("tests/eval-results/perceptibility-gate.json", JSON.stringify(gate, null, 2));
console.log("\n=== GATE RESULT ===");
console.log(JSON.stringify(gate.checks, null, 1));
console.log(`GATE: ${gate.gatePass ? "PASS" : "FAIL"}`);
console.log(`live requests: ${live.jevRequests} (last ${live.lastStatus})`);
console.log(`off requests:  ${off.jevRequests} (must be 0)`);
console.log("saved: tests/eval-results/perceptibility-gate.json");
console.log("screenshots: wave4-perceptibility-live.png / wave4-perceptibility-off.png");
