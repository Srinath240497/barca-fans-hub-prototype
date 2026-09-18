import type {
  ApproachId,
  FanState,
  FormationId,
  GoalWindowId,
  PitchSlot,
  Player,
} from "./types";

export const FAN = {
  firstName: "Marc",
  lastInitial: "V.",
  displayName: "Marc V.",
  city: "London",
  country: "United Kingdom",
  countryCode: "GB",
  penya: "Penya de Londres",
  culerSince: 2011,
  level: 18,
  levelName: "Blaugrana",
  initialXp: 4320,
  nextLevelXp: 5000,
  levelFloorXp: 4000,
  initialPoints: 1850,
} as const;

export function createInitialState(): FanState {
  const now = Date.now();
  return {
    xp: FAN.initialXp,
    availablePoints: FAN.initialPoints,
    pendingPoints: 0,
    matchPlanLocked: false,
    matchPlan: null,
    goalSimulated: false,
    liveReaction: null,
    halftimeVote: null,
    dailyDrillCompleted: false,
    laMasiaWeekProgress: 4,
    communityPoll: null,
    penyaMissionProgress: 3,
    stadiumCheckedIn: true,
    stadiumPurchase: false,
    activity: [
      {
        id: "seed-drill",
        title: "Daily Drill completed",
        xpDelta: 25,
        at: now - 3 * 60 * 60 * 1000,
      },
      {
        id: "seed-uk",
        title: "UK Culer Challenge",
        subtitle: "Weekly mission contribution",
        at: now - 26 * 60 * 60 * 1000,
      },
    ],
    toast: null,
  };
}

export const SQUAD: Player[] = [
  { id: "ter-stegen", name: "ter Stegen", fullName: "Marc-André ter Stegen", number: 1, group: "GK", nationality: "GER" },
  { id: "szczesny", name: "Szczęsny", fullName: "Wojciech Szczęsny", number: 25, group: "GK", nationality: "POL" },
  { id: "kounde", name: "Koundé", fullName: "Jules Koundé", number: 23, group: "DEF", nationality: "FRA" },
  { id: "araujo", name: "Araújo", fullName: "Ronald Araújo", number: 4, group: "DEF", nationality: "URU" },
  { id: "cubarsi", name: "Cubarsí", fullName: "Pau Cubarsí", number: 2, group: "DEF", nationality: "ESP" },
  { id: "balde", name: "Balde", fullName: "Alejandro Balde", number: 3, group: "DEF", nationality: "ESP" },
  { id: "inigo", name: "Iñigo", fullName: "Iñigo Martínez", number: 5, group: "DEF", nationality: "ESP" },
  { id: "martin", name: "Gerard Martín", fullName: "Gerard Martín", number: 35, group: "DEF", nationality: "ESP" },
  { id: "eric", name: "Eric García", fullName: "Eric García", number: 24, group: "DEF", nationality: "ESP" },
  { id: "pedri", name: "Pedri", fullName: "Pedri González", number: 8, group: "MID", nationality: "ESP" },
  { id: "dejong", name: "de Jong", fullName: "Frenkie de Jong", number: 21, group: "MID", nationality: "NED" },
  { id: "olmo", name: "Dani Olmo", fullName: "Dani Olmo", number: 20, group: "MID", nationality: "ESP" },
  { id: "fermin", name: "Fermín", fullName: "Fermín López", number: 16, group: "MID", nationality: "ESP" },
  { id: "gavi", name: "Gavi", fullName: "Pablo Gavi", number: 6, group: "MID", nationality: "ESP" },
  { id: "casado", name: "Casadó", fullName: "Marc Casadó", number: 17, group: "MID", nationality: "ESP" },
  { id: "lewandowski", name: "Lewandowski", fullName: "Robert Lewandowski", number: 9, group: "FWD", nationality: "POL" },
  { id: "raphinha", name: "Raphinha", fullName: "Raphinha", number: 11, group: "FWD", nationality: "BRA" },
  { id: "yamal", name: "Yamal", fullName: "Lamine Yamal", number: 10, group: "FWD", nationality: "ESP" },
  { id: "ferran", name: "Ferran", fullName: "Ferran Torres", number: 7, group: "FWD", nationality: "ESP" },
  { id: "rashford", name: "Rashford", fullName: "Marcus Rashford", number: 14, group: "FWD", nationality: "ENG" },
];

