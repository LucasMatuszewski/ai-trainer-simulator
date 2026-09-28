/**
 * WS1 — "AI decisions (Jev)" settings section (PRD Flow D, AC-13/14).
 *
 * A self-contained mount: `mountJevSettings(container)` renders the
 * two-mode selector (Server default / Personal key), the masked key
 * input with Test + Clear actions, and the status line. DOM-only, no
 * framework; the game mounts it wherever its settings live (main.ts
 * wiring is an orchestrator patch).
 *
 * Key hygiene (D-59): the input is type=password, the key is never
 * rendered back as text, never logged, and the stored value is only
 * ever touched through the KeyProvider.
 */

import {
  createKeyProvider,
  type KeyProvider,
} from "../jev/key-provider";

export interface JevSettingsHandle {
  /** Re-read access mode and refresh the status line. */
  refresh(): void;
  /** Unmount (removes the rendered section). */
  destroy(): void;
}

export function mountJevSettings(
  container: HTMLElement,
  options: { provider?: KeyProvider } = {},
): JevSettingsHandle {
  const provider = options.provider ?? createKeyProvider();

  const section = document.createElement("section");
  section.className = "jev-settings";

  const heading = document.createElement("h3");
  heading.textContent = "AI decisions (Jev)";

  const modeLine = document.createElement("p");
  modeLine.className = "jev-settings-mode";

  const status = document.createElement("p");
  status.className = "jev-settings-status";
  status.setAttribute("role", "status");

  const keyLabel = document.createElement("label");
  keyLabel.className = "jev-settings-key-label";
  keyLabel.textContent = "Personal OpenRouter key";

  const keyInput = document.createElement("input");
  keyInput.type = "password";
  keyInput.autocomplete = "off";
  keyInput.placeholder = "sk-or-v1-…";

  const testButton = document.createElement("button");
  testButton.type = "button";
  testButton.textContent = "Test";

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.textContent = "Clear key";

  keyLabel.append(keyInput);
  section.append(heading, modeLine, keyLabel, testButton, clearButton, status);
  container.append(section);

  function accessText(): string {
    const access = provider.getAccess();
    switch (access.kind) {
      case "proxy":
        return "Server (default route)";
      case "personal":
        return provider.isPersistent() ? "Personal key (saved in this browser)" : "Personal key (this session only — storage unavailable)";
      default:
        return "Off — NPCs use the built-in defaults";
    }
  }

  function refresh(): void {
    modeLine.textContent = `Mode: ${accessText()}`;
  }

  function setStatus(text: string): void {
    status.textContent = text;
  }

  testButton.addEventListener("click", () => {
    const key = keyInput.value.trim();
    if (key === "") {
      setStatus("Paste a key first.");
      keyInput.focus();
      return;
    }
    testButton.disabled = true;
    setStatus("Testing…");
    provider
      .testKey(key)
      .then((result) => {
        switch (result.status) {
          case "connected":
            provider.setPersonalKey(key);
            keyInput.value = "";
            setStatus(`Connected — model ${result.model}`);
            break;
          case "invalid":
            setStatus("Invalid key.");
            keyInput.focus();
            break;
          default:
            setStatus("No network.");
            keyInput.focus();
        }
      })
      .finally(() => {
        testButton.disabled = false;
        refresh();
      });
  });

  clearButton.addEventListener("click", () => {
    provider.clearKey();
    keyInput.value = "";
    setStatus("Key removed.");
    refresh();
  });

  refresh();

  return {
    refresh,
    destroy() {
      section.remove();
    },
  };
}
