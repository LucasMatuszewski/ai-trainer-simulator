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
  {
    id: "bartek",
    name: "Bartek",
    role: "Senior Consultant",
    emoji: "B",
    position: { x: -4, y: 0, z: -3 },
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
    position: { x: 4, y: 0, z: -3 },
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
    position: { x: -4, y: 0, z: 3 },
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
    position: { x: 4, y: 0, z: 3 },
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
    position: { x: 0, y: 0, z: -6 },
    triggerRadius: 1.6,
    dialogues: {
      default: DIALOGUES.pawel!.default!,
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
  label?: string;
}

export const OBSTACLES: Obstacle[] = [
  // Desks
  { id: "desk-bartek", minX: -5, maxX: -3, minZ: -4, maxZ: -2, label: "Desk (Bartek)" },
  { id: "desk-klaudia", minX: 3, maxX: 5, minZ: -4, maxZ: -2, label: "Desk (Klaudia)" },
  { id: "desk-marek", minX: -5, maxX: -3, minZ: 2, maxZ: 4, label: "Desk (Marek)" },
  { id: "desk-zosia", minX: 3, maxX: 5, minZ: 2, maxZ: 4, label: "Desk (Zosia)" },
  { id: "desk-pawel", minX: -1, maxX: 1, minZ: -7, maxZ: -5, label: "Desk (Pawel)" },
  // Center meeting table
  { id: "meeting-table", minX: -2, maxX: 2, minZ: -1, maxZ: 1, label: "Meeting table" },
  // Server rack
  { id: "server-rack", minX: -8, maxX: -7, minZ: 7, maxZ: 9, label: "Server rack" },
  // Coffee machine
  { id: "coffee-machine", minX: 7, maxX: 8, minZ: -8, maxZ: -7, label: "Coffee machine" },
  // Vending machine
  { id: "vending", minX: 7, maxX: 8, minZ: 7, maxZ: 9, label: "Vending machine" },
];

/** Player starts here. Inside the office, south side, away from walls. */
export const PLAYER_START = { x: 0, y: 0.5, z: 6 };

/** Where the office "door" is, used for flavor text only. */
export const DOOR = { x: 0, z: 9 };
