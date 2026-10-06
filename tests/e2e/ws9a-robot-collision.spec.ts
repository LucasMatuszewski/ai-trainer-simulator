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
  // Relative: follows the config's baseURL (4173 = the production
  // build; no vite dev server, no HMR/dep-optimization reloads).
  await page.goto("/");
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
/**
 * Read game state through the debug handle WITHOUT throwing when the
 * game is not there (day-end navigation, reload race): returns null
 * and the caller re-boots via startGame. PR-14 note: this is a read
 * through the game's own surface, not a stub.
 *
 * The read is named by a JSON-SERIALIZABLE descriptor: page.evaluate
 * serializes its argument as JSON, so passing a FUNCTION silently
 * arrives as undefined - the in-page call then throws and every read
 * returned null (the six-run "handle mystery" was exactly this).
 */
type GameRead =
  | { kind: "screen" }
  | { kind: "companion" }
  | { kind: "npcs" }
  | { kind: "deepDebug" };

async function readGame<T = unknown>(page: Page, read: GameRead): Promise<T | null> {
  try {
    return await page.evaluate((descriptor) => {
      const h = window.__aitrainer;
      if (!h) return null;
      switch (descriptor.kind) {
        case "screen":
          return h.getScreen();
        case "companion":
          return h.inspectCompanion();
        case "npcs":
          return h.inspectNpcs();
        case "deepDebug":
          return h.getDeepDebug();
        default:
          return null;
      }
    }, read) as T | null;
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

/** North side of the proof corridor (open main office, no doorways). */
function northSideOf(p: XZ): boolean {
  return p.z > 6.5;
}

/** South side of the proof corridor. */
function southSideOf(p: XZ): boolean {
  return p.z < -6.5;
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

  const joined = await call(page, "agent_join", { name: "Rusty", persona: "corridor block" });
  expect(joined).toMatchObject({ joined: true });

  // Park the robot at DEAD CENTER of the main office (0, 0): open
  // floor, no doorways on the proof's path (the kitchen-door crossing
  // jammed the old kitchen-side design at x~9, z~0 for whole minutes).
  // The collision contract is identical - a walker whose straight line
  // crosses the parked robot must detour - with none of the chokepoint
  // machinery. Closed-loop drive only; the robot spawns close enough.
  const CENTER: XZ = { x: 0.0, z: 0.0 };
  const distanceToCenter = async (): Promise<number> => {
    const w = await readGame(page, { kind: "companion" });
    if (w?.world === null || w?.world === undefined) return Infinity;
    return Math.hypot(w.world.x - CENTER.x, w.world.z - CENTER.z);
  };

  // Closed-loop parking: re-aim at the center before every 1 m step so
  // a blocked stride or a heading drift can never accumulate into a
  // wrong-way drive (agent_step replaces any walk in progress).
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const here = await readGame(page, { kind: "companion" });
    if (here?.world === null || here?.world === undefined) break;
    const px = here.world.x;
    const pz = here.world.z;
    if (Math.hypot(px - CENTER.x, pz - CENTER.z) < 0.55) break;
    const look = (await call(page, "agent_look_around")) as {
      companion?: { facingDegrees?: number };
    };
    // step heading convention: forward moves by (sin(h), cos(h)).
    const desired = (Math.atan2(CENTER.x - px, CENTER.z - pz) * 180) / Math.PI;
    const deltaTurn = (((desired - (look.companion?.facingDegrees ?? 0)) % 360) + 540) % 360 - 180;
    if (Math.abs(deltaTurn) > 2) {
      await call(page, "agent_turn", { degrees: Math.round(deltaTurn) });
      await page.waitForTimeout(60);
      await page.evaluate(() => window.__aitrainer!.debugTick(0.25));
    }
    await call(page, "agent_step", { direction: "forward", metres: 1 });
    await page.waitForTimeout(40);
    await page.evaluate(() => window.__aitrainer!.debugTick(1.2));
  }
  const parkedRead = await readGame(page, { kind: "companion" });
  expect(parkedRead?.world, "companion world vanished at park time").toBeTruthy();
  const robotPos: XZ = { x: parkedRead!.world!.x, z: parkedRead!.world!.z };
  const parkError = Math.hypot(robotPos.x - CENTER.x, robotPos.z - CENTER.z);
  expect(
    parkError,
    `robot failed to park at the office center (off by ${parkError.toFixed(2)} m)`,
  ).toBeLessThan(1.0);

  // THE PROOF (deterministic): drive ONE real NPC north-side -> robot ->
  // south-side, all through the real controller override (planning +
  // collision + avoidance, the same mechanism the coffee trips use).
  // Leg B's straight line passes exactly through the parked robot, so
  // the ONLY way to keep the hard-overlap and clearance assertions
  // green is a genuine detour around it.
  const hardOverlap = (npcId: string, pos: XZ, robot: XZ): void => {
    const d = Math.hypot(pos.x - robot.x, pos.z - robot.z);
    expect(d, `NPC ${npcId} at ${JSON.stringify(pos)} overlaps the robot at ${JSON.stringify(robot)}`).toBeGreaterThan(0.3);
  };

  const npcStates = await readGame<Array<{
    npcId: string;
    position: { x: number; z: number };
  }>>(page, { kind: "npcs" });
  // Non-script casts only: the deep-conversation staging freezes script
  // pairs mid-walk for whole exchanges - a scripted walker would stall
  // the proof through no fault of the robot.
  const NON_SCRIPT = new Set(["kasia", "marek", "pawel", "grazyna", "tomek", "janusz", "zosia", "przemek"]);
  const walker = (npcStates ?? [])
    .filter((n) => {
      const p = { x: n.position.x, z: n.position.z };
      return (
        n.npcId !== "burek" &&
        !NON_SCRIPT.has(n.npcId) &&
        northSideOf(p) &&
        Math.hypot(p.x - robotPos.x, p.z - robotPos.z) > 2.0
      );
    })
    .sort((a, b) => b.position.z - a.position.z) // northern-most first
    [0];
  expect(walker, "no north-side walker available to drive the traversal").toBeTruthy();

  // Leg A: walk TO the parked robot - it stands on walkable ground, so
  // findValidNpcSpawn cannot reject the leg (an out-of-bounds target
  // makes setOverride silently settle the NPC at their schedule desk).
  // The walker stops ~1.5-3 m short of it, still north of the middle.
  // The return direction is fixed at fire time from the APPROACH
  // geometry (walker start -> robot): firing it from the arrival
  // position can invert (an avoidance shove can park her BESIDE the
  // robot, pointing the line north - she then "walks home").
  const approachUnit: XZ = (() => {
    const dx = robotPos.x - walker!.position.x;
    const dz = robotPos.z - walker!.position.z;
    const len = Math.hypot(dx, dz) || 1;
    return { x: dx / len, z: dz / len };
  })();
  await page.evaluate(
    ([id, tx, tz]) => window.__aitrainer!.debugMoveNpc(id as string, tx as number, tz as number),
    [walker!.npcId, robotPos.x, robotPos.z] as const,
  );

  // Sample the whole journey; fire leg B (back through the robot, deep
  // south) once the approach completes; track ONLY the return leg.
  let legBFired = false;
  let returnUnit: XZ | null = null;
  let legBTarget: XZ | null = null;
  let returnFirst: XZ | null = null;
  let returnLast: XZ | null = null;
  let minRobotDist = Infinity;
  for (let i = 0; i < 160; i += 1) {
    await page.waitForTimeout(30);
    await page.evaluate(() => window.__aitrainer!.debugTick(0.5));
    const wNow = (await readGame<Array<{ npcId: string; position: { x: number; z: number } }>>(
      page,
      { kind: "npcs" },
    ))?.find((n) => n.npcId === walker!.npcId);
    if (wNow === undefined) continue;
    const pos: XZ = { x: wNow.position.x, z: wNow.position.z };
    hardOverlap(walker!.npcId, pos, robotPos);
    minRobotDist = Math.min(minRobotDist, Math.hypot(pos.x - robotPos.x, pos.z - robotPos.z));
    if (!legBFired) {
      // Approach complete: within 3.5 m of the parked robot (the
      // observed stop-short distance).
      if (Math.hypot(pos.x - robotPos.x, pos.z - robotPos.z) < 3.5) {
        returnUnit = approachUnit;
        // First return hop: 6 m along the APPROACH line (through the
        // robot, southward), clamped inside the main office (a target
        // past the south wall is REJECTED by the spawn validator and
        // setOverride then parks the NPC at their schedule desk).
        legBTarget = {
          x: robotPos.x + returnUnit.x * 6,
          z: Math.max(-8.0, robotPos.z + returnUnit.z * 6),
        };
        await page.evaluate(
          ([id, tx, tz]) => window.__aitrainer!.debugMoveNpc(id as string, tx as number, tz as number),
          [walker!.npcId, legBTarget.x, legBTarget.z] as const,
        );
        legBFired = true;
      }
      continue; // leg A samples are not the prover's trajectory
    }
    // Return leg: record first/last.
    if (returnFirst === null) returnFirst = pos;
    returnLast = pos;
    // Chain extension: the south corridor is shallower than one hop
    // (walker stop-short + wall). Every 8 samples, if she is not yet
    // south, extend the SAME line by 4 m (stays collinear through the
    // robot - the straight-line proof holds for the whole chain) while
    // the target stays in bounds.
    if (
      i > 0 && i % 8 === 0 && legBTarget !== null && returnUnit !== null &&
      !southSideOf(returnLast) && legBTarget.z > -8.0
    ) {
      legBTarget = {
        x: Math.max(-7.0, Math.min(7.0, legBTarget.x + returnUnit.x * 4)),
        z: Math.max(-8.0, legBTarget.z + returnUnit.z * 4),
      };
      await page.evaluate(
        ([id, tx, tz]) => window.__aitrainer!.debugMoveNpc(id as string, tx as number, tz as number),
        [walker!.npcId, legBTarget.x, legBTarget.z] as const,
      );
    }
  }

  expect(legBFired, `walker never completed the approach (leg A failed): walker=${walker!.npcId} start=(${walker!.position.x.toFixed(1)},${walker!.position.z.toFixed(1)}) robot=(${robotPos.x.toFixed(1)},${robotPos.z.toFixed(1)})`).toBe(true);
  expect(returnFirst, "return leg was never sampled").toBeTruthy();
  expect(returnLast, "return leg never completed").toBeTruthy();
  // The leg-B trigger fired only within 3.5 m of the robot, so the
  // first SAMPLED return position is north of it by construction.
  expect(
    southSideOf(returnFirst!),
    `return leg started at ${JSON.stringify(returnFirst)} - already south side, traversal void`,
  ).toBe(false);
  expect(
    southSideOf(returnLast!),
    `return leg ended at ${JSON.stringify(returnLast)} - not south side`,
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
