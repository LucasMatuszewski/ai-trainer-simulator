/**
 * Build the office scene: floor, walls, furniture, NPC markers, decorations.
 *
 * Visual style: retro 90s IT office. Lots of saturated color, chunky blocks,
 * visible detail. All geometry is procedural (BoxGeometry, CylinderGeometry,
 * PlaneGeometry). No external 3D models. Materials are MeshLambertMaterial
 * for cheap, flat pixel-art lighting.
 *
 * Lighting hits everything from above-front with a warm key + cool fill so
 * colors stay saturated (no white washout).
 *
 * Some elements carry userData.update(dt) so the engine main loop can call
 * them and animate: blinking server LEDs, scrolling marquees, clock hands.
 */

import * as THREE from "three";
import type { Period } from "../content/npc-schedule";
import { NPCS, OBSTACLES, OFFICE_BOUNDS } from "../content/npcs";
import { createNpcController } from "./npc-controller";
import { createNpcMesh } from "./npc-mesh";
import type { NPC, NpcId } from "../types";

const COLORS = {
  // Surfaces
  floorTileA: 0x8c6b4a, // warm wood A
  floorTileB: 0x6b4f33, // warm wood B
  wall: 0xc4a87a, // cream wallpaper
  wallAccent: 0x6b4f33, // dark baseboard
  ceiling: 0xf2e1bf, // bright cream
  ceilingTrim: 0x6b4f33,

  // Desks / furniture
  desk: 0x5d4530,
  deskTop: 0x8b6a47,
  deskTrim: 0x3d2415,
  chair: 0x222244, // navy office chair
  chairAccent: 0x4a4a4a,

  // Electronics
  monitorBezel: 0x1a1a1a,
  monitorScreen1: 0x00ff7f, // green CRT
  monitorScreen2: 0x33aaff, // blue Windows-ish
  monitorScreen3: 0xff77ff, // magenta debug
  monitorScreen4: 0xffaa00, // amber
  keyboard: 0x202020,
  keyboardKey: 0xcccccc,
  mouse: 0x202020,
  serverRack: 0x1a1a1a,
  serverLightOn: 0x00ff7f,
  serverLightOff: 0x331100,

  // Decor
  plantPot: 0x884422,
  plantLeaf: 0x33aa33,
  plantLeafDark: 0x226622,
  fireExtinguisher: 0xcc2222,
  fireExtinguisherTop: 0x111111,
  coffeeMachine: 0xbbbbbb,
  coffeeAccent: 0xaa3333,
  coffeeCup: 0xeeeeee,
  vending: 0x335577,
  vendingScreen: 0xffaa00,
  vendingCans: 0xff4444,
  poster1: 0xee2244,
  poster2: 0x22aacc,
  poster3: 0x44cc44,
  poster4: 0xffcc00,
  clock: 0xffffff,
  clockHand: 0x111111,
  whiteboard: 0xeeeeee,
  whiteboardFrame: 0x885533,
  whiteboardText: 0x1144aa,
  lampShade: 0xffcc66,
  lampPole: 0x333333,
  fileCabinet: 0x777788,
  fileCabinetHandle: 0x333333,
  bookRed: 0xcc3333,
  bookBlue: 0x3355aa,
  bookGreen: 0x33aa55,
  paper: 0xffffff,
  mug: 0x2244aa,

  // NPC characters (more saturated)
  npcBody1: 0x884422,
  npcBody2: 0x224488,
  npcBody3: 0x448822,
  npcBody4: 0x882244,
  npcBody5: 0x886622,
  npcHead: 0xffd0a8,
  npcHair1: 0x442211,
  npcHair2: 0xccaa22,
  npcHair3: 0x222222,
};

const SCREEN_COLORS = [
  COLORS.monitorScreen1,
  COLORS.monitorScreen2,
  COLORS.monitorScreen3,
  COLORS.monitorScreen4,
];

export interface SceneObjects {
  npcMeshes: Map<string, THREE.Mesh>;
  npcObjects: Record<NpcId, THREE.Object3D>;
  interactableMeshes: Map<string, THREE.Mesh>;
  playerStart: THREE.Vector3;
  updatables: Array<(dt: number) => void>;
}

