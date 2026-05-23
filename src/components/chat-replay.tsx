"use client";

import { useEffect, useRef, useState } from "react";
import type { Dialogue } from "@/data/dialogues";
import { Play, Pause, RotateCcw, Forward } from "lucide-react";

/**
 * Plays back a recorded team-room session with typing-style animation.
 * Each turn streams in character-by-character at adjustable speed.
 * Showcases the room behavior without burning tokens on a live API call.
 *
 * Visual model: editorial transcript, not "terminal window." Mono is reserved
 * for labels (turn tags, agent names) — body content is sans for readability.
 */
export function ChatReplay({
  dialogue,
  compact = false,
}: {
  dialogue: Dialogue;
  compact?: boolean;
}) {
  const [turnIdx, setTurnIdx] = useState(0);
  const [streamed, setStreamed] = useState("");
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(12); // chars per tick
  const containerRef = useRef<HTMLDivElement>(null);

  const turn = dialogue.turns[turnIdx];
  const full = turn?.content ?? "";

  useEffect(() => {
    if (!playing || !turn) return;
    if (streamed.length >= full.length) {
      const t = setTimeout(() => {
        if (turnIdx < dialogue.turns.length - 1) {
          setTurnIdx((i) => i + 1);
          setStreamed("");
        } else {
          setPlaying(false);
        }
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStreamed((s) => full.slice(0, s.length + speed));
    }, 16);
    return () => clearTimeout(t);
  }, [playing, streamed, turn, full, speed, turnIdx, dialogue.turns.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [streamed, turnIdx]);

  const reset = () => {
    setTurnIdx(0);
    setStreamed("");
    setPlaying(true);
  };
  const skipAhead = () => {
    if (streamed.length < full.length) {
      setStreamed(full);
    } else if (turnIdx < dialogue.turns.length - 1) {
      setTurnIdx((i) => i + 1);
      setStreamed("");
    }
  };

  const isDone =
    turnIdx === dialogue.turns.length - 1 && streamed.length >= full.length;
  const progress = Math.min(
    1,
    (turnIdx + streamed.length / Math.max(1, full.length)) / dialogue.turns.length
  );

  const maxH = compact ? "max-h-[360px]" : "max-h-[520px]";

  return (
    <div className="tr-replay-frame rounded-xl overflow-hidden">
      {/* Header: editorial chrome — no traffic lights cliché. */}
      <div className="flex items-center justify-between border-b border-foreground/[0.06] px-5 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
            aria-hidden
          >
            <span className="mr-2 inline-block h-px w-5 bg-amber-300/70" />
            session
            <span className="mx-2 inline-block h-px w-5 bg-emerald-300/70" />
          </span>
          <span className="truncate font-mono text-[11px] text-muted-foreground">
            {dialogue.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block size-1.5 rounded-full ${
              isDone
                ? dialogue.outcome === "converged"
                  ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60"
                  : "bg-amber-400 shadow-[0_0_8px] shadow-amber-400/60"
                : "bg-amber-400 animate-pulse"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/80">
            {isDone ? dialogue.outcome : "in flight"}
          </span>
        </div>
      </div>

      {/* The opening question — set in serif so it reads like a letter prompt */}
      <div className="border-b border-foreground/[0.06] px-5 sm:px-6 py-5 bg-foreground/[0.015]">
        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground/80 mb-2">
          Costa · opened the room
        </div>
        <p
          className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.45] text-foreground/85 max-w-[60ch]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {dialogue.question}
        </p>
      </div>

      {/* Transcript */}
      <div
        ref={containerRef}
        className={`${maxH} overflow-y-auto px-5 sm:px-6 py-5 space-y-6`}
      >
        {dialogue.turns.slice(0, turnIdx + 1).map((t, i) => {
          const isCurrent = i === turnIdx;
          const display = isCurrent ? streamed : t.content;
          const accent =
            t.agent === "claude"
              ? {
                  rule: "bg-amber-300/70",
                  name: "text-amber-200",
                  glow: "shadow-amber-400/40",
                }
              : t.agent === "codex"
              ? {
                  rule: "bg-emerald-300/70",
                  name: "text-emerald-200",
                  glow: "shadow-emerald-400/40",
                }
              : {
                  rule: "bg-foreground/40",
                  name: "text-foreground/80",
                  glow: "shadow-foreground/20",
                };

          return (
            <article key={i} className="relative pl-5">
              {/* Speaker rule — the only color signal per turn. No card frame. */}
              <span
                className={`absolute left-0 top-1.5 bottom-1.5 w-px ${accent.rule} shadow-[0_0_4px] ${accent.glow}`}
                aria-hidden
              />
              <header className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`font-mono text-[13px] ${accent.name} font-medium`}
                  >
                    {t.agent}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/70 truncate">
                    {t.model}
                  </span>
                  {t.label && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/55 border border-foreground/15 px-1.5 py-px rounded">
                      {t.label}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/70 shrink-0">
                  turn · {t.turn}
                </span>
              </header>
              <div className="whitespace-pre-wrap text-[0.9375rem] leading-[1.55] text-foreground/90">
                {display}
                {isCurrent && playing && streamed.length < full.length && (
                  <span className="tr-caret" />
                )}
              </div>
            </article>
          );
        })}

        {isDone && (
          <article className="relative pl-5">
            <span
              className="absolute left-0 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-amber-300/80 via-foreground/60 to-emerald-300/80"
              aria-hidden
            />
            <header className="flex items-baseline gap-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
                final_brief
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/70">
                · joint_read
              </span>
            </header>
            <p
              className="text-[1.0625rem] leading-[1.55] text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dialogue.joint_read}
            </p>
          </article>
        )}
      </div>

      {/* Footer: minimal controls + scrub bar. No icons-with-labels redundancy. */}
      <div className="border-t border-foreground/[0.06] px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-0.5">
          <ControlButton
            onClick={() => setPlaying((p) => !p)}
            disabled={isDone}
            label={playing ? "pause" : "play"}
          >
            {playing ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
          </ControlButton>
          <ControlButton
            onClick={skipAhead}
            disabled={isDone}
            label="skip to next turn"
          >
            <Forward className="size-3.5" />
          </ControlButton>
          <ControlButton onClick={reset} label="replay from start">
            <RotateCcw className="size-3.5" />
          </ControlButton>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-px font-mono text-[10px] text-muted-foreground rounded-md border border-foreground/10 overflow-hidden">
            {[
              { v: 6, l: "1×" },
              { v: 12, l: "2×" },
              { v: 28, l: "4×" },
            ].map((s) => (
              <button
                key={s.v}
                onClick={() => setSpeed(s.v)}
                className={`px-2 py-1 transition-colors ${
                  speed === s.v
                    ? "bg-foreground/10 text-foreground"
                    : "hover:text-foreground"
                }`}
              >
                {s.l}
              </button>
            ))}
          </div>

          <div
            className="hidden sm:block w-28 h-px bg-foreground/15 relative overflow-visible"
            aria-label="progress"
          >
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-300/80 to-emerald-300/80 transition-[width] duration-300"
              style={{
                width: `${progress * 100}%`,
                height: "1px",
                boxShadow: "0 0 6px oklch(0.78 0.16 70 / 0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-all hover:text-foreground hover:bg-foreground/[0.06] disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
