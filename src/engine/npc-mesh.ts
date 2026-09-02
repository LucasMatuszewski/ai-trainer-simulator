import * as THREE from "three";
import type { HairTone, NpcAppearance, ShirtTone, SkinTone } from "../types";

export type NpcMeshGender = "male" | "female" | "dog";

/**
 * C-63 (Lucas: "Can we add some skin color variety... Now everybody has
 * exact same skin tone"). The tone NAMES live in `types.ts` so the
 * character data in `content/npcs.ts` never touches three.js; this file
 * owns the name -> color mapping and nothing else does.
 */
export const SKIN_TONE_COLORS: Readonly<Record<SkinTone, number>> = {
  porcelain: 0xffe3cd,
  fair: 0xffd0a8,
  olive: 0xe8b98d,
  tan: 0xcf9a66,
  brown: 0x9c6a45,
  deep: 0x6d472f,
};

export const HAIR_TONE_COLORS: Readonly<Record<HairTone, number>> = {
  black: 0x1d1a19,
  brown: 0x442211,
  auburn: 0x7a3418,
  blond: 0xccaa22,
  grey: 0x9a9490,
  dyed: 0x8f3f8f,
};

export const SHIRT_TONE_COLORS: Readonly<Record<ShirtTone, number>> = {
  navy: 0x224488,
  charcoal: 0x3a3f45,
  forest: 0x2f6b3a,
  burgundy: 0x882244,
  mustard: 0x9a7a1f,
  teal: 0x1f6b6b,
  violet: 0x5a3f7a,
  rust: 0x884422,
};

const SKIN_TONE_NAMES = Object.keys(SKIN_TONE_COLORS) as SkinTone[];
const HAIR_TONE_NAMES = Object.keys(HAIR_TONE_COLORS) as HairTone[];
const SHIRT_TONE_NAMES = Object.keys(SHIRT_TONE_COLORS) as ShirtTone[];

const DARK_CLOTHING = 0x222244;

/**
 * C-63: the sleeve is SHORTER than the old single-box arm so the hand
 * fits on the end without lengthening the arm. Lucas was explicit:
 * "do not make whole arms longer, they length is ok now, I only need a
 * skin color in the end of arm."
 */
export const SLEEVE_LENGTH = 0.5;
export const HAND_LENGTH = 0.15;
export const ARM_TOTAL_LENGTH = SLEEVE_LENGTH + HAND_LENGTH;
/** World Y of the shoulder joint the arm hangs from. */
export const SHOULDER_Y = 0.95;

export interface NpcClothing {
  lowerBody: "none" | "trousers" | "skirt";
  shoes: boolean;
}

