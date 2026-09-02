/**
 * C-64: Renata's dialogue trees.
 *
 * The receptionist is the player's first guide and the standing help
 * centre (Lucas: "we should use receptionist as the first guide and
 * tutorial at the game start! we need audio for this, and we can do
 * some kind of tutorial and FAQ from this first dialogue, she can be
 * some kind of Help Center for a player").
 *
 * Two trees, merged into DIALOGUES.renata in dialogues.ts:
 *
 *   - `first-meeting`: the tutorial. Plays the first time the player
 *     meets Renata, and on-demand from the FAQ menu. 8-12 lines of
 *     TTS-able speech; each one is a single spoken sentence or two
 *     because the audio wave generates voice for them.
 *
 *   - `default`: the standing FAQ / help-centre menu. Re-enterable
 *     (every answer node has a "back to the menu" option, plus a
 *     direct exit so the first-option-walking test terminates).
 *
 * Voice: IT Crowd / Silicon Valley, same as the rest of the cast.
 * Renata is the unflappable hub of the office. She has been here
 * longer than the CEO. Warm to the player's face, quietly devastating
 * about everyone else.
 */

import type { DialogueTree } from "../types";

/**
 * Stable option id helpers. The dialogue memory suppresses already-
 * picked options keyed by id, and falls back to `nextNodeId` which
 * collides when two options route to the same node (L-2026-08-30-02).
 * Every option below sets a unique `id`.
 */
const FM = "fm"; // first-meeting option prefix
const FAQ = "faq"; // default option prefix

