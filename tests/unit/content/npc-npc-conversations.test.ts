import { describe, expect, it } from "vitest";
import {
  NPC_NPC_CONVERSATIONS,
  eligibleConversations,
  npcNpcConversationFor,
  pickConversation,
} from "../../../src/content/npc-npc-conversations";
import {
  validateNpcNpcConversation,
  type NpcNpcConversation,
} from "../../../src/content/npc-npc-conversations-schema";
import { createSeededRng } from "../../../src/game/social";

function scriptById(id: string): NpcNpcConversation {
  const script = NPC_NPC_CONVERSATIONS.find((entry) => entry.id === id);
  if (script === undefined) throw new Error(`missing script ${id}`);
  return script;
}

/** Collects every authored string the bubble layer may render. */
function allStrings(script: NpcNpcConversation): string[] {
  const out: string[] = [];
  for (const exchange of script.exchanges) {
    for (const line of [exchange.starter, exchange.response]) {
      out.push(line.text);
      if (line.onPlayerApproach) out.push(line.onPlayerApproach);
      if (line.endings) out.push(...Object.values(line.endings));
    }
  }
  return out;
}

describe("authored NPC↔NPC scripts (schema invariants)", () => {
  it("covers the six v1 anchor scripts across the three bands", () => {
    const ids = NPC_NPC_CONVERSATIONS.map((script) => script.id);
    expect(ids).toContain("npcnpc-pz-restore-drill");
    expect(ids).toContain("npcnpc-kp-referral");
    expect(ids).toContain("npcnpc-pk-pipeline");
    expect(ids).toContain("npcnpc-km-ticket-queue");
    expect(ids).toContain("npcnpc-tg-expense-clash");
    expect(ids).toContain("npcnpc-jb-robot-dog");
  });

  it("declares the expected cast and band for each anchor pair", () => {
    // warm 3L: pawel + zosia (seed 70), gated on the restore-drill flag.
    const pz = scriptById("npcnpc-pz-restore-drill");
    expect(pz.cast).toEqual(["pawel", "zosia"]);
    expect(pz.bands).toEqual(["warm"]);
    expect(pz.exchanges).toHaveLength(3);
    expect(pz.requiresFlags).toContain("pawel-restore-drill");
    // warm 2L: kasia + przemek (seed 72), gated on the referral flag.
    const kp = scriptById("npcnpc-kp-referral");
    expect(kp.cast).toEqual(["przemek", "kasia"]);
    expect(kp.bands).toEqual(["warm"]);
    expect(kp.exchanges).toHaveLength(2);
    expect(kp.requiresFlags).toContain("kasia-referral-open");
    // neutral 2L: pawel + kasia, evergreen.
    const pk = scriptById("npcnpc-pk-pipeline");
    expect(pk.cast).toEqual(["kasia", "pawel"]);
    expect(pk.bands).toEqual(["neutral"]);
    expect(pk.exchanges).toHaveLength(2);
    // hostile 3L: kasia + marek (seed 25), the ticket-queue dispute.
    const km = scriptById("npcnpc-km-ticket-queue");
    expect(km.cast).toEqual(["kasia", "marek"]);
    expect(km.bands).toEqual(["hostile"]);
    expect(km.exchanges).toHaveLength(3);
    // hostile 2L: tomek + grazyna (seed 22), hotfix vs expense.
    const tg = scriptById("npcnpc-tg-expense-clash");
    expect(tg.cast).toEqual(["grazyna", "tomek"]);
    expect(tg.bands).toEqual(["hostile"]);
    expect(tg.exchanges).toHaveLength(2);
    // neutral 1L: janusz + burek, the robot-and-dog beat.
    const jb = scriptById("npcnpc-jb-robot-dog");
    expect(jb.cast).toEqual(["janusz", "burek"]);
    expect(jb.bands).toEqual(["neutral"]);
    expect(jb.exchanges).toHaveLength(1);
  });

  it("passes validateNpcNpcConversation for every script", () => {
    for (const script of NPC_NPC_CONVERSATIONS) {
      expect(validateNpcNpcConversation(script)).toEqual([]);
    }
  });

  it("keeps every bubble string inside the 69-char bound", () => {
    for (const script of NPC_NPC_CONVERSATIONS) {
      for (const text of allStrings(script)) {
        expect(
          text.length,
          `${script.id}: "${text}" is ${text.length} chars`,
        ).toBeLessThanOrEqual(69);
        expect(text.length, `${script.id}: empty string`).toBeGreaterThan(0);
      }
    }
  });

  it("has globally unique script ids and line ids", () => {
    const scriptIds = NPC_NPC_CONVERSATIONS.map((script) => script.id);
    expect(new Set(scriptIds).size).toBe(scriptIds.length);
    const lineIds = NPC_NPC_CONVERSATIONS.flatMap((script) =>
      script.exchanges.flatMap((exchange) => [
        exchange.starter.id,
        exchange.response.id,
      ]),
    );
    expect(new Set(lineIds).size).toBe(lineIds.length);
  });

  it("authors a player-approach hush line on every script", () => {
    for (const script of NPC_NPC_CONVERSATIONS) {
      const hushes = script.exchanges.filter(
        (exchange) =>
          exchange.starter.onPlayerApproach !== undefined ||
          exchange.response.onPlayerApproach !== undefined,
      );
      expect(hushes.length, script.id).toBeGreaterThan(0);
    }
  });

  it("authors a band ending on the final response of deep scripts", () => {
    const endings: Array<[string, string]> = [
      ["npcnpc-pz-restore-drill", "warm"],
      ["npcnpc-kp-referral", "warm"],
      ["npcnpc-pk-pipeline", "neutral"],
      ["npcnpc-km-ticket-queue", "hostile"],
      ["npcnpc-tg-expense-clash", "hostile"],
      ["npcnpc-jb-robot-dog", "neutral"],
    ];
    for (const [id, bandValue] of endings) {
      const script = scriptById(id);
      const finalResponse = script.exchanges[script.exchanges.length - 1]!
        .response;
      expect(finalResponse.endings?.[bandValue as "warm"], id).toBeTruthy();
    }
  });

  it("keeps burek's lines in dog markers", () => {
    const jb = scriptById("npcnpc-jb-robot-dog");
    const burekLine = jb.exchanges[0]!.response;
    // Dog speech is *sound*, [action] or (thought) — at least two of the
    // three markers per the established pool convention.
    const markers = [
      burekLine.text.includes("*"),
      burekLine.text.includes("["),
      burekLine.text.includes("("),
    ].filter(Boolean).length;
    expect(markers).toBeGreaterThanOrEqual(2);
  });
});

