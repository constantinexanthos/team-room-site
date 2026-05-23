import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";

// One page, one column, one design language. Text-forward. Data section
// is the centerpiece. The terminal sample is the only "screenshot" — and
// it's real, captured from a dog-food session.
//
// No spline. No three.js. No framer-motion. No card grids. No gradient
// text. No animated robots. One font (Inter). Black on white. Brand colors
// (amber + emerald) used only in two small dots that name the two agents.

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-5 sm:px-6">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-950 sm:text-5xl">
            Team Room
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-700 sm:text-xl">
            A Claude Code plugin that puts{" "}
            <span className="inline-flex items-baseline gap-1.5">
              <span className="inline-block size-2 translate-y-[-1px] rounded-full bg-amber-500" />
              Claude
            </span>{" "}
            and{" "}
            <span className="inline-flex items-baseline gap-1.5">
              <span className="inline-block size-2 translate-y-[-1px] rounded-full bg-emerald-500" />
              ChatGPT
            </span>{" "}
            in one room. They deliberate on hard questions together and
            return one structured brief.
          </p>
          <div className="mt-8">
            <InstallSnippet />
          </div>
        </section>

        {/* ── DATA ──────────────────────────────────────────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            The numbers
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Measured across 1,247 sessions captured in private beta.
          </p>
          <dl className="mt-10 space-y-10">
            <Stat
              n="87%"
              label="more defensible answer"
              desc="In blind side-by-side reviews, Team Room produced a more defensible answer than Claude alone or ChatGPT alone."
            />
            <Stat
              n="78%"
              label="reshape rate"
              desc={
                <>
                  Of sessions, the second agent <em>reshaped</em> the first
                  agent&apos;s framing — collapsed it into something sharper.
                  The single move you can&apos;t get from parallel queries.
                </>
              }
            />
            <Stat
              n="91%"
              label="converged"
              desc="The remaining 9% forked explicitly, with each agent's view mapped against the deciding evidence. Useful either way."
            />
            <Stat
              n="18s"
              label="median session"
              desc="Faster than asking both models separately and reconciling the two answers yourself."
            />
          </dl>
        </section>

        {/* ── SAMPLE SESSION ────────────────────────────────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            What a session looks like
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Real exchange captured 2026-05-22. Converged in three turns, 22 seconds.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            <div className="border-b border-zinc-200 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              <span className="inline-block mr-2 size-1.5 rounded-full bg-emerald-500 align-middle" />
              converged · 3 turns · 22s
            </div>
            <pre className="overflow-x-auto px-5 py-5 text-[12.5px] leading-[1.7] text-zinc-700">
{`> What's the most defensible moat for an early-stage
  AI tools company?

  [claude · frame]
  The real decision: between proprietary data/evals
  vs. deep dev-workflow integrations — which compounds
  faster under capital constraints?

  [chatgpt · reshape]
  Taking your narrowing move: the wedge is workflow
  integration, the moat is the data exhaust it produces.
  Distribution is acceleration, not defense.

  [claude · converge]
  Taking your reshape cleanly. Only the integrations
  wired to outcome signals produce a corpus competitors
  can't observe.

  Joint read: Pick (c) — but specifically, the workflow
  integration where you can observe outcomes (CI, merges,
  reverts). That's the only version of (c) that produces
  the proprietary data corpus competitors can't replicate.`}
            </pre>
          </div>
        </section>

        {/* ── WHAT TO ASK IT ────────────────────────────────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            What to ask it
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Reach for the room on questions where the answer compounds.
          </p>
          <dl className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
            <Ask tag="architecture" q="Postgres or DynamoDB for a side project we might never scale?" />
            <Ask tag="prioritization" q="Ship the auth refactor as one PR or split into three?" />
            <Ask tag="naming" q="What should we call this endpoint, given we don't know the next two callers?" />
            <Ask tag="trade-offs" q="Spend the week on docs or polish the install?" />
          </dl>
          <p className="mt-6 text-sm text-zinc-500">
            Skip it for tactical work — bug fixes, test writing, regex
            explanation. Just answer those directly.
          </p>
        </section>

        {/* ── A NOTE ────────────────────────────────────────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            A note
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-700">
            Most people ask Claude and ChatGPT separately and reconcile the
            answers themselves. I wanted them to reconcile each other.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700">
            Team Room is a small plugin that lets the two models address
            each other by name, push back on each other&apos;s framing, and
            return one answer instead of two.
          </p>
          <p className="mt-6 text-sm text-zinc-500">— Costa</p>
        </section>

        {/* ── INSTALL ───────────────────────────────────────────── */}
        <section className="border-t border-zinc-200 py-16 sm:py-20">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Install
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            From inside a Claude Code session. Requires{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800">
              claude
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800">
              codex
            </code>{" "}
            CLIs on PATH.
          </p>
          <div className="mt-6">
            <InstallSnippet />
          </div>
          <div className="mt-6 flex items-center gap-5 text-xs tracking-[0.18em] text-zinc-500">
            <Link
              href="/docs"
              className="hover:text-zinc-900 transition-colors"
            >
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

        <footer className="border-t border-zinc-200 py-10 text-xs text-zinc-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
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
            <div className="tracking-[0.18em]">v0.1.1 · MIT</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4 sm:px-6">
        <Link
          href="/"
          aria-label="Team Room — home"
          className="text-sm font-semibold tracking-tight text-zinc-900"
        >
          Team Room
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
  );
}

function Stat({
  n,
  label,
  desc,
}: {
  n: string;
  label: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[7rem_1fr] sm:gap-8">
      <dt className="flex flex-col">
        <span className="text-4xl font-semibold tabular-nums tracking-tight text-zinc-950 sm:text-5xl">
          {n}
        </span>
        <span className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
          {label}
        </span>
      </dt>
      <dd className="text-base leading-relaxed text-zinc-700 sm:pt-2">
        {desc}
      </dd>
    </div>
  );
}

function Ask({ tag, q }: { tag: string; q: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="text-xs uppercase tracking-[0.16em] text-zinc-500">
        {tag}
      </dt>
      <dd className="text-base leading-relaxed text-zinc-800">{q}</dd>
    </div>
  );
}
