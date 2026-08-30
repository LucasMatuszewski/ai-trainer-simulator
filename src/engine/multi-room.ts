import * as THREE from "three";
import type { WorldFurniture, WorldRoom } from "../content/world-layout";

const WALL_HEIGHT = 3;
const DEFAULT_FURNITURE_SIZE: Record<string, readonly [number, number, number]> = {
  chair: [0.7, 0.5, 0.7],
  table: [2, 0.9, 1.4],
  lectern: [1, 1.2, 0.7],
  "coffee-machine": [0.9, 1.5, 0.8],
  fridge: [1.1, 2.1, 1],
  microwave: [1, 0.6, 0.7],
  sink: [1.8, 1, 0.8],
  "projector-screen": [4, 2, 0.12],
  whiteboard: [0.12, 2, 3.5],
  "executive-desk": [3, 1.1, 1.3],
  bookshelf: [0.7, 2.5, 3],
};

const FURNITURE_COLORS: Record<string, number> = {
  chair: 0x25253d,
  table: 0x725034,
  lectern: 0x805a36,
  "coffee-machine": 0xb8b8b8,
  fridge: 0xe2e5e8,
  microwave: 0x33343a,
  sink: 0xb8c4c8,
  "projector-screen": 0xf2f2e8,
  whiteboard: 0xf5f5ed,
  "executive-desk": 0x3f2417,
  bookshelf: 0x5b3824,
};

export function buildMultiRoomMeshes(
  layout: THREE.Scene | THREE.Group,
  worldLayout: readonly WorldRoom[],
): THREE.Group[] {
  return worldLayout.map((room) => {
    const group = new THREE.Group();
    group.name = room.id;
    group.userData.roomId = room.id;

    const width = room.floor.maxX - room.floor.minX;
    const depth = room.floor.maxZ - room.floor.minZ;
    const centerX = (room.floor.minX + room.floor.maxX) / 2;
    const centerZ = (room.floor.minZ + room.floor.maxZ) / 2;
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      new THREE.MeshLambertMaterial({ color: room.floorColor }),
    );
    floor.name = `${room.id}-floor`;
    floor.userData.kind = "floor";
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(centerX, 0.001, centerZ);
    group.add(floor);

    for (const wall of room.walls) {
      const isGlass = wall.id === "glass";
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(wall.maxX - wall.minX, WALL_HEIGHT, wall.maxZ - wall.minZ),
        isGlass
          ? new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.25, color: 0xaaccff })
          : new THREE.MeshLambertMaterial({ color: 0xc4a87a }),
      );
      mesh.name = `${room.id}-wall-${wall.id}`;
      mesh.userData.kind = isGlass ? "glass" : "wall";
      mesh.position.set((wall.minX + wall.maxX) / 2, WALL_HEIGHT / 2, (wall.minZ + wall.maxZ) / 2);
      group.add(mesh);
    }

    for (const item of room.furniture) group.add(makeFurniture(item));
    for (const sign of room.signs) {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#171717";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = `#${sign.color.toString(16).padStart(6, "0")}`;
        context.lineWidth = 18;
        context.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);
        context.fillStyle = `#${sign.color.toString(16).padStart(6, "0")}`;
        context.font = `bold ${sign.text === "BATMAN" ? 104 : 54}px monospace`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(sign.text, canvas.width / 2, canvas.height / 2);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(sign.size?.[0] ?? 3.5, sign.size?.[1] ?? 1.4),
        new THREE.MeshBasicMaterial({ map: texture, transparent: false }),
      );
      signMesh.name = `${room.id}-sign`;
      signMesh.userData.kind = "sign";
      signMesh.position.set(...sign.position);
      signMesh.rotation.y = sign.face;
      group.add(signMesh);
    }

    layout.add(group);
    return group;
  });
}

function makeFurniture(item: WorldFurniture): THREE.Mesh {
  const size = item.size ?? DEFAULT_FURNITURE_SIZE[item.type] ?? [1, 1, 1];
  const material = new THREE.MeshLambertMaterial({
    color: item.color ?? FURNITURE_COLORS[item.type] ?? 0x777777,
  });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = `furniture-${item.type}`;
  mesh.userData.kind = "furniture";
  mesh.userData.furnitureType = item.type;
  mesh.position.set(...item.position);
  return mesh;
}
