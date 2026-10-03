# WS3 Result — Dialogue architecture v2 (C-77)

**Delegate:** WS3 · **Branch:** `feat/jev-npc-decision-steering` · **Date:** 2026-09-30
**Gate:** `pnpm typecheck` exit 0 · `pnpm test` **94 files / 1098 tests, 0 failures** (full suite, includes WS10's and WS6's concurrent files — nothing broken, nothing fixed by me)
**Nothing committed, nothing pushed, `src/version.ts` untouched, no new dependencies.**

---

## 1. Changed files (all inside the allowed list)

| File | What |
| --- | --- |
| `src/content/dialogue-schema.ts` (new) | Typed v2 pool model: `DialogueTopic`, `OptionCandidate`, `ReplyCandidate`, `TaskOffer`, `NpcDialoguePool`, context-tag vocabulary (template-literal types + `CONTEXT_TAG_PATTERN`), bounds, `EXIT_TOPIC_ID` / `WRAP_UP_OPTION` / `V2_MEMORY_TREE_ID`, `DialogueTurnMemory`, and the pure validator `validatePool(pool) => string[]` (+ `VALIDATE_OK`). Imports only `types` + `ReactionBucket` type. |
| `src/content/npc-content/dialogue-pool-bartek.ts` (new) | Authored pool: 4 topics, 26 options, 27 replies, 2 tasks. |
| `src/content/npc-content/dialogue-pool-renata.ts` (new) | Authored pool: 4 topics, 24 options, 24 replies, 1 task. |
| `src/content/npc-content/dialogue-pool-klaudia.ts` (new) | Authored pool: 4 topics, 24 options, 24 replies, 1 task. |
| `src/content/npc-content/dialogue-pool-marek.ts` (new) | Authored pool: 4 topics, 24 options, 24 replies, 2 tasks. |
| `src/content/npc-content/dialogue-pool-generic.ts` (new) | Generic fallback pool: 4 small-talk topics, 25 options, 26 replies (one `event:`-gated, one `stats:`-gated pair, one `period:`-gated), 0 task offers (deliberate — see §6). |
| `src/content/npc-content/dialogue-pools.ts` (new) | Registration index: `registerNpcDialoguePools()` (idempotent, registers into the WS0 registry), `hasDialoguePool`, `dialoguePoolFor`, `v2MemoryFor(npcId)` (assembles `DialogueTurnMemory` from the per-NPC option memory, tree id `dialogue-v2`), re-exports `GENERIC_DIALOGUE_POOL`. |
| `src/content/npc-content/registry.ts` (modified, +7) | ONE optional type field: `NpcDialoguePool?: …` — see `dialoguePool?: NpcDialoguePool` on `NpcContentEntry` + one type-only import. Zero runtime change. Justification: the registry's own header says "the detailed schema v2 types … arrive with WS3"; the pools register through `registerNpcContent` exactly as WS0 intended. The WS0 registry test (`starts empty`, shape-only) still passes (6/6 in my runs). **Flagging explicitly since the orchestrator paraphrased the glob as "pool files".** |
| `src/game/dialogue-turn.ts` (new) | The PURE turn builder: `buildTurn(state, npcId, memory, session, poolOverride?)`, plus `newConversationSession`, `recordExchange`, `turnContextFor`, `tagsEligible`, `topicEligible`, `usedSetFingerprint`, `MAX_VISIBLE_OPTIONS`. No module state, no DOM, no engine imports. |
| `src/jev/dialogue-wrapper.ts` (new) | The steered turn layer, greeting-wrapper pattern: `createDialogueWrapper`, one batched request per turn (Score per option + Choice for the reply), memo keyed `(npcId, topicId, used-set fingerprint)`, honest decision-log entries, `bucketOfReply` code mapping. |
| `tests/unit/game/dialogue-turn.test.ts` (new, 24 tests) | Filtering, curation order, pivot, exhaustion, no-repeat, task gating, helpers. |
| `tests/unit/jev/dialogue-wrapper.test.ts` (new, 20 tests) | Steered curation/reply live path, all fallback paths, shadow, memo, live-path proof (AC-31), pool smoke. |
| `tests/unit/content/npc-dialogue-pools.test.ts` (new, 19 tests) | Schema validity, id uniqueness, shape counts, flag vocabulary, tag coverage, tone/lore spot-assertions, registration. |

