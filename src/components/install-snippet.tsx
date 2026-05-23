"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Install snippet. Single-line by default; pass `commands` (array) to render
 * a stacked multi-step install panel. Copy button copies the joined command
 * string so users can paste a two-step install in one go.
 */
export function InstallSnippet({
  command,
  commands,
  className,
}: {
  command?: string;
  commands?: string[];
  className?: string;
}) {
  const lines = commands ?? [command ?? "/plugin install team-room@team-room"];
  const isMulti = lines.length > 1;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  if (!isMulti) {
    return (
      <button
        onClick={copy}
        aria-label={copied ? "Copied install command" : "Copy install command"}
        className={cn(
          "group inline-flex items-center gap-3 rounded-lg border-2 border-zinc-900 bg-white px-4 py-3 font-mono text-[13px] text-zinc-900 transition-colors hover:bg-zinc-50",
          className,
        )}
      >
        <span className="select-none text-zinc-400">$</span>
        <code className="flex-1 text-left">{lines[0]}</code>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-zinc-400 transition-colors group-hover:text-zinc-700">
          {copied ? (
            <>
              <Check className="size-3" /> COPIED
            </>
          ) : (
            <>
              <Copy className="size-3" /> COPY
            </>
          )}
        </span>
      </button>
    );
  }

  // Multi-step install panel
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-zinc-900 bg-white",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-zinc-900 px-4 py-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-900">
          {lines.length} steps · run in Claude Code
        </span>
        <button
          onClick={copy}
          aria-label={copied ? "Copied install commands" : "Copy install commands"}
          className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-900"
        >
          {copied ? (
            <>
              <Check className="size-3" /> COPIED
            </>
          ) : (
            <>
              <Copy className="size-3" /> COPY ALL
            </>
          )}
        </button>
      </div>
      <ol className="divide-y-2 divide-zinc-200">
        {lines.map((cmd, i) => (
          <li
            key={i}
            className="grid grid-cols-[2rem_1fr] items-center gap-3 px-4 py-3 font-mono text-[13px]"
          >
            <span className="text-[10px] font-bold text-zinc-400">
              0{i + 1}
            </span>
            <span className="flex items-center gap-2 overflow-x-auto">
              <span className="select-none text-zinc-400">$</span>
              <code className="text-zinc-900">{cmd}</code>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