export const FORMATIONS: Record<
  FormationId,
  { label: string; hint: string; slots: PitchSlot[] }
> = {
  "4-3-3": {
    label: "4-3-3",
    hint: "Barça’s home shape",
    slots: [
      { id: "lw", label: "LW", group: "FWD", x: 18, y: 18 },
      { id: "st", label: "ST", group: "FWD", x: 50, y: 14 },
      { id: "rw", label: "RW", group: "FWD", x: 82, y: 18 },
      { id: "lcm", label: "CM", group: "MID", x: 26, y: 42 },
      { id: "cm", label: "CM", group: "MID", x: 50, y: 46 },
      { id: "rcm", label: "CM", group: "MID", x: 74, y: 42 },
      { id: "lb", label: "LB", group: "DEF", x: 16, y: 68 },
      { id: "lcb", label: "CB", group: "DEF", x: 38, y: 72 },
      { id: "rcb", label: "CB", group: "DEF", x: 62, y: 72 },
      { id: "rb", label: "RB", group: "DEF", x: 84, y: 68 },
      { id: "gk", label: "GK", group: "GK", x: 50, y: 90 },
    ],
  },
  "4-2-3-1": {
    label: "4-2-3-1",
    hint: "Control with a 10",
    slots: [
      { id: "st", label: "ST", group: "FWD", x: 50, y: 14 },
      { id: "lw", label: "LW", group: "FWD", x: 18, y: 30 },
      { id: "cam", label: "AM", group: "MID", x: 50, y: 32 },
      { id: "rw", label: "RW", group: "FWD", x: 82, y: 30 },
      { id: "ldm", label: "DM", group: "MID", x: 34, y: 52 },
      { id: "rdm", label: "DM", group: "MID", x: 66, y: 52 },
      { id: "lb", label: "LB", group: "DEF", x: 16, y: 70 },
      { id: "lcb", label: "CB", group: "DEF", x: 38, y: 74 },
      { id: "rcb", label: "CB", group: "DEF", x: 62, y: 74 },
      { id: "rb", label: "RB", group: "DEF", x: 84, y: 70 },
      { id: "gk", label: "GK", group: "GK", x: 50, y: 90 },
    ],
  },
  other: {
    label: "3-4-3",
    hint: "Other — width first",
    slots: [
      { id: "lw", label: "LW", group: "FWD", x: 20, y: 18 },
      { id: "st", label: "ST", group: "FWD", x: 50, y: 14 },
      { id: "rw", label: "RW", group: "FWD", x: 80, y: 18 },
      { id: "lm", label: "LM", group: "MID", x: 14, y: 46 },
      { id: "lcm", label: "CM", group: "MID", x: 38, y: 48 },
      { id: "rcm", label: "CM", group: "MID", x: 62, y: 48 },
      { id: "rm", label: "RM", group: "MID", x: 86, y: 46 },
      { id: "lcb", label: "CB", group: "DEF", x: 28, y: 72 },
      { id: "cb", label: "CB", group: "DEF", x: 50, y: 76 },
      { id: "rcb", label: "CB", group: "DEF", x: 72, y: 72 },
      { id: "gk", label: "GK", group: "GK", x: 50, y: 90 },
    ],
  },
};

export const APPROACHES: {
  id: ApproachId;
  label: string;
  copy: string;
}[] = [
  {
    id: "control",
    label: "CONTROL",
    copy: "Dominate the ball and dictate tempo.",
  },
  {
    id: "attack",
    label: "ATTACK",
    copy: "Press aggressively and take the game to them.",
  },
  {
    id: "direct",
    label: "DIRECT",
    copy: "Exploit space quickly behind the opposition.",
  },
];

export const GOAL_WINDOWS: { id: GoalWindowId; label: string }[] = [
  { id: "1-15", label: "1–15" },
  { id: "16-30", label: "16–30" },
  { id: "31-45+", label: "31–45+" },
  { id: "46-60", label: "46–60" },
  { id: "61-75", label: "61–75" },
  { id: "76-90+", label: "76–90+" },
  { id: "none", label: "No Barça goal" },
];

export const FIRST_SCORERS = ["yamal", "raphinha", "olmo", "pedri"] as const;

