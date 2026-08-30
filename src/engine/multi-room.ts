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
    floor.receiveShadow = true;
    group.add(floor);

    const ceilingColor = new THREE.Color(room.wallColor).multiplyScalar(0.72);
    const ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.1, depth),
      new THREE.MeshLambertMaterial({ color: ceilingColor }),
    );
    ceiling.name = `${room.id}-ceiling`;
    ceiling.userData.kind = "ceiling";
    ceiling.position.set(centerX, WALL_HEIGHT, centerZ);
    ceiling.receiveShadow = true;
    group.add(ceiling);

    for (const wall of room.walls) {
      const isGlass = wall.id === "glass";
      const wallWidth = wall.maxX - wall.minX;
      const wallDepth = wall.maxZ - wall.minZ;
      const wallTexture = isGlass ? undefined : makeWallTexture(room.wallColor, Math.max(wallWidth, wallDepth));
      const wallMaterial = isGlass
        ? new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.25, color: 0xaaccff })
        : new THREE.MeshLambertMaterial({
            map: wallTexture,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
          });
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(wallWidth, WALL_HEIGHT, wallDepth),
        wallMaterial,
      );
      mesh.name = `${room.id}-wall-${wall.id}`;
      mesh.userData.kind = isGlass ? "glass" : "wall";
      mesh.position.set((wall.minX + wall.maxX) / 2, WALL_HEIGHT / 2, (wall.minZ + wall.maxZ) / 2);
      mesh.castShadow = !isGlass;
      mesh.receiveShadow = true;
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
        if (sign.text === "BATMAN") {
          drawBatmanEmblem(context, canvas.width, canvas.height);
        } else {
          context.strokeStyle = `#${sign.color.toString(16).padStart(6, "0")}`;
          context.lineWidth = 18;
          context.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);
          context.fillStyle = `#${sign.color.toString(16).padStart(6, "0")}`;
          context.font = "bold 54px monospace";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(sign.text, canvas.width / 2, canvas.height / 2);
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(sign.size?.[0] ?? 3.5, sign.size?.[1] ?? 1.4),
        new THREE.MeshBasicMaterial({ map: texture, transparent: false }),
      );
      signMesh.name = `${room.id}-sign`;
      signMesh.userData.kind = "sign";
      signMesh.userData.signType = sign.text === "BATMAN" ? "batman" : "room-label";
      signMesh.position.set(...sign.position);
      signMesh.rotation.y = sign.face;
      group.add(signMesh);
    }

    const light = new THREE.PointLight(0xfff4cc, 0.6, 8);
    light.name = `${room.id}-light`;
    light.position.set(centerX, WALL_HEIGHT - 0.35, centerZ);
    group.add(light);

    layout.add(group);
    return group;
  });
}

export function makeWallTexture(color: number, wallLength: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(Math.max(1, wallLength / 2), WALL_HEIGHT / 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
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
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function drawBatmanEmblem(context: CanvasRenderingContext2D, width: number, height: number): void {
  context.fillStyle = "#080808";
  context.fillRect(0, 0, width, height);
  if (
    typeof context.beginPath !== "function" ||
    typeof context.ellipse !== "function" ||
    typeof context.fill !== "function"
  ) return;
  context.fillStyle = "#ffdd22";
  context.beginPath();
  context.ellipse(width / 2, height / 2, width * 0.42, height * 0.35, 0, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#080808";
  context.beginPath();
  context.moveTo(width * 0.18, height * 0.5);
  context.lineTo(width * 0.3, height * 0.39);
  context.lineTo(width * 0.38, height * 0.27);
  context.lineTo(width * 0.44, height * 0.4);
  context.lineTo(width * 0.5, height * 0.25);
  context.lineTo(width * 0.56, height * 0.4);
  context.lineTo(width * 0.62, height * 0.27);
  context.lineTo(width * 0.7, height * 0.39);
  context.lineTo(width * 0.82, height * 0.5);
  context.lineTo(width * 0.68, height * 0.55);
  context.lineTo(width * 0.6, height * 0.72);
  context.lineTo(width * 0.5, height * 0.61);
  context.lineTo(width * 0.4, height * 0.72);
  context.lineTo(width * 0.32, height * 0.55);
  context.closePath();
  context.fill();
}
