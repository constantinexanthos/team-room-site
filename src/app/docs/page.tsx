import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";

export const metadata = {
  title: "Docs — Team Room",
  description:
    "Install, the four outcomes, the dialogue protocol, and the MCP tool surface.",
};

// Docs is a single text-only page. No editorial chrome, no numbered eyebrows,
// no nav rails — just the reference, dense and scannable, in one column. The
// homepage shows what the product is; docs explains how to use it.

export default function DocsPage() {
  return (
    <div className="min-h-dvh bg-black text-[#e8e6e3]">
      {/* Minimal header — single line, no chrome */}
      <header className="border-b border-white/[0.06] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-[10px] tracking-[0.22em] text-white/45">
          <Link href="/" className="flex items-center gap-2.5 hover:text-white/85 transition-colors">
            <span aria-hidden className="relative inline-flex h-2.5 w-5">
              <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border border-amber-300/60" />
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-emerald-300/60" />
            </span>
            <span>TEAM ROOM</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-white/85 transition-colors">
              HOME
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

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="text-xl text-white">team-room / docs</h1>
        <p className="mt-3 text-sm text-white/55">
          A Claude Code MCP plugin. Install, ask, get a structured brief.
        </p>

        <section className="mt-12">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            01 / INSTALL
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Inside a Claude Code session:
          </p>
          <div className="mt-3">
            <InstallSnippet />
          </div>
          <p className="mt-4 text-sm text-white/55 leading-relaxed">
            Requires <Code>claude</Code> and <Code>codex</Code> CLIs on PATH.
            Repo:{" "}
            <a
              href="https://github.com/constantinexanthos/team-room"
              target="_blank"
              rel="noreferrer"
              className="text-white/85 underline underline-offset-4 decoration-white/30 hover:decoration-white/80 transition-all"
            >
              constantinexanthos/team-room
            </a>
            .
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            02 / USE
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Ask Claude in natural language. The skill (bundled with the plugin)
            tells Claude when to reach for team-room.
          </p>
          <pre className="mt-4 overflow-x-auto rounded border border-white/10 bg-white/[0.02] p-4 text-xs leading-relaxed text-white/75">
{`# you:
"Ask team-room: should we ship the auth refactor as one PR or split it?"

# claude:
team_room_ask({
  question: "Should we ship the auth refactor as one PR or split it?",
  mode: "dialogue",
  wait: true,
})`}
          </pre>
          <p className="mt-4 text-sm text-white/55 leading-relaxed">
            Claude and Codex deliberate over up to 8 short turns and return a
            structured <Code>final_brief</Code>.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            03 / THE FOUR OUTCOMES
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Every session ends in exactly one terminal state. The MCP tool
            surfaces <Code>outcome</Code> + <Code>final_brief</Code> as the
            primary artifact.
          </p>
          <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <Outcome dot="bg-emerald-300" name="converged" field="joint_read" desc="The team landed on a joint read for you. One to two sentences." />
            <Outcome dot="bg-amber-300" name="forked" field="fork" desc="Explicit unresolved disagreement, mapped — each agent's view + the deciding evidence." />
            <Outcome dot="bg-sky-300" name="timed-out" field="partial" desc="Max turns reached. The last turn's content is preserved." />
            <Outcome dot="bg-rose-300" name="failed" field="error" desc="An agent or orchestrator failure. One-line reason." />
          </dl>
        </section>

        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            04 / THE DIALOGUE PROTOCOL
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Dialogue mode is a function-labeled working session. Each turn opens
            with a tag; the orchestrator captures it as metadata and uses it for
            terminal-state detection.
          </p>
          <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <Tag name="frame" desc="Turn 1: decision + criteria + uncertainty + lens." />
            <Tag name="frame-clear" desc="Turn 1 fast-path: frame is obvious, skip to evidence." />
            <Tag name="reshape" desc="Turn 2: improve the frame before adding substance." />
            <Tag name="evidence · build · refine" desc="Mid-dialogue moves." />
            <Tag name="push-back" desc="Substantive disagreement, mapped not graded." />
            <Tag name="converge" desc="Terminal: joint read for the user." />
            <Tag name="fork" desc="Terminal: explicit unresolved disagreement." />
          </dl>
          <ul className="mt-5 space-y-3 text-sm text-white/70 leading-relaxed">
            <li>
              <strong className="text-white">Substantive uptake.</strong>{" "}
              Every non-first turn opens by naming what it&apos;s taking from
              the prior turn. Generic agreement is called out as collaboration
              theater.
            </li>
            <li>
              <strong className="text-white">Map the fork.</strong> Disagreement
              uses <em className="text-white/80 not-italic">condition under which the other&apos;s view is right</em> language, not scoring rubrics.
            </li>
            <li>
              <strong className="text-white">Asymmetry as lens.</strong> Claude
              and Codex surface their training-data differences explicitly
              (&ldquo;my UX lens flags…&rdquo; / &ldquo;my code-base prior
              says…&rdquo;).
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            05 / MCP TOOL SURFACE
          </h2>
          <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <Tool
              name="team_room_ask"
              desc="Open a session. Required: question. Optional: mode (dialogue|rounds), wait, timeout_s, topic, project_id. Returns outcome + final_brief + messages."
            />
            <Tool
              name="team_room_status"
              desc="Get state for a topic. In-flight: live status. Completed: idle + final_brief."
            />
            <Tool name="team_room_recent" desc="List recent topics by last-modified time." />
            <Tool name="team_room_cancel" desc="SIGTERM an in-flight orchestrator on a topic." />
          </dl>
        </section>

        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            06 / MODES
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70 leading-relaxed">
            <li>
              <Code>dialogue</Code> (default) — collaborative micro-turn working
              session. Use 99% of the time.
            </li>
            <li>
              <Code>rounds</Code> — opt-in adversarial review. R1 = parallel
              independent answers, R2 = each critiques the other&apos;s R1.
              Only when you explicitly want stress-testing.
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-[11px] tracking-[0.22em] text-white/45">
            07 / ENVIRONMENT
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            State lives at <Code>$TEAM_ROOM_DIR</Code> (default{" "}
            <Code>~/.team-room/</Code>). Per topic:{" "}
            <Code>{`<topic>.jsonl`}</Code>,{" "}
            <Code>{`<topic>.state.json`}</Code>,{" "}
            <Code>{`<topic>.brief.json`}</Code>.
          </p>
          <ul className="mt-5 space-y-1.5 text-xs text-white/55 leading-relaxed">
            <li><Code>TEAM_ROOM_MAX_TURNS=8</Code></li>
            <li><Code>TEAM_ROOM_TURN_WORDS=150</Code></li>
            <li><Code>TEAM_ROOM_AGENT_TIMEOUT=480</Code></li>
            <li><Code>CODEX_REASONING_EFFORT=high</Code></li>
          </ul>
        </section>

        <footer className="mt-20 border-t border-white/[0.06] pt-8 text-xs text-white/35">
          <Link href="/" className="hover:text-white/70 transition-colors">
            ← back to the room
          </Link>
        </footer>
      </main>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/[0.04] px-1.5 py-0.5 text-xs text-white/85">
      {children}
    </code>
  );
}

function Outcome({
  dot,
  name,
  field,
  desc,
}: {
  dot: string;
  name: string;
  field: string;
  desc: string;
}) {
  return (
    <div className="grid grid-cols-[12rem_1fr] gap-6 py-4">
      <dt className="flex items-center gap-2.5">
        <span className={`inline-block size-1.5 rounded-full ${dot}`} />
        <span className="text-sm text-white">{name}</span>
        <span className="text-[10px] text-white/35">
          final_brief.{field}
        </span>
      </dt>
      <dd className="text-sm text-white/65 leading-relaxed">{desc}</dd>
    </div>
  );
}

function Tag({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="grid grid-cols-[12rem_1fr] gap-6 py-3">
      <dt className="text-sm text-white">[{name}]</dt>
      <dd className="text-sm text-white/60 leading-relaxed">{desc}</dd>
    </div>
  );
}

function Tool({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="py-4">
      <dt className="text-sm text-white">{name}</dt>
      <dd className="mt-1.5 text-sm text-white/60 leading-relaxed">{desc}</dd>
    </div>
  );
}