export function buildOfficeScene(
  scene: THREE.Scene,
  getCurrentPeriod: () => Period = () => "morning",
): SceneObjects {
  const updatables: Array<(dt: number) => void> = [];

  // ---- Floor: 18x18 checkered wood pattern, drawn as a single repeating
  // canvas texture so the scene reads as 90s office carpet/wood at a glance.
  const floorTex = makeCheckerTexture(
    COLORS.floorTileA,
    COLORS.floorTileB,
    16,
  );
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(9, 9); // 9 tiles per side = ~1m per tile
  const floorWidth = OFFICE_BOUNDS.maxX - OFFICE_BOUNDS.minX;
  const floorDepth = OFFICE_BOUNDS.maxZ - OFFICE_BOUNDS.minZ;
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(floorWidth, 0.2, floorDepth),
    new THREE.MeshLambertMaterial({ map: floorTex }),
  );
  floor.position.set(0, -0.1, 0);
  scene.add(floor);

  // Skirting board (warm dark band where wall meets floor) for visual interest.
  const skirting = new THREE.MeshLambertMaterial({ color: COLORS.wallAccent });
  addBox(scene, skirting, 0, 0.05, OFFICE_BOUNDS.minZ + 0.05, floorWidth, 0.1, 0.1);
  addBox(scene, skirting, 0, 0.05, OFFICE_BOUNDS.maxZ - 0.05, floorWidth, 0.1, 0.1);
  addBox(scene, skirting, OFFICE_BOUNDS.minX + 0.05, 0.05, 0, 0.1, 0.1, floorDepth);
  addBox(scene, skirting, OFFICE_BOUNDS.maxX - 0.05, 0.05, 0, 0.1, 0.1, floorDepth);

  // ---- Walls (4) with vertical wallpaper stripes via canvas texture.
  const wallpaperTex = makeWallpaperTexture();
  wallpaperTex.wrapS = wallpaperTex.wrapT = THREE.RepeatWrapping;
  wallpaperTex.repeat.set(12, 4);
  const wallMat = new THREE.MeshLambertMaterial({ map: wallpaperTex });
  const wallHeight = 3;
  const wallThickness = 0.3;
  addBox(scene, wallMat, 0, wallHeight / 2, OFFICE_BOUNDS.minZ, floorWidth, wallHeight, wallThickness);
  addBox(scene, wallMat, 0, wallHeight / 2, OFFICE_BOUNDS.maxZ, floorWidth, wallHeight, wallThickness);
  addBox(scene, wallMat, OFFICE_BOUNDS.maxX, wallHeight / 2, 0, wallThickness, wallHeight, floorDepth);
  addBox(scene, wallMat, OFFICE_BOUNDS.minX, wallHeight / 2, 0, wallThickness, wallHeight, floorDepth);

  // ---- Ceiling with bright cream + dark wood trim around the edge.
  const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(floorWidth, 0.2, floorDepth),
    new THREE.MeshLambertMaterial({ color: COLORS.ceiling }),
  );
  ceiling.position.set(0, wallHeight + 0.1, 0);
  scene.add(ceiling);
  const trimMat = new THREE.MeshLambertMaterial({ color: COLORS.ceilingTrim });
  addBox(scene, trimMat, 0, wallHeight - 0.1, OFFICE_BOUNDS.minZ + 0.15, floorWidth, 0.1, 0.1);
  addBox(scene, trimMat, 0, wallHeight - 0.1, OFFICE_BOUNDS.maxZ - 0.15, floorWidth, 0.1, 0.1);
  addBox(scene, trimMat, OFFICE_BOUNDS.maxX - 0.15, wallHeight - 0.1, 0, 0.1, 0.1, floorDepth);
  addBox(scene, trimMat, OFFICE_BOUNDS.minX + 0.15, wallHeight - 0.1, 0, 0.1, 0.1, floorDepth);

  // ---- Ceiling lamp: warm yellow disc, contributes to the warm/cool contrast.
  const lampMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.1, 8),
    new THREE.MeshBasicMaterial({ color: 0xffee99 }),
  );
  lampMesh.position.set(0, wallHeight - 0.05, 0);
  scene.add(lampMesh);
  addBox(scene, new THREE.MeshLambertMaterial({ color: 0x222222 }), 0, wallHeight + 0.05, 0, 0.1, 0.1, 0.1);

  // ---- Wall decor: posters, clock, whiteboard.
  // 4 colorful posters around the room. Each is a thin plane on the wall with
  // a solid color block + a thick border for the "abstract art" look.
  addPoster(scene, -4.5, 1.8, OFFICE_BOUNDS.minZ + 0.16, 0, COLORS.poster1, "abstract");
  addPoster(scene, 4.5, 1.8, OFFICE_BOUNDS.minZ + 0.16, 0, COLORS.poster2, "circle");
  addPoster(scene, OFFICE_BOUNDS.maxX - 0.16, 1.8, -4.5, -Math.PI / 2, COLORS.poster3, "stripes");
  addPoster(scene, OFFICE_BOUNDS.maxX - 0.16, 1.8, 4.5, -Math.PI / 2, COLORS.poster4, "grid");

  // Big wall clock (north wall, centered above door area)
  addWallClock(scene, 6.5, 2.3, OFFICE_BOUNDS.minZ + 0.16, 0);

  // Whiteboard on west wall
  addWhiteboard(scene, OFFICE_BOUNDS.minX + 0.16, 1.5, -5, Math.PI / 2);

  // Big motivational sign on south wall
  addMotivationalSign(scene, 0, 2, OFFICE_BOUNDS.maxZ - 0.16, Math.PI);

  // ---- Window on east wall: a blue rectangle with a "sky" gradient.
  addWindow(scene, OFFICE_BOUNDS.maxX - 0.16, 1.6, 0, -Math.PI / 2);

  // ---- Furniture (per OBSTACLES)
  for (const obs of OBSTACLES) {
    const w = obs.maxX - obs.minX;
    const d = obs.maxZ - obs.minZ;
    const cx = (obs.maxX + obs.minX) / 2;
    const cz = (obs.maxZ + obs.minZ) / 2;
    const screenColor: number = SCREEN_COLORS[Math.abs(hashId(obs.id)) % SCREEN_COLORS.length]!;

    if (obs.id.startsWith("desk-")) {
      scene.add(makeDesk(cx, cz, w, d, screenColor));
    } else if (obs.id === "meeting-table") {
      scene.add(makeMeetingTable(cx, cz, w, d));
    } else if (obs.id === "server-rack") {
      const r = makeServerRack(cx, cz, w, d);
      scene.add(r.mesh);
      updatables.push(r.update);
    } else if (obs.id === "coffee-machine") {
      scene.add(makeCoffeeMachine(cx, cz, w, d));
    } else if (obs.id === "vending") {
      const r = makeVendingMachine(cx, cz, w, d);
      scene.add(r.mesh);
      updatables.push(r.update);
    }
  }

  // ---- Decoration: potted plant in the corner.
  scene.add(makePlant(-8, -8));
  scene.add(makePlant(8, 7.5));

  // Fire extinguisher near the kitchen
  scene.add(makeFireExtinguisher(7.5, -6));

  // Filing cabinet next to a desk
  scene.add(makeFileCabinet(7, -5));
  scene.add(makeFileCabinet(7, 2));

  // Tall floor lamp in a corner for warm light
  scene.add(makeFloorLamp(-8, 6));

  // ---- NPC markers (chunky characters with bodies, heads, hair, eyes).
  const npcMeshes = new Map<string, THREE.Mesh>();
  const npcObjects = {} as Record<NpcId, THREE.Object3D>;
  NPCS.forEach((npc, i) => {
    const m = makeNpcMarker(npc, i);
    scene.add(m);
    npcMeshes.set(npc.id, m as unknown as THREE.Mesh);
    npcObjects[npc.id] = m;
  });

  const npcController = createNpcController(NPCS, npcObjects, getCurrentPeriod);
  updatables.push(npcController.update);

  return {
    npcMeshes,
    npcObjects,
    interactableMeshes: new Map(),
    playerStart: new THREE.Vector3(0, 0.5, 6),
    updatables,
  };
}

