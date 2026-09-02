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
import {
  MAIN_OFFICE_FILE_CABINETS,
  MAIN_OFFICE_PLANTS,
  MAIN_OFFICE_SERVER_RACK_ROTATION_Y,
  NPCS,
  OBSTACLES,
  OFFICE_BOUNDS,
} from "../content/npcs";
import { MAIN_OFFICE_WALLS, WORLD_ROOMS } from "../content/world-layout";
import { createNpcController, type NpcController } from "./npc-controller";
import { createNpcMesh } from "./npc-mesh";
import { buildMultiRoomMeshes, drawPoster } from "./multi-room";
import { makeGarden, makeOutdoorScenery } from "./furniture/garden";
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

export const SHIP_IT_SIGN_MOUNT = {
  position: [4, 2, OFFICE_BOUNDS.maxZ - 0.16] as const,
  face: Math.PI,
};

// C-60: door labels on the office side of each doorway, to the player's
// RIGHT when facing the door (east wall south of the kitchen gap, south
// wall west of the meeting gap) so they read on approach. Color matches
// the BATCAVE sign (Lucas: keep the room labels in one warm family).
export const DOOR_SIGN_MOUNTS = {
  kitchen: { position: [OFFICE_BOUNDS.maxX - 0.16, 2.1, 2.3] as const, face: -Math.PI / 2, text: "Kitchen", color: 0x8a6d1f },
  meeting: { position: [-2.4, 2.1, OFFICE_BOUNDS.maxZ - 0.16] as const, face: Math.PI, text: "Meeting Room", color: 0x8a6d1f },
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
  multiRoom: THREE.Group[];
  /**
   * Handle to the NPC controller. Exposed so the event dispatcher
   * (and future systems) can install random-walk schedule overrides
   * without going through the scene's internal `updatables` list
   * (L-2026-08-30-01).
   */
  npcController: NpcController;
}

