/**
 * A counter-top soap dispenser (C-36).
 *
 * Yellow soap bottle with a black pump on top. Faces +Z. Origin at
 * floor level, center.
 */
import * as THREE from "three";

const BODY = 0xf2c200;
const BODY_DARK = 0xc99e00;
const LABEL = 0x1a1a1a;
const PUMP = 0x2a2a2a;
const NOZZLE = 0x9aa0a6;

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

function letterBlock(
  parent: THREE.Group,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
): void {
  parent.add(box("soap-letter", [w, h, 0.005], new THREE.MeshBasicMaterial({ color: 0xfafafa }), [x, y, z]));
}

export function makeSoapDispenser(): THREE.Group {
  const group = new THREE.Group();
  group.name = "soap-dispenser";

  // Body (slightly tapered: narrower at the top).
  group.add(box("soap-body-bottom", [0.12, 0.16, 0.1], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.1, 0]));
  group.add(box("soap-body-top", [0.1, 0.04, 0.08], new THREE.MeshLambertMaterial({ color: BODY_DARK }), [0, 0.2, 0]));

  // Label band (a darker strip on the front).
  group.add(box("soap-label", [0.1, 0.05, 0.005], new THREE.MeshLambertMaterial({ color: LABEL }), [0, 0.12, 0.051]));
  // "SOAP" letters (3 small blocks).
  for (let i = 0; i < 4; i++) letterBlock(group, -0.025 + i * 0.018, 0.125, 0.056, 0.012, 0.008);

  // Pump neck.
  group.add(box("soap-neck", [0.05, 0.03, 0.04], new THREE.MeshLambertMaterial({ color: PUMP }), [0, 0.23, 0]));

  // Pump head.
  group.add(box("soap-pump-head", [0.1, 0.04, 0.05], new THREE.MeshLambertMaterial({ color: PUMP }), [0, 0.25, 0]));

  // Nozzle (a small bar sticking out the front).
  group.add(box("soap-nozzle", [0.025, 0.015, 0.04], new THREE.MeshLambertMaterial({ color: NOZZLE }), [0.04, 0.25, 0.05]));

  return group;
}
