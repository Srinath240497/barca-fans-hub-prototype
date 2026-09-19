"use client";

import { PlayerCard } from "@/components/PlayerCard";
import { Card, Eyebrow, PrimaryButton, StatusPill } from "@/components/ui";
import { track } from "@/lib/analytics";
import { useFan } from "@/lib/fan-store";
import { DRILL_OPTIONS, getPlayer } from "@/lib/mock-data";
import {
  OFFICIAL_MIDFIELD_OPTIONS,
  OFFICIAL_VOTE_RESULTS,
  officialBarcaContentService,
} from "@/lib/official-content";
import type { BarcaOfficialContent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useId, useState } from "react";

export function OfficialBarcaContentSection() {
  const items = officialBarcaContentService.listLatest(3);

  useEffect(() => {
    officialBarcaContentService.listLatest(3).forEach((item) => {
      track("official_content_impression", {
        contentId: item.id,
        contentCategory: item.category,
        engagementType: item.cta.type,
      });
    });
  }, []);

  return (
    <section aria-labelledby="latest-from-barca">
      <div className="mb-3">
        <Eyebrow>Latest from Barça</Eyebrow>
        <p id="latest-from-barca" className="mt-1 text-sm text-muted">
          Official Barça updates turned into ways to participate.
        </p>
      </div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {items.map((item) => (
          <OfficialContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function OfficialContentCard({ item }: { item: BarcaOfficialContent }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const handleCta = () => {
    track("official_content_engagement_clicked", {
      contentId: item.id,
      contentCategory: item.category,
      engagementType: item.cta.type,
    });
    if (item.cta.type === "vote" || item.cta.type === "quiz") {
      setOpen(true);
      if (item.cta.type === "quiz") {
        track("content_quiz_started", {
          contentId: item.id,
          contentCategory: item.category,
          engagementType: "quiz",
        });
      }
    }
  };

  return (
    <article className="flex min-w-[85%] shrink-0 snap-start flex-col md:min-w-0 md:shrink">
      <Card className="flex h-full flex-col transition hover:border-gold/25">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Official FC Barcelona
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
              {item.category} · {item.publishedAt}
            </p>
          </div>
          <StatusPill tone="muted">Official</StatusPill>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{item.headline}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
        <div className="mt-auto pt-5">
          <ContentEngagementAction item={item} expanded={open} onToggle={handleCta} panelId={panelId} />
        </div>
      </Card>
    </article>
  );
}

function ContentEngagementAction({
  item,
  expanded,
  onToggle,
  panelId,
}: {
  item: BarcaOfficialContent;
  expanded: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const { state, openPlay } = useFan();

  if (item.cta.type === "predict") {
    return (
      <PrimaryButton
        aria-label="Predict — open Match Plan"
        onClick={() => {
          onToggle();
          openPlay(item.cta.target ?? "prematch");
        }}
      >
        {item.cta.label}
      </PrimaryButton>
    );
  }

  const completed =
    (item.cta.type === "vote" && Boolean(state.officialMidfieldVote)) ||
    (item.cta.type === "quiz" && state.officialQuizCompleted);

  return (
    <div>
      <PrimaryButton
        aria-expanded={expanded || completed}
        aria-controls={panelId}
        aria-label={`${item.cta.label} — ${item.headline}`}
        onClick={onToggle}
      >
        {completed ? (item.cta.type === "vote" ? "Vote recorded" : "Quiz complete") : item.cta.label}
      </PrimaryButton>
      {(expanded || completed) && item.cta.type === "vote" && (
        <div id={panelId} className="mt-4">
          <OfficialVotePanel playerIds={item.votePlayerIds ?? [...OFFICIAL_MIDFIELD_OPTIONS]} />
        </div>
      )}
      {(expanded || completed) && item.cta.type === "quiz" && (
        <div id={panelId} className="mt-4">
          <OfficialQuizPanel contentId={item.id} category={item.category} />
        </div>
      )}
    </div>
  );
}

function OfficialVotePanel({ playerIds }: { playerIds: string[] }) {
  const { state, castOfficialMidfieldVote } = useFan();
  const [choice, setChoice] = useState<string | null>(state.officialMidfieldVote);

  return (
    <div>
      <p className="text-sm font-semibold">Who should start in midfield?</p>
      <div className="mt-3 grid gap-2">
        {playerIds.map((id) => {
          const player = getPlayer(id);
          if (!player) return null;
          const selected = (choice ?? state.officialMidfieldVote) === id;
          return (
            <PlayerCard
              key={id}
              player={player}
              compact
              selected={selected}
              disabled={Boolean(state.officialMidfieldVote)}
              onSelect={() => {
                if (state.officialMidfieldVote) return;
                setChoice(id);
              }}
              subtitle="MID"
            />
          );
        })}
      </div>
      {!state.officialMidfieldVote && (
        <PrimaryButton
          className="mt-3"
          disabled={!choice}
          onClick={() => {
            if (!choice) return;
            castOfficialMidfieldVote(choice);
            track("community_poll_submitted", {
              contentId: "squad-weekend",
              contentCategory: "First Team",
              engagementType: "vote",
            });
          }}
        >
          Submit vote
        </PrimaryButton>
      )}
      {state.officialMidfieldVote && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-emerald-300">Your vote is in. ✓</p>
          {playerIds.map((id) => {
            const player = getPlayer(id);
            const pct = OFFICIAL_VOTE_RESULTS[id] ?? 0;
            return (
              <div key={id} className="flex items-center gap-3 text-sm">
                <span className="w-20 truncate text-muted">{player?.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      state.officialMidfieldVote === id ? "bg-gold" : "bg-navy-mid",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-muted">{pct}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function OfficialQuizPanel({ contentId, category }: { contentId: string; category: string }) {
  const { state, completeOfficialQuiz } = useFan();
  const [choice, setChoice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(state.officialQuizCompleted);
  const selected = DRILL_OPTIONS.find((option) => option.id === choice);
  const correct = selected?.correct ?? false;

  return (
    <div>
      <p className="text-sm font-semibold">Which of these players came through La Masia?</p>
      <div className="mt-3 grid gap-2">
        {DRILL_OPTIONS.map((option) => {
          const player = getPlayer(option.id);
          if (!player) return null;
          const isSelected =
            choice === option.id || (state.officialQuizCompleted && option.correct);
          return (
            <PlayerCard
              key={option.id}
              player={player}
              compact
              selected={isSelected}
              disabled={revealed || state.officialQuizCompleted}
              onSelect={() => {
                if (revealed || state.officialQuizCompleted) return;
                setChoice(option.id);
              }}
              subtitle={player.group}
            />
          );
        })}
      </div>
      {!revealed && !state.officialQuizCompleted && (
        <PrimaryButton
          className="mt-3"
          disabled={!choice}
          onClick={() => {
            setRevealed(true);
            if (selected?.correct) {
              completeOfficialQuiz();
              track("content_quiz_completed", {
                contentId,
                contentCategory: category,
                engagementType: "quiz",
              });
            }
          }}
        >
          Confirm answer
        </PrimaryButton>
      )}
      {revealed && correct && (
        <p className="mt-3 text-sm font-semibold text-gold">Perfect! +15 XP</p>
      )}
      {revealed && !correct && !state.officialQuizCompleted && (
        <div className="mt-3">
          <p className="text-sm text-muted">Cubarsí came through La Masia. Try again.</p>
          <button
            type="button"
            className="mt-1 text-sm font-semibold text-gold"
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
  );
}
