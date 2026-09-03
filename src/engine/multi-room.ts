import * as THREE from "three";
import type { WorldFurniture, WorldRoom } from "../content/world-layout";
import { drawBatmanEmblem } from "./furniture/batman-emblem";
import { makeBin } from "./furniture/bin";
import { makeBookshelf } from "./furniture/bookshelf";
import { makeBrandWall } from "./furniture/brand-wall";
import { makeCeilingLight } from "./furniture/ceiling-light";
import { makeCoffeeGrinder } from "./furniture/coffee-grinder";
import { makeCoffeeMachineKitchen } from "./furniture/coffee-machine";
import { makeCoffeeTable } from "./furniture/coffee-table";
import { makeDishRack } from "./furniture/dish-rack";
import { makeDishwasher } from "./furniture/dishwasher";
import { makeExecutiveChair } from "./furniture/executive-chair";
import { makeExecutiveDesk } from "./furniture/executive-desk";
import { makeFireExtinguisherKitchen } from "./furniture/fire-extinguisher";
import { makeFridge } from "./furniture/fridge";
import { makeKettle } from "./furniture/kettle";
import { makeKitchenCounter } from "./furniture/kitchen-counter";
import { makeKitchenTable, makeKitchenChair } from "./furniture/menu-board";
import { makeMicrowave } from "./furniture/microwave";
import { makePlantCounter } from "./furniture/plant-counter";
import { makeSink } from "./furniture/sink";
import { makeSoapDispenser } from "./furniture/soap-dispenser";
import { makeSofa } from "./furniture/sofa";
import { makeToiletStall } from "./furniture/toilet-stall";
import { makeToiletSink } from "./furniture/toilet-sink";
import { makeUrinal } from "./furniture/urinal";
import { makeReceptionDesk } from "./furniture/reception-desk";
import { makePlantWall } from "./furniture/plant-wall";
import { makeDeskLedBar } from "./furniture/desk-lights";
import { makeReceptionSofa } from "./furniture/reception-sofa";
import { makeReceptionCoffeeTable } from "./furniture/reception-coffee-table";
import { makeLobbyPlanter } from "./furniture/lobby-planter";
import { makeGlassDoors } from "./furniture/glass-doors";
import { makeXeroxPrinter } from "./furniture/xerox-printer";

/**
 * Furniture types rendered by dedicated 3D-model factories
 * (C-43: one .ts per object under src/engine/furniture/).
 * Anything not listed here falls back to the simple box.
 */
const FURNITURE_FACTORIES: Record<string, () => THREE.Group> = {
  // Reception credits (AC-BRAND-02): painted caption + standoff SVG logos.
  "brand-wall": makeBrandWall,
  "executive-desk": makeExecutiveDesk,
  "executive-chair": makeExecutiveChair,
  bookshelf: makeBookshelf,
  sofa: makeSofa,
  "coffee-table": makeCoffeeTable,
  // Kitchen (C-36)
  "kitchen-counter": makeKitchenCounter,
  fridge: makeFridge,
  microwave: makeMicrowave,
  sink: makeSink,
  kettle: makeKettle,
  dishwasher: makeDishwasher,
  bin: makeBin,
  "coffee-grinder": makeCoffeeGrinder,
  "dish-rack": makeDishRack,
  "soap-dispenser": makeSoapDispenser,
  "plant-counter": makePlantCounter,
  "fire-extinguisher-kitchen": makeFireExtinguisherKitchen,
  "coffee-machine-kitchen": makeCoffeeMachineKitchen,
  "kitchen-table": makeKitchenTable,
  "kitchen-chair": makeKitchenChair,
  // Toilet (C-57)
  "toilet-stall": makeToiletStall,
  "toilet-sink": makeToiletSink,
  urinal: makeUrinal,
  // Reception (C-64)
  "reception-desk": makeReceptionDesk,
  "plant-wall": makePlantWall,
  "desk-led-bar": makeDeskLedBar,
  "reception-sofa": makeReceptionSofa,
  "reception-coffee-table": makeReceptionCoffeeTable,
  "lobby-planter": makeLobbyPlanter,
  "glass-doors": makeGlassDoors,
  "xerox-printer": makeXeroxPrinter,
};

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
      const wallColor = wall.accentColor ?? room.wallColor;
      const wallTexture = isGlass ? undefined : makeWallTexture(wallColor, Math.max(wallWidth, wallDepth));
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

    // Ceiling lights (C-44 #7): when the room declares explicit
    // lightPositions, each entry gets a visible fixture hanging
    // just below the ceiling plus its own PointLight. Otherwise
    // the single invisible center light (the old behavior).
    const lightTargets: readonly (readonly [number, number])[] =
      room.lightPositions ?? [[centerX, centerZ]];
    for (const [lightX, lightZ] of lightTargets) {
      if (room.lightPositions !== undefined) {
        const fixture = makeCeilingLight();
        fixture.name = `${room.id}-ceiling-light`;
        fixture.position.set(lightX, WALL_HEIGHT - 0.12, lightZ);
        group.add(fixture);
      }
      const light = new THREE.PointLight(0xfff4cc, 0.6, 8);
      light.name = `${room.id}-light`;
      light.position.set(lightX, WALL_HEIGHT - 0.35, lightZ);
      group.add(light);
    }
    for (const sign of room.signs) {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      if (context) {
        if (sign.text === "BATMAN") {
          drawBatmanEmblem(context, canvas.width, canvas.height);
        } else {
          drawPoster(context, canvas.width, canvas.height, sign.text, sign.color);
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

    layout.add(group);
    return group;
  });
}

