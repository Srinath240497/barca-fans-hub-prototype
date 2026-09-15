"use client";

import { AchievementCard } from "@/components/AchievementCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { FanSummary } from "@/components/FanSummary";
import { PointsBalance } from "@/components/PointsBalance";
import { XPProgress } from "@/components/XPProgress";
import { Card, Eyebrow } from "@/components/ui";
import { useFan } from "@/lib/fan-store";
import { ACHIEVEMENTS, BARCA_DNA, JOURNEY, SEASON_STATS } from "@/lib/mock-data";
import { Flame, LandPlot, ShoppingBag, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const JOURNEY_ICONS = {
  stadium: LandPlot,
  trophy: Trophy,
  flame: Flame,
  bag: ShoppingBag,
};

export function PassportTab() {
  const { state } = useFan();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5">
      <Card className="overflow-hidden border-gold/20">
        <div className="passport-sheen pointer-events-none absolute inset-0" />
        <FanSummary variant="passport" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <XPProgress xp={state.xp} />
          <PointsBalance available={state.availablePoints} pending={state.pendingPoints} />
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Legend
            title="XP"
            copy="Engagement and status. Earned by participating — not spend."
          />
          <Legend
            title="Barça Points"
            copy="Redeemable loyalty value. Pending until the transaction clears."
          />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-4">
        {SEASON_STATS.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="font-display text-3xl font-semibold text-gold">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <Eyebrow>Your Barça DNA</Eyebrow>
        <p className="mt-1 text-sm text-muted">A lightweight read of how you show up — not a personality test.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {BARCA_DNA.map((item) => (
            <div key={item.id}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold">{item.label}</span>
                <span className="text-gold">{item.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-navy-mid" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <Eyebrow className="mb-3">Achievements</Eyebrow>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item) => (
            <AchievementCard key={item.id} title={item.title} copy={item.copy} earned={item.earned} />
          ))}
        </div>
      </div>

      <Card>
        <Eyebrow>Recent Activity</Eyebrow>
        <p className="mt-1 text-sm text-muted">Every touchpoint across Play, Community, Store and Stadium.</p>
        <div className="mt-4">
          <ActivityFeed items={state.activity} now={now} />
        </div>
      </Card>

      <Card>
        <Eyebrow>My Barça Journey</Eyebrow>
        <p className="mt-1 text-sm text-muted">Milestones only. The history of a relationship, not a log.</p>
        <ol className="relative mt-6 space-y-5 border-l border-gold/25 pl-6">
          {JOURNEY.map((item) => {
            const Icon = JOURNEY_ICONS[item.icon];
            return (
              <li key={item.id} className="relative">
                <span className="absolute -left-[33px] flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-navy-elevated text-gold">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted">{item.detail}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-gold/80">{item.when}</p>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}

function Legend({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{title}</p>
      <p className="mt-1 text-sm text-muted">{copy}</p>
    </div>
  );
}
