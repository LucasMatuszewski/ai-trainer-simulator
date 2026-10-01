/**
 * WS7 UI: the conference-speech mission (AC-23, PRD Flow G UI spec).
 *
 * A full-screen overlay panel following the help-modal conventions
 * (backdrop + card, the game's pixel tokens). Three views:
 *
 *   intro card  — mission title, topic, scene-setting intro,
 *                 "Begin speech" / "Not yet" (cancel).
 *   speech view — the current talking point OR the highlighted plant
 *                 question ("Kasia — The Recruiter: '...'") with 4
 *                 answer buttons, the panel-only audience engagement
 *                 meter (AC-23: no seated crowd this slice — reactions
 *                 are TEXT), and an Abandon button.
 *   results card— outcome, credibility change, payment, audience
 *                 quotes, "Continue".
 *
 * Keyboard: 1-4 answers a question, Space advances (a run of
 * consecutive points folds onto the next question; an answered
 * question advances one step). Escape is owned by main.ts's topmost
 * chain.
 *
 * Jev: the two steered surfaces resolve through the injected steerer
 * (question pick while the asker's hand is up, per-option score
 * prefetch while the question is on screen — D-56's pre-judge pattern,
 * a click never awaits). The authored fallback is ALWAYS rendered
 * first and a null steerer simply means the authored order everywhere
 * (AC-10: no waiting, no blocked interaction).
 *
 * Rewards apply EXACTLY ONCE, when the results card first renders, via
 * the injected `applyResult` (default: dispatch the standard
 * add-cash / add-stat / set-flag actions through the game store). The
 * persisted completion marker makes a replay free — and unpayable
 * (AC-25/AC-26). The overlay pauses nothing itself: main.ts's
 * simulation-clock gate treats an open mission like an open dialogue.
 */

import type { MissionDef } from "../content/missions";
import type { MissionSnapshot } from "../game/mission";
import { getMission } from "../content/missions";
import {
  credibilityBandOf,
  engagementBandOf,
  missionResultActions,
  type MissionResult,
} from "../game/mission";
import { game } from "../game/state";
import type {
  MissionPickQuestionRequest,
  MissionScoreRequest,
  MissionSteerer,
} from "../jev/mission-wrapper";

export interface MissionUiDeps {
  /** Jev steerer for the two mission surfaces. Null = authored only. */
  steerer?: MissionSteerer | null;
  /**
   * Apply a finished result (rewards + completion marker). Default:
   * dispatch `missionResultActions` through the real game store.
   */
  applyResult?: (mission: MissionDef, result: MissionResult) => void;
  /**
   * Readout of the persisted completion/reward marker. Default: the
   * mission's completion flag or its `missionCompletions` entry in the
   * save-v2 game state.
   */
  isCompleted?: (mission: MissionDef) => boolean;
}

export interface MissionUiHandle {
  root: HTMLElement;
  /** Open the mission's intro card. False for an unknown mission id. */
  open(missionId: string): boolean;
  close(): void;
  isOpen(): boolean;
  /** The runtime snapshot driving the current view (null before Begin / after close). */
  snapshot(): MissionSnapshot | null;
  /** The finish result once the results card is up (null before). */
  result(): MissionResult | null;
}

