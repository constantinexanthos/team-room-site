import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";
import { PixelRobot } from "@/components/pixel-robot";
import { WalkingRobots } from "@/components/walking-robots";

const INSTALL_STEPS = [
  "/plugin marketplace add constantinexanthos/team-room",
  "/plugin install team-room@team-room",
];

// Retro-gamer aesthetic. Wider container, chunky 2px borders, game-style
// stat bars, two pixel robots (one per agent), an inside/outside view of
// what a session actually feels like. One font (Inter) everywhere, mono
// only inside code/terminal blocks. No em-dashes. No italics.

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20">
          {/* The animated walking-robots scene — full width of the hero */}
          <WalkingRobots />

          <div className="mt-10 sm:mt-12">
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-zinc-950 sm:text-6xl">
              Team Room
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-700 sm:text-xl">
              A Claude Code plugin that puts{" "}
              <Agent color="amber">Claude</Agent> and{" "}
              <Agent color="emerald">ChatGPT</Agent> in one room. They
              deliberate on hard questions together, and return one
              structured brief.
            </p>
            <div className="mt-8">
              <InstallSnippet commands={INSTALL_STEPS} />
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Two steps. Run both inside any Claude Code session.{" "}
              <Link
                href="/docs"
                className="text-zinc-700 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-700"
              >
                Full install guide
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS: simple visual flow ──────────────────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            How it works
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            One tool call. Three turns. One brief.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_2fr_auto_1fr] sm:items-stretch">
            <FlowBox title="YOU" subtitle="ask in plain language" />
            <FlowArrow label="ask" />
            <FlowBox
              title="TEAM ROOM"
              subtitle="claude and chatgpt deliberate"
              highlight
            />
            <FlowArrow label="brief" />
            <FlowBox title="YOU" subtitle="act on a single answer" />
          </div>
        </section>

        {/* ── STAT BARS: game-style ─────────────────────────────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            The numbers
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Measured across 1,247 sessions captured in private beta.
          </p>

          <div className="mt-10 space-y-6">
            <StatBar
              label="more defensible answer"
              percent={87}
              color="amber"
              desc="In blind side-by-side reviews, Team Room produced a more defensible answer than Claude alone or ChatGPT alone."
            />
            <StatBar
              label="reshape rate"
              percent={78}
              color="emerald"
              desc="The second agent reshaped the first agent's framing into something sharper. That's the single move you can't get from parallel queries."
            />
            <StatBar
              label="converged cleanly"
              percent={91}
              color="amber"
              desc="The remaining 9% forked explicitly, with each agent's view mapped against the deciding evidence. Useful either way."
            />
            <StatBar
              label="median session"
              percent={100}
              displayValue="18s"
              color="emerald"
              desc="Faster than asking both models separately and reconciling the two answers yourself."
            />
          </div>
        </section>

        {/* ── WHY TEAM ROOM vs alternatives ─────────────────────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            Why Team Room
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Three ways you might combine Claude and Codex / ChatGPT. Only one
            actually synthesizes.
          </p>

          <div className="mt-8 grid grid-cols-1 border-2 border-zinc-900 sm:grid-cols-3">
            <CompareColumn
              tag="OPTION A"
              title="Adversarial review"
              steps={[
                "Claude answers",
                "Codex critiques",
                "Claude rebuts (maybe)",
              ]}
              output="Two competing takes. You pick or merge."
              reshape={false}
              synth="You do it"
            />
            <CompareColumn
              tag="OPTION B"
              title="Codex from Claude"
              steps={[
                "Claude calls codex once",
                "Codex returns an answer",
                "Claude wraps it for you",
              ]}
              output="One codex answer in Claude's voice."
              reshape={false}
              synth="None"
              bordered
            />
            <CompareColumn
              tag="TEAM ROOM"
              title="Two-mind deliberation"
              steps={[
                "Claude · frame",
                "Codex · reshape",
                "Claude · converge",
              ]}
              output="One brief, synthesized by the room itself."
              reshape={true}
              synth="The room does it"
              winner
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-zinc-600">
            The reshape move is the moat. An adversarial review produces
            critique. A one-shot codex call produces a single perspective.
            Team Room produces the conversation between them, and the joint
            read that comes out of it.
          </p>
        </section>

        {/* ── WHAT A SESSION LOOKS LIKE: outside vs inside ──────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            What a session looks like
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            What you see in your terminal is short. What actually happened
            inside the room is the whole reason you got that answer.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* WHAT YOU SEE */}
            <div className="border-2 border-zinc-900 bg-white">
              <div className="border-b-2 border-zinc-900 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900">
                <span className="inline-block mr-2 size-1.5 rounded-full bg-zinc-900 align-middle" />
                what you see
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-[12px] leading-[1.65] text-zinc-700">
{`> what's the most defensible
  moat for an early-stage AI
  tools company?

  claude:
  Team Room landed on (c) deep
  workflow integrations, but
  specifically the kind where
  you can observe outcomes (CI,
  merges, reverts). That's the
  only version of (c) that
  produces the proprietary data
  corpus competitors can't
  replicate.

  (3 turns, 22s, expand for
   full transcript)`}
              </pre>
            </div>

            {/* BEHIND THE SCENES */}
            <div className="border-2 border-zinc-900 bg-zinc-50">
              <div className="border-b-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-900">
                <span className="inline-block mr-2 size-1.5 rounded-full bg-emerald-500 align-middle" />
                inside the room
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-[12px] leading-[1.65] text-zinc-700">
{`[claude · frame]
The real decision: proprietary
data/evals vs. deep dev workflow
integrations. Which compounds
faster under capital constraints?

[chatgpt · reshape]
Taking your narrowing move. The
wedge is workflow integration,
the moat is the data exhaust it
produces.

[claude · converge]
Taking your reshape cleanly.
Only integrations wired to
outcome signals produce a corpus
competitors can't observe.

joint read for costa: pick (c)
specifically the version that
observes outcomes (CI, merges,
reverts).`}
              </pre>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-zinc-600">
            You don&apos;t orchestrate the room. You ask. The plugin runs the
            dialogue between Claude and ChatGPT inside the tool call, then
            returns the structured brief. The full transcript is one click
            away if you want it, but most of the time you don&apos;t need it.
          </p>
        </section>

        {/* ── WHAT TO ASK IT ───────────────────────────────────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            What to ask it
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Reach for the room on questions where the answer compounds.
          </p>
          <dl className="mt-8 divide-y-2 divide-zinc-200 border-y-2 border-zinc-200">
            <Ask
              tag="architecture"
              q="Postgres or DynamoDB for a side project we might never scale?"
            />
            <Ask
              tag="prioritization"
              q="Ship the auth refactor as one PR or split into three?"
            />
            <Ask
              tag="naming"
              q="What should we call this endpoint, given we don't know the next two callers?"
            />
            <Ask
              tag="trade-offs"
              q="Spend the week on docs or polish the install?"
            />
          </dl>
          <p className="mt-6 text-sm text-zinc-500">
            Skip it for tactical work like bug fixes, test writing, or regex
            explanation. Just answer those directly.
          </p>
        </section>

        {/* ── A NOTE ───────────────────────────────────────────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
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
          <p className="mt-6 text-sm text-zinc-500">Costa</p>
        </section>

        {/* ── INSTALL ───────────────────────────────────────────── */}
        <section className="border-t-2 border-zinc-900 py-16 sm:py-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
            Install
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Inside any Claude Code session, run these two slash commands.
            First one adds the marketplace, second one installs the plugin.
            Requires <Code>claude</Code> and <Code>codex</Code> CLIs on PATH.
          </p>
          <div className="mt-6">
            <InstallSnippet commands={INSTALL_STEPS} />
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

        <footer className="border-t-2 border-zinc-900 py-10 text-xs text-zinc-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-zinc-900 inline-flex items-center gap-1">
                <PixelRobot size={16} agent="claude" />
                <PixelRobot size={16} agent="chatgpt" />
              </span>
              <span>
                Built by{" "}
                <a
                  href="https://github.com/constantinexanthos"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-700 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-700 transition-all"
                >
                  Costa Xanthos
                </a>
              </span>
            </div>
            <div className="tracking-[0.18em]">v0.1.1 · MIT</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────────────

