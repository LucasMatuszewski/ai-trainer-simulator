/**
 * The CEO executive desk (L-2026-08-31-04 #1 + #2).
 *
 * #1: the surface sits at y=0.75 (a real desk height, NOT the old
 * 1.1m reception counter). #2: a modern IT CEO's desk needs a
 * laptop AND a second monitor plus premium decorative elements:
 * a brass nameplate, a small plant, a coffee mug, a book stack.
 *
 * The desk faces +Z (south, toward the glass wall / the office):
 * the CEO sits on the -Z side and looks at the laptop/monitor
 * faces, while visitors from the office see the clean front.
 */
import * as THREE from "three";

const WOOD_DARK = 0x3a2417;
const WOOD_TOP = 0x54371f;
const BRASS = 0xb8912f;
const LEATHER_INLAY = 0x23201d;

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

/** A glowing screen face used by both the laptop and the monitor. */
function screenPlane(
  name: string,
  width: number,
  height: number,
  position: [number, number, number],
): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 20;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#0b2a4a";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // A few "code lines" so the screen reads as work in progress.
    context.fillStyle = "#3fd98c";
    for (let row = 0; row < 7; row += 1) {
      const width2 = 6 + ((row * 7) % 18);
      context.fillRect(3, 3 + row * 2.4, width2, 1.4);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture }),
  );
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

/** Desk with everything on it. Origin at floor level, desk center. */
export function makeExecutiveDesk(): THREE.Group {
  const group = new THREE.Group();
  group.name = "executive-desk";

  const topMaterial = new THREE.MeshLambertMaterial({ color: WOOD_TOP });
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: WOOD_DARK });
  const brassMaterial = new THREE.MeshLambertMaterial({ color: BRASS });

  // Desktop: surface at y=0.75 (C-44 #1).
  group.add(box("desk-top", [3.2, 0.06, 1.4], topMaterial, [0, 0.72, 0]));
  // Leather inlay (premium detail) inset into the desktop.
  group.add(box("desk-inlay", [2.6, 0.015, 1.0], new THREE.MeshLambertMaterial({ color: LEATHER_INLAY }), [0, 0.757, 0.05]));
  // Modesty panel at the back (north side, away from visitors).
  group.add(box("desk-back", [3.0, 0.5, 0.06], bodyMaterial, [0, 0.45, -0.64]));
  // Side pedestals with three drawer lines each.
  for (const side of [-1, 1]) {
    group.add(box("desk-pedestal", [0.55, 0.66, 1.2], bodyMaterial, [side * 1.3, 0.33, 0]));
    for (let drawer = 0; drawer < 3; drawer += 1) {
      group.add(box("desk-drawer", [0.45, 0.16, 0.03], topMaterial, [side * 1.3, 0.16 + drawer * 0.2, 0.61]));
      group.add(box("desk-drawer-handle", [0.16, 0.03, 0.02], brassMaterial, [side * 1.3, 0.24 + drawer * 0.2, 0.63]));
    }
  }

  // ---- On the desk (facing the CEO, who sits on the -Z side) ----

  // Laptop (left of center). Hinge on the base's south edge, lid
  // leaning slightly south, screen facing north toward the CEO.
  const laptopBase = box("laptop-base", [0.44, 0.02, 0.3], new THREE.MeshLambertMaterial({ color: 0x9aa0a8 }), [-0.55, 0.767, 0.12]);
  group.add(laptopBase);
  const laptopLid = box("laptop-lid", [0.44, 0.3, 0.015], new THREE.MeshLambertMaterial({ color: 0x9aa0a8 }), [-0.55, 0.9, 0.31]);
  laptopLid.rotation.x = 0.28;
  group.add(laptopLid);
  const laptopScreen = screenPlane("laptop-screen", 0.4, 0.26, [0, 0, -0.009]);
  laptopScreen.rotation.y = Math.PI;
  laptopLid.add(laptopScreen);

  // Second monitor (right of center): stand + bezel + screen
  // facing north (the CEO looks south at it... the screen faces
  // -Z, toward the CEO sitting on the north side).
  group.add(box("monitor-stand-base", [0.24, 0.02, 0.18], new THREE.MeshLambertMaterial({ color: 0x1c1c22 }), [0.55, 0.757, 0.1]));
  group.add(box("monitor-stand-post", [0.05, 0.22, 0.05], new THREE.MeshLambertMaterial({ color: 0x1c1c22 }), [0.55, 0.86, 0.1]));
  group.add(box("monitor-bezel", [0.62, 0.4, 0.03], new THREE.MeshLambertMaterial({ color: 0x1c1c22 }), [0.55, 1.1, 0.05]));
  const monitorScreen = screenPlane("monitor-screen", 0.56, 0.34, [0.55, 1.1, 0.034]);
  monitorScreen.rotation.y = Math.PI;
  group.add(monitorScreen);

  // Brass nameplate at the back center.
  const nameplateCanvas = document.createElement("canvas");
  nameplateCanvas.width = 128;
  nameplateCanvas.height = 32;
  const nameplateContext = nameplateCanvas.getContext("2d");
  if (nameplateContext) {
    nameplateContext.fillStyle = "#b8912f";
    nameplateContext.fillRect(0, 0, 128, 32);
    nameplateContext.fillStyle = "#2c2005";
    nameplateContext.font = "bold 16px monospace";
    nameplateContext.textAlign = "center";
    nameplateContext.textBaseline = "middle";
    nameplateContext.fillText("DAWID - CEO", 64, 16);
  }
  const nameplateTexture = new THREE.CanvasTexture(nameplateCanvas);
  nameplateTexture.magFilter = THREE.NearestFilter;
  const nameplate = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.06, 0.12),
    [
      new THREE.MeshLambertMaterial({ color: BRASS }),
      new THREE.MeshLambertMaterial({ color: BRASS }),
      new THREE.MeshLambertMaterial({ color: BRASS }),
      new THREE.MeshLambertMaterial({ color: BRASS }),
      new THREE.MeshBasicMaterial({ map: nameplateTexture }),
      new THREE.MeshLambertMaterial({ color: BRASS }),
    ],
  );
  nameplate.name = "desk-nameplate";
  nameplate.position.set(0, 0.78, -0.45);
  group.add(nameplate);

  // Small potted plant on the right corner.
  const plantPot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.045, 0.12, 8),
    new THREE.MeshLambertMaterial({ color: 0x8a4a2a }),
  );
  plantPot.name = "desk-plant-pot";
  plantPot.position.set(1.3, 0.82, -0.45);
  group.add(plantPot);
  const plantLeaf = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 8, 6),
    new THREE.MeshLambertMaterial({ color: 0x2f8f3f }),
  );
  plantLeaf.name = "desk-plant-leaf";
  plantLeaf.position.set(1.3, 0.94, -0.45);
  group.add(plantLeaf);

  // Coffee mug on the left corner.
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.045, 0.1, 10),
    new THREE.MeshLambertMaterial({ color: 0x8f2b2b }),
  );
  mug.name = "desk-mug";
  mug.position.set(-1.3, 0.81, -0.35);
  group.add(mug);

  // Stack of three books (leadership bestsellers, obviously).
  const bookColors = [0x6d3a3a, 0x3a5a6d, 0x5a6d3a];
  bookColors.forEach((color, index) => {
    group.add(box(`desk-book-${index}`, [0.26 - index * 0.02, 0.035, 0.2 - index * 0.015], new THREE.MeshLambertMaterial({ color }), [-1.25, 0.785 + index * 0.035, 0.32]));
  });

  return group;
}
