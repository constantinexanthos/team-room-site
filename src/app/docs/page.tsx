import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";

export const metadata = {
  title: "Docs — Team Room",
  description:
    "Install, the four outcomes, the dialogue protocol, and the MCP tool surface.",
};

export default function DocsPage() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
      <header className="border-b border-zinc-200/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xs tracking-[0.22em] text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <span aria-hidden className="relative inline-flex h-2.5 w-5">
              <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border border-amber-600/70" />
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-emerald-600/70" />
            </span>
            <span>TEAM ROOM</span>
          </Link>
          <div className="flex items-center gap-5 text-xs tracking-[0.18em] text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              HOME
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
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          team-room <span className="text-zinc-400">/ docs</span>
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          A Claude Code MCP plugin. Install, ask, get a structured brief.
        </p>

        <Section num="01" title="Install">
          <p>Inside a Claude Code session:</p>
          <div className="my-4">
            <InstallSnippet />
          </div>
          <p>
            Requires <Mono>claude</Mono> and <Mono>codex</Mono> CLIs on PATH.
            Repo:{" "}
            <a
              href="https://github.com/constantinexanthos/team-room"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-all"
            >
              constantinexanthos/team-room
            </a>
            .
          </p>
        </Section>

        <Section num="02" title="Use">
          <p>
            Ask Claude in natural language. The skill (bundled with the
            plugin) tells Claude when to reach for team-room.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800">
{`# you:
"Ask team-room: should we ship the auth refactor as one PR or split it?"

# claude:
team_room_ask({
  question: "Should we ship the auth refactor as one PR or split it?",
  mode: "dialogue",
  wait: true,
})`}
          </pre>
          <p className="mt-4">
            Claude and ChatGPT deliberate over up to 8 short turns and return
            a structured <Mono>final_brief</Mono>.
          </p>
        </Section>

        <Section num="03" title="The four outcomes">
          <p>
            Every session ends in exactly one terminal state. The MCP tool
            surfaces <Mono>outcome</Mono> + <Mono>final_brief</Mono> as the
            primary artifact.
          </p>
          <dl className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200">
            <Outcome
              dot="bg-emerald-500"
              name="converged"
              field="joint_read"
              desc="The team landed on a joint read for you. One to two sentences."
            />
            <Outcome
              dot="bg-amber-500"
              name="forked"
              field="fork"
              desc="Explicit unresolved disagreement, mapped — each agent's view + the deciding evidence."
            />
            <Outcome
              dot="bg-sky-500"
              name="timed-out"
              field="partial"
              desc="Max turns reached. The last turn's content is preserved."
            />
            <Outcome
              dot="bg-rose-500"
              name="failed"
              field="error"
              desc="An agent or orchestrator failure. One-line reason."
            />
          </dl>
        </Section>

        <Section num="04" title="The dialogue protocol">
          <p>
            Dialogue mode is a function-labeled working session. Each turn
            opens with a tag the orchestrator captures as metadata and uses
            for terminal-state detection.
          </p>
          <dl className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200">
            <Tag name="frame" desc="Turn 1: decision + criteria + uncertainty + lens." />
            <Tag
              name="frame-clear"
              desc="Turn 1 fast-path: frame is obvious, skip to evidence."
            />
            <Tag
              name="reshape"
              desc="Turn 2: improve the frame before adding substance."
            />
            <Tag
              name="evidence · build · refine"
              desc="Mid-dialogue moves."
            />
            <Tag name="push-back" desc="Substantive disagreement, mapped not graded." />
            <Tag name="converge" desc="Terminal: joint read for the user." />
            <Tag name="fork" desc="Terminal: explicit unresolved disagreement." />
          </dl>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-700">
            <li>
              <strong className="text-zinc-900">Substantive uptake.</strong>{" "}
              Every non-first turn opens by naming what it&apos;s taking from
              the prior turn. Generic agreement is called out as
              collaboration theater.
            </li>
            <li>
              <strong className="text-zinc-900">Map the fork.</strong>{" "}
              Disagreement uses{" "}
              <em className="text-zinc-700 not-italic">condition under which the other&apos;s view is right</em>{" "}
              language, not scoring rubrics.
            </li>
            <li>
              <strong className="text-zinc-900">Asymmetry as lens.</strong>{" "}
              Claude and ChatGPT surface their training-data differences
              explicitly (&ldquo;my UX lens flags…&rdquo; / &ldquo;my
              code-base prior says…&rdquo;).
            </li>
          </ul>
        </Section>

        <Section num="05" title="MCP tool surface">
          <dl className="mt-2 divide-y divide-zinc-200 border-y border-zinc-200">
            <Tool
              name="team_room_ask"
              desc="Open a session. Required: question. Optional: mode (dialogue|rounds), wait, timeout_s, topic, project_id. Returns outcome + final_brief + messages."
            />
            <Tool
              name="team_room_status"
              desc="Get state for a topic. In-flight: live status. Completed: idle + final_brief."
            />
            <Tool
              name="team_room_recent"
              desc="List recent topics by last-modified time."
            />
            <Tool
              name="team_room_cancel"
              desc="SIGTERM an in-flight orchestrator on a topic."
            />
          </dl>
        </Section>

        <Section num="06" title="Modes">
          <ul className="mt-2 space-y-3 text-sm leading-relaxed text-zinc-700">
            <li>
              <Mono>dialogue</Mono> (default) — collaborative micro-turn
              working session. Use 99% of the time.
            </li>
            <li>
              <Mono>rounds</Mono> — opt-in adversarial review. R1 = parallel
              independent answers, R2 = each critiques the other&apos;s R1.
              Only when you explicitly want stress-testing.
            </li>
          </ul>
        </Section>

        <Section num="07" title="Environment">
          <p>
            State lives at <Mono>$TEAM_ROOM_DIR</Mono> (default{" "}
            <Mono>~/.team-room/</Mono>). Per topic:{" "}
            <Mono>{`<topic>.jsonl`}</Mono>,{" "}
            <Mono>{`<topic>.state.json`}</Mono>,{" "}
            <Mono>{`<topic>.brief.json`}</Mono>.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-zinc-600">
            <li><Mono>TEAM_ROOM_MAX_TURNS=8</Mono></li>
            <li><Mono>TEAM_ROOM_TURN_WORDS=150</Mono></li>
            <li><Mono>TEAM_ROOM_AGENT_TIMEOUT=480</Mono></li>
            <li><Mono>CODEX_REASONING_EFFORT=high</Mono></li>
          </ul>
        </Section>

        <footer className="mt-20 border-t border-zinc-200 pt-8 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            ← back to the room
          </Link>
        </footer>
      </main>
    </div>
  );
}

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <div className="font-mono text-[10px] tracking-[0.22em] text-zinc-500">
        {num} / {title.toUpperCase()}
      </div>
      <h2 className="mt-3 text-xl font-semibold text-zinc-900">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
        {children}
      </div>
    </section>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-900">
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
        <span className="text-sm font-medium text-zinc-900">{name}</span>
        <span className="font-mono text-[10px] text-zinc-400">
          final_brief.{field}
        </span>
      </dt>
      <dd className="text-sm text-zinc-600 leading-relaxed">{desc}</dd>
    </div>
  );
}

function Tag({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="grid grid-cols-[12rem_1fr] gap-6 py-3">
      <dt className="font-mono text-sm text-zinc-900">[{name}]</dt>
      <dd className="text-sm text-zinc-600 leading-relaxed">{desc}</dd>
    </div>
  );
}

function Tool({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="py-4">
      <dt className="font-mono text-sm text-zinc-900">{name}</dt>
      <dd className="mt-1.5 text-sm text-zinc-600 leading-relaxed">{desc}</dd>
    </div>
  );
}
