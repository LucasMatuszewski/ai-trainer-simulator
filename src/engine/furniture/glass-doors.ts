import * as THREE from "three";

export function makeGlassDoors(): THREE.Group {
  const group = new THREE.Group();
  group.name = "glass-doors";
  const metal = new THREE.MeshLambertMaterial({ color: 0x2c2c34 });
  const chrome = new THREE.MeshLambertMaterial({ color: 0x9aa2ad });
  const glass = new THREE.MeshStandardMaterial({ color: 0xaaccff, transparent: true, opacity: 0.25 });
  const addBox = (parent: THREE.Object3D, name: string, size: [number, number, number], position: [number, number, number], material: THREE.Material): void => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    parent.add(mesh);
  };
  addBox(group, "door-frame-l", [0.1, 2.5, 0.1], [-1.15, 1.25, 0], metal);
  addBox(group, "door-frame-r", [0.1, 2.5, 0.1], [1.15, 1.25, 0], metal);
  addBox(group, "door-frame-t", [2.4, 0.1, 0.1], [0, 2.5, 0], metal);
  addBox(group, "door-sill", [2.4, 0.04, 0.16], [0, 0.02, 0], chrome);
  addBox(group, "door-transom-glass", [2.2, 0.35, 0.03], [0, 2.28, 0], glass);
  addBox(group, "devpowers-transom-logo", [1.6, 0.22, 0.025], [0, 2.3, -0.025], new THREE.MeshLambertMaterial({ color: 0x8a6d1f }));
  ([-1, 1] as const).forEach((side) => {
    const leaf = new THREE.Group();
    leaf.name = side < 0 ? "door-leaf-left" : "door-leaf-right";
    leaf.position.x = side * 0.52;
    leaf.rotation.y = side * -0.18;
    addBox(leaf, "leaf-glass", [1, 2.1, 0.03], [0, 1.08, 0], glass);
    addBox(leaf, "leaf-rail-t", [1, 0.06, 0.05], [0, 2.1, 0], metal);
    addBox(leaf, "leaf-rail-b", [1, 0.1, 0.05], [0, 0.12, 0], metal);
    addBox(leaf, "leaf-stile-outer", [0.06, 2.1, 0.05], [side * 0.47, 1.08, 0], metal);
    addBox(leaf, "leaf-stile-inner", [0.06, 2.1, 0.05], [side * -0.47, 1.08, 0], metal);
    addBox(leaf, "leaf-mullion", [0.04, 2, 0.02], [0, 1.08, 0], metal);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 8), chrome);
    handle.name = "leaf-handle";
    handle.position.set(side * -0.38, 1.15, 0.06);
    leaf.add(handle);
    group.add(leaf);
  });
  return group;
}
