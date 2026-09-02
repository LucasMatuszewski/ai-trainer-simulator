import * as THREE from "three";

function box(name: string, size: readonly [number, number, number], position: readonly [number, number, number], material: THREE.Material): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

/** C-64: a chunky hotel-style counter with receptionist-specific clutter. */
export function makeReceptionDesk(): THREE.Group {
  const group = new THREE.Group();
  group.name = "reception-desk";
  const body = new THREE.MeshLambertMaterial({ color: 0x2c2c34 });
  const stone = new THREE.MeshLambertMaterial({ color: 0xc8c2b6 });
  const trim = new THREE.MeshLambertMaterial({ color: 0x4a3f37 });
  const chrome = new THREE.MeshLambertMaterial({ color: 0x9aa2ad });
  const dark = new THREE.MeshLambertMaterial({ color: 0x1c1c22 });
  const paper = new THREE.MeshLambertMaterial({ color: 0xffffff });

  group.add(
    box("desk-body", [2.6, 0.72, 0.78], [0, 0.42, -0.04], body),
    box("desk-kick", [2.6, 0.08, 0.06], [0, 0.04, 0.34], body),
    box("desk-top", [2.7, 0.05, 0.86], [0, 0.805, 0], stone),
    box("desk-top-edge", [2.7, 0.05, 0.03], [0, 0.805, 0.445], trim),
    box("desk-ledge", [2.4, 0.04, 0.22], [0, 0.88, 0.28], chrome),
    box("desk-modesty", [2.4, 0.5, 0.04], [0, 0.38, 0.36], body),
    box("desk-return", [0.7, 0.72, 1.1], [1.15, 0.42, -0.55], body),
    box("desk-return-top", [0.74, 0.05, 1.14], [1.15, 0.805, -0.55], stone),
    box("desk-monitor-stand", [0.18, 0.02, 0.14], [-0.45, 0.84, -0.15], dark),
    box("desk-monitor-post", [0.04, 0.18, 0.04], [-0.45, 0.94, -0.15], dark),
    box("desk-monitor-bezel", [0.52, 0.34, 0.03], [-0.45, 1.16, -0.22], dark),
    box("desk-monitor-screen", [0.46, 0.28, 0.01], [-0.45, 1.16, -0.238], new THREE.MeshBasicMaterial({ color: 0x22aa77 })),
    box("desk-phone-base", [0.16, 0.04, 0.22], [0.55, 0.85, -0.1], dark),
    box("desk-phone-handset", [0.06, 0.04, 0.18], [0.55, 0.9, -0.1], chrome),
    box("desk-keyboard", [0.36, 0.02, 0.12], [-0.45, 0.84, 0.05], dark),
  );
  for (let i = 0; i < 3; i += 1) {
    const sheet = box("desk-paper", [0.22, 0.01, 0.16], [0.15, 0.84 + i * 0.012, -0.25], paper);
    sheet.rotation.y = i * 0.04;
    group.add(sheet);
  }
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.1, 10), new THREE.MeshLambertMaterial({ color: 0x2244aa }));
  mug.name = "desk-mug";
  mug.position.set(-1.05, 0.87, -0.2);
  group.add(mug);
  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 0.14, 8), new THREE.MeshLambertMaterial({ color: 0x8a4a2a }));
  vase.name = "desk-vase";
  vase.position.set(1.05, 0.9, 0.05);
  group.add(vase);
  const bloomColors = [0xfafafa, 0xe66ea0, 0xf2c200];
  for (let i = 0; i < 3; i += 1) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 6), new THREE.MeshLambertMaterial({ color: 0x2f8f3f }));
    stem.name = "desk-flower-stem";
    stem.position.set(1.02 + i * 0.03, 1.04, 0.04 + (i % 2) * 0.03);
    const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), new THREE.MeshBasicMaterial({ color: bloomColors[i] }));
    bloom.name = "desk-flower-bloom";
    bloom.position.set(stem.position.x, 1.13, stem.position.z);
    group.add(stem, bloom);
  }
  // C-64: the lobby's Polish-software-house joke replaces a mint bowl
  // with obsolete USB dongles, keeping the detail readable as geometry.
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.05, 10), new THREE.MeshLambertMaterial({ color: 0xf2e1bf }));
  bowl.name = "complimentary-dongle-bowl";
  bowl.position.set(0.85, 0.925, 0.28);
  group.add(bowl);
  const dongleColors = [0x1c1c22, 0x2255aa, 0xaa3322, 0x2f8f3f, 0xb8912f];
  dongleColors.forEach((color, index) => {
    const dongle = box("complimentary-dongle", [0.02, 0.012, 0.05], [0.81 + index * 0.02, 0.96 + (index === 4 ? 0.025 : 0), 0.26 + (index % 2) * 0.025], new THREE.MeshLambertMaterial({ color }));
    dongle.rotation.y = -0.5 + index * 0.25;
    if (index === 4) dongle.rotation.x = Math.PI / 2;
    group.add(dongle);
  });
  return group;
}
