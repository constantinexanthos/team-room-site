export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="font-mono">
          team-room · v0.1.1 · MCP plugin for Claude Code
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/constantinexanthos/team-room"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            MCP
          </a>
          <span className="font-mono">Built by Costa Xanthos</span>
        </div>
      </div>
    </footer>
  );
}
