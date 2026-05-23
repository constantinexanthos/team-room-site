import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";

// The homepage. Just an explainer. No animation. No characters. One column,
// terminal-style throughout, single font. The reader can scan top-to-bottom
// in 30 seconds and understand what Team Room is, what it does, and how to
// install it. /docs has the full reference; this page is the orientation.
export default function HomePage() {
  return (
    <div className="min-h-dvh bg-black text-[#e8e6e3]">
      {/* Tiny header */}
      <header className="border-b border-white/[0.06] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between text-[10px] tracking-[0.22em] text-white/45">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="relative inline-flex h-2.5 w-5">
              <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border border-amber-300/60" />
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-emerald-300/60" />
            </span>
            <span>TEAM ROOM</span>
          </div>
          <div className="flex items-center gap-5">
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
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section>
          <h1 className="text-2xl text-white sm:text-3xl">team-room</h1>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            A Claude Code plugin that lets{" "}
            <span className="text-amber-200">Claude</span> and{" "}
            <span className="text-emerald-200">Codex</span> deliberate on hard
            questions together and return one structured brief.
          </p>
          <div className="mt-7">
            <InstallSnippet />
          </div>
        </section>

        {/* ─── What it is ───────────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-[10px] tracking-[0.22em] text-white/45">
            01 / WHAT IT IS
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Team Room is a plugin for{" "}
            <Mono>claude code</Mono>. Installing it adds two things to your
            session:
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
            <li className="flex gap-3">
              <span className="text-white/35 select-none">·</span>
              <span>
                <span className="text-white">A skill</span> that loads into
                Claude&apos;s context when you ask a strategic question —
                architecture choices, prioritization, naming, trade-offs.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/35 select-none">·</span>
              <span>
                <span className="text-white">An MCP tool</span>{" "}
                (<Mono>team_room_ask</Mono>) that runs the deliberation between{" "}
                <span className="text-amber-200">Claude (Opus 4.7)</span> and{" "}
                <span className="text-emerald-200">Codex (gpt-5.5)</span> and
                returns the result.
              </span>
            </li>
          </ul>
        </section>

        {/* ─── How it works ─────────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-[10px] tracking-[0.22em] text-white/45">
            02 / HOW IT WORKS
          </h2>
          <ol className="mt-4 space-y-5 text-sm leading-relaxed text-white/75">
            <Step
              n="1"
              title="You ask Claude in plain language."
              detail={
                <>Inside any Claude Code session: <Mono>&quot;Postgres or DynamoDB for this side project?&quot;</Mono></>
              }
            />
            <Step
              n="2"
              title="The skill picks it up and Claude calls team-room."
              detail="Claude opens a room, passes the question, and waits."
            />
            <Step
              n="3"
              title="Claude and Codex deliberate over 3–5 short turns."
              detail="They address each other by name, build on each other's frames, and surface their different training lenses (Claude leans UX/safety, Codex leans code/infra)."
            />
            <Step
              n="4"
              title="One structured brief comes back."
              detail={
                <>
                  Claude quotes the joint read to you. The full transcript
                  is one click away in the expanded tool output.
                </>
              }
            />
          </ol>

          {/* Sample terminal output — a real captured session, static. */}
          <div className="mt-8">
            <div className="mb-2 flex items-center gap-2 text-[10px] tracking-[0.22em] text-white/35">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
              <span>SAMPLE · CONVERGED · 3 TURNS · 22s</span>
            </div>
            <pre className="overflow-x-auto rounded border border-white/10 bg-white/[0.015] p-5 text-[11.5px] leading-[1.7] text-white/70 sm:text-xs">
{`> What's the most defensible moat for an early-stage
  AI tools company?

  [claude · frame]
  The real decision: between proprietary data/evals vs.
  deep dev-workflow integrations — which compounds faster
  under capital constraints?

  [codex · reshape]
  Taking your narrowing move: the wedge is workflow
  integration, the moat is the data exhaust it produces.
  Distribution is acceleration, not defense.

  [claude · converge]
  Taking your reshape cleanly. One refinement: only the
  integrations wired to outcome signals (git, CI, review)
  produce a corpus competitors can't observe.

  **Joint read for Costa:** Pick (c) — but specifically,
  the workflow integration where you can observe outcomes
  (CI, merges, reverts), because that's the only version
  of (c) that produces a data corpus competitors can't
  replicate.`}
            </pre>
          </div>
        </section>

        {/* ─── When to use it ───────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-[10px] tracking-[0.22em] text-white/45">
            03 / WHEN TO USE IT
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Reach for it on the kinds of questions that genuinely benefit
            from two perspectives.
          </p>
          <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <Row label="Architecture" desc="Postgres or DynamoDB. Monorepo or split. Server- or client-side." />
            <Row label="Prioritization" desc="Ship now or polish. v0.2 or v1.0. Build or buy." />
            <Row label="Naming + API shape" desc="What should we call this. The right shape for this endpoint." />
            <Row label="Product trade-offs" desc="What's the moat. What's the v0.2 priority." />
            <Row label="Cross-domain calls" desc="Anything that benefits from BOTH a code/infra lens and a UX/product lens." />
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-white/45">
            Skip it for single-domain tactical work — fixing a bug, writing
            a test, explaining a regex. Just answer those directly.
          </p>
        </section>

        {/* ─── What comes back ──────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-[10px] tracking-[0.22em] text-white/45">
            04 / WHAT COMES BACK
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Every session ends in exactly one of four legible terminal
            states. The brief is the artifact you cite; the transcript is
            for inspection.
          </p>
          <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <Outcome dot="bg-emerald-300" name="converged" desc="The team landed on a joint read — one or two sentences, in final_brief.joint_read." />
            <Outcome dot="bg-amber-300" name="forked" desc="They flagged real, unresolved disagreement — both views plus the deciding evidence, in final_brief.fork." />
            <Outcome dot="bg-sky-300" name="timed-out" desc="Max turns reached. The last turn's content is preserved in final_brief.partial." />
            <Outcome dot="bg-rose-300" name="failed" desc="An orchestrator or agent failure. One-line reason in final_brief.error." />
          </dl>
        </section>

        {/* ─── Install again ────────────────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-[10px] tracking-[0.22em] text-white/45">
            05 / INSTALL
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            From inside a Claude Code session:
          </p>
          <div className="mt-4">
            <InstallSnippet />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            Requires <Mono>claude</Mono> and <Mono>codex</Mono> CLIs on
            PATH. The plugin bundles an MCP stdio server, a skill, and
            slash commands.
          </p>
        </section>

        {/* ─── Footer ───────────────────────────────────────────────────── */}
        <footer className="mt-20 border-t border-white/[0.06] pt-8 text-xs text-white/45">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              built by{" "}
              <a
                href="https://github.com/constantinexanthos"
                target="_blank"
                rel="noreferrer"
                className="text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white/80 transition-all"
              >
                costa xanthos
              </a>
            </div>
            <div className="flex items-center gap-5 text-[10px] tracking-[0.22em]">
              <Link href="/docs" className="hover:text-white/80 transition-colors">
                FULL DOCS
              </Link>
              <a
                href="https://github.com/constantinexanthos/team-room"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                GITHUB
              </a>
              <span className="text-white/30">v0.1.1 · MIT</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[0.92em] text-white/85">
      {children}
    </code>
  );
}

function Step({
  n,
  title,
  detail,
}: {
  n: string;
  title: string;
  detail: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[1.5rem_1fr] gap-4">
      <span className="text-[10px] tracking-[0.22em] text-white/35 pt-1">{n}</span>
      <div>
        <div className="text-white">{title}</div>
        <div className="mt-1 text-sm text-white/55">{detail}</div>
      </div>
    </li>
  );
}

function Row({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-4 py-3.5">
      <dt className="text-sm text-white">{label}</dt>
      <dd className="text-sm text-white/55">{desc}</dd>
    </div>
  );
}

function Outcome({ dot, name, desc }: { dot: string; name: string; desc: string }) {
  return (
    <div className="grid grid-cols-[10rem_1fr] gap-4 py-4">
      <dt className="flex items-center gap-2.5">
        <span className={`inline-block size-1.5 rounded-full ${dot}`} />
        <span className="text-sm text-white">{name}</span>
      </dt>
      <dd className="text-sm text-white/60">{desc}</dd>
    </div>
  );
}
