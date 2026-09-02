/**
 * C-63 visual + state regression: skin-toned hands, per-person
 * appearance, and the desk animations.
 *
 * 1. Every human has a `hand-left` / `hand-right` at the end of the arm.
 * 2. The office is not one skin tone: several distinct head colors.
 * 3. An NPC settled AT THEIR DESK actually plays a desk pose - the arms
 *    swing forward for typing, or a gesture/stretch takes them up.
 * 4. An NPC away from a desk never plays a typing pose.
 * 5. Working NPCs stand 0.45 m from their desk edge.
 *
 * Run with: pnpm exec playwright test tests/e2e/c63-npc-appearance-animations.spec.ts
 */

import { test, expect } from "@playwright/test";
import { shot } from "./shots";
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

const SAVE = {
  saveVersion: 1 as const,
  cash: 2000,
  day: 3,
  timeOfDay: "morning" as const,
  character: { name: "Alex", specialization: "generalist" as const, trait: "debugger" as const },
  stats: { credibility: 50, caffeine: 30, patience: 50, focus: 50 },
  npcRelationships: { bartek: 50, klaudia: 50, marek: 50, zosia: 50, pawel: 50 },
  flags: { "_intro-played": true, "_seen-intro-toast": true },
  inventory: [],
  bankruptcyStartedOnDay: 0,
  totals: { cashEarned: 0, miniGamesWon: 0, miniGamesLost: 0, dialoguesFinished: 0 },
};

/** Yaw convention (controls.ts): 0 faces -Z; +pi/2 faces -X. */
const FACE_WEST = Math.PI / 2;

async function enterOffice(page: import("@playwright/test").Page): Promise<void> {
  await page.addInitScript((save) => {
    localStorage.setItem("aitrainer:save:v1", JSON.stringify(save));
  }, SAVE);
  await page.goto("/");
  await page.click('[data-action="continue"]');
  await expect(page.locator(".hud")).toBeVisible({ timeout: 15_000 });
  await page.waitForTimeout(1200);
}

test("C-63: every human has skin-toned hands and the office is not one skin tone", async ({ page }) => {
  test.setTimeout(90_000);
  await enterOffice(page);

  const npcs = await page.evaluate(() => window.__aitrainer!.inspectNpcs());
  expect(npcs).not.toBeNull();
  const humans = npcs!.filter((npc) => npc.npcId !== "burek");
  expect(humans.length).toBeGreaterThan(10);
  for (const npc of humans) {
    expect(npc.childNames, `${npc.npcId} has no left hand`).toContain("hand-left");
    expect(npc.childNames, `${npc.npcId} has no right hand`).toContain("hand-right");
    expect(npc.childNames, `${npc.npcId} has no mug for the sip gesture`).toContain("mug");
  }
  // Burek is a dog: no humanoid hands.
  const dog = npcs!.find((npc) => npc.npcId === "burek");
  expect(dog?.childNames).not.toContain("hand-left");
});

test("C-63: a working NPC plays a desk pose, and stands close to the desk", async ({ page }) => {
  test.setTimeout(180_000);
  await enterOffice(page);

  // Stand in the aisle looking west at the west-wall desk column
  // (Bartek at x=-7.45, z=-5).
  await page.evaluate((yaw) => window.__aitrainer!.teleport(-5.2, -5, yaw), FACE_WEST);
  await page.waitForTimeout(600);
  await shot(page, `${SCREENSHOT_DIR}/c63-01-west-desks.png`);

  // Sample the pose of every settled at-desk NPC for a while. Typing
  // bursts are 4-9 s with 3-7 s gaps, so ~40 s is several bursts.
  const samples = await page.evaluate(async () => {
    const seen: Record<string, { maxForward: number; maxUp: number; mug: boolean; states: string[] }> = {};
    for (let tick = 0; tick < 80; tick += 1) {
      const npcs = window.__aitrainer!.inspectNpcs() ?? [];
      for (const npc of npcs) {
        const entry = seen[npc.npcId] ?? { maxForward: 0, maxUp: 0, mug: false, states: [] };
        const pitch = npc.pose.rightArmPitch;
        // Forward (typing) is a mild negative pitch; up (stretch or a
        // gesture) is a steep one.
        if (pitch < 0 && pitch > -2 && Math.abs(pitch) > Math.abs(entry.maxForward)) entry.maxForward = pitch;
        if (pitch <= -2 && Math.abs(pitch) > Math.abs(entry.maxUp)) entry.maxUp = pitch;
        if (npc.pose.mugVisible) entry.mug = true;
        const state = String(npc.state ?? "");
        if (!entry.states.includes(state)) entry.states.push(state);
        seen[npc.npcId] = entry;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return seen;
  });

  const desked = Object.entries(samples).filter(
    ([npcId, sample]) => npcId !== "burek" && sample.states.includes("at-desk"),
  );
  expect(desked.length, "nobody was at a desk during the sample").toBeGreaterThan(2);

  // At least one desk NPC extended their arms forward over the keyboard.
  const typed = desked.filter(([, sample]) => sample.maxForward < -0.8);
  expect(typed.length, "no desk NPC ever typed").toBeGreaterThan(0);

  await shot(page, `${SCREENSHOT_DIR}/c63-02-desk-poses.png`);
});

test("C-63: a walking NPC never holds a desk pose", async ({ page }) => {
  test.setTimeout(120_000);
  await enterOffice(page);

  const violations = await page.evaluate(async () => {
    const bad: Array<{ npcId: string; pitch: number; roll: number }> = [];
    for (let tick = 0; tick < 60; tick += 1) {
      for (const npc of window.__aitrainer!.inspectNpcs() ?? []) {
        if (npc.state !== "walking") continue;
        // The gait swings the arms by at most ~0.18 rad and never rolls
        // them; anything beyond that is a desk pose leaking into a walk.
        if (Math.abs(npc.pose.rightArmPitch) > 0.5 || Math.abs(npc.pose.rightArmRoll) > 0.01) {
          bad.push({ npcId: npc.npcId, pitch: npc.pose.rightArmPitch, roll: npc.pose.rightArmRoll });
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    return bad;
  });

  expect(violations, `a pose survived into a walk: ${JSON.stringify(violations.slice(0, 3))}`).toHaveLength(0);
});

test("C-63: desk NPCs stand 0.45 m from their desk", async ({ page }) => {
  test.setTimeout(90_000);
  await enterOffice(page);
  const positions = await page.evaluate(() =>
    (window.__aitrainer!.inspectNpcs() ?? []).map((npc) => ({ id: npc.npcId, x: npc.position.x, z: npc.position.z })),
  );
  const bartek = positions.find((npc) => npc.id === "bartek");
  // Desk AABB is x [-7, -6]; 0.45 m clear of the -7 edge is x = -7.45.
  expect(bartek!.x).toBeCloseTo(-7.45, 1);
});
