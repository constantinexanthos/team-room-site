"use client";

/**
 * InteractiveRoom — the centerpiece of the homepage.
 *
 * Two Spline robots side by side (Claude · ChatGPT). A text input lets the
 * visitor "ask the room." On submit, a staged sequence plays:
 *
 *   1. Robots wake up — gentle scale-pulse + glowing aura
 *   2. A "deliberating" indicator runs between them (~3s)
 *   3. A brief slides in from below with the captured joint read,
 *      framed as a sample (the demo is staged — real deliberation runs
 *      when you install the plugin)
 *
 * The interaction is honest: we don't pretend to actually call the models.
 * We show what a real session looks like, prompted by their input. The
 * "see how a real session unfolded" frame is explicit.
 */

import { useState, useRef, useEffect } from "react";
import { SplineScene } from "@/components/ui/splite";
import { TEAM_ROOM_DIALOGUE } from "@/data/dialogues";
import { ArrowRight, RotateCcw } from "lucide-react";

const SCENE_URL = "https://prod.spline.design/S4gW39AbsPAyGe3H/scene.splinecode";

type Phase = "idle" | "thinking" | "responding";

const SUGGESTED = [
  "What's the most defensible moat for an AI tools company?",
  "Should we ship the auth refactor as one PR or split it?",
  "Postgres or DynamoDB for a side project?",
];

export function InteractiveRoom() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const briefRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = question.trim() || SUGGESTED[0];
    setAskedQuestion(q);
    setQuestion("");
    setPhase("thinking");
    setTimeout(() => {
      setPhase("responding");
    }, 3200);
  };

  const reset = () => {
    setPhase("idle");
    setAskedQuestion("");
    setQuestion("");
  };

  useEffect(() => {
    if (phase === "responding" && briefRef.current) {
      briefRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [phase]);

  return (
    <div className="relative w-full">
      {/* Two robot windows — claude left, chatgpt right */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RobotPanel
          label="claude"
          model="opus 4.7"
          color="amber"
          active={phase === "thinking" || phase === "responding"}
        />
        <RobotPanel
          label="chatgpt"
          model="gpt-5.5"
          color="emerald"
          active={phase === "thinking" || phase === "responding"}
        />
      </div>

      {/* Inter-robot deliberation indicator (only visible during thinking) */}
      {phase === "thinking" && <DeliberatingIndicator />}

      {/* The asked question (shown while thinking and after) */}
      {askedQuestion && (
        <div className="mt-8 text-center">
          <div className="text-[10px] tracking-[0.3em] text-white/35">
            YOU ASKED
          </div>
          <p className="mt-2 mx-auto max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            “{askedQuestion}”
          </p>
        </div>
      )}

      {/* Input form OR brief response */}
      <div className="mt-10">
        {phase === "idle" && (
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
            <label className="mb-3 block text-[10px] tracking-[0.3em] text-white/45 text-center">
              ASK THE ROOM
            </label>
            <div className="flex items-stretch gap-0 rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur transition-all focus-within:border-white/30 focus-within:bg-white/[0.06]">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What should we deliberate on?"
                className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none sm:text-base"
              />
              <button
                type="submit"
                className="m-1.5 inline-flex items-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white/90"
              >
                Ask
                <ArrowRight className="size-4" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTED.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuestion(s);
                  }}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55 transition-colors hover:border-white/25 hover:text-white/85"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        )}

        {phase === "responding" && (
          <div ref={briefRef} className="mx-auto max-w-3xl">
            <BriefReveal
              jointRead={TEAM_ROOM_DIALOGUE.joint_read}
              onReset={reset}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Robot panel — Spline scene with a labeled overlay
// ────────────────────────────────────────────────────────────────────────────

function RobotPanel({
  label,
  model,
  color,
  active,
}: {
  label: string;
  model: string;
  color: "amber" | "emerald";
  active: boolean;
}) {
  const dotClass = color === "amber" ? "bg-amber-300" : "bg-emerald-300";
  const auraClass =
    color === "amber"
      ? "shadow-[inset_0_0_120px_rgba(251,191,36,0.18)]"
      : "shadow-[inset_0_0_120px_rgba(52,211,153,0.18)]";

  return (
    <div
      className={
        "relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur transition-all duration-700 sm:h-80 " +
        (active ? auraClass : "")
      }
    >
      <SplineScene scene={SCENE_URL} className="h-full w-full" />

      {/* Labels overlay */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-white/65">
        <span
          className={
            "inline-block size-1.5 rounded-full " +
            dotClass +
            (active ? " animate-pulse shadow-[0_0_8px]" : "") +
            (color === "amber" ? " shadow-amber-300/70" : " shadow-emerald-300/70")
          }
        />
        <span>{label.toUpperCase()}</span>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] tracking-[0.18em] text-white/40">
        {model}
      </div>

      {/* Active state — subtle scanline at bottom while thinking */}
      {active && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div
            className={
              "h-full w-1/3 " +
              (color === "amber" ? "bg-amber-300" : "bg-emerald-300")
            }
            style={{ animation: "tr-scan 1.8s linear infinite" }}
          />
        </div>
      )}

      <style>{`
        @keyframes tr-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Deliberating indicator — small dots between the two panels
// ────────────────────────────────────────────────────────────────────────────

function DeliberatingIndicator() {
  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-white/65"
            style={{
              animation: "tr-dot 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-white/45">
        DELIBERATING
      </div>
      <style>{`
        @keyframes tr-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Brief reveal — the joint read framed honestly as a sample
// ────────────────────────────────────────────────────────────────────────────

function BriefReveal({
  jointRead,
  onReset,
}: {
  jointRead: string;
  onReset: () => void;
}) {
  return (
    <div
      className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur p-6 sm:p-8"
      style={{ animation: "tr-brief-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-white/45">
          <span className="inline-block size-1.5 rounded-full bg-emerald-300" />
          CONVERGED · DEMO SAMPLE
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-white/45 hover:text-white/85 transition-colors"
        >
          <RotateCcw className="size-3" />
          ASK AGAIN
        </button>
      </div>

      <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
        JOINT_READ
      </div>
      <p className="mt-3 text-base leading-relaxed text-white sm:text-lg">
        {jointRead}
      </p>

      <div className="mt-6 border-t border-white/10 pt-5 text-xs text-white/45 leading-relaxed">
        This demo replays a real captured session. To run live deliberation on
        your actual question, install the plugin and call{" "}
        <code className="font-mono text-white/70">team_room_ask</code> from
        any Claude Code session.
      </div>

      <style>{`
        @keyframes tr-brief-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
