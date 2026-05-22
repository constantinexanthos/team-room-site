import Link from "next/link";
import { GithubIcon } from "@/components/icons";

const NAV = [
  { href: "/demo", label: "Demo" },
  { href: "/data", label: "Why it's better" },
  { href: "/docs", label: "Docs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
        >
          <span className="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" />
          team-room
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/constantinexanthos/team-room"
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-border"
          >
            <GithubIcon className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
