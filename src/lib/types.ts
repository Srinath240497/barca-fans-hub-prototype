export type TabId = "play" | "community" | "shop" | "passport";
export type PlaySegment = "prematch" | "live" | "midweek";
export type CommunityHub = "global" | "uk" | "penya";
export type PlayerGroup = "GK" | "DEF" | "MID" | "FWD";
export type FormationId = "4-3-3" | "4-2-3-1" | "other";
export type ApproachId = "control" | "attack" | "direct";
export type GoalWindowId =
  | "1-15"
  | "16-30"
  | "31-45+"
  | "46-60"
  | "61-75"
  | "76-90+"
  | "none";
export type LiveReactionId = "finish" | "visca" | "class";
export type PollChoice = "yes" | "no" | "depends";

export interface Player {
  id: string;
  name: string;
  fullName: string;
  number: number;
  group: PlayerGroup;
  nationality: string;
}

export interface PitchSlot {
  id: string;
  label: string;
  group: PlayerGroup;
  x: number;
  y: number;
}

export interface MatchPlan {
  playerIds: string[];
  formation: FormationId;
  approach: ApproachId;
  firstScorerId: string;
  goalWindow: GoalWindowId;
  differenceMakerId: string;
}

export interface ActivityEntry {
  id: string;
  title: string;
  subtitle?: string;
  xpDelta?: number;
  pointsDelta?: number;
  pointsPending?: boolean;
  at: number;
}

export interface ToastState {
  id: string;
  title: string;
  body?: string;
}

export interface FanState {
  xp: number;
  availablePoints: number;
  pendingPoints: number;
  matchPlanLocked: boolean;
  matchPlan: MatchPlan | null;
  goalSimulated: boolean;
  liveReaction: LiveReactionId | null;
  halftimeVote: string | null;
  dailyDrillCompleted: boolean;
  laMasiaWeekProgress: number;
  communityPoll: PollChoice | null;
  penyaMissionProgress: number;
  stadiumCheckedIn: boolean;
  stadiumPurchase: boolean;
  activity: ActivityEntry[];
  toast: ToastState | null;
}

export interface FanContextValue {
  state: FanState;
  lockMatchPlan: (plan: MatchPlan) => void;
  simulateGoal: () => void;
  setLiveReaction: (reaction: LiveReactionId) => void;
  setHalftimeVote: (playerId: string) => void;
  completeDailyDrill: () => void;
  castCommunityPoll: (choice: PollChoice) => void;
  simulatePosEvent: () => void;
  resetDemo: () => void;
  dismissToast: () => void;
}