// -------- Procedural textures --------

function makeCheckerTexture(colorA: number, colorB: number, tileSize: number): THREE.Texture {
  // tileSize in pixels per tile. 2x2 checker at this resolution. Repeat is
  // applied at the mesh level.
  const c = document.createElement("canvas");
  c.width = c.height = tileSize * 2;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#" + colorA.toString(16).padStart(6, "0");
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#" + colorB.toString(16).padStart(6, "0");
  ctx.fillRect(0, 0, tileSize, tileSize);
  ctx.fillRect(tileSize, tileSize, tileSize, tileSize);
  // A bit of noise / grain to break up the flatness
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const s = Math.random() * 1.5 + 0.5;
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
    ctx.fillRect(x, y, s, s);
  }
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  return t;
}

function makeWallpaperTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  // Base cream
  ctx.fillStyle = "#" + COLORS.wall.toString(16).padStart(6, "0");
  ctx.fillRect(0, 0, 64, 64);
  // Vertical cream-on-cream stripes
  ctx.fillStyle = "rgba(107, 79, 51, 0.18)";
  for (let x = 0; x < 64; x += 8) {
    ctx.fillRect(x, 0, 2, 64);
  }
  // Subtle flowers
  ctx.fillStyle = "rgba(180, 100, 60, 0.25)";
  for (let y = 12; y < 64; y += 24) {
    for (let x = 12; x < 64; x += 24) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  return t;
}

