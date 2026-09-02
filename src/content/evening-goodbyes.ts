/**
 * C-62: evening "good bye" bubbles - same mechanics as the morning
 * greetings (C-56), mirrored for the end of the day. When an NPC's
 * departure time comes (see beginEveningDepartures in the controller)
 * they drop one goodbye line and walk out through the meeting room.
 *
 * Shape mirrors morning-greetings.ts: a per-NPC pool first, then a
 * per-category fallback, then the generic pool. Lines are <= 72 chars,
 * plain ASCII; Burek speaks in the C-61 dog markers.
 */

export const GOODBYE_BY_NPC: Record<string, ReadonlyArray<string>> = {
  // IT (Bartek, Marek, Tomek)
  bartek: [
    "Going home. Do not deploy anything.",
    "Leaving. The build is your problem now.",
    "Night. If prod calls, it is lying.",
  ],
  marek: [
    "Yaml is done for today.",
    "Leaving. Backups are running.",
    "Night. The cluster sleeps.",
  ],
  tomek: [
    "See you. Push after 5 is a myth.",
    "Going home. Works on my machine.",
    "Night. Stack Overflow will miss me.",
  ],
  // CTO (Maciek)
  maciek: [
    "Synergy is over for today.",
    "Leaving. Cut the costs without me.",
    "Night. Think about the deck.",
  ],
  // CEO (Dawid) - he never leaves, but the pool exists.
  dawid: [
    "The vision goes home with me.",
    "Big day tomorrow. Bigger today.",
    "Night. Stay hungry. Not here.",
  ],
  // Management (Zosia)
  zosia: [
    "Status: going home.",
    "Leaving. Calendar is finally empty.",
    "Tomorrow's meetings are tomorrow's.",
  ],
  // Marketing (Ania, Klaudia)
  ania: [
    "The engagement survives the night.",
    "Leaving. The brand is safe.",
    "Night. Content sleeps too.",
  ],
  klaudia: [
    "Going offline. The feed can wait.",
    "Leaving. Personal brand is charging.",
    "Night. Stories expire. I do not.",
  ],
  // HR (Kasia)
  kasia: [
    "Culture fit achieved. Home.",
    "Leaving. 300 applicants tomorrow.",
    "Night. The pipeline is closed.",
  ],
  // Accounting (Grazyna)
  grazyna: [
    "The books are closed. Mostly.",
    "Leaving. Expenses sleep too.",
    "Night. The audit can wait.",
  ],
  // Sales (Przemek)
  przemek: [
    "Pipeline can wait until 9.",
    "Leaving. The wall is watched.",
    "Night. Tomorrow we close. Probably.",
  ],
  // Facilities (Janusz)
  janusz: [
    "The floor is mopped. Goodnight.",
    "Leaving. The bots take the night shift.",
    "Night. The closet is locked.",
  ],
  // Intern (Pawel)
  pawel: [
    "My first day is over. I think.",
    "Leaving. If I am rehired tomorrow.",
    "Night. I will google what I did.",
  ],
  // C-64: the receptionist. She is the last to leave (her
  // evening schedule row is at-desk, not gone-home), so these
  // are only used if the day does end before she does.
  renata: [
    "Welcome desk is closed. Tomorrow, then.",
    "Going home. Keys are in the drawer.",
    "Night. The printer is still jammed.",
  ],
};

const GENERIC: ReadonlyArray<string> = [
  "See you tomorrow.",
  "Finally. Home.",
  "My sofa misses me.",
  "Same time tomorrow. Sadly.",
  "Lights off. Dreams on.",
];

const DOG: ReadonlyArray<string> = [
  "[ears down]\n(bye. feed me first.)",
  "[sleeps]\n(the office is yours now)",
];

function pickFromPool<T>(pool: ReadonlyArray<T>, rng: () => number): T {
  return pool[Math.floor(rng() * pool.length) % pool.length]!;
}

export function pickEveningGoodbye(npcId: string, rng: () => number): string {
  const npcPool = GOODBYE_BY_NPC[npcId];
  if (npcPool !== undefined && npcPool.length > 0) return pickFromPool(npcPool, rng);
  if (npcId === "burek") return pickFromPool(DOG, rng);
  return pickFromPool(GENERIC, rng);
}
