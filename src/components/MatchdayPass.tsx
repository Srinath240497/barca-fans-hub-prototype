"use client";

export function MatchdayPass() {
  const cells = buildQr(21, 17);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-gold/25 bg-gradient-to-b from-navy-elevated to-navy p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      <div className="passport-sheen pointer-events-none absolute inset-0" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Matchday Fan ID
          </p>
          <p className="mt-2 font-display text-2xl font-semibold">Marc V.</p>
          <p className="text-sm text-muted">Spotify Camp Nou · Gate verified</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
          Active
        </span>
      </div>
      <div className="mx-auto mt-5 w-fit rounded-2xl bg-white p-3">
        <svg viewBox="0 0 21 21" className="h-40 w-40" role="img" aria-label="Matchday entry code">
          {cells.flatMap((row, y) =>
            row.map((on, x) =>
              on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#001E42" /> : null,
            ),
          )}
        </svg>
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        Present at participating Barça locations.
      </p>
    </div>
  );
}

function buildQr(size: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const cells = Array.from({ length: size }, () => Array.from({ length: size }, () => false));

  const finder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        cells[oy + y][ox + x] = edge || core;
      }
    }
  };

  finder(0, 0);
  finder(size - 7, 0);
  finder(0, size - 7);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const inFinder =
        (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);
      if (!inFinder) cells[y][x] = rand() > 0.55;
    }
  }
  return cells;
}
