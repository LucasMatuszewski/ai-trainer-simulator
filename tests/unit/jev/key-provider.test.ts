// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  JEV_KEY_STORAGE,
  OPENROUTER_DECISIONS_URL,
  createKeyProvider,
} from "../../../src/jev/key-provider";

/**
 * WS1 key provider (ADR-0009 section 3.2, D-46, D-59): access mode
 * resolution (proxy env -> personal key -> none), persistence in
 * localStorage with a memory-only degrade when storage is denied, the
 * typed BYO test call, and key hygiene — the key never leaks through
 * any result the provider hands out.
 */

function denyStorage(): Storage {
  const deny = (): never => {
    throw new Error("SecurityError: storage denied");
  };
  return {
    length: 0,
    clear: deny,
    getItem: deny,
    key: deny,
    removeItem: deny,
    setItem: deny,
  } as unknown as Storage;
}


type FetchCall = { url: string | URL; init: RequestInit };

function stubFetch(handler: (url: string | URL, init: RequestInit) => Promise<Response>): FetchCall[] {
  const calls: FetchCall[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL, init?: RequestInit) => {
      const requestInit = init ?? {};
      calls.push({ url, init: requestInit });
      return handler(url, requestInit);
    }),
  );
  return calls;
}

function makeResponse(status: number, body?: unknown): Response {
  const text = JSON.stringify(body ?? {});
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => text,
    json: async () => JSON.parse(text),
  } as unknown as Response;
}

beforeEach(() => {
  localStorage.clear();
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("key provider — access resolution", () => {
  it("resolves none when nothing is configured", () => {
    const provider = createKeyProvider({ proxyUrl: undefined });
    expect(provider.getAccess()).toEqual({ kind: "none" });
    expect(provider.isPersistent()).toBe(true);
  });

  it("prefers the proxy URL over a stored personal key", () => {
    vi.stubEnv("VITE_JEV_PROXY_URL", "https://play.devpowers.com/api/jev");
    localStorage.setItem(JEV_KEY_STORAGE, "sk-or-v1-stored");
    const provider = createKeyProvider();
    expect(provider.getAccess()).toEqual({ kind: "proxy", url: "https://play.devpowers.com/api/jev" });
  });

  it("uses the explicit proxyUrl override over the env", () => {
    vi.stubEnv("VITE_JEV_PROXY_URL", "https://env.example/api/jev");
    const provider = createKeyProvider({ proxyUrl: "https://override.example/api/jev" });
    expect(provider.getAccess()).toEqual({ kind: "proxy", url: "https://override.example/api/jev" });
  });

  it("stores a personal key in localStorage and resolves it", () => {
    const provider = createKeyProvider();
    provider.setPersonalKey("sk-or-v1-abc");
    expect(localStorage.getItem(JEV_KEY_STORAGE)).toBe("sk-or-v1-abc");
    expect(provider.getAccess()).toEqual({ kind: "personal", key: "sk-or-v1-abc" });
  });

  it("keeps the key across provider instances (localStorage is the store)", () => {
    createKeyProvider().setPersonalKey("sk-or-v1-abc");
    const fresh = createKeyProvider();
    expect(fresh.getAccess()).toEqual({ kind: "personal", key: "sk-or-v1-abc" });
  });

  it("clearKey removes both the stored and in-memory key", () => {
    const provider = createKeyProvider();
    provider.setPersonalKey("sk-or-v1-abc");
    provider.clearKey();
    expect(localStorage.getItem(JEV_KEY_STORAGE)).toBeNull();
    expect(provider.getAccess()).toEqual({ kind: "none" });
  });

  it("an empty personal key counts as none", () => {
    const provider = createKeyProvider();
    provider.setPersonalKey("");
    expect(provider.getAccess()).toEqual({ kind: "none" });
  });
});

describe("key provider — denied / missing storage degrades to memory-only", () => {
  it("keeps the key in memory when storage writes are denied", () => {
    const provider = createKeyProvider({ storage: denyStorage() });
    expect(provider.isPersistent()).toBe(false);
    provider.setPersonalKey("sk-or-v1-abc");
    expect(provider.getAccess()).toEqual({ kind: "personal", key: "sk-or-v1-abc" });
    provider.clearKey();
    expect(provider.getAccess()).toEqual({ kind: "none" });
  });

  it("degrades without throwing when storage becomes denied after construction", () => {
    const failing = denyStorage();
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get: () => {
        throw new Error("SecurityError");
      },
    });
    try {
      // A fresh provider construction hits the broken storage.
      const degraded = createKeyProvider();
      expect(degraded.isPersistent()).toBe(false);
      degraded.setPersonalKey("sk-or-v1-abc");
      expect(degraded.getAccess()).toEqual({ kind: "personal", key: "sk-or-v1-abc" });
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
      void failing;
    }
  });

  it("works with storage: null (no persistence at all)", () => {
    const provider = createKeyProvider({ storage: null });
    expect(provider.isPersistent()).toBe(false);
    provider.setPersonalKey("sk-or-v1-abc");
    expect(provider.getAccess()).toEqual({ kind: "personal", key: "sk-or-v1-abc" });
  });
});

describe("key provider — the BYO test call", () => {
  it("does one minimal judgment against the OpenRouter origin and reports connected+model", async () => {
    const calls = stubFetch(async () =>
      makeResponse(200, { model: "typesafe/jev-1.13", answers: [] }),
    );
    const provider = createKeyProvider();
    const result = await provider.testKey("sk-or-v1-good");
    expect(result).toEqual({ status: "connected", model: "typesafe/jev-1.13" });
    expect(calls).toHaveLength(1);
    expect(String(calls[0]!.url)).toBe(OPENROUTER_DECISIONS_URL);
    const headers = calls[0]!.init.headers as Record<string, string>;
    expect(headers.authorization).toBe("Bearer sk-or-v1-good");
  });

  it("maps 401 to invalid without throwing", async () => {
    stubFetch(async () => makeResponse(401, { error: { message: "nope" } }));
    const provider = createKeyProvider();
    expect(await provider.testKey("sk-or-v1-bad")).toEqual({ status: "invalid" });
  });

  it("maps network failure to network", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("getaddrinfo ENOTFOUND openrouter.ai");
      }),
    );
    const provider = createKeyProvider();
    expect(await provider.testKey("sk-or-v1-offline")).toEqual({ status: "network" });
  });

  it("the test result never contains the key", async () => {
    stubFetch(async () =>
      makeResponse(401, { error: { message: "bad key sk-or-v1-SECRET" } }),
    );
    const provider = createKeyProvider();
    const result = await provider.testKey("sk-or-v1-SECRET");
    expect(JSON.stringify(result)).not.toContain("sk-or-v1-SECRET");
    expect(JSON.stringify(result)).not.toContain("sk-or-v1");
  });

  it("the test call never mutates the stored key state", async () => {
    stubFetch(async () => makeResponse(200, { answers: [] }));
    const provider = createKeyProvider();
    await provider.testKey("sk-or-v1-something");
    expect(localStorage.getItem(JEV_KEY_STORAGE)).toBeNull();
    expect(provider.getAccess()).toEqual({ kind: "none" });
  });
});
