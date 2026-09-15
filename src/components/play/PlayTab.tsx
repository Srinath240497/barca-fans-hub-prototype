"use client";

import { SegmentedControl } from "@/components/SegmentedControl";
import type { PlaySegment } from "@/lib/types";
import { useState } from "react";
import { LiveMatch } from "./LiveMatch";
import { Midweek } from "./Midweek";
import { PreMatch } from "./PreMatch";

export function PlayTab() {
  const [segment, setSegment] = useState<PlaySegment>("prematch");

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Play</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl">
          Stay in the match, even when you’re not at the ground.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Three beats. One identity. Set your plan, ride the pulse, come back midweek.
        </p>
      </header>

      <SegmentedControl
        ariaLabel="Play modes"
        value={segment}
        onChange={setSegment}
        options={[
          { id: "prematch", label: "Pre-Match" },
          { id: "live", label: "Live" },
          { id: "midweek", label: "Midweek" },
        ]}
      />

      {segment === "prematch" && <PreMatch />}
      {segment === "live" && <LiveMatch />}
      {segment === "midweek" && <Midweek />}
    </div>
  );
}