export const DIFFERENCE_MAKERS = [
  "yamal",
  "raphinha",
  "pedri",
  "lewandowski",
  "olmo",
] as const;

export const DRILL_OPTIONS = [
  { id: "cubarsi", correct: true },
  { id: "kounde", correct: false },
  { id: "szczesny", correct: false },
  { id: "rashford", correct: false },
] as const;

export const PULSE_REACTIONS = [
  { id: "finish" as const, label: "What a finish", emoji: "🔥", global: 68, uk: 74 },
  { id: "visca" as const, label: "Visca Barça", emoji: "💙❤️", global: 24, uk: 18 },
  { id: "class" as const, label: "Different class", emoji: "🐐", global: 8, uk: 8 },
];

export const HALFTIME_NOMINEES = ["yamal", "raphinha", "pedri", "cubarsi"] as const;

export const COMMUNITIES = [
  { id: "global", emoji: "🌍", name: "Global Culers", activity: "Matchday active" },
  { id: "uk", emoji: "🇬🇧", name: "United Kingdom", activity: "Active now" },
  { id: "london", emoji: "📍", name: "London", activity: "Local" },
  { id: "penya", emoji: "🛡", name: "Penya de Londres", activity: "Live" },
] as const;

export const REGIONAL_LEADERBOARD = [
  { rank: 1, name: "Spain", accuracy: 76 },
  { rank: 2, name: "Brazil", accuracy: 74 },
  { rank: 3, name: "Argentina", accuracy: 73 },
  { rank: 4, name: "United Kingdom", accuracy: 72 },
] as const;

export const SEASON_STATS = [
  { label: "Match Plans", value: "18" },
  { label: "Prediction Accuracy", value: "73%" },
  { label: "Daily Drills", value: "12" },
  { label: "Matchdays", value: "6" },
] as const;

export const BARCA_DNA = [
  { id: "tactician", label: "Tactician", value: 82 },
  { id: "historian", label: "Historian", value: 67 },
  { id: "matchday", label: "Matchday", value: 91 },
  { id: "community", label: "Community", value: 54 },
] as const;

export const ACHIEVEMENTS = [
  {
    id: "perfect-xi",
    title: "Perfect XI",
    copy: "Predicted all 11 starters.",
    earned: true,
  },
  {
    id: "camp-nou-debut",
    title: "Camp Nou Debut",
    copy: "First verified stadium visit.",
    earned: true,
  },
  {
    id: "la-masia-scholar",
    title: "La Masia Scholar",
    copy: "Completed academy challenges.",
    earned: true,
  },
  {
    id: "ten-match",
    title: "10 Match Streak",
    copy: "Participated in 10 consecutive Barça matches.",
    earned: true,
  },
] as const;

export const JOURNEY = [
  {
    id: "visit",
    icon: "stadium" as const,
    title: "First Camp Nou Visit",
    detail: "Barcelona vs Sevilla",
    when: "2019",
  },
  {
    id: "perfect",
    icon: "trophy" as const,
    title: "First Perfect XI",
    detail: "El Clásico lineup called",
    when: "2023",
  },
  {
    id: "streak",
    icon: "flame" as const,
    title: "10-Match Streak",
    detail: "Present for every fixture",
    when: "This season",
  },
  {
    id: "store",
    icon: "bag" as const,
    title: "First Official Store Purchase",
    detail: "Home shirt, London",
    when: "2024",
  },
] as const;

export const STORAGE_KEY = "culers-fan-platform-demo-v1";

export function getPlayer(id: string) {
  return SQUAD.find((player) => player.id === id);
}

export function assignPlayersToSlots(playerIds: string[], formation: FormationId) {
  const slots = FORMATIONS[formation].slots;
  const remaining = playerIds
    .map((id) => getPlayer(id))
    .filter((player): player is Player => Boolean(player));
  const assigned: { slot: PitchSlot; player: Player | null }[] = [];

  for (const slot of slots) {
    const index = remaining.findIndex((player) => player.group === slot.group);
    if (index >= 0) {
      assigned.push({ slot, player: remaining.splice(index, 1)[0] });
    } else {
      assigned.push({ slot, player: null });
    }
  }

  for (const row of assigned) {
    if (!row.player && remaining.length > 0) {
      row.player = remaining.shift() ?? null;
    }
  }

  return assigned;
}
