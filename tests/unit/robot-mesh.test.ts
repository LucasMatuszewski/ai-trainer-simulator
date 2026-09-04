/** @vitest-environment jsdom */

/**
 * C-70: the robot fleet's Object3D factories.
 *
 * The brain and the routes are covered by `janusz-robots.test.ts`; this
 * file covers the geometry the player actually sees, in the same style
 * as `furniture-library.test.ts` and `npc-mesh.test.ts`:
 *
 *  - Every factory returns a named group whose origin is at FLOOR level
 *    (y=0), because `janusz-robots.ts` positions them with
 *    `group.position.set(view.x, 0, view.z)` - a factory that centred
 *    its body on the origin would sink half the robot into the floor.
 *  - Each robot is knee-high and no wider than its collision radius
 *    allows, so the authored patrol routes (pinned clear at
 *    radius + 1cm) match the thing on screen.
 *  - The duty animation each robot advertises actually moves something,
 *    and setWorking(false) returns it to rest - the fleet's only visual
 *    tell that a robot is working rather than driving.
 */
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { makeRobotVacuum } from "../../src/engine/furniture/robot-vacuum";
import { makeRobotGardener } from "../../src/engine/furniture/robot-gardener";
import { makeRobotRunner } from "../../src/engine/furniture/robot-runner";
import { makeRobotDock } from "../../src/engine/furniture/robot-dock";
import { ROBOT_PATROLS, type RobotId } from "../../src/content/robot-patrols";

type Handle = {
  group: THREE.Group;
  setWorking: (working: boolean) => void;
  animate: (dt: number, moving: boolean) => void;
};

/** `base` is the DRIVING body - the part that must fit the collision
 *  radius the patrol routes were cleared against. Arms, trays and hoses
 *  may overhang it (Halina's arm reaches out to water a plant on
 *  purpose); the overhang is bounded separately. */
const FACTORIES: Array<{
  id: RobotId;
  name: string;
  base: string;
  /** The node whose transform IS this robot's working animation, and the
   *  component that must move. Named explicitly so the assertion cannot
   *  be satisfied by some other part that happens to move too (the
   *  vacuum's brushes spin while driving as well as while working, and
   *  a whole-group pose diff would pass on those alone). */
  workingPart: { node: string; read: (o: THREE.Object3D) => number };
  make: () => Handle;
}> = [
  {
    id: "vacuum",
    name: "robot-vacuum",
    base: "vacuum-body",
    workingPart: { node: "vacuum-body", read: (o) => o.position.y },
    make: makeRobotVacuum,
  },
  {
    id: "gardener",
    name: "robot-gardener",
    base: "gardener-chassis",
    workingPart: { node: "gardener-shoulder", read: (o) => o.rotation.x },
    make: makeRobotGardener,
  },
  {
    id: "runner",
    name: "robot-runner",
    base: "runner-body",
    workingPart: { node: "runner-tray", read: (o) => o.position.y },
    make: makeRobotRunner,
  },
];

/** World-space AABB of every mesh under a group. */
function bounds(group: THREE.Object3D): THREE.Box3 {
  group.updateMatrixWorld(true);
  return new THREE.Box3().setFromObject(group);
}

