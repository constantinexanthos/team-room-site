"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Install snippet. Two variants: `light` (default) for white pages,
 * `dark` for the dark hero card.
 */
export function InstallSnippet({
  command = "/plugin install team-room@team-room",
  variant = "light",
  className,
}: {
  command?: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const isDark = variant === "dark";

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied install command" : "Copy install command"}
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg border px-4 py-3 font-mono text-[13px] transition-all",
        isDark
          ? "border-white/15 bg-white/[0.03] text-white/85 hover:border-white/25 hover:bg-white/[0.06]"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50",
        className,
      )}
    >
      <span
        className={cn(
          "select-none",
          isDark ? "text-amber-300/80" : "text-amber-600/80",
        )}
      >
        $
      </span>
      <code className="flex-1 text-left">{command}</code>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em]",
          isDark
            ? "text-white/40 group-hover:text-white/70"
            : "text-zinc-400 group-hover:text-zinc-600",
          "transition-colors",
        )}
      >
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