/**
 * Draw a wall sign / poster (L-2026-08-31 #48: the old renderer
 * drew one saturated-color line that overflowed the canvas).
 *
 * Style: a muted, gallery-like poster - deep desaturated
 * background tinted by the sign color, a thin double frame in
 * warm ivory, and the text word-wrapped, auto-fitted and set in
 * the same ivory rather than the loud accent color.
 */
export function drawPoster(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string,
  accentColor: number,
  fontSize: number = 46
): void {
  // Deep charcoal tinted ~15% toward the accent color.
  const accent = new THREE.Color(accentColor);
  const background = new THREE.Color(0x1c1a18).lerp(accent, 0.15);
  context.fillStyle = `#${background.getHexString()}`;
  context.fillRect(0, 0, width, height);

  // Subtle inner vignette so the poster reads as printed paper.
  const vignette = context.createLinearGradient(0, 0, 0, height);
  vignette.addColorStop(0, "rgba(255,255,255,0.05)");
  vignette.addColorStop(1, "rgba(0,0,0,0.18)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);

  // Thin double frame in warm ivory.
  const ivory = "#d8d2c0";
  context.strokeStyle = ivory;
  context.lineWidth = 5;
  context.strokeRect(16, 16, width - 32, height - 32);
  context.lineWidth = 2;
  context.strokeRect(26, 26, width - 52, height - 52);

  // Word-wrap with auto-fit: shrink the font until the text
  // fits in at most 3 lines inside the frame.
  const maxWidth = width - 100;
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  let lines: string[] = [];
  for (; fontSize >= 22; fontSize -= 4) {
    context.font = `bold ${fontSize}px monospace`;
    lines = [];
    let current = "";
    for (const word of words) {
      const candidate = current === "" ? word : `${current} ${word}`;
      if (context.measureText(candidate).width <= maxWidth || current === "") {
        current = candidate;
      } else {
        lines.push(current);
        current = word;
      }
    }
    if (current !== "") lines.push(current);
    if (lines.length <= 3) break;
  }

  context.fillStyle = ivory;
  context.textAlign = "center";
  context.textBaseline = "middle";
  const lineHeight = fontSize * 1.25;
  const totalHeight = lines.length * lineHeight;
  const startY = height / 2 - totalHeight / 2 + lineHeight / 2;
  lines.forEach((line, index) => {
    context.fillText(line, width / 2, startY + index * lineHeight, maxWidth);
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

function makeFurniture(item: WorldFurniture): THREE.Object3D {
  // Detailed 3D-model-library objects (C-43) win over the box.
  const factory = FURNITURE_FACTORIES[item.type];
  if (factory !== undefined) {
    const group = factory();
    group.name = `furniture-${item.type}`;
    group.userData.kind = "furniture";
    group.userData.furnitureType = item.type;
    group.position.set(...item.position);
    group.rotation.y = item.rotationY ?? 0;
    group.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    return group;
  }

  const size = item.size ?? DEFAULT_FURNITURE_SIZE[item.type] ?? [1, 1, 1];
  const material = new THREE.MeshLambertMaterial({
    color: item.color ?? FURNITURE_COLORS[item.type] ?? 0x777777,
  });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = `furniture-${item.type}`;
  mesh.userData.kind = "furniture";
  mesh.userData.furnitureType = item.type;
  mesh.position.set(...item.position);
  mesh.rotation.y = item.rotationY ?? 0;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
