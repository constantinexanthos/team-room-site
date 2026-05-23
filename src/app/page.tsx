import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { InteractiveRoom } from "@/components/interactive-room";
import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";
import { Wordmark } from "@/components/wordmark";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      {/* ─── HEADER ─────────────────────────────────────────────────────── */}
      <header className="relative z-30 border-b border-zinc-200/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Team Room — home">
            <Wordmark size={14} />
          </Link>
          <nav className="flex items-center gap-5 text-xs tracking-[0.18em] text-zinc-500">
            <Link href="/docs" className="hover:text-zinc-900 transition-colors">
              DOCS
            </Link>
            <a
              href="https://github.com/constantinexanthos/team-room"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
            >
              <GithubIcon className="size-3.5" />
              <span>GITHUB</span>
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
        {/* Dotted surface, light dots so they read on dark */}
        <DottedSurface
          dotColor="light"
          position="absolute"
          className="opacity-50"
        />
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          {/* Intro */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
              A CLAUDE CODE PLUGIN — IN PUBLIC BETA
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.1] text-white sm:text-5xl">
              Two AI minds in one room.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-emerald-300">
                Ask them anything.
              </span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/65 sm:text-base">
              Team Room puts Claude and ChatGPT in a structured conversation,
              by name. Type a question below — watch them deliberate, return
              a single brief.
            </p>
          </div>

          {/* Interactive scene */}
          <div className="mt-12 sm:mt-14">
            <InteractiveRoom />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* ─── PERSONAL NOTE ─────────────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-400">
            A NOTE
          </p>
          <p className="mt-5 text-xl leading-[1.55] text-zinc-800 sm:text-2xl">
            Most people ask Claude and ChatGPT separately and reconcile the
            answers themselves. I wanted them to reconcile each other.
            <br />
            <br />
            Team Room is a small plugin that lets the two models address each
            other by name, push back on each other&apos;s framing, and return
            one answer instead of two.
          </p>
          <p className="mt-6 text-sm text-zinc-500">— Costa</p>
        </section>

        {/* ─── WHAT TO ASK IT — flowing prose, no card grid ─────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            What to ask it.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Reach for the room on questions where the answer compounds — where
            two perspectives produce something neither would alone.
          </p>

          <div className="mt-8 space-y-6 text-zinc-700">
            <Beat
              tag="architecture"
              q="Postgres or DynamoDB for a side project we might never scale?"
            />
            <Beat
              tag="prioritization"
              q="Ship the auth refactor in one PR or split into three?"
            />
            <Beat
              tag="naming"
              q="Right shape for this endpoint, given we don't know the next two callers?"
            />
            <Beat
              tag="trade-offs"
              q="Spend the week on docs or polish the install?"
            />
          </div>

          <p className="mt-10 text-sm leading-relaxed text-zinc-500">
            Skip it for tactical work — bug fixes, test writing, regex
            explanation. Just answer those directly.
          </p>
        </section>

        {/* ─── HOW THE ROOM RETURNS ANSWERS ─────────────────────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Every session lands somewhere.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Four outcomes, picked at the end of every room. The brief Claude
            quotes to you is parsed from the closing turn — no wall of text.
          </p>

          <dl className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
            <Outcome
              dot="bg-emerald-500"
              name="converged"
              desc="They landed on a joint read for you. One or two sentences."
            />
            <Outcome
              dot="bg-amber-500"
              name="forked"
              desc="They mapped real disagreement — each view, plus the deciding evidence."
            />
            <Outcome
              dot="bg-sky-500"
              name="timed-out"
              desc="They ran out of turns. The last turn is preserved as partial progress."
            />
            <Outcome
              dot="bg-rose-500"
              name="failed"
              desc="An agent or orchestrator failure. One-line reason."
            />
          </dl>
        </section>

        {/* ─── INSTALL ───────────────────────────────────────────────── */}
        <section className="border-t border-zinc-200 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            One command.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            From inside a Claude Code session. Requires{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em]">claude</code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em]">codex</code>{" "}
            CLIs on PATH.
          </p>
          <div className="mt-7 flex justify-center">
            <InstallSnippet />
          </div>
          <div className="mt-6 flex items-center justify-center gap-5 text-xs tracking-[0.18em] text-zinc-500">
            <Link href="/docs" className="hover:text-zinc-900 transition-colors">
              READ THE DOCS
            </Link>
            <span className="text-zinc-300">·</span>
            <a
              href="https://github.com/constantinexanthos/team-room"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 transition-colors"
            >
              GITHUB
            </a>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 sm:flex-row sm:items-center sm:px-8">
          <div className="text-xs text-zinc-500">
            Built by{" "}
            <a
              href="https://github.com/constantinexanthos"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-700 transition-all"
            >
              Costa Xanthos
            </a>
          </div>
          <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-400">
            v0.1.1 · MIT
          </div>
        </div>
      </footer>
    </div>
  );
}

function Beat({ tag, q }: { tag: string; q: string }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="font-mono text-[10px] tracking-[0.22em] text-zinc-400 sm:w-32 shrink-0">
        {tag.toUpperCase()}
      </span>
      <p className="text-base leading-relaxed">{q}</p>
    </div>
  );
}

function Outcome({
  dot,
  name,
  desc,
}: {
  dot: string;
  name: string;
  desc: string;
}) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-4 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
      <dt className="flex items-center gap-2.5">
        <span className={`inline-block size-1.5 rounded-full ${dot}`} />
        <span className="text-sm font-medium text-zinc-900">{name}</span>
      </dt>
      <dd className="text-sm text-zinc-600 leading-relaxed">{desc}</dd>
    </div>
  );
}
