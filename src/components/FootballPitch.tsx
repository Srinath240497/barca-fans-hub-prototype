"use client";

import { assignPlayersToSlots, FORMATIONS } from "@/lib/mock-data";
import type { FormationId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "./PlayerCard";

export function FootballPitch({
  playerIds,
  formation,
  className,
}: {
  playerIds: string[];
  formation: FormationId;
  className?: string;
}) {
  const assigned = assignPlayersToSlots(playerIds, formation);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/10 bg-pitch shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-40 stripe-kit mix-blend-overlay" />
      <svg viewBox="0 0 100 110" width="100%" height="100%" className="relative z-10 h-full w-full">
        <rect x="4" y="4" width="92" height="102" rx="4" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" />
        <line x1="4" y1="55" x2="96" y2="55" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        <circle cx="50" cy="55" r="10" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        <circle cx="50" cy="55" r="0.8" fill="rgba(255,205,0,0.8)" />
        <rect x="30" y="4" width="40" height="14" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        <rect x="38" y="4" width="24" height="6" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        <rect x="30" y="92" width="40" height="14" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        <rect x="38" y="100" width="24" height="6" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
      </svg>

      {assigned.map(({ slot, player }) => (
        <div
          key={slot.id}
          className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
        >
          {player ? (
            <>
              <PlayerAvatar player={player} size="sm" selected />
              <span className="mt-1 max-w-[80px] truncate rounded-full bg-navy/75 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {player.name === "Lewandowski" ? "Lewy" : player.name}
              </span>
            </>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-white/35 bg-black/20 text-[9px] font-semibold uppercase tracking-wider text-white/70">
              {slot.label}
            </div>
          )}
        </div>
      ))}

      <p className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-navy/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
        {FORMATIONS[formation].label} · {playerIds.length}/11
      </p>
    </div>
  );
}
