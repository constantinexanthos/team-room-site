import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";
import { PixelRobot } from "@/components/pixel-robot";

export const metadata = {
  title: "Docs · Team Room",
  description:
    "Install, the four outcomes, the dialogue protocol, the MCP tool surface, and the environment.",
};

export default function DocsPage() {
  return (
    <div className="min-h-dvh bg-white text-zinc-900">
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
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
          Docs
        </h1>
        <p className="mt-4 text-base text-zinc-600">
          A Claude Code MCP plugin. Install, ask, get a structured brief.
        </p>

        <Section title="Install">
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
              className="text-zinc-900 underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-900 transition-all"
            >
              constantinexanthos/team-room
            </a>
            .
          </p>
        </Section>

        <Section title="What gets installed">
          <p>The plugin bundles three things:</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
            <li>
              <strong className="text-zinc-900">An MCP stdio server</strong>{" "}
              that exposes four tools (<Mono>team_room_ask</Mono>,{" "}
              <Mono>team_room_status</Mono>, <Mono>team_room_recent</Mono>,{" "}
              <Mono>team_room_cancel</Mono>).
            </li>
            <li>
              <strong className="text-zinc-900">A skill</strong> that loads
              into Claude&apos;s context when the user asks a strategic
              question, telling Claude when to reach for the room.
            </li>
            <li>
              <strong className="text-zinc-900">Slash commands</strong>{" "}
              (<Mono>/team-room</Mono>, <Mono>/team-room-status</Mono>,{" "}
              <Mono>/team-room-rooms</Mono>) for direct invocation.
            </li>
          </ul>
        </Section>

        <Section title="Use">
          <p>
            Ask Claude in natural language. The skill picks it up and tells
            Claude to invoke the tool.
          </p>
          <pre className="mt-4 overflow-x-auto rounded border-2 border-zinc-900 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800">
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
            Claude and ChatGPT deliberate over up to 8 short turns, then
            return a structured <Mono>final_brief</Mono>.
          </p>
        </Section>

        <Section title="The four outcomes">
          <p>
            Every session ends in exactly one terminal state. The MCP tool
            surfaces <Mono>outcome</Mono> and <Mono>final_brief</Mono> as
            the primary artifact, with the full transcript in{" "}
            <Mono>messages</Mono> for expansion.
          </p>
          <dl className="mt-6 divide-y-2 divide-zinc-200 border-y-2 border-zinc-200">
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
              desc="Explicit unresolved disagreement, mapped. Each agent's view plus the deciding evidence."
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

        <Section title="The dialogue protocol">
          <p>
            Dialogue mode is a function-labeled working session. Each turn
            opens with a tag the orchestrator captures as metadata and uses
            for terminal-state detection.
          </p>
          <dl className="mt-6 divide-y-2 divide-zinc-200 border-y-2 border-zinc-200">
            <Tag name="frame" desc="Turn 1: decision, criteria, uncertainty, and lens." />
            <Tag
              name="frame-clear"
              desc="Turn 1 fast-path. The frame is obvious, skip straight to evidence."
            />
            <Tag
              name="reshape"
              desc="Turn 2: improve the frame before adding substance."
            />
            <Tag
              name="evidence / build / refine"
              desc="Mid-dialogue moves."
            />
            <Tag name="push-back" desc="Substantive disagreement, mapped not graded." />
            <Tag name="converge" desc="Terminal. Joint read for the user." />
            <Tag name="fork" desc="Terminal. Explicit unresolved disagreement." />
          </dl>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-700">
            <li>
              <strong className="text-zinc-900">Substantive uptake.</strong>{" "}
              Every non-first turn opens by naming what it&apos;s taking
              from the prior turn. Generic agreement is called out in
              prompt as collaboration theater.
            </li>
            <li>
              <strong className="text-zinc-900">Map the fork.</strong>{" "}
              Disagreement uses the &ldquo;condition under which the
              other&apos;s view is right&rdquo; framing, not scoring
              rubrics.
            </li>
            <li>
              <strong className="text-zinc-900">Asymmetry as lens.</strong>{" "}
              Claude and ChatGPT surface their training differences
              explicitly (&ldquo;my UX lens flags...&rdquo;, &ldquo;my
              code-base prior says...&rdquo;).
            </li>
          </ul>
        </Section>

        <Section title="MCP tool surface">
          <dl className="mt-2 divide-y-2 divide-zinc-200 border-y-2 border-zinc-200">
            <Tool
              name="team_room_ask"
              desc="Open a session. Required: question. Optional: mode (dialogue or rounds), wait, timeout_s, topic, project_id. Returns outcome, final_brief, and messages."
            />
            <Tool
              name="team_room_status"
              desc="Get state for a topic. While in-flight: live status. After completion: idle plus final_brief."
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

        <Section title="Modes">
          <ul className="mt-2 space-y-3 text-sm leading-relaxed text-zinc-700">
            <li>
              <Mono>dialogue</Mono> (default). Collaborative micro-turn
              working session. Use 99% of the time.
            </li>
            <li>
              <Mono>rounds</Mono>. Opt-in adversarial review. R1 = parallel
              independent answers. R2 = each critiques the other&apos;s R1.
              Only when you explicitly want stress-testing.
            </li>
          </ul>
        </Section>

        <Section title="What you see vs what runs">
          <p>
            You don&apos;t see the dialogue turns in your terminal. Claude
            calls <Mono>team_room_ask</Mono>, the plugin runs the
            deliberation in the background, and the response Claude quotes
            to you is the <Mono>joint_read</Mono> field. The full
            transcript is available in the tool-call output if you expand
            it.
          </p>
          <p className="mt-3">
            Sessions take 30 to 90 seconds typically (3 to 5 turns). While
            it&apos;s running, Claude shows the tool call as pending.
          </p>
        </Section>

        <Section title="Environment">
          <p>
            State lives at <Mono>$TEAM_ROOM_DIR</Mono> (default{" "}
            <Mono>~/.team-room/</Mono>). Per topic, three files:{" "}
            <Mono>{`<topic>.jsonl`}</Mono> (transcript),{" "}
            <Mono>{`<topic>.state.json`}</Mono> (live state),{" "}
            <Mono>{`<topic>.brief.json`}</Mono> (structured envelope).
          </p>
          <p className="mt-3">Tunables (all optional):</p>
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-zinc-600">
            <li><Mono>TEAM_ROOM_DIR=~/.team-room</Mono></li>
            <li><Mono>TEAM_ROOM_MAX_TURNS=8</Mono></li>
            <li><Mono>TEAM_ROOM_TURN_WORDS=150</Mono></li>
            <li><Mono>TEAM_ROOM_AGENT_TIMEOUT=480</Mono></li>
            <li><Mono>CODEX_REASONING_EFFORT=high</Mono></li>
          </ul>
        </Section>

        <footer className="mt-20 border-t-2 border-zinc-900 pt-8 text-xs text-zinc-500">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              &laquo; back home
            </Link>
            <span className="tracking-[0.18em]">v0.1.1 · MIT</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t-2 border-zinc-900 pt-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
        {children}
      </div>
    </section>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800">
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
    <div className="grid grid-cols-[10rem_1fr] gap-6 py-4">
      <dt className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2.5">
          <span className={`inline-block size-1.5 rounded-full ${dot}`} />
          <span className="text-sm font-bold text-zinc-900">{name}</span>
        </div>
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
    <div className="grid grid-cols-[10rem_1fr] gap-6 py-3">
      <dt className="font-mono text-sm font-bold text-zinc-900">[{name}]</dt>
      <dd className="text-sm text-zinc-600 leading-relaxed">{desc}</dd>
    </div>
  );
}

function Tool({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="py-4">
      <dt className="font-mono text-sm font-bold text-zinc-900">{name}</dt>
      <dd className="mt-1.5 text-sm text-zinc-600 leading-relaxed">{desc}</dd>
    </div>
  );
}