// -------- Wall decor --------

function addPoster(
  scene: THREE.Scene,
  x: number,
  y: number,
  z: number,
  rotY: number,
  baseColor: number,
  pattern: "abstract" | "circle" | "stripes" | "grid",
): void {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#" + baseColor.toString(16).padStart(6, "0");
  ctx.fillRect(0, 0, 128, 128);
  // Dark border
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 12;
  ctx.strokeRect(0, 0, 128, 128);
  if (pattern === "abstract") {
    ctx.fillStyle = "#ffee00";
    ctx.fillRect(20, 80, 88, 16);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(40, 40, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(90, 60, 10, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === "circle") {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(64, 64, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(64, 64, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === "stripes") {
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(0, 16 + i * 20, 128, 6);
    }
  } else {
    // grid
    ctx.fillStyle = "#ffffff";
    for (let x = 0; x < 128; x += 16) {
      for (let y = 0; y < 128; y += 16) {
        if ((x / 16 + y / 16) % 2 === 0) {
          ctx.fillRect(x + 2, y + 2, 12, 12);
        }
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 1.2),
    new THREE.MeshLambertMaterial({ map: tex }),
  );
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  scene.add(m);
}

function addWallClock(scene: THREE.Scene, x: number, y: number, z: number, rotY: number): THREE.Group {
  const group = new THREE.Group();
  const face = new THREE.Mesh(
    new THREE.CircleGeometry(0.4, 16),
    new THREE.MeshBasicMaterial({ color: COLORS.clock }),
  );
  face.position.set(0, 0, 0);
  group.add(face);
  const rim = new THREE.Mesh(
    new THREE.RingGeometry(0.4, 0.5, 16),
    new THREE.MeshBasicMaterial({ color: 0x222222 }),
  );
  rim.position.set(0, 0, 0.001);
  group.add(rim);
  // Hour ticks
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const tick = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.06, 0.01),
      new THREE.MeshBasicMaterial({ color: 0x222222 }),
    );
    tick.position.set(Math.sin(a) * 0.32, Math.cos(a) * 0.32, 0.005);
    group.add(tick);
  }
  // Hour and minute hands (we don't animate — but the minute hand points to "1:00"
  // and the hour hand a bit further so the clock reads as alive).
  const hour = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.2, 0.01),
    new THREE.MeshBasicMaterial({ color: 0x111111 }),
  );
  hour.position.set(0, 0.05, 0.01);
  group.add(hour);
  const minute = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.32, 0.01),
    new THREE.MeshBasicMaterial({ color: 0x111111 }),
  );
  minute.position.set(0, 0.08, 0.015);
  minute.rotation.z = -Math.PI / 4;
  group.add(minute);
  const dot = new THREE.Mesh(
    new THREE.CircleGeometry(0.04, 8),
    new THREE.MeshBasicMaterial({ color: 0xaa0000 }),
  );
  dot.position.set(0, 0, 0.02);
  group.add(dot);
  group.position.set(x, y, z);
  group.rotation.y = rotY;
  scene.add(group);
  return group;
}

function addWhiteboard(scene: THREE.Scene, x: number, y: number, z: number, rotY: number): void {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#" + COLORS.whiteboard.toString(16).padStart(6, "0");
  ctx.fillRect(0, 0, 256, 128);
  // "Mystery solved" scribble
  ctx.fillStyle = "#" + COLORS.whiteboardText.toString(16).padStart(6, "0");
  ctx.font = "bold 18px monospace";
  ctx.fillText("def sprint():", 12, 26);
  ctx.fillText("  return bugs", 12, 50);
  ctx.fillText("// fix tomorrow", 12, 74);
  ctx.fillStyle = "#cc2244";
  ctx.beginPath();
  ctx.arc(180, 60, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillText("?", 174, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  const group = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 1.2, 0.05),
    new THREE.MeshLambertMaterial({ color: COLORS.whiteboardFrame }),
  );
  group.add(frame);
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1),
    new THREE.MeshBasicMaterial({ map: tex }),
  );
  board.position.z = 0.03;
  group.add(board);
  group.position.set(x, y, z);
  group.rotation.y = rotY;
  scene.add(group);
}

