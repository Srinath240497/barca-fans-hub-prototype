import { cn, initials } from "@/lib/utils";
import type { Player } from "@/lib/types";

const GROUP_TONE: Record<Player["group"], string> = {
  GK: "from-[#7a5a12] to-[#edbb00]",
  DEF: "from-[#00306e] to-[#004d98]",
  MID: "from-[#6b0030] to-[#a50044]",
  FWD: "from-[#004d98] to-[#a50044]",
};

export function PlayerAvatar({
  player,
  size = "md",
  selected = false,
}: {
  player: Player;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
}) {
  const dim =
    size === "sm" ? "h-9 w-9 text-[10px]" : size === "lg" ? "h-16 w-16 text-lg" : "h-12 w-12 text-sm";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-to-br font-display font-semibold text-white shadow-inner",
        GROUP_TONE[player.group],
        dim,
        selected && "ring-2 ring-gold ring-offset-2 ring-offset-navy",
      )}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full opacity-25 stripe-kit mix-blend-overlay" />
      <span className="relative">{player.number}</span>
      <span className="sr-only">{initials(player.fullName)}</span>
    </div>
  );
}

export function PlayerCard({
  player,
  selected = false,
  onSelect,
  disabled = false,
  subtitle,
  compact = false,
}: {
  player: Player;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled && !selected}
      aria-pressed={selected}
      aria-label={`${player.name}${subtitle ? `, ${subtitle}` : ""}`}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition",
        selected
          ? "border-gold/60 bg-gold/10"
          : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
        disabled && !selected && "opacity-40",
        compact && "px-2.5 py-2",
      )}
    >
      <PlayerAvatar player={player} selected={selected} size={compact ? "sm" : "md"} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{player.name}</p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          {subtitle ?? `${player.group} · ${player.nationality}`}
        </p>
      </div>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 font-display text-xs font-semibold",
          selected ? "bg-gold text-navy" : "bg-white/8 text-muted",
        )}
      >
        {player.number}
      </span>
    </button>
  );
}
