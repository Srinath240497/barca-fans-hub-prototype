import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function AchievementCard({
  title,
  copy,
  earned,
}: {
  title: string;
  copy: string;
  earned: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        earned ? "border-gold/25 bg-gold/8" : "border-white/8 bg-white/[0.03] opacity-70",
      )}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy-elevated">
        <Check className="h-4 w-4 text-gold" strokeWidth={2.4} />
      </div>
      <p className="font-display text-base font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm leading-snug text-muted">{copy}</p>
    </div>
  );
}
