import type { NpcId } from "../types";

export type Period = "morning" | "afternoon" | "evening";

export type NpcState =
  | "at-desk"
  | "walking"
  | "break-room"
  | "coffee"
  | "meeting"
  | "lunch"
  | "gone-home";

export interface ScheduleEntry {
  position: { x: number; y: number; z: number };
  face: number;
  state: NpcState;
}

export const NPC_SCHEDULES: Record<NpcId, Record<Period, ScheduleEntry>> = {
  bartek: {
    morning: { position: { x: -4, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: -4, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    evening: { position: { x: -4, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
  },
  klaudia: {
    morning: { position: { x: 4, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 4, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  marek: {
    morning: { position: { x: -4, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: -4, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  zosia: {
    morning: { position: { x: 4, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "meeting" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  pawel: {
    morning: { position: { x: 0, y: 0, z: -5.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 7.5, y: 0, z: -7.5 }, face: 0, state: "coffee" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  kasia: {
    morning: { position: { x: 7, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 7, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  tomek: {
    morning: { position: { x: -7, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: -7, y: 0, z: -2.4 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  ania: {
    morning: { position: { x: 7, y: 0, z: 0.6 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 7, y: 0, z: 0.6 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  janusz: {
    morning: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
    afternoon: { position: { x: 0, y: 0, z: -8 }, face: Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: -8 }, face: Math.PI / 2, state: "at-desk" },
  },
  burek: {
    morning: { position: { x: -7, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 7.5, y: 0, z: -7.5 }, face: 0, state: "coffee" },
    evening: { position: { x: -7, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
  },
  grazyna: {
    morning: { position: { x: 7, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 7, y: 0, z: 3.6 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  maciek: {
    morning: { position: { x: -3, y: 0, z: -6.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  przemek: {
    morning: { position: { x: 3, y: 0, z: -6.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 3, y: 0, z: -6.4 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
};
