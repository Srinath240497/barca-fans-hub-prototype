"use client";

import { FAN } from "@/lib/mock-data";
import { cn, formatXp } from "@/lib/utils";

export function XPProgress({
  xp,
  compact = false,
  className,
}: {
  xp: number;
  compact?: boolean;
  className?: string;
}) {
  const range = FAN.nextLevelXp - FAN.levelFloorXp;
  const progress = Math.min(1, Math.max(0, (xp - FAN.levelFloorXp) / range));
  const remaining = Math.max(0, FAN.nextLevelXp - xp);

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink">
          Level {FAN.level}
          <span className="ml-2 text-gold">· {FAN.levelName}</span>
        </p>
        {!compact && (
          <p className="text-xs text-muted">
            {formatXp(xp)} / {formatXp(FAN.nextLevelXp)} XP
          </p>
        )}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright transition-all duration-700 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {compact ? (
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
          {formatXp(xp)} XP
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted">
          {formatXp(remaining)} XP to Level {FAN.level + 1}
        </p>
      )}
    </div>
  );
}
