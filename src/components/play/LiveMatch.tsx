"use client";

import { DemoControls } from "@/components/DemoControls";
import { PlayerAvatar } from "@/components/PlayerCard";
import { Card, Eyebrow, StatusPill } from "@/components/ui";
import { useFan } from "@/lib/fan-store";
import {
  getPlayer,
  HALFTIME_NOMINEES,
  PULSE_REACTIONS,
} from "@/lib/mock-data";
import type { LiveReactionId } from "@/lib/types";
import { cn, formatMatchClock } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LiveMatch() {
  const { state, simulateGoal, setLiveReaction, setHalftimeVote } = useFan();
  const [clock, setClock] = useState(34 * 60 + 21);

  useEffect(() => {
    const timer = window.setInterval(() => setClock((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scoreHome = state.goalSimulated ? 2 : 1;

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden p-0">
        <div className="relative bg-gradient-to-br from-[#07152c] via-navy-card to-[#3a0a22] px-5 py-6 md:px-8">
          <div className="flex items-start justify-between gap-3">
            <StatusPill tone="live">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
              Live
            </StatusPill>
            <DemoControls
              label="Simulate Barça goal"
              onClick={simulateGoal}
              disabled={state.goalSimulated}
            />
          </div>
          <p className="mt-6 text-center font-display text-[2.4rem] font-semibold tracking-tight text-white md:text-5xl">
            BARÇA {scoreHome} – 0 ATLÉTICO
          </p>
          <p className="mt-2 text-center font-mono text-lg text-gold">{formatMatchClock(clock)}</p>
          <p className="mt-3 text-center text-sm text-muted">
            First half · Spotify Camp Nou · Pressure high on the right
          </p>
        </div>
      </Card>

      <AnimatePresence>
        {state.goalSimulated && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Eyebrow>Culer Pulse</Eyebrow>
                  <h3 className="mt-2 font-display text-2xl font-semibold">⚽ GOAL — BARÇA</h3>
                  <p className="mt-1 text-sm text-muted">How are you feeling?</p>
                </div>
                {state.liveReaction && <StatusPill tone="success">Reaction in</StatusPill>}
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {PULSE_REACTIONS.map((reaction) => (
                  <button
                    key={reaction.id}
                    type="button"
                    disabled={Boolean(state.liveReaction)}
                    onClick={() => setLiveReaction(reaction.id)}
                    className={cn(
                      "rounded-2xl border px-3 py-4 text-center transition",
                      state.liveReaction === reaction.id
                        ? "border-gold bg-gold/15"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25",
                      state.liveReaction && state.liveReaction !== reaction.id && "opacity-40",
                    )}
                  >
                    <span className="text-2xl">{reaction.emoji}</span>
                    <p className="mt-2 text-sm font-semibold">{reaction.label}</p>
                  </button>
                ))}
              </div>

              {state.liveReaction && <PulseResults selected={state.liveReaction} />}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <Eyebrow>Halftime Pulse</Eyebrow>
        <h3 className="mt-2 font-display text-2xl font-semibold">Who has impressed you most so far?</h3>
        <p className="mt-1 text-sm text-muted">One tap. No comments. The match stays the main event.</p>
        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          {HALFTIME_NOMINEES.map((id) => {
            const player = getPlayer(id);
            if (!player) return null;
            const selected = state.halftimeVote === id;
            return (
              <button
                key={id}
                type="button"
                disabled={Boolean(state.halftimeVote)}
                onClick={() => setHalftimeVote(id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border px-3 py-4",
                  selected ? "border-gold bg-gold/10" : "border-white/8 bg-white/[0.03]",
                  state.halftimeVote && !selected && "opacity-40",
                )}
              >
                <PlayerAvatar player={player} selected={selected} />
                <span className="text-sm font-semibold">{player.name}</span>
              </button>
            );
          })}
        </div>
        {state.halftimeVote && (
          <p className="mt-4 text-sm font-semibold text-emerald-300">Vote recorded ✓</p>
        )}
      </Card>
    </div>
  );
}

function PulseResults({ selected }: { selected: LiveReactionId }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-6 space-y-4 border-t border-white/8 pt-5"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Global Culers</p>
        <div className="mt-3 space-y-2">
          {PULSE_REACTIONS.map((reaction) => (
            <div key={reaction.id} className="flex items-center gap-3">
              <span className="w-16 text-sm">{reaction.emoji}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${reaction.global}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("h-full rounded-full", selected === reaction.id ? "bg-gold" : "bg-navy-mid")}
                />
              </div>
              <span className="w-10 text-right text-sm font-semibold">{reaction.global}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">United Kingdom</p>
        <p className="mt-1 text-lg font-semibold">🔥 74%</p>
      </div>
    </motion.div>
  );
}
