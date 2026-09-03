/**
 * UI: the WebMCP agent-setup modal.
 *
 * One page that answers what this is, why it is worth doing, the two ways
 * into it, and what to paste into the agent. Opened from Renata's dialogue,
 * from other coworkers' agent branches, and from the Help modal - all via
 * the `stack-underflow:open-modal` DOM event, so none of them need to know
 * this file exists.
 *
 * All copy lives in src/content/webmcp-help.ts, shared with the dialogue
 * buttons, so the links and the prompt are authored exactly once.
 */

import { AGENT_PROMPT, COPY_HINT, WEBMCP_FAQ, WEBMCP_PATHS } from "../content/webmcp-help";

export interface WebmcpHelpModalHandle {
  root: HTMLElement;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

export function mountWebmcpHelpModal(parent: HTMLElement): WebmcpHelpModalHandle {
  const wrap = document.createElement("div");
  wrap.className = "help-modal webmcp-modal";
  wrap.setAttribute("aria-hidden", "true");
  wrap.setAttribute("role", "dialog");
  wrap.innerHTML = `
    <div class="help-modal-backdrop" data-backdrop></div>
    <div class="help-modal-card" aria-modal="true" aria-labelledby="webmcp-modal-title">
      <div class="help-modal-header">
        <div class="help-modal-title" id="webmcp-modal-title">Play with your AI agent</div>
        <button class="help-modal-close" data-close type="button" aria-label="Close">x</button>
      </div>
      <div class="help-modal-body">
        <p>This game hands your browser's AI agent a set of tools - WebMCP site tools. The
        agent joins the office as a <strong>robot coworker</strong>: it walks around, talks,
        and writes its own lines while you play. No API key, no server, no cost - the model
        is already in your browser. We only wrote the desk.</p>

        <h3>The two ways in</h3>
        ${WEBMCP_PATHS.map(
          (path) => `
          <div class="webmcp-path">
            <div class="webmcp-path-label"><a href="${path.href}" target="_blank" rel="noopener noreferrer">${path.label}</a></div>
            <p>${path.status} <a href="${path.href}" target="_blank" rel="noopener noreferrer">Read the docs</a>.</p>
          </div>`,
        ).join("")}
        <p class="webmcp-note">Other agents, like browser extensions that read and click the
        page for you, currently drive the screen instead of reading site tools - they can
        watch the robot, but not yet be it. That is their roadmap, not ours.</p>

        <h3>Then paste this into your agent</h3>
        <pre class="webmcp-prompt" data-prompt></pre>
        <button class="dialogue-action" data-copy type="button">Copy prompt to clipboard</button>

        <h3>If it does not work</h3>
        <dl class="webmcp-faq">
          ${WEBMCP_FAQ.map((entry) => `<dt>${entry.q}</dt><dd>${entry.a}</dd>`).join("")}
        </dl>
      </div>
    </div>
  `;
  parent.appendChild(wrap);
  wrap.querySelector<HTMLPreElement>("[data-prompt]")!.textContent = AGENT_PROMPT;

  const isOpen = (): boolean => wrap.getAttribute("aria-hidden") === "false";

  const close = (): void => {
    wrap.classList.remove("open");
    wrap.setAttribute("aria-hidden", "true");
  };
  const open = (): void => {
    wrap.classList.add("open");
    wrap.setAttribute("aria-hidden", "false");
  };

  wrap.querySelector<HTMLButtonElement>("[data-close]")!.addEventListener("click", close);
  wrap.querySelector<HTMLElement>("[data-backdrop]")!.addEventListener("click", close);
  wrap.querySelector<HTMLButtonElement>("[data-copy]")!.addEventListener("click", (e) => {
    const button = e.currentTarget as HTMLButtonElement;
    void navigator.clipboard
      .writeText(AGENT_PROMPT)
      .then(() => {
        button.textContent = COPY_HINT;
        setTimeout(() => {
          button.textContent = "Copy prompt to clipboard";
        }, 2500);
      })
      .catch(() => {
        // Denied clipboard: select the prompt so Ctrl+C just works.
        const range = document.createRange();
        range.selectNodeContents(wrap.querySelector("[data-prompt]")!);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        button.textContent = "Copy blocked - prompt selected, press Ctrl+C";
      });
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) close();
  });

  return { root: wrap, open, close, isOpen };
}
