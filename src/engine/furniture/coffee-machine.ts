/**
 * A modern office coffee machine for the kitchen (C-36).
 *
 * Stainless steel body, a dark glass front, a "SELECT" button row,
 * a steam wand on the side, a small drip tray, two LED indicators,
 * a paper cup dispenser on the side. Faces +Z. Origin at floor
 * level, center.
 *
 * This is a full C-36 premium version; the old simple coffee machine
 * is still defined in scene.ts for the main office corner (a different
 * furniture entry). The kitchen uses THIS one.
 */
import * as THREE from "three";

const BODY = 0xb8bcc2;
const BODY_DARK = 0x6e7479;
const PANEL = 0x1a1a1e;
const SCREEN = 0x0d2a4a;
const BUTTON_BODY = 0xc8ccd1;
const BUTTON_RED = 0xd04444;
const BUTTON_GREEN = 0x2eaa4e;
const SPOUT = 0x9aa0a6;
const DRIP = 0x22232a;
const GRILL = 0x4a4a4a;

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

export function makeCoffeeMachineKitchen(): THREE.Group {
  const group = new THREE.Group();
  group.name = "coffee-machine-kitchen";

  // Main body (taller, more proportional than the old box).
  group.add(box("cm-body", [0.7, 1.3, 0.6], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.65, 0]));

  // Top dome (a slightly wider top section).
  group.add(box("cm-top", [0.74, 0.06, 0.64], new THREE.MeshLambertMaterial({ color: BODY_DARK }), [0, 1.33, 0]));

  // Bean hopper (the clear-ish dark container on top).
  group.add(box("cm-hopper", [0.36, 0.22, 0.42], new THREE.MeshLambertMaterial({ color: 0x1c1c1e, transparent: true, opacity: 0.85 }), [0, 1.48, 0]));

  // Front dark glass panel.
  group.add(box("cm-front-glass", [0.55, 0.6, 0.02], new THREE.MeshLambertMaterial({ color: PANEL }), [0, 0.95, 0.301]));

  // The display screen (a small dark blue panel).
  group.add(box("cm-screen", [0.36, 0.18, 0.005], new THREE.MeshBasicMaterial({ color: SCREEN }), [0, 1.13, 0.312]));

  // "Coffee cup" silhouette on the display.
  group.add(box("cm-screen-icon", [0.08, 0.06, 0.006], new THREE.MeshBasicMaterial({ color: 0x6acaff }), [0, 1.13, 0.313]));

  // The brew spout (a small downward cylinder in the middle of the glass panel).
  group.add(box("cm-spout", [0.1, 0.18, 0.04], new THREE.MeshLambertMaterial({ color: SPOUT }), [0, 0.74, 0.301]));
  // Two spout nozzles.
  group.add(box("cm-nozzle-1", [0.018, 0.04, 0.018], new THREE.MeshLambertMaterial({ color: 0x2a2a2a }), [-0.02, 0.62, 0.316]));
  group.add(box("cm-nozzle-2", [0.018, 0.04, 0.018], new THREE.MeshLambertMaterial({ color: 0x2a2a2a }), [0.02, 0.62, 0.316]));

  // The button row under the screen.
  group.add(box("cm-button-strip", [0.5, 0.04, 0.012], new THREE.MeshLambertMaterial({ color: 0x2a2a2e }), [0, 0.93, 0.312]));
  // 5 small buttons.
  for (let i = 0; i < 5; i++) {
    group.add(box(`cm-button-${i}`, [0.06, 0.022, 0.014], new THREE.MeshLambertMaterial({ color: BUTTON_BODY }), [-0.2 + i * 0.1, 0.93, 0.317]));
  }

  // Two LED indicators near the top of the body.
  group.add(box("cm-led-green", [0.04, 0.04, 0.005], new THREE.MeshBasicMaterial({ color: BUTTON_GREEN }), [-0.22, 1.32, 0.306]));
  group.add(box("cm-led-red", [0.04, 0.04, 0.005], new THREE.MeshBasicMaterial({ color: BUTTON_RED }), [0.22, 1.32, 0.306]));

  // Drip tray.
  group.add(box("cm-drip", [0.5, 0.04, 0.3], new THREE.MeshLambertMaterial({ color: DRIP }), [0, 0.5, 0.04]));
  // Drip tray grill (a darker top on the tray).
  group.add(box("cm-drip-grill", [0.46, 0.012, 0.26], new THREE.MeshLambertMaterial({ color: GRILL }), [0, 0.522, 0.04]));

  // Steam wand on the right side.
  group.add(box("cm-wand-base", [0.04, 0.06, 0.06], new THREE.MeshLambertMaterial({ color: BODY_DARK }), [0.35, 0.85, 0.1]));
  group.add(box("cm-wand", [0.025, 0.18, 0.025], new THREE.MeshLambertMaterial({ color: SPOUT }), [0.4, 0.74, 0.1]));
  group.add(box("cm-wand-tip", [0.04, 0.03, 0.04], new THREE.MeshLambertMaterial({ color: SPOUT }), [0.42, 0.65, 0.1]));

  // Brand label.
  group.add(box("cm-brand", [0.18, 0.04, 0.005], new THREE.MeshLambertMaterial({ color: 0x8a8a8a }), [0, 0.32, 0.302]));

  return group;
}
