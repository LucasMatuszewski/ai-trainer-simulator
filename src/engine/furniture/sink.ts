/**
 * A counter-top sink for the kitchen (C-36).
 *
 * Stainless steel basin, a two-tone faucet (spout + handle), a dish
 * rack with three plates and a cup, and a soap dispenser. Faces +Z
 * (the user stands on +Z looking at the sink). Origin at floor
 * level, center of the counter surface.
 */
import * as THREE from "three";

const COUNTER = 0x5b5249;
const COUNTER_TOP = 0x76695e;
const STEEL = 0xb6bcc2;
const STEEL_DEEP = 0x6e7479;
const FAUCET = 0xc8ccd1;
const FAUCET_DARK = 0x80848a;
const PLATE_WHITE = 0xeae6d8;
const PLATE_BLUE = 0x4f6a8a;
const PLATE_GREEN = 0x4f8a64;
const CUP = 0xc8442c;
const SOAP_BODY = 0xf2c200;
const SOAP_PUMP = 0x2a2a2a;

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

export function makeSink(): THREE.Group {
  const group = new THREE.Group();
  group.name = "sink";

  // Counter base.
  group.add(box("sink-counter", [1.6, 0.85, 0.7], new THREE.MeshLambertMaterial({ color: COUNTER }), [0, 0.425, 0]));

  // Counter top.
  group.add(box("sink-counter-top", [1.6, 0.04, 0.7], new THREE.MeshLambertMaterial({ color: COUNTER_TOP }), [0, 0.87, 0]));

  // Basin (a smaller recessed box - we'll do it as a darker box on top
  // of the counter top to suggest depth).
  group.add(box("sink-basin", [0.85, 0.04, 0.55], new THREE.MeshLambertMaterial({ color: STEEL_DEEP }), [0.15, 0.886, 0]));

  // Inner basin walls (slightly smaller, lighter steel - gives the
  // impression of a real basin rim).
  group.add(box("sink-basin-inner", [0.78, 0.04, 0.48], new THREE.MeshLambertMaterial({ color: STEEL }), [0.15, 0.88, 0]));

  // Drain (a small dark disc).
  const drain = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12),
    new THREE.MeshBasicMaterial({ color: 0x1a1a1a }),
  );
  drain.name = "sink-drain";
  drain.position.set(0.15, 0.9, 0);
  group.add(drain);

  // Faucet base.
  group.add(box("sink-faucet-base", [0.1, 0.05, 0.1], new THREE.MeshLambertMaterial({ color: FAUCET_DARK }), [-0.32, 0.91, -0.25]));

  // Faucet body (vertical post).
  group.add(box("sink-faucet-post", [0.06, 0.22, 0.06], new THREE.MeshLambertMaterial({ color: FAUCET }), [-0.32, 1.05, -0.25]));

  // Faucet spout (the curved arm - simulated as a horizontal box at top).
  group.add(box("sink-faucet-spout", [0.04, 0.04, 0.22], new THREE.MeshLambertMaterial({ color: FAUCET }), [-0.32, 1.16, -0.13]));

  // Spout tip (slightly lower to suggest the curve).
  group.add(box("sink-faucet-tip", [0.04, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: FAUCET_DARK }), [-0.32, 1.14, -0.02]));

  // Faucet handle (a small knob on the right of the post).
  group.add(box("sink-faucet-handle", [0.04, 0.06, 0.04], new THREE.MeshLambertMaterial({ color: FAUCET_DARK }), [-0.24, 1.08, -0.25]));

  // Dish rack to the right of the sink.
  group.add(box("sink-rack-base", [0.5, 0.025, 0.4], new THREE.MeshLambertMaterial({ color: STEEL }), [0.65, 0.9, 0.05]));

  // Three plates standing in the rack (as thin upright discs).
  for (let i = 0; i < 3; i++) {
    const colors = [PLATE_WHITE, PLATE_BLUE, PLATE_GREEN];
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.012, 16),
      new THREE.MeshLambertMaterial({ color: colors[i] }),
    );
    plate.name = `sink-rack-plate-${i}`;
    plate.position.set(0.55 + i * 0.08, 1.0, 0.05);
    group.add(plate);
  }

  // A red cup next to the plates.
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.04, 0.1, 10),
    new THREE.MeshLambertMaterial({ color: CUP }),
  );
  cup.name = "sink-rack-cup";
  cup.position.set(0.85, 0.97, -0.05);
  group.add(cup);

  // Soap dispenser to the left of the sink.
  group.add(box("sink-soap-body", [0.1, 0.16, 0.08], new THREE.MeshLambertMaterial({ color: SOAP_BODY }), [-0.5, 0.96, 0.15]));
  group.add(box("sink-soap-neck", [0.04, 0.03, 0.04], new THREE.MeshLambertMaterial({ color: SOAP_PUMP }), [-0.5, 1.05, 0.15]));
  group.add(box("sink-soap-pump", [0.08, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: SOAP_PUMP }), [-0.5, 1.06, 0.15]));

  return group;
}
