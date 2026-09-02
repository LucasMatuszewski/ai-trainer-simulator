/**
 * NPC definitions. Each NPC has a position in the office, a portrait placeholder,
 * and dialogue trees gated on player state.
 *
 * Comedy style: IT Crowd + Silicon Valley. NPCs are exaggerated versions of real
 * IT-folk archetypes. The player's relationships go up or down based on which
 * dialogue options they pick.
 *
 * Positions are in world units (1 unit = 1 meter roughly). The office is 20x20
 * with the player starting near the door at the south edge.
 */

import type { NPC } from "../types";
import { DIALOGUES } from "./dialogues";

export const NPCS: NPC[] = [
  // Each NPC sits in a chair at the FRONT of the desk (the +Z side,
  // where the keyboard is). The monitor is on the -Z side; the chair is
  // about 0.5m past the keyboard for legroom; C-63 moved every desk
  // NPC 0.25m closer in, to 0.45m from the desk edge. See the desk AABB in
  // OBSTACLES below: desks are 2m wide × 1m deep, so the chair is at
  // maxZ + 0.5 along the Z axis.
  {
    id: "bartek",
    name: "Bartek",
    role: "Senior Consultant",
    emoji: "B",
    gender: "male",
    // C-63: the steady senior consultant: plain and unremarkable on purpose.
    appearance: { skin: "fair", hair: "brown", shirt: "navy" },
    position: { x: -7.45, y: 0, z: -5 },
    rotationY: Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.bartek!.default!,
      "after-tutorial": DIALOGUES.bartek!.afterTutorial!,
      "after-contract": DIALOGUES.bartek!.afterContract!,
    },
  },
  {
    id: "klaudia",
    name: "Klaudia",
    role: "The LinkedIn Influencer",
    emoji: "K",
    gender: "female",
    // C-63: the LinkedIn influencer dresses for the camera.
    appearance: { skin: "porcelain", hair: "blond", shirt: "mustard" },
    position: { x: -7.45, y: 0, z: 5.5 },
    rotationY: Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.klaudia!.default!,
    },
  },
  {
    id: "marek",
    name: "Marek",
    role: "DevOps / 10x Engineer",
    emoji: "M",
    gender: "male",
    // C-63: DevOps in the same dark hoodie-grey he has worn for years.
    appearance: { skin: "olive", hair: "black", shirt: "charcoal" },
    position: { x: 7.45, y: 0, z: -5 },
    rotationY: -Math.PI / 2,
    walkSpeed: 1.4,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.marek!.default!,
    },
  },
  {
    id: "zosia",
    name: "Zosia",
    role: "The Manager",
    emoji: "Z",
    gender: "female",
    // C-63: the manager, the only one in the office who owns a blazer.
    appearance: { skin: "tan", hair: "auburn", shirt: "burgundy" },
    position: { x: 3, y: 0, z: 7.45 },
    rotationY: Math.PI,
    walkSpeed: 1,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.zosia!.default!,
    },
  },
  {
    id: "pawel",
    name: "Pawel",
    role: "The Intern",
    emoji: "P",
    gender: "male",
    // C-63: the intern, still trying to look employable.
    appearance: { skin: "porcelain", hair: "brown", shirt: "teal" },
    position: { x: -3, y: 0, z: 7.45 },
    rotationY: Math.PI,
    walkSpeed: 1.2,
    triggerRadius: 1.6,
    dialogues: {
      default: DIALOGUES.pawel!.default!,
    },
  },
  {
    id: "kasia",
    name: "Kasia",
    role: "The Recruiter",
    emoji: "📱",
    gender: "female",
    // C-63: the recruiter, dressed to be remembered.
    appearance: { skin: "brown", hair: "black", shirt: "violet" },
    position: { x: 7.45, y: 0, z: 5.5 },
    rotationY: -Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.kasia!.default!,
    },
  },
  {
    id: "tomek",
    name: "Tomek",
    role: "Junior Developer",
    emoji: "🐛",
    gender: "male",
    // C-63: the junior with the dyed hair phase.
    appearance: { skin: "fair", hair: "dyed", shirt: "forest" },
    position: { x: -7.45, y: 0, z: -1.5 },
    rotationY: Math.PI / 2,
    walkSpeed: 1.4,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.tomek!.default!,
    },
  },
  {
    id: "ania",
    name: "Ania",
    role: "Marketing & Synergy",
    emoji: "📣",
    gender: "female",
    // C-63: marketing, matching the brand deck.
    appearance: { skin: "olive", hair: "blond", shirt: "rust" },
    position: { x: 7.45, y: 0, z: -2.5 },
    rotationY: -Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.ania!.default!,
    },
  },
  {
    id: "janusz",
    name: "Janusz",
    role: "The Janitor",
    emoji: "🧹",
    gender: "male",
    // C-63: the janitor, work greens and twenty years of grey.
    appearance: { skin: "tan", hair: "grey", shirt: "forest" },
    position: { x: -7.45, y: 0, z: 2 },
    rotationY: Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.janusz!.default!,
    },
  },
  {
    id: "burek",
    name: "Burek",
    role: "Office Dog",
    emoji: "🐶",
    gender: "dog",
    position: { x: -5, y: 0, z: 4 },
    rotationY: 0,
    walkSpeed: 1.6,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.burek!.default!,
    },
  },
  {
    id: "grazyna",
    name: "Grazyna",
    role: "The Accountant",
    emoji: "💰",
    gender: "female",
    // C-63: the accountant, in accountant.
    appearance: { skin: "fair", hair: "grey", shirt: "charcoal" },
    position: { x: 7.45, y: 0, z: 2 },
    rotationY: -Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.grazyna!.default!,
    },
  },
  {
    id: "maciek",
    name: "Maciek",
    role: "The CTO",
    emoji: "🚀",
    gender: "male",
    // C-63: the CTO, one good shirt on rotation.
    appearance: { skin: "deep", hair: "black", shirt: "teal" },
    position: { x: -3, y: 0, z: -7.45 },
    rotationY: 0,
    walkSpeed: 1.4,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.maciek!.default!,
    },
  },
  {
    id: "przemek",
    name: "Przemek",
    role: "Sales",
    emoji: "🤝",
    gender: "male",
    // C-63: sales, the loudest shirt on the floor.
    appearance: { skin: "tan", hair: "brown", shirt: "burgundy" },
    position: { x: 3, y: 0, z: -7.45 },
    rotationY: 0,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.przemek!.default!,
    },
  },
  {
    // C-38: the new CEO character. Lives in the new CEO office
    // (former training room footprint, north of the main office).
    // Sits at the executive desk facing south so the player in
    // the main office sees him through the glass wall. The
    // dialogue tree is gated on `got-acme-contract` so the player
    // cannot talk to him on day 1. The dialogue authoring is
    // delegated to GLM-5.3 in a later phase; for now the CEO has
    // a single first-meeting tree.
    id: "dawid",
    name: "Dawid",
    role: "The CEO",
    emoji: "👔",
    gender: "male",
    // C-63: the CEO, the only navy that cost real money.
    appearance: { skin: "olive", hair: "grey", shirt: "navy" },
    // L-2026-08-31: z=-17.0 sits him between the chair (z=-17.15)
    // and the desk's back edge (z=-16.7) so he reads as sitting
    // AT the desk, not inside the chair back.
    position: { x: 0, y: 0, z: -17 },
    rotationY: 0,
    walkSpeed: 1,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.dawid!.default!,
      "first-meeting": DIALOGUES.dawid!["first-meeting"]!,
      "give-task": DIALOGUES.dawid!["give-task"]!,
      "performance-review": DIALOGUES.dawid!["performance-review"]!,
      fireside: DIALOGUES.dawid!.fireside!,
    },
  },
  {
    // C-64 (Lucas, 2026-09-02): the new receptionist / office
    // manager. She lives behind the reception desk in the
    // renamed "reception" room (the old meeting room, floor
    // x=[-6, 6], z=[9, 19]). The desk sits at (3.4, 0, 13.5)
    // and she stands 1m behind it at (4.4, 0, 13.5), looking
    // -X across the lobby at whoever walks in through the
    // glass doors on the south wall.
    //
    // She is the tutorial host and the standing FAQ / help
    // centre (Lucas: "use receptionist as the first guide and
    // tutorial at the game start"). Two trees:
    //   first-meeting -> the orientation (8-12 TTS-able lines)
    //   default       -> the re-enterable FAQ menu
    //
    // C-63: every NPC needs an authored appearance so the
    // office is not 14 copies of the same skin+hair+shirt
    // combo. Brown skin, auburn hair, navy shirt - a warm
    // professional look that no existing colleague has.
    id: "renata",
    name: "Renata",
    role: "Receptionist / Office Manager",
    emoji: "R",
    gender: "female",
    appearance: { skin: "brown", hair: "auburn", shirt: "navy" },
    // Standing 1m behind the reception desk center (3.4, 13.5)
    // so the desk does not visually clip her. face -PI/2 means
    // yaw = -90 deg = looking at -X (toward the lobby and the
    // glass doors on the south wall).
    position: { x: 4.4, y: 0, z: 13.5 },
    rotationY: -Math.PI / 2,
    walkSpeed: 1.2,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.renata!.default!,
      "first-meeting": DIALOGUES.renata!["first-meeting"]!,
    },
  },
];