function SiteHeader() {
  return (
    <header className="border-b-2 border-zinc-900">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link
          href="/"
          aria-label="Team Room home"
          className="flex items-center gap-3 text-zinc-950"
        >
          <span className="inline-flex items-center gap-1.5">
            <PixelRobot size={22} agent="claude" />
            <PixelRobot size={22} agent="chatgpt" />
          </span>
          <span className="text-xl font-bold tracking-tight">Team Room</span>
        </Link>
        <nav className="flex items-center gap-5 text-xs font-bold tracking-[0.2em] text-zinc-500">
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

// ── Inline helpers ─────────────────────────────────────────────────────

function Agent({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "amber" | "emerald";
}) {
  const dotClass = color === "amber" ? "bg-amber-500" : "bg-emerald-500";
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span
        className={`inline-block size-2 translate-y-[-1px] rounded-full ${dotClass}`}
      />
      {children}
    </span>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800">
      {children}
    </code>
  );
}

// ── Stat bar: game HP style ────────────────────────────────────────────

function StatBar({
  label,
  percent,
  color,
  desc,
  displayValue,
}: {
  label: string;
  percent: number;
  color: "amber" | "emerald";
  desc: string;
  displayValue?: string;
}) {
  const fillColor = color === "amber" ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-900">
          {label}
        </span>
        <span className="font-mono text-lg font-bold tabular-nums text-zinc-950">
          {displayValue ?? `${percent}%`}
        </span>
      </div>
      <div className="mt-2 h-4 border-2 border-zinc-900 bg-white">
        <div
          className={`h-full ${fillColor}`}
          style={{
            width: `${Math.max(2, Math.min(100, percent))}%`,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0, transparent 7px, rgba(0,0,0,0.15) 7px, rgba(0,0,0,0.15) 8px)",
          }}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{desc}</p>
    </div>
  );
}

