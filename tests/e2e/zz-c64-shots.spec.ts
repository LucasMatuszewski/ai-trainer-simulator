import { test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const DIR = resolve("screenshots");
mkdirSync(DIR, { recursive: true });
test.use({
  baseURL: "http://localhost:5173",
  launchOptions: { executablePath: "/usr/bin/google-chrome", channel: "chrome", args: ["--no-sandbox"] },
  viewport: { width: 1280, height: 720 },
});
test("c64 reception + meeting room shots", async ({ page }) => {
  test.setTimeout(300000);
  await page.addInitScript(() => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify({
      saveVersion: 1, cash: 2000, day: 3, timeOfDay: "morning",
      character: { name: "Alex", specialization: "generalist", trait: "debugger" },
      stats: { credibility: 50, caffeine: 30, patience: 50, focus: 50 },
      npcRelationships: {}, flags: { "_intro-played": true, "_seen-intro-toast": true },
      inventory: [], bankruptcyStartedOnDay: 0,
      totals: { cashEarned: 0, miniGamesWon: 0, miniGamesLost: 0, dialoguesFinished: 0 },
    }));
  });
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await page.waitForTimeout(3000);
  await page.addStyleTag({ content: `.hud,.roster,#quest-log,.quest-log,.office-roster,.hud-panel,.prompt,.npc-bubble,.npc-label,#npc-label{display:none!important}` });

  async function look(px: number) {
    await page.mouse.move(640, 360);
    await page.mouse.down({ button: "right" });
    await page.mouse.move(640, 360 + px, { steps: 8 });
    await page.mouse.up({ button: "right" });
  }

  const shots: Array<[string, number, number, number, number]> = [
    // name, x, z, yaw, pitch-pixels
    ["c64-01-lobby-from-entrance", 0, 17.6, 0, 40],
    ["c64-02-reception-desk", 0.5, 15.5, -0.9, 40],
    ["c64-03-glass-west-garden", 2.0, 13.5, Math.PI / 2, 20],
    ["c64-04-sofa-corner", 1.5, 15.8, 1.9, 40],
    ["c64-05-entrance-doors-inside", 0, 14.5, Math.PI, 20],
    ["c64-06-plant-wall", -1.0, 13.5, -Math.PI / 2, 20],
    ["c64-07-kitchen-meeting-door", 11, 5.0, Math.PI, 30],
    ["c64-08-new-meeting-room", 14.25, 9.5, Math.PI, 35],
    ["c64-09-meeting-table", 14.25, 15.5, 0, 35],
  ];
  for (const [name, x, z, yaw, pitch] of shots) {
    await page.evaluate(([px, pz, py]) => window.__aitrainer!.teleport(px!, pz!, py!), [x, z, yaw]);
    await page.waitForTimeout(700);
    await look(pitch);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${DIR}/${name}.png` });
    console.log("SHOT", name);
  }
});