export function buildOfficeScene(
  scene: THREE.Scene,
  getCurrentPeriod: () => Period = () => "morning",
  getDay: () => number = () => 1,
  // C-46: the lunch dialogue window is TIME-gated from the game's
  // period clock (main.ts owns it); injected so the chatter system
  // can switch to lunch lines wherever the NPCs happen to stand.
  isLunchActive: () => boolean = () => false,
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
  floor.receiveShadow = true;
  scene.add(floor);

  // Skirting board (warm dark band where wall meets floor) for visual interest.
  const skirting = new THREE.MeshLambertMaterial({ color: COLORS.wallAccent });
  addBox(scene, skirting, 0, 0.05, OFFICE_BOUNDS.minZ + 0.05, floorWidth, 0.1, 0.1);
  addBox(scene, skirting, 0, 0.05, OFFICE_BOUNDS.maxZ - 0.05, floorWidth, 0.1, 0.1);
  addBox(scene, skirting, OFFICE_BOUNDS.minX + 0.05, 0.05, 0, 0.1, 0.1, floorDepth);
  addBox(scene, skirting, OFFICE_BOUNDS.maxX - 0.05, 0.05, 0, 0.1, 0.1, floorDepth);

  // ---- Walls (4) with subtle wallpaper texture. Avoid full-height stripes:
  // those alias into distracting wall bands at the low internal resolution.
  const wallpaperTex = makeWallpaperTexture();
  wallpaperTex.wrapS = wallpaperTex.wrapT = THREE.RepeatWrapping;
  wallpaperTex.repeat.set(2.5, 1.5);
  wallpaperTex.colorSpace = THREE.SRGBColorSpace;
  const wallMat = new THREE.MeshLambertMaterial({ map: wallpaperTex });
  const wallHeight = 3;
  for (const wall of MAIN_OFFICE_WALLS) {
    addBox(
      scene,
      wallMat,
      (wall.minX + wall.maxX) / 2,
      wallHeight / 2,
      (wall.minZ + wall.maxZ) / 2,
      wall.maxX - wall.minX,
      wallHeight,
      wall.maxZ - wall.minZ,
    );
  }

  // ---- Ceiling with bright cream + dark wood trim around the edge.
  const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(floorWidth, 0.2, floorDepth),
    new THREE.MeshLambertMaterial({ color: COLORS.ceiling }),
  );
  ceiling.position.set(0, wallHeight + 0.1, 0);
  ceiling.receiveShadow = true;
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

  // Keep the motivational sign on the south wall section to the right of the
  // meeting-room doorway, rather than floating across the doorway opening.
  addMotivationalSign(scene, ...SHIP_IT_SIGN_MOUNT.position, SHIP_IT_SIGN_MOUNT.face);

  // C-60: "Kitchen" / "Meeting Room" labels next to their doorways.
  addDoorSign(scene, DOOR_SIGN_MOUNTS.kitchen);
  addDoorSign(scene, DOOR_SIGN_MOUNTS.meeting);

  // ---- Window on east wall: a blue rectangle with a "sky" gradient.
  addWindow(scene, OFFICE_BOUNDS.maxX - 0.16, 1.6, -6.5, -Math.PI / 2);

  // ---- Furniture (per OBSTACLES)
  for (const obs of OBSTACLES) {
    const w = obs.maxX - obs.minX;
    const d = obs.maxZ - obs.minZ;
    const cx = (obs.maxX + obs.minX) / 2;
    const cz = (obs.maxZ + obs.minZ) / 2;
    const screenColor: number = SCREEN_COLORS[Math.abs(hashId(obs.id)) % SCREEN_COLORS.length]!;

    if (obs.id.startsWith("desk-")) {
      // The AABB above is the WORLD bounding box. For desks rotated
      // ±π/2 the local w/d (used by makeDesk to build the desk top
      // and the monitor/keyboard placement) are swapped from the
      // world w/d so the long edge ends up along the wall after
      // rotation. N/S wall desks (rotation 0 or π) keep w/d as-is.
      const rotation = obs.rotationY ?? 0;
      const swapped = Math.abs(rotation) === Math.PI / 2;
      const localW = swapped ? d : w;
      const localD = swapped ? w : d;
      scene.add(makeDesk(cx, cz, localW, localD, screenColor, rotation));
    } else if (obs.id === "server-rack") {
      const r = makeServerRack(cx, cz, w, d);
      // Its LED/front panel is local +Z. Turn it north into the office from
      // the south-west corner instead of presenting its back to the room.
      r.mesh.rotation.y = MAIN_OFFICE_SERVER_RACK_ROTATION_Y;
      scene.add(r.mesh);
      updatables.push(r.update);
    } else if (obs.id === "coffee-machine") {
      scene.add(makeCoffeeMachine(cx, cz, w, d));
    } else if (obs.id === "vending") {
      const r = makeVendingMachine(cx, cz, w, d);
      // L-2026-08-30 (Lucas): "Turn around this dark-blue machine
      // in the office corner, it is facing the wall, should be in
      // the corner and facing the room". The vending machine is
      // authored with the front (screen, cans) on the +Z side.
      // At the SE corner the +Z direction points AT the south wall
      // (wall is at z=9, machine front is at z=8+d/2=8.5). Rotate
      // the whole group 180° so the front faces -Z (into the
      // room, toward the player's natural approach path).
      r.mesh.rotation.y = Math.PI;
      scene.add(r.mesh);
      updatables.push(r.update);
    }
  }

  // ---- Decoration: floor plants kept clear of furniture footprints.
  for (const plant of MAIN_OFFICE_PLANTS) scene.add(makePlant(plant.x, plant.z));

  // Fire extinguisher near the kitchen
  scene.add(makeFireExtinguisher(8.85, -6));

  // Filing cabinets mounted along the east wall.
  for (const cabinet of MAIN_OFFICE_FILE_CABINETS) {
    const mesh = makeFileCabinet(cabinet.x, cabinet.z);
    mesh.name = cabinet.id;
    mesh.rotation.y = cabinet.rotationY;
    scene.add(mesh);
  }

  // Tall floor lamp in a corner for warm light
  scene.add(makeFloorLamp(-8.5, 6));

  // C-47 revenue corner: the Deal Wall (sales leaderboard, east wall)
  // and the Content Booth (marketing backdrop + ring light, west
  // wall). Wall-mounted, so no floor AABB is needed.
  scene.add(makeDealWall());
  scene.add(makeContentBooth());

  // ---- NPC markers (chunky characters with bodies, heads, hair, eyes).
  const npcMeshes = new Map<string, THREE.Mesh>();
  const npcObjects = {} as Record<NpcId, THREE.Object3D>;
  NPCS.forEach((npc, i) => {
    const m = makeNpcMarker(npc, i);
    scene.add(m);
    npcMeshes.set(npc.id, m as unknown as THREE.Mesh);
    npcObjects[npc.id] = m;
  });

  const npcController = createNpcController(NPCS, npcObjects, getCurrentPeriod, getDay, Math.random, isLunchActive);
  updatables.push(npcController.update);

  const multiRoom = buildMultiRoomMeshes(scene, WORLD_ROOMS);

  // C-44 #9: the internal garden (shared courtyard between the
  // CEO office and the training room) and the outdoor scenery
  // east of the training room (trees, hills, sun). Decoration
  // only - the glass walls keep the player out.
  scene.add(makeGarden());
  scene.add(makeOutdoorScenery());

  // Furniture, monitors and NPC bodies cast compact directional shadows;
  // architectural surfaces receive them. Basic-material screens remain lit.
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    if (!(object.material instanceof THREE.MeshBasicMaterial)) object.castShadow = true;
    object.receiveShadow = true;
  });

  return {
    npcMeshes,
    npcObjects,
    interactableMeshes: new Map(),
    // L-2026-08-30 (Lucas): "Person get spawned inside the
    // speaker booth in conference room". The player was at z=6,
    // close to the south wall and in line with the meeting-room
    // door. With the FPS camera at eye height looking down -Z,
    // the player looked like they were inside the meeting room.
    // Move to the east side of the south wall, well clear of
    // the meeting-room door (which is at x=0), and face them
    // NORTH so the first thing they see is the office interior.
    // C-62: the player starts INSIDE the meeting room (soon: the
    // reception), facing north - yaw 0 faces -Z, straight through the
    // doorway into the office, with the morning arrivals walking in
    // through the same door.
    playerStart: new THREE.Vector3(0, 0, 17.8),
    updatables,
    multiRoom,
    npcController,
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
  t.colorSpace = THREE.SRGBColorSpace;
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
  // Subtle offset dots preserve the wallpaper character without producing
  // long high-contrast lines when the texture is minified.
  ctx.fillStyle = "rgba(180, 100, 60, 0.18)";
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
  // Palette (Lucas 2026-09-01: the red/yellow was too aggressive -
  // "more colorful but not pink"): deep teal ground, warm amber frame
  // and title, pale sage subtitle.
  const bg = "#17656b";
  const amber = "#ffc94d";
  const sage = "#d8e8dc";
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 96;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = amber;
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 250, 90);
  ctx.fillStyle = amber;
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SHIP IT!", 128, 42);
  ctx.fillStyle = sage;
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

