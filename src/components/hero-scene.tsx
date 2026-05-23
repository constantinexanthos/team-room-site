"use client";

/**
 * HeroScene — two stylized white robot busts facing each other, with a
 * brief document floating between them. The visual is the product: two AI
 * minds collaborating, returning one structured artifact.
 *
 * Pure SVG + CSS animations. No 3D, no external deps. Looks intentional,
 * loads instantly, never breaks.
 */

export function HeroScene() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Two robot figures collaborating: Claude on the left, ChatGPT on the right, with a brief document between them."
      >
        <defs>
          {/* White-metal gradient — gives the robots a chrome feel */}
          <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#e4e4e7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="chrome-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#71717a" stopOpacity="0.75" />
          </linearGradient>

          {/* Soft glow filters */}
          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle ground shadow */}
          <radialGradient id="ground-shadow">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint ambient backlights — amber on left, emerald on right */}
        <ellipse cx="220" cy="280" rx="200" ry="180" fill="#fbbf24" fillOpacity="0.06" />
        <ellipse cx="580" cy="280" rx="200" ry="180" fill="#34d399" fillOpacity="0.06" />

        {/* Floor shadow under each robot */}
        <ellipse cx="230" cy="450" rx="110" ry="14" fill="url(#ground-shadow)" />
        <ellipse cx="570" cy="450" rx="110" ry="14" fill="url(#ground-shadow)" />

        {/* Particle stream — gentle dots drifting between */}
        <ParticleStream />

        {/* Left robot — Claude (amber) */}
        <g style={{ animation: "tr-robot-bob-1 4.5s ease-in-out infinite" }}>
          <RobotBust x={230} accent="amber" facing="right" />
        </g>

        {/* Right robot — ChatGPT (emerald) */}
        <g style={{ animation: "tr-robot-bob-2 5s ease-in-out infinite" }}>
          <RobotBust x={570} accent="emerald" facing="left" />
        </g>

        {/* Brief artifact floating between them */}
        <g style={{ animation: "tr-brief-float 6s ease-in-out infinite" }}>
          <BriefArtifact />
        </g>

        {/* Communication arc between heads */}
        <CommunicationArc />
      </svg>

      <style>{`
        @keyframes tr-robot-bob-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes tr-robot-bob-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes tr-brief-float {
          0%, 100% { transform: translate(0, 0) rotate(-1deg); }
          50% { transform: translate(0, -8px) rotate(1deg); }
        }
        @keyframes tr-eye-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes tr-particle-drift-1 {
          0% { transform: translateX(0); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { transform: translateX(320px); opacity: 0; }
        }
        @keyframes tr-particle-drift-2 {
          0% { transform: translateX(0); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateX(-320px); opacity: 0; }
        }
        @keyframes tr-arc-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          g[style*="animation"], circle[style*="animation"], path[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Robot bust — stylized white android, head + torso, one accent color
// ---------------------------------------------------------------------------

function RobotBust({
  x,
  accent,
  facing,
}: {
  x: number;
  accent: "amber" | "emerald";
  facing: "left" | "right";
}) {
  const color = accent === "amber" ? "#fbbf24" : "#34d399";
  const colorSoft = accent === "amber" ? "#fde68a" : "#a7f3d0";
  const filterId = accent === "amber" ? "glow-amber" : "glow-emerald";
  const tilt = facing === "right" ? 6 : -6;

  return (
    <g transform={`translate(${x}, 0) rotate(${tilt}, 0, 380)`}>
      {/* Lower torso / pedestal — fades to dark */}
      <path
        d="M -60 440 L 60 440 L 70 420 L -70 420 Z"
        fill="url(#chrome)"
        opacity="0.4"
      />

      {/* Torso */}
      <path
        d="M -55 420 L 55 420 L 62 320 L -62 320 Z"
        fill="url(#chrome)"
      />
      {/* Torso edge highlight */}
      <line x1="-62" y1="320" x2="-55" y2="420" stroke="white" strokeOpacity="0.6" strokeWidth="0.5" />
      <line x1="62" y1="320" x2="55" y2="420" stroke="black" strokeOpacity="0.3" strokeWidth="0.5" />

      {/* Chest accent — colored core */}
      <g filter={`url(#${filterId})`}>
        <circle cx="0" cy="380" r="12" fill={color} fillOpacity="0.18" />
        <circle cx="0" cy="380" r="6" fill={color} fillOpacity="0.85" />
      </g>

      {/* Shoulder caps */}
      <ellipse cx="-58" cy="318" rx="22" ry="14" fill="url(#chrome)" />
      <ellipse cx="58" cy="318" rx="22" ry="14" fill="url(#chrome)" />

      {/* Neck */}
      <rect x="-9" y="305" width="18" height="15" fill="#a1a1aa" />

      {/* Head — softly rounded square */}
      <rect
        x="-40"
        y="240"
        width="80"
        height="78"
        rx="14"
        fill="url(#chrome)"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.5"
      />
      {/* Head highlight */}
      <rect x="-40" y="240" width="80" height="20" rx="14" fill="white" fillOpacity="0.3" />

      {/* Visor — dark recess for the eyes */}
      <rect
        x="-30"
        y="262"
        width="60"
        height="22"
        rx="3"
        fill="#0a0a0a"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      {/* Visor sheen */}
      <rect x="-29" y="263" width="58" height="4" rx="2" fill="white" fillOpacity="0.08" />

      {/* Eyes — short colored light bars, pulsing */}
      <g filter={`url(#${filterId})`}>
        <rect
          x="-18"
          y="271"
          width="10"
          height="2.5"
          rx="1"
          fill={color}
          style={{ animation: "tr-eye-pulse 2.4s ease-in-out infinite" }}
        />
        <rect
          x="8"
          y="271"
          width="10"
          height="2.5"
          rx="1"
          fill={color}
          style={{ animation: "tr-eye-pulse 2.4s ease-in-out infinite", animationDelay: "0.3s" }}
        />
      </g>

      {/* Forehead detail — small line */}
      <line x1="-12" y1="252" x2="12" y2="252" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />

      {/* Chin detail */}
      <line x1="-20" y1="305" x2="20" y2="305" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />

      {/* Identifier text below the bust */}
      <text
        y="475"
        textAnchor="middle"
        fontSize="9"
        fill="rgba(255,255,255,0.55)"
        fontFamily="var(--font-mono)"
        letterSpacing="2.5"
      >
        {accent === "amber" ? "CLAUDE" : "CHATGPT"}
      </text>
      <text
        y="490"
        textAnchor="middle"
        fontSize="9"
        fill={colorSoft}
        fillOpacity="0.6"
        fontFamily="var(--font-mono)"
      >
        {accent === "amber" ? "opus 4.7" : "gpt-5.5"}
      </text>
    </g>
  );
}

