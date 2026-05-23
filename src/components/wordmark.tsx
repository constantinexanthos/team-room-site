import { cn } from "@/lib/utils";

/**
 * Team Room wordmark. A small geometric mark — a rounded square (the "room")
 * with two short horizontal lines inside it (the "two minds talking") — sits
 * next to "Team Room" in a tight semibold treatment. Replaces the
 * two-overlapping-circles version that read as a Venn diagram.
 *
 * The mark scales with the wordmark via the size prop; default 14px.
 */
export function Wordmark({
  className,
  size = 14,
  tone = "light",
}: {
  className?: string;
  size?: number;
  tone?: "light" | "dark";
}) {
  const fg = tone === "light" ? "#18181b" : "#e8e6e3";
  const amber = "#d97706";
  const emerald = "#059669";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size + 4}
        height={size + 4}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        {/* The room (rounded square) */}
        <rect
          x="1.5"
          y="2.5"
          width="17"
          height="15"
          rx="3"
          stroke={fg}
          strokeWidth="1.4"
          fill="none"
        />
        {/* Two minds talking (offset horizontal lines, colored) */}
        <line x1="5" y1="8.5" x2="11" y2="8.5" stroke={amber} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="12" x2="15" y2="12" stroke={emerald} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span
        className="font-semibold tracking-tight"
        style={{
          color: fg,
          fontSize: size + 2,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        Team Room
      </span>
    </span>
  );
}
