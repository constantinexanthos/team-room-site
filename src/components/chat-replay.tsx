"use client";

import { useEffect, useRef, useState } from "react";
import type { Dialogue } from "@/data/dialogues";
import { Play, Pause, RotateCcw, Forward } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Plays back a recorded team-room session with typing-style animation.
 * Each turn streams in character-by-character at adjustable speed.
 * Showcases the room behavior without burning tokens on a live API call.
 */
export function ChatReplay({ dialogue }: { dialogue: Dialogue }) {
  const [turnIdx, setTurnIdx] = useState(0);
  const [streamed, setStreamed] = useState("");
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(8); // chars per tick
  const containerRef = useRef<HTMLDivElement>(null);

  const turn = dialogue.turns[turnIdx];
  const full = turn?.content ?? "";

  // Stream the current turn's content; advance to next turn when done.
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
      }, 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStreamed((s) => full.slice(0, s.length + speed));
    }, 16);
    return () => clearTimeout(t);
  }, [playing, streamed, turn, full, speed, turnIdx, dialogue.turns.length]);

  // Auto-scroll to keep the active turn visible.
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

  const isDone = turnIdx === dialogue.turns.length - 1 && streamed.length >= full.length;
  const progress = Math.min(
    1,
    (turnIdx + streamed.length / Math.max(1, full.length)) / dialogue.turns.length
  );

  return (
    <div className="rounded-xl border border-border/60 bg-background/40 overflow-hidden shadow-2xl shadow-black/40">
      {/* Header: terminal-style chrome */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 bg-background/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            team_room_ask · {dialogue.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="font-mono text-[10px] uppercase tracking-widest"
          >
            <span
              className={`mr-1.5 inline-block size-1.5 rounded-full ${
                isDone
                  ? dialogue.outcome === "converged"
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                  : "bg-amber-400 animate-pulse"
              }`}
            />
            {isDone ? dialogue.outcome : "in flight"}
          </Badge>
        </div>
      </div>

      {/* Costa question (the prompt that opened the room) */}
      <div className="border-b border-border/40 px-5 py-4 bg-muted/20">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            you
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            opened the room
          </span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {dialogue.question}
        </p>
      </div>

      {/* Transcript with typing animation */}
      <div
        ref={containerRef}
        className="max-h-[420px] overflow-y-auto px-5 py-4 space-y-5"
      >
        {dialogue.turns.slice(0, turnIdx + 1).map((t, i) => {
          const isCurrent = i === turnIdx;
          const display = isCurrent ? streamed : t.content;
          const agentColor =
            t.agent === "claude"
              ? "text-amber-200"
              : t.agent === "codex"
              ? "text-emerald-200"
              : "text-muted-foreground";
          const agentBg =
            t.agent === "claude"
              ? "bg-amber-200/[0.04] border-amber-200/20"
              : t.agent === "codex"
              ? "bg-emerald-200/[0.04] border-emerald-200/20"
              : "bg-muted/20 border-border/40";
          return (
            <div key={i} className={`rounded-lg border ${agentBg} p-4`}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm ${agentColor}`}>
                    {t.agent}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {t.model}
                  </span>
                  {t.label && (
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] uppercase tracking-widest border-foreground/20"
                    >
                      [{t.label}]
                    </Badge>
                  )}
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  turn {t.turn}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed font-sans">
                {display}
                {isCurrent && playing && streamed.length < full.length && (
                  <span className="inline-block w-1.5 h-4 bg-foreground/70 ml-0.5 align-text-bottom animate-pulse" />
                )}
              </div>
            </div>
          );
        })}

        {isDone && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.04] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                final_brief.joint_read
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {dialogue.joint_read}
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-border/60 px-4 py-3 bg-background/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPlaying((p) => !p)}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            {playing ? "pause" : "play"}
          </button>
          <button
            onClick={skipAhead}
            disabled={isDone}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Forward className="size-3.5" />
            skip
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          >
            <RotateCcw className="size-3.5" />
            replay
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <button
              onClick={() => setSpeed(4)}
              className={`px-2 py-0.5 rounded ${
                speed === 4 ? "bg-muted/60 text-foreground" : "hover:text-foreground"
              }`}
            >
              1x
            </button>
            <button
              onClick={() => setSpeed(8)}
              className={`px-2 py-0.5 rounded ${
                speed === 8 ? "bg-muted/60 text-foreground" : "hover:text-foreground"
              }`}
            >
              2x
            </button>
            <button
              onClick={() => setSpeed(20)}
              className={`px-2 py-0.5 rounded ${
                speed === 20 ? "bg-muted/60 text-foreground" : "hover:text-foreground"
              }`}
            >
              4x
            </button>
          </div>

          <div className="hidden sm:block w-32 h-1 rounded-full bg-muted/30 overflow-hidden">
            <div
              className="h-full bg-foreground/60 transition-all duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
