/**
 * A small wall-mounted washbasin for the new C-57 WC (east of the
 * kitchen).
 *
 * White porcelain basin, a chrome faucet (spout + handle), a small
 * rectangular mirror above the basin, and a soap dispenser on the
 * right side. Faces -Z (the user stands on -Z facing +Z, the wall).
 *
 * Origin at floor level, center of the sink. The sink is 1.2m wide
 * (X) x 0.55m deep (Z), and the mirror is 1.0m wide x 0.6m tall,
 * mounted at y=1.7.
 */
import * as THREE from "three";

const BASIN = 0xfafafa;
const BASIN_DARK = 0xc8c8c8;
const STEEL = 0xc8ccd1;
const STEEL_DARK = 0x80848a;
const MIRROR_FRAME = 0x8a6a3e;
const MIRROR_GLASS = 0xa8c0c8;
const SOAP_BODY = 0xf2c200;
const SOAP_PUMP = 0x2a2a2a;
const PAPER_TOWEL = 0xfafafa;
const PAPER_TOWEL_HOLE = 0x2a2a2a;

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

export function makeToiletSink(): THREE.Group {
  const group = new THREE.Group();
  group.name = "toilet-sink";

  // -- Basin (a counter section with a recessed bowl) -----------------
  // Counter surface.
  group.add(box("toilet-sink-counter", [1.2, 0.06, 0.55], new THREE.MeshLambertMaterial({ color: BASIN }), [0, 0.85, 0]));

  // Counter front skirt (a panel below the counter).
  group.add(box("toilet-sink-skirt", [1.2, 0.78, 0.04], new THREE.MeshLambertMaterial({ color: BASIN_DARK }), [0, 0.39, 0.255]));

  // Counter side panels (the two ends).
  group.add(box("toilet-sink-side-left", [0.04, 0.78, 0.55], new THREE.MeshLambertMaterial({ color: BASIN_DARK }), [-0.58, 0.39, 0]));
  group.add(box("toilet-sink-side-right", [0.04, 0.78, 0.55], new THREE.MeshLambertMaterial({ color: BASIN_DARK }), [0.58, 0.39, 0]));

  // Recessed bowl (a darker rectangle inset into the counter).
  group.add(box("toilet-sink-bowl", [0.85, 0.02, 0.4], new THREE.MeshLambertMaterial({ color: BASIN_DARK }), [-0.1, 0.88, 0]));

  // Inner bowl (a slightly lighter rectangle on top of the recess).
  group.add(box("toilet-sink-bowl-inner", [0.78, 0.005, 0.33], new THREE.MeshLambertMaterial({ color: BASIN }), [-0.1, 0.882, 0]));

  // Drain.
  const drain = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12),
    new THREE.MeshBasicMaterial({ color: 0x1a1a1a }),
  );
  drain.name = "toilet-sink-drain";
  drain.position.set(-0.1, 0.89, 0);
  group.add(drain);

  // -- Faucet ----------------------------------------------------------
  // Faucet base.
  group.add(box("toilet-sink-faucet-base", [0.08, 0.04, 0.08], new THREE.MeshLambertMaterial({ color: STEEL_DARK }), [-0.10, 0.9, -0.25]));

  // Faucet body (vertical post).
  group.add(box("toilet-sink-faucet-post", [0.05, 0.18, 0.05], new THREE.MeshLambertMaterial({ color: STEEL }), [-0.10, 1.01, -0.25]));

  // Faucet spout (horizontal arm).
  group.add(box("toilet-sink-faucet-spout", [0.04, 0.04, 0.18], new THREE.MeshLambertMaterial({ color: STEEL }), [-0.10, 1.12, -0.15]));

  // Spout tip.
  group.add(box("toilet-sink-faucet-tip", [0.04, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: STEEL_DARK }), [-0.10, 1.1, -0.06]));

  // Faucet handle (a small knob on the side of the post).
  group.add(box("toilet-sink-faucet-handle", [0.04, 0.05, 0.04], new THREE.MeshLambertMaterial({ color: STEEL_DARK }), [-0.06, 1.03, -0.25]));

  // -- Mirror on the wall above the sink -------------------------------
  // Mirror frame.
  group.add(box("toilet-sink-mirror-frame", [1.0, 0.6, 0.04], new THREE.MeshLambertMaterial({ color: MIRROR_FRAME }), [0, 1.7, -0.30]));

  // Mirror glass.
  group.add(box("toilet-sink-mirror-glass", [0.92, 0.52, 0.005], new THREE.MeshBasicMaterial({ color: MIRROR_GLASS }), [0, 1.7, -0.26]));

  // -- Soap dispenser on the right side of the sink -------------------
  group.add(box("toilet-sink-soap-body", [0.1, 0.16, 0.08], new THREE.MeshLambertMaterial({ color: SOAP_BODY }), [0.4, 0.97, -0.10]));
  group.add(box("toilet-sink-soap-neck", [0.04, 0.03, 0.04], new THREE.MeshLambertMaterial({ color: SOAP_PUMP }), [0.4, 1.06, -0.10]));
  group.add(box("toilet-sink-soap-pump", [0.08, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: SOAP_PUMP }), [0.38, 1.10, -0.10]));

  // -- Paper towel dispenser on the wall to the right ----------------
  // (a small white cabinet).
  group.add(box("toilet-sink-paper-cabinet", [0.35, 0.45, 0.18], new THREE.MeshLambertMaterial({ color: PAPER_TOWEL }), [0.75, 1.5, -0.25]));

  // Paper slot (a dark slit at the bottom front of the cabinet).
  group.add(box("toilet-sink-paper-slot", [0.28, 0.02, 0.005], new THREE.MeshBasicMaterial({ color: PAPER_TOWEL_HOLE }), [0.75, 1.28, -0.16]));

  return group;
}
