import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  padded = true,
}: {
  className?: string;
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/8 bg-navy-card/90 shadow-[var(--shadow-card)]",
        padded && "p-5 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function StatusPill({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "garnet" | "live" | "muted" | "success";
  className?: string;
}) {
  const tones = {
    gold: "border-gold/30 bg-gold/10 text-gold",
    garnet: "border-garnet/40 bg-garnet/15 text-white",
    live: "border-garnet/50 bg-garnet text-white",
    muted: "border-white/10 bg-white/5 text-muted",
    success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex w-full items-center justify-center rounded-xl bg-gold px-5 py-3.5 text-sm font-semibold tracking-[0.08em] text-navy transition hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/4 px-4 py-2.5 text-sm font-medium text-ink transition hover:border-gold/40 hover:bg-white/8",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
