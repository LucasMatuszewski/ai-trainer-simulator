import { chromium } from "@playwright/test";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
const log = [];
page.on("console", (m) => { if (m.type() === "error") log.push("ERR: " + m.text()); });
page.on("pageerror", (e) => log.push("PE: " + e.message));
await page.goto("http://localhost:5173/", { waitUntil: "load" });
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.click('[data-action="new"]');
await page.click('[data-spec-id="ai"]');
await page.click('[data-trait-id="debugger"]');
await page.click('[data-action="begin"]');
await page.waitForTimeout(3000);
// Walk to the kitchen doorway so we are inside the luncher radius.
async function walkUntil(key, reached, label) {
  for (let i = 0; i < 200; i++) {
    const pos = await page.evaluate(() => window.__aitrainer.getPlayer());
    if (reached(pos)) { console.log(label, "reached", pos); return pos; }
    await page.evaluate((k) => window.dispatchEvent(new KeyboardEvent("keydown", { code: "Key" + k.toUpperCase(), key: k, bubbles: true })), key);
    await page.waitForTimeout(120);
    await page.evaluate((k) => window.dispatchEvent(new KeyboardEvent("keyup", { code: "Key" + k.toUpperCase(), key: k, bubbles: true })), key);
    await page.waitForTimeout(30);
  }
  throw new Error(label + " failed");
}
await walkUntil("w", ({ z }) => z <= -1.5, "north of doorway");
try { await walkUntil("d", ({ x }) => x >= 9.5, "into kitchen"); } catch (e) { console.log("(couldn't enter kitchen - testing from doorway)"); }
// Trigger lunch window
await page.evaluate(() => window.__aitrainer.debugSkipPeriod());
await page.waitForTimeout(2000);
// Snapshot 1: at lunch fire time
let npcs = await page.evaluate(() => window.__aitrainer.inspectNpcs());
const kitchenStates = npcs.filter((n) => n.position.x > 9.78 && n.position.x < 19 && n.position.z > -7 && n.position.z < 7);
const stateCounts = kitchenStates.reduce((acc, n) => { acc[String(n.state)] = (acc[String(n.state)] || 0) + 1; return acc; }, {});
console.log("LUNCH+5s kitchen state distribution:", JSON.stringify(stateCounts));
const dwellingPair = kitchenStates.filter((n) => n.state === "dwelling");
const walkingPair = kitchenStates.filter((n) => n.state === "walking");
console.log("  dwelling:", dwellingPair.map((n) => n.npcId).join(","));
console.log("  walking :", walkingPair.map((n) => n.npcId).join(","));
await page.waitForTimeout(15000); // sit and let bubbles fire
npcs = await page.evaluate(() => window.__aitrainer.inspectNpcs());
const late = npcs.filter((n) => n.position.x > 9.78 && n.position.x < 19 && n.position.z > -7 && n.position.z < 7);
const stateById = npcs.reduce((acc, n) => { acc[n.npcId] = n.state; return acc; }, {});
const allLuncherWalking = npcs.filter((n) => ["bartek","klaudia","marek","zosia","pawel","kasia","tomek","ania","janusz","grazyna","maciek","przemek"].includes(n.npcId) && n.state === "walking");
console.log("Luncher walking positions (kitchen should be x>9.78):");
allLuncherWalking.forEach((n) => console.log("  " + n.npcId + " @ x=" + n.position.x.toFixed(2) + " z=" + n.position.z.toFixed(2)));
console.log("LUNCH+20s kitchen state distribution:", JSON.stringify(late.reduce((acc, n) => { acc[String(n.state)] = (acc[String(n.state)] || 0) + 1; return acc; }, {})));
await page.screenshot({ path: "screenshots/qa-lunch-bubble.png" });
console.log("CONSOLE ERRORS:", log.length ? log.join("\n") : "none");
await browser.close();
