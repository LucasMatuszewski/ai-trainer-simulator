/**
 * ADR 0008: the agent-play loop, driven the way a contest judge will drive
 * it - through a WebMCP host injected before page load, not through the UI.
 *
 * The fake host stands in for the browser's real model-context surface,
 * which only exists in ChatGPT's browser or Chrome with
 * chrome://flags/#enable-webmcp-testing. Everything below the injection is
 * the real game.
 *
 * Two of the assertions here exist because the corresponding bugs shipped
 * and were only caught by running this loop end to end: the dialogue panel
 * was created lazily inside the NPC path (so an agent conversation started
 * before the player had ever talked to a colleague silently did nothing),
 * and the panel had no z-index (so the quest log swallowed clicks on its
 * option row).
 *
 * Run with: pnpm exec playwright test tests/e2e/webmcp-agent-play.spec.ts
 */

import { test, expect, type Page } from "@playwright/test";

test.use({
  baseURL: "http://localhost:5173",
  browserName: "chromium",
  launchOptions: {
    executablePath: "/usr/bin/google-chrome",
    channel: "chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  },
  viewport: { width: 1280, height: 720 },
});

test.setTimeout(180_000);

declare global {
  interface Window {
    __mcp?: {
      list: () => Array<{ name: string; description: string; inputSchema: unknown }>;
      call: (name: string, args?: Record<string, unknown>) => Promise<{
        content: Array<{ type: string; text: string }>;
        isError?: boolean;
      }>;
    };
  }
}

/** Install a stand-in WebMCP host before any page script runs. */
async function installHost(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const tools = new Map<string, { execute: (a: unknown) => Promise<unknown> }>();
    Object.defineProperty(document, "modelContext", {
      value: {
        registerTool: (tool: { name: string }) => {
          tools.set(tool.name, tool as never);
          return true;
        },
        unregisterTool: (name: string) => tools.delete(name),
      },
      configurable: true,
    });
    (window as never as Record<string, unknown>).__mcp = {
      list: () => [...tools.values()],
      call: async (name: string, args: Record<string, unknown> = {}) => {
        const tool = tools.get(name);
        if (!tool) throw new Error(`no such tool: ${name}`);
        return tool.execute(args);
      },
    };
  });
}

async function startGame(page: Page): Promise<void> {
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await page.waitForTimeout(6500);
  await expect(page.locator(".hud")).toBeVisible();
}

/** Call a tool and parse its JSON payload. Throws on a tool error. */
async function call(
  page: Page,
  name: string,
  args: Record<string, unknown> = {},
): Promise<unknown> {
  const response = await page.evaluate(
    ([n, a]) => window.__mcp!.call(n as string, a as Record<string, unknown>),
    [name, args] as const,
  );
  if (response.isError === true) throw new Error(response.content[0]!.text);
  return JSON.parse(response.content[0]!.text) as unknown;
}

/** Call a tool expecting it to fail, and return the error text. */
async function callExpectingError(
  page: Page,
  name: string,
  args: Record<string, unknown> = {},
): Promise<string> {
  const response = await page.evaluate(
    ([n, a]) => window.__mcp!.call(n as string, a as Record<string, unknown>),
    [name, args] as const,
  );
  expect(response.isError, `${name} should have failed`).toBe(true);
  return response.content[0]!.text;
}

/**
 * Click the robot. The eye is at 1.65 m and the companion's head sits
 * lower, so a ray through the exact centre flies over it - aim below.
 * main.ts listens on mousedown, not click.
 */
async function clickCompanion(page: Page): Promise<void> {
  await page.evaluate(() => {
    const canvas = document.querySelector("#game-canvas")!;
    const rect = canvas.getBoundingClientRect();
    canvas.dispatchEvent(
      new MouseEvent("mousedown", {
        button: 0,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height * 0.65,
        bubbles: true,
      }),
    );
  });
  await page.waitForTimeout(700);
}

test("the tool set is discoverable by an agent on page load", async ({ page }) => {
  await installHost(page);
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(1200);

  const names = await page.evaluate(() =>
    window.__mcp!.list().map((t) => (t as { name: string }).name),
  );

  // The agent-play surface, which is what makes this a WebMCP entry.
  for (const required of [
    "agent_join",
    "agent_leave",
    "agent_look_around",
    "agent_move_to",
    "agent_say",
    "get_pending_dialogue_request",
    "supply_dialogue",
  ]) {
    expect(names, `${required} must be registered`).toContain(required);
  }

  // AC-REG-02: every tool carries a description and an object schema, or an
  // agent cannot call it correctly.
  const tools = await page.evaluate(() => window.__mcp!.list());
  for (const tool of tools) {
    const t = tool as { name: string; description: string; inputSchema: { type: string } };
    expect(t.description.length, `${t.name} needs a description`).toBeGreaterThan(10);
    expect(t.inputSchema.type, `${t.name} needs an object schema`).toBe("object");
  }

  // The title screen tells a judge the integration is live.
  await expect(page.locator(".agent-status")).toContainText("Agent play ready");
});