describe.each(FACTORIES)("$name (C-70)", ({ id, name, base, workingPart, make }) => {
  it("returns a named group with real geometry in it", () => {
    const handle = make();
    expect(handle.group).toBeInstanceOf(THREE.Group);
    expect(handle.group.name).toBe(name);
    expect(handle.group.children.length).toBeGreaterThan(2);
    let meshes = 0;
    handle.group.traverse((o) => {
      if (o instanceof THREE.Mesh) meshes += 1;
    });
    expect(meshes, "a robot the player can see").toBeGreaterThan(2);
  });

  it("sits ON the floor, not half-sunk through it", () => {
    // janusz-robots.ts places the group at y=0, so nothing may hang
    // below the origin by more than a rounding sliver.
    const box = bounds(make().group);
    expect(box.min.y).toBeGreaterThanOrEqual(-0.01);
  });

  it("is knee-high, and its driving base fits the collision radius", () => {
    const group = make().group;
    const size = bounds(group).getSize(new THREE.Vector3());
    // Knee-high: tall enough to read as a machine, short enough that it
    // never blocks the camera or reads as a person.
    expect(size.y).toBeGreaterThan(0.05);
    expect(size.y).toBeLessThan(0.75);

    // The patrol legs are pinned clear at route.radius + 1cm. It is the
    // DRIVING BASE that has to honour that radius; a base wider than it
    // would clip furniture the route tests believe it misses.
    const baseMesh = group.getObjectByName(base);
    expect(baseMesh, `${name} has no "${base}" driving base`).toBeDefined();
    const baseSize = bounds(baseMesh!).getSize(new THREE.Vector3());
    const radius = ROBOT_PATROLS[id].radius;
    expect(Math.max(baseSize.x, baseSize.z) / 2, `${name}'s base is wider than its collision radius`)
      .toBeLessThanOrEqual(radius + 0.01);

    // Arms/trays/hoses may reach past the base (Halina waters a plant
    // by reaching for it), but never so far that the robot occupies a
    // walkway it was never routed through.
    expect(Math.max(size.x, size.z) / 2, `${name} overhangs its base too far`)
      .toBeLessThanOrEqual(radius + 0.25);
  });

  it("moves its own duty part while working, and rests it when it stops", () => {
    const handle = make();
    const part = handle.group.getObjectByName(workingPart.node);
    expect(part, `${name} has no "${workingPart.node}" to animate`).toBeDefined();

    const atRest = workingPart.read(part!);

    // Working: the duty part itself must move, over at least one full
    // cycle so a sample landing on a zero-crossing cannot fake a pass.
    handle.setWorking(true);
    const seen = new Set<number>();
    for (let i = 0; i < 40; i += 1) {
      handle.animate(0.05, false);
      seen.add(Number(workingPart.read(part!).toFixed(6)));
    }
    expect(seen.size, `${name}'s ${workingPart.node} never moved while working`).toBeGreaterThan(1);

    // Stopping returns it to rest rather than freezing mid-swing.
    handle.setWorking(false);
    handle.animate(0.05, false);
    expect(workingPart.read(part!), `${name}'s ${workingPart.node} stayed mid-swing`)
      .toBeCloseTo(atRest, 3);
  });

  it("survives a long animation run without drifting off the floor", () => {
    const handle = make();
    handle.setWorking(true);
    for (let i = 0; i < 600; i += 1) handle.animate(0.05, i % 2 === 0);
    const box = bounds(handle.group);
    expect(box.min.y).toBeGreaterThanOrEqual(-0.05);
    expect(box.max.y).toBeLessThan(0.8);
  });
});

describe("robot dock pad (C-70)", () => {
  it("is a named, floor-level pad the robot can drive onto", () => {
    const dock = makeRobotDock();
    expect(dock.name).toBe("robot-dock");
    const box = bounds(dock);
    expect(box.min.y).toBeGreaterThanOrEqual(-0.01);
    // Low profile on purpose: the pads are deliberately NOT in the NPC
    // obstacle list, so a knee-high post here would be walked through.
    expect(box.max.y, "the dock must stay a low pad, not furniture").toBeLessThan(0.35);
  });

  it("carries its charging post, status light and cable", () => {
    const dock = makeRobotDock();
    for (const name of ["dock-pad", "dock-post", "dock-led", "dock-cable"]) {
      expect(dock.getObjectByName(name), `${name} missing`).toBeDefined();
    }
  });

  it("is wide enough for the widest robot to park on", () => {
    const pad = bounds(makeRobotDock().getObjectByName("dock-pad")!);
    const padWidth = pad.getSize(new THREE.Vector3()).x;
    const widest = Math.max(...Object.values(ROBOT_PATROLS).map((r) => r.radius)) * 2;
    expect(padWidth).toBeGreaterThanOrEqual(widest);
  });
});
