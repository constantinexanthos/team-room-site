// Brand mark: two thin circles, half-overlapped, one amber (Claude) and one
// emerald (Codex). Set in Instrument Serif italic for the wordmark.
// Replaces the generic green-dot + monospace mark.

export function BrandMark({ size = 18 }: { size?: number }) {
  const w = size * 1.85;
  const h = size;
  const r = (size - 2) / 2;
  // Overlapping circles, offset so they create a vesica-like overlap zone.
  const cx1 = r + 1;
  const cx2 = w - r - 1;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id="overlapGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.16 70)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 150)" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <circle
        cx={cx1}
        cy={h / 2}
        r={r}
        fill="oklch(0.78 0.16 70 / 0.06)"
        stroke="oklch(0.78 0.16 70)"
        strokeWidth="1.1"
      />
      <circle
        cx={cx2}
        cy={h / 2}
        r={r}
        fill="oklch(0.78 0.16 150 / 0.06)"
        stroke="oklch(0.78 0.16 150)"
        strokeWidth="1.1"
      />
      {/* The vesica overlap, lightly emphasised */}
      <ellipse
        cx={w / 2}
        cy={h / 2}
        rx={Math.max(1.2, (cx2 - cx1 - r) / 1.6)}
        ry={r * 0.78}
        fill="url(#overlapGrad)"
        opacity="0.5"
      />
    </svg>
  );
}

// Compact wordmark variant — mark + serif wordmark. Used in header + footer.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 leading-none ${className}`}>
      <BrandMark size={20} />
      <span
        className="font-display text-[1.15rem] tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Team Room
      </span>
    </span>
  );
}
