/**
 * Mini-game: Debug the Script.
 *
 * The player sees a fake code editor with a short script. Some lines are
 * subtly wrong. The player must click on the wrong lines to fix them.
 *
 * For the MVP this is a 30-45 second mini-game:
 * - 60-second timer.
 * - 3 bugs to find.
 * - Clicking a non-buggy line reduces credibility.
 * - Win: payout 200-500 zl, +5 credibility.
 * - Lose: no payout, -10 credibility.
 */

import { game } from "../game/state";
import type { GameState } from "../types";

interface ScriptLine {
  code: string;
  isBug: boolean;
  bugKind?: "typo" | "logic" | "syntax" | "style";
}

const SCRIPT_TEMPLATES: Array<{ name: string; lines: ScriptLine[] }> = [
  {
    name: "Order Processing",
    lines: [
      { code: "def calculate_total(items):", isBug: false },
      { code: "    total = 0", isBug: false },
      { code: "    for item in items:", isBug: false },
      { code: "        total += item['price'] * item['qty']", isBug: true, bugKind: "logic" },
      { code: "    return total", isBug: false },
      { code: "", isBug: false },
      { code: "def apply_discount(total, pct):", isBug: false },
      { code: "    return total - (total * pct) / 100", isBug: false },
      { code: "", isBug: false },
      { code: "items = cart.load()", isBug: false },
      { code: "t = calculate_total(items)", isBug: false },
      { code: "t = apply_discount(t, 10)", isBug: false },
      { code: "if t > 1000:", isBug: false },
      { code: "    t = apply_discount(t, 5)  # extra discount", isBug: false },
      { code: "charge(t)", isBug: false },
      { code: "", isBug: false },
      { code: "# BUG: tax not applied", isBug: false },
      { code: "def charge(amount):", isBug: false },
      { code: "    print('Charging', amount)  # placeholder", isBug: true, bugKind: "syntax" },
      { code: "", isBug: false },
      { code: "import datatime", isBug: true, bugKind: "typo" },
      { code: "now = datatime.datetime.now()", isBug: false },
      { code: "log('order processed at', now)", isBug: false },
    ],
  },
  {
    name: "API Health Check",
    lines: [
      { code: "import requests", isBug: false },
      { code: "", isBug: false },
      { code: "def check_endpoints():", isBug: false },
      { code: "    urls = [", isBug: false },
      { code: "        'https://api.example.com/health',", isBug: false },
      { code: "        'https://api.example.com/version',", isBug: false },
      { code: "        'https://api.example.com/metrics',", isBug: false },
      { code: "    ]", isBug: false },
      { code: "    results = {}", isBug: false },
      { code: "    for url in urls:", isBug: false },
      { code: "        try:", isBug: false },
      { code: "            r = requests.get(url, timeout=5)", isBug: false },
      { code: "            results[url] = r.status_code", isBug: false },
      { code: "        except:", isBug: true, bugKind: "style" },
      { code: "            pass", isBug: false },
      { code: "    return results", isBug: false },
      { code: "", isBug: false },
      { code: "if __name__ == '__main__':", isBug: false },
      { code: "    print(check_endpoints())", isBug: false },
      { code: "", isBug: false },
      { code: "# TODO: add retry logic", isBug: false },
      { code: "# BUG: 'except' with no exception type is too broad", isBug: true, bugKind: "logic" },
      { code: "def retry(func, n=3):", isBug: false },
      { code: "    for i in range(n)", isBug: true, bugKind: "syntax" },
      { code: "        try:", isBug: false },
      { code: "            return func()", isBug: false },
      { code: "        except Exception:", isBug: false },
      { code: "            continue", isBug: false },
      { code: "    return None", isBug: false },
    ],
  },
  {
    name: "User Service",
    lines: [
      { code: "class UserService:", isBug: false },
      { code: "    def __init__(self, db):", isBug: false },
      { code: "        self.db = db", isBug: false },
      { code: "", isBug: false },
      { code: "    def get_user(self, id):", isBug: false },
      { code: "        return self.db.query('SELECT * FROM users WHERE id = ?', id)", isBug: false },
      { code: "", isBug: false },
      { code: "    def create_user(self, data):", isBug: false },
      { code: "        if not data.get('email'):", isBug: false },
      { code: "            raise ValueError('email required')", isBug: false },
      { code: "        self.db.execute('INSERT INTO users ...')", isBug: true, bugKind: "logic" },
      { code: "        return data", isBug: false },
      { code: "", isBug: false },
      { code: "    def delete_user(self, id):", isBug: false },
      { code: "        # BUG: this is a hard delete, should be soft", isBug: true, bugKind: "logic" },
      { code: "        self.db.execute('DELETE FROM users WHERE id = ?', id)", isBug: false },
      { code: "", isBug: false },
      { code: "    def list_users(self):", isBug: false },
      { code: "        return self.db.query('SELECT * FROM users')", isBug: false },
      { code: "", isBug: false },
      { code: "# BUG: hardcoded secret in plain text", isBug: true, bugKind: "logic" },
      { code: "API_KEY = 'sk-1234567890abcdef'", isBug: false },
    ],
  },
];

export interface DebugScriptResult {
  won: boolean;
  bugsFound: number;
  bugsTotal: number;
  wrongClicks: number;
  payout: number;
}