/** Office layout: a 20x20 room with walls, the player start, and walkable interior. */
export const OFFICE_BOUNDS = { minX: -9, maxX: 9, minZ: -9, maxZ: 9 };

/** AABB obstacles inside the office. Player cannot walk through these. */
export interface Obstacle {
  id: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  /**
   * World rotation of the visible mesh, in radians around the Y axis.
   * The AABB above is the rotated bounding box (used for collision).
   * The desk's default mesh has its long axis along world +X (width 2m,
   * depth 1m) and its monitor on the -Z side. After rotation the long
   * axis and monitor orientation follow the standard rotation rules:
   *   left/right wall  ->  ±π/2 so the NPC faces the office center
   *   back/front wall  ->   π   so the NPC faces the office center
   * If omitted, the obstacle is assumed to be axis-aligned (rotation 0).
   */
  rotationY?: number;
  label?: string;
}

export interface FloorDecorationPlacement {
  id: string;
  x: number;
  y: number;
  z: number;
  radius: number;
}

export const MAIN_OFFICE_PLANTS: readonly FloorDecorationPlacement[] = [
  { id: "plant-north-west", x: -8.5, y: 0, z: -8.5, radius: 0.35 },
  { id: "plant-north-wall", x: -6, y: 0, z: -8.5, radius: 0.35 },
];

