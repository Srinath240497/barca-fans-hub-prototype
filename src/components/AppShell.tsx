"use client";

import { Crest } from "@/components/Crest";
import { DemoControls } from "@/components/DemoControls";
import { FanAvatar, FanSummary } from "@/components/FanSummary";
import { ToastViewport } from "@/components/Toast";
import { CommunityTab } from "@/components/community/CommunityTab";
import { PassportTab } from "@/components/passport/PassportTab";
import { PlayTab } from "@/components/play/PlayTab";
import { ShopMatchdayTab } from "@/components/shop/ShopMatchdayTab";
import { useFan } from "@/lib/fan-store";
import type { PlaySegment, TabId } from "@/lib/types";
import { cn, formatPoints, formatXp } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, Target, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";

const TABS: { id: TabId; label: string; short: string; icon: typeof Target }[] = [
  { id: "play", label: "Play", short: "Play", icon: Target },
  { id: "community", label: "Community", short: "Community", icon: Users },
  { id: "shop", label: "Shop & Matchday", short: "Matchday", icon: Ticket },
  { id: "passport", label: "Passport", short: "Passport", icon: Fingerprint },
];

export function AppShell() {
  const [tab, setTab] = useState<TabId>("play");
  const [playSegment, setPlaySegment] = useState<PlaySegment>("prematch");
  const { state, resetDemo, consumePlayNav } = useFan();

  useEffect(() => {
    if (!state.pendingPlaySegment) return;
    setTab("play");
    setPlaySegment(state.pendingPlaySegment);
    consumePlayNav();
  }, [state.pendingPlaySegment, consumePlayNav]);

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1400px]">
        <aside className="sticky top-0 hidden h-dvh w-[280px] shrink-0 flex-col border-r border-white/8 bg-navy/40 px-5 py-6 lg:flex">
          <Brand />
          <nav className="mt-10 space-y-1.5">
            {TABS.map((item) => (
              <NavButton key={item.id} item={item} active={tab === item.id} onClick={() => setTab(item.id)} />
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <FanSummary variant="sidebar" />
            <DemoControls label="Reset demo" onClick={resetDemo} className="w-full py-2" />
          </div>
        </aside>

        <div className="flex min-w-0 w-full flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/8 bg-navy/95 px-4 py-3 backdrop-blur-md lg:hidden">
            <Brand compact />
            <div className="flex min-w-0 items-center gap-2">
              <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold text-gold">
                {formatXp(state.xp)} · {formatPoints(state.availablePoints)}
              </span>
              <FanAvatar size={32} />
            </div>
          </header>

          <header className="sticky top-0 z-40 hidden items-center justify-between border-b border-white/8 bg-navy/95 px-8 py-4 backdrop-blur-md lg:flex">
            <p className="text-sm text-muted">
              Play <span className="text-white/20">→</span> Belong{" "}
              <span className="text-white/20">→</span> Transact{" "}
              <span className="text-white/20">→</span> Remember
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">{formatXp(state.xp)} XP</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="font-semibold text-gold">{formatPoints(state.availablePoints)} pts</span>
                {state.pendingPoints > 0 && (
                  <span className="ml-2 text-xs text-gold/80">{state.pendingPoints} pending</span>
                )}
              </p>
              <FanSummary variant="header" />
            </div>
          </header>

          <main className="min-w-0 w-full flex-1 overflow-x-hidden px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                className="min-w-0 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {tab === "play" && (
                  <PlayTab segment={playSegment} onSegmentChange={setPlaySegment} />
                )}
                {tab === "community" && <CommunityTab />}
                {tab === "shop" && <ShopMatchdayTab />}
                {tab === "passport" && <PassportTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy/92 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-4">
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex min-w-0 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold uppercase tracking-[0.06em]",
                  active ? "text-gold" : "text-muted",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.short}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="fixed bottom-[5.5rem] right-3 z-40 lg:hidden">
        <DemoControls label="Reset demo" onClick={resetDemo} />
      </div>

      <ToastViewport />
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Crest size={compact ? 30 : 42} />
      <div>
        <p className="font-display text-[15px] font-semibold tracking-[0.16em] sm:text-lg sm:tracking-[0.18em]">
          CULERS
        </p>
        {!compact && (
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">FC Barcelona</p>
        )}
      </div>
    </div>
  );
}

function NavButton({
  item,
  active,
  onClick,
}: {
  item: (typeof TABS)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold tracking-wide transition",
        active
          ? "bg-navy-mid text-white shadow-[inset_0_0_0_1px_rgba(237,187,0,0.35)]"
          : "text-muted hover:bg-white/5 hover:text-ink",
      )}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </button>
  );
}