## 2. TDD red→green evidence (one cycle per module)

| Cycle | RED evidence | GREEN evidence |
| --- | --- | --- |
| Pools + schema | `pnpm vitest run tests/unit/content/npc-dialogue-pools.test.ts` → `Failed to load url …/dialogue-pools` (0 tests, suite failed) | After authoring pools: **19/19 passed** |
| Turn builder | `pnpm vitest run tests/unit/game/dialogue-turn.test.ts` → module-missing suite failure | After implementing `dialogue-turn.ts`: **24/24 passed** |
| Wrapper | `pnpm vitest run tests/unit/jev/dialogue-wrapper.test.ts` → module-missing suite failure | After implementing `dialogue-wrapper.ts`: **20/20 passed** |

(The pools cycle also caught 3 authoring bugs through the tests themselves: a badly-written leak test, a missing `period:` tag demo, and a leftover `topicId` on replies violating the brief's `ReplyCandidate` shape — fixed in data, not by weakening tests.)

### Mutation checks (PR-11) — each mutation FAILED the suite, then was restored

| Mutation | Where | Result |
| --- | --- | --- |
| A: ignore `usedOptions` in the option filter | `src/game/dialogue-turn.ts` | **11/24 failed** (no-repeat, exclusion, curation-order tests) |
| B: bypass the conservative reply-confidence threshold | `src/jev/dialogue-wrapper.ts` | **1/20 failed** (low-confidence rejection test) |
| C: point a task `flagToSet` at a flag that does not exist | `dialogue-pool-bartek.ts` | **2/19 failed** (flag-vocabulary + spot-check tests) |

All three restored byte-identical (backups in `/tmp`); re-ran the three files after restore: **63/63 green**.

## 3. vitest summary

- New tests: **63** (24 turn-builder + 20 wrapper + 19 pools).
- Full suite after all changes: **Test Files 94 passed (94) · Tests 1098 passed (1098)**.
- `pnpm typecheck`: exit 0.
- Note: one full-suite run inside the `/tmp` patch-verification copy crashed a tinypool worker (memory pressure from running two full suites with heavy WebGL tests against shared `node_modules`); the repo's own full suite is green, and the patched files' direct tests (115 across 6 files, incl. the jsdom `dialogue-tree.test.ts` that drives the patched `createDialogue`) pass in the copy. Not a code issue; noted for transparency.

## 4. Turn-builder policy decisions (disagreement invited, per the brief)

- **Pivot rule exactly as briefed:** stay on the current topic while it has ≥ 2 unused eligible options; otherwise pivot to the richest eligible topic (most unused options; ties → authored order); a 1-option current topic is served only when nothing richer exists; when NOTHING has ≥ 1 unused eligible option → exit set.
- **Exit set always on screen:** every turn shows ≤ 3 topic options **plus** the "Wrap it up." exit (AC-04: the exit reserves a slot before curation). Exit small talk comes from the generic pool and is deliberately NEVER memory-suppressed (it is a holding pattern, not content) — but exit replies prefer session-unused lines and recycle when out, so the wrap-up menu still varies.
- **Replies recycle before options do.** Options are one-shot (memory + session); if a thread's replies run out while options remain, replies fall back to "all eligible", then to "all" — a thread with options left can never have an empty reply pool.
- **Task gating is flag-based:** a reply whose `offersTaskId` resolves to an offer whose `flagToSet` is already set is excluded entirely (the NPC never re-offers a done task).
- **Fallback order** everywhere is authored priority (array order), first-unused first — Jev reorders/picks on top, never authors (D-45).
- **`recordExchange` / `usedSetFingerprint`** are exported so the orchestrator's UI patch and the wrapper memo key share one definition of "the same situation".

## 5. Wrapper decisions

- One batched request per turn, surface `reply-selection`, `timeoutMs: 1200` (PRD dialogue deadline), `retries: 0` (a conversation must never stall). Two decisions ride in it: one **Score** question per option (prompt contains only fictional ids + authored line text + allowlisted facts, D-59) and one **Choice** over the reply candidates.
- Thresholds: curation **0.3** (cosmetic, live per D-60), reply **0.6** (consequential → conservative). Missing/below-threshold/unknown-id answers → per-surface fallback, logged (`rejected` + reason). Provider failure → both surfaces logged `legacy` with `provider-<reason>`.
- **Social reaction is CODE-mapped:** the wrapper returns the chosen reply's `relationshipHint` bucket (default `neutral`); the proposed UI patch maps it through `BUCKET_DELTAS` (the social model's single table, D-50) to a bounded `add-relationship` delta. No numbers cross the model boundary (asserted by a test).
- Memo keyed `(npcId, topicId, usedSetFingerprint(usedOptionIds))`: same situation judged once per session; `resetSession()` on office re-entry / conversation end. Shadow (`?jev=shadow`): judged, logged `shadow`, memo never written, returned decision is the fallback — never steers (verified by test, including `applied === 0`).
- AC-31 live-path proof: non-default scripted answers are applied on both surfaces; `counters().applied >= 2` asserted.

