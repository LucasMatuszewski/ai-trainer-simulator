/**
 * WS1 client module — the shared DecisionClient interface plus the
 * composition that turns a KeyProvider access mode into a concrete
 * client (ADR-0009 section 3.1/3.2, D-46).
 *
 * The resolving client re-reads the provider on EVERY call, so the
 * settings UI can switch access modes (proxy / personal key / none)
 * while the game runs without re-installing anything.
 */

import type { DecisionClient } from "./contracts";
import { createOpenRouterAdapter } from "./openrouter-adapter";
import { unconfiguredDecisionClient } from "./unconfigured-client";
import { sharedKeyProvider, type JevAccess, type KeyProvider } from "./key-provider";

export type {
  DecisionClient,
  DecisionRequestOptions,
  DecisionRequestResult,
} from "./contracts";
export { unconfiguredDecisionClient } from "./unconfigured-client";
export { createOpenRouterAdapter, OPENROUTER_DECISIONS_URL, JEV_PINNED_MODEL } from "./openrouter-adapter";

/** Map one resolved access mode to its concrete client. */
export function createClientForAccess(access: JevAccess): DecisionClient {
  if (access.kind === "proxy") {
    // The proxy injects its own auth server-side — no local key.
    return createOpenRouterAdapter({ endpoint: access.url });
  }
  if (access.kind === "personal") {
    return createOpenRouterAdapter({ apiKey: access.key });
  }
  return unconfiguredDecisionClient;
}

/**
 * A DecisionClient that resolves the CURRENT access mode per call.
 * Defaults to the shared key provider (proxy URL env -> localStorage
 * personal key -> none).
 */
export function createResolvingClient(provider: KeyProvider = sharedKeyProvider()): DecisionClient {
  return {
    isConfigured(): boolean {
      return createClientForAccess(provider.getAccess()).isConfigured();
    },
    request(state, questions, opts) {
      return createClientForAccess(provider.getAccess()).request(state, questions, opts);
    },
  };
}