function hashNpcId(id: string): number {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Return stable clothing choices for an NPC id. */
export function clothingForNpc(id: string, gender: Exclude<NpcMeshGender, "dog">): NpcClothing {
  const hash = hashNpcId(id);
  const lowerBodyIndex = (hash >>> 8) % 3;
  return {
    lowerBody: lowerBodyIndex === 0 ? "none" : lowerBodyIndex === 1 ? "trousers" : gender === "female" ? "skirt" : "none",
    shoes: ((hash >>> 16) & 1) === 0,
  };
}

/** C-63: the per-id fallback tone, so `appearance` stays optional and an
 *  NPC nobody has styled yet is still not a clone of their neighbour. */
export function skinToneForNpc(id: string): SkinTone {
  return SKIN_TONE_NAMES[(hashNpcId(id) >>> 4) % SKIN_TONE_NAMES.length]!;
}

export function hairToneForNpc(id: string): HairTone {
  return HAIR_TONE_NAMES[(hashNpcId(id) >>> 12) % HAIR_TONE_NAMES.length]!;
}

export function shirtToneForNpc(id: string): ShirtTone {
  return SHIRT_TONE_NAMES[(hashNpcId(id) >>> 20) % SHIRT_TONE_NAMES.length]!;
}

/**
 * C-45 amendment (l)(4): `pivotAtTop` shifts the box geometry so
 * its TOP edge is at the mesh's local origin. That makes the
 * rotation pivot the shoulder (or hip), not the box's center, so
 * the arm hangs from the joint and swings correctly. Used for
 * arms and legs; everything else keeps the default centered pivot.
 */
function box(
  name: string,
  dimensions: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
  pivotAtTop = false,
): THREE.Mesh<THREE.BoxGeometry, THREE.Material> {
  const geometry = new THREE.BoxGeometry(...dimensions);
  if (pivotAtTop) geometry.translate(0, -dimensions[1] / 2, 0);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

function createHumanoidHead(
  hairColor: number,
  female: boolean,
  skinMaterial: THREE.Material,
): THREE.Group {
  const head = new THREE.Group();
  head.name = "head";
  head.position.set(0, 1.25, 0);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const hairMaterial = new THREE.MeshLambertMaterial({ color: hairColor });
  head.add(
    box("head-mesh", [0.5, 0.5, 0.5], skinMaterial, [0, 0, 0]),
    box("left-eye", [0.06, 0.06, 0.01], eyeMaterial, [-0.1, 0.05, 0.255]),
    box("right-eye", [0.06, 0.06, 0.01], eyeMaterial, [0.1, 0.05, 0.255]),
  );
  if (female) {
    head.add(
      box("hair-top", [0.54, 0.2, 0.54], hairMaterial, [0, 0.3, 0]),
      box("hair-back", [0.56, 0.7, 0.18], hairMaterial, [0, 0, -0.22]),
    );
  } else {
    head.add(box("hair", [0.52, 0.18, 0.52], hairMaterial, [0, 0.3, 0]));
  }
  return head;
}

function addHumanoidLegs(group: THREE.Group): void {
  const legMaterial = new THREE.MeshLambertMaterial({ color: DARK_CLOTHING });
  // pivotAtTop: leg box's TOP is at the hip (y=0.3) so the rotation
  // pivots the hip joint instead of the box's center.
  group.add(
    box("left-leg", [0.18, 0.3, 0.3], legMaterial, [-0.15, 0.3, 0], true),
    box("right-leg", [0.18, 0.3, 0.3], legMaterial, [0.15, 0.3, 0], true),
  );
}

/**
 * C-63: an arm is now a shirt-colored SLEEVE with a skin-colored HAND
 * parented at its far end. The sleeve keeps the historic `arm-left` /
 * `arm-right` names and the pivot-at-the-shoulder geometry, so the C-45
 * walk cycle and the idle poses drive it exactly as before - and the
 * hand, being a child, follows every rotation for free.
 *
 * The hand is a touch wider and deeper than the sleeve so the silhouette
 * reads as "hand", not as "the sleeve changed color".
 */
function addHumanoidArms(
  group: THREE.Group,
  bodyColor: number,
  skinMaterial: THREE.Material,
  x = 0.38,
): void {
  const material = new THREE.MeshLambertMaterial({ color: bodyColor });
  for (const side of ["left", "right"] as const) {
    const sign = side === "left" ? -1 : 1;
    const arm = box(`arm-${side}`, [0.14, SLEEVE_LENGTH, 0.16], material, [sign * x, SHOULDER_Y, 0], true);
    arm.add(
      box(`hand-${side}`, [0.15, HAND_LENGTH, 0.17], skinMaterial, [0, -SLEEVE_LENGTH - HAND_LENGTH / 2, 0]),
    );
    group.add(arm);
  }
}

/**
 * C-63: the prop for the `coffee-sip` desk gesture. It lives in the
 * right hand permanently and is only made visible while the gesture
 * plays, so the sip reads as a sip instead of an unexplained arm lift.
 */
function addCoffeeMug(group: THREE.Group, mugColor: number): void {
  const hand = group.getObjectByName("hand-right");
  if (hand === undefined) return;
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.05, 0.12, 8),
    new THREE.MeshLambertMaterial({ color: mugColor }),
  );
  mug.name = "mug";
  mug.position.set(0, -0.02, 0.09);
  mug.visible = false;
  hand.add(mug);
}

const MUG_COLORS = [0xd9d2c5, 0xb03a2e, 0x2e6da4, 0x3f8f5a, 0xe0a020];

function createMaleMesh(
  bodyColor: number,
  hairColor: number,
  skinMaterial: THREE.Material,
): THREE.Group {
  const group = new THREE.Group();
  group.add(
    box("body", [0.6, 1, 0.4], new THREE.MeshLambertMaterial({ color: bodyColor }), [0, 0.5, 0]),
    box("belt", [0.62, 0.08, 0.42], new THREE.MeshLambertMaterial({ color: 0x222222 }), [0, 0.45, 0]),
    box("tie", [0.08, 0.38, 0.02], new THREE.MeshLambertMaterial({ color: 0x992222 }), [0, 0.65, 0.211]),
    createHumanoidHead(hairColor, false, skinMaterial),
  );
  addHumanoidLegs(group);
  addHumanoidArms(group, bodyColor, skinMaterial);
  return group;
}

function createFemaleMesh(
  bodyColor: number,
  hairColor: number,
  skinMaterial: THREE.Material,
): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: bodyColor });
  group.add(
    box("body", [0.5, 0.85, 0.4], bodyMaterial, [0, 0.575, 0]),
    createHumanoidHead(hairColor, true, skinMaterial),
  );
  const breastGeo = new THREE.SphereGeometry(0.13, 12, 10);
  const leftBreast = new THREE.Mesh(breastGeo, bodyMaterial);
  leftBreast.name = "breast";
  leftBreast.position.set(-0.09, 0.84, 0.18);
  leftBreast.scale.set(1, 0.85, 0.7);
  group.add(leftBreast);
  const rightBreast = new THREE.Mesh(breastGeo, bodyMaterial);
  rightBreast.name = "breast";
  rightBreast.position.set(0.09, 0.84, 0.18);
  rightBreast.scale.set(1, 0.85, 0.7);
  group.add(rightBreast);
  addHumanoidLegs(group);
  addHumanoidArms(group, bodyColor, skinMaterial, 0.28);
  return group;
}