test("an agent joins, looks around, speaks and walks to a named colleague", async ({ page }) => {
  await installHost(page);
  await startGame(page);

  const joined = (await call(page, "agent_join", {
    name: "Rusty",
    persona: "a sarcastic QA robot",
  })) as { joined: boolean; name: string };
  expect(joined.joined).toBe(true);
  expect(joined.name).toBe("Rusty");

  // AC-COMP-01/05: really in the scene, not just in a state object.
  const inScene = await page.evaluate(() => window.__aitrainer!.inspectCompanion!());
  expect(inScene?.inScene).toBe(true);
  expect(inScene?.childCount).toBeGreaterThan(0);

  // AC-COMP-02: one seat only.
  expect(await callExpectingError(page, "agent_join", { name: "Dupe", persona: "x" }))
    .toContain("already in the office");

  // AC-ACT-03: the observation must name people AND everywhere it can walk,
  // so an agent that has never seen the floor plan can still act.
  const look = (await call(page, "agent_look_around")) as {
    nearbyPeople: Array<{ id: string; role: string }>;
    canWalkTo: Array<{ id: string }>;
  };
  expect(look.nearbyPeople.length).toBeGreaterThan(0);
  expect(look.nearbyPeople[0]!.role.length).toBeGreaterThan(0);
  const walkable = look.canWalkTo.map((t) => t.id);
  expect(walkable).toContain("bartek");
  expect(walkable).toContain("kitchen");

  expect(await call(page, "agent_say", { line: "Morning. Who broke the build?" }))
    .toEqual({ said: "Morning. Who broke the build?" });

  // AC-ACT-01: a named walk starts and the companion actually moves.
  const before = await page.evaluate(() => window.__aitrainer!.inspectCompanion!());
  await call(page, "agent_move_to", { target: "bartek" });
  await page.waitForTimeout(2500);
  const after = await page.evaluate(() => window.__aitrainer!.inspectCompanion!());
  expect(after?.world).not.toEqual(before?.world);

  // AC-ACT-02 / D-39: an unknown name fails WITH the valid alternatives.
  const error = await callExpectingError(page, "agent_move_to", { target: "the moon" });
  expect(error).toContain("unknown target");
  expect(error).toContain("bartek");
  expect(error).toContain("kitchen");
});

test("the agent writes the companion's dialogue and reads back the human's choice", async ({ page }) => {
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "a sarcastic QA robot" });
  await page.waitForTimeout(500);

  // Nothing pending until the human actually starts talking.
  expect(await call(page, "get_pending_dialogue_request")).toBeNull();

  await clickCompanion(page);

  // AC-AUTH-01: the agent gets the context it needs to write in character.
  const pending = (await call(page, "get_pending_dialogue_request")) as {
    companionName: string;
    persona: string;
    turn: number;
    clock: string;
    lastPlayerChoice: string | null;
  } | null;
  expect(pending, "clicking the robot must open a request").not.toBeNull();
  expect(pending!.companionName).toBe("Rusty");
  expect(pending!.persona).toContain("sarcastic");
  expect(pending!.turn).toBe(1);
  expect(pending!.lastPlayerChoice).toBeNull();

  // The panel is up and waiting rather than blank. This is also the
  // regression guard for the lazy-init bug: before ensureDialogue(), a
  // first-ever conversation with the robot rendered nothing at all.
  await expect(page.locator(".dialogue")).toBeVisible();

  // AC-AUTH-03: an out-of-range option count is refused with a reason.
  expect(await callExpectingError(page, "supply_dialogue", {
    line: "too many",
    options: ["a", "b", "c", "d", "e"],
  })).toContain("2-4");

  // AC-AUTH-02: the agent's words render in the game's own dialogue UI.
  const LINE = "You must be the new trainer. I do QA, which means I find out what Tomek did.";
  const OPTIONS = ["What did Tomek do?", "Nice to meet you.", "Are you... a robot?"];
  await call(page, "supply_dialogue", { line: LINE, options: OPTIONS });
  await page.waitForTimeout(400);

  await expect(page.locator(".dialogue .text")).toHaveText(LINE);
  await expect(page.locator(".dialogue .name")).toHaveText("Rusty");
  expect(await page.locator(".dialogue .options button").allTextContents()).toEqual(OPTIONS);

  // AC-AUTH-04: the human picks, and the agent can read the choice back.
  // The click also guards the z-index bug - the quest log used to sit on
  // top of this button row and swallow the press.
  await page.locator(".dialogue .options button").first().click();
  await page.waitForTimeout(500);

  const next = (await call(page, "get_pending_dialogue_request")) as {
    turn: number;
    lastPlayerChoice: string | null;
  } | null;
  expect(next!.turn).toBe(2);
  expect(next!.lastPlayerChoice).toBe(OPTIONS[0]);
});

test("agent-supplied markup is shown as text and never executed", async ({ page }) => {
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "qa robot" });
  await page.waitForTimeout(500);
  await clickCompanion(page);

  // AC-AUTH-06. The agent is an LLM steered by a third party's prompt and
  // its output lands in our DOM, so this is a real injection surface.
  const PAYLOAD = "<img src=x onerror=window.__pwned=1>";
  await call(page, "supply_dialogue", { line: PAYLOAD, options: ["ok", "no"] });
  await page.waitForTimeout(400);

  await expect(page.locator(".dialogue .text")).toHaveText(PAYLOAD);
  expect(await page.locator(".dialogue .text img").count()).toBe(0);
  expect(await page.evaluate(() => (window as never as Record<string, unknown>).__pwned)).toBeUndefined();
});

test("a browser with no WebMCP support still reaches a playable game", async ({ page }) => {
  // AC-REG-03. No host is installed at all - the common case today.
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await startGame(page);

  await expect(page.locator(".hud")).toBeVisible();
  expect(errors, "an unsupported browser must not produce page errors").toEqual([]);
  await expect(page.locator(".agent-status")).toHaveCount(0); // title screen is gone
});
