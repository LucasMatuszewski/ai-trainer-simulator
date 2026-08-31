/**
 * A small kitchen bin with a foot pedal and "RECYCLING" label (C-36).
 *
 * Grey body, black lid, a "RECYCLING" sticker (drawn with the same
 * letter-block trick as the fridge magnets), a foot pedal sticking
 * out the front. Faces +Z. Origin at floor level, center.
 */
import * as THREE from "three";

const BODY = 0x4f555a;
const BODY_TRIM = 0x363b40;
const LID = 0x1a1a1a;
const PEDAL = 0x9aa0a6;
const STICKER_GREEN = 0x2eaa4e;

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
  parent.add(box("bin-letter", [w, h, 0.005], new THREE.MeshBasicMaterial({ color: 0x1a1a1a }), [x, y, z]));
}

export function makeBin(): THREE.Group {
  const group = new THREE.Group();
  group.name = "bin";

  // Main body.
  group.add(box("bin-body", [0.45, 0.6, 0.4], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.3, 0]));

  // A vertical seam in the middle of the body (the lid hinge line).
  group.add(box("bin-seam", [0.005, 0.55, 0.005], new THREE.MeshLambertMaterial({ color: BODY_TRIM }), [0, 0.3, 0.202]));

  // Lid (slightly wider than the body so it overhangs).
  group.add(box("bin-lid", [0.48, 0.04, 0.43], new THREE.MeshLambertMaterial({ color: LID }), [0, 0.62, 0]));

  // Recycling sticker.
  group.add(box("bin-recycling-sticker", [0.22, 0.12, 0.005], new THREE.MeshLambertMaterial({ color: STICKER_GREEN }), [-0.07, 0.42, 0.202]));
  // 5 letter blocks ("R E C Y C" - the joke being that nobody ever
  // remembers the rest).
  for (let i = 0; i < 5; i++) letterBlock(group, -0.17 + i * 0.04, 0.43, 0.207, 0.022, 0.012);

  // Foot pedal (a small bar sticking out the front).
  group.add(box("bin-pedal-arm", [0.04, 0.03, 0.18], new THREE.MeshLambertMaterial({ color: PEDAL }), [0, 0.06, 0.22]));
  group.add(box("bin-pedal-pad", [0.1, 0.02, 0.06], new THREE.MeshLambertMaterial({ color: PEDAL }), [0, 0.04, 0.3]));

  return group;
}