describe("eligibleConversations", () => {
  const noFlags: Record<string, boolean> = {};

  it("matches the cast in either order", () => {
    const flags = { "pawel-restore-drill": true };
    expect(
      eligibleConversations("pawel", "zosia", "warm", flags, "morning").map(
        (script) => script.id,
      ),
    ).toEqual(["npcnpc-pz-restore-drill"]);
    expect(
      eligibleConversations("zosia", "pawel", "warm", flags, "morning").map(
        (script) => script.id,
      ),
    ).toEqual(["npcnpc-pz-restore-drill"]);
  });

  it("rejects pairs that are not the cast", () => {
    const flags = { "pawel-restore-drill": true };
    expect(
      eligibleConversations("pawel", "zosia", "warm", flags, "morning"),
    ).not.toEqual(
      eligibleConversations("pawel", "kasia", "warm", flags, "morning"),
    );
    expect(
      eligibleConversations("marek", "zosia", "warm", flags, "morning"),
    ).toEqual([]);
  });

  it("rejects a pair with itself", () => {
    expect(
      eligibleConversations("pawel", "pawel", "neutral", noFlags, "morning"),
    ).toEqual([]);
  });

  it("gates on the live relationship band", () => {
    const flags = { "pawel-restore-drill": true };
    // The restore-drill script is warm-only: a neutral live band must
    // not serve it even with the flag set.
    expect(
      eligibleConversations("pawel", "zosia", "neutral", flags, "morning"),
    ).toEqual([]);
    expect(
      eligibleConversations("pawel", "zosia", "hostile", flags, "morning"),
    ).toEqual([]);
    // The ticket-queue dispute is hostile-only.
    expect(
      eligibleConversations("kasia", "marek", "neutral", noFlags, "morning"),
    ).toEqual([]);
    expect(
      eligibleConversations("kasia", "marek", "hostile", noFlags, "morning")
        .map((script) => script.id),
    ).toEqual(["npcnpc-km-ticket-queue"]);
  });

  it("requires every gated flag and honours blockedByFlags", () => {
    // Without the drill flag the warm anchor pair has nothing to play.
    expect(
      eligibleConversations("pawel", "zosia", "warm", noFlags, "morning"),
    ).toEqual([]);
    expect(
      eligibleConversations("pawel", "zosia", "warm", noFlags, "morning"),
    ).toEqual([]);
    // Evergreen neutral pairs need no flags.
    expect(
      eligibleConversations("kasia", "pawel", "neutral", noFlags, "morning")
        .map((script) => script.id),
    ).toEqual(["npcnpc-pk-pipeline"]);
  });

  it("gates on the period when one is authored", () => {
    // janusz + burek fires only late in the day (janusz arrives late).
    expect(
      eligibleConversations("janusz", "burek", "neutral", noFlags, "morning"),
    ).toEqual([]);
    expect(
      eligibleConversations("janusz", "burek", "neutral", noFlags, "afternoon")
        .map((script) => script.id),
    ).toEqual(["npcnpc-jb-robot-dog"]);
  });

  it("honours blockedByFlags on an injected pool", () => {
    const synthetic: NpcNpcConversation = {
      id: "test-blocked",
      label: "blocked test script",
      cast: ["ania", "klaudia"],
      bands: ["warm"],
      priority: 1,
      blockedByFlags: ["some-veto-flag"],
      exchanges: [
        {
          starter: { id: "tb-s1", text: "Test starter." },
          response: { id: "tb-r1", text: "Test response." },
        },
      ],
    };
    expect(
      eligibleConversations(
        "ania",
        "klaudia",
        "warm",
        noFlags,
        "morning",
        [synthetic],
      ).map((script) => script.id),
    ).toEqual(["test-blocked"]);
    expect(
      eligibleConversations(
        "ania",
        "klaudia",
        "warm",
        { "some-veto-flag": true },
        "morning",
        [synthetic],
      ),
    ).toEqual([]);
  });
});

