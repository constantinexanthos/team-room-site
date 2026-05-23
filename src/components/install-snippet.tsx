"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function InstallSnippet({
  command = "/plugin install team-room@team-room",
  variant = "default",
}: {
  command?: string;
  variant?: "default" | "compact";
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={copy}
        aria-label={copied ? "Copied install command" : "Copy install command"}
        className="group inline-flex items-center gap-2 rounded-md border border-foreground/12 bg-foreground/[0.025] px-3 py-1.5 font-mono text-[12.5px] transition-all hover:border-foreground/25 hover:bg-foreground/[0.05]"
      >
        <span className="text-amber-300/80 select-none">$</span>
        <code className="text-foreground/90">{command}</code>
        <span className="text-muted-foreground/60 group-hover:text-foreground/80 transition-colors">
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </span>
      </button>
    );
  }

  return (
    <div className="group relative w-full max-w-md">
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-amber-300/25 via-foreground/10 to-emerald-300/25 opacity-40 blur-sm group-hover:opacity-70 transition-opacity" aria-hidden />
      <div className="relative flex items-center gap-3 rounded-lg border border-foreground/15 bg-background/95 px-4 py-3 font-mono text-[13px]">
        <span className="text-amber-300/80 select-none" aria-hidden>
          $
        </span>
        <code className="flex-1 text-foreground/95 truncate">{command}</code>
        <button
          onClick={copy}
          aria-label={copied ? "Copied install command" : "Copy install command"}
          className="inline-flex items-center gap-1.5 rounded-md border border-foreground/12 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-all hover:text-foreground hover:border-foreground/30"
        >
          {copied ? (
            <>
              <Check className="size-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
