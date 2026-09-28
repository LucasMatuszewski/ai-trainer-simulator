import { expect, test, type Page } from "@playwright/test";

/**
 * WS9a (Beads sacs-xtma.16): the companion robot must route AROUND
 * furniture, never through it, and nearby NPCs must not walk through
 * the robot. Live-browser protection for the controller-level unit
 * tests: the runtime must actually call the collision-aware planner
 * (planRobotPath / traceRobotStep), not just have them exist.
 */

const FURNITURE_MARGIN = 0.05; // touching is fine, "inside" is not

interface XZ {
  x: number;
  z: number;
}

async function installHost(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const tools = new Map<string, { execute: (a: unknown) => Promise<unknown> }>();
    Object.defineProperty(document, "modelContext", {
      value: {
        registerTool: (tool: { name: string }) => {
          tools.set(tool.name, tool as never);
          return true;
        },
        unregisterTool: (name: string) => tools.delete(name),
      },
      configurable: true,
    });
    (window as never as Record<string, unknown>).__mcp = {
      call: async (name: string, args: Record<string, unknown> = {}) => {
        const tool = tools.get(name);
        if (!tool) throw new Error(`no such tool: ${name}`);
        return tool.execute(args);
      },
    };
  });
}

async function startGame(page: Page): Promise<void> {
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await page.waitForTimeout(6500);
  await expect(page.locator(".hud")).toBeVisible();
}

async function call(page: Page, name: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const response = await page.evaluate(
    ([n, a]) => window.__mcp!.call(n as string, a as Record<string, unknown>),
    [name, args] as const,
  );
  if (response.isError === true) throw new Error(response.content[0]!.text);
  return JSON.parse(response.content[0]!.text) as unknown;
}

function insideAnyBox(
  p: XZ,
  boxes: ReadonlyArray<{ minX: number; maxX: number; minZ: number; maxZ: number }>,
): string | null {
  for (const b of boxes) {
    if (
      p.x > b.minX + FURNITURE_MARGIN &&
      p.x < b.maxX - FURNITURE_MARGIN &&
      p.z > b.minZ + FURNITURE_MARGIN &&
      p.z < b.maxZ - FURNITURE_MARGIN
    ) {
      return `${JSON.stringify(p)} inside [${b.minX},${b.maxX}]x[${b.minZ},${b.maxZ}]`;
    }
  }
  return null;
}

test("the robot crosses the office without clipping any furniture", async ({ page }) => {
  test.setTimeout(90_000);
  await installHost(page);
  await startGame(page);

  const joined = await call(page, "agent_join", { name: "Rusty", persona: "collision qa" });
  expect(joined).toMatchObject({ joined: true });

  const before = await page.evaluate(() => window.__aitrainer!.inspectCompanion());
  expect(before?.world).not.toBeNull();

  // A far room target forces a long cross-office route past desks.
  await call(page, "agent_move_to", { target: "kitchen" });

  // Sample the robot's live position (and NPC positions) while it walks.
  const samples: XZ[] = [];
  const npcSamples: Array<{ npc: XZ; robot: XZ }> = [];
  for (let i = 0; i < 150; i += 1) {
    await page.waitForTimeout(200);
    const companion = await page.evaluate(() => window.__aitrainer!.inspectCompanion());
    if (companion?.world) samples.push({ x: companion.world.x, z: companion.world.z });
    const npcs = await page.evaluate(() => window.__aitrainer!.inspectNpcs());
    if (companion?.world && npcs) {
      for (const npc of npcs) {
        npcSamples.push({ npc: { x: npc.position.x, z: npc.position.z }, robot: { x: companion.world.x, z: companion.world.z } });
      }
    }
    const look = (await call(page, "agent_look_around")) as {
      companion?: { walking?: boolean };
    };
    // The walk is done when the companion reports walking === false.
    if (look.companion?.walking === false) break;
  }

  // It really crossed (not a no-op): substantially far from the spawn.
  const after = await page.evaluate(() => window.__aitrainer!.inspectCompanion());
  const travel = Math.hypot(
    (after?.world?.x ?? 0) - (before?.world?.x ?? 0),
    (after?.world?.z ?? 0) - (before?.world?.z ?? 0),
  );
  expect(travel).toBeGreaterThan(5);

  // THE bug (sacs-xtma.16): no sampled robot position may sit inside an
  // obstacle box (the same AABBs the walking actors route with — desks,
  // walls, and other static furniture).
  const boxes = await page.evaluate(() => window.__aitrainer!.inspectObstacles());
  expect(boxes.length).toBeGreaterThan(5);
  for (const p of samples) {
    const hit = insideAnyBox(p, boxes);
    expect(hit, `robot sampled inside furniture: ${hit}`).toBeNull();
  }

  // The other half of the bug: no NPC is ever sampled INSIDE the robot's
  // footprint (center distance under both radii) while it walks.
  for (const pair of npcSamples) {
    const d = Math.hypot(pair.npc.x - pair.robot.x, pair.npc.z - pair.robot.z);
    expect(d, `NPC at ${JSON.stringify(pair.npc)} overlaps robot at ${JSON.stringify(pair.robot)}`).toBeGreaterThan(0.3);
  }
});
