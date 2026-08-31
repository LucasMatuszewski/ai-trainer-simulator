/**
 * A coffee grinder (manual hand-crank style) for the kitchen (C-36).
 *
 * Wooden box base, a glass jar in the middle with dark "coffee
 * beans" silhouette, a hand crank on the side. Sits on the counter.
 * Faces +Z. Origin at floor level, center.
 */
import * as THREE from "three";

const WOOD = 0x6b4a2a;
const WOOD_DARK = 0x4a2f18;
const METAL = 0x9aa0a6;
const METAL_DARK = 0x6a6a6a;
const GLASS = 0x3a4a4a;
const BEAN = 0x3a2a1a;
const BEAN_LIGHT = 0x5a3e22;

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

export function makeCoffeeGrinder(): THREE.Group {
  const group = new THREE.Group();
  group.name = "coffee-grinder";

  // Wooden box base.
  group.add(box("grinder-base", [0.22, 0.18, 0.22], new THREE.MeshLambertMaterial({ color: WOOD }), [0, 0.09, 0]));

  // Hopper (the glass jar on top).
  group.add(box("grinder-hopper", [0.16, 0.18, 0.16], new THREE.MeshLambertMaterial({ color: GLASS, transparent: true, opacity: 0.85 }), [0, 0.27, 0]));

  // "Coffee beans" inside the hopper - a couple of dark dots.
  for (let i = 0; i < 6; i++) {
    const bean = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 6, 4),
      new THREE.MeshLambertMaterial({ color: i % 2 === 0 ? BEAN : BEAN_LIGHT }),
    );
    bean.name = `grinder-bean-${i}`;
    bean.position.set(-0.05 + (i % 3) * 0.05, 0.24 + Math.floor(i / 3) * 0.04, -0.05 + (i % 2) * 0.05);
    group.add(bean);
  }

  // Hopper lid (a small dark disc on top).
  const lid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.02, 10),
    new THREE.MeshLambertMaterial({ color: WOOD_DARK }),
  );
  lid.name = "grinder-lid";
  lid.position.set(0, 0.37, 0);
  group.add(lid);

  // Lid knob.
  group.add(box("grinder-knob", [0.03, 0.025, 0.03], new THREE.MeshLambertMaterial({ color: METAL_DARK }), [0, 0.4, 0]));

  // Grinder drawer at the bottom.
  group.add(box("grinder-drawer", [0.18, 0.08, 0.18], new THREE.MeshLambertMaterial({ color: WOOD_DARK }), [0, 0.045, 0]));
  // Drawer pull (a small handle).
  group.add(box("grinder-drawer-pull", [0.06, 0.02, 0.02], new THREE.MeshLambertMaterial({ color: METAL }), [0, 0.045, 0.1]));

  // Hand crank on the side (a small handle sticking out the right).
  group.add(box("grinder-crank-arm", [0.18, 0.012, 0.012], new THREE.MeshLambertMaterial({ color: METAL }), [0.18, 0.18, 0]));
  group.add(box("grinder-crank-knob", [0.04, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: WOOD }), [0.27, 0.18, 0]));

  return group;
}
