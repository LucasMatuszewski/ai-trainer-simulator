import * as THREE from "three";

export type NpcMeshGender = "male" | "female" | "dog";

const BODY_COLORS = [0x884422, 0x224488, 0x448822, 0x882244, 0x886622];
const HAIR_COLORS = [0x442211, 0xccaa22, 0x222222];
const SKIN_COLOR = 0xffd0a8;
const DARK_CLOTHING = 0x222244;
const SHIRT_COLORS = [0x3b82f6, 0xef4444, 0x22c55e, 0xf59e0b, 0x8b5cf6];

export interface NpcClothing {
  shirt: boolean;
  lowerBody: "none" | "trousers" | "skirt";
  shoes: boolean;
  shirtColor: number;
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
    shirt: (hash & 1) === 0,
    lowerBody: lowerBodyIndex === 0 ? "none" : lowerBodyIndex === 1 ? "trousers" : gender === "female" ? "skirt" : "none",
    shoes: ((hash >>> 16) & 1) === 0,
    shirtColor: SHIRT_COLORS[(hash >>> 24) % SHIRT_COLORS.length]!,
  };
}

function box(
  name: string,
  dimensions: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
): THREE.Mesh<THREE.BoxGeometry, THREE.Material> {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...dimensions), material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

function createHumanoidHead(hairColor: number, female: boolean): THREE.Group {
  const head = new THREE.Group();
  head.name = "head";
  head.position.set(0, 1.25, 0);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const hairMaterial = new THREE.MeshLambertMaterial({ color: hairColor });
  head.add(
    box("head-mesh", [0.5, 0.5, 0.5], new THREE.MeshLambertMaterial({ color: SKIN_COLOR }), [0, 0, 0]),
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
  group.add(
    box("left-leg", [0.18, 0.3, 0.3], legMaterial, [-0.15, 0.15, 0]),
    box("right-leg", [0.18, 0.3, 0.3], legMaterial, [0.15, 0.15, 0]),
  );
}

function addHumanoidArms(group: THREE.Group, bodyColor: number, x = 0.38): void {
  const material = new THREE.MeshLambertMaterial({ color: bodyColor });
  group.add(
    box("arm-left", [0.14, 0.65, 0.16], material, [-x, 0.72, 0]),
    box("arm-right", [0.14, 0.65, 0.16], material, [x, 0.72, 0]),
  );
}

function createMaleMesh(bodyColor: number, hairColor: number): THREE.Group {
  const group = new THREE.Group();
  group.add(
    box("body", [0.6, 1, 0.4], new THREE.MeshLambertMaterial({ color: bodyColor }), [0, 0.5, 0]),
    box("belt", [0.62, 0.08, 0.42], new THREE.MeshLambertMaterial({ color: 0x222222 }), [0, 0.45, 0]),
    box("tie", [0.08, 0.38, 0.02], new THREE.MeshLambertMaterial({ color: 0x992222 }), [0, 0.78, 0.211]),
    createHumanoidHead(hairColor, false),
  );
  addHumanoidLegs(group);
  addHumanoidArms(group, bodyColor);
  return group;
}

function chestRadiusForNpc(id: string): number {
  const variation = 0.7 + ((hashNpcId(id) >>> 12) & 0xff) / 255 * 0.6;
  return 0.08 * variation;
}

function createFemaleMesh(bodyColor: number, hairColor: number, shirtColor: number, npcId: string): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: bodyColor });
  group.add(
    box("body", [0.5, 0.85, 0.4], bodyMaterial, [0, 0.575, 0]),
    createHumanoidHead(hairColor, true),
  );
  // L-2026-08-30 missed feedback (msg #110): "Man has Brest!!!
  // Brest has different color than the rest of the shirt!!!"
  // The chest is rendered in a CHEST color (a darker shade of the
  // shirt) so the two-tone shirt reads as a deliberate v-neck
  // accent, not a clipping glitch.
  const chest = new THREE.Mesh(
    new THREE.SphereGeometry(chestRadiusForNpc(npcId), 8, 6),
    new THREE.MeshLambertMaterial({ color: darkenColor(shirtColor, 0.7) }),
  );
  chest.name = "chest";
  chest.position.set(0, 0.78, 0.22);
  chest.scale.set(1.35, 0.7, 0.55);
  group.add(chest);
  addHumanoidLegs(group);
  addHumanoidArms(group, bodyColor, 0.22);
  return group;
}

/** Darken a 24-bit RGB color by `factor` (0..1). Factor 1 = unchanged. */
function darkenColor(rgb: number, factor: number): number {
  const r = Math.round(((rgb >> 16) & 0xff) * factor);
  const g = Math.round(((rgb >> 8) & 0xff) * factor);
  const b = Math.round((rgb & 0xff) * factor);
  return (r << 16) | (g << 8) | b;
}

function addClothing(group: THREE.Group, clothing: NpcClothing): void {
  if (clothing.shirt) {
    group.add(box("clothing-shirt", [0.42, 0.3, 0.3], new THREE.MeshLambertMaterial({ color: clothing.shirtColor }), [0, 0.75, 0.21]));
  }
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
    box("front-left-leg", [0.1, 0.4, 0.1], darkFur, [-0.15, 0.2, 0.3]),
    box("front-right-leg", [0.1, 0.4, 0.1], darkFur, [0.15, 0.2, 0.3]),
    box("back-left-leg", [0.1, 0.4, 0.1], darkFur, [-0.15, 0.2, -0.3]),
    box("back-right-leg", [0.1, 0.4, 0.1], darkFur, [0.15, 0.2, -0.3]),
    box("tail", [0.1, 0.1, 0.3], darkFur, [0, 0.55, -0.65]),
    box("collar", [0.52, 0.08, 0.08], new THREE.MeshLambertMaterial({ color: 0xcc2222 }), [0, 0.48, 0.22]),
  );
  return group;
}

/** Create a low-poly NPC whose local origin is at floor level. */
export function createNpcMesh(gender: NpcMeshGender, paletteIndex = 0, npcId = String(paletteIndex)): THREE.Group {
  if (gender === "dog") return createDogMesh();

  const normalizedIndex = Math.abs(Math.trunc(paletteIndex));
  const bodyColor = BODY_COLORS[normalizedIndex % BODY_COLORS.length]!;
  const hairColor = HAIR_COLORS[normalizedIndex % HAIR_COLORS.length]!;
  const clothing = clothingForNpc(npcId, gender);
  const group = gender === "female"
    ? createFemaleMesh(bodyColor, hairColor, clothing.shirtColor, npcId)
    : createMaleMesh(bodyColor, hairColor);
  group.userData.clothing = clothing;
  addClothing(group, clothing);
  return group;
}