function addClothing(group: THREE.Group, clothing: NpcClothing): void {
  if (clothing.lowerBody === "trousers") {
    group.add(box("clothing-trousers", [0.3, 0.4, 0.3], new THREE.MeshLambertMaterial({ color: DARK_CLOTHING }), [0, 0.28, 0]));
  } else if (clothing.lowerBody === "skirt") {
    const skirt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.225, 0.175, 0.5, 4),
      new THREE.MeshLambertMaterial({ color: DARK_CLOTHING }),
    );
    skirt.name = "clothing-skirt";
    skirt.position.y = 0.4;
    skirt.rotation.y = Math.PI / 4;
    group.add(skirt);
  }
  if (clothing.shoes) {
    const shoeMaterial = new THREE.MeshLambertMaterial({ color: 0x171717 });
    group.add(
      box("shoe-left", [0.2, 0.12, 0.34], shoeMaterial, [-0.15, 0.06, 0.04]),
      box("shoe-right", [0.2, 0.12, 0.34], shoeMaterial, [0.15, 0.06, 0.04]),
    );
  }
}

function createDogMesh(): THREE.Group {
  const group = new THREE.Group();
  const fur = new THREE.MeshLambertMaterial({ color: 0xc4a060 });
  const darkFur = new THREE.MeshLambertMaterial({ color: 0x9b7440 });
  const head = new THREE.Group();
  head.name = "head";
  head.position.set(0, 0.55, 0.65);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  head.add(
    box("head-mesh", [0.5, 0.4, 0.4], fur, [0, 0, 0]),
    box("snout", [0.2, 0.2, 0.25], darkFur, [0, -0.1, 0.3]),
    box("left-ear", [0.1, 0.2, 0.05], darkFur, [-0.15, 0.2, -0.08]),
    box("right-ear", [0.1, 0.2, 0.05], darkFur, [0.15, 0.2, -0.08]),
    box("left-eye", [0.05, 0.05, 0.01], eyeMaterial, [-0.13, 0.05, 0.205]),
    box("right-eye", [0.05, 0.05, 0.01], eyeMaterial, [0.13, 0.05, 0.205]),
  );
  group.add(
    box("body", [0.4, 0.5, 1], fur, [0, 0.4, 0]),
    head,
    // C-53: legs in the body fur color - the two-tone read as artifacts
    // (Lucas, 2026-09-01).
    box("front-left-leg", [0.1, 0.4, 0.1], fur, [-0.15, 0.2, 0.3]),
    box("front-right-leg", [0.1, 0.4, 0.1], fur, [0.15, 0.2, 0.3]),
    box("back-left-leg", [0.1, 0.4, 0.1], fur, [-0.15, 0.2, -0.3]),
    box("back-right-leg", [0.1, 0.4, 0.1], fur, [0.15, 0.2, -0.3]),
    box("tail", [0.1, 0.1, 0.3], darkFur, [0, 0.55, -0.65]),
    // C-53: the old red collar sat mid-body and was wider than the
    // torso, so both ends poked out of the flanks as floating red
    // squares. Removed; the dark ears and snout carry the silhouette.
  );
  return group;
}

/** Create a low-poly NPC whose local origin is at floor level. */
export function createNpcMesh(
  gender: NpcMeshGender,
  paletteIndex = 0,
  npcId = String(paletteIndex),
  appearance: NpcAppearance = {},
): THREE.Group {
  if (gender === "dog") return createDogMesh();

  const skinTone = appearance.skin ?? skinToneForNpc(npcId);
  const hairTone = appearance.hair ?? hairToneForNpc(npcId);
  const shirtTone = appearance.shirt ?? shirtToneForNpc(npcId);
  // ONE skin material per NPC, shared by the face and both hands, so a
  // head tone can never drift out of sync with a hand tone (Lucas:
  // "hands in skin color same as face").
  const skinMaterial = new THREE.MeshLambertMaterial({ color: SKIN_TONE_COLORS[skinTone] });
  const bodyColor = SHIRT_TONE_COLORS[shirtTone];
  const hairColor = HAIR_TONE_COLORS[hairTone];
  const clothing = clothingForNpc(npcId, gender);
  const group = gender === "female"
    ? createFemaleMesh(bodyColor, hairColor, skinMaterial)
    : createMaleMesh(bodyColor, hairColor, skinMaterial);
  addCoffeeMug(group, MUG_COLORS[Math.abs(Math.trunc(paletteIndex)) % MUG_COLORS.length]!);
  group.userData.clothing = clothing;
  group.userData.appearance = { skin: skinTone, hair: hairTone, shirt: shirtTone };
  addClothing(group, clothing);
  return group;
}