export const RENATA_DIALOGUES: Record<string, DialogueTree> = {
  /**
   * Tutorial: plays the first time the player meets Renata. Each
   * node's text is a single short spoken sentence or two. 8-12 lines
   * (the spec), plus the auto-advance wrapper and a _end sentinel.
   */
  "first-meeting": {
    nodes: {
      greeting: {
        id: "greeting",
        text: "Hi, you must be the new trainer. I am Renata, I run this place. Welcome to your first day.",
        options: [
          {
            text: "Nice to meet you. Where do I start?",
            id: `${FM}-intro`,
            nextNodeId: "intro",
            effects: [
              { type: "set-flag", target: "renata-tut-asked-intro", delta: 1 },
              { type: "add-relationship", target: "renata", delta: 5 },
            ],
          },
          {
            text: "I have been here a week already.",
            id: `${FM}-already`,
            nextNodeId: "already",
            effects: [
              { type: "set-flag", target: "renata-tut-asked-intro", delta: 1 },
            ],
          },
        ],
      },
      intro: {
        id: "intro",
        text: "This is a one-day crash course in not getting fired. I will talk, you walk. You can press Z to skip me anytime.",
        options: [
          { text: "How do I move?", id: `${FM}-walk`, nextNodeId: "walk" },
          { text: "How do I look around?", id: `${FM}-look`, nextNodeId: "look" },
        ],
      },
      already: {
        id: "already",
        text: "A week. Good. Then you know the coffee is bad and the printer is worse. Stay for the controls anyway, the new hires keep walking into the glass wall.",
        next: "walk",
      },
      walk: {
        id: "walk",
        text: "Walk with WASD or your arrow keys. Shift makes you run. The office fits in one screen, so you will not get lost. Probably.",
        options: [
          { text: "How do I look around?", id: `${FM}-look-2`, nextNodeId: "look" },
          { text: "How do I talk to people?", id: `${FM}-talk`, nextNodeId: "talk" },
        ],
      },
      look: {
        id: "look",
        text: "Hold the right mouse button to look around, like a first-person game. On a trackpad, press the Space bar to toggle mouse-look on and off. Press Escape to let go.",
        options: [
          { text: "How do I talk to people?", id: `${FM}-talk-2`, nextNodeId: "talk" },
          { text: "How do I end my day?", id: `${FM}-end`, nextNodeId: "end" },
        ],
      },
      talk: {
        id: "talk",
        text: "Click a colleague on the right side of the screen, the roster, and your trainer will walk over to them and start a conversation. Or just walk up to anyone and click them.",
        options: [
          { text: "How do I end my day?", id: `${FM}-end-2`, nextNodeId: "end" },
          { text: "Who is who around here?", id: `${FM}-cast`, nextNodeId: "cast" },
        ],
      },
      end: {
        id: "end",
        text: "When you are done for the day, press Z. The HUD will roll up your cash and stats, and the office will go home. Tomorrow, we do it again.",
        options: [
          { text: "Who is who around here?", id: `${FM}-cast-2`, nextNodeId: "cast" },
          { text: "I am ready. Thanks, Renata.", id: `${FM}-ready`, nextNodeId: "ready" },
        ],
      },
      cast: {
        id: "cast",
        text: "Bartek is the one who hands out contracts. Zosia runs the meetings. Tomek is the intern. Marek does not want to be disturbed. Everyone else, you will figure out.",
        options: [
          { text: "What are these stats on the HUD?", id: `${FM}-stats`, nextNodeId: "stats" },
          { text: "I am ready. Thanks, Renata.", id: `${FM}-ready-2`, nextNodeId: "ready" },
        ],
      },
      stats: {
        id: "stats",
        text: "Four stats. Credibility wins you contracts. Caffeine keeps you focused. Patience keeps dialogue options open. Focus wins the debug games. Drink coffee, avoid Zosia, you will be fine.",
        options: [
          { text: "I am ready. Thanks, Renata.", id: `${FM}-ready-3`, nextNodeId: "ready" },
        ],
      },
      ready: {
        id: "ready",
        text: "That is the orientation. I will be at this desk all day. Come back any time you have a question, even the stupid ones. I have heard them all.",
        effects: [{ type: "set-flag", target: "renata-tut-finished", delta: 1 }],
        next: "_end",
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },

  /**
   * Default: the standing FAQ / help-centre menu. Re-enterable: every
   * answer node has a "back to the menu" option. The first option on
   * every answer node is a direct exit so the first-option-walking
   * test (terminates in 10 hops) gets a clean termination path.
   */
  default: {
    nodes: {
      greeting: {
        id: "greeting",
        text: "Hi again. What can I help you with?",
        options: [
          { text: "Where is everyone?", id: `${FAQ}-where`, nextNodeId: "where" },
          { text: "How do I make money?", id: `${FAQ}-money`, nextNodeId: "money" },
          { text: "What are these stats?", id: `${FAQ}-stats`, nextNodeId: "stats" },
          { text: "Who is who around here?", id: `${FAQ}-who`, nextNodeId: "who" },
          { text: "Where is the toilet?", id: `${FAQ}-toilet`, nextNodeId: "toilet" },
          { text: "Run me through the controls again.", id: `${FAQ}-controls`, nextNodeId: "controls" },
          { text: "I am good, thanks.", id: `${FAQ}-bye`, nextNodeId: "_end" },
        ],
      },
      where: {
        id: "where",
        text: "In the main office. Zosia runs the morning meeting in the room by the kitchen. The CEO, Dawid, stays in his office. The others are at their desks, on coffee, or in the toilet. Janusz mops around all of them.",
        options: [
          { text: "Thanks, that is all I needed.", id: `${FAQ}-where-thanks`, nextNodeId: "_end" },
          { text: "Back to the menu.", id: `${FAQ}-where-back`, nextNodeId: "greeting" },
        ],
      },
      money: {
        id: "money",
        text: "Bartek is the one who sells you to clients. Take the contracts. Each one pays cash when you finish. Rent is 100 zl a day, so spend less than you earn. Grazyna watches the books. Do not make her angry.",
        options: [
          { text: "Thanks, that is all I needed.", id: `${FAQ}-money-thanks`, nextNodeId: "_end" },
          { text: "Back to the menu.", id: `${FAQ}-money-back`, nextNodeId: "greeting" },
        ],
      },
      stats: {
        id: "stats",
        text: "Credibility wins contracts. Caffeine keeps you focused. Patience keeps dialogue options open. Focus wins the debug mini-games. Coffee raises caffeine. Zosia lowers patience. Choose wisely.",
        options: [
          { text: "Thanks, that is all I needed.", id: `${FAQ}-stats-thanks`, nextNodeId: "_end" },
          { text: "Back to the menu.", id: `${FAQ}-stats-back`, nextNodeId: "greeting" },
        ],
      },
      who: {
        id: "who",
        text: "Bartek is sales. Zosia is management. Tomek is the intern. Marek is DevOps and wants to be left alone. Klaudia is on LinkedIn. Ania does marketing. Kasia recruits. Maciek is CTO. Przemek sells. Grazyna does money. Janusz mops. Burek is the dog.",
        options: [
          { text: "Thanks, that is all I needed.", id: `${FAQ}-who-thanks`, nextNodeId: "_end" },
          { text: "Back to the menu.", id: `${FAQ}-who-back`, nextNodeId: "greeting" },
        ],
      },
      toilet: {
        id: "toilet",
        text: "Out of the kitchen, through the door on the right. Second door on the left. If it is locked, that is Janusz. He is allowed.",
        options: [
          { text: "Thanks, that is all I needed.", id: `${FAQ}-toilet-thanks`, nextNodeId: "_end" },
          { text: "Back to the menu.", id: `${FAQ}-toilet-back`, nextNodeId: "greeting" },
        ],
      },
      controls: {
        id: "controls",
        text: "WASD to walk, Shift to run, right mouse to look around, Space toggles mouse-look on a trackpad, click the roster to talk to someone, Z to end the day. Escape closes any open dialogue.",
        options: [
          { text: "Thanks, that is all I needed.", id: `${FAQ}-controls-thanks`, nextNodeId: "_end" },
          { text: "Back to the menu.", id: `${FAQ}-controls-back`, nextNodeId: "greeting" },
        ],
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },
};
