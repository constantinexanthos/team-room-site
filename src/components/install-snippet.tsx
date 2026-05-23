"use client";

import { useState } from "react";

/**
 * Minimal install snippet. No gradient halo, no buttons-with-chips. Just the
 * command in mono with a small copy hint that flips to "copied" briefly.
 */
export function InstallSnippet({
  command = "/plugin install team-room@team-room",
}: {
  command?: string;
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
      className="group inline-flex items-center gap-3 text-xs text-white/65 transition-colors hover:text-white/95"
    >
      <span className="text-amber-300/80 select-none">$</span>
      <code className="font-mono">{command}</code>
      <span className="text-[9px] tracking-[0.3em] text-white/30 group-hover:text-white/55 transition-colors">
        {copied ? "COPIED" : "COPY"}
      </span>
    </button>
  );
}