export const MAIN_OFFICE_FILE_CABINETS = [
  // L-2026-08-30 (Lucas): "some whiteboard in the middle of the
  // window" (the north cabinet) AND "dark-blue machine in the
  // office corner facing the wall" (the south cabinet, whose
  // drawers faced the wall instead of the room). The north one
  // was removed; the south one is kept.
  { id: "filing-cabinet-south", x: 8.7, z: 2, rotationY: -Math.PI / 2 },
] as const;

/** Server front is local +Z; pi turns it north from the south-west corner. */
export const MAIN_OFFICE_SERVER_RACK_ROTATION_Y = Math.PI;

export const OBSTACLES: Obstacle[] = [
  // Desks — L-2026-08-31-02: all 12 NPC desks against the walls, all
  // facing the office center. AABBs are the WORLD bounding box (used
  // for collision). W/E wall desks are rotated ±π/2: the long edge
  // (2m) is perpendicular to the wall, the short edge (1m) runs
  // along the wall. N wall desks are rotated π; S wall desks are
  // NOT rotated (the default orientation already faces the center
  // for a south-wall desk). NPC positions are 0.45m past the desk's
  // wall-side edge (C-63; was 0.7m, which read as standing NEAR a
  // desk rather than working at it) — see the NPCS array above.
  { id: "desk-bartek", minX: -7, maxX: -6, minZ: -6, maxZ: -4, rotationY: -Math.PI / 2, label: "Desk (Bartek)" },
  { id: "desk-tomek", minX: -7, maxX: -6, minZ: -2.5, maxZ: -0.5, rotationY: -Math.PI / 2, label: "Desk (Tomek)" },
  { id: "desk-janusz", minX: -7, maxX: -6, minZ: 1, maxZ: 3, rotationY: -Math.PI / 2, label: "Desk (Janusz)" },
  { id: "desk-klaudia", minX: -7, maxX: -6, minZ: 4.5, maxZ: 6.5, rotationY: -Math.PI / 2, label: "Desk (Klaudia)" },
  { id: "desk-marek", minX: 6, maxX: 7, minZ: -6, maxZ: -4, rotationY: Math.PI / 2, label: "Desk (Marek)" },
  { id: "desk-ania", minX: 6, maxX: 7, minZ: -3.5, maxZ: -1.5, rotationY: Math.PI / 2, label: "Desk (Ania)" },
  { id: "desk-grazyna", minX: 6, maxX: 7, minZ: 1, maxZ: 3, rotationY: Math.PI / 2, label: "Desk (Grazyna)" },
  { id: "desk-kasia", minX: 6, maxX: 7, minZ: 4.5, maxZ: 6.5, rotationY: Math.PI / 2, label: "Desk (Kasia)" },
  { id: "desk-maciek", minX: -4, maxX: -2, minZ: -7, maxZ: -6, rotationY: Math.PI, label: "Desk (Maciek)" },
  { id: "desk-przemek", minX: 2, maxX: 4, minZ: -7, maxZ: -6, rotationY: Math.PI, label: "Desk (Przemek)" },
  { id: "desk-pawel", minX: -4, maxX: -2, minZ: 6, maxZ: 7, label: "Desk (Pawel)" },
  { id: "desk-zosia", minX: 2, maxX: 4, minZ: 6, maxZ: 7, label: "Desk (Zosia)" },
  // Server rack
  { id: "server-rack", minX: -9, maxX: -8, minZ: 7.9, maxZ: 8.9, label: "Server rack" },
  // Coffee machine — moved flush against the east wall (was
  // 0.5m from the wall, which Lucas said was "too far from the
  // wall" 2026-08-30). The collision AABB is 0.5m deep to match
  // the visible mesh; the visual mesh is placed at the wall
  // by the make* function in scene.ts.
  { id: "coffee-machine", minX: 8.0, maxX: 8.5, minZ: -8.9, maxZ: -8.0, label: "Coffee machine" },
  // Vending machine
  { id: "vending", minX: 7.9, maxX: 8.9, minZ: 8, maxZ: 9, label: "Vending machine" },
  // Filing cabinet — only the south one stays. The north
  // one (z=-5) was the gray box in front of the east-window
  // (Lucas 2026-08-30: "whiteboard in the middle of the window").
  { id: "filing-cabinet-south", minX: 8.45, maxX: 8.95, minZ: 1.8, maxZ: 2.2, label: "Filing cabinet" },
];

/** Player starts here. Inside the office, south side, away from walls. */
export const PLAYER_START = { x: 0, y: 0.5, z: 6 };

/** Where the office "door" is, used for flavor text only. */
export const DOOR = { x: 0, z: 9 };