## 6. Pool content summary (tone: ironic IT-office, lore-consistent)

**bartek** — topics: `consulting` (trade secrets; warm-gated Bartek Loop reply offers the masterclass task), `tomek-main` (Friday push to main; the fallout reply offers PR duty), `printer` (2019 lore, "our most successful automation"), `clients` (**requiresFlags `got-acme-contract`**; ACME cloud-as-Microsoft-product, retainer wisdom). Tasks: **PR fallout duty** → `tomek-reviewed-pr`; **lunch masterclass** → `bartek-shared-consulting-secret`.

**renata** — topics: `office-intel` (who really runs the place, meeting taxonomy), `burek` (duty roster, the ten-minute stare as performance review, client-meeting dog), `coffee-watch` (**periods: morning only**), `visitors` (courier signatures, Batman brand equity, HR "quick chat"). Task: **Burek duty** → `burek-fed`.

**klaudia** — topics: `collab` (thumbnails, agent-as-content-pipeline), `algorithm` (**minRelationship 40**; mirrors-gym explanation), `job-title` (self-invented laminated title), `coffee-emergency` (**periods: morning + lunch**; the 0:09 latte, decaf trauma). Task: **coffee emergency** (cofounder-for-a-caption video) → `klaudia-rebranded-you`.

**marek** — topics: `prod` (**periods: afternoon only**; red dashboards are load-bearing), `setup` (**minRelationship 45**; six-monitor perimeter, monitor six is the clock), `docs` (historical fiction, the load-bearing haiku), `printer` (the mug, 2019, printer diplomacy). Tasks: **Friday firewatch** → `marek-trusted-review`; **sticker ops** ("PROPERTY OF DEVOPS - DO NOT OPERATE" on the printer) → `janusz-leave-printer` (Marek making Janusz's embargo official signage).

**generic** — `smalltalk`, `office-lore` (standup, printer, Burek, Batman, Janusz's robots), `coffee-talk` (**periods: morning/lunch/afternoon**; contains the `stats:low-caffeine` option/reply pair and the `event:event-coffee-broken` emergency-tin reply), `tech-grief` (works-and-I-don't-know-why, push-to-main-on-Friday, "more AI"). Replies are NPC-neutral but register-true. **No task offers** — a fallback pool must never re-offer NPC-specific tasks from every desk.

Tag vocabulary exercised end-to-end: `relationship:warm|neutral|hostile`, `stats:low-caffeine`, `period:*` (topic-level AND candidate-level), `event:event-coffee-broken`, `quest:tutorial-accepted`, topic `requiresFlags`/`blockedByFlags`/`minRelationship`/`maxRelationship`/`periods`. All 6 task flags verified against the game's flag vocabulary (grep + `QUESTS` completionFlags) — "spot-check the known ones" is pinned in the pools test.

Volume: **147 options + 149 replies + 6 task offers = 302 authored strings** across 5 pools (the 10× counting is WS5's concern; this is the architecture + first content).

## 7. Proposed shared-file patches (EXACT, never applied by me)

Applied to a throwaway copy of the **current** tree (re-baselined AFTER WS6's `main.ts` commit `5573d66` landed): all anchors matched, `tsc --noEmit` exit 0, and the 6 dialogue-touching test files (115 tests, including the jsdom `dialogue-tree.test.ts` driving the patched `createDialogue`) pass in the copy. `git apply` them as-is.

### 7a. `src/main.ts`

--- /home/lucas/DEV/Projects/ai-trainer-simulator/src/main.ts	2026-09-30 22:38:08.021619947 +0100
+++ /tmp/ws3-compile/src/main.ts	2026-09-30 22:41:55.877827468 +0100
@@ -62,6 +62,9 @@
 } from "./game/npc-needs";
 import { roomAt } from "./engine/chatter";
 import { createGreetingWrapper, type GreetingWrapperHandle } from "./jev/greeting-wrapper";
+// WS3 (C-77): steered dialogue turns + the authored v2 pool content.
+import { createDialogueWrapper, type DialogueSteererHandle } from "./jev/dialogue-wrapper";
+import { dialoguePoolFor, registerNpcDialoguePools } from "./content/npc-content/dialogue-pools";
 import { mountJevSettings } from "./ui/jev-settings";
 import { jevDecisionHooks } from "./engine/npc-controller";
 import { approachSpotFor } from "./content/npc-approach";
@@ -215,6 +218,19 @@
 const JEV_MODE = new URLSearchParams(window.location.search).get("jev");
 let greetingWrapper: GreetingWrapperHandle | null = null;
 let lastGreetingPrefetchDay = 0;
+// WS3: the authored v2 pools are CONTENT - they power the deterministic
+// conversation fallback with Jev off, too - so registration is
+// unconditional and idempotent.
+registerNpcDialoguePools();
+// The steered dialogue-turn wrapper. Same ?jev mode handling as the
+// greeting wrapper: off = never constructed, shadow = judge + log
+// without steering. Null on screens without the office.
+let dialogueSteerer: DialogueSteererHandle | null = null;
+
+function buildDialogueSteerer(): DialogueSteererHandle | null {
+  if (JEV_MODE === "off") return null;
+  return createDialogueWrapper({ shadow: JEV_MODE === "shadow" });
+}
 // WS10 (C-77): shared positional-audio player. Created lazily on the
 // first office mount; reads player position/yaw/room LIVE via the
 // getters, so it is safe to build before `controls` exists.
@@ -568,6 +584,9 @@
     greetingWrapper?.uninstall();
     greetingWrapper = buildGreetingWrapper();
     greetingWrapper?.install();
+    // WS3: a fresh office session starts a fresh steerer memo.
+    dialogueSteerer?.resetSession();
+    dialogueSteerer = buildDialogueSteerer();
     prefetchGreetingsNow();
     // L-2026-08-30-01: register the NPC controller with the events
     // dispatcher so every period transition can roll a random
@@ -1389,6 +1408,15 @@
     sceneObjects?.npcController.setTalkingToPlayer(npc.id);
     dialogueNpcId = npc.id;
   }
+  // WS3 (C-77): NPCs with authored v2 pools run the conversation-turn
+  // flow; everyone else keeps their legacy tree. Both paths work, and the
+  // WebMCP snapshot/pickOption surface covers v2 conversations too.
+  if (dialoguePoolFor(npc.id) !== undefined) {
+    audio().sfx.play("sfx_dialogue_open");
+    roster?.setFocus(npc.id);
+    panel.openV2(npc, dialogueSteerer);
+    return;
+  }
   const state = game.get();
   let treeKey = "default";
   if (npc.id === "bartek") {

### 7b. `src/ui/dialogue.ts`

Adds the v2 conversation flow inside the existing controller (same panel markup, same close/finish accounting). Key properties of the implementation: the authored fallback is rendered immediately (a slow/failed judgment can never block or blank the panel — AC-10/11); a landing curation merely reorders options; the reply is pre-decided while the turn is on screen (D-48) and served instantly on pick; task offers render as a highlighted `Accept: <title>` button that dispatches the standard `set-flag`; social reactions dispatch `add-relationship` with the `BUCKET_DELTAS` delta of the author-tagged bucket; WebMCP `snapshot()`/`pickOption()` cover v2 conversations (AC-05).

```diff
--- /home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/dialogue.ts	2026-09-03 20:39:37.883194993 +0100
+++ /tmp/ws3-compile/src/ui/dialogue.ts	2026-09-30 22:41:55.876145099 +0100
@@ -6,6 +6,24 @@
 import type { DialogueButton, DialogueLink, DialogueNode, DialogueTree, NPC } from "../types";
 import { game } from "../game/state";
 import { getMemory, setMemory, pickedOptionsFor, markOptionPicked } from "../content/dialogue-memory";
+import {
+  buildTurn,
+  newConversationSession,
+  recordExchange,
+  type ConversationSession,
+  type DialogueTurn,
+  type TurnOption,
+} from "../game/dialogue-turn";
+import {
+  V2_MEMORY_TREE_ID,
+  type DialogueTurnMemory,
+  type NpcDialoguePool,
+  type ReplyCandidate,
+  type TaskOffer,
+} from "../content/dialogue-schema";
+import { BUCKET_DELTAS } from "../game/social";
+import type { DialogueSteererHandle } from "../jev/dialogue-wrapper";
+import { dialoguePoolFor, v2MemoryFor } from "../content/npc-content/dialogue-pools";
 
 export interface DialogueController {
   open: (npc: NPC, tree: DialogueTree, treeId?: string) => void;
@@ -50,6 +68,14 @@
   ) => void;
   /** True while an agent-authored conversation is on screen. */
   isAgentTurn: () => boolean;
+  /**
+   * WS3 (C-77): open a pool-driven v2 conversation for an NPC with
+   * authored pools. Same panel; options and replies come from the pure
+   * turn builder (deterministic authored fallback) with optional Jev
+   * steering on top. `steerer` may be null (Jev off) - the game plays
+   * the authored fallback order.
+   */
+  openV2: (npc: NPC, steerer: DialogueSteererHandle | null) => void;
 }
 
 /** One agent-authored reply. `ends` closes the conversation when picked. */
@@ -202,8 +228,25 @@
   /** Set while an agent-authored turn owns the panel. */
   let agentTurnActive = false;
 
+  // --- WS3: dialogue v2 state (C-77, PRD Flow A2) ---
+
+  /** One open pool-driven v2 conversation. Mutually exclusive with `state`. */
+  interface V2Conversation {
+    npc: NPC;
+    pool: NpcDialoguePool;
+    memory: DialogueTurnMemory;
+    session: ConversationSession;
+    turn: DialogueTurn;
+    /** The line currently on screen (the NPC's last answer). */
+    reply: ReplyCandidate | null;
+    /** A task offer awaiting acceptance (rendered highlighted). */
+    pendingOffer: TaskOffer | null;
+    steerer: DialogueSteererHandle | null;
+  }
+  let v2: V2Conversation | null = null;
+
   function open(npc: NPC, tree: DialogueTree, treeId: string = "default"): void {
-    if (state) return; // already open
+    if (state || v2) return; // already open
     state = { npc, tree, treeId, currentNodeId: "greeting" };
     const memory = getMemory(npc.id);
     setMemory(npc.id, {
@@ -216,8 +259,9 @@
   }
 
   function close(): void {
-    if (!state && !agentTurnActive) return;
+    if (!state && !agentTurnActive && !v2) return;
     agentTurnActive = false;
+    v2 = null;
     state = null;
     currentNode = null;
     currentAvailableOptions = [];
@@ -230,7 +274,7 @@
   }
 
   function isOpen(): boolean {
-    return state !== null || agentTurnActive;
+    return state !== null || agentTurnActive || v2 !== null;
   }
 
   function render(): void {
@@ -393,6 +437,13 @@
   }
 
   function pickOption(optionIdValue: string): boolean {
+    // WS3: WebMCP picks pass through the same path as UI clicks (AC-05).
+    if (v2 !== null) {
+      const index = orderedV2Options().findIndex((entry) => entry.option.id === optionIdValue);
+      if (index === -1) return false;
+      pickV2(index);
+      return true;
+    }
     if (!state || !currentNode) return false;
     const opt = currentNode.options?.find((o) => optionId(o) === optionIdValue);
     if (!opt) return false;
@@ -415,6 +466,22 @@
   }
 
   function snapshot(): DialogueSnapshot | null {
+    // WS3: expose v2 conversations to the WebMCP snapshot too.
+    if (v2 !== null) {
+      return {
+        npcId: v2.npc.id,
+        npcName: v2.npc.name,
+        treeId: V2_MEMORY_TREE_ID,
+        nodeId: v2.turn.topicId,
+        text: v2.reply?.text ?? "",
+        availableOptions: orderedV2Options().map((entry) => ({
+          id: entry.option.id,
+          text: entry.option.text,
+          nextNodeId: entry.isExit ? "_end" : entry.option.topicId,
+        })),
+        isTerminal: false,
+      };
+    }
     if (!state || !currentNode) return null;
     return {
       npcId: state.npc.id,
@@ -455,7 +522,7 @@
   ): void {
     // An agent turn replaces the previous turn in place; a normal NPC
     // dialogue is closed first so the two can never share the panel.
-    if (state !== null) close();
+    if (state !== null || v2 !== null) close();
     agentTurnActive = true;
 
     if (!container) {
@@ -497,8 +564,192 @@
     });
   }
 
+  // -------------------------------------------------------------------------
+  // WS3: the v2 conversation-turn flow (C-77)
+  // -------------------------------------------------------------------------
+
+  /** Used option ids across the persistent memory and this session. */
+  function v2UsedOptionIds(): string[] {
+    if (v2 === null) return [];
+    const ids = new Set<string>([...v2.memory.usedOptionIds]);
+    for (const usage of Object.values(v2.session.usage)) {
+      for (const id of usage.usedOptionIds) ids.add(id);
+    }
+    return [...ids];
+  }
+
+  /**
+   * The turn's options, reordered by the stored steered curation when one
+   * exists. The exit option was never sent to the steerer, so it always
+   * stays last (AC-04: the exit reserves its slot).
+   */
+  function orderedV2Options(): TurnOption[] {
+    if (v2 === null) return [];
+    const entries = [...v2.turn.options];
+    const steerer = v2.steerer;
+    if (steerer === null) return entries;
+    const stored = steerer.memoOptionOrder(v2.npc.id, v2.turn.topicId, v2UsedOptionIds());
+    if (stored === null) return entries;
+    const rank = new Map<string, number>(stored.map((id, index) => [id, index]));
+    return entries.sort(
+      (a, b) =>
+        (rank.get(a.option.id) ?? Number.MAX_SAFE_INTEGER)
+        - (rank.get(b.option.id) ?? Number.MAX_SAFE_INTEGER),
+    );
+  }
+
+  function ensureV2Container(): HTMLElement {
+    if (container === null) {
+      container = document.createElement("div");
+      container.className = "dialogue";
+      root.appendChild(container);
+    }
+    return container;
+  }
+
+  /**
+   * Judge the current turn in the background. The authored fallback is
+   * already on screen, so a slow/failed judgment can never block or blank
+   * the panel (AC-10/11) - a landing curation merely reorders options.
+   */
+  function steerCurrentTurn(): void {
+    if (v2 === null || v2.steerer === null) return;
+    const steerer = v2.steerer;
+    void steerer
+      .steerTurn({
+        npcId: v2.npc.id,
+        topicId: v2.turn.topicId,
+        options: v2.turn.options.filter((entry) => !entry.isExit).map((entry) => entry.option),
+        replies: v2.turn.replyCandidates,
+        usedOptionIds: v2UsedOptionIds(),
+        usedReplyIds: [...v2.memory.usedReplyIds],
+        facts: { "relationship.value": game.get().npcRelationships[v2.npc.id] ?? 50 },
+      })
+      .then(() => {
+        if (v2 !== null) renderV2();
+      })
+      .catch(() => undefined);
+  }
+
+  function openV2(npc: NPC, steerer: DialogueSteererHandle | null): void {
+    if (state !== null || v2 !== null || agentTurnActive) return;
+    const pool = dialoguePoolFor(npc.id);
+    if (pool === undefined) return;
+    const memory = v2MemoryFor(npc.id);
+    setMemory(npc.id, { visitCount: getMemory(npc.id).visitCount + 1 });
+    const session = newConversationSession();
+    const turn = buildTurn(game.get(), npc.id, memory, session, pool);
+    if (turn === null) return;
+    v2 = {
+      npc,
+      pool,
+      memory,
+      session,
+      turn,
+      reply: turn.replyCandidates[0] ?? null,
+      pendingOffer: null,
+      steerer,
+    };
+    setMemory(npc.id, { lastTopic: turn.topicId });
+    steerCurrentTurn();
+    renderV2();
+  }
+
+  function renderV2(): void {
+    if (v2 === null) return;
+    const { npc, reply, pendingOffer } = v2;
+    const el = ensureV2Container();
+    const entries = orderedV2Options();
+    el.innerHTML = `
+      <div class="portrait">${escapeHtml(npc.emoji)}</div>
+      <div class="content">
+        <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
+        <div class="text">${escapeHtml(reply?.text ?? "")}</div>
+        <div class="options">
+          ${pendingOffer !== null
+            ? `<button class="task" data-v2-task>${escapeHtml(`Accept: ${pendingOffer.title}`)}</button>`
+            : ""}
+          ${entries
+            .map((entry, index) => `<button data-v2-opt="${index}">${escapeHtml(entry.option.text)}</button>`)
+            .join("")}
+        </div>
+      </div>
+      <button class="skip" data-skip>Skip</button>
+    `;
+    el.querySelector<HTMLButtonElement>("[data-v2-task]")?.addEventListener("click", () => pickV2Task());
+    el.querySelectorAll<HTMLButtonElement>("[data-v2-opt]").forEach((button) => {
+      button.addEventListener("click", () => pickV2(Number(button.dataset.v2Opt ?? "-1")));
+    });
+    el.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", finishV2);
+  }
+
+  /** Accepting a task sets an EXISTING flag via the standard effect path. */
+  function pickV2Task(): void {
+    if (v2 === null || v2.pendingOffer === null) return;
+    game.dispatch({ type: "set-flag", flag: v2.pendingOffer.flagToSet, value: true });
+    v2.pendingOffer = null;
+    renderV2();
+  }
+
+  function pickV2(index: number): void {
+    if (v2 === null) return;
+    const entry = orderedV2Options()[index];
+    if (entry === undefined) return;
+    if (entry.isExit) {
+      finishV2();
+      return;
+    }
+    const option = entry.option;
+    // The reply was pre-decided while the turn was on screen (D-48):
+    // stored steered answer first, deterministic authored fallback second.
+    const stored = v2.steerer?.memoReply(v2.npc.id, v2.turn.topicId, v2UsedOptionIds()) ?? null;
+    const reply =
+      v2.turn.replyCandidates.find((candidate) => candidate.id === stored?.replyId)
+      ?? v2.turn.replyCandidates[0]
+      ?? null;
+    const topicId = v2.turn.topicId;
+    if (reply !== null) {
+      // D-50: the reaction is the author-tagged bucket, mapped through the
+      // social model's single bucket table to a bounded delta. No numbers
+      // ever come from a judgment.
+      game.dispatch({
+        type: "add-relationship",
+        npcId: v2.npc.id,
+        delta: BUCKET_DELTAS[reply.relationshipHint ?? "neutral"].relDelta,
+      });
+      v2.pendingOffer =
+        reply.offersTaskId !== undefined
+          ? v2.pool.taskOffers.find((task) => task.id === reply.offersTaskId) ?? null
+          : null;
+    }
+    // L-2026-08-30-02: an option the player answered never comes back.
+    markOptionPicked(v2.npc.id, V2_MEMORY_TREE_ID, option.id);
+    v2.memory = {
+      usedOptionIds: new Set([...v2.memory.usedOptionIds, option.id]),
+      usedReplyIds: new Set([...v2.memory.usedReplyIds, reply?.id ?? ""]),
+    };
+    v2.session = recordExchange(v2.session, topicId, option.id, reply?.id ?? "none");
+    setMemory(v2.npc.id, { lastTopic: topicId });
+    const nextTurn = buildTurn(game.get(), v2.npc.id, v2.memory, v2.session, v2.pool);
+    if (nextTurn === null) {
+      finishV2();
+      return;
+    }
+    v2.turn = nextTurn;
+    v2.reply = nextTurn.replyCandidates[0] ?? null;
+    steerCurrentTurn();
+    renderV2();
+  }
+
+  function finishV2(): void {
+    game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
+    v2?.steerer?.resetSession();
+    close();
+  }
+
   return {
     open,
+    openV2,
     openAgentTurn,
     isAgentTurn: () => agentTurnActive,
     close,

```

## 8. Deviations and flags for the orchestrator

1. **`src/content/npc-content/registry.ts` touched (type-only, +7 lines).** The allowed glob `src/content/npc-content/*.ts` includes it, and the registry's own header says the schema v2 types arrive with WS3 — I added one OPTIONAL field `dialoguePool?: NpcDialoguePool` to `NpcContentEntry` so pools register through the WS0 registry (`registerNpcContent`) as briefed. Zero runtime change; the WS0 registry test still passes. If you consider registry.ts off-limits, the alternative is a module-level pool map inside `dialogue-schema.ts` — a ~20-line refactor of `dialogue-pool*` imports, say the word.
2. **V2 conversations run with `?jev=off` too.** The pools are content: with the steerer null (or unconfigured), `openV2` plays the deterministic authored fallback. This is C-77's intent (the fixed-tree "loop of the same stupid text" is dead by construction, not only when Jev is up), and it matches Flow C (fallback = authored default). The legacy trees remain fully functional and are still served for grazyna, maciek, zosia, pawel, kasia, tomek, ania, janusz, burek, przemek, dawid. If you want a hard kill-switch back to legacy trees per NPC, that is a one-line condition in the `openDialogueWith` patch.
3. **The brief's "sticker on the monitor" task became "sticker ops on the PRINTER"** (Marek's pool) — same joke, but it sets the EXISTING `janusz-leave-printer` flag and lands inside the printer lore. Inventing a new flag for a monitor sticker would have violated "sets an EXISTING flag".
4. **`ReplyCandidate` carries no `topicId`** (the brief's shape); replies are scoped by living inside their topic's array. Options keep `topicId` (the brief lists it).
5. **TTS does not fire for v2 lines** — v2 replies have no TTS asset ids; the legacy `onNodeShown` TTS path is untouched. Follow-up for a later wave: mint TTS ids for pool replies or scope TTS to greeting turns.
6. **One batched request per turn carries both surfaces** (option Scores + reply Choice) under surface `reply-selection`. Per-surface log rows are still emitted (`option-curation` + `reply-selection`), so the debug panel keeps row-level honesty. If the ADR wants separate requests per surface, it is a wrapper-local change.
7. **WS10/WS6 concurrency:** full suite green with their files present; I did not touch any of their files. WS6 committed `main.ts` changes mid-run — my patch was re-baselined and re-verified against the post-`5573d66` tree (all 13 anchors applied, tsc 0).

## 9. How to wire it (post-apply checklist for the orchestrator)

1. Apply §7a and §7b (`git apply`).
2. `pnpm typecheck` (verified 0 in the throwaway copy) → `pnpm test` (1098+ green expected; new total 1161 with the copy's numbers as reference).
3. Bump `src/version.ts` per PR-13 (yours, not mine).
4. In-game: talk to bartek/renata/klaudia/marek → v2 conversation (topic pivots after a thread runs dry, "Wrap it up." always visible, task offers as highlighted Accept buttons); talk to grazyna → legacy tree unchanged. `?jev=shadow` logs `shadow` rows without steering; `?jev=off` runs pure fallback.
5. Playwright screenshot per PR-2 before declaring the wave done (yours).
