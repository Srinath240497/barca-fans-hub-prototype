"use client";

import { FootballPitch } from "@/components/FootballPitch";
import { PlayerCard } from "@/components/PlayerCard";
import { Card, Eyebrow, GhostButton, PrimaryButton, StatusPill } from "@/components/ui";
import { useFan } from "@/lib/fan-store";
import {
  APPROACHES,
  DIFFERENCE_MAKERS,
  FIRST_SCORERS,
  FORMATIONS,
  getPlayer,
  GOAL_WINDOWS,
  SQUAD,
} from "@/lib/mock-data";
import type { ApproachId, FormationId, GoalWindowId, PlayerGroup } from "@/lib/types";
import { cn, formatCountdown } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const LIKELY_XI = [
  "ter-stegen",
  "balde",
  "cubarsi",
  "araujo",
  "kounde",
  "pedri",
  "dejong",
  "olmo",
  "yamal",
  "lewandowski",
  "raphinha",
];

const FILTERS: { id: PlayerGroup | "ALL"; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "GK", label: "GK" },
  { id: "DEF", label: "DEF" },
  { id: "MID", label: "MID" },
  { id: "FWD", label: "FWD" },
];

export function PreMatch() {
  const { state, lockMatchPlan } = useFan();
  const [lockIn, setLockIn] = useState(1 * 3600 + 42 * 60);
  const [filter, setFilter] = useState<PlayerGroup | "ALL">("ALL");
  const [playerIds, setPlayerIds] = useState<string[]>(state.matchPlan?.playerIds ?? []);
  const [formation, setFormation] = useState<FormationId>(state.matchPlan?.formation ?? "4-3-3");
  const [approach, setApproach] = useState<ApproachId | null>(state.matchPlan?.approach ?? null);
  const [firstScorerId, setFirstScorerId] = useState(state.matchPlan?.firstScorerId ?? "");
  const [goalWindow, setGoalWindow] = useState<GoalWindowId | null>(state.matchPlan?.goalWindow ?? null);
  const [differenceMakerId, setDifferenceMakerId] = useState(state.matchPlan?.differenceMakerId ?? "");

  useEffect(() => {
    const timer = window.setInterval(() => setLockIn((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleSquad = useMemo(
    () => SQUAD.filter((player) => filter === "ALL" || player.group === filter),
    [filter],
  );

  const complete =
    playerIds.length === 11 && Boolean(approach && firstScorerId && goalWindow && differenceMakerId);

  const togglePlayer = (id: string) => {
    if (state.matchPlanLocked) return;
    setPlayerIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 11) return current;
      return [...current, id];
    });
  };

  if (state.matchPlanLocked && state.matchPlan) {
    return <LockedPlan />;
  }

  return (
    <div className="space-y-5">
      <Card className="bg-gradient-to-r from-navy-elevated to-[#3a0a22]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Eyebrow>Be the Mister</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
              Upcoming: FC Barcelona vs Atlético de Madrid
            </h2>
            <p className="mt-1 text-sm text-muted">Kick-off 21:00 · Spotify Camp Nou · Locks before team news</p>
          </div>
          <StatusPill tone="garnet">Locks in {formatCountdown(lockIn)}</StatusPill>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <Card padded={false} className="p-4 md:p-5">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-display text-xl font-semibold">1. Pick Your XI</h3>
            <GhostButton
              className="w-fit px-3 py-1.5 text-xs"
              onClick={() => setPlayerIds(LIKELY_XI)}
            >
              Use likely XI
            </GhostButton>
          </div>
          <FootballPitch playerIds={playerIds} formation={formation} className="aspect-[5/6] w-full" />
        </Card>

        <Card>
          <p className="text-sm text-muted">{playerIds.length} of 11 selected</p>
          <div className="mt-3 flex gap-1.5">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                  filter === item.id ? "bg-gold text-navy" : "bg-white/5 text-muted",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid max-h-[420px] gap-2 overflow-auto pr-1">
            {visibleSquad.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                compact
                selected={playerIds.includes(player.id)}
                disabled={playerIds.length >= 11 && !playerIds.includes(player.id)}
                onSelect={() => togglePlayer(player.id)}
              />
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-display text-xl font-semibold">2. Choose Your Shape</h3>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {(Object.keys(FORMATIONS) as FormationId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFormation(id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left",
                formation === id ? "border-gold bg-gold/10" : "border-white/8 bg-white/[0.03]",
              )}
            >
              <p className="font-display text-lg font-semibold">
                {id === "other" ? "Other" : FORMATIONS[id].label}
              </p>
              <p className="text-sm text-muted">{FORMATIONS[id].hint}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl font-semibold">3. Match Approach</h3>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {APPROACHES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setApproach(item.id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left",
                approach === item.id ? "border-gold bg-gold/10" : "border-white/8 bg-white/[0.03]",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{item.label}</p>
              <p className="mt-2 text-sm text-muted">{item.copy}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl font-semibold">4. First Barça Goalscorer</h3>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {FIRST_SCORERS.map((id) => {
            const player = getPlayer(id);
            if (!player) return null;
            return (
              <PlayerCard
                key={id}
                player={player}
                selected={firstScorerId === id}
                onSelect={() => setFirstScorerId(id)}
                subtitle="First scorer"
              />
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl font-semibold">5. First Goal Window</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {GOAL_WINDOWS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setGoalWindow(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold",
                goalWindow === item.id
                  ? "border-gold bg-gold text-navy"
                  : "border-white/10 bg-white/5 text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl font-semibold">6. Difference Maker</h3>
        <p className="mt-1 text-sm text-muted">Who tilts this match the most?</p>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
          {DIFFERENCE_MAKERS.map((id) => {
            const player = getPlayer(id);
            if (!player) return null;
            return (
              <PlayerCard
                key={id}
                player={player}
                compact
                selected={differenceMakerId === id}
                onSelect={() => setDifferenceMakerId(id)}
                subtitle="Impact"
              />
            );
          })}
        </div>
      </Card>

      <Card className="border-gold/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Potential accuracy reward
            </p>
            <p className="font-display text-3xl font-semibold text-gold">140 XP</p>
            <p className="text-sm text-muted">Awarded after the match, based on how close you get.</p>
          </div>
          <PrimaryButton
            className="md:w-auto md:min-w-[240px]"
            disabled={!complete}
            onClick={() => {
              if (!approach || !goalWindow) return;
              lockMatchPlan({
                playerIds,
                formation,
                approach,
                firstScorerId,
                goalWindow,
                differenceMakerId,
              });
            }}
          >
            Lock my match plan
          </PrimaryButton>
        </div>
      </Card>
    </div>
  );
}

function LockedPlan() {
  const { state } = useFan();
  const plan = state.matchPlan;
  if (!plan) return null;
  const scorer = getPlayer(plan.firstScorerId);
  const maker = getPlayer(plan.differenceMakerId);
  const windowLabel = GOAL_WINDOWS.find((item) => item.id === plan.goalWindow)?.label;
  const approach = APPROACHES.find((item) => item.id === plan.approach);

  return (
    <Card className="border-gold/30 bg-gradient-to-b from-navy-elevated to-navy-card">
      <StatusPill tone="success">Match Plan Locked ✓</StatusPill>
      <h2 className="mt-4 font-display text-3xl font-semibold">You’re in for Atlético.</h2>
      <p className="mt-2 max-w-xl text-muted">
        Come back on matchday to see how your decisions compare with the real Barça.
      </p>
      <p className="mt-4 font-semibold text-gold">+20 XP participation</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <FootballPitch playerIds={plan.playerIds} formation={plan.formation} className="aspect-[5/6]" />
        <div className="space-y-3 text-sm">
          <SummaryRow label="Shape" value={plan.formation === "other" ? "Other · 3-4-3" : plan.formation} />
          <SummaryRow label="Approach" value={approach?.label ?? ""} />
          <SummaryRow label="First scorer" value={scorer?.fullName ?? ""} />
          <SummaryRow label="First goal window" value={windowLabel ?? ""} />
          <SummaryRow label="Difference maker" value={maker?.fullName ?? ""} />
        </div>
      </div>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
