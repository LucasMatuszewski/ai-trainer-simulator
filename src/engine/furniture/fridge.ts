/**
 * A top-freezer fridge for the kitchen (C-36).
 *
 * White body, chrome handle, magnets on the door ("DO NOT EAT MY
 * YOGURT", a "GIT PUSH --FORCE" sticker, a Barcelona souvenir). Faces
 * +Z (the front with the handle is on +Z). Origin at floor level,
 * center of the fridge.
 */
import * as THREE from "three";

const BODY = 0xe8ecef;
const TRIM = 0xcdd2d6;
const DOOR_SHADOW = 0xb6bcc0;
const HANDLE = 0xb8b8b8;
const HANDLE_SHADOW = 0x808080;
const MAGNET_YELLOW = 0xf2c200;
const MAGNET_RED = 0xd12f2f;
const MAGNET_BLUE = 0x2e6fd1;
const MAGNET_PINK = 0xe66ea0;
const MAGNET_GREEN = 0x4eaa4e;
const LETTER_BLACK = 0x1a1a1a;

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

/** Draws a single coloured "letter" block - a tiny dark square - to
 * suggest a magnet's text without authoring a CanvasTexture per item. */
function letterBlock(
  parent: THREE.Group,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  color = LETTER_BLACK,
): void {
  parent.add(box("fridge-letter", [w, h, 0.005], new THREE.MeshBasicMaterial({ color }), [x, y, z]));
}

export function makeFridge(): THREE.Group {
  const group = new THREE.Group();
  group.name = "fridge";

  // Main body.
  group.add(box("fridge-body", [1.0, 2.05, 0.95], new THREE.MeshLambertMaterial({ color: BODY }), [0, 1.025, 0]));

  // Top freezer door (upper 0.45m of the front face).
  group.add(box("fridge-freezer-door", [0.94, 0.42, 0.02], new THREE.MeshLambertMaterial({ color: TRIM }), [0, 1.75, 0.48]));
  // Door inset shadow line.
  group.add(box("fridge-freezer-shadow", [0.86, 0.36, 0.005], new THREE.MeshLambertMaterial({ color: DOOR_SHADOW }), [0, 1.75, 0.481]));

  // Bottom fridge door (lower 1.4m of the front face).
  group.add(box("fridge-door", [0.94, 1.36, 0.02], new THREE.MeshLambertMaterial({ color: TRIM }), [0, 0.74, 0.48]));
  group.add(box("fridge-door-shadow", [0.86, 1.3, 0.005], new THREE.MeshLambertMaterial({ color: DOOR_SHADOW }), [0, 0.74, 0.481]));

  // Door split line (the line where the two doors meet).
  group.add(box("fridge-split", [0.94, 0.012, 0.005], new THREE.MeshLambertMaterial({ color: 0x9ea4a8 }), [0, 1.18, 0.485]));

  // Chrome handles.
  const freezerHandle = box(
    "fridge-freezer-handle",
    [0.06, 0.22, 0.04],
    new THREE.MeshLambertMaterial({ color: HANDLE }),
    [0.42, 1.75, 0.5],
  );
  group.add(freezerHandle);
  group.add(box("fridge-freezer-handle-shadow", [0.062, 0.22, 0.005], new THREE.MeshLambertMaterial({ color: HANDLE_SHADOW }), [0.42, 1.75, 0.482]));

  const fridgeHandle = box(
    "fridge-handle",
    [0.06, 0.7, 0.04],
    new THREE.MeshLambertMaterial({ color: HANDLE }),
    [0.42, 0.74, 0.5],
  );
  group.add(fridgeHandle);
  group.add(box("fridge-handle-shadow", [0.062, 0.7, 0.005], new THREE.MeshLambertMaterial({ color: HANDLE_SHADOW }), [0.42, 0.74, 0.482]));

  // Hinge lines (subtle, on the left side of the doors).
  group.add(box("fridge-hinge", [0.04, 0.42, 0.01], new THREE.MeshLambertMaterial({ color: 0x8a8e92 }), [-0.45, 1.75, 0.481]));
  group.add(box("fridge-hinge", [0.04, 1.36, 0.01], new THREE.MeshLambertMaterial({ color: 0x8a8e92 }), [-0.45, 0.74, 0.481]));

  // Bottom vent / grill.
  group.add(box("fridge-vent", [0.7, 0.06, 0.01], new THREE.MeshLambertMaterial({ color: 0x6a6e72 }), [0, 0.08, 0.481]));

  // ---- Magnets on the fridge door (the funny bit) ----

  // "DO NOT EAT MY YOGURT" - a yellow note.
  const note = box("fridge-note-yogurt", [0.34, 0.12, 0.006], new THREE.MeshLambertMaterial({ color: MAGNET_YELLOW }), [-0.12, 0.92, 0.49]);
  group.add(note);
  // Tiny black "letters" suggesting text.
  for (let i = 0; i < 7; i++) letterBlock(group, -0.27 + i * 0.04, 0.93, 0.496, 0.02, 0.012);

  // "GIT PUSH --FORCE" red sticker.
  group.add(box("fridge-sticker-force", [0.18, 0.18, 0.006], new THREE.MeshLambertMaterial({ color: MAGNET_RED }), [0.1, 0.65, 0.49]));
  for (let i = 0; i < 4; i++) letterBlock(group, 0.02 + i * 0.04, 0.66, 0.496, 0.02, 0.012);

  // Hello Kitty-ish pink magnet (a small head with two ears).
  group.add(box("fridge-hk-body", [0.1, 0.1, 0.012], new THREE.MeshLambertMaterial({ color: MAGNET_PINK }), [0.18, 0.52, 0.492]));
  group.add(box("fridge-hk-ear-l", [0.03, 0.03, 0.014], new THREE.MeshLambertMaterial({ color: MAGNET_PINK }), [0.155, 0.585, 0.492]));
  group.add(box("fridge-hk-ear-r", [0.03, 0.03, 0.014], new THREE.MeshLambertMaterial({ color: MAGNET_PINK }), [0.205, 0.585, 0.492]));

  // Barcelona souvenir (rectangle with two yellow-and-red stripes).
  group.add(box("fridge-bcn", [0.16, 0.1, 0.008], new THREE.MeshLambertMaterial({ color: MAGNET_YELLOW }), [-0.28, 0.5, 0.49]));
  group.add(box("fridge-bcn-red", [0.16, 0.025, 0.01], new THREE.MeshLambertMaterial({ color: MAGNET_RED }), [-0.28, 0.5, 0.491]));

  // A polaroid (white frame + blue centre).
  group.add(box("fridge-polaroid-frame", [0.14, 0.14, 0.006], new THREE.MeshLambertMaterial({ color: 0xfafafa }), [-0.05, 0.32, 0.49]));
  group.add(box("fridge-polaroid-photo", [0.1, 0.08, 0.007], new THREE.MeshLambertMaterial({ color: MAGNET_BLUE }), [-0.05, 0.34, 0.491]));

  // A green "WASH DISHES" note.
  group.add(box("fridge-note-dishes", [0.2, 0.1, 0.006], new THREE.MeshLambertMaterial({ color: MAGNET_GREEN }), [0.2, 0.32, 0.49]));
  for (let i = 0; i < 5; i++) letterBlock(group, 0.1 + i * 0.035, 0.33, 0.496, 0.02, 0.012);

  // Brand label at the top of the freezer door.
  group.add(box("fridge-brand", [0.18, 0.04, 0.006], new THREE.MeshLambertMaterial({ color: 0x8a8a8a }), [0, 1.95, 0.49]));

  return group;
}
