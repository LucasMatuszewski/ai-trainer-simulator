import * as THREE from "three";

export type NpcMeshGender = "male" | "female" | "dog";

const BODY_COLORS = [0x884422, 0x224488, 0x448822, 0x882244, 0x886622];
const HAIR_COLORS = [0x442211, 0xccaa22, 0x222222];
const SKIN_COLOR = 0xffd0a8;
const DARK_CLOTHING = 0x222244;

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

function addHumanoidFace(group: THREE.Group): void {
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  group.add(
    box("left-eye", [0.06, 0.06, 0.01], eyeMaterial, [-0.1, 1.3, 0.255]),
    box("right-eye", [0.06, 0.06, 0.01], eyeMaterial, [0.1, 1.3, 0.255]),
  );
}

function addHumanoidLegs(group: THREE.Group): void {
  const legMaterial = new THREE.MeshLambertMaterial({ color: DARK_CLOTHING });
  group.add(
    box("left-leg", [0.18, 0.3, 0.3], legMaterial, [-0.15, 0.15, 0]),
    box("right-leg", [0.18, 0.3, 0.3], legMaterial, [0.15, 0.15, 0]),
  );
}

function createMaleMesh(bodyColor: number, hairColor: number): THREE.Group {
  const group = new THREE.Group();
  group.add(
    box("body", [0.6, 1, 0.4], new THREE.MeshLambertMaterial({ color: bodyColor }), [0, 0.5, 0]),
    box("belt", [0.62, 0.08, 0.42], new THREE.MeshLambertMaterial({ color: 0x222222 }), [0, 0.45, 0]),
    box("head", [0.5, 0.5, 0.5], new THREE.MeshLambertMaterial({ color: SKIN_COLOR }), [0, 1.25, 0]),
    box("hair", [0.52, 0.18, 0.52], new THREE.MeshLambertMaterial({ color: hairColor }), [0, 1.55, 0]),
    box("tie", [0.08, 0.38, 0.02], new THREE.MeshLambertMaterial({ color: 0x992222 }), [0, 0.78, 0.211]),
  );
  addHumanoidFace(group);
  addHumanoidLegs(group);
  return group;
}

function createFemaleMesh(bodyColor: number, hairColor: number): THREE.Group {
  const group = new THREE.Group();
  group.add(
    box("body", [0.45, 0.85, 0.4], new THREE.MeshLambertMaterial({ color: bodyColor }), [0, 0.575, 0]),
    box("head", [0.5, 0.5, 0.5], new THREE.MeshLambertMaterial({ color: SKIN_COLOR }), [0, 1.25, 0]),
    box("hair-top", [0.54, 0.2, 0.54], new THREE.MeshLambertMaterial({ color: hairColor }), [0, 1.55, 0]),
    box("hair-back", [0.56, 0.7, 0.18], new THREE.MeshLambertMaterial({ color: hairColor }), [0, 1.25, -0.22]),
  );
  const skirt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.27, 0.5, 4),
    new THREE.MeshLambertMaterial({ color: bodyColor }),
  );
  skirt.name = "skirt";
  skirt.position.y = 0.45;
  skirt.rotation.y = Math.PI / 4;
  group.add(skirt);
  addHumanoidFace(group);
  addHumanoidLegs(group);
  return group;
}

function createDogMesh(): THREE.Group {
  const group = new THREE.Group();
  const fur = new THREE.MeshLambertMaterial({ color: 0xc4a060 });
  const darkFur = new THREE.MeshLambertMaterial({ color: 0x9b7440 });
  group.add(
    box("body", [1, 0.5, 0.4], fur, [0, 0.4, 0]),
    box("head", [0.5, 0.4, 0.4], fur, [0, 0.55, 0.4]),
    box("snout", [0.2, 0.2, 0.25], darkFur, [0, 0.45, 0.7]),
    box("left-ear", [0.1, 0.2, 0.05], darkFur, [-0.15, 0.75, 0.32]),
    box("right-ear", [0.1, 0.2, 0.05], darkFur, [0.15, 0.75, 0.32]),
    box("left-eye", [0.05, 0.05, 0.01], new THREE.MeshBasicMaterial({ color: 0x000000 }), [-0.13, 0.6, 0.605]),
    box("right-eye", [0.05, 0.05, 0.01], new THREE.MeshBasicMaterial({ color: 0x000000 }), [0.13, 0.6, 0.605]),
    box("front-left-leg", [0.1, 0.4, 0.1], darkFur, [-0.35, 0.2, 0.13]),
    box("front-right-leg", [0.1, 0.4, 0.1], darkFur, [0.35, 0.2, 0.13]),
    box("back-left-leg", [0.1, 0.4, 0.1], darkFur, [-0.35, 0.2, -0.13]),
    box("back-right-leg", [0.1, 0.4, 0.1], darkFur, [0.35, 0.2, -0.13]),
    box("tail", [0.1, 0.1, 0.3], darkFur, [0, 0.55, -0.35]),
    box("collar", [0.52, 0.08, 0.08], new THREE.MeshLambertMaterial({ color: 0xcc2222 }), [0, 0.48, 0.22]),
  );
  return group;
}

/** Create a low-poly NPC whose local origin is at floor level. */
export function createNpcMesh(gender: NpcMeshGender, paletteIndex = 0): THREE.Group {
  if (gender === "dog") return createDogMesh();

  const normalizedIndex = Math.abs(Math.trunc(paletteIndex));
  const bodyColor = BODY_COLORS[normalizedIndex % BODY_COLORS.length]!;
  const hairColor = HAIR_COLORS[normalizedIndex % HAIR_COLORS.length]!;
  return gender === "female"
    ? createFemaleMesh(bodyColor, hairColor)
    : createMaleMesh(bodyColor, hairColor);
}