function addMotivationalSign(scene: THREE.Scene, x: number, y: number, z: number, rotY: number): void {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 96;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#" + COLORS.poster1.toString(16).padStart(6, "0");
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = "#ffee00";
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 250, 90);
  ctx.fillStyle = "#ffee00";
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SHIP IT!", 128, 42);
  ctx.font = "bold 18px monospace";
  ctx.fillText("or don't, your call", 128, 76);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.9),
    new THREE.MeshBasicMaterial({ map: tex }),
  );
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  scene.add(m);
}

function addWindow(scene: THREE.Scene, x: number, y: number, z: number, rotY: number): void {
  // Frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 1.6, 2.4),
    new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
  );
  frame.position.set(x, y, z);
  frame.rotation.y = rotY;
  scene.add(frame);
  // Sky gradient
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, "#4488ff");
  grad.addColorStop(0.6, "#88ccff");
  grad.addColorStop(1, "#ffeeaa");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 128);
  // A sun
  ctx.fillStyle = "#ffee00";
  ctx.beginPath();
  ctx.arc(8, 20, 4, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1.4),
    new THREE.MeshBasicMaterial({ map: tex }),
  );
  glass.position.set(x, y, z);
  glass.rotation.y = rotY;
  // Offset the glass slightly inside the frame
  const offset = new THREE.Vector3(0, 0, -0.04);
  if (rotY === 0) offset.z = 0.04;
  if (rotY === Math.PI) offset.z = -0.04;
  if (rotY === Math.PI / 2) offset.x = 0.04;
  if (rotY === -Math.PI / 2) offset.x = -0.04;
  glass.position.add(offset);
  scene.add(glass);
}

// -------- Furniture --------

function makeDesk(
  cx: number,
  cz: number,
  w: number,
  d: number,
  screenColor: number,
): THREE.Group {
  const g = new THREE.Group();
  // Top
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.1, d),
    new THREE.MeshLambertMaterial({ color: COLORS.deskTop }),
  );
  top.position.y = 0.7;
  g.add(top);
  // Wood trim around the edge
  const trimMat = new THREE.MeshLambertMaterial({ color: COLORS.deskTrim });
  addBoxTo(g, trimMat, 0, 0.71, d / 2 - 0.02, w, 0.05, 0.05);
  addBoxTo(g, trimMat, 0, 0.71, -d / 2 + 0.02, w, 0.05, 0.05);
  addBoxTo(g, trimMat, w / 2 - 0.02, 0.71, 0, 0.05, 0.05, d);
  addBoxTo(g, trimMat, -w / 2 + 0.02, 0.71, 0, 0.05, 0.05, d);
  // Legs
  const legGeom = new THREE.BoxGeometry(0.12, 0.7, 0.12);
  const legMat = new THREE.MeshLambertMaterial({ color: COLORS.desk });
  for (const [lx, lz] of [
    [-w / 2 + 0.1, -d / 2 + 0.1],
    [w / 2 - 0.1, -d / 2 + 0.1],
    [-w / 2 + 0.1, d / 2 - 0.1],
    [w / 2 - 0.1, d / 2 - 0.1],
  ] as Array<[number, number]>) {
    const leg = new THREE.Mesh(legGeom, legMat);
    leg.position.set(lx, 0.35, lz);
    g.add(leg);
  }
  // Monitor on the back edge
  const mon = makeMonitor(screenColor);
  mon.position.set(0, 0.75, -d / 2 + 0.25);
  g.add(mon);
  // Keyboard
  const kb = makeKeyboard();
  kb.position.set(0, 0.76, d / 2 - 0.4);
  g.add(kb);
  // Mouse
  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.04, 0.18),
    new THREE.MeshLambertMaterial({ color: COLORS.mouse }),
  );
  mouse.position.set(0.5, 0.77, d / 2 - 0.4);
  g.add(mouse);
  // Coffee mug
  const mug = makeMug();
  mug.position.set(-0.6, 0.78, d / 2 - 0.4);
  g.add(mug);
  // Stack of papers
  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.05, 0.35),
    new THREE.MeshLambertMaterial({ color: COLORS.paper }),
  );
  paper.position.set(-0.8, 0.78, 0);
  g.add(paper);

  g.position.set(cx, 0, cz);
  return g;
}

