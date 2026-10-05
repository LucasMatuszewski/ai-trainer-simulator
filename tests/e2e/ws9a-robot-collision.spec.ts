import { expect, test, type Page } from "@playwright/test";

/**
 * WS9a (Beads sacs-xtma.16): the companion robot must route AROUND
 * furniture, never through it, and nearby NPCs must not walk through
 * the robot. Live-browser protection for the controller-level unit
 * tests: the runtime must actually call the collision-aware planner
 * (planRobotPath / traceRobotStep), not just have them exist.
 *
 * PR-14 (closure verdict Medium 9): NOTHING here is shimmed. The spec
 * drives the game through `window.__aitrainer.webmcpCall` - the REAL
 * registered tool implementations via the REAL bridge conversion the
 * browser host uses - and reads state through the game's own debug
 * handle. No fabricated document.modelContext, no in-page fake host.
 */

const FURNITURE_MARGIN = 0.05; // touching is fine, "inside" is not

interface XZ {
  x: number;
  z: number;
}

async function startGame(page: Page): Promise<void> {
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect(page.locator(".hud")).toBeVisible();
  // A fresh profile replays the day-1 intro cinematic and can roll a
  // day summary on period skips - the office is only REALLY ready when
  // the debug handle reports it (and stays reported).
  await page.waitForFunction(
    () => window.__aitrainer?.getScreen() === "office",
    undefined,
    { timeout: 120_000 },
  );
}

/**
 * Read game state through the debug handle WITHOUT throwing when the
 * game is not there (day-end navigation, reload race): returns null
 * and the caller re-boots via startGame. PR-14 note: this is a read
 * through the game's own surface, not a stub.
 */
async function readGame<T>(
  page: Page,
  expr: (h: NonNullable<Window["__aitrainer"]>) => T,
): Promise<T | null> {
  try {
    return await page.evaluate((f) => {
      const h = window.__aitrainer;
      if (!h) return null;
      return f(h);
    }, expr);
  } catch {
    return null;
  }
}

async function call(page: Page, name: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const response = await page.evaluate(
    ([n, a]) => window.__aitrainer!.webmcpCall(n as string, a as Record<string, unknown>),
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

/** Office side of the kitchen boundary (matches the window prover). */
function officeSideOf(p: XZ): boolean {
  return p.x < 8.5 && p.z > -6.5;
}

/** Kitchen side of the boundary. */
function kitchenSideOf(p: XZ): boolean {
  return p.x > 9.5;
}

function pointToSegmentDist(p: XZ, a: XZ, b: XZ): number {
  const abx = b.x - a.x;
  const abz = b.z - a.z;
  const lenSq = abx * abx + abz * abz;
  if (lenSq === 0) return Math.hypot(p.x - a.x, p.z - a.z);
  let t = ((p.x - a.x) * abx + (p.z - a.z) * abz) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * abx), p.z - (a.z + t * abz));
}

