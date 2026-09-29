// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  mountJevSettings,
  type JevSettingsHandle,
} from "../../../src/ui/jev-settings";
import { createKeyProvider } from "../../../src/jev/key-provider";

/** Storage stub whose writes always throw (denied localStorage). */
function deniedStorage(): Storage {
  const deny = (): never => {
    throw new Error("denied");
  };
  return {
    length: 0,
    clear: deny,
    getItem: deny,
    key: () => null,
    removeItem: deny,
    setItem: deny,
  } as unknown as Storage;
}

function okStorage(): Storage {
  const backing = new Map<string, string>();
  return {
    length: backing.size,
    clear: () => backing.clear(),
    getItem: (k: string) => backing.get(k) ?? null,
    key: () => null,
    removeItem: (k: string) => void backing.delete(k),
    setItem: (k: string, v: string) => void backing.set(k, v),
  } as unknown as Storage;
}

describe("Jev settings section (Flow D, AC-13)", () => {
  let host: HTMLElement;
  let handle: JevSettingsHandle | undefined;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    handle?.destroy();
    host.remove();
  });

  it("renders mode, masked key input, test/clear buttons and status", () => {
    handle = mountJevSettings(host, { provider: createKeyProvider({ storage: okStorage() }) });
    const input = host.querySelector<HTMLInputElement>("input[type=password]");
    expect(input).not.toBeNull();
    const text = host.textContent ?? "";
    expect(text).toContain("AI decisions (Jev)");
    expect(text).toContain("Test");
    expect(text).toContain("Clear key");
    expect(text).toContain("Mode:");
  });

  it("shows the connected status and stores the key after a successful test", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ answers: {} }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const provider = createKeyProvider({ storage: okStorage(), fetchFn: fetchMock as unknown as typeof fetch });
    handle = mountJevSettings(host, { provider });
    const input = host.querySelector<HTMLInputElement>("input[type=password]")!;
    const test = [...host.querySelectorAll("button")].find((b) => b.textContent === "Test")!;
    input.value = "sk-or-v1-TESTKEY";
    test.click();
    await vi.waitFor(() => {
      expect((host.querySelector(".jev-settings-status")?.textContent ?? "")).toContain("Connected");
    });
    expect(provider.getAccess().kind).toBe("personal");
    // The key must never be echoed back into the DOM after storing.
    expect(input.value).toBe("");
    expect(host.textContent).not.toContain("sk-or-v1-TESTKEY");
  });

  it("reports invalid key without storing it", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ error: { message: "bad" } }), { status: 401 }));
    vi.stubGlobal("fetch", fetchMock);
    const provider = createKeyProvider({ storage: okStorage(), fetchFn: fetchMock as unknown as typeof fetch });
    handle = mountJevSettings(host, { provider });
    const input = host.querySelector<HTMLInputElement>("input[type=password]")!;
    const test = [...host.querySelectorAll("button")].find((b) => b.textContent === "Test")!;
    input.value = "sk-or-v1-BAD";
    test.click();
    await vi.waitFor(() => {
      expect((host.querySelector(".jev-settings-status")?.textContent ?? "")).toContain("Invalid key");
    });
    expect(provider.getAccess().kind).not.toBe("personal");
  });

  it("clear removes the stored key and flips the mode back", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ answers: {} }), { status: 200 }));
    const storage = okStorage();
    const provider = createKeyProvider({ storage, fetchFn: fetchMock as unknown as typeof fetch });
    provider.setPersonalKey("sk-or-v1-EXISTING");
    handle = mountJevSettings(host, { provider });
    const clear = [...host.querySelectorAll("button")].find((b) => b.textContent === "Clear key")!;
    clear.click();
    expect(provider.getAccess().kind).toBe("none");
    expect((host.querySelector(".jev-settings-status")?.textContent ?? "")).toContain("removed");
  });

  it("degrades to session-only wording when localStorage is denied", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ answers: {} }), { status: 200 }));
    const provider = createKeyProvider({ storage: deniedStorage(), fetchFn: fetchMock as unknown as typeof fetch });
    provider.setPersonalKey("sk-or-v1-SESSION");
    handle = mountJevSettings(host, { provider });
    expect(host.textContent).toContain("session only");
  });
});