// C-60: doorway label rendered by the same muted drawPoster style as
// the other room labels (WC, TRAINING ROOM, BATCAVE).
function addDoorSign(
  scene: THREE.Scene,
  mount: { position: readonly [number, number, number]; face: number; text: string; color: number },
): void {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d");
  if (ctx) {
    drawPoster(ctx, c.width, c.height, mount.text, mount.color);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.6),
    new THREE.MeshBasicMaterial({ map: tex }),
  );
  m.name = "door-sign";
  m.position.set(...mount.position);
  m.rotation.y = mount.face;
  scene.add(m);
}

function addWindow(scene: THREE.Scene, x: number, y: number, z: number, rotY: number): void {
  // Frame. Dimensions are 2.4m (X) x 1.6m (Y) x 0.05m (Z) in the
  // LOCAL frame, so after the -π/2 rotation for an east-wall window
  // the frame is 2.4m along the wall (world Z) and 0.05m thick
  // perpendicular to the wall (world X). Earlier the box was
  // BoxGeometry(0.05, 1.6, 2.4) which, after the same rotation,
  // put the frame 2.4m perpendicular to the wall — rotated 90°
  // relative to the glass plane and clipping into the room.
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.6, 0.05),
    new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
  );
  frame.name = "window-frame";
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
  glass.name = "window-glass";
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
  rotationY = 0,
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
  // Monitor on the back edge. The monitor + keyboard + mouse + mug are
  // placed at FIXED local positions (not scaled with `d`) so the
  // working area stays compact near the room-side end of the desk
  // regardless of the desk's overall depth. Earlier the monitor was
  // at local z = -d/2 + 0.25 and the keyboard at d/2 - 0.4, which
  // spread them 1.35m apart for a 2m-deep W/E wall desk and made the
  // keyboard look "very far from the monitor".
  const mon = makeMonitor(screenColor);
  mon.position.set(0, 0.75, -0.25);
  g.add(mon);
  // Keyboard
  const kb = makeKeyboard();
  kb.position.set(0, 0.76, 0.1);
  g.add(kb);
  // Mouse
  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.04, 0.18),
    new THREE.MeshLambertMaterial({ color: COLORS.mouse }),
  );
  mouse.position.set(0.5, 0.77, 0.1);
  g.add(mouse);
  // Coffee mug
  const mug = makeMug();
  mug.position.set(-0.6, 0.78, 0.1);
  g.add(mug);
  // Stack of papers
  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.05, 0.35),
    new THREE.MeshLambertMaterial({ color: COLORS.paper }),
  );
  paper.position.set(-0.8, 0.78, 0);
  g.add(paper);

  g.position.set(cx, 0, cz);
  g.rotation.y = rotationY;
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

function makeServerRack(cx: number, cz: number, w: number, d: number): {
  mesh: THREE.Group;
  update: (dt: number) => void;
} {
  const g = new THREE.Group();
  g.name = "server-rack";
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
  g.name = "coffee-machine";
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(w, 1.4, d),
    new THREE.MeshLambertMaterial({ color: COLORS.coffeeMachine }),
  );
  body.name = "coffee-machine-body";
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

