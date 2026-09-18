"use client";

import { CommunityChallenge } from "@/components/CommunityChallenge";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Card, Eyebrow, StatusPill } from "@/components/ui";
import { useFan } from "@/lib/fan-store";
import { COMMUNITIES, REGIONAL_LEADERBOARD } from "@/lib/mock-data";
import type { CommunityHub, PollChoice } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

const POLL: { id: PollChoice; label: string }[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "depends", label: "Depends on shape" },
];

export function CommunityTab() {
  const { state, castCommunityPoll } = useFan();
  const [hub, setHub] = useState<CommunityHub>("penya");

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Community</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl">
          Belong somewhere specific.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Structured rivalry and local missions — not another open feed.
        </p>
      </header>

      <SegmentedControl
        ariaLabel="Community hubs"
        value={hub}
        onChange={setHub}
        options={[
          { id: "global", label: "Global" },
          { id: "uk", label: "UK Culers" },
          { id: "penya", label: "Penya de Londres" },
        ]}
      />

      <Card>
        <Eyebrow>Your Communities</Eyebrow>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {COMMUNITIES.map((community) => (
            <div
              key={community.id}
              className={cn(
                "rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3",
                (hub === "penya" && community.id === "penya") ||
                  (hub === "uk" && community.id === "uk") ||
                  (hub === "global" && community.id === "global")
                  ? "border-gold/30 bg-gold/8"
                  : "",
              )}
            >
              <p className="font-semibold">
                {community.emoji} {community.name}
              </p>
              <p className="mt-1 text-xs text-muted">{community.activity}</p>
            </div>
          ))}
        </div>
      </Card>

      <CommunityChallenge yourAccuracy={84} />

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Eyebrow>Community Poll · {hub === "penya" ? "Penya de Londres" : hub === "uk" ? "UK Culers" : "Global"}</Eyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              Should Fermín start in midfield against Atlético?
            </h3>
          </div>
          {state.communityPoll && <StatusPill tone="success">Vote recorded ✓</StatusPill>}
        </div>
        <div className="mt-5 grid gap-2 md:grid-cols-3">
          {POLL.map((option) => (
            <button
              key={option.id}
              type="button"
              disabled={Boolean(state.communityPoll)}
              onClick={() => castCommunityPoll(option.id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left font-semibold",
                state.communityPoll === option.id
                  ? "border-gold bg-gold/10"
                  : "border-white/8 bg-white/[0.03]",
                state.communityPoll && state.communityPoll !== option.id && "opacity-40",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {state.communityPoll && (
          <p className="mt-4 text-sm text-muted">
            Counted toward your Penya week. Reward unlocks when the mission completes — not for the click.
          </p>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <Eyebrow>Weekly Penya Mission</Eyebrow>
          <p className="text-sm font-semibold text-gold">
            {state.penyaMissionProgress} / 5
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${(state.penyaMissionProgress / 5) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted">Contribute five times this week to unlock the Penya ribbon.</p>
      </Card>

      <Card className="opacity-90">
        <Eyebrow>Regional accuracy</Eyebrow>
        <p className="mt-2 text-sm text-muted">Normalised predictor performance this weekend.</p>
        <ol className="mt-4 space-y-2">
          {REGIONAL_LEADERBOARD.map((row) => (
            <li
              key={row.name}
              className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2 text-sm"
            >
              <span>
                <span className="mr-3 text-muted">{row.rank}</span>
                {row.name}
              </span>
              <span className="text-muted">{row.accuracy}%</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
