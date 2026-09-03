/**
 * UI: title screen + character creation.
 */

import type { SpecializationId, TraitId } from "../types";
import { GAME_VERSION } from "../version";

const GAME_NAME = "Stack Underflow"; // working title; will be replaced if GLM 5.3 has a better one

/** Shape of the WebMCP registration result the title screen reports. */
export interface WebmcpStatusView {
  supported: boolean;
  namespace: string | null;
  registered: number;
}

/**
 * The two brands that BUILT the game (Lucas, 2026-09-03). Deliberately
 * worded as creators: the fictional office in this game is a comedy of
 * dysfunction, and neither company is being depicted by it (AC-BRAND-03).
 */
const CREATORS: ReadonlyArray<{ name: string; href: string; logo: string }> = [
  { name: "Edukey", href: "https://edukey.ai", logo: "/assets/edukey/logo-edukey.svg" },
  {
    name: "DevPowers",
    href: "https://devpowers.com",
    // Horizontal lockup here: the title footer is a wide, short strip, so
    // the vertical version used on the reception wall would tower over it.
    logo: "/assets/devpowers/logo-horizontal.svg",
  },
];

export function mountTitleScreen(
  root: HTMLElement,
  hasSave: boolean,
  onNewGame: () => void,
  onContinue: () => void,
  webmcp: WebmcpStatusView = { supported: false, namespace: null, registered: 0 },
): void {
  root.innerHTML = `
    <div class="title-screen">
      <h1>${GAME_NAME}</h1>
      <div class="subtitle">A retro pixel-art business sim about being an IT trainer. Do not go bankrupt. Become the best in the GALAXY.</div>
      <div class="menu">
        <button data-action="new">New Game</button>
        <button data-action="continue" ${hasSave ? "" : "disabled"}>Continue</button>
      </div>
      <div class="version">${GAME_VERSION} - a Lucas Matuszewski project</div>
      <div class="agent-status ${webmcp.supported ? "is-live" : "is-off"}">
        ${
          webmcp.supported
            ? `Agent play ready - ${webmcp.registered} WebMCP tools live`
            : "Agent play unavailable in this browser - the game plays normally"
        }
      </div>
      <div class="creators">
        <span class="creators-label">Built by</span>
        ${CREATORS.map(
          (c) =>
            `<a class="creator-link" href="${c.href}" target="_blank" rel="noopener noreferrer" title="${c.name}">` +
            `<img src="${c.logo}" alt="${c.name}" />` +
            `</a>`,
        ).join('<span class="creators-sep">+</span>')}
      </div>
    </div>
  `;
  root.querySelector<HTMLButtonElement>('[data-action="new"]')!.addEventListener("click", onNewGame);
  const contBtn = root.querySelector<HTMLButtonElement>('[data-action="continue"]')!;
  contBtn.addEventListener("click", onContinue);
}

const SPECIALIZATIONS: Array<{ id: SpecializationId; name: string; desc: string }> = [
  { id: "frontend", name: "Frontend", desc: "You know CSS. Barely. But you know it." },
  { id: "backend", name: "Backend", desc: "APIs all the way down." },
  { id: "devops", name: "DevOps", desc: "YAML is your love language." },
  { id: "ai", name: "AI/ML", desc: "You read the paper once. You have opinions." },
  { id: "generalist", name: "Generalist", desc: "You do a little of everything. Master of none." },
];

const TRAITS: Array<{ id: TraitId; name: string; desc: string }> = [
  { id: "coffee-fueled", name: "Coffee-Fueled", desc: "+10 caffeine, -5 patience." },
  { id: "linkedin-influencer", name: "LinkedIn Influencer", desc: "+10 reputation, -10 credibility." },
  { id: "debugger", name: "Debugger by Trade", desc: "+10 focus, -5 caffeine." },
  { id: "wing-it", name: "Wing It", desc: "+5 to all stats. The game does not know why either." },
];

