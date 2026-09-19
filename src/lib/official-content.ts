/**
 * Official Barça content adapter.
 *
 * Prototype: mockOfficialContentSource
 * Production: replace the source with an authenticated FC Barcelona CMS/API client,
 * then keep the same normalized BarcaOfficialContent model and Community UI.
 *
 * FC Barcelona CMS / official content API
 *   → adapter (this module)
 *   → officialBarcaContentService.listLatest()
 *   → Community cards + mapped engagement CTAs
 */
import type { BarcaOfficialContent, FanState } from "./types";

export const OFFICIAL_SOURCE = "Official FC Barcelona" as const;
export const OFFICIAL_VOTE_XP = 10;
export const OFFICIAL_QUIZ_XP = 15;

export const OFFICIAL_MIDFIELD_OPTIONS = ["pedri", "dejong", "fermin", "olmo"] as const;

export const OFFICIAL_VOTE_RESULTS: Record<string, number> = {
  pedri: 41,
  dejong: 28,
  fermin: 18,
  olmo: 13,
};

const MOCK_OFFICIAL_CONTENT: BarcaOfficialContent[] = [
  {
    id: "squad-weekend",
    category: "First Team",
    headline: "Squad ready for the weekend",
    summary: "The first team completes its final preparations ahead of the upcoming fixture.",
    source: OFFICIAL_SOURCE,
    publishedAt: "Today",
    cta: { type: "vote", label: "Vote" },
    votePlayerIds: [...OFFICIAL_MIDFIELD_OPTIONS],
  },
  {
    id: "next-challenge",
    category: "Match Preview",
    headline: "All eyes on the next challenge",
    summary: "Barça prepares for the next match as supporters make their calls ahead of kick-off.",
    source: OFFICIAL_SOURCE,
    publishedAt: "Yesterday",
    cta: { type: "predict", label: "Predict", target: "prematch" },
  },
  {
    id: "masia-knowledge",
    category: "La Masia",
    headline: "Test your Barça knowledge",
    summary: "A new official club story becomes the inspiration for this week’s supporter challenge.",
    source: OFFICIAL_SOURCE,
    publishedAt: "This week",
    cta: { type: "quiz", label: "Take Quiz", target: "midweek" },
  },
];

export interface OfficialContentSource {
  fetchLatest: () => BarcaOfficialContent[];
}

export const mockOfficialContentSource: OfficialContentSource = {
  fetchLatest: () => MOCK_OFFICIAL_CONTENT,
};

export function createOfficialBarcaContentAdapter(source: OfficialContentSource) {
  return {
    listLatest(limit = 3) {
      return source.fetchLatest().slice(0, limit);
    },
  };
}

export const officialBarcaContentService = createOfficialBarcaContentAdapter(mockOfficialContentSource);

export function xpForOfficialVote(alreadyVoted: boolean) {
  return alreadyVoted ? 0 : OFFICIAL_VOTE_XP;
}

export function xpForOfficialQuiz(alreadyCompleted: boolean) {
  return alreadyCompleted ? 0 : OFFICIAL_QUIZ_XP;
}

export function applyOfficialMidfieldVote(state: FanState, playerId: string, at = Date.now()): FanState {
  if (state.officialMidfieldVote) return state;
  const xp = xpForOfficialVote(false);
  return {
    ...state,
    officialMidfieldVote: playerId,
    xp: state.xp + xp,
    activity: [
      {
        id: `official-vote-${at}`,
        title: "Voted in Barça Community Poll",
        subtitle: "Who should start in midfield?",
        xpDelta: xp,
        at,
      },
      ...state.activity,
    ],
    toast: {
      id: `toast-${at}`,
      title: "Your vote is in",
      body: `+${xp} XP participation`,
    },
  };
}

export function applyOfficialQuizComplete(state: FanState, at = Date.now()): FanState {
  if (state.officialQuizCompleted) return state;
  const xp = xpForOfficialQuiz(false);
  return {
    ...state,
    officialQuizCompleted: true,
    xp: state.xp + xp,
    activity: [
      {
        id: `official-quiz-${at}`,
        title: "Completed Midweek Barça Quiz",
        xpDelta: xp,
        at,
      },
      ...state.activity,
    ],
    toast: {
      id: `toast-${at}`,
      title: "Quiz complete",
      body: `+${xp} XP`,
    },
  };
}
