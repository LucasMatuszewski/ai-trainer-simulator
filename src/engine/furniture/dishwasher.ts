/**
 * A dishwasher for the kitchen (C-36). Sits under the counter.
 *
 * White body, a control panel across the top with a "LOADED — 47
 * ITEMS" gag (scribbled as a small dark plate on the door), a
 * handle. Faces +Z. Origin at floor level, center.
 */
import * as THREE from "three";

const BODY = 0xeaeced;
const BODY_TRIM = 0xc0c4c8;
const PANEL = 0x22232a;
const HANDLE = 0x9aa0a6;
const SCREW = 0x6a6a6a;

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

export function makeDishwasher(): THREE.Group {
  const group = new THREE.Group();
  group.name = "dishwasher";

  // Main body.
  group.add(box("dishwasher-body", [0.7, 0.85, 0.65], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.425, 0]));

  // Front door (slightly inset).
  group.add(box("dishwasher-door", [0.66, 0.74, 0.02], new THREE.MeshLambertMaterial({ color: BODY_TRIM }), [0, 0.4, 0.326]));

  // The "LOADED - 47 ITEMS" gag label (a small yellow note on the door).
  group.add(box("dishwasher-note", [0.22, 0.1, 0.006], new THREE.MeshLambertMaterial({ color: 0xf2c200 }), [-0.1, 0.55, 0.333]));
  group.add(box("dishwasher-note-text", [0.18, 0.04, 0.007], new THREE.MeshBasicMaterial({ color: 0x1a1a1a }), [-0.1, 0.555, 0.334]));

  // Handle (a long bar near the top of the door).
  group.add(box("dishwasher-handle", [0.5, 0.025, 0.03], new THREE.MeshLambertMaterial({ color: HANDLE }), [0, 0.74, 0.34]));

  // Control panel along the very top.
  group.add(box("dishwasher-panel", [0.66, 0.07, 0.018], new THREE.MeshLambertMaterial({ color: PANEL }), [0, 0.8, 0.334]));

  // Three LEDs on the panel.
  group.add(box("dishwasher-led-1", [0.04, 0.025, 0.005], new THREE.MeshBasicMaterial({ color: 0x40e090 }), [-0.22, 0.8, 0.343]));
  group.add(box("dishwasher-led-2", [0.04, 0.025, 0.005], new THREE.MeshBasicMaterial({ color: 0xf2c200 }), [-0.13, 0.8, 0.343]));
  group.add(box("dishwasher-led-3", [0.04, 0.025, 0.005], new THREE.MeshBasicMaterial({ color: 0xd04444 }), [-0.04, 0.8, 0.343]));

  // Two small buttons.
  group.add(box("dishwasher-button-1", [0.06, 0.025, 0.012], new THREE.MeshLambertMaterial({ color: HANDLE }), [0.1, 0.8, 0.343]));
  group.add(box("dishwasher-button-2", [0.06, 0.025, 0.012], new THREE.MeshLambertMaterial({ color: HANDLE }), [0.2, 0.8, 0.343]));

  // Top of the dishwasher (counter surface - blends with the kitchen counter visually).
  group.add(box("dishwasher-top", [0.7, 0.04, 0.65], new THREE.MeshLambertMaterial({ color: 0x76695e }), [0, 0.87, 0]));

  // Two tiny screws on the bottom of the door (the "I've been opened 47 times" detail).
  group.add(box("dishwasher-screw", [0.025, 0.025, 0.005], new THREE.MeshBasicMaterial({ color: SCREW }), [0.28, 0.07, 0.333]));
  group.add(box("dishwasher-screw", [0.025, 0.025, 0.005], new THREE.MeshBasicMaterial({ color: SCREW }), [-0.28, 0.07, 0.333]));

  return group;
}