export function mountCharacterCreate(
  root: HTMLElement,
  onSubmit: (data: { name: string; specialization: SpecializationId; trait: TraitId }) => void,
  onCancel: () => void,
): { setName: (n: string) => void } {
  let selectedSpec: SpecializationId = "generalist";
  let selectedTrait: TraitId = "debugger";

  root.innerHTML = `
    <div class="character-create">
      <div class="panel">
        <h2>Who are you?</h2>
        <div>
          <label>Name</label>
          <input type="text" data-name maxlength="20" value="Alex" />
        </div>
        <div>
          <label>Specialization</label>
          <div class="options" data-spec>
            ${SPECIALIZATIONS.map(
              (s) => `<div class="option ${s.id === selectedSpec ? "selected" : ""}" data-spec-id="${s.id}">
                <strong>${s.name}</strong><br><span style="color: var(--text-dim); font-size: 16px">${s.desc}</span>
              </div>`,
            ).join("")}
          </div>
        </div>
        <div class="preview">
          (3D character preview placeholder)
        </div>
        <div style="grid-column: 1 / -1">
          <label>Personality</label>
          <div class="options" data-trait>
            ${TRAITS.map(
              (t) => `<div class="option ${t.id === selectedTrait ? "selected" : ""}" data-trait-id="${t.id}">
                <strong>${t.name}</strong> <span style="color: var(--text-dim); font-size: 16px">- ${t.desc}</span>
              </div>`,
            ).join("")}
          </div>
        </div>
        <div class="actions">
          <button data-action="cancel">Cancel</button>
          <button data-action="begin" class="primary">Begin Career</button>
        </div>
      </div>
    </div>
  `;

  const nameInput = root.querySelector<HTMLInputElement>("[data-name]")!;
  const beginBtn = root.querySelector<HTMLButtonElement>('[data-action="begin"]')!;
  const cancelBtn = root.querySelector<HTMLButtonElement>('[data-action="cancel"]')!;

  function updateBegin(): void {
    beginBtn.disabled = nameInput.value.trim().length === 0;
  }
  nameInput.addEventListener("input", updateBegin);
  updateBegin();

  root.querySelectorAll<HTMLElement>("[data-spec-id]").forEach((el) => {
    el.addEventListener("click", () => {
      selectedSpec = el.dataset.specId as SpecializationId;
      root.querySelectorAll<HTMLElement>("[data-spec-id]").forEach((x) =>
        x.classList.toggle("selected", x === el),
      );
    });
  });
  root.querySelectorAll<HTMLElement>("[data-trait-id]").forEach((el) => {
    el.addEventListener("click", () => {
      selectedTrait = el.dataset.traitId as TraitId;
      root.querySelectorAll<HTMLElement>("[data-trait-id]").forEach((x) =>
        x.classList.toggle("selected", x === el),
      );
    });
  });

  beginBtn.addEventListener("click", () => {
    onSubmit({ name: nameInput.value.trim() || "Alex", specialization: selectedSpec, trait: selectedTrait });
  });
  cancelBtn.addEventListener("click", onCancel);

  return { setName: (n) => (nameInput.value = n) };
}

export function showDailySummary(
  root: HTMLElement,
  data: {
    day: number;
    income: number;
    expenses: number;
    net: number;
    meme: string;
    onContinue: () => void;
  },
): void {
  root.innerHTML = `
    <div class="daily-summary">
      <div class="panel">
        <h2>Day ${data.day} Summary</h2>
        <div class="row"><span>Passive income</span><span class="pos">+${data.income} zl</span></div>
        <div class="row"><span>Rent</span><span class="neg">-120 zl</span></div>
        <div class="row"><span>Coffee</span><span class="neg">-8 zl</span></div>
        <div class="row"><span>Ramen</span><span class="neg">-25 zl</span></div>
        <div class="row"><span>LinkedIn Premium</span><span class="neg">-49 zl</span></div>
        <div class="row total"><span>Net</span><span class="${data.net >= 0 ? "pos" : "neg"}">${data.net >= 0 ? "+" : ""}${data.net} zl</span></div>
        <div class="row meme">"${data.meme}"</div>
        <div class="actions">
          <button data-action="continue">Continue</button>
        </div>
      </div>
    </div>
  `;
  root.querySelector<HTMLButtonElement>('[data-action="continue"]')!.addEventListener("click", data.onContinue);
}

export function showGameOver(
  root: HTMLElement,
  data: { days: number; cashEarned: number; miniGamesWon: number; miniGamesLost: number; dialoguesFinished: number; finalLine: string },
): void {
  root.innerHTML = `
    <div class="game-over">
      <h1>YOU WENT BANKRUPT</h1>
      <div class="stats">
        <div class="stat">Days survived: ${data.days}</div>
        <div class="stat">Cash earned: ${data.cashEarned} zl</div>
        <div class="stat">Mini-games won: ${data.miniGamesWon} (lost ${data.miniGamesLost})</div>
        <div class="stat">Dialogues finished: ${data.dialoguesFinished}</div>
      </div>
      <div class="final-line">"${data.finalLine}"</div>
      <button data-action="title">Back to Title</button>
    </div>
  `;
  root.querySelector<HTMLButtonElement>('[data-action="title"]')!.addEventListener("click", () => {
    location.reload();
  });
}