// C-47 (relocated per Lucas 2026-09-01): the Deal Wall - a sales
// leaderboard whiteboard on the MEETING ROOM's west wall. The main
// office placement sat in the kitchen doorway; the meeting room is
// the gathering space. Sales-affinity NPCs stand at (-4.6, 12.6) and
// start their sales-topic exchanges in front of it. Geometry is built
// facing local +Z (front), so decoration offsets poke into the room.
function makeDealWall(): THREE.Group {
  const g = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 1.15, 0.06),
    new THREE.MeshLambertMaterial({ color: 0xf5f2e8 }),
  );
  board.position.y = 1.5;
  g.add(board);
  // Frame.
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.78, 1.23, 0.05),
    new THREE.MeshLambertMaterial({ color: COLORS.deskTrim }),
  );
  frame.position.y = 1.5;
  g.add(frame);
  // "Q3 = $$$" header bar.
  const header = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.16, 0.02),
    new THREE.MeshLambertMaterial({ color: COLORS.poster4 }),
  );
  header.position.set(0, 1.93, 0.045);
  g.add(header);
  // Leaderboard bars: each rep gets a bar whose length is "their number".
  const barColors = [0x00ff7f, 0xffaa00, 0xff77ff, 0x33aaff, 0xcc4444];
  const barLengths = [1.15, 0.9, 0.7, 0.45, 0.25];
  for (let i = 0; i < barLengths.length; i++) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(barLengths[i]!, 0.11, 0.02),
      new THREE.MeshLambertMaterial({ color: barColors[i]! }),
    );
    bar.position.set(-0.575 + barLengths[i]! / 2, 1.74 - i * 0.19, 0.045);
    g.add(bar);
  }
  g.position.set(-6.02, 0, 12.6);
  g.rotation.y = Math.PI / 2; // front (+Z) -> +X, east into the room
  return g;
}

// C-47 (relocated per Lucas 2026-09-01): the Content Booth - a purple
// DevPowers roll-up backdrop with a ring light, on the MEETING ROOM's
// east wall (opposite the Deal Wall; the old west-wall spot beside the
// server rack had no room to gather). Marketing-affinity NPCs stand
// at (4.6, 12.6) and start their marketing-topic exchanges in front
// of it.
function makeContentBooth(): THREE.Group {
  const g = new THREE.Group();
  // Roll-up backdrop panel.
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.1, 0.07),
    new THREE.MeshLambertMaterial({ color: 0x6b4fa3 }),
  );
  panel.position.y = 1.15;
  g.add(panel);
  // Logo plate on the backdrop.
  const logo = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.5, 0.02),
    new THREE.MeshLambertMaterial({ color: COLORS.poster4 }),
  );
  logo.position.set(0, 1.55, 0.05);
  g.add(logo);
  // Feet of the roll-up stand.
  for (const dx of [-0.55, 0.55]) {
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.05, 0.4),
      new THREE.MeshLambertMaterial({ color: 0x222222 }),
    );
    foot.position.set(dx, 0.025, 0.08);
    g.add(foot);
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 2.1, 8),
      new THREE.MeshLambertMaterial({ color: 0x333333 }),
    );
    pole.position.set(dx, 1.05, 0.08);
    g.add(pole);
  }
  // Ring light on a small tripod, standing into the room.
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.035, 8, 24),
    new THREE.MeshLambertMaterial({ color: 0xfff2cc, emissive: 0x554422 }),
  );
  ring.position.set(0.55, 1.5, 1);
  g.add(ring);
  const tripod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 1.3, 8),
    new THREE.MeshLambertMaterial({ color: 0x333333 }),
  );
  tripod.position.set(0.55, 0.65, 1);
  g.add(tripod);
  g.position.set(5.75, 0, 12.6);
  g.rotation.y = -Math.PI / 2; // front (+Z) -> -X, west into the room
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
  // C-63: `npc.appearance` is this person's authored skin/hair/shirt.
  const g = createNpcMesh(npc.gender, index, npc.id, npc.appearance);
  g.position.set(npc.position.x, 0, npc.position.z);
  // The NPC mesh's eyes look at local +Z. By default the desk has its
  // monitor on the local -Z side, so the NPC was rotated 180° to face
  // -Z. L-2026-08-31-02: NPC.rotationY is now data-driven so each NPC
  // faces the office center alongside their desk. Dogs are not rotated
  // (the dog mesh has no "front").
  g.rotation.y = npc.gender === "dog" ? 0 : (npc.rotationY ?? Math.PI);
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
