/**
 * WS1 unconfigured decision client (ADR-0009 section 3.1).
 *
 * Returned by the access resolver when no proxy URL and no personal
 * key are available. isConfigured() is always false, so steered
 * wrappers short-circuit to their authored defaults without any
 * network activity, and a stray request still never throws — it
 * resolves to a typed "unconfigured" failure.
 */

import type { DecisionClient, DecisionRequestResult } from "./contracts";

export const unconfiguredDecisionClient: DecisionClient = {
  isConfigured: () => false,
  request: async (): Promise<DecisionRequestResult> => ({
    ok: false,
    reason: "unconfigured",
  }),
};
