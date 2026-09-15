"use client";

import { formatRelativeTime, formatXp } from "@/lib/utils";
import type { ActivityEntry } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";

export function ActivityFeed({
  items,
  now,
}: {
  items: ActivityEntry[];
  now?: number;
}) {
  return (
    <ul className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              {item.subtitle && <p className="text-xs text-muted">{item.subtitle}</p>}
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                {formatRelativeTime(item.at, now)}
              </p>
            </div>
            <div className="text-right text-xs font-semibold">
              {item.xpDelta ? <p className="text-gold">+{formatXp(item.xpDelta)} XP</p> : null}
              {item.pointsDelta ? (
                <p className="text-gold">
                  +{item.pointsDelta} pts
                  {item.pointsPending ? <span className="block font-medium text-muted">Pending</span> : null}
                </p>
              ) : null}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
