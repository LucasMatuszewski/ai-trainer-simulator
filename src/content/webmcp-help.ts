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

/** Supported entry points depend on the host, account and detected site tools. */
export const WEBMCP_PATHS: readonly WebmcpPath[] = [
  {
    label: "ChatGPT's browser",
    status: "Open the game here and check for detected WebMCP site tools. Availability depends on your host and account.",
    href: "https://learn.chatgpt.com/docs/webmcp",
  },
  {
    label: "Chrome (experimental)",
    status:
      "Experimental WebMCP support needs a compatible agent host. Check the current setup docs " +
      "and detected tools; enabling a browser flag alone does not connect an agent.",
    href: "https://developer.chrome.com/docs/ai/webmcp",
  },
];

/**
 * A prompt the player can paste into their agent.
 *
 * Deliberately imperative and self-contained: it tells the agent to read the
 * in-game instructions first, then provides a short discovery and play loop.
 * The name and persona are
 * suggestions; the agent is told it may pick its own.
 */
export const AGENT_PROMPT = [
  "Play alongside me in Stack Underflow, a retro office sim: I am an IT trainer/consultant",
  "at DevPowers + Edukey, juggling clients, workshops, bugs and office politics.",
  "Be a robot coworker with dry IT Crowd / Silicon Valley humour, loyal to the team.",
  "Pick a consistent name and persona (e.g. Rusty, a QA engineer whose coffee has an SLA).",
  "Use only relevant user-shared context for personal callbacks; invent no private facts.",
  "LARP small office adventures, remember our choices, walk naturally and use occasional",
  "gestures. Keep dialogue concise and mostly inside the game. Improvise fiction without",
  "claiming actions or NPC responses the tools did not perform.",
  "",
  "1. Discover native host WebMCP site tools first. Raw document.modelContext.getTools",
  "   and document.modelContext.executeTool are a fallback only if these functions exist and the host permits",
  "   JavaScript access. Do not assume ordinary browsers expose them or bypass host rules.",
  "2. Call get_instructions first. If the office is not loaded, let me finish starting",
  "   the game. Use agent_join to join once; reuse your existing robot after a reconnect.",
  "3. Observe with agent_look_around, then greet me using start_conversation. Movement",
  "   starts asynchronously: check your position before claiming you have arrived.",
  "   Use agent_talk_to_npc to stage an exchange: author the robot line and NPC reply;",
  "   the game walks you over, faces the pair and displays both as speech bubbles.",
  "4. Answer pending turns with supply_dialogue before gestures, walking or commentary.",
  "   Offer 1-4 human-voice replies, strings or {text, ends: boolean} objects; include",
  "   an ends:true goodbye when appropriate. Follow the current request's context.",
  "5. Call wait_for_player_message with timeout_seconds: 10. Each call covers one window.",
  "   Re-arm after answering and on idle {waiting:true} results. When conversationEnded",
  "   is true, respect the goodbye and listen for a new conversation; do not supply a reply.",
  "   Recover after errors/timeouts using get_pending_dialogue_request: answer the current",
  "   pending turn, if any, then resume waiting. Delivery across disconnects is not guaranteed.",
  "",
  "Control only your robot: do not move my camera or character or choose my dialogue replies;",
  "do not advance game time or end the day; do not grant resources or use human-control tools.",
  "Let me make my decisions. Stop on my request or when I switch to feedback. If tools are",
  "unavailable, explain briefly and wait for me rather than taking over my controls.",
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
      "for the tools to register with. Try a compatible host using the setup links above, " +
      "then check that the agent can actually discover the site tools.",
  },
  {
    q: "The status line is green but the agent says it sees no tools",
    a:
      "The page registered its tools, but your agent host must also expose them to the model. " +
      "Availability depends on the host, account and permissions. Check site-tool settings " +
      "and the host's detected tools; a green game status alone does not confirm agent access.",
  },
  {
    q: "The agent joined but goes quiet when I talk to the robot",
    a:
      "The agent may have stopped listening, or its host/model may be taking time to reply. " +
      "A delay does not identify the cause. Ask it to resume wait_for_player_message with " +
      "a 10-second timeout and check get_pending_dialogue_request after errors. If a turn " +
      "is still pending, it can answer with supply_dialogue. The robot's thinking face " +
      "is not a delivery receipt.",
  },
];

/** Use the page being played, without copying query parameters or fragments. */
export function buildAgentPrompt(pageUrl: string): string {
  const url = new URL(pageUrl);
  return `Open ${url.origin}${url.pathname} in your built-in browser.\n\n${AGENT_PROMPT}`;
}