export interface DebugScriptHandle {
  root: HTMLElement;
  start: () => DebugScriptResult;
}

export function mountDebugScript(root: HTMLElement, onComplete: (r: DebugScriptResult) => void): DebugScriptHandle {
  let timer: number | null = null;
  let totalBugs = 0;
  let bugsFound = 0;
  let wrongClicks = 0;
  let timeLeft = 60;
  let done = false;

  function pickScript(): ScriptLine[] {
    const tpl = SCRIPT_TEMPLATES[Math.floor(Math.random() * SCRIPT_TEMPLATES.length)]!;
    return tpl.lines;
  }

  function start(): DebugScriptResult {
    done = false;
    bugsFound = 0;
    wrongClicks = 0;
    timeLeft = 60;
    const lines = pickScript();
    totalBugs = lines.filter((l) => l.isBug).length;
    render(lines);
    if (timer) clearInterval(timer);
    timer = window.setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) finish(false);
    }, 1000);
    return { won: false, bugsFound: 0, bugsTotal: totalBugs, wrongClicks: 0, payout: 0 };
  }

  function updateTimer(): void {
    const t = root.querySelector("[data-time]");
    if (t) t.textContent = String(timeLeft);
  }

  function render(lines: ScriptLine[]): void {
    root.innerHTML = `
      <div class="daily-summary">
        <div class="panel" style="max-width: 720px">
          <h2>Debug the script - earn up to 500 zl</h2>
          <div style="font-size: 18px; color: var(--text-dim); margin-bottom: 12px">Click on the <span style="color: var(--danger)">buggy lines</span>. You have <span data-time style="color: var(--accent-warm)">60</span> seconds.</div>
          <div style="background: #000; border: 1px solid var(--panel-border); padding: 12px; font-family: monospace; font-size: 18px; max-height: 360px; overflow-y: auto; margin-bottom: 12px">
            ${lines
              .map(
                (l, i) =>
                  `<div data-line="${i}" class="code-line" style="cursor: pointer; padding: 2px 4px; border-radius: 2px">${escapeHtml(l.code) || "&nbsp;"}</div>`,
              )
              .join("")}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px">
            <div style="font-size: 18px">Credibility: <span data-cred>${game.get().stats.credibility}</span></div>
            <div style="font-size: 18px">Bugs found: <span data-bugs>0</span> / ${totalBugs}</div>
            <div>
              <button data-action="submit" class="primary" style="font-family: var(--font-pixel-bold); font-size: 14px; padding: 8px 16px; background: var(--accent); color: #000; border: 2px solid var(--accent); cursor: pointer">Submit</button>
              <button data-action="walkaway" style="font-family: var(--font-pixel-bold); font-size: 14px; padding: 8px 16px; background: var(--panel); color: var(--fg); border: 2px solid var(--panel-border); cursor: pointer">Walk Away</button>
            </div>
          </div>
        </div>
      </div>
    `;
    root.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
      el.addEventListener("click", () => {
        if (done) return;
        const idx = parseInt(el.dataset.line ?? "-1", 10);
        if (idx < 0 || idx >= lines.length) return;
        const line = lines[idx]!;
        if (el.dataset.flagged === "1") return;
        el.dataset.flagged = "1";
        if (line.isBug) {
          el.style.background = "rgba(0, 255, 127, 0.2)";
          el.style.borderLeft = "3px solid var(--accent)";
          bugsFound++;
          root.querySelector("[data-bugs]")!.textContent = String(bugsFound);
        } else {
          el.style.background = "rgba(255, 51, 51, 0.2)";
          el.style.borderLeft = "3px solid var(--danger)";
          wrongClicks++;
          game.dispatch({ type: "add-stat", stat: "credibility", delta: -3 });
          root.querySelector("[data-cred]")!.textContent = String(game.get().stats.credibility);
        }
      });
    });
    root.querySelector<HTMLButtonElement>('[data-action="submit"]')!.addEventListener("click", () => {
      if (done) return;
      finish(bugsFound >= totalBugs);
    });
    root.querySelector<HTMLButtonElement>('[data-action="walkaway"]')!.addEventListener("click", () => {
      if (done) return;
      finish(false, true);
    });
  }

  function finish(won: boolean, walkedAway: boolean = false): void {
    if (done) return;
    done = true;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    const payout = won ? 200 + Math.floor(Math.random() * 300) : 0;
    if (won) {
      game.dispatch({ type: "add-cash", amount: payout });
      game.dispatch({ type: "add-stat", stat: "credibility", delta: 5 });
      game.dispatch({ type: "increment-total", key: "miniGamesWon" });
    } else if (!walkedAway) {
      game.dispatch({ type: "increment-total", key: "miniGamesLost" });
    }
    const result: DebugScriptResult = {
      won,
      bugsFound,
      bugsTotal: totalBugs,
      wrongClicks,
      payout,
    };
    onComplete(result);
  }

  return { root, start };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const SCRIPT_PREVIEWS: ReadonlyArray<{ name: string; bugCount: number }> = SCRIPT_TEMPLATES.map((t) => ({
  name: t.name,
  bugCount: t.lines.filter((l) => l.isBug).length,
}));

// Suppress unused import warning for GameState in strict mode.
export type { GameState };
