import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { HeroScene } from "@/components/hero-scene";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";
import { Wordmark } from "@/components/wordmark";
import {
  Layers,
  GitFork,
  Workflow,
  Tag,
  Scale,
  CheckCircle2,
} from "lucide-react";

// Use-cases — what to actually ask Team Room. These are the question shapes
// the cross-model deliberation pulls real value on.
const USE_CASES = [
  {
    title: "Architecture choices",
    icon: Layers,
    description:
      "Postgres or DynamoDB. Monorepo or split. Server- or client-side. Calls where one option compounds and the other doesn't.",
  },
  {
    title: "Prioritization",
    icon: GitFork,
    description:
      "Ship now or polish. v0.2 or v1.0. Build, buy, or rent. The trade-off you've been circling for a week.",
  },
  {
    title: "Naming + API shape",
    icon: Tag,
    description:
      "What should we call this. Right shape for this endpoint. The names you'll regret in six months if you ship them too fast.",
  },
  {
    title: "Product trade-offs",
    icon: Scale,
    description:
      "What's the moat. What earns the next user. Where does the budget actually buy retention.",
  },
  {
    title: "Cross-domain calls",
    icon: Workflow,
    description:
      "Anything that benefits from both a code/infra read (ChatGPT) and a UX/product read (Claude). The room is built for these.",
  },
  {
    title: "Structured answer",
    icon: CheckCircle2,
    description:
      "Every session ends in one of four states — converged, forked, timed-out, failed — with a parsed brief, not a wall of text.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      {/* ─── HEADER ────────────────────────────────────────────────────── */}
      <header className="border-b border-zinc-200/80">
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

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ─── HERO: dark card with spline + spotlight ─────────────────── */}
        <section className="pt-10 sm:pt-14">
          <Card className="relative w-full h-[560px] sm:h-[520px] overflow-hidden border border-zinc-200 bg-zinc-950 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />

            <div className="flex h-full flex-col md:flex-row">
              {/* Left: copy + install */}
              <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10">
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                  MCP PLUGIN · CLAUDE CODE
                </div>
                <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Claude and ChatGPT,
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-emerald-300">
                    working together.
                  </span>
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                  Team Room is a meeting between two AI minds. Ask hard
                  questions — architecture, naming, trade-offs — and get back
                  one structured brief instead of two parallel answers.
                </p>
                <div className="mt-7">
                  <InstallSnippet variant="dark" />
                </div>
              </div>

              {/* Right: Two-robot custom SVG scene — the actual product visual */}
              <div className="relative flex-1 hidden md:block">
                <HeroScene />
              </div>
            </div>
          </Card>
        </section>

        {/* ─── WHAT IT IS ──────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500">
                01 / WHAT IT IS
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                A skill and a tool. <br />
                That&apos;s the whole plugin.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 text-sm leading-relaxed text-zinc-600 sm:text-base">
              <p>
                Installing Team Room adds two things to your Claude Code
                session: a <strong className="text-zinc-900">skill</strong> that
                loads into Claude&apos;s context when you ask a strategic
                question, and an{" "}
                <strong className="text-zinc-900">MCP tool</strong>{" "}
                (<code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em]">team_room_ask</code>)
                that runs the deliberation between Claude and ChatGPT.
              </p>
              <p>
                You ask in natural language. Claude calls the room. The two
                models address each other by name, build on each other&apos;s
                frames, and return one structured brief. You don&apos;t do the
                synthesis — the room does.
              </p>
              <p>
                It&apos;s a small plugin. The whole point is that it fits in
                your existing terminal workflow and adds one tool you can
                reach for when a question deserves more than one perspective.
              </p>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS: numbered steps + terminal sample ──────────── */}
        <section className="py-14 sm:py-20 border-t border-zinc-200">
          <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500">
            02 / HOW IT WORKS
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Four turns. One brief.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <ol className="md:col-span-5 space-y-7 text-sm text-zinc-700">
              <Step n="1" title="You ask in plain language.">
                Inside any Claude Code session:{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em]">
                  &quot;Postgres or DynamoDB for this project?&quot;
                </code>
              </Step>
              <Step n="2" title="The skill triggers, Claude opens the room.">
                Claude calls <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em]">team_room_ask</code> and waits.
              </Step>
              <Step
                n="3"
                title="Claude and ChatGPT deliberate over 3–5 turns."
              >
                They address each other by name, surface their different
                training lenses, and reshape the question into something
                sharper.
              </Step>
              <Step n="4" title="One structured brief comes back.">
                Claude quotes the joint read to you. The transcript is in the
                expanded tool output.
              </Step>
            </ol>

            <div className="md:col-span-7">
              <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-500/70" />
                    <span className="size-2.5 rounded-full bg-amber-400/70" />
                    <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/40">
                    CONVERGED · 3 TURNS · 22s
                  </span>
                </div>
                <pre className="overflow-x-auto px-5 py-5 text-[11.5px] leading-[1.7] text-white/75 sm:text-xs">
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

  Joint read for Costa: Pick (c) — but specifically,
  the workflow integration where you can observe outcomes
  (CI, merges, reverts). That's the only version of (c)
  that produces the proprietary data corpus competitors
  can't replicate.`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── USE CASES: grid feature cards ───────────────────────────── */}
        <section className="py-14 sm:py-20 border-t border-zinc-200">
          <div className="mb-10">
            <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500">
              03 / WHAT TO ASK IT
            </div>
            <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Questions that deserve more than one perspective.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              Skip Team Room for single-domain tactical work — bug fixes, test
              writing, regex explanation. Reach for it when the answer
              compounds.
            </p>
          </div>
          <div className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed border-zinc-200 sm:grid-cols-2 md:grid-cols-3">
            {USE_CASES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </section>

        {/* ─── CTA / INSTALL ───────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-t border-zinc-200">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              One command to install.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              From inside any Claude Code session. Requires the{" "}
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
          </div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
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

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[1.5rem_1fr] gap-4">
      <span className="font-mono text-[10px] tracking-[0.22em] text-zinc-400 pt-0.5">
        {n}
      </span>
      <div>
        <div className="font-medium text-zinc-900">{title}</div>
        <div className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
          {children}
        </div>
      </div>
    </li>
  );
}