const STYLE_ID = "mission-ui-styles";

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID) !== null) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .mission-overlay {
      position: fixed; inset: 0; z-index: 60;
      display: flex; align-items: center; justify-content: center;
      background: rgba(10, 10, 10, 0.82);
      font-family: var(--font-pixel, monospace);
      color: var(--fg, #e8e8e8);
      image-rendering: pixelated;
    }
    .mission-card {
      width: min(720px, 92vw); max-height: 88vh; overflow-y: auto;
      background: linear-gradient(180deg, var(--panel, #1a1a1a) 0%, var(--panel-dark, #0e0e0e) 100%);
      border: 2px solid var(--panel-border, #3a3a3a);
      padding: 24px 28px;
      display: flex; flex-direction: column; gap: 14px;
    }
    .mission-kicker { color: var(--accent-warm, #ffaa00); font-size: 18px; letter-spacing: 1px; }
    .mission-title {
      font-family: var(--font-pixel-bold, monospace);
      color: var(--accent, #00ff7f); font-size: 16px; line-height: 1.5;
    }
    .mission-topic { color: var(--text-dim, #c8c8c8); font-size: 18px; }
    .mission-body { font-size: 20px; line-height: 1.45; }
    .mission-plant-line { color: var(--accent-warm, #ffaa00); font-size: 18px; }
    .mission-question { font-size: 22px; line-height: 1.4; border-left: 4px solid var(--accent-warm, #ffaa00); padding-left: 12px; }
    .mission-options { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
    .mission-options button {
      text-align: left; font-family: var(--font-pixel, monospace); font-size: 19px;
      background: var(--panel-dark, #0e0e0e); color: var(--fg, #e8e8e8);
      border: 1px solid var(--panel-border, #3a3a3a); padding: 10px 12px; cursor: pointer;
    }
    .mission-options button:hover { border-color: var(--accent, #00ff7f); color: var(--accent, #00ff7f); }
    .mission-keycap {
      display: inline-block; min-width: 24px; margin-right: 10px;
      border: 1px solid var(--panel-border, #3a3a3a); color: var(--accent, #00ff7f);
      text-align: center; padding: 0 4px;
    }
    .mission-meter-track {
      height: 18px; background: var(--panel-dark, #0e0e0e);
      border: 1px solid var(--panel-border, #3a3a3a);
    }
    .mission-meter-fill { height: 100%; background: var(--accent, #00ff7f); transition: width 240ms steps(6); }
    .mission-meter-label { color: var(--text-dim, #c8c8c8); font-size: 16px; margin-bottom: 4px; }
    .mission-reaction { color: var(--accent-warm, #ffaa00); font-size: 19px; font-style: italic; }
    .mission-hint { color: var(--text-dim, #c8c8c8); font-size: 16px; }
    .mission-quote { font-size: 18px; color: var(--text-dim, #c8c8c8); line-height: 1.4; }
    .mission-reward { font-size: 22px; color: var(--accent, #00ff7f); }
    .mission-reward-negative { color: var(--danger, #ff3333); }
    .mission-note { color: var(--accent-warm, #ffaa00); font-size: 17px; }
    .mission-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
    .mission-actions button {
      font-family: var(--font-pixel-bold, monospace); font-size: 12px;
      background: var(--accent, #00ff7f); color: var(--panel-dark, #0e0e0e);
      border: 0; padding: 12px 18px; cursor: pointer;
    }
    .mission-actions button.ghost {
      background: transparent; color: var(--text-dim, #c8c8c8);
      border: 1px solid var(--panel-border, #3a3a3a);
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function signed(value: number): string {
  return value >= 0 ? `+${value}` : String(value);
}

export function mountMissionUi(root: HTMLElement, deps: MissionUiDeps = {}): MissionUiHandle {
  ensureStyles();

  const steerer = deps.steerer ?? null;
  const applyResult =
    deps.applyResult ??
    ((mission: MissionDef, result: MissionResult) => {
      for (const action of missionResultActions(mission, result)) game.dispatch(action);
    });
  const isCompleted =
    deps.isCompleted ??
    ((mission: MissionDef) =>
      game.get().flags[mission.completionFlag] === true ||
      (game.get().missionCompletions ?? []).includes(mission.id));

  let wrap: HTMLElement | null = null;
  let mission: MissionDef | null = null;
  let runtime: ReturnType<typeof import("../game/mission").createMissionRuntime> | null = null;
  let result: MissionResult | null = null;
  let rewardsApplied = false;
  /** Increments on open/begin/close so stale steerer resolutions are dropped. */
  let runToken = 0;
  /** optionId -> bounded adjustment, valid for `adjustmentsQuestionId`. */
  let adjustments: Record<string, -1 | 0 | 1> | null = null;
  let adjustmentsQuestionId: string | null = null;
  // WS7 (medium 7): questions already asked this run, so the pick request
  // never advertises an exhausted question.
  const askedQuestionIds = new Set<string>();

  const isOpen = (): boolean => wrap !== null;

  const container = (): HTMLElement => {
    if (wrap === null) {
      wrap = document.createElement("div");
      wrap.className = "mission-overlay";
      wrap.setAttribute("role", "dialog");
      wrap.setAttribute("aria-modal", "true");
      root.appendChild(wrap);
    }
    return wrap;
  };

  function close(): void {
    runToken += 1;
    runtime = null;
    result = null;
    mission = null;
    rewardsApplied = false;
    adjustments = null;
    adjustmentsQuestionId = null;
    if (wrap !== null) {
      wrap.remove();
      wrap = null;
    }
    window.removeEventListener("keydown", onKeyDown);
  }

  function open(missionId: string): boolean {
    const def = getMission(missionId);
    if (def === undefined) return false;
    if (isOpen()) close();
    mission = def;
    renderIntro();
    return true;
  }

  // ------------------------------------------------------------------
  // rendering
  // ------------------------------------------------------------------

  function renderIntro(): void {
    if (mission === null) return;
    const el = container();
    const replayNote = isCompleted(mission)
      ? `<div class="mission-note">You have delivered this speech before. Replays are free; ACME pays once.</div>`
      : "";
    el.innerHTML = `
      <div class="mission-card" data-mission-card>
        <div class="mission-kicker">Client day</div>
        <div class="mission-title">${escapeHtml(mission.title)}</div>
        <div class="mission-topic">${escapeHtml(mission.topic)}</div>
        <div class="mission-body">${escapeHtml(mission.intro)}</div>
        ${replayNote}
        <div class="mission-actions">
          <button class="ghost" data-mission-cancel type="button">Not yet</button>
          <button data-mission-begin type="button">Begin speech</button>
        </div>
      </div>
    `;
    el.querySelector<HTMLButtonElement>("[data-mission-begin]")!
      .addEventListener("click", begin);
    el.querySelector<HTMLButtonElement>("[data-mission-cancel]")!
      .addEventListener("click", close);
    window.addEventListener("keydown", onKeyDown);
  }

  function begin(): void {
    if (mission === null) return;
    runToken += 1;
    rewardsApplied = false;
    result = null;
    adjustments = null;
    adjustmentsQuestionId = null;
    askedQuestionIds.clear();
    // Late import avoided: the runtime module is a static dependency.
    runtime = createRuntime(mission, { isCompleted });
    runtime.start();
    renderSpeech();
    void prefetchForCurrentStep(runToken);
  }

  function renderSpeech(): void {
    if (mission === null || runtime === null) return;
    const snap = runtime.snapshot();
    const el = container();
    const stepLabel = `${snap.stepIndex + 1} / ${snap.stepCount}`;
    const middle = speechMiddleHtml(snap);
    el.innerHTML = `
      <div class="mission-card" data-mission-card>
        <div class="mission-kicker">${escapeHtml(mission.title)} <span>· step ${stepLabel}</span></div>
        ${renderMeter(snap)}
        ${middle}
        <div class="mission-hint">${hintFor(snap)}</div>
        <div class="mission-actions">
          <button class="ghost" data-mission-abandon type="button">Abandon</button>
          <button data-mission-continue type="button">Continue</button>
        </div>
      </div>
    `;
    el.querySelector<HTMLButtonElement>("[data-mission-abandon]")!
      .addEventListener("click", () => {
        runtime?.abort();
        close();
      });
    // Wave-3 verdict fix (medium 5): pointer players get a Continue button
    // (Space already advances) — no dead-end after points or answers.
    el.querySelector<HTMLButtonElement>("[data-mission-continue]")!
      .addEventListener("click", () => advanceOrFinish());
    el.querySelectorAll<HTMLButtonElement>("[data-mission-option]").forEach((button) => {
      button.addEventListener("click", () => {
        answerByIndex(Number(button.dataset.missionOption ?? "-1"));
      });
    });
  }

  function renderMeter(snap: MissionSnapshot): string {
    return `
      <div>
        <div class="mission-meter-label">Audience engagement: ${snap.engagement}/100</div>
        <div class="mission-meter-track">
          <div class="mission-meter-fill" style="width: ${snap.engagement}%" data-meter data-value="${snap.engagement}"></div>
        </div>
      </div>
    `;
  }

  function speechMiddleHtml(snap: MissionSnapshot): string {
    if (snap.phase === "talking-point" && snap.point !== null) {
      return `<div class="mission-body">${escapeHtml(snap.point.text)}</div>`;
    }
    const question = snap.question;
    if (question === null) {
      return `<div class="mission-body">The room settles.</div>`;
    }
    if (question.answeredOptionId === null) {
      return `
        <div>
          <div class="mission-plant-line">${escapeHtml(question.plantName)} — ${escapeHtml(question.plantRole)} raises a hand:</div>
          <div class="mission-question" data-mission-question>${escapeHtml(question.questionText)}</div>
          <div class="mission-options">
            ${question.options
              .map(
                (option: { text: string; baseScore: number }, index: number) =>
                  `<button type="button" data-mission-option="${index}">` +
                  `<span class="mission-keycap">${index + 1}</span>${escapeHtml(option.text)}</button>`,
              )
              .join("")}
          </div>
        </div>
      `;
    }
    return `
      <div>
        <div class="mission-plant-line">${escapeHtml(question.plantName)} asked:</div>
        <div class="mission-question">${escapeHtml(question.questionText)}</div>
        <div class="mission-reaction" data-mission-reaction>${escapeHtml(question.lastReaction ?? "")}</div>
      </div>
    `;
  }

  function hintFor(snap: MissionSnapshot): string {
    // A run of consecutive points folds into one press (the runtime
    // lands on the next plant question), so the honest hint is
    // "continue", not "next point".
    if (snap.phase === "talking-point") return "Space — continue";
    if (snap.question !== null && snap.question.answeredOptionId !== null) {
      return "Space — continue";
    }
    return "Press 1-4 to answer";
  }

  function renderResults(finished: MissionResult): void {
    if (mission === null) return;
    result = finished;
    const el = container();
    const headline =
      finished.outcome === "won"
        ? "The room applauds."
        : finished.outcome === "lost"
          ? "The room has already left, emotionally."
          : "You walked out. The room pretends this is normal.";
    const note = finished.payoutApplied
      ? ""
      : `<div class="mission-note">Already delivered — ACME does not pay twice.</div>`;
    el.innerHTML = `
      <div class="mission-card" data-mission-results>
        <div class="mission-kicker">Speech over</div>
        <div class="mission-title">${escapeHtml(headline)}</div>
        <div class="mission-body">Final engagement: ${finished.engagement}/100.</div>
        <div class="mission-reward ${finished.credibilityDelta < 0 ? "mission-reward-negative" : ""}">
          ${signed(finished.credibilityDelta)} credibility · ${signed(finished.cashReward)} zl
        </div>
        ${note}
        <div>
          ${finished.quotes.map((quote) => `<div class="mission-quote">- ${escapeHtml(quote)}</div>`).join("")}
        </div>
        <div class="mission-actions">
          <button data-mission-continue type="button">Continue</button>
        </div>
      </div>
    `;
    el.querySelector<HTMLButtonElement>("[data-mission-continue]")!
      .addEventListener("click", close);
    // AC-25: the reward applies exactly once, when the results first
    // render. payoutApplied is the runtime's marker-backed verdict.
    if (finished.payoutApplied && !rewardsApplied && mission !== null) {
      rewardsApplied = true;
      applyResult(mission, finished);
    }
  }

  // ------------------------------------------------------------------
  // steering (D-56 pre-judge pattern: a click never awaits)
  // ------------------------------------------------------------------

  function pickRequest(snap: MissionSnapshot): MissionPickQuestionRequest | null {
    if (mission === null || snap.question === null) return null;
    const question = snap.question;
    const plant = mission.plants.find((candidate) => candidate.npcId === question.plantId);
    if (plant === undefined) return null;
    // The steerer chooses among the plant's authored questions for this
    // step; the runtime rejects any pick that is not actually remaining
    // (exactly-once consumption), so an exhausted candidate degrades to
    // the authored order without a second request.
    return {
      missionId: mission.id,
      plantId: question.plantId,
      plantName: question.plantName,
      plantRole: question.plantRole,
      engagement: snap.engagement,
      engagementBand: engagementBandOf(snap.engagement),
      credibilityBand: credibilityBandOf(game.get().stats.credibility),
      questions: plant.questions.map((candidate) => ({
        id: candidate.id,
        text: candidate.text,
        description: candidate.description,
      })),
    };
  }

  async function prefetchForCurrentStep(token: number): Promise<void> {
    if (steerer === null || runtime === null || mission === null) return;
    const snap = runtime.snapshot();
    if (snap.phase !== "plant-question" || snap.question === null) return;
    const request = pickRequest(snap);
    if (request === null) return;
    // Wave-3 verdict fix (medium 7): never advertise questions that were
    // already asked — the runtime rejects them and the pick silently
    // falls back (the single-remaining-candidate optimization never
    // fired on this shape).
    const asked = askedQuestionIds;
    request.questions = request.questions.filter(
      (q) => !asked.has(q.id),
    );
    if (request.questions.length === 0) return;

    // While the asker's hand is up, try to steer WHICH question comes.
    // The panel shows the authored question the moment the pick
    // settles; without a steerer this branch never runs.
    renderSpeech();
    if (snap.question !== null) askedQuestionIds.add(snap.question.questionId);
    const pick = await steerer.pickQuestion(request).catch(() => null);
    if (token !== runToken || runtime === null) return;
    const afterPick = runtime.snapshot();
    if (
      pick !== null &&
      !pick.fallback &&
      pick.questionId !== null &&
      afterPick.phase === "plant-question" &&
      afterPick.question !== null &&
      afterPick.question.answeredOptionId === null
    ) {
      runtime.steerQuestionPick(pick.questionId);
      adjustments = null;
      adjustmentsQuestionId = null;
      renderSpeech();
    }

    // Pre-judge every visible option so the click applies instantly.
    const questionSnap = runtime.snapshot().question;
    if (questionSnap === null || questionSnap.answeredOptionId !== null) return;
    const scoreRequest: MissionScoreRequest = {
      missionId: mission.id,
      plantId: questionSnap.plantId,
      plantName: questionSnap.plantName,
      questionId: questionSnap.questionId,
      questionText: questionSnap.questionText,
      engagement: runtime.snapshot().engagement,
      engagementBand: engagementBandOf(runtime.snapshot().engagement),
      options: questionSnap.options.map((option) => ({
        id: option.id,
        text: option.text,
        baseScore: option.baseScore,
      })),
    };
    const scores = await steerer.scoreOptions(scoreRequest).catch(() => null);
    if (token !== runToken || runtime === null) return;
    // Wave-3 verdict fix (medium 6): a PARTIAL fallback still carries
    // valid judgments for the options that cleared the threshold — apply
    // them; only a total failure (no adjustments at all) leaves the
    // authored baseScores in place.
    if (scores !== null && Object.keys(scores.adjustments).length > 0) {
      adjustments = { ...scores.adjustments };
      adjustmentsQuestionId = questionSnap.questionId;
    }
  }

  // ------------------------------------------------------------------
  // player input
  // ------------------------------------------------------------------

  function answerByIndex(index: number): void {
    if (runtime === null) return;
    const question = runtime.snapshot().question;
    if (question === null || question.answeredOptionId !== null) return;
    const option = question.options[index];
    if (option === undefined) return;
    const steered =
      adjustments !== null && adjustmentsQuestionId === question.questionId
        ? (adjustments[option.id] ?? null)
        : null;
    const feedback = runtime.answer(option.id, steered);
    if (feedback !== null) renderSpeech();
  }

  function advanceOrFinish(): void {
    if (runtime === null) return;
    const snap = runtime.snapshot();
    if (snap.phase === "complete") return; // results own the flow now
    if (!runtime.advance()) return;
    const next = runtime.snapshot();
    if (next.phase === "complete") {
      renderResults(runtime.finish());
      return;
    }
    renderSpeech();
    void prefetchForCurrentStep(runToken);
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (runtime === null) return;
    // Lifecycle hygiene: if the host removed our root without close()
    // (screen teardown), this window listener must go inert and die —
    // a stale overlay must never answer keys or pay out.
    if (wrap !== null && !wrap.isConnected) {
      window.removeEventListener("keydown", onKeyDown);
      return;
    }
    const snap = runtime.snapshot();
    if (event.key === " " || event.code === "Space") {
      if (snap.phase === "talking-point" || (snap.question?.answeredOptionId ?? null) !== null) {
        event.preventDefault();
        advanceOrFinish();
      }
      return;
    }
    const optionIndex = Number(event.key) - 1;
    if (Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex <= 3) {
      const question = snap.question;
      if (question !== null && question.answeredOptionId === null) {
        event.preventDefault();
        answerByIndex(optionIndex);
      }
    }
  }

  return {
    root: root,
    open,
    close,
    isOpen,
    snapshot: () => runtime?.snapshot() ?? null,
    result: () => result,
  };
}

// Late-binding runtime factory: keeps the module graph simple while the
// tests can still drive the pure runtime directly.
import { createMissionRuntime as createRuntime } from "../game/mission";
