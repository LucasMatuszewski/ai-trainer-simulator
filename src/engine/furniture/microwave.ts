/**
 * A counter-top microwave for the kitchen (C-36).
 *
 * Dark grey body, a glass door with a faint "food inside" silhouette
 * (a plate on the turntable), a digital clock display reading
 * "12:34" in green, and two control buttons. Faces +Z; the door
 * opens to the front. Origin at floor level, center of the
 * microwave.
 */
import * as THREE from "three";

const BODY = 0x33343a;
const BODY_HIGHLIGHT = 0x4a4b54;
const DOOR_FRAME = 0x1a1a1e;
const DOOR_GLASS = 0x1d3142;
const PLATE = 0xeae3d2;
const FOOD = 0x7c4a2e;
const DISPLAY_BG = 0x0a1a18;
const DISPLAY_GREEN = 0x40e090;
const BUTTON = 0x9ea3a8;
const BUTTON_RED = 0xc8442c;

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

export function makeMicrowave(): THREE.Group {
  const group = new THREE.Group();
  group.name = "microwave";

  // Main body.
  group.add(box("microwave-body", [0.85, 0.45, 0.65], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.225, 0]));

  // Top vent slits.
  for (let i = 0; i < 5; i++) {
    group.add(box(`microwave-vent-${i}`, [0.6, 0.012, 0.01], new THREE.MeshLambertMaterial({ color: 0x1c1c20 }), [-0.05, 0.456, -0.22 + i * 0.045]));
  }

  // Front bezel.
  group.add(box("microwave-front", [0.85, 0.45, 0.02], new THREE.MeshLambertMaterial({ color: BODY_HIGHLIGHT }), [0, 0.225, 0.326]));

  // Door frame (left side of the front).
  group.add(box("microwave-door-frame", [0.55, 0.38, 0.015], new THREE.MeshLambertMaterial({ color: DOOR_FRAME }), [-0.12, 0.225, 0.335]));

  // Glass window.
  group.add(box("microwave-glass", [0.48, 0.3, 0.005], new THREE.MeshLambertMaterial({ color: DOOR_GLASS }), [-0.12, 0.25, 0.345]));

  // The plate inside the microwave (a thin disc on the turntable).
  const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.01, 16),
    new THREE.MeshLambertMaterial({ color: PLATE }),
  );
  plate.name = "microwave-plate";
  plate.position.set(-0.12, 0.1, 0);
  group.add(plate);

  // The "food" on the plate.
  const food = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 8, 6),
    new THREE.MeshLambertMaterial({ color: FOOD }),
  );
  food.name = "microwave-food";
  food.position.set(-0.12, 0.14, 0);
  group.add(food);

  // Door handle (right edge of the door).
  group.add(box("microwave-handle", [0.025, 0.3, 0.04], new THREE.MeshLambertMaterial({ color: DOOR_FRAME }), [0.18, 0.225, 0.34]));

  // Right-side control panel.
  group.add(box("microwave-panel", [0.22, 0.38, 0.015], new THREE.MeshLambertMaterial({ color: 0x22232a }), [0.29, 0.225, 0.335]));

  // Digital display.
  group.add(box("microwave-display", [0.18, 0.08, 0.005], new THREE.MeshBasicMaterial({ color: DISPLAY_BG }), [0.29, 0.35, 0.343]));

  // "12:34" digits - a small green rect pattern to suggest a digital readout.
  for (let i = 0; i < 5; i++) {
    const width = i === 2 ? 0.015 : 0.022; // colon is thinner
    group.add(box(`microwave-digit-${i}`, [width, 0.04, 0.006], new THREE.MeshBasicMaterial({ color: DISPLAY_GREEN }), [0.235 + i * 0.028, 0.35, 0.344]));
  }

  // Two control buttons.
  group.add(box("microwave-button-1", [0.07, 0.07, 0.012], new THREE.MeshLambertMaterial({ color: BUTTON }), [0.29, 0.24, 0.343]));
  group.add(box("microwave-button-2", [0.07, 0.07, 0.012], new THREE.MeshLambertMaterial({ color: BUTTON_RED }), [0.29, 0.16, 0.343]));

  // Brand label.
  group.add(box("microwave-brand", [0.1, 0.025, 0.005], new THREE.MeshLambertMaterial({ color: 0x8a8a8a }), [-0.12, 0.42, 0.336]));

  return group;
}
