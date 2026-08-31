import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();
page.on("console", m => { if (m.type() === "error") console.log("CONSOLE ERROR:", m.text()); });
page.on("pageerror", e => console.log("PAGE ERROR:", e.message));

await page.goto("http://localhost:5173/");
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.click('[data-action="new"]');
await page.click('[data-spec-id="ai"]');
await page.click('[data-trait-id="debugger"]');
await page.click('[data-action="begin"]');
await page.waitForTimeout(6000);

await page.locator("#game-canvas").click({ position: { x: 200, y: 200 } });
await page.waitForTimeout(300);

// Walk south, then east, then north to reach the kitchen.
// Player start: (6, 0.5, 7). Need to reach the kitchen at x in [10, 18], z around -4 (counter side) or 2 (table side).
// From (6, 7) we can go north (W in three.js), reach the east doorway at x=9, then east into the kitchen.

async function walkUntil(key, reached, label) {
  for (let i = 0; i < 200; i++) {
    const pos = await page.evaluate(() => window.__aitrainer.getPlayer());
    if (reached(pos)) { console.log(label, "reached", pos); return pos; }
    // Hold the key for 120ms (same as the test harness) so the
    // frame loop sees it in the keys Set for at least one tick.
    await page.evaluate((k) => {
      const code = "Key" + k.toUpperCase();
      window.dispatchEvent(new KeyboardEvent("keydown", { code, key: k, bubbles: true }));
    }, key);
    await page.waitForTimeout(120);
    await page.evaluate((k) => {
      const code = "Key" + k.toUpperCase();
      window.dispatchEvent(new KeyboardEvent("keyup", { code, key: k, bubbles: true }));
    }, key);
    await page.waitForTimeout(30);
  }
  const finalPos = await page.evaluate(() => window.__aitrainer.getPlayer());
  throw new Error(label + " failed, final=" + JSON.stringify(finalPos));
}

await walkUntil("w", ({z}) => z <= -1.5, "north of doorway");
await walkUntil("d", ({x}) => x >= 9.5, "into kitchen");
await walkUntil("w", ({z}) => z <= -4, "toward counter");

await page.waitForTimeout(400);
const pos = await page.evaluate(() => window.__aitrainer.getPlayer());
console.log("FINAL POSITION:", pos);
await page.screenshot({ path: "screenshots/kitchen-v2-counter.png" });
console.log("SAVED: kitchen-v2-counter.png");

// Now move to look at the table area
await walkUntil("a", ({x}) => x <= 10.5, "back from counter");
await walkUntil("s", ({z}) => z >= 1, "to table");
await page.waitForTimeout(400);
const pos2 = await page.evaluate(() => window.__aitrainer.getPlayer());
console.log("FINAL POSITION 2:", pos2);
await page.screenshot({ path: "screenshots/kitchen-v2-table.png" });
console.log("SAVED: kitchen-v2-table.png");

// And now look at the door side (east) of the kitchen
await walkUntil("d", ({x}) => x >= 15, "east kitchen");
await page.waitForTimeout(400);
const pos3 = await page.evaluate(() => window.__aitrainer.getPlayer());
console.log("FINAL POSITION 3:", pos3);
await page.screenshot({ path: "screenshots/kitchen-v2-east.png" });
console.log("SAVED: kitchen-v2-east.png");

// Get NPC positions to verify nothing is inside furniture
const npcs = await page.evaluate(() => window.__aitrainer.inspectNpcs());
console.log("NPC INSPECT:", JSON.stringify(npcs).slice(0, 2000));

await browser.close();
