import { cn } from "@/lib/utils";

export function RewardStatus({
  steps,
  completeLabel,
  reward,
}: {
  steps: { label: string; done: boolean }[];
  completeLabel: string;
  reward: string;
}) {
  const done = steps.filter((step) => step.done).length;
  const complete = done === steps.length;

  return (
    <div>
      <div className="space-y-2">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3 text-sm">
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
                step.done
                  ? "border-gold bg-gold text-navy"
                  : "border-white/20 text-muted",
              )}
            >
              {step.done ? "✓" : ""}
            </span>
            <span className={step.done ? "text-ink" : "text-muted"}>{step.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-3 py-2.5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {done} / {steps.length} complete
        </p>
        <p className={cn("text-sm font-semibold", complete ? "text-gold" : "text-ink")}>
          {complete ? completeLabel : reward}
        </p>
      </div>
    </div>
  );
}
