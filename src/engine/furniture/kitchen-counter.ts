/**
 * The kitchen counter - a long run of cabinets and a counter top.
 *
 * The kitchen is a 10x14m room; the counter runs along the north
 * wall (z = -7) and is centered at z = -6.6. The counter extends
 * from z = -6.95 (5cm off the wall) to z = -6.25 (the front edge
 * facing the room), so the appliances sit on a 0.7m-deep top that
 * actually meets the wall instead of leaving them floating.
 *
 * L-2026-08-31-06 (revised after Lucas's screenshot): the fridge
 * is the LAST element on the WEST end of the counter (it sits at
 * world x = [10.1, 11.1], the leftmost appliance). The counter
 * TOP and the cabinet base BOTH start at x = 11.2 (1.1m east of
 * the fridge's east face) and run 7.55m east to x = 18.75. The
 * fridge is a free-standing appliance on the floor, NOT built
 * into the counter. The counter ENDS where the cabinet ends - it
 * is one continuous unit, no awkward floating surface over the
 * fridge.
 *
 * Origin at the counter CENTER, floor level. World position
 * (14.25, 0, -6.6) places the 7.55m-wide run from x=11.2 to
 * x=18.75.
 */
import * as THREE from "three";

const CABINET = 0x5b5249;
const CABINET_DARK = 0x4a4239;
const TOP = 0x76695e;
const TOP_TRIM = 0x4a3f37;
const HANDLE = 0xc8ccd1;

function box(
  name: string,
  dimensions: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...dimensions), material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

export function makeKitchenCounter(): THREE.Group {
  const group = new THREE.Group();
  group.name = "kitchen-counter";

  // The counter is ONE continuous unit: cabinet base + counter top +
  // doors + handles + backsplash. None of it extends under the
  // fridge.
  //
  // The world position centers the counter at world x = 14.25. The
  // counter is 7.55m wide, so it spans local x = [-3.775, +3.775]
  // (world x = [10.475, 18.025]). The fridge is at world x =
  // [10.1, 11.1]; the counter starts 0.625m west of the fridge's
  // east face to leave a small gap (so the fridge door can swing
  // open without hitting the counter).
  const width = 7.55;
  const centerX = 0;

  // ---- Base cabinet ----
  group.add(box("counter-base", [width, 0.85, 0.7], new THREE.MeshLambertMaterial({ color: CABINET }), [centerX, 0.425, 0]));
  // Toe kick.
  group.add(box("counter-toe", [width, 0.06, 0.06], new THREE.MeshLambertMaterial({ color: CABINET_DARK }), [centerX, 0.03, 0.3]));

  // ---- Counter top ----
  // The top is 0.7m deep, reaching from z=-6.95 (5cm off the wall
  // at z=-7) to z=-6.25 (the front edge). In the group's local
  // frame the center is z=0, so:
  //   back:  z = -0.35
  //   front: z = +0.35
  group.add(box("counter-top", [width, 0.04, 0.7], new THREE.MeshLambertMaterial({ color: TOP }), [centerX, 0.87, 0]));

  // Front edge trim.
  group.add(box("counter-edge", [width, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: TOP_TRIM }), [centerX, 0.87, 0.35]));

  // Back edge trim (a thin strip against the wall).
  group.add(box("counter-back-trim", [width, 0.04, 0.02], new THREE.MeshLambertMaterial({ color: TOP_TRIM }), [centerX, 0.87, -0.35]));

  // Backsplash.
  group.add(box("counter-backsplash", [width, 0.12, 0.02], new THREE.MeshLambertMaterial({ color: TOP_TRIM }), [centerX, 0.95, -0.34]));

  // ---- Cabinet doors (4 on the 7.55m run, ~1.9m each) ----
  const doorsInSegment = 4;
  const doorWidth = width / doorsInSegment;
  const cabinetMinX = -width / 2;
  for (let i = 0; i < doorsInSegment; i++) {
    const x = cabinetMinX + doorWidth * (i + 0.5);
    group.add(box(`counter-door-${i}`, [doorWidth - 0.1, 0.7, 0.02], new THREE.MeshLambertMaterial({ color: CABINET_DARK }), [x, 0.4, 0.351]));
    group.add(box(`counter-handle-${i}`, [0.15, 0.025, 0.025], new THREE.MeshLambertMaterial({ color: HANDLE }), [x, 0.65, 0.36]));
  }

  return group;
}

