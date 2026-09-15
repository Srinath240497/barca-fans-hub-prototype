"use client";

import { FanProvider } from "@/lib/fan-store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FanProvider>{children}</FanProvider>;
}