function makeMonitor(screenColor: number): THREE.Group {
  const g = new THREE.Group();
  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.6, 0.06),
    new THREE.MeshLambertMaterial({ color: COLORS.monitorBezel }),
  );
  bezel.position.y = 0.3;
  g.add(bezel);
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.8, 0.5),
    new THREE.MeshBasicMaterial({ color: screenColor }),
  );
  screen.position.set(0, 0.3, 0.032);
  g.add(screen);
  // Stand
  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.08, 0.1),
    new THREE.MeshLambertMaterial({ color: COLORS.monitorBezel }),
  );
  stand.position.set(0, 0.0, 0);
  g.add(stand);
  return g;
}

function makeKeyboard(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.04, 0.18),
    new THREE.MeshLambertMaterial({ color: COLORS.keyboard }),
  );
  g.add(body);
  // Key grid: 5x3 = 15 small light blocks
  const keyMat = new THREE.MeshLambertMaterial({ color: COLORS.keyboardKey });
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.05), keyMat);
      key.position.set(-0.2 + i * 0.1, 0.03, -0.06 + j * 0.06);
      g.add(key);
    }
  }
  return g;
}

function makeMug(): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.045, 0.12, 8),
    new THREE.MeshLambertMaterial({ color: COLORS.mug }),
  );
  body.position.y = 0.06;
  g.add(body);
  // "Coffee" inside (a brown disc at the top)
  const coffee = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.01, 8),
    new THREE.MeshBasicMaterial({ color: 0x331100 }),
  );
  coffee.position.y = 0.12;
  g.add(coffee);
  // Handle
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.03, 0.008, 6, 8, Math.PI),
    new THREE.MeshLambertMaterial({ color: COLORS.mug }),
  );
  handle.position.set(0.05, 0.06, 0);
  handle.rotation.y = Math.PI / 2;
  g.add(handle);
  return g;
}

function makeMeetingTable(cx: number, cz: number, w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.1, d),
    new THREE.MeshLambertMaterial({ color: COLORS.deskTop }),
  );
  top.position.y = 0.7;
  g.add(top);
  const legGeom = new THREE.BoxGeometry(0.2, 0.7, 0.2);
  const legMat = new THREE.MeshLambertMaterial({ color: COLORS.desk });
  for (const [lx, lz] of [
    [-w / 2 + 0.15, -d / 2 + 0.15],
    [w / 2 - 0.15, -d / 2 + 0.15],
    [-w / 2 + 0.15, d / 2 - 0.15],
    [w / 2 - 0.15, d / 2 - 0.15],
  ] as Array<[number, number]>) {
    const leg = new THREE.Mesh(legGeom, legMat);
    leg.position.set(lx, 0.35, lz);
    g.add(leg);
  }
  // A small notepad on the table
  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.02, 0.3),
    new THREE.MeshLambertMaterial({ color: 0xff8888 }),
  );
  pad.position.set(0.4, 0.77, 0);
  g.add(pad);
  // A pen
  const pen = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.15, 6),
    new THREE.MeshBasicMaterial({ color: 0x000088 }),
  );
  pen.position.set(0.4, 0.78, 0);
  pen.rotation.x = Math.PI / 6;
  g.add(pen);
  // A laptop
  const laptopBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.02, 0.28),
    new THREE.MeshLambertMaterial({ color: 0x222244 }),
  );
  laptopBase.position.set(-0.4, 0.77, 0);
  g.add(laptopBase);
  const laptopScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.38, 0.26),
    new THREE.MeshBasicMaterial({ color: 0x33aaff }),
  );
  laptopScreen.position.set(-0.4, 0.9, -0.14);
  laptopScreen.rotation.x = -0.2;
  g.add(laptopScreen);
  g.position.set(cx, 0, cz);
  return g;
}

