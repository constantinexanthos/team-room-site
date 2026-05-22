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

  return (
    <div
      className={
        variant === "compact"
          ? "inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3 py-1.5 font-mono text-sm"
          : "group inline-flex w-full max-w-md items-center justify-between rounded-lg border border-border/60 bg-background/60 px-4 py-3 font-mono text-sm hover:border-border transition-colors"
      }
    >
      <span className="text-muted-foreground select-none">$</span>
      <code className="flex-1 px-2 text-foreground/90">{command}</code>
      <button
        onClick={copy}
        aria-label="Copy install command"
        className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
      >
        {copied ? (
          <>
            <Check className="size-3.5" />
            copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            copy
          </>
        )}
      </button>
    </div>
  );
}
