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
// Asserting against the real bounds rather than a hardcoded "2-4": the
// minimum dropped to 1 when agent-initiated conversations landed, and a
// literal in the test would have to be chased every time they move.
import { MAX_OPTIONS, MIN_OPTIONS } from "../../src/webmcp/agent-dialogue";

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
  })).toContain(`${MIN_OPTIONS}-${MAX_OPTIONS}`);

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

test("the agent can open the conversation itself, and the long-poll resolves on the click", async ({ page }) => {
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "a sarcastic QA robot" });
  await page.waitForTimeout(500);

  // L-2026-09-03-04: the agent walks up and speaks first - nobody clicked it.
  await call(page, "start_conversation", {
    line: "Hey - you're the new trainer, right? I have a bug with your name on it.",
    options: ["What bug?", "Not now, I'm busy.", { text: "Goodbye, robot.", ends: true }],
  });
  await page.waitForTimeout(400);

  await expect(page.locator(".dialogue")).toBeVisible();
  expect(await page.locator(".dialogue .options button").allTextContents()).toEqual([
    "What bug?",
    "Not now, I'm busy.",
    "Goodbye, robot.",
  ]);
  // The agent writes its own goodbye rather than getting a bare Close button.
  expect(await page.locator(".dialogue .options button.ends").count()).toBe(1);

  // The long-poll must resolve when the human CLICKS, not when it times out.
  // That is the whole point: WebMCP has no push, so this is how a reply
  // reaches the agent immediately instead of on a 5-15s poll.
  const startedAt = Date.now();
  const waiting = page.evaluate(() => window.__mcp!.call("wait_for_player_message", {}));
  await page.waitForTimeout(600);
  await page.locator(".dialogue .options button").first().click();

  const response = await waiting;
  const message = JSON.parse(response.content[0]!.text) as {
    waiting: boolean;
    choice?: string;
    optionIndex?: number;
  };
  expect(message.waiting).toBe(false);
  expect(message.choice).toBe("What bug?");
  expect(message.optionIndex).toBe(0);
  // Far under the 25s ceiling - proof it woke on the click, not the timer.
  expect(Date.now() - startedAt).toBeLessThan(10_000);
});

test("picking the option the agent marked as ending closes the conversation", async ({ page }) => {
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "qa robot" });
  await page.waitForTimeout(500);
  await call(page, "start_conversation", {
    line: "Anyway.",
    options: ["Tell me more.", { text: "See you around.", ends: true }],
  });
  await page.waitForTimeout(400);

  await page.locator(".dialogue .options button.ends").click();
  await page.waitForTimeout(400);
  await expect(page.locator(".dialogue")).toHaveCount(0);
});

test("the raw movement controls move the companion and respect collision", async ({ page }) => {
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "qa robot" });
  await page.waitForTimeout(400);

  const turned = (await call(page, "agent_turn", { degrees: 90 })) as { facingDegrees: number };
  expect(turned.facingDegrees).toBe(90);

  const before = await page.evaluate(() => window.__aitrainer!.inspectCompanion!());
  const stepped = (await call(page, "agent_step", { direction: "forward", metres: 2 })) as {
    movedMetres: number;
  };
  expect(stepped.movedMetres).toBeGreaterThan(0);
  const after = await page.evaluate(() => window.__aitrainer!.inspectCompanion!());
  expect(after?.world).not.toEqual(before?.world);

  expect(await callExpectingError(page, "agent_step", { direction: "sideways", metres: 1 }))
    .toContain("forward, back, left, right");
});

test("the admin tools are gone and the instructions tool explains the protocol", async ({ page }) => {
  await installHost(page);
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(1200);

  const names = await page.evaluate(() =>
    window.__mcp!.list().map((t) => (t as { name: string }).name),
  );
  // ADR 0008 D-40 / L-2026-08-30-01: WebMCP is a player surface. An agent
  // that can grant itself money is not playing the game.
  expect(names).not.toContain("set_flag");
  expect(names).not.toContain("add_relationship");
  expect(names).toContain("get_instructions");

  const instructions = (await call(page, "get_instructions")) as { instructions: string };
  expect(instructions.instructions).toContain("PLAYER in this office game");
  expect(instructions.instructions).toContain("wait_for_player_message");
});

test("every tool parameter carries a concrete example, and no-argument tools say so", async ({ page }) => {
  // L-2026-09-03-04: inspectors were rendering {"target": "example_string"}.
  await installHost(page);
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(1200);

  const tools = await page.evaluate(() => window.__mcp!.list());
  for (const tool of tools) {
    const t = tool as {
      name: string;
      inputSchema: {
        properties: Record<string, { examples?: unknown[] }>;
        examples?: unknown[];
      };
    };
    const names = Object.keys(t.inputSchema.properties);
    if (names.length === 0) {
      expect(t.inputSchema.examples, `${t.name} should show {} as its example`).toEqual([{}]);
      continue;
    }
    for (const param of names) {
      expect(
        t.inputSchema.properties[param]!.examples,
        `${t.name}.${param} needs a concrete example`,
      ).toBeDefined();
    }
  }
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

test("a line supplied AFTER the fallback still reaches the player", { tag: "@slow" }, async ({ page }) => {
  // Lucas, 2026-09-03: "if I see this fallback about diode amber that Rusty is
  // thinking longer, then I never see this supplied dialogue". The frame loop
  // used to reset() the broker when the wait elapsed, which cleared the
  // pending turn - so the agent's late line hit "no conversation is waiting"
  // and vanished. Tagged @slow because it must actually wait out the timeout;
  // the wiring is the bug site, so a unit test alone would not have caught it.
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "qa robot" });
  await page.waitForTimeout(500);
  await call(page, "start_conversation", { line: "Hey.", options: ["Hi.", "Not now."] });
  await page.waitForTimeout(400);

  // Answer, which opens a fresh turn the agent deliberately does not fill.
  await page.locator(".dialogue .options button").first().click();
  await expect(page.locator(".dialogue .text")).toContainText("status light blinks amber", {
    timeout: 20_000,
  });

  // The panel must still be open and the turn still claimable.
  const LATE = "Sorry - long boot sequence.";
  await call(page, "supply_dialogue", { line: LATE, options: ["No problem.", "What took you?"] });
  await expect(page.locator(".dialogue .text")).toHaveText(LATE);
});

test("a step is walked over time, not applied in one frame", async ({ page }) => {
  // Lucas: agent_step "works like a teleport or walks crazy fast". It wrote
  // the whole displacement in a single frame; it now hands the destination to
  // the same path advance everything else uses.
  await installHost(page);
  await startGame(page);
  await call(page, "agent_join", { name: "Rusty", persona: "qa robot" });
  await page.waitForTimeout(400);

  const at = async (): Promise<number> =>
    (await page.evaluate(() => window.__aitrainer!.inspectCompanion!()))!.world!.z;

  const before = await at();
  const step = (await call(page, "agent_step", { direction: "forward", metres: 3 })) as {
    walkSeconds: number;
  };
  expect(step.walkSeconds).toBeGreaterThan(1);

  // Immediately after the call it has barely moved - that is the whole point.
  const immediately = await at();
  expect(Math.abs(immediately - before)).toBeLessThan(0.5);

  // And it keeps going under its own steam.
  await page.waitForTimeout(2500);
  const later = await at();
  expect(Math.abs(later - before)).toBeGreaterThan(2);
});
