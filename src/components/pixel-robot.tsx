// Small pixel-art robot. 14×16 grid rendered as inline SVG rects.
// One generic mascot for the whole brand — chest carries two small lights
// (amber + emerald) hinting at the two-agent nature. Used in the header
// (tiny) and the hero (larger, animated bobbing).

const PIXELS = [
  "....XXXXXX....",
  "...X......X...",
  "..X........X..",
  "..X.XX..XX.X..",
  "..X.XX..XX.X..",
  "..X........X..",
  "..X..XXXX..X..",
  "...X......X...",
  "....XXXXXX....",
  "...XXXXXXXX...",
  "..XX.X..X.XX..",
  "..X..X..X..X..",
  "..X..X..X..X..",
  "...XXXXXXXX...",
  "...XX....XX...",
  "...XX....XX...",
];

export function PixelRobot({
  size = 32,
  className,
  animated = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const cols = PIXELS[0].length;
  const rows = PIXELS.length;
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={size}
      height={(size * rows) / cols}
      style={{
        imageRendering: "pixelated",
        shapeRendering: "crispEdges",
        animation: animated ? "tr-bot-bob 2.4s ease-in-out infinite" : undefined,
      }}
      className={className}
      aria-hidden
    >
      {/* Main body pixels */}
      {PIXELS.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "X" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
          ) : null,
        ),
      )}
      {/* Chest lights — the two-agent seal: amber dot + emerald dot */}
      <rect x="5" y="11" width="1" height="1" fill="#f59e0b" />
      <rect x="8" y="11" width="1" height="1" fill="#10b981" />

      <style>{`
        @keyframes tr-bot-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
