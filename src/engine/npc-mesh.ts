import * as THREE from "three";

export type NpcMeshGender = "male" | "female" | "dog";

const BODY_COLORS = [0x884422, 0x224488, 0x448822, 0x882244, 0x886622];
const HAIR_COLORS = [0x442211, 0xccaa22, 0x222222];
const SKIN_COLOR = 0xffd0a8;
const DARK_CLOTHING = 0x222244;

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
  // pivotAtTop: leg box's TOP is at the hip (y=0.3) so the rotation
  // pivots the hip joint instead of the box's center.
  group.add(
    box("left-leg", [0.18, 0.3, 0.3], legMaterial, [-0.15, 0.3, 0], true),
    box("right-leg", [0.18, 0.3, 0.3], legMaterial, [0.15, 0.3, 0], true),
  );
}

function addHumanoidArms(group: THREE.Group, bodyColor: number, x = 0.38): void {
  const material = new THREE.MeshLambertMaterial({ color: bodyColor });
  // pivotAtTop: arm box's TOP is at the shoulder (y=1.05) so the
  // rotation pivots the shoulder joint instead of the box's center
  // (was rotating the arm around its waist, looking like a flail).
  group.add(
    box("arm-left", [0.14, 0.65, 0.16], material, [-x, 1.05, 0], true),
    box("arm-right", [0.14, 0.65, 0.16], material, [x, 1.05, 0], true),
  );
}

function createMaleMesh(bodyColor: number, hairColor: number): THREE.Group {
  const group = new THREE.Group();
  group.add(
    box("body", [0.6, 1, 0.4], new THREE.MeshLambertMaterial({ color: bodyColor }), [0, 0.5, 0]),
    box("belt", [0.62, 0.08, 0.42], new THREE.MeshLambertMaterial({ color: 0x222222 }), [0, 0.45, 0]),
    box("tie", [0.08, 0.38, 0.02], new THREE.MeshLambertMaterial({ color: 0x992222 }), [0, 0.65, 0.211]),
    createHumanoidHead(hairColor, false),
  );
  addHumanoidLegs(group);
  addHumanoidArms(group, bodyColor);
  return group;
}

function createFemaleMesh(bodyColor: number, hairColor: number): THREE.Group {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: bodyColor });
  group.add(
    box("body", [0.5, 0.85, 0.4], bodyMaterial, [0, 0.575, 0]),
    createHumanoidHead(hairColor, true),
  );
  const breastGeo = new THREE.SphereGeometry(0.13, 12, 10);
  const leftBreast = new THREE.Mesh(breastGeo, bodyMaterial);
  leftBreast.name = "breast";
  leftBreast.position.set(-0.13, 0.84, 0.21);
  leftBreast.scale.set(1, 0.85, 0.7);
  group.add(leftBreast);
  const rightBreast = new THREE.Mesh(breastGeo, bodyMaterial);
  rightBreast.name = "breast";
  rightBreast.position.set(0.13, 0.84, 0.21);
  rightBreast.scale.set(1, 0.85, 0.7);
  group.add(rightBreast);
  addHumanoidLegs(group);
  addHumanoidArms(group, bodyColor, 0.22);
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
export function createNpcMesh(gender: NpcMeshGender, paletteIndex = 0, npcId = String(paletteIndex)): THREE.Group {
  if (gender === "dog") return createDogMesh();

  const normalizedIndex = Math.abs(Math.trunc(paletteIndex));
  const bodyColor = BODY_COLORS[normalizedIndex % BODY_COLORS.length]!;
  const hairColor = HAIR_COLORS[normalizedIndex % HAIR_COLORS.length]!;
  const clothing = clothingForNpc(npcId, gender);
  const group = gender === "female"
    ? createFemaleMesh(bodyColor, hairColor)
    : createMaleMesh(bodyColor, hairColor);
  group.userData.clothing = clothing;
  addClothing(group, clothing);
  return group;
}
