"use client";

import { useFan } from "@/lib/fan-store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Check } from "lucide-react";

export function ToastViewport() {
  const { state, dismissToast } = useFan();

  useEffect(() => {
    if (!state.toast) return;
    const timer = window.setTimeout(dismissToast, 3200);
    return () => window.clearTimeout(timer);
  }, [state.toast, dismissToast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[70] flex justify-center px-4 lg:top-6">
      <AnimatePresence>
        {state.toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-auto flex min-w-[260px] items-start gap-3 rounded-2xl border border-gold/30 bg-navy-card/95 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
          >
            <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <div>
              <p className="text-sm font-semibold">{state.toast.title} ✓</p>
              {state.toast.body && <p className="text-xs text-muted">{state.toast.body}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
