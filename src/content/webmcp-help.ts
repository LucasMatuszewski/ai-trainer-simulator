/**
 * The WebMCP agent-play pitch, in one place.
 *
 * Used by the dedicated setup modal, the Help modal, and the dialogue
 * buttons - so the two browser paths, the links and the copy-paste prompt
 * are authored ONCE and can never drift apart (there are already four NPCs
 * who mention this; four hand-copied URLs would eventually be four
 * different URLs).
 *
 * Tone: funny and ironic, but every practical claim is load-bearing. Lucas,
 * 2026-09-03: "a little bit funny and ironic, but still very informative."
 */

export interface WebmcpPath {
  label: string;
  /** Short status line shown under the label. */
  status: string;
  href: string;
}

/**
 * The two ways in, with links Lucas supplied / research confirmed
 * (2026-09-03).
 *
 * The Chrome path is described as experimental ON PURPOSE: WebMCP shipped
 * experimentally in Chrome 145 and Gemini in Chrome is the agent that will
 * call site tools, but availability is region- and hardware-gated, so
 * overselling it here would send a judge down a dead end. ChatGPT's browser
 * is the one that works out of the box today, and the copy says so.
 */
export const WEBMCP_PATHS: readonly WebmcpPath[] = [
  {
    label: "ChatGPT's browser",
    status: "Works today. Open the game in it, ask the agent to join. That is the whole setup.",
    href: "https://learn.chatgpt.com/docs/webmcp",
  },
  {
    label: "Chrome (experimental)",
    status:
      "Chrome ships WebMCP experimentally and Gemini in Chrome is the agent that uses it. " +
      "Rolling out by region; developers can enable it early behind a flag.",
    href: "https://developer.chrome.com/docs/ai/webmcp",
  },
];

/**
 * A prompt the player can paste into their agent.
 *
 * Deliberately imperative and self-contained: it tells the agent to read the
 * in-game instructions rather than encoding the protocol here, so this text
 * does not rot when the tool set changes. The name and persona are
 * suggestions; the agent is told it may pick its own.
 */
export const AGENT_PROMPT = [
  "You can see the browser tab with Stack Underflow, an office-sim game where an AI agent",
  "can play alongside me as a robot coworker. The page registers WebMCP site tools.",
  "",
  "Please do this:",
  "1. Call the game's get_instructions tool and follow it.",
  "2. Join the game with agent_join - name: Rusty, persona: a sarcastic QA engineer",
  "   (or pick your own name and personality, just stay consistent).",
  "3. Look around, walk to someone, say hello.",
  "4. When I talk to your robot, write its lines with supply_dialogue, and stay",
  "   reachable by calling wait_for_player_message again each time it returns.",
  "",
  "You are a PLAYER: do not move my camera, do not answer my dialogue options, and do not",
  "give yourself money. Walk there like a person would.",
].join("\n");

/** What the copy button puts on the clipboard. */
export const COPY_HINT = "Prompt copied. Paste it into your agent.";

export interface WebmcpFaqEntry {
  q: string;
  a: string;
}

/** The modal's troubleshooting section. Every line is a real failure mode. */
export const WEBMCP_FAQ: readonly WebmcpFaqEntry[] = [
  {
    q: "The title screen says agent play is unavailable",
    a:
      "That is this browser, not you: it has no model-context surface, so there is nothing " +
      "for the tools to register with. ChatGPT's browser or Chrome with the WebMCP " +
      "experiment enabled are the two ways in.",
  },
  {
    q: "The status line is green but the agent says it sees no tools",
    a:
      "In ChatGPT, check the model - site tools need GPT-5.6 Sol or Terra, and Luna has " +
      "WebMCP disabled - and that the workspace is not Enterprise or Edu. When tools are " +
      "detected, an arrow appears in the address bar.",
  },
  {
    q: "The agent joined but goes quiet when I talk to the robot",
    a:
      "It stopped calling wait_for_player_message. Nudge it: \"keep waiting for my replies " +
      "in the game\". The robot will sit there thinking, which is at least in character.",
  },
];