describe("pickConversation", () => {
  it("returns null for an empty eligible set", () => {
    expect(pickConversation([], createSeededRng(7))).toBeNull();
  });

  it("serves the highest-priority tier regardless of the roll", () => {
    const low: NpcNpcConversation = {
      id: "low",
      label: "low",
      cast: ["ania", "klaudia"],
      bands: ["warm"],
      priority: 1,
      exchanges: [
        {
          starter: { id: "low-s1", text: "a" },
          response: { id: "low-r1", text: "b" },
        },
      ],
    };
    const high: NpcNpcConversation = {
      ...low,
      id: "high",
      label: "high",
      priority: 10,
      exchanges: [
        {
          starter: { id: "high-s1", text: "a" },
          response: { id: "high-r1", text: "b" },
        },
      ],
    };
    for (let seed = 0; seed < 20; seed += 1) {
      const pick = pickConversation([low, high], createSeededRng(seed));
      expect(pick?.id).toBe("high");
    }
  });

  it("is deterministic under the same seed", () => {
    const pool = eligibleConversations(
      "kasia",
      "pawel",
      "neutral",
      {},
      "morning",
    );
    const first = pickConversation(pool, createSeededRng(1234));
    const second = pickConversation(pool, createSeededRng(1234));
    expect(first?.id).toBe(second?.id);
    expect(first?.id).toBe("npcnpc-pk-pipeline");
  });
});

describe("npcNpcConversationFor", () => {
  it("serves the restore-drill callback when the flag is set", () => {
    const script = npcNpcConversationFor(
      "zosia",
      "pawel",
      "warm",
      { "pawel-restore-drill": true },
      "lunch",
    );
    expect(script?.id).toBe("npcnpc-pz-restore-drill");
  });

  it("serves nothing for the warm pair before the flag exists", () => {
    expect(
      npcNpcConversationFor("zosia", "pawel", "warm", {}, "lunch"),
    ).toBeNull();
  });

  it("serves the referral banter for kasia + przemek when open", () => {
    const script = npcNpcConversationFor(
      "przemek",
      "kasia",
      "warm",
      { "kasia-referral-open": true },
      "morning",
    );
    expect(script?.id).toBe("npcnpc-kp-referral");
  });

  it("serves the hostile anchors without any flags", () => {
    expect(
      npcNpcConversationFor("marek", "kasia", "hostile", {}, "afternoon")?.id,
    ).toBe("npcnpc-km-ticket-queue");
    expect(
      npcNpcConversationFor("tomek", "grazyna", "hostile", {}, "morning")?.id,
    ).toBe("npcnpc-tg-expense-clash");
  });
});
