"use client";

import { PlayerCard } from "@/components/PlayerCard";
import { RewardStatus } from "@/components/RewardStatus";
import { Card, Eyebrow, PrimaryButton, StatusPill } from "@/components/ui";
import { useFan } from "@/lib/fan-store";
import { DRILL_OPTIONS, getPlayer } from "@/lib/mock-data";
import { useState } from "react";

export function Midweek() {
  const { state, completeDailyDrill } = useFan();
  const [started, setStarted] = useState(state.dailyDrillCompleted);
  const [choice, setChoice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(state.dailyDrillCompleted);

  const selected = DRILL_OPTIONS.find((option) => option.id === choice);
  const correct = selected?.correct ?? false;

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Eyebrow>La Masia — Daily Drill</Eyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold">Keep the habit alive between matchdays.</h3>
            <p className="mt-1 text-sm text-muted">3 questions · ~45 sec</p>
          </div>
          <StatusPill>🔥 4-day streak</StatusPill>
        </div>

        {!started && !state.dailyDrillCompleted && (
          <PrimaryButton className="mt-6" onClick={() => setStarted(true)}>
            Start Daily Drill
          </PrimaryButton>
        )}

        {(started || state.dailyDrillCompleted) && (
          <div className="mt-6">
            <p className="text-sm font-semibold">Which of these players came through La Masia?</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DRILL_OPTIONS.map((option) => {
                const player = getPlayer(option.id);
                if (!player) return null;
                const isSelected = choice === option.id || (state.dailyDrillCompleted && option.correct);
                return (
                  <PlayerCard
                    key={option.id}
                    player={player}
                    selected={isSelected}
                    disabled={revealed || state.dailyDrillCompleted}
                    onSelect={() => {
                      if (revealed || state.dailyDrillCompleted) return;
                      setChoice(option.id);
                    }}
                    subtitle={player.group}
                  />
                );
              })}
            </div>

            {!revealed && !state.dailyDrillCompleted && (
              <PrimaryButton
                className="mt-4"
                disabled={!choice}
                onClick={() => {
                  setRevealed(true);
                  if (selected?.correct) completeDailyDrill();
                }}
              >
                Confirm answer
              </PrimaryButton>
            )}

            {revealed && correct && (
              <div className="mt-4 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3">
                <p className="font-display text-xl font-semibold text-gold">Perfect!</p>
                <p className="text-sm text-ink">+25 XP · Pau Cubarsí is La Masia through and through.</p>
              </div>
            )}

            {revealed && !correct && !state.dailyDrillCompleted && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="font-semibold">Not this time.</p>
                <p className="text-sm text-muted">Cubarsí came through La Masia. Try again — streaks stay intact.</p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold text-gold"
                  onClick={() => {
                    setChoice(null);
                    setRevealed(false);
                  }}
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        )}
      </Card>

      <Card>
        <Eyebrow>Weekly Mission</Eyebrow>
        <h3 className="mt-2 font-display text-2xl font-semibold">La Masia Week</h3>
        <p className="mt-1 text-sm text-muted">
          Miss a day and the week still counts. Consistency, not punishment.
        </p>
        <div className="mt-5">
          <RewardStatus
            steps={[
              { label: "Monday drill", done: true },
              { label: "Tuesday drill", done: true },
              { label: "Wednesday drill", done: true },
              { label: "Thursday drill", done: true },
              { label: "Friday drill", done: state.laMasiaWeekProgress >= 5 },
            ]}
            completeLabel="La Masia Scholar Badge earned"
            reward="La Masia Scholar Badge"
          />
        </div>
      </Card>
    </div>
  );
}
