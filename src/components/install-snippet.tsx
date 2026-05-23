"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Install snippet. Just the command + a copy hint. No glow, no gradient, no
 * chip clutter. Used in the hero and the install section.
 */
export function InstallSnippet({
  command = "/plugin install team-room@team-room",
  className,
}: {
  command?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied install command" : "Copy install command"}
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 font-mono text-[13px] text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50",
        className,
      )}
    >
      <span className="select-none text-zinc-400">$</span>
      <code className="flex-1 text-left">{command}</code>
      <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] text-zinc-400 transition-colors group-hover:text-zinc-600">
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
