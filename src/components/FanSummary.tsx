"use client";

import { FAN } from "@/lib/mock-data";
import { useFan } from "@/lib/fan-store";
import { cn } from "@/lib/utils";
import { PointsBalance } from "./PointsBalance";
import { XPProgress } from "./XPProgress";

export function FanAvatar({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-navy-mid to-garnet font-display text-sm font-semibold text-white ring-2 ring-gold/70 ring-offset-2 ring-offset-navy",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      MV
    </div>
  );
}

export function FanSummary({ variant = "header" }: { variant?: "header" | "sidebar" | "passport" }) {
  const { state } = useFan();

  if (variant === "header") {
    return (
      <div className="flex items-center gap-3">
        <FanAvatar size={36} />
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold">{FAN.displayName}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Lv {FAN.level} · {state.availablePoints.toLocaleString("en-GB")} pts
          </p>
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
        <div className="flex items-center gap-3">
          <FanAvatar />
          <div>
            <p className="font-semibold">{FAN.displayName}</p>
            <p className="text-xs text-muted">
              🇬🇧 {FAN.city} · {FAN.penya}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <XPProgress xp={state.xp} compact />
        </div>
        <div className="mt-4 border-t border-white/8 pt-3">
          <PointsBalance available={state.availablePoints} pending={state.pendingPoints} compact />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <FanAvatar size={72} className="text-xl" />
      <div>
        <p className="font-display text-3xl font-semibold">{FAN.displayName}</p>
        <p className="mt-1 text-sm text-muted">
          🇬🇧 {FAN.country} · {FAN.penya}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">
          Culer since {FAN.culerSince}
        </p>
      </div>
    </div>
  );
}
