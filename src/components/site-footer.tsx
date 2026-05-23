import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark size={22} />
              <span
                className="text-xl text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Team Room
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Two minds, one brief. A small MCP plugin for Claude Code by Costa
              Xanthos.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-xs">
            <div className="flex items-center gap-6 font-mono uppercase tracking-[0.18em] text-muted-foreground/80">
              <a
                href="https://github.com/constantinexanthos/team-room"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Github
              </a>
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                MCP
              </a>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 tracking-[0.18em] uppercase">
              v0.1.1 · MIT
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground/50">
          <span className="inline-block h-px w-8 bg-amber-300/60" aria-hidden />
          <span>Claude · Opus 4.7</span>
          <span aria-hidden>×</span>
          <span>Codex · gpt-5.5</span>
          <span className="inline-block h-px w-8 bg-emerald-300/60" aria-hidden />
        </div>
      </div>
    </footer>
  );
}
