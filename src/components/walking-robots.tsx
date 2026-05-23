"use client";

/**
 * WalkingRobots — the hero scene. Two pixel robots enter from opposite
 * sides of a contained area, meet in the middle, exchange chunky retro
 * speech bubbles, then walk back out and loop. Pure React state +
 * Tailwind transitions; no external animation libs.
 *
 * Beats per cycle (~13s):
 *   0.0s  intro       robots offscreen, then walk in (2.4s CSS transition)
 *   2.8s  claude-1    claude bubble: "I think (c) deep integrations."
 *   5.3s  chatgpt-1   chatgpt bubble: "Yes. The kind that observes outcomes."
 *   7.8s  claude-2    claude bubble: "Right, the data exhaust compounds."
 *   10.3s outro       robots walk back to edges and loop
 */

import { useEffect, useState } from "react";
import { PixelRobot } from "@/components/pixel-robot";

type Beat = "intro" | "claude-1" | "chatgpt-1" | "claude-2" | "outro";

const SCHEDULE: { beat: Beat; ms: number }[] = [
  { beat: "intro", ms: 0 },
  { beat: "claude-1", ms: 2800 },
  { beat: "chatgpt-1", ms: 5300 },
  { beat: "claude-2", ms: 7800 },
  { beat: "outro", ms: 10300 },
];
const CYCLE_MS = 13500;

const TALKING_BEATS: Beat[] = ["claude-1", "chatgpt-1", "claude-2"];

export function WalkingRobots() {
  const [beat, setBeat] = useState<Beat>("intro");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers = SCHEDULE.map(({ beat, ms }) =>
      setTimeout(() => setBeat(beat), ms),
    );
    const loopTimer = setTimeout(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, [cycle]);

  const inMiddle = TALKING_BEATS.includes(beat);

  // Position math: edges are -10% (offscreen), middle is 32% from each side.
  const claudeLeft = beat === "intro" ? "-10%" : inMiddle ? "32%" : "-10%";
  const chatgptRight = beat === "intro" ? "-10%" : inMiddle ? "32%" : "-10%";

  return (
    <div className="relative w-full overflow-hidden border-2 border-zinc-900 bg-zinc-50">
      {/* Subtle dotted-grid floor pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #d4d4d8 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative h-52 sm:h-56">
        {/* Ground line — pixel-style dashed */}
        <div className="absolute bottom-7 left-0 right-0 h-0.5 bg-zinc-900" />

        {/* Claude */}
        <div
          className="absolute bottom-8 text-zinc-950 transition-[left] duration-[2400ms] ease-linear"
          style={{ left: claudeLeft }}
        >
          <PixelRobot size={64} agent="claude" animated />
        </div>

        {/* ChatGPT */}
        <div
          className="absolute bottom-8 text-zinc-950 transition-[right] duration-[2400ms] ease-linear"
          style={{ right: chatgptRight }}
        >
          <PixelRobot size={64} agent="chatgpt" animated />
        </div>

        {/* Speech bubbles — appear above the speaking robot */}
        <Bubble visible={beat === "claude-1"} side="left" agent="claude">
          I think (c) deep integrations.
        </Bubble>
        <Bubble visible={beat === "chatgpt-1"} side="right" agent="chatgpt">
          Yes. Specifically the kind that observes outcomes.
        </Bubble>
        <Bubble visible={beat === "claude-2"} side="left" agent="claude">
          Right. The data exhaust compounds.
        </Bubble>
      </div>

      <style>{`
        @keyframes tr-bubble-pop {
          0% { transform: scale(0.6) translateY(4px); opacity: 0; }
          60% { transform: scale(1.04) translateY(0); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Bubble({
  children,
  side,
  agent,
  visible,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  agent: "claude" | "chatgpt";
  visible: boolean;
}) {
  if (!visible) return null;
  const bg = agent === "claude" ? "bg-amber-100" : "bg-emerald-100";
  const tailColor = agent === "claude" ? "#fef3c7" : "#d1fae5";
  // Positioning: claude in middle is at 32% from left, so claude bubble at
  // roughly 18% from left. Chatgpt mirror.
  const positionStyle =
    side === "left"
      ? { left: "10%", maxWidth: "44%" }
      : { right: "10%", maxWidth: "44%" };

  return (
    <div
      className={`absolute top-4 ${bg} border-2 border-zinc-900 px-3 py-2`}
      style={{
        ...positionStyle,
        animation: "tr-bubble-pop 240ms cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <div className="text-[12px] font-medium leading-snug text-zinc-900 sm:text-sm">
        {children}
      </div>
      {/* Pixel-style tail pointing down to the robot */}
      <div
        aria-hidden
        className="absolute -bottom-2 size-4 border-b-2 border-r-2 border-zinc-900"
        style={{
          backgroundColor: tailColor,
          transform: "rotate(45deg)",
          [side === "left" ? "left" : "right"]: "1.25rem",
        }}
      />
    </div>
  );
}
