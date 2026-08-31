/**
 * The kitchen counter - a long run of cabinets and a counter top.
 *
 * The kitchen is a single 10x14m room; the counter runs along the
 * north wall (z = -7), holding the fridge, microwave, sink, coffee
 * machine, etc. The counter is a base cabinet + top, 9m long.
 * Origin at the counter center, floor level.
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

  // Base cabinet (9m wide, 0.85m tall, 0.7m deep).
  group.add(box("counter-base", [9.0, 0.85, 0.7], new THREE.MeshLambertMaterial({ color: CABINET }), [0, 0.425, 0]));

  // Toe kick (a darker recess at the very bottom).
  group.add(box("counter-toe", [9.0, 0.06, 0.06], new THREE.MeshLambertMaterial({ color: CABINET_DARK }), [0, 0.03, 0.3]));

  // Counter top.
  group.add(box("counter-top", [9.0, 0.04, 0.74], new THREE.MeshLambertMaterial({ color: TOP }), [0, 0.87, 0]));

  // Front edge trim.
  group.add(box("counter-edge", [9.0, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: TOP_TRIM }), [0, 0.87, 0.37]));

  // Cabinet doors (5 doors with handles - one every 1.8m).
  for (let i = 0; i < 5; i++) {
    const x = -3.6 + i * 1.8;
    group.add(box(`counter-door-${i}`, [1.7, 0.7, 0.02], new THREE.MeshLambertMaterial({ color: CABINET_DARK }), [x, 0.4, 0.351]));
    group.add(box(`counter-handle-${i}`, [0.15, 0.025, 0.025], new THREE.MeshLambertMaterial({ color: HANDLE }), [x, 0.65, 0.36]));
  }

  // A backsplash along the back edge.
  group.add(box("counter-backsplash", [9.0, 0.12, 0.02], new THREE.MeshLambertMaterial({ color: TOP_TRIM }), [0, 0.95, -0.34]));

  return group;
}
