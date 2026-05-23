"use client";

/**
 * Scene — a small animated diorama on the homepage.
 *
 * The story (loops every ~12s):
 *   1. The boss (you) phones in from above, asks a question.
 *   2. The two agent orbs (Claude amber, Codex emerald) wake up.
 *   3. They exchange — Claude frames, Codex reshapes, Claude lands.
 *   4. A brief crystallizes between them.
 *   5. The brief floats up to the boss. Boss receives, leaves.
 *   6. Stage resets, loop.
 *
 * The whole thing is one SVG. Framer Motion sequences the beats.
 * Geometric primitives — a robot for the boss, two energy orbs for
 * the agents. Mechanical motion, no cartoon. Color = identity:
 * boss neutral, claude amber, codex emerald.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Each "beat" of the scene. Sequencer below advances through them.
type Beat =
  | "intro"        // empty stage
  | "boss-enter"   // boss descends
  | "boss-ask"     // boss bubble appears
  | "boss-recede" // boss steps back, agents wake
  | "claude-1"    // claude says "frame"
  | "codex-1"     // codex reshapes
  | "claude-2"    // claude converges
  | "brief"       // brief artifact crystallizes
  | "deliver"     // brief floats up to boss
  | "boss-leave"  // boss exits with brief
  | "reset";

// Real content for the bubbles — pulled from the AB dialogue we dog-fooded.
const QUESTION = "What's the moat?";
const CLAUDE_FRAME = "Deep integrations.";
const CODEX_RESHAPE = "Specifically — the kind that observes outcomes.";
const CLAUDE_CONVERGE = "Right. The data exhaust compounds.";
const BRIEF_LABEL = "JOINT_READ";

// Beat schedule — every entry is [beat, ms-after-start].
const SCHEDULE: [Beat, number][] = [
  ["intro", 0],
  ["boss-enter", 600],
  ["boss-ask", 1500],
  ["boss-recede", 3000],
  ["claude-1", 3400],
  ["codex-1", 5000],
  ["claude-2", 6600],
  ["brief", 7800],
  ["deliver", 9000],
  ["boss-leave", 10200],
  ["reset", 11600],
];
const LOOP_GAP_MS = 1200;

export function Scene() {
  const [beat, setBeat] = useState<Beat>("intro");
  const [cycle, setCycle] = useState(0);

  // Run the schedule for each cycle.
  useEffect(() => {
    const timers = SCHEDULE.map(([b, ms]) => setTimeout(() => setBeat(b), ms));
    const loopTimer = setTimeout(
      () => setCycle((c) => c + 1),
      SCHEDULE[SCHEDULE.length - 1][1] + LOOP_GAP_MS,
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, [cycle]);

  // Visibility helpers per beat. Lots of conditional rendering, kept inline.
  const showBoss = beat !== "intro" && beat !== "reset";
  const bossAtTop = beat === "boss-enter" || beat === "boss-ask";
  const bossRetreated = ["boss-recede", "claude-1", "codex-1", "claude-2", "brief"].includes(beat);
  const bossReturning = beat === "deliver" || beat === "boss-leave";
  const showBossBubble = beat === "boss-ask";
  const showClaudeBubble1 = ["claude-1", "codex-1", "claude-2", "brief", "deliver", "boss-leave"].includes(beat);
  const showCodexBubble = ["codex-1", "claude-2", "brief", "deliver", "boss-leave"].includes(beat);
  const showClaudeBubble2 = ["claude-2", "brief", "deliver", "boss-leave"].includes(beat);
  const agentsAwake = !["intro", "boss-enter", "boss-ask", "reset"].includes(beat);
  const showBrief = ["brief", "deliver", "boss-leave"].includes(beat);
  const briefDelivered = beat === "deliver" || beat === "boss-leave";
  const showBossThanks = beat === "boss-leave";

  // Boss y-position by beat: above stage (entering), at stage top (asking),
  // retreated up out of frame (while agents work), back at top (receiving),
  // gone (leaving).
  const bossY = (() => {
    if (beat === "intro") return -100;
    if (bossAtTop) return 90;
    if (bossRetreated) return -100;
    if (bossReturning) return 90;
    return -100;
  })();
  const bossOpacity = beat === "boss-leave" ? 0 : showBoss ? 1 : 0;

  return (
    <svg
      viewBox="0 0 900 600"
      className="w-full max-w-3xl mx-auto"
      style={{ display: "block" }}
      aria-label="An animated scene: a boss asks a question, two AI agents deliberate, and return a brief."
    >
      <defs>
        {/* Soft glow filters for the agent orbs */}
        <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle grid pattern for the stage floor */}
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(232,230,227,0.04)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Stage backdrop */}
      <rect x="40" y="150" width="820" height="380" rx="16" fill="url(#grid)" stroke="rgba(232,230,227,0.08)" strokeWidth="1" />

      {/* Stage label */}
      <g transform="translate(60, 175)">
        <text fontSize="10" fill="rgba(232,230,227,0.4)" fontFamily="var(--font-mono)" letterSpacing="2.5">
          TEAM ROOM
        </text>
        <line x1="0" y1="6" x2="22" y2="6" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="26" y1="6" x2="48" y2="6" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1" />
      </g>

      {/* Wire dangling from top (boss arrives on this) */}
      <line
        x1="450"
        y1="0"
        x2="450"
        y2={Math.max(0, bossY - 30)}
        stroke="rgba(232,230,227,0.15)"
        strokeWidth="0.8"
        strokeDasharray="2 4"
      />

      {/* BOSS */}
      <motion.g
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: bossY, opacity: bossOpacity }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        transform="translate(450, 0)"
      >
        <BossCharacter showStatus={beat === "boss-ask" || beat === "boss-leave"} />
      </motion.g>

      {/* Boss bubble (the question) */}
      <AnimatePresence>
        {showBossBubble && (
          <motion.g
            initial={{ opacity: 0, scale: 0.85, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 110 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            transform="translate(530, 0)"
          >
            <SpeechBubble text={QUESTION} tone="boss" tailDirection="left" maxWidth={180} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Boss "thanks" bubble on return */}
      <AnimatePresence>
        {showBossThanks && (
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            transform="translate(540, 100)"
          >
            <SpeechBubble text="✓ got it." tone="boss" tailDirection="left" maxWidth={120} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* CLAUDE (left orb) */}
      <motion.g
        transform="translate(260, 360)"
        animate={{
          scale: agentsAwake ? 1 : 0.7,
          opacity: agentsAwake ? 1 : 0.35,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AgentOrb color="amber" active={beat === "claude-1" || beat === "claude-2"} />
        <text
          y="55"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(232,230,227,0.45)"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          CLAUDE
        </text>
        <text
          y="68"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(232,230,227,0.3)"
          fontFamily="var(--font-mono)"
        >
          opus 4.7
        </text>
      </motion.g>

      {/* CODEX (right orb) */}
      <motion.g
        transform="translate(640, 360)"
        animate={{
          scale: agentsAwake ? 1 : 0.7,
          opacity: agentsAwake ? 1 : 0.35,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AgentOrb color="emerald" active={beat === "codex-1"} />
        <text
          y="55"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(232,230,227,0.45)"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          CODEX
        </text>
        <text
          y="68"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(232,230,227,0.3)"
          fontFamily="var(--font-mono)"
        >
          gpt-5.5
        </text>
      </motion.g>

      {/* Exchange lines (drawn between agents when speaking) */}
      <AnimatePresence>
        {(beat === "codex-1" || beat === "claude-2" || beat === "brief") && (
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            x1="295"
            y1="360"
            x2="605"
            y2="360"
            stroke="rgba(232,230,227,0.4)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
        )}
      </AnimatePresence>

      {/* Claude's first bubble (frame) */}
      <AnimatePresence>
        {showClaudeBubble1 && (
          <motion.g
            initial={{ opacity: 0, y: 280 }}
            animate={{ opacity: 1, y: 270 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            transform="translate(170, 0)"
          >
            <SpeechBubble text={CLAUDE_FRAME} tone="claude" tailDirection="right" maxWidth={170} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Codex bubble (reshape) */}
      <AnimatePresence>
        {showCodexBubble && (
          <motion.g
            initial={{ opacity: 0, y: 280 }}
            animate={{ opacity: 1, y: 270 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            transform="translate(550, 0)"
          >
            <SpeechBubble text={CODEX_RESHAPE} tone="codex" tailDirection="left" maxWidth={220} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Claude second bubble (converge) — appears above claude's first */}
      <AnimatePresence>
        {showClaudeBubble2 && (
          <motion.g
            initial={{ opacity: 0, y: 220 }}
            animate={{ opacity: 1, y: 210 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            transform="translate(170, 0)"
          >
            <SpeechBubble text={CLAUDE_CONVERGE} tone="claude" tailDirection="right" maxWidth={200} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Brief artifact — crystallizes between the agents */}
      <AnimatePresence>
        {showBrief && (
          <motion.g
            initial={{ opacity: 0, scale: 0.4, y: 360 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: briefDelivered ? 130 : 440,
              x: briefDelivered ? 0 : 0,
            }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{
              duration: briefDelivered ? 1.0 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            transform="translate(450, 0)"
          >
            <BriefArtifact />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

// ----------------------------------------------------------------------------
// Characters
// ----------------------------------------------------------------------------

function BossCharacter({ showStatus }: { showStatus: boolean }) {
  return (
    <g>
      {/* Antenna */}
      <line x1="0" y1="-40" x2="0" y2="-52" stroke="#e8e6e3" strokeOpacity="0.5" strokeWidth="1" />
      <motion.circle
        cx="0"
        cy="-54"
        r="3"
        fill="#e8e6e3"
        fillOpacity="0.95"
        animate={{ opacity: showStatus ? [0.4, 1, 0.4] : 0.6 }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />

      {/* Head: dark rectangle with screen face */}
      <rect x="-22" y="-40" width="44" height="32" rx="5" fill="#0e0e0e" stroke="rgba(232,230,227,0.45)" strokeWidth="1.2" />
      <rect x="-16" y="-34" width="32" height="18" rx="2" fill="rgba(232,230,227,0.06)" />

      {/* Eyes — two short bright dashes inside the screen */}
      <motion.line
        x1="-9"
        y1="-25"
        x2="-3"
        y2="-25"
        stroke={showStatus ? "#34d399" : "#e8e6e3"}
        strokeOpacity="0.95"
        strokeWidth="1.5"
        animate={{ opacity: showStatus ? [1, 0.5, 1] : 0.85 }}
        transition={{ duration: 0.6, repeat: showStatus ? Infinity : 0 }}
      />
      <motion.line
        x1="3"
        y1="-25"
        x2="9"
        y2="-25"
        stroke={showStatus ? "#34d399" : "#e8e6e3"}
        strokeOpacity="0.95"
        strokeWidth="1.5"
        animate={{ opacity: showStatus ? [1, 0.5, 1] : 0.85 }}
        transition={{ duration: 0.6, repeat: showStatus ? Infinity : 0 }}
      />

      {/* Body */}
      <rect x="-18" y="-7" width="36" height="22" rx="3" fill="#0e0e0e" stroke="rgba(232,230,227,0.45)" strokeWidth="1.2" />
      {/* Center status light */}
      <circle cx="0" cy="4" r="2.5" fill="#e8e6e3" fillOpacity="0.5" />

      {/* Label */}
      <text y="34" textAnchor="middle" fontSize="9" fill="rgba(232,230,227,0.5)" fontFamily="var(--font-mono)" letterSpacing="2">
        YOU
      </text>
    </g>
  );
}

function AgentOrb({ color, active }: { color: "amber" | "emerald"; active: boolean }) {
  const fill = color === "amber" ? "#fbbf24" : "#34d399";
  const filterId = color === "amber" ? "glow-amber" : "glow-emerald";
  return (
    <g filter={`url(#${filterId})`}>
      {/* Outermost faint halo (always present) */}
      <circle cx="0" cy="0" r="32" fill={fill} fillOpacity="0.06" />
      {/* Pulsing halo when active */}
      <motion.circle
        cx="0"
        cy="0"
        r="26"
        fill={fill}
        fillOpacity="0.12"
        animate={{
          r: active ? [26, 32, 26] : 26,
          opacity: active ? [0.12, 0.24, 0.12] : 0.1,
        }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
      />
      {/* Outer ring */}
      <circle cx="0" cy="0" r="20" fill="none" stroke={fill} strokeOpacity="0.55" strokeWidth="1.5" />
      {/* Inner core */}
      <motion.circle
        cx="0"
        cy="0"
        r="11"
        fill={fill}
        fillOpacity="0.85"
        animate={{
          scale: active ? [1, 1.08, 1] : 1,
        }}
        transition={{ duration: 0.9, repeat: active ? Infinity : 0, ease: "easeInOut" }}
      />
      {/* Inner highlight */}
      <circle cx="-4" cy="-4" r="3.5" fill="white" fillOpacity="0.35" />
    </g>
  );
}

function BriefArtifact() {
  return (
    <g>
      {/* Document body */}
      <rect x="-26" y="-30" width="52" height="60" rx="3" fill="#0e0e0e" stroke="rgba(232,230,227,0.6)" strokeWidth="1" />
      {/* Corner fold */}
      <path d="M 18 -30 L 26 -30 L 26 -22 Z" fill="rgba(232,230,227,0.15)" stroke="rgba(232,230,227,0.5)" strokeWidth="0.8" />
      {/* "Text" lines */}
      <line x1="-18" y1="-18" x2="14" y2="-18" stroke="rgba(232,230,227,0.55)" strokeWidth="1" />
      <line x1="-18" y1="-10" x2="18" y2="-10" stroke="rgba(232,230,227,0.45)" strokeWidth="1" />
      <line x1="-18" y1="-2" x2="10" y2="-2" stroke="rgba(232,230,227,0.45)" strokeWidth="1" />
      {/* The amber-emerald seal at the bottom — the two-mind mark */}
      <circle cx="-4" cy="14" r="3" fill="#fbbf24" fillOpacity="0.85" />
      <circle cx="4" cy="14" r="3" fill="#34d399" fillOpacity="0.85" />
      {/* Label */}
      <text y="40" textAnchor="middle" fontSize="8" fill="rgba(232,230,227,0.65)" fontFamily="var(--font-mono)" letterSpacing="2">
        {BRIEF_LABEL}
      </text>
    </g>
  );
}

// ----------------------------------------------------------------------------
// Speech bubble
// ----------------------------------------------------------------------------

function SpeechBubble({
  text,
  tone,
  tailDirection,
  maxWidth = 180,
}: {
  text: string;
  tone: "boss" | "claude" | "codex";
  tailDirection: "left" | "right";
  maxWidth?: number;
}) {
  const palette = {
    boss: {
      fill: "rgba(232,230,227,0.08)",
      stroke: "rgba(232,230,227,0.45)",
      text: "#e8e6e3",
    },
    claude: {
      fill: "rgba(251,191,36,0.08)",
      stroke: "rgba(251,191,36,0.5)",
      text: "rgba(251,191,36,0.95)",
    },
    codex: {
      fill: "rgba(52,211,153,0.08)",
      stroke: "rgba(52,211,153,0.5)",
      text: "rgba(52,211,153,0.95)",
    },
  }[tone];

  // Word-wrap the text so longer bubbles stay readable.
  const lines = wrapText(text, maxWidth, 11);
  const lineHeight = 16;
  const padX = 14;
  const padY = 10;
  const longest = Math.max(...lines.map((l) => l.length));
  const width = Math.min(maxWidth, longest * 6.4 + padX * 2);
  const height = lines.length * lineHeight + padY * 2 - 4;

  // Tail direction puts the bubble on the side of the speaker.
  // x-offset depends on which side.
  const tailX = tailDirection === "left" ? 0 : width;
  const tailFromX = tailDirection === "left" ? -10 : width + 10;

  return (
    <g>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="6"
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth="1"
      />
      {/* Tail */}
      <path
        d={`M ${tailX} ${height * 0.5 - 4} L ${tailFromX} ${height * 0.5} L ${tailX} ${height * 0.5 + 4} Z`}
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth="1"
      />
      {/* Text */}
      <text
        x={padX}
        y={padY + 11}
        fontSize="11"
        fill={palette.text}
        fontFamily="var(--font-mono)"
      >
        {lines.map((l, i) => (
          <tspan key={i} x={padX} dy={i === 0 ? 0 : lineHeight}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
}

// Very small naive wrapper — splits words to fit max chars per line.
function wrapText(text: string, maxWidthPx: number, fontSizePx: number): string[] {
  const charsPerLine = Math.floor((maxWidthPx - 28) / (fontSizePx * 0.58));
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length <= charsPerLine) {
      current = (current + " " + w).trim();
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}