// ---------------------------------------------------------------------------
// Brief artifact — small floating document between the robots
// ---------------------------------------------------------------------------

function BriefArtifact() {
  return (
    <g transform="translate(400, 330)">
      {/* Soft glow */}
      <circle cx="0" cy="0" r="40" fill="white" fillOpacity="0.04" />

      {/* Document */}
      <rect x="-26" y="-34" width="52" height="64" rx="3" fill="url(#chrome)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      {/* Corner fold */}
      <path d="M 18 -34 L 26 -34 L 26 -26 Z" fill="#a1a1aa" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      {/* "Text" lines */}
      <line x1="-18" y1="-20" x2="14" y2="-20" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <line x1="-18" y1="-12" x2="18" y2="-12" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <line x1="-18" y1="-4" x2="10" y2="-4" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <line x1="-18" y1="4" x2="16" y2="4" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      {/* The two-mind seal at bottom */}
      <circle cx="-4" cy="18" r="3" fill="#fbbf24" />
      <circle cx="4" cy="18" r="3" fill="#34d399" />
      {/* Label */}
      <text
        y="44"
        textAnchor="middle"
        fontSize="8"
        fill="rgba(255,255,255,0.6)"
        fontFamily="var(--font-mono)"
        letterSpacing="2"
      >
        JOINT READ
      </text>
    </g>
  );
}

// ---------------------------------------------------------------------------
// Communication arc — soft dashed curve between the two heads
// ---------------------------------------------------------------------------

function CommunicationArc() {
  return (
    <g style={{ animation: "tr-arc-pulse 3.5s ease-in-out infinite" }}>
      <path
        d="M 270 270 Q 400 200 530 270"
        fill="none"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Particle stream — small dots drifting between the robots
// ---------------------------------------------------------------------------

function ParticleStream() {
  // Generate a few dots at different vertical offsets and animation phases.
  const particles = [
    { y: 290, delay: 0, dir: 1, color: "#fbbf24" },
    { y: 310, delay: 1.3, dir: -1, color: "#34d399" },
    { y: 350, delay: 2.6, dir: 1, color: "#fbbf24" },
    { y: 370, delay: 0.7, dir: -1, color: "#34d399" },
    { y: 330, delay: 1.9, dir: 1, color: "#ffffff" },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.dir === 1 ? 270 : 530}
          cy={p.y}
          r="1.5"
          fill={p.color}
          fillOpacity="0.6"
          style={{
            animation: `tr-particle-drift-${p.dir === 1 ? 1 : 2} 4s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