function makeServerRack(cx: number, cz: number, w: number, d: number): {
  mesh: THREE.Group;
  update: (dt: number) => void;
} {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, 2, d),
    new THREE.MeshLambertMaterial({ color: COLORS.serverRack }),
  );
  body.position.y = 1;
  g.add(body);
  // Multiple blinking lights in a grid
  const leds: Array<{ mesh: THREE.Mesh; phase: number; speed: number }> = [];
  const ledMatOff = new THREE.MeshBasicMaterial({ color: COLORS.serverLightOff });
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), ledMatOff);
      led.position.set(-0.15 + col * 0.15, 0.4 + row * 0.4, d / 2 + 0.01);
      g.add(led);
      leds.push({ mesh: led, phase: Math.random() * Math.PI * 2, speed: 1 + Math.random() * 4 });
    }
  }
  // Vents
  for (let row = 0; row < 5; row++) {
    const vent = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.7, 0.05, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    vent.position.set(0, 0.3 + row * 0.35, d / 2 + 0.005);
    g.add(vent);
  }
  g.position.set(cx, 0, cz);

  let t = 0;
  return {
    mesh: g,
    update(dt) {
      t += dt;
      for (const l of leds) {
        const v = (Math.sin(t * l.speed + l.phase) + 1) * 0.5;
        const mat = l.mesh.material as THREE.MeshBasicMaterial;
        mat.color.setRGB(
          v * 0 + COLORS.serverLightOff,
          v > 0.5 ? 1 : 0,
          v > 0.5 ? 0.5 : 0,
        );
      }
    },
  };
}

function makeCoffeeMachine(cx: number, cz: number, w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, 1.4, d),
    new THREE.MeshLambertMaterial({ color: COLORS.coffeeMachine }),
  );
  body.position.y = 0.7;
  g.add(body);
  // Red dispenser stripe
  const accent = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.9, 0.15, 0.02),
    new THREE.MeshBasicMaterial({ color: COLORS.coffeeAccent }),
  );
  accent.position.set(0, 0.95, d / 2 + 0.01);
  g.add(accent);
  // Coffee cup on top
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.05, 0.08, 8),
    new THREE.MeshLambertMaterial({ color: COLORS.coffeeCup }),
  );
  cup.position.set(0, 1.45, 0);
  g.add(cup);
  // A second empty cup beside
  const cup2 = cup.clone();
  cup2.position.set(0.15, 1.45, 0.1);
  g.add(cup2);
  // Buttons
  for (let i = 0; i < 4; i++) {
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.01, 8),
      new THREE.MeshBasicMaterial({ color: [0xaa2222, 0x22aa22, 0x2222aa, 0xaaaa22][i]! }),
    );
    btn.position.set(-w / 2 + 0.08 + i * 0.07, 1.1, d / 2 + 0.012);
    btn.rotation.x = Math.PI / 2;
    g.add(btn);
  }
  g.position.set(cx, 0, cz);
  return g;
}

function makeVendingMachine(
  cx: number,
  cz: number,
  w: number,
  d: number,
): { mesh: THREE.Group; update: (dt: number) => void } {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, 2, d),
    new THREE.MeshLambertMaterial({ color: COLORS.vending }),
  );
  body.position.y = 1;
  g.add(body);
  // Top header
  const header = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.95, 0.25, 0.02),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  header.position.set(0, 1.7, d / 2 + 0.01);
  g.add(header);
  // Display screen
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.7, 0.2),
    new THREE.MeshBasicMaterial({ color: COLORS.vendingScreen }),
  );
  screen.position.set(0, 1.4, d / 2 + 0.012);
  g.add(screen);
  // 4x3 grid of "cans" in the window
  const canMat = new THREE.MeshLambertMaterial({ color: COLORS.vendingCans });
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const can = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.1, 8),
        canMat,
      );
      can.position.set(
        -w / 2 + 0.18 + col * 0.22,
        0.4 + row * 0.22,
        d / 2 + 0.01,
      );
      can.rotation.x = Math.PI / 2;
      g.add(can);
    }
  }
  // Coin slot
  const slot = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.04, 0.02),
    new THREE.MeshBasicMaterial({ color: 0x000000 }),
  );
  slot.position.set(0, 0.4, d / 2 + 0.012);
  g.add(slot);
  g.position.set(cx, 0, cz);
  return { mesh: g, update: () => {} };
}

// -------- Decor --------

