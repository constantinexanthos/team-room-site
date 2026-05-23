import Link from "next/link";
import { Scene } from "@/components/scene";
import { InstallSnippet } from "@/components/install-snippet";

// The homepage. A small animated scene shows the actual product behavior:
// a boss asks a question, two agent orbs deliberate, a brief returns. Around
// that, the absolute minimum — a tagline naming what just happened, the
// install command, and tiny corner nav. The visual carries the explanation.
export default function HomePage() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-black text-[#e8e6e3]">
      {/* Soft ambient backlights — amber left, emerald right, very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(45% 60% at 12% 50%, rgba(251,191,36,0.06), transparent 70%), radial-gradient(45% 60% at 88% 50%, rgba(52,211,153,0.06), transparent 70%)",
        }}
      />

      {/* Header — tiny */}
      <header className="relative z-30 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-2.5 text-[10px] tracking-[0.22em] text-white/45">
          <span aria-hidden className="relative inline-flex h-2.5 w-5">
            <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border border-amber-300/60" />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-emerald-300/60" />
          </span>
          <span>TEAM ROOM</span>
        </div>
        <div className="flex items-center gap-5 text-[10px] tracking-[0.22em] text-white/45">
          <Link href="/docs" className="hover:text-white/85 transition-colors">
            DOCS
          </Link>
          <a
            href="https://github.com/constantinexanthos/team-room"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/85 transition-colors"
          >
            GITHUB
          </a>
        </div>
      </header>

      <main className="relative z-20 flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 pb-12 pt-2 sm:px-8">
        {/* The scene — animated diorama */}
        <div className="w-full max-w-4xl">
          <Scene />
        </div>

        {/* Caption — names what just happened */}
        <div className="mt-8 flex max-w-2xl flex-col items-center text-center sm:mt-10">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40">
            <span className="inline-block h-px w-6 bg-amber-300/60" aria-hidden />
            <span>YOU</span>
            <span className="text-white/30">→</span>
            <span>TEAM ROOM</span>
            <span className="text-white/30">→</span>
            <span>ONE BRIEF</span>
            <span className="inline-block h-px w-6 bg-emerald-300/60" aria-hidden />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
            When a question deserves more than one perspective,{" "}
            <span className="text-amber-200/90">Claude</span> and{" "}
            <span className="text-emerald-200/90">Codex</span> open a room.
            They address each other by name, build on each other&apos;s
            frames, and return one structured brief.
          </p>
          <p className="mt-2 text-xs text-white/40">
            A Claude Code MCP plugin. Two AI minds. One brief.
          </p>
        </div>

        {/* Install — single line */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <InstallSnippet />
          <Link
            href="/docs"
            className="text-[10px] tracking-[0.3em] text-white/30 hover:text-white/70 transition-colors"
          >
            READ THE DOCS →
          </Link>
        </div>
      </main>
    </div>
  );
}
