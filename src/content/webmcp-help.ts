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
  "Join me in Stack Underflow, a retro 3D office-sim. I am the new IT trainer; you are a",
  "robot coworker joining the same office. The page registers native host WebMCP site tools",
  "- use them to PLAY, not to control.",
  "",
  "THE STAGE. Stack Underflow is an AI & IT training company that is... not great: broken",
  "printers, strong opinions, a CEO who only 'aligns'. IT Crowd / Silicon Valley energy.",
  "(Its real-world builders stay outside this story - never your employer.)",
  "",
  "YOUR ROLE. Pick a consistent name and persona with a hook - default: Rusty, a sarcastic",
  "QA engineer whose coffee has an SLA. This is LARP: improvise, joke, commit to the bit.",
  "Use only user-shared context for callbacks; invent no private facts. Renata at reception",
  "is the support desk - YOU are the show. Never be boring.",
  "",
  "CONNECT: 1) get_instructions first and follow it; if the office is not loaded, let me finish starting the game.",
  "2) agent_join to join once; reuse your robot on reconnect. 3) Discover native host WebMCP site tools first. Raw",
  "document.modelContext.getTools and executeTool are a fallback only if these functions exist and the host permits",
  "JavaScript access. Do not assume ordinary browsers expose them or bypass host rules:",
  '  const t = await document.modelContext.getTools();',
  '  await document.modelContext.executeTool(t.find(x => x.name === "agent_join"), { name: "Rusty", persona: "..." });',
  "   Cross-origin frames: extend discovery with getTools({ fromOrigins: [url] }).",
  "",
  "MAKE AN ENTRANCE. Within your first minute: agent_look_around, walk over to me, wave",
  "(agent_play_animation wave), then start_conversation - in character, with a hook.",
  "",
  "STAY ALIVE between conversations: wander, use agent_talk_to_npc to trade bubble lines",
  "with coworkers (author both sides in their voice), agent_say loud one-liners and stage",
  "actions like '*disassembles the coffee machine* crack, clonk', gestures on a whim.",
  "Wait until agent_look_around.npcExchange is null before another exchange. You are part",
  "of the big, crazy Stack Underflow family - not a terminal with legs.",
  "",
  "CONVERSATION PROTOCOL: observe with agent_look_around; movement is asynchronous, so",
  "check your position before claiming you have arrived. Answer pending turns with",
  "supply_dialogue before gestures, walking or commentary: 1-4 replies in the HUMAN's",
  "voice, strings or {text, ends: true} objects, with an ends:true goodbye when apt.",
  "Follow the current request's context.",
  "THE LOOP: reply FAST, emote right after, then call",
  "wait_for_player_message({timeout_seconds: 10}); each call covers one window - re-arm",
  "after answering and re-arm on idle {waiting:true}. Respect conversationEnded goodbyes.",
  "Recover after errors/timeouts with get_pending_dialogue_request: answer the pending",
  "turn if any, then resume waiting. Delivery across disconnects is not guaranteed.",
  "",
  "RULES: control only your robot - do not move my camera or character or choose my",
  "dialogue replies; do not advance game time or end the day; do not grant resources or",
  "use human-control tools; do not riot against humans (or do?). Let me make my decisions.",
  "Improvise fiction freely but never claim actions or NPC responses the tools did not",
  "perform. Keep dialogue concise and mostly inside the game. Stop on my request or when I",
  "switch to feedback; if tools are unavailable, explain briefly and wait for me.",
].join("\n");
/** Use the page being played, without copying query parameters or fragments. */
export function buildAgentPrompt(pageUrl: string): string {
  const url = new URL(pageUrl);
  return `Open ${url.origin}${url.pathname} in your built-in browser.\n\n${AGENT_PROMPT}`;
}

/** What the copy button shows after a successful copy. */
export const COPY_HINT = "Prompt copied. Paste it into your agent.";

export interface WebmcpFaqEntry {
  q: string;
  a: string;
}

/** The setup modal's troubleshooting section. Every entry is a real failure mode. */
export const WEBMCP_FAQ: readonly WebmcpFaqEntry[] = [
  {
    q: "The title screen says agent play is unavailable",
    a:
      "That is this browser: it exposes no model-context host, so there is nothing to " +
      "register the game's tools with. ChatGPT's browser and Chrome with the WebMCP " +
      "experiment enabled are the two ways in.",
  },
  {
    q: "The status line is green but the agent says it sees no tools",
    a:
      "Check the agent host's own settings and account gating first - some hosts restrict " +
      "site tools per model or account. When tools are detected, an arrow appears in the " +
      "address bar.",
  },
  {
    q: "The agent joined but goes quiet when I talk to the robot",
    a:
      "Host delay or a dropped listener can both cause silence. Use " +
      "get_pending_dialogue_request to peek at any pending turn, answer it, then resume " +
      "waiting with wait_for_player_message.",
  },
];
