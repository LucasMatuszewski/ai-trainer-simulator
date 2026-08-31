import { chromium } from "@playwright/test";

// Phase 3.6 visual QA (PRD C-45): 3 screenshots + state assertions.
// 1. no-in-place-bob baseline (morning, stationary desk NPC)
// 2. lunch window kitchen crowd (4-8 NPCs, staggered, kitchen/dwelling)
// 3. period-transition walk (NPC mid-path, state "walking")
// Requires the __aitrainer.debugSkipPeriod hook + inspectNpcs().state
// (both land with part 3b). Run: node .agent-briefs/phase36-visual-qa.mjs

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE ERROR:", m.text()); });
page.on("pageerror", (e) => console.log("PAGE ERROR:", e.message));

await page.goto("http://localhost:5173/");
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.click('[data-action="new"]');
await page.click('[data-spec-id="ai"]');
await page.click('[data-trait-id="debugger"]');
await page.click('[data-action="begin"]');
await page.waitForTimeout(6000);

const inspectNpcs = () => page.evaluate(() => window.__aitrainer.inspectNpcs());
const skipPeriod = () => page.evaluate(() => window.__aitrainer.debugSkipPeriod());
const inKitchen = (n) => n.position.x > 9.78 && n.position.x < 19 && n.position.z > -7 && n.position.z < 7;

// Walk helper (from walk-to-kitchen.mjs): hold a key until a condition.
async function walkUntil(key, reached, label) {
  for (let i = 0; i < 200; i++) {
    const pos = await page.evaluate(() => window.__aitrainer.getPlayer());
    if (reached(pos)) { console.log(label, "reached", pos); return pos; }
    await page.evaluate((k) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { code: "Key" + k.toUpperCase(), key: k, bubbles: true }));
    }, key);
    await page.waitForTimeout(120);
    await page.evaluate((k) => {
      window.dispatchEvent(new KeyboardEvent("keyup", { code: "Key" + k.toUpperCase(), key: k, bubbles: true }));
    }, key);
    await page.waitForTimeout(30);
  }
  throw new Error(label + " failed");
}

// --- Screenshot 1: morning baseline, no in-place bob -----------------
// Bartek (and 8 others) have morning === afternoon positions: the
// old bug bobbed them in place. Screenshot the desk rows.
await page.waitForTimeout(2500);
let npcs = await inspectNpcs();
const bartek = npcs.find((n) => n.npcId === "bartek");
console.log("BARTEK STATE:", bartek?.state, "pos", bartek?.position);
await page.screenshot({ path: "screenshots/phase36-desk-no-bob.png" });
console.log("SAVED: phase36-desk-no-bob.png");

// --- Move to the kitchen doorway BEFORE triggering lunch --------------
await walkUntil("w", ({ z }) => z <= -1.5, "north of doorway");
await walkUntil("d", ({ x }) => x >= 9.5, "into kitchen doorway");
await walkUntil("s", ({ z }) => z >= 0.5, "step back south, kitchen in view north");

// --- Screenshot 2: lunch window crowd --------------------------------
await skipPeriod(); // morning -> afternoon, lunch window opens
let kitchenCount = 0;
for (let i = 0; i < 30; i++) {
  await page.waitForTimeout(3000);
  npcs = await inspectNpcs();
  kitchenCount = npcs.filter((n) => inKitchen(n) && (n.state === "kitchen" || n.state === "dwelling")).length;
  const walking = npcs.filter((n) => n.state === "walking").length;
  console.log(`t=${(i + 1) * 3}s kitchen=${kitchenCount} walking=${walking}`);
  if (kitchenCount >= 4) break;
}
await page.screenshot({ path: "screenshots/phase36-lunch-kitchen.png" });
console.log("SAVED: phase36-lunch-kitchen.png kitchenCount=", kitchenCount);

// --- Screenshot 3: period transition walk ------------------------------
// afternoon -> evening: NPCs interrupt kitchen sequences and re-plan.
await skipPeriod();
let walker = null;
for (let i = 0; i < 20; i++) {
  await page.waitForTimeout(700);
  npcs = await inspectNpcs();
  walker = npcs.find((n) => n.state === "walking") ?? null;
  if (walker) break;
}
console.log("TRANSITION WALKER:", walker ? `${walker.npcId} @ ${JSON.stringify(walker.position)}` : "none captured");
await page.screenshot({ path: "screenshots/phase36-period-transition.png" });
console.log("SAVED: phase36-period-transition.png");

console.log("NPC INSPECT:", JSON.stringify(npcs).slice(0, 2500));
await browser.close();
console.log("DONE");
