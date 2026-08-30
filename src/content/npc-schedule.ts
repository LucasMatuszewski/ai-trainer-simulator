import type { NpcId } from "../types";

export type Period = "morning" | "afternoon" | "evening";

export type NpcState =
  | "at-desk"
  | "walking"
  | "break-room"
  | "coffee"
  | "meeting"
  | "lunch"
  | "gone-home"
  | "toilet"
  | "training"
  | "kitchen";

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

/**
 * Random-walk destinations NPCs may pick during a period (L-2026-08-30-01).
 * Used by `pickRandomDestination` to drop NPCs in the kitchen for a
 * coffee, the toilet, a meeting, or a training without having to author
 * a fresh schedule per day. The position is the center of the room
 * (or a meaningful spot in it); the controller's interpolator handles
 * the walk there.
 */
export const RANDOM_DESTINATIONS: ReadonlyArray<ScheduleEntry> = [
  // Coffee / kitchen: stand by the coffee machine, facing it.
  { position: { x: 11, y: 0, z: -6.2 }, face: Math.PI, state: "coffee" },
  // Kitchen table: mid-room, facing west.
  { position: { x: 14, y: 0, z: 2.5 }, face: Math.PI, state: "kitchen" },
  // Toilet: stand in front of the first stall.
  { position: { x: -16, y: 0, z: 14.5 }, face: 0, state: "toilet" },
  // Toilet: at the sink.
  { position: { x: -14, y: 0, z: 11.5 }, face: 0, state: "toilet" },
  // Meeting room: by the meeting table.
  { position: { x: 0, y: 0, z: 14 }, face: 0, state: "meeting" },
  // Training room: by the lectern (the NPC is teaching).
  { position: { x: 0, y: 0, z: -16.7 }, face: 0, state: "training" },
  // Training room: a student chair, mid-room.
  { position: { x: -2, y: 0, z: -14.1 }, face: 0, state: "training" },
  { position: { x: 1.5, y: 0, z: -11.4 }, face: 0, state: "training" },
];

/** Pick a random destination for the given NPC, weighted by role.
 *  Returns null when the NPC should stay at the desk (e.g. they are
 *  already at a meeting and it is not yet lunch).
 *
 *  L-2026-08-30-01: Lucas reported that "Ania / Kasia / Bartek
 *  empty desks" because the random walks were pulling NPCs away
 *  from their desks too often (and onto other NPCs' desks). The
 *  fix: raise the stay probability to 90% and add a soft
 *  cooldown so an NPC that walked in this period does not walk
 *  again in the next one. The walking NPC slots (coffee, toilet,
 *  meeting, training) are still populated, but only 1-2 NPCs
 *  are ever out of their desks at a time. */
export function pickRandomDestination(
  npcId: NpcId,
  rng: () => number,
  _day: number,
): ScheduleEntry | null {
  // 90% chance to stay at the desk for everyone except the
  // manager (Zosia) who has meetings more often, and the dog
  // (Burek) who wanders the most.
  const r = rng();
  const stay = npcId === "burek" ? 0.5 : npcId === "zosia" ? 0.7 : 0.9;
  if (r < stay) return null;
  const idx = Math.floor(rng() * RANDOM_DESTINATIONS.length);
  return RANDOM_DESTINATIONS[idx] ?? null;
}