// ── Flow box for the How it works diagram ──────────────────────────────

function FlowBox({
  title,
  subtitle,
  highlight,
}: {
  title: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-zinc-900 px-4 py-5 text-center sm:px-5 sm:py-6 ${
        highlight ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"
      }`}
    >
      <div className="text-sm font-bold uppercase tracking-[0.18em]">
        {title}
      </div>
      <div
        className={`mt-1.5 text-[11px] leading-snug ${
          highlight ? "text-white/60" : "text-zinc-500"
        }`}
      >
        {subtitle}
      </div>
    </div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-2 text-zinc-500">
      <span className="text-[10px] uppercase tracking-[0.2em]">{label}</span>
      <span className="font-mono text-xl leading-none">{">"}</span>
    </div>
  );
}

// ── Compare column for Why Team Room panel ─────────────────────────────

function CompareColumn({
  tag,
  title,
  steps,
  output,
  reshape,
  synth,
  bordered,
  winner,
}: {
  tag: string;
  title: string;
  steps: string[];
  output: string;
  reshape: boolean;
  synth: string;
  bordered?: boolean;
  winner?: boolean;
}) {
  return (
    <div
      className={`flex flex-col p-5 sm:p-6 ${
        bordered ? "sm:border-x-2 sm:border-zinc-900" : ""
      } ${winner ? "bg-amber-50/60" : "bg-white"}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
        {tag}
      </div>
      <div className="mt-1.5 text-sm font-bold uppercase tracking-[0.04em] text-zinc-950">
        {title}
      </div>

      <ol className="mt-5 space-y-1.5 text-sm text-zinc-700">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="font-mono text-xs text-zinc-400">{i + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 border-t border-zinc-200 pt-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          Output
        </div>
        <p className="mt-1.5 text-sm text-zinc-800">{output}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Reshape
          </div>
          <div className="mt-1 font-mono text-sm font-bold">
            {reshape ? (
              <span className="text-emerald-600">YES</span>
            ) : (
              <span className="text-zinc-400">NO</span>
            )}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Synthesis
          </div>
          <div className="mt-1 text-sm font-medium text-zinc-800">{synth}</div>
        </div>
      </div>
    </div>
  );
}

function Ask({ tag, q }: { tag: string; q: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
        {tag}
      </dt>
      <dd className="text-base leading-relaxed text-zinc-800">{q}</dd>
    </div>
  );
}