test("an NPC walking to the kitchen demonstrably reroutes around the robot parked there", async ({ page }) => {
  test.setTimeout(300_000);
  await startGame(page);

  const joined = await call(page, "agent_join", { name: "Rusty", persona: "doorway block" });
  expect(joined).toMatchObject({ joined: true });

  // Park the robot AT the coffee stop (13.0, -5.3) - an exact lunch
  // destination, so coffee-bound walkers' straight approaches END on
  // the robot. Phase 1: the room route, RE-ISSUED until the robot is
  // genuinely near the stop (walking===false also holds before a walk
  // starts and after a rejected move - distance is the only honest
  // signal). Phase 2: the short closed-loop drive.
  const COFFEE: XZ = { x: 13.0, z: -5.3 };
  // Null-safe: a torn-down scene (transition) reads as "far away", so
  // the route loop re-issues instead of throwing mid-read.
  const distanceToStop = async (): Promise<number> => {
    const w = await readGame(page, (h) => h.inspectCompanion());
    if (w?.world === null || w?.world === undefined) return Infinity;
    return Math.hypot(w.world.x - COFFEE.x, w.world.z - COFFEE.z);
  };
  for (let routeTry = 0; routeTry < 3 && (await distanceToStop()) > 6.0; routeTry += 1) {
    await call(page, "agent_move_to", { target: "kitchen" });
    for (let i = 0; i < 120; i += 1) {
      // Drive the simulation forward - a headless browser throttles
      // rAF to near-zero, so wall-clock waits never move the robot.
      await page.waitForTimeout(30);
      await page.evaluate(() => window.__aitrainer!.debugTick(0.5));
      if ((await distanceToStop()) < 3.5) break;
      const look = (await call(page, "agent_look_around")) as { companion?: { walking?: boolean } };
      if (look.companion?.walking === false && (await distanceToStop()) > 6.0) break; // rejected - re-issue
    }
  }
  const diag = await readGame(page, (h) => ({
    screen: h.getScreen(),
    companion: h.inspectCompanion(),
  }));
  expect(await distanceToStop(), `room route never brought the robot near the kitchen; diag=${JSON.stringify(diag)}`).toBeLessThan(6.0);

  // Closed-loop parking: re-aim at the stop before every 1 m step so a
  // blocked stride or a heading drift can never accumulate into a
  // wrong-way drive (agent_step replaces any walk in progress, so each
  // step waits for its full walk before the next re-aim).
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const here = await page.evaluate(() => window.__aitrainer!.inspectCompanion());
    const px = here!.world!.x;
    const pz = here!.world!.z;
    const err = Math.hypot(px - COFFEE.x, pz - COFFEE.z);
    if (err < 0.55) break;
    const look = (await call(page, "agent_look_around")) as {
      companion?: { facingDegrees?: number };
    };
    // step heading convention: forward moves by (sin(h), cos(h)).
    const desired = (Math.atan2(COFFEE.x - px, COFFEE.z - pz) * 180) / Math.PI;
    const deltaTurn = (((desired - (look.companion?.facingDegrees ?? 0)) % 360) + 540) % 360 - 180;
    if (Math.abs(deltaTurn) > 2) {
      await call(page, "agent_turn", { degrees: Math.round(deltaTurn) });
      await page.waitForTimeout(250);
    }
    await call(page, "agent_step", { direction: "forward", metres: 1 });
    await page.waitForTimeout(60);
    await page.evaluate(() => window.__aitrainer!.debugTick(1.2));
  }
  const parkedRead = await readGame(page, (h) => h.inspectCompanion());
  expect(parkedRead?.world, "companion world vanished at park time").toBeTruthy();
  const P: XZ = { x: parkedRead!.world!.x, z: parkedRead!.world!.z };
  const parkError = Math.hypot(P.x - COFFEE.x, P.z - COFFEE.z);
  expect(
    parkError,
    `robot failed to park on the coffee stop (off by ${parkError.toFixed(2)} m)`,
  ).toBeLessThan(1.0);

  // THE PROOF (deterministic - no sampling luck): drive ONE real NPC
  // office-side -> kitchen-side -> back on a line through the parked
  // robot, all through the real controller override (planning +
  // collision + avoidance, the same mechanism the coffee trips use).
  // The return leg's straight line passes exactly through the parked
  // robot, so the ONLY way to keep the hard-overlap and clearance
  // assertions green is a genuine detour.
  const hardOverlap = (npcId: string, pos: XZ, robotPos: XZ): void => {
    const d = Math.hypot(pos.x - robotPos.x, pos.z - robotPos.z);
    expect(d, `NPC ${npcId} at ${JSON.stringify(pos)} overlaps the robot at ${JSON.stringify(robotPos)}`).toBeGreaterThan(0.3);
  };
  const robotPos = P;

  // Leg A: pick a settled human well inside the office side and send
  // them 4 m past the robot along their heading (walkers stop ~1.5 m
  // short of an override target - the stop still lands kitchen-side).
  const npcStates = await readGame(page, (h) => h.inspectNpcs());
  const walker = (npcStates ?? [])
    .filter((n) => {
      const p = { x: n.position.x, z: n.position.z };
      return (
        n.npcId !== "burek" &&
        officeSideOf(p) &&
        Math.hypot(p.x - robotPos.x, p.z - robotPos.z) > 2.0
      );
    })
    [0];
  expect(walker, "no office-side walker available to drive the traversal").toBeTruthy();
  {
    const start = { x: walker!.position.x, z: walker!.position.z };
    const dx = robotPos.x - start.x;
    const dz = robotPos.z - start.z;
    const len = Math.hypot(dx, dz) || 1;
    await page.evaluate(
      ([id, tx, tz]) => window.__aitrainer!.debugMoveNpc(id as string, tx as number, tz as number),
      [walker!.npcId, robotPos.x + (dx / len) * 4.0, robotPos.z + (dz / len) * 4.0] as const,
    );
  }

  // Sample the whole journey; fire leg B (return, adaptive distance so
  // the ~1.5 m stop-short lands strictly office-side) the moment the
  // walker reaches the kitchen side; track the RETURN leg only.
  let legBFired = false;
  let returnFirst: XZ | null = null;
  let returnLast: XZ | null = null;
  let minRobotDist = Infinity;
  for (let i = 0; i < 160; i += 1) {
    await page.waitForTimeout(30);
    await page.evaluate(() => window.__aitrainer!.debugTick(0.5));
    const wNow = (await readGame(page, (h) => h.inspectNpcs()))?.find(
      (n) => n.npcId === walker!.npcId,
    );
    if (wNow === undefined) continue;
    const pos: XZ = { x: wNow.position.x, z: wNow.position.z };
    hardOverlap(walker!.npcId, pos, robotPos);
    minRobotDist = Math.min(minRobotDist, Math.hypot(pos.x - robotPos.x, pos.z - robotPos.z));
    if (!legBFired) {
      if (!officeSideOf(pos)) {
        // Leg B: smallest T whose stop (~1.5 m short of the target)
        // lands strictly office-side; the line still passes exactly
        // through the parked robot.
        const start = pos;
        const dx = robotPos.x - start.x;
        const dz = robotPos.z - start.z;
        const len = Math.hypot(dx, dz) || 1;
        const ux = dx / len;
        const uz = dz / len;
        let target = { x: robotPos.x, z: robotPos.z };
        for (let t = 6; t <= 24; t += 2) {
          const stop = { x: robotPos.x + ux * (t - 1.5), z: robotPos.z + uz * (t - 1.5) };
          target = { x: robotPos.x + ux * t, z: robotPos.z + uz * t };
          if (stop.x < 8.0 && stop.z > -6.0) break;
        }
        await page.evaluate(
          ([id, tx, tz]) => window.__aitrainer!.debugMoveNpc(id as string, tx as number, tz as number),
          [walker!.npcId, target.x, target.z] as const,
        );
        legBFired = true;
      }
      continue; // leg A samples are not the prover's trajectory
    }
    // Return leg in progress: record first/last.
    if (returnFirst === null) returnFirst = pos;
    returnLast = pos;
    // Arrived: the walker stopped (two consecutive samples < 0.15 m).
    if (
      returnLast !== null &&
      returnFirst !== null &&
      Math.hypot(pos.x - returnLast.x, pos.z - returnLast.z) < 0.15 &&
      i > 4
    ) {
      const settledTwice = await page.waitForTimeout(600).then(() => true);
      void settledTwice;
      const wEnd = (await readGame(page, (h) => h.inspectNpcs()))?.find(
        (n) => n.npcId === walker!.npcId,
      );
      if (wEnd !== undefined) {
        returnLast = { x: wEnd.position.x, z: wEnd.position.z };
      }
      break;
    }
  }

  // THE PROVER: the return leg started kitchen-side, ended office-side,
  // and its straight line passes through the parked robot.
  expect(legBFired, "walker never reached the kitchen side (leg A failed)").toBe(true);
  expect(returnFirst, "return leg was never sampled").toBeTruthy();
  expect(returnLast, "return leg never completed").toBeTruthy();
  expect(
    kitchenSideOf(returnFirst!),
    `return leg started at ${JSON.stringify(returnFirst)} - not kitchen side`,
  ).toBe(true);
  expect(
    officeSideOf(returnLast!),
    `return leg ended at ${JSON.stringify(returnLast)} - not office side`,
  ).toBe(true);
  const lineThrough = pointToSegmentDist(robotPos, returnFirst!, returnLast!);
  expect(
    lineThrough,
    `straight line from ${JSON.stringify(returnFirst)} to ${JSON.stringify(returnLast)} misses the robot by ${lineThrough.toFixed(2)} m - geometry broken, proof void`,
  ).toBeLessThan(0.55);
  expect(
    minRobotDist,
    `NPC walked through the robot: closest approach ${minRobotDist.toFixed(2)} m (< 0.45 m) - rerouting FAILED`,
  ).toBeGreaterThanOrEqual(0.45);
});
