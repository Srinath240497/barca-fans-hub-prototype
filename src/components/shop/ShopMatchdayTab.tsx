"use client";

import { DemoControls } from "@/components/DemoControls";
import { MatchdayPass } from "@/components/MatchdayPass";
import { RewardStatus } from "@/components/RewardStatus";
import { Card, Eyebrow, StatusPill } from "@/components/ui";
import { useFan } from "@/lib/fan-store";
import { ExternalLink } from "lucide-react";

export function ShopMatchdayTab() {
  const { state, simulatePosEvent } = useFan();

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Shop & Matchday</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl">
          Official commerce, connected to who you are.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          We don’t rebuild the store. We recognise the fan who shops, walks in, and sits down.
        </p>
      </header>

      <Card className="overflow-hidden p-0">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="stripe-kit relative min-h-[240px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
            <svg viewBox="0 0 200 220" className="absolute left-1/2 top-6 h-44 -translate-x-1/2 opacity-90" aria-hidden>
              <path d="M40 70c0-18 26-30 60-30s60 12 60 30v110H40V70Z" fill="none" stroke="rgba(255,205,0,0.55)" strokeWidth="3" />
              <path d="M70 48c8-8 52-8 60 0" fill="none" stroke="rgba(255,205,0,0.7)" strokeWidth="3" />
            </svg>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-display text-3xl font-semibold">2026/27 Home Kit</p>
              <p className="text-sm text-white/80">The stripe, recut for the return to Camp Nou.</p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 md:p-6">
            <div>
              <Eyebrow>Official Store</Eyebrow>
              <StatusPill className="mt-3">2× eligible Barça Points this week</StatusPill>
              <p className="mt-4 text-sm text-muted">
                Official Store account connected ✓
              </p>
            </div>
            <a
              href="https://store.fcbarcelona.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-gold/30 bg-white/5 px-4 py-3 text-sm font-semibold tracking-[0.08em] text-gold transition hover:bg-gold hover:text-navy"
            >
              Shop Official Store
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Card>

      <Card>
        <Eyebrow>Recent store activity</Eyebrow>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
          <div>
            <p className="font-semibold">Home Shirt</p>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Official Store · London</p>
          </div>
          <p className="text-right text-sm font-semibold text-gold">
            +180 Barça Points
            <span className="block text-xs font-medium text-muted">Pending</span>
          </p>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Eyebrow>Matchday</Eyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold">Spotify Camp Nou</h3>
            <p className="text-sm text-muted">Barcelona vs Sevilla · Today · 20:00</p>
          </div>
          <StatusPill tone="garnet">Matchday</StatusPill>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <MatchdayPass />
          <div className="space-y-5">
            <div>
              <h4 className="font-display text-xl font-semibold">Today’s Matchday Mission</h4>
              <div className="mt-4">
                <RewardStatus
                  steps={[
                    { label: "Match Plan completed", done: state.matchPlanLocked },
                    { label: "Stadium check-in", done: state.stadiumCheckedIn },
                    { label: "Eligible matchday purchase", done: state.stadiumPurchase },
                  ]}
                  completeLabel="Camp Nou Matchday Badge earned"
                  reward="Camp Nou Matchday Badge"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-white/15 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Prototype control</p>
                <DemoControls
                  label="Simulate POS event"
                  onClick={simulatePosEvent}
                  disabled={state.stadiumPurchase}
                />
              </div>
              {state.stadiumPurchase && (
                <div className="mt-3 rounded-xl border border-gold/20 bg-gold/10 px-3 py-3">
                  <p className="text-sm font-semibold">€24.00 · Camp Nou Concessions</p>
                  <p className="text-sm text-gold">Purchase recognised ✓</p>
                  <p className="text-xs text-muted">+24 Barça Points · Pending</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
