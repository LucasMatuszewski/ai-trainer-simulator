/**
 * Shared types for AI Trainer Simulator.
 * All game state is JSON-serializable. Save format is GameState under localStorage key `aitrainer:save:v1`.
 */

export type NpcId = "bartek" | "klaudia" | "marek" | "zosia" | "pawel" | "kasia" | "tomek" | "ania" | "janusz" | "burek" | "grazyna" | "maciek" | "przemek";

export type SpecializationId = "frontend" | "backend" | "devops" | "ai" | "generalist";
export type TraitId = "coffee-fueled" | "linkedin-influencer" | "debugger" | "wing-it";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface Character {
  name: string;
  specialization: SpecializationId;
  trait: TraitId;
}

export interface GameStats {
  credibility: number;
  caffeine: number;
  patience: number;
  focus: number;
}

export type Effect =
  | { type: "add-cash"; target?: string; delta: number }
  | { type: "spend-cash"; target?: string; delta: number }
  | { type: "add-stat"; target: "credibility" | "caffeine" | "patience" | "focus"; delta: number }
  | { type: "add-relationship"; target: string; delta: number }
  | { type: "set-flag"; target: string; delta: boolean | number }
  | { type: "increment-total"; target: "cashEarned" | "miniGamesWon" | "miniGamesLost" | "dialoguesFinished"; delta: number };

export interface DialogueOption {
  text: string;
  nextNodeId: string;
  effects?: Effect[];
}

export interface DialogueNode {
  id: string;
  text: string;
  options?: DialogueOption[];
  next?: string; // auto-advance to a node id (no options shown)
  effects?: Effect[]; // applied when the node is entered
}

export interface DialogueTree {
  /** Map of node id to node. Root is "greeting". */
  nodes: Record<string, DialogueNode>;
  /**
   * Predicate: returns true if this tree is available for the given player state.
   * If undefined, always available.
   */
  available?: (state: Readonly<GameState>) => boolean;
}

export interface NPC {
  id: NpcId;
  name: string;
  role: string;
  emoji: string; // used for the portrait placeholder until real PNG art is added
  position: { x: number; y: number; z: number };
  triggerRadius: number;
  /**
   * Visual gender. Drives the silhouette in the 3D scene (a future
   * task will add a real gendered mesh; for now, the placeholder box
   * is the same for both, but this field is here so the mesh can
   * read it). "dog" is a separate marker, not a humanoid.
   */
  gender: "male" | "female" | "dog";
  /** Map of state predicate name to dialogue tree id. The first matching tree wins. */
  dialogues: Record<string, DialogueTree>;
}

export interface EasterEgg {
  id: string;
  kind: "console" | "poster" | "hidden-object";
  /** A message to log / show when the egg triggers. */
  message: string;
  /** Predicate: should this egg fire for the given state? */
  available?: (state: Readonly<GameState>) => boolean;
}

export interface GameState {
  saveVersion: 1;
  cash: number;
  day: number;
  timeOfDay: TimeOfDay;
  character: Character;
  stats: GameStats;
  npcRelationships: Record<string, number>;
  flags: Record<string, boolean>;
  inventory: string[];
  /** Day when the current bankruptcy countdown started (0 = not bankrupt). */
  bankruptcyStartedOnDay: number;
  /** Cumulative stats for the end-of-game summary. */
  totals: {
    cashEarned: number;
    miniGamesWon: number;
    miniGamesLost: number;
    dialoguesFinished: number;
  };
}

export type Action =
  | { type: "add-cash"; amount: number; reason?: string }
  | { type: "spend-cash"; amount: number; reason?: string }
  | { type: "set-stat"; stat: keyof GameStats; value: number }
  | { type: "add-stat"; stat: keyof GameStats; delta: number }
  | { type: "set-relationship"; npcId: string; value: number }
  | { type: "add-relationship"; npcId: string; delta: number }
  | { type: "set-flag"; flag: string; value: boolean }
  | { type: "advance-time" }
  | { type: "start-bankruptcy-countdown" }
  | { type: "increment-total"; key: keyof GameState["totals"] }
  | { type: "load"; state: GameState }
  | { type: "reset" };
