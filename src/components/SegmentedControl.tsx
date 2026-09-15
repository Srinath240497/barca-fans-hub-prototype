"use client";

import { cn } from "@/lib/utils";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  ariaLabel,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "grid rounded-2xl border border-white/10 bg-black/25 p-1",
        options.length === 3 ? "grid-cols-3" : "grid-cols-4",
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "min-w-0 truncate rounded-xl px-1 py-2.5 text-[10px] font-semibold uppercase tracking-[0.04em] transition sm:px-2 sm:text-[11px] md:text-xs md:tracking-[0.16em]",
              selected
                ? "bg-navy-mid text-white shadow-[0_8px_20px_rgba(0,30,66,0.45)]"
                : "text-muted hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
