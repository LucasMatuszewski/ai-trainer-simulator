// @vitest-environment jsdom
/**
 * The shared WebMCP pitch (webmcp-help.ts) is quoted in four dialogues, the
 * setup modal and the Help modal. These tests pin the invariants that make
 * that safe: the links are real and https, the prompt is self-contained, and
 * the copy stays inside the line-length discipline the rest of the content
 * follows.
 */
import { describe, expect, it } from "vitest";
import { mountWebmcpHelpModal } from "../../src/ui/webmcp-help-modal";
import { buildAgentPrompt, AGENT_PROMPT, WEBMCP_FAQ, WEBMCP_PATHS } from "../../src/content/webmcp-help";

describe("WEBMCP_PATHS", () => {
  it("offers exactly the two entry paths Lucas specified", () => {
    expect(WEBMCP_PATHS.map((p) => p.label)).toEqual(["ChatGPT's browser", "Chrome (experimental)"]);
  });

  it("links are the agreed docs, and https", () => {
    const hrefs = WEBMCP_PATHS.map((p) => p.href);
    expect(hrefs).toContain("https://learn.chatgpt.com/docs/webmcp");
    expect(hrefs).toContain("https://developer.chrome.com/docs/ai/webmcp");
    for (const href of hrefs) expect(href.startsWith("https://")).toBe(true);
  });

  it("does not oversell the Chrome path", () => {
    const chrome = WEBMCP_PATHS.find((p) => p.label.includes("Chrome"))!;
    expect(chrome.status.toLowerCase()).toContain("experimental");
  });
});

describe("AGENT_PROMPT", () => {
  it("teaches the loop by pointing at the instructions tool, not by restating it", () => {
    // The prompt must not rot when the tool set changes, so it defers to
    // get_instructions instead of hard-coding the protocol.
    expect(AGENT_PROMPT).toContain("get_instructions");
  });

  it("names the player-not-admin rule, which is the project's standing policy", () => {
    expect(AGENT_PROMPT).toContain("do not move my camera");
  });

  it("stays short enough to paste into any agent chat", () => {
    expect(AGENT_PROMPT.length).toBeLessThan(3200);
  });
});

describe("WEBMCP_FAQ", () => {
  it("explains availability and silence without unsupported model gates", () => {
    const text = WEBMCP_FAQ.map((f) => `${f.q} ${f.a}`).join("\n").toLowerCase();
    expect(text).toContain("unavailable");
    expect(text).toContain("host");
    expect(text).toContain("account");
    expect(text).toContain("delay");
    expect(text).toContain("resume");
    expect(text).not.toMatch(/sol|terra|luna|enterprise/);
    expect(text).not.toContain("it stopped calling");
    expect(text).toContain("wait_for_player_message");
  });
});


describe("deadline coworker guidance", () => {
  it("uses detected host tools and makes raw JavaScript conditional", () => {
    expect(AGENT_PROMPT).toMatch(/native.*WebMCP/);
    expect(AGENT_PROMPT).toContain("document.modelContext.getTools");
    expect(AGENT_PROMPT).toMatch(/only if.*functions exist.*host permits/);
    expect(AGENT_PROMPT).toContain("ordinary browsers");
  });

  it("teaches a consistent office character with bounded listening and recovery", () => {
    for (const instruction of ["IT trainer", "IT Crowd", "Silicon Valley", "LARP",
      "user-shared", "join once", "start_conversation", "timeout_seconds: 10",
      "get_pending_dialogue_request", "supply_dialogue", "gestures", "feedback"])
      expect(AGENT_PROMPT).toContain(instruction);
    expect(AGENT_PROMPT).toMatch(/let me.*start/i);
    expect(AGENT_PROMPT).toMatch(/supply_dialogue.*before.*gestures/);
    expect(AGENT_PROMPT).toMatch(/do not.*advance.*time/);
    expect(AGENT_PROMPT).toMatch(/do not.*resources/);
    expect(AGENT_PROMPT).toMatch(/re-arm.*idle/i);
  });

  it("explains that the game needs no API backend while AI usage may cost money", () => {
    const parent = document.createElement("div");
    const modal = mountWebmcpHelpModal(parent);
    const text = modal.root.textContent ?? "";
    expect(text).toContain("No game-side API key or AI backend");
    expect(text).toContain("subscription or usage charges");
    expect(text).not.toContain("no cost");
  });
});


describe("game URL in the copied agent prompt", () => {
  it.each(["http://localhost:5173/", "https://play.devpowers.com/"])("opens the actual game at %s", url => {
    const prompt = buildAgentPrompt(url + "?debug=private#section");
    expect(prompt).toContain(`Open ${url} in your built-in browser`);
    expect(prompt).not.toContain("debug=private");
    expect(prompt).not.toContain("#section");
  });
});
