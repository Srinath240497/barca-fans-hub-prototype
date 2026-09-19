import { describe, expect, it } from "vitest";
import { createInitialState } from "./mock-data";
import {
  applyOfficialMidfieldVote,
  applyOfficialQuizComplete,
  createOfficialBarcaContentAdapter,
  mockOfficialContentSource,
  officialBarcaContentService,
  OFFICIAL_QUIZ_XP,
  OFFICIAL_VOTE_XP,
  xpForOfficialQuiz,
  xpForOfficialVote,
} from "./official-content";

describe("official Barça content adapter", () => {
  it("returns at most three official stories with a single CTA each", () => {
    const items = officialBarcaContentService.listLatest(3);
    expect(items).toHaveLength(3);
    expect(items.every((item) => item.source === "Official FC Barcelona")).toBe(true);
    expect(items.every((item) => Boolean(item.cta?.label && item.cta?.type))).toBe(true);
  });

  it("can swap the mock source without changing the UI contract", () => {
    const adapter = createOfficialBarcaContentAdapter({
      fetchLatest: () => mockOfficialContentSource.fetchLatest().slice(0, 1),
    });
    expect(adapter.listLatest()).toHaveLength(1);
  });
});

describe("official content rewards", () => {
  it("awards no XP for repeat vote or quiz completion", () => {
    expect(xpForOfficialVote(false)).toBe(OFFICIAL_VOTE_XP);
    expect(xpForOfficialVote(true)).toBe(0);
    expect(xpForOfficialQuiz(true)).toBe(0);
  });

  it("records a midfield vote once, with XP and no Barça Points", () => {
    const first = applyOfficialMidfieldVote(createInitialState(), "pedri", 1);
    const second = applyOfficialMidfieldVote(first, "olmo", 2);
    expect(first.officialMidfieldVote).toBe("pedri");
    expect(first.xp).toBe(createInitialState().xp + OFFICIAL_VOTE_XP);
    expect(first.availablePoints).toBe(createInitialState().availablePoints);
    expect(first.pendingPoints).toBe(0);
    expect(first.activity[0]?.title).toBe("Voted in Barça Community Poll");
    expect(second.officialMidfieldVote).toBe("pedri");
    expect(second.xp).toBe(first.xp);
  });

  it("records quiz completion once and never awards Barça Points", () => {
    const first = applyOfficialQuizComplete(createInitialState(), 1);
    const second = applyOfficialQuizComplete(first, 2);
    expect(first.officialQuizCompleted).toBe(true);
    expect(first.xp).toBe(createInitialState().xp + OFFICIAL_QUIZ_XP);
    expect(first.availablePoints).toBe(createInitialState().availablePoints);
    expect(first.activity[0]?.title).toBe("Completed Midweek Barça Quiz");
    expect(second.xp).toBe(first.xp);
  });
});
