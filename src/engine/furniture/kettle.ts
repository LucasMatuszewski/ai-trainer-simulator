/**
 * An electric kettle for the kitchen counter (C-36).
 *
 * Chrome body, black handle, a tiny spout, and a "steam" wisp
 * (suggested as a translucent box) above the spout. Sits flat on
 * the counter. Faces +Z. Origin at floor level, center.
 */
import * as THREE from "three";

const BODY = 0xc8ccd1;
const BODY_DARK = 0x80858b;
const HANDLE = 0x1a1a1a;
const SPOUT = 0x9aa0a6;
const STEAM = 0xeeeeee;

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

export function makeKettle(): THREE.Group {
  const group = new THREE.Group();
  group.name = "kettle";

  // Body (a slight dome approximated by a wider lower section and narrower top).
  group.add(box("kettle-base", [0.22, 0.04, 0.22], new THREE.MeshLambertMaterial({ color: 0x1c1c1c }), [0, 0.02, 0]));
  group.add(box("kettle-body", [0.2, 0.2, 0.2], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.14, 0]));
  group.add(box("kettle-top", [0.16, 0.02, 0.16], new THREE.MeshLambertMaterial({ color: BODY_DARK }), [0, 0.25, 0]));

  // Lid knob.
  group.add(box("kettle-lid-knob", [0.04, 0.025, 0.04], new THREE.MeshLambertMaterial({ color: BODY_DARK }), [0, 0.27, 0]));

  // Handle (a small loop on the right side, simplified as two bars).
  group.add(box("kettle-handle-vert", [0.025, 0.14, 0.025], new THREE.MeshLambertMaterial({ color: HANDLE }), [0.13, 0.16, 0]));
  group.add(box("kettle-handle-top", [0.04, 0.025, 0.025], new THREE.MeshLambertMaterial({ color: HANDLE }), [0.115, 0.24, 0]));

  // Spout (angled-ish - simulated as a small box on the front-left).
  group.add(box("kettle-spout-base", [0.06, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: SPOUT }), [-0.1, 0.16, 0.08]));
  group.add(box("kettle-spout", [0.04, 0.04, 0.08], new THREE.MeshLambertMaterial({ color: SPOUT }), [-0.13, 0.2, 0.1]));

  // Power light (a tiny green dot on the front).
  group.add(box("kettle-led", [0.025, 0.025, 0.005], new THREE.MeshBasicMaterial({ color: 0x40e090 }), [0, 0.18, 0.101]));

  // Steam (a translucent, off-white wisp above the spout).
  const steamMat = new THREE.MeshBasicMaterial({ color: STEAM, transparent: true, opacity: 0.55 });
  group.add(box("kettle-steam-1", [0.06, 0.08, 0.06], steamMat, [-0.13, 0.32, 0.1]));
  group.add(box("kettle-steam-2", [0.08, 0.06, 0.08], new THREE.MeshBasicMaterial({ color: STEAM, transparent: true, opacity: 0.4 }), [-0.13, 0.42, 0.1]));

  return group;
}
