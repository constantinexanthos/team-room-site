"use client";

/**
 * LiveRoom — the homepage IS the product.
 *
 * One screen. Two cursors. Two AIs typing to each other in real time
 * (replayed from a captured session). When the room lands on a joint
 * read, that's the climax. No marketing copy. No sections. The room.
 *
 * Constraints baked into the visual:
 *  - one typeface (JetBrains Mono), one weight, no italics
 *  - claude=amber on the left, codex=emerald on the right — only colors
 *  - black background, off-white text, all chrome at 25-40% opacity
 *  - cinema pacing — slow enough to read, fast enough to keep moving
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import { TEAM_ROOM_DIALOGUE, type Turn } from "@/data/dialogues";

type Phase = "intro" | "typing" | "between" | "joint" | "restart";

type State = {
  phase: Phase;
  turnIdx: number;
  streamed: string;
};

type Action =
  | { type: "tick"; chars: number }
  | { type: "finish-turn" }
  | { type: "next-turn" }
  | { type: "to-joint" }
  | { type: "to-restart" }
  | { type: "restart" }
  | { type: "skip-to-joint"; allContent: string[] };

// Strip tag prefix + extract joint-read marker so each turn shows only its prose.
function cleanTurn(raw: string): string {
  return raw
    .replace(/^\s*\[[a-z-]+\]\s*\n+/i, "")
    .replace(/\s*\*\*Joint read for Costa:\*\*[\s\S]*$/i, "")
    .trim();
}

// Render markdown-y emphasis (**bold**) → just stripped, since we're mono-faced.
// We keep the words; we drop the stars to avoid visual noise.
function stripMd(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}

const TURNS = TEAM_ROOM_DIALOGUE.turns.map((t) => ({
  ...t,
  display: stripMd(cleanTurn(t.content)),
})) as (Turn & { display: string })[];

const TYPING_MS_PER_CHUNK = 14; // ms between chunks
const CHARS_PER_CHUNK = 3;      // chars per chunk
const BETWEEN_TURN_MS = 700;    // pause between turns
const JOINT_MS = 7500;          // joint read visible
const RESTART_MS = 2200;        // pause before loop

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "tick": {
      const full = TURNS[state.turnIdx]?.display ?? "";
      const next = Math.min(state.streamed.length + action.chars, full.length);
      return { ...state, streamed: full.slice(0, next) };
    }
    case "finish-turn":
      return { ...state, phase: "between" };
    case "next-turn":
      return { phase: "typing", turnIdx: state.turnIdx + 1, streamed: "" };
    case "to-joint":
      return { ...state, phase: "joint" };
    case "to-restart":
      return { ...state, phase: "restart" };
    case "restart":
      return { phase: "typing", turnIdx: 0, streamed: "" };
    case "skip-to-joint":
      return { phase: "joint", turnIdx: TURNS.length - 1, streamed: TURNS[TURNS.length - 1].display };
    default:
      return state;
  }
}

export function LiveRoom() {
  const [state, dispatch] = useReducer(reducer, {
    phase: "intro",
    turnIdx: 0,
    streamed: "",
  });

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // intro → typing
  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => dispatch({ type: "restart" }), 700);
    return () => clearTimeout(t);
  }, [state.phase]);

  // typing loop
  useEffect(() => {
    if (state.phase !== "typing") return;
    const full = TURNS[state.turnIdx]?.display ?? "";
    if (state.streamed.length >= full.length) {
      dispatch({ type: "finish-turn" });
      return;
    }
    const t = setTimeout(() => dispatch({ type: "tick", chars: CHARS_PER_CHUNK }), TYPING_MS_PER_CHUNK);
    return () => clearTimeout(t);
  }, [state.phase, state.streamed, state.turnIdx]);

  // between → next or joint
  useEffect(() => {
    if (state.phase !== "between") return;
    const isLast = state.turnIdx >= TURNS.length - 1;
    const t = setTimeout(() => {
      if (isLast) dispatch({ type: "to-joint" });
      else dispatch({ type: "next-turn" });
    }, BETWEEN_TURN_MS);
    return () => clearTimeout(t);
  }, [state.phase, state.turnIdx]);

  // joint → restart
  useEffect(() => {
    if (state.phase !== "joint") return;
    const t = setTimeout(() => dispatch({ type: "to-restart" }), JOINT_MS);
    return () => clearTimeout(t);
  }, [state.phase]);

  // restart → typing (loop)
  useEffect(() => {
    if (state.phase !== "restart") return;
    const t = setTimeout(() => dispatch({ type: "restart" }), RESTART_MS);
    return () => clearTimeout(t);
  }, [state.phase]);

  // Auto-scroll each column so the latest text stays in view.
  useEffect(() => {
    [leftRef, rightRef].forEach((r) => {
      if (r.current) r.current.scrollTop = r.current.scrollHeight;
    });
  }, [state.streamed, state.turnIdx]);

  // Split rendered turns into per-side stacks.
  // Each side shows: completed turns from that agent (faint), then current turn if active.
  const currentTurn = TURNS[state.turnIdx];
  const claudeIsTyping = state.phase === "typing" && currentTurn.agent === "claude";
  const codexIsTyping = state.phase === "typing" && currentTurn.agent === "codex";

  const sideContent = (agent: "claude" | "codex") => {
    const items: { display: string; status: "done" | "active"; turn: number }[] = [];
    for (let i = 0; i < TURNS.length; i++) {
      const t = TURNS[i];
      if (t.agent !== agent) continue;
      if (i < state.turnIdx) {
        items.push({ display: t.display, status: "done", turn: t.turn ?? i + 1 });
      } else if (i === state.turnIdx) {
        if (state.phase === "typing") {
          items.push({ display: state.streamed, status: "active", turn: t.turn ?? i + 1 });
        } else if (state.phase === "between" || state.phase === "joint" || state.phase === "restart") {
          items.push({ display: t.display, status: "done", turn: t.turn ?? i + 1 });
        }
      }
    }
    return items;
  };

  const claudeItems = sideContent("claude");
  const codexItems = sideContent("codex");

  const skip = useCallback(() => {
    if (state.phase === "joint" || state.phase === "restart") {
      dispatch({ type: "restart" });
    } else {
      dispatch({ type: "skip-to-joint", allContent: TURNS.map((t) => t.display) });
    }
  }, [state.phase]);

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-black text-[#e8e6e3] select-none">
      {/* Subtle backlights tinting each half — claude amber, codex emerald */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 80% at 0% 50%, rgba(251,191,36,0.06), transparent 65%), radial-gradient(60% 80% at 100% 50%, rgba(52,211,153,0.06), transparent 65%)",
        }}
      />

      {/* Header — almost invisible */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-2.5 text-[10px] tracking-[0.22em] text-white/45">
          <span aria-hidden className="relative inline-flex h-2.5 w-5">
            <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border border-amber-300/60" />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-emerald-300/60" />
          </span>
          <span>TEAM ROOM</span>
        </div>
        <div className="flex items-center gap-5 text-[10px] tracking-[0.22em] text-white/45">
          <a
            href="/docs"
            className="hover:text-white/85 transition-colors"
          >
            DOCS
          </a>
          <a
            href="https://github.com/constantinexanthos/team-room"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/85 transition-colors"
          >
            GITHUB
          </a>
        </div>
      </header>

      {/* Question — small caption at top center */}
      <div className="absolute inset-x-0 top-16 z-20 flex justify-center px-6 sm:top-20">
        <div className="max-w-xl text-center">
          <div className="text-[9px] tracking-[0.3em] text-white/35">
            A QUESTION CAME IN
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/55">
            {TEAM_ROOM_DIALOGUE.display_question ?? TEAM_ROOM_DIALOGUE.question}
          </p>
        </div>
      </div>

      {/* The room — two columns */}
      <div className="grid h-full grid-cols-1 sm:grid-cols-2">
        <SidePanel
          agent="claude"
          color="amber"
          model="opus 4.7"
          items={claudeItems}
          isTyping={claudeIsTyping}
          listRef={leftRef}
        />
        <SidePanel
          agent="codex"
          color="emerald"
          model="gpt-5.5"
          items={codexItems}
          isTyping={codexIsTyping}
          listRef={rightRef}
        />
      </div>

      {/* Thin centerline glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px sm:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(232,230,227,0.08) 30%, rgba(232,230,227,0.08) 70%, transparent)",
        }}
      />

      {/* Joint read overlay — the climax */}
      {state.phase === "joint" && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-md"
          style={{ animation: "tr-fade-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          <div className="mx-auto max-w-3xl px-8 text-center">
            <div className="mb-6 flex items-center justify-center gap-2.5 text-[10px] tracking-[0.32em] text-white/45">
              <span aria-hidden className="h-px w-8 bg-amber-300/60" />
              <span>JOINT READ</span>
              <span aria-hidden className="h-px w-8 bg-emerald-300/60" />
            </div>
            <p className="text-lg leading-snug text-white sm:text-2xl">
              {TEAM_ROOM_DIALOGUE.joint_read}
            </p>
            <div className="mt-8 text-[10px] tracking-[0.22em] text-white/30">
              CONVERGED · TURN 3 · 22s
            </div>
          </div>
        </div>
      )}

      {/* Install — bottom, tiny */}
      <div className="absolute inset-x-0 bottom-5 z-30 flex flex-col items-center gap-2 px-5 sm:bottom-7">
        <code className="select-text text-[11px] tracking-[0.04em] text-white/65 sm:text-xs">
          <span className="text-amber-300/75">$</span> /plugin install team-room@team-room
        </code>
        <button
          onClick={skip}
          className="text-[9px] tracking-[0.3em] text-white/25 hover:text-white/70 transition-colors"
        >
          {state.phase === "joint" || state.phase === "restart" ? "REPLAY" : "SKIP →"}
        </button>
      </div>

      {/* Single keyframe for the joint-read fade */}
      <style>{`
        @keyframes tr-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function SidePanel({
  agent,
  color,
  model,
  items,
  isTyping,
  listRef,
}: {
  agent: "claude" | "codex";
  color: "amber" | "emerald";
  model: string;
  items: { display: string; status: "done" | "active"; turn: number }[];
  isTyping: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
}) {
  const dotClass = color === "amber" ? "bg-amber-300" : "bg-emerald-300";
  const tintClass = color === "amber" ? "text-amber-200/85" : "text-emerald-200/85";
  const caretClass = color === "amber" ? "bg-amber-200/90" : "bg-emerald-200/90";

  return (
    <section
      aria-label={`${agent} side`}
      className="relative flex h-full flex-col justify-end overflow-hidden border-white/[0.06] px-5 py-12 sm:px-10 sm:py-16"
    >
      {/* Name plate (top of section, faint) */}
      <div className="absolute left-5 top-32 z-10 flex items-center gap-2 text-[10px] tracking-[0.22em] sm:left-10 sm:top-36">
        <span
          className={`inline-block size-1.5 rounded-full ${dotClass} ${
            isTyping ? "animate-pulse shadow-[0_0_8px]" : "opacity-50"
          } ${color === "amber" ? "shadow-amber-300/70" : "shadow-emerald-300/70"}`}
        />
        <span className={tintClass}>{agent.toUpperCase()}</span>
        <span className="text-white/25">·</span>
        <span className="text-white/40">{model}</span>
      </div>

      {/* Scroll container with top fade */}
      <div
        ref={listRef}
        className="relative max-h-[calc(100dvh-15rem)] overflow-y-auto pr-1 no-scrollbar"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
        }}
      >
        <div className="flex flex-col gap-7 pb-2 pt-12 sm:pt-20">
          {items.length === 0 && (
            // Empty state — a single blinking caret, waiting for this side to speak
            <div className={`h-3 w-2 ${caretClass}`} style={{ animation: "tr-caret-blink 1.05s steps(1) infinite" }} />
          )}
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const active = item.status === "active" && isLast;
            return (
              <div
                key={`${agent}-${item.turn}-${i}`}
                className={`whitespace-pre-wrap text-[13.5px] leading-[1.7] sm:text-[14.5px] ${
                  active ? "text-white/95" : "text-white/50"
                }`}
              >
                {item.display}
                {active && isTyping && (
                  <span
                    className={`ml-0.5 inline-block h-[1em] w-[0.45em] align-text-bottom ${caretClass}`}
                    style={{ animation: "tr-caret-blink 1.05s steps(1) infinite" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
