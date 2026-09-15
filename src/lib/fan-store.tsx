"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { createInitialState, STORAGE_KEY } from "./mock-data";
import type {
  FanContextValue,
  FanState,
  LiveReactionId,
  MatchPlan,
  PollChoice,
} from "./types";

type Action =
  | { type: "HYDRATE"; state: FanState }
  | { type: "LOCK_MATCH_PLAN"; plan: MatchPlan }
  | { type: "SIMULATE_GOAL" }
  | { type: "SET_LIVE_REACTION"; reaction: LiveReactionId }
  | { type: "SET_HALFTIME_VOTE"; playerId: string }
  | { type: "COMPLETE_DAILY_DRILL" }
  | { type: "CAST_COMMUNITY_POLL"; choice: PollChoice }
  | { type: "SIMULATE_POS" }
  | { type: "RESET" }
  | { type: "DISMISS_TOAST" };

function nowId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

function reducer(state: FanState, action: Action): FanState {
  switch (action.type) {
    case "HYDRATE":
      return { ...action.state, toast: null };
    case "LOCK_MATCH_PLAN":
      if (state.matchPlanLocked) return state;
      return {
        ...state,
        matchPlanLocked: true,
        matchPlan: action.plan,
        xp: state.xp + 20,
        activity: [
          {
            id: nowId("plan"),
            title: "Match Plan locked",
            xpDelta: 20,
            at: Date.now(),
          },
          ...state.activity,
        ],
        toast: {
          id: nowId("toast"),
          title: "Match Plan locked",
          body: "+20 XP participation",
        },
      };
    case "SIMULATE_GOAL":
      if (state.goalSimulated) return state;
      return { ...state, goalSimulated: true };
    case "SET_LIVE_REACTION":
      if (state.liveReaction) return state;
      return { ...state, liveReaction: action.reaction };
    case "SET_HALFTIME_VOTE":
      if (state.halftimeVote) return state;
      return { ...state, halftimeVote: action.playerId };
    case "COMPLETE_DAILY_DRILL":
      if (state.dailyDrillCompleted) return state;
      return {
        ...state,
        dailyDrillCompleted: true,
        laMasiaWeekProgress: Math.min(5, state.laMasiaWeekProgress + 1),
        xp: state.xp + 25,
        activity: [
          {
            id: nowId("drill"),
            title: "Daily Drill completed",
            xpDelta: 25,
            at: Date.now(),
          },
          ...state.activity,
        ],
        toast: {
          id: nowId("toast"),
          title: "Perfect!",
          body: "+25 XP",
        },
      };
    case "CAST_COMMUNITY_POLL":
      if (state.communityPoll) return state;
      return {
        ...state,
        communityPoll: action.choice,
        penyaMissionProgress: Math.min(5, state.penyaMissionProgress + 1),
        activity: [
          {
            id: nowId("poll"),
            title: "Penya poll participated",
            subtitle: "Weekly mission +1",
            at: Date.now(),
          },
          ...state.activity,
        ],
      };
    case "SIMULATE_POS":
      if (state.stadiumPurchase) return state;
      return {
        ...state,
        stadiumPurchase: true,
        pendingPoints: state.pendingPoints + 24,
        activity: [
          {
            id: nowId("pos"),
            title: "Camp Nou purchase recognised",
            pointsDelta: 24,
            pointsPending: true,
            at: Date.now(),
          },
          ...state.activity,
        ],
        toast: {
          id: nowId("toast"),
          title: "Purchase recognised",
          body: "+24 Barça Points · Pending",
        },
      };
    case "RESET":
      return createInitialState();
    case "DISMISS_TOAST":
      return { ...state, toast: null };
    default:
      return state;
  }
}

const FanContext = createContext<FanContextValue | null>(null);

export function FanProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FanState;
        dispatch({ type: "HYDRATE", state: { ...createInitialState(), ...parsed, toast: null } });
      }
    } catch {
      /* keep defaults */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const persisted = { ...state, toast: null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [hydrated, state]);

  const lockMatchPlan = useCallback((plan: MatchPlan) => {
    dispatch({ type: "LOCK_MATCH_PLAN", plan });
  }, []);

  const simulateGoal = useCallback(() => {
    dispatch({ type: "SIMULATE_GOAL" });
  }, []);

  const setLiveReaction = useCallback((reaction: LiveReactionId) => {
    dispatch({ type: "SET_LIVE_REACTION", reaction });
  }, []);

  const setHalftimeVote = useCallback((playerId: string) => {
    dispatch({ type: "SET_HALFTIME_VOTE", playerId });
  }, []);

  const completeDailyDrill = useCallback(() => {
    dispatch({ type: "COMPLETE_DAILY_DRILL" });
  }, []);

  const castCommunityPoll = useCallback((choice: PollChoice) => {
    dispatch({ type: "CAST_COMMUNITY_POLL", choice });
  }, []);

  const simulatePosEvent = useCallback(() => {
    dispatch({ type: "SIMULATE_POS" });
  }, []);

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  }, []);

  const dismissToast = useCallback(() => {
    dispatch({ type: "DISMISS_TOAST" });
  }, []);

  const value = useMemo(
    () => ({
      state,
      lockMatchPlan,
      simulateGoal,
      setLiveReaction,
      setHalftimeVote,
      completeDailyDrill,
      castCommunityPoll,
      simulatePosEvent,
      resetDemo,
      dismissToast,
    }),
    [
      state,
      lockMatchPlan,
      simulateGoal,
      setLiveReaction,
      setHalftimeVote,
      completeDailyDrill,
      castCommunityPoll,
      simulatePosEvent,
      resetDemo,
      dismissToast,
    ],
  );

  return <FanContext.Provider value={value}>{children}</FanContext.Provider>;
}

export function useFan() {
  const context = useContext(FanContext);
  if (!context) {
    throw new Error("useFan must be used within FanProvider");
  }
  return context;
}