function makePlant(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.3, 0.4, 8),
    new THREE.MeshLambertMaterial({ color: COLORS.plantPot }),
  );
  pot.position.y = 0.2;
  g.add(pot);
  const potRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.27, 0.27, 0.05, 8),
    new THREE.MeshLambertMaterial({ color: COLORS.deskTrim }),
  );
  potRim.position.y = 0.42;
  g.add(potRim);
  // Leaves: a few cone-shaped fronds
  const leafMat = new THREE.MeshLambertMaterial({ color: COLORS.plantLeaf });
  const leafDarkMat = new THREE.MeshLambertMaterial({ color: COLORS.plantLeafDark });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const r = 0.05 + Math.random() * 0.08;
    const h = 0.6 + Math.random() * 0.3;
    const leaf = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, h, 6),
      i % 2 === 0 ? leafMat : leafDarkMat,
    );
    leaf.position.set(Math.cos(a) * r, 0.45 + h / 2, Math.sin(a) * r);
    leaf.rotation.x = Math.PI / 8;
    leaf.rotation.z = -Math.cos(a) * 0.4;
    leaf.rotation.y = a;
    g.add(leaf);
  }
  g.position.set(x, 0, z);
  return g;
}

function makeFireExtinguisher(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.5, 8),
    new THREE.MeshLambertMaterial({ color: COLORS.fireExtinguisher }),
  );
  body.position.y = 0.4;
  g.add(body);
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.12, 0.1, 8),
    new THREE.MeshLambertMaterial({ color: COLORS.fireExtinguisherTop }),
  );
  top.position.y = 0.7;
  g.add(top);
  const handle = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.05, 0.04),
    new THREE.MeshLambertMaterial({ color: 0x111111 }),
  );
  handle.position.y = 0.78;
  g.add(handle);
  // Label
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 0.1),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  label.position.set(0, 0.45, 0.122);
  g.add(label);
  g.position.set(x, 0, z);
  return g;
}

function makeFileCabinet(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1.2, 0.4),
    new THREE.MeshLambertMaterial({ color: COLORS.fileCabinet }),
  );
  body.position.y = 0.6;
  g.add(body);
  // 3 drawer slots
  for (let i = 0; i < 3; i++) {
    const drawer = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.3, 0.01),
      new THREE.MeshLambertMaterial({ color: 0x9999aa }),
    );
    drawer.position.set(0, 0.2 + i * 0.4, 0.21);
    g.add(drawer);
    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.04, 0.02),
      new THREE.MeshLambertMaterial({ color: COLORS.fileCabinetHandle }),
    );
    handle.position.set(0, 0.2 + i * 0.4, 0.225);
    g.add(handle);
  }
  g.position.set(x, 0, z);
  return g;
}

function makeFloorLamp(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.25, 0.05, 12),
    new THREE.MeshLambertMaterial({ color: 0x222222 }),
  );
  base.position.y = 0.025;
  g.add(base);
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 2, 6),
    new THREE.MeshLambertMaterial({ color: COLORS.lampPole }),
  );
  pole.position.y = 1.05;
  g.add(pole);
  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.35, 0.3, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: COLORS.lampShade, side: THREE.DoubleSide }),
  );
  shade.position.y = 2.15;
  g.add(shade);
  // Add a point light to make the lamp "glow" (warm). This is a real light
  // and lights nearby surfaces.
  const light = new THREE.PointLight(COLORS.lampShade, 0.6, 4, 2);
  light.position.y = 2.0;
  g.add(light);
  g.position.set(x, 0, z);
  return g;
}

// -------- NPCs --------

function makeNpcMarker(npc: NPC, index: number): THREE.Group {
  const g = createNpcMesh(npc.gender, index);
  g.position.set(npc.position.x, 0, npc.position.z);
  // Desks have their monitor on the -Z side and the keyboard on the +Z side,
  // so the NPC should look toward -Z to see their own screen. The marker was
  // authored with eyes on +Z (facing the camera) which made every NPC look
  // "outward" toward the player with the screen behind their back. Rotate 180°
  // so the eyes point at the monitor.
  g.rotation.y = npc.gender === "dog" ? 0 : Math.PI;
  g.userData.npcId = npc.id;
  return g;
}

// -------- Helpers --------

function addBox(
  scene: THREE.Scene,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  d: number,
): void {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  scene.add(m);
}

function addBoxTo(group: THREE.Group, mat: THREE.Material, x: number, y: number, z: number, w: number, h: number, d: number): void {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  group.add(m);
}

function hashId(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
