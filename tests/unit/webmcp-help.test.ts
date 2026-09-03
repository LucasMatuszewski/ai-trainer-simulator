/**
 * The shared WebMCP pitch (webmcp-help.ts) is quoted in four dialogues, the
 * setup modal and the Help modal. These tests pin the invariants that make
 * that safe: the links are real and https, the prompt is self-contained, and
 * the copy stays inside the line-length discipline the rest of the content
 * follows.
 */
import { describe, expect, it } from "vitest";
import { AGENT_PROMPT, WEBMCP_FAQ, WEBMCP_PATHS } from "../../src/content/webmcp-help";

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
    expect(AGENT_PROMPT.length).toBeLessThan(1200);
  });
});

describe("WEBMCP_FAQ", () => {
  it("covers the title-screen status line and the ChatGPT model gate", () => {
    const text = WEBMCP_FAQ.map((f) => `${f.q} ${f.a}`).join("\n").toLowerCase();
    expect(text).toContain("unavailable");
    expect(text).toContain("luna");
    expect(text).toContain("wait_for_player_message");
  });
});
