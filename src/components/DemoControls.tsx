"use client";

import { cn } from "@/lib/utils";

export function DemoControls({
  label,
  onClick,
  disabled,
  className,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded border border-dashed border-white/18 bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 transition hover:border-gold/35 hover:text-gold/80 disabled:opacity-30",
        className,
      )}
    >
      {label}
    </button>
  );
}
