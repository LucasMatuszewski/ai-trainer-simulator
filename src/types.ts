/**
 * Shared types for AI Trainer Simulator.
 * All game state is JSON-serializable. Save format is GameState under localStorage key `aitrainer:save:v1`.
 */

// C-64: added "renata" - the receptionist / office manager. She is
// the tutorial host and the standing help centre (Lucas: "we should
// use receptionist as the first guide and tutorial at the game start").
export type NpcId = "bartek" | "klaudia" | "marek" | "zosia" | "pawel" | "kasia" | "tomek" | "ania" | "janusz" | "burek" | "grazyna" | "maciek" | "przemek" | "dawid" | "renata";

export type SpecializationId = "frontend" | "backend" | "devops" | "ai" | "generalist";
export type TraitId = "coffee-fueled" | "linkedin-influencer" | "debugger" | "wing-it";

export type TimeOfDay = "morning" | "lunch" | "afternoon" | "evening";

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
  /**
   * Stable identifier for the option. Used by the dialogue renderer
   * (with the per-NPC memory in `dialogue-memory.ts`) to suppress
   * options the player has already answered (L-2026-08-30-02: "NPC
   * must NEVER repeat a dialogue the player has already answered").
   * If omitted, the renderer falls back to `nextNodeId` as the
   * identifier — but that collides if two options in the same node
   * point to the same next node, so it is best to always set this.
   */
  id?: string;
}

/** An external link offered alongside a dialogue line. */
export interface DialogueLink {
  text: string;
  href: string;
}

/**
 * A button rendered under a dialogue line.
 *
 * Deliberately DATA, not functions: dialogue content is serializable,
 * testable and diffable, and every action we need is a named kind. If a
 * fourth kind ever appears, it gets a field here rather than a closure in
 * the content tree.
 */
export interface DialogueButton {
  text: string;
  /** Open the named in-game modal. Currently only "webmcp". */
  modal?: "webmcp";
  /** Copy the ready-made agent prompt to the clipboard. */
  copyPrompt?: boolean;
}

export interface DialogueNode {
  id: string;
  text: string;
  /**
   * Optional clickable link shown under the line. Added so Renata can point
   * the player at the WebMCP setup docs (Lucas, 2026-09-03) - a URL read
   * aloud in a speech line is not something anyone is going to retype.
   * Opens in a new tab; the dialogue stays where it is.
   */
  link?: DialogueLink;
  /** Any number of links; rendered under the line after `link`. */
  links?: DialogueLink[];
  /** Action buttons; rendered after the links. */
  buttons?: DialogueButton[];
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

/**
 * C-63: the visual "character sheet" tones. These are NAMES, not hex,
 * so `content/npcs.ts` reads as character authoring and stays free of
 * three.js; `engine/npc-mesh.ts` owns the name -> color mapping.
 */
export type SkinTone = "porcelain" | "fair" | "olive" | "tan" | "brown" | "deep";
export type HairTone = "black" | "brown" | "auburn" | "blond" | "grey" | "dyed";
export type ShirtTone =
  | "navy" | "charcoal" | "forest" | "burgundy" | "mustard" | "teal" | "violet" | "rust";

/**
 * C-63 (Lucas: "maybe set it for every person together with other
 * details about this person? Now everybody has exact same skin tone").
 * Every field is optional: an NPC with no authored tone falls back to a
 * deterministic hash of their id, so the office is never uniform even
 * before anyone hand-picks a look.
 */
export interface NpcAppearance {
  skin?: SkinTone;
  hair?: HairTone;
  shirt?: ShirtTone;
}

export interface NPC {
  id: NpcId;
  name: string;
  role: string;
  emoji: string; // used for the portrait placeholder until real PNG art is added
  position: { x: number; y: number; z: number };
  /**
   * World rotation of the NPC marker, in radians around the Y axis.
   * The mesh's "front" is +Z in local space (the eyes look toward
   * +Z); with rotation.y = 0 the NPC looks +Z, with rotation.y = π
   * the NPC looks -Z. Defaults to π in scene.ts for the historic
   * "face the monitor which sits on the -Z side of the desk" layout.
   */
  rotationY?: number;
  /** Movement speed in world metres per second. */
  walkSpeed: number;
  triggerRadius: number;
  /**
   * Visual gender. Drives the silhouette in the 3D scene (a future
   * task will add a real gendered mesh; for now, the placeholder box
   * is the same for both, but this field is here so the mesh can
   * read it). "dog" is a separate marker, not a humanoid.
   */
  gender: "male" | "female" | "dog";
  /**
   * C-63: this person's skin / hair / shirt tones, authored here next
   * to their name, role and gender. Ignored for the dog.
   */
  appearance?: NpcAppearance;
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

/**
 * C-58: the player's last world position + view rotation, persisted with the
 * save so Continue (after a page reload) drops the player where they stood.
 * y is omitted - the player always walks the floor (playerStart.y).
 */
export interface PlayerPose {
  x: number;
  z: number;
  /** View yaw in radians around Y (what the player sees, horizontal). */
  yaw: number;
  /** View pitch in radians (what the player sees, up/down tilt). */
  pitch: number;
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
  /**
   * C-58: present in saves once the player has moved; absent in fresh and
   * pre-C-58 saves (old saves stay valid under saveVersion 1). A fresh game
   * (reset) has no pose, so New Game always spawns at the office door.
   */
  playerPose?: PlayerPose;
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
  /** C-58: persist the player's live pose (throttled by the frame loop). */
  | { type: "set-player-pose"; pose: PlayerPose }
  | { type: "load"; state: GameState }
  | { type: "reset" };
