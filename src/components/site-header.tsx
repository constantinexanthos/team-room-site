import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import { Wordmark } from "@/components/brand-mark";

const NAV = [
  { href: "/demo", label: "Replay", num: "02" },
  { href: "/data", label: "Evidence", num: "03" },
  { href: "/docs", label: "Docs", num: "04" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Team Room — home"
          className="group inline-flex items-center"
        >
          <Wordmark />
          <span className="ml-3 hidden text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground sm:inline">
            v0.1.1
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative inline-flex items-baseline gap-1.5 rounded-md px-2.5 py-1.5 text-foreground/65 transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[10px] text-muted-foreground/70 group-hover:text-amber-300/80 transition-colors">
                {item.num}
              </span>
              <span className="font-sans text-[0.92rem]">{item.label}</span>
            </Link>
          ))}
          <a
            href="https://github.com/constantinexanthos/team-room"
            target="_blank"
            rel="noreferrer"
            aria-label="Team Room on GitHub"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-border/60 px-2.5 py-1.5 text-foreground/70 transition-all hover:text-foreground hover:border-foreground/30"
          >
            <GithubIcon className="size-3.5" />
            <span className="hidden text-[0.82rem] sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
