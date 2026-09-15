"use client";

import { cn } from "@/lib/utils";

export function CommunityChallenge({
  yourAccuracy,
}: {
  yourAccuracy: number;
}) {
  const london = 72;
  const newYork = 69;
  const max = Math.max(london, newYork);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-gold/20 bg-gradient-to-br from-navy-elevated via-navy-card to-[#3a0720] p-5 md:p-7">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-garnet/20 blur-3xl" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Culer Clash</p>
      <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">London vs New York</h3>
      <p className="mt-1 text-sm text-muted">Weekend predictor accuracy — normalised, not headcount.</p>

      <div className="mt-6 space-y-4">
        <ClashBar label="London" value={london} max={max} lead />
        <ClashBar label="New York" value={newYork} max={max} />
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
        <p className="text-sm text-muted">Your contribution</p>
        <p className="font-display text-2xl font-semibold text-gold">{yourAccuracy}%</p>
      </div>
    </div>
  );
}

function ClashBar({
  label,
  value,
  max,
  lead = false,
}: {
  label: string;
  value: number;
  max: number;
  lead?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className={cn(lead ? "text-gold" : "text-muted")}>{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full", lead ? "bg-gold" : "bg-navy-mid")}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}
