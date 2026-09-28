/**
 * WS1 key provider — access-mode resolution (ADR-0009 section 3.2,
 * D-46, D-59).
 *
 * Access priority (frozen by the ADR):
 *   1. Server proxy    — `VITE_JEV_PROXY_URL` (a URL, not a secret;
 *                        the proxy injects its own key server-side).
 *   2. Personal key    — localStorage `aitrainer:jev:key`, used ONLY
 *                        against the OpenRouter decisions origin.
 *   3. None            — unconfigured; wrappers fall back to authored
 *                        defaults without any network activity.
 *
 * Hygiene rules:
 *  - localStorage failures (denied access, quota) degrade to
 *    memory-only mode with `isPersistent() === false`.
 *  - `testKey()` performs one minimal judgment and returns a typed
 *    result; it never includes the key in anything it returns.
 *  - The key NEVER appears in any log, error, or decision payload.
 */

import type { DecisionClient } from "./contracts";
import {
  createOpenRouterAdapter,
  OPENROUTER_DECISIONS_URL,
} from "./openrouter-adapter";

export { OPENROUTER_DECISIONS_URL };

/** localStorage bucket for the BYO OpenRouter key. */
export const JEV_KEY_STORAGE = "aitrainer:jev:key";

/** The single approved origin a personal key may be used against. */
export const JEV_PERSONAL_KEY_ORIGIN = "https://openrouter.ai";

export type JevAccess =
  | { kind: "proxy"; url: string }
  | { kind: "personal"; key: string }
  | { kind: "none" };

export type KeyTestResult =
  | { status: "connected"; model: string }
  | { status: "invalid" }
  | { status: "network" };

export interface KeyProvider {
  /** Current access mode, re-resolved on every call. */
  getAccess(): JevAccess;
  /** Store a personal key (memory + localStorage when available). */
  setPersonalKey(key: string): void;
  /** Remove the key from memory and storage. */
  clearKey(): void;
  /** False when localStorage is denied — the key is memory-only then. */
  isPersistent(): boolean;
  /** One minimal judgment against the OpenRouter origin. */
  testKey(key: string): Promise<KeyTestResult>;
}

export interface KeyProviderOptions {
  /** Injectable fetch (tests). */
  fetchFn?: typeof fetch;
  /** Overrides the VITE_JEV_PROXY_URL env read (tests, embedding). */
  proxyUrl?: string;
  /** Overrides localStorage (tests: null or a throwing stub). */
  storage?: Storage | null;
}

function readProxyUrlFromEnv(): string | undefined {
  try {
    const value: unknown = import.meta.env?.VITE_JEV_PROXY_URL;
    if (typeof value === "string" && value.trim() !== "") return value.trim();
  } catch {
    // Not running inside a Vite environment — no proxy configured.
  }
  return undefined;
}

export function createKeyProvider(options: KeyProviderOptions = {}): KeyProvider {
  const fetchFn = options.fetchFn;
  let memoryKey: string | null = null;
  let memoryOnly = false;

  const storage: Storage | null =
    options.storage !== undefined ? options.storage : defaultStorage();

  function defaultStorage(): Storage | null {
    try {
      if (typeof localStorage === "undefined") return null;
      return localStorage;
    } catch {
      // SecurityError: storage access denied outright.
      return null;
    }
  }

  // Probe persistence up front so a denied store degrades to
  // memory-only before the first write attempt.
  try {
    storage?.getItem(JEV_KEY_STORAGE);
  } catch {
    memoryOnly = true;
  }

  function readStoredKey(): string | null {
    if (memoryOnly || storage === null) return null;
    try {
      return storage.getItem(JEV_KEY_STORAGE);
    } catch {
      memoryOnly = true;
      return null;
    }
  }

  return {
    getAccess(): JevAccess {
      const proxyUrl = options.proxyUrl ?? readProxyUrlFromEnv();
      if (proxyUrl !== undefined) return { kind: "proxy", url: proxyUrl };
      const key = memoryKey ?? readStoredKey();
      if (key !== null && key !== "") return { kind: "personal", key };
      return { kind: "none" };
    },

    setPersonalKey(key: string): void {
      memoryKey = key;
      if (memoryOnly || storage === null) return;
      try {
        storage.setItem(JEV_KEY_STORAGE, key);
      } catch {
        memoryOnly = true; // degrade, keep the in-memory copy
      }
    },

    clearKey(): void {
      memoryKey = null;
      if (memoryOnly || storage === null) return;
      try {
        storage.removeItem(JEV_KEY_STORAGE);
      } catch {
        memoryOnly = true;
      }
    },

    isPersistent(): boolean {
      return storage !== null && !memoryOnly;
    },

    async testKey(key: string): Promise<KeyTestResult> {
      // One minimal judgment against the fixed OpenRouter origin. The
      // adapter redacts the key from any failure detail; the result
      // objects here carry no detail strings at all.
      const client: DecisionClient = createOpenRouterAdapter({
        apiKey: key,
        fetchFn,
      });
      const result = await client.request(
        {},
        [
          {
            id: "jev-keytest",
            type: "choice",
            prompt: "Key check: answer with any candidate.",
            candidates: [{ id: "ok", description: "ok" }],
          },
        ],
        { timeoutMs: 4000, surface: "tree-opening" },
      );
      if (result.ok) return { status: "connected", model: result.model };
      if (result.reason === "auth") return { status: "invalid" };
      return { status: "network" };
    },
  };
}

/** Shared default provider (proxy -> personal key -> none). */
let defaultProvider: KeyProvider | null = null;

export function defaultKeyProvider(): KeyProvider {
  if (defaultProvider === null) defaultProvider = createKeyProvider();
  return defaultProvider;
}
