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
  // about 0.5m past the keyboard for legroom. See the desk AABB in
  // OBSTACLES below: desks are 2m wide × 1m deep, so the chair is at
  // maxZ + 0.5 along the Z axis.
  {
    id: "bartek",
    name: "Bartek",
    role: "Senior Consultant",
    emoji: "B",
    gender: "male",
    position: { x: -7.7, y: 0, z: -5 },
    rotationY: Math.PI / 2,
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
    position: { x: -7.7, y: 0, z: 5.5 },
    rotationY: Math.PI / 2,
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
    position: { x: 7.7, y: 0, z: -5 },
    rotationY: -Math.PI / 2,
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
    position: { x: 3, y: 0, z: 7.7 },
    rotationY: Math.PI,
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
    position: { x: -3, y: 0, z: 7.7 },
    rotationY: Math.PI,
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
    position: { x: 7.7, y: 0, z: 5.5 },
    rotationY: -Math.PI / 2,
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
    position: { x: -7.7, y: 0, z: -1.5 },
    rotationY: Math.PI / 2,
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
    position: { x: 7.7, y: 0, z: -2.5 },
    rotationY: -Math.PI / 2,
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
    position: { x: -7.7, y: 0, z: 2 },
    rotationY: Math.PI / 2,
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
    position: { x: 7.7, y: 0, z: 2 },
    rotationY: -Math.PI / 2,
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
    position: { x: -3, y: 0, z: -7.7 },
    rotationY: 0,
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
    position: { x: 3, y: 0, z: -7.7 },
    rotationY: 0,
    triggerRadius: 1.8,
    dialogues: {
      default: DIALOGUES.przemek!.default!,
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
  // for a south-wall desk). NPC positions are 0.7m past the desk's
  // wall-side edge for legroom — see the NPCS array above.
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
  { id: "server-rack", minX: -8.5, maxX: -7.5, minZ: 7.5, maxZ: 8.5, label: "Server rack" },
  // Coffee machine — moved flush against the east wall (was
  // 0.5m from the wall, which Lucas said was "too far from the
  // wall" 2026-08-30). The collision AABB is 0.5m deep to match
  // the visible mesh; the visual mesh is placed at the wall
  // by the make* function in scene.ts.
  { id: "coffee-machine", minX: 8.0, maxX: 8.5, minZ: -8.9, maxZ: -8.0, label: "Coffee machine" },
  // Vending machine
  { id: "vending", minX: 7.5, maxX: 8.5, minZ: 7.5, maxZ: 8.5, label: "Vending machine" },
  // Filing cabinet — only the south one stays. The north
  // one (z=-5) was the gray box in front of the east-window
  // (Lucas 2026-08-30: "whiteboard in the middle of the window").
  { id: "filing-cabinet-south", minX: 8.45, maxX: 8.95, minZ: 1.8, maxZ: 2.2, label: "Filing cabinet" },
];

/** Player starts here. Inside the office, south side, away from walls. */
export const PLAYER_START = { x: 0, y: 0.5, z: 6 };

/** Where the office "door" is, used for flavor text only. */
export const DOOR = { x: 0, z: 9 };
