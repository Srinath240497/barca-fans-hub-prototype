"use client";

import { cn, formatPoints } from "@/lib/utils";

export function PointsBalance({
  available,
  pending = 0,
  compact = false,
  className,
}: {
  available: number;
  pending?: number;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        Barça Points
      </p>
      <p className={cn("font-display font-semibold text-gold", compact ? "text-lg" : "text-3xl")}>
        {formatPoints(available)}
        <span className="ml-2 text-xs font-sans font-medium uppercase tracking-[0.16em] text-muted">
          Available
        </span>
      </p>
      {!compact && (
        <p className="mt-1 text-sm text-muted">
          {pending > 0 ? (
            <>
              <span className="text-gold-bright">{formatPoints(pending)} Pending</span>
              <span className="mx-2 text-white/20">·</span>
              Redeemable after confirmation
            </>
          ) : (
            "Redeemable loyalty value — separate from XP"
          )}
        </p>
      )}
      {compact && pending > 0 && (
        <p className="text-[11px] uppercase tracking-[0.12em] text-gold/80">
          {formatPoints(pending)} pending
        </p>
      )}
    </div>
  );
}
