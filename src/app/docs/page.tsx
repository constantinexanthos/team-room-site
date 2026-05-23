import { InstallSnippet } from "@/components/install-snippet";
import { GithubIcon } from "@/components/icons";

export const metadata = {
  title: "Docs — Team Room",
  description:
    "Install, the four outcomes, the dialogue protocol, and the MCP tool surface.",
};

const TOC = [
  { id: "install", label: "Install", num: "01" },
  { id: "quick-start", label: "Quick start", num: "02" },
  { id: "outcomes", label: "The four outcomes", num: "03" },
  { id: "protocol", label: "The dialogue protocol", num: "04" },
  { id: "tools", label: "MCP tool surface", num: "05" },
  { id: "modes", label: "Dialogue vs rounds", num: "06" },
  { id: "environment", label: "Environment", num: "07" },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
      {/* Header */}
      <header className="grid grid-cols-12 gap-x-8 gap-y-6 border-b border-foreground/[0.08] pb-12">
        <div className="col-span-12 lg:col-span-4">
          <span className="tr-eyebrow-number" data-num="04">
            Docs · v0.1.1
          </span>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <h1 className="tr-display !text-[clamp(2.25rem,4.8vw,4.25rem)]">
            Team Room <em>docs</em>.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.65] text-foreground/72">
            A small, opinionated Claude Code MCP plugin. Install, ask, get a
            structured brief.
          </p>
        </div>
      </header>

      <div className="mt-14 grid grid-cols-12 gap-x-10">
        {/* Sidebar TOC — sticky, editorial */}
        <nav
          aria-label="Docs navigation"
          className="col-span-12 lg:col-span-3 lg:sticky lg:top-24 lg:self-start mb-10 lg:mb-0"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-4">
            Contents
          </div>
          <ol className="space-y-2.5">
            {TOC.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group inline-flex items-baseline gap-2.5 text-[13.5px] text-foreground/65 hover:text-foreground transition-colors"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-amber-300/80 transition-colors">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Body */}
        <article className="col-span-12 lg:col-span-9 max-w-[68ch]">
          <Section id="install" num="01" title="Install">
            <Para>Team Room is a Claude Code plugin. From a Claude Code session:</Para>
            <div className="my-5">
              <InstallSnippet />
            </div>
            <Para>
              Repo lives at{" "}
              <a
                href="https://github.com/constantinexanthos/team-room"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 border-b border-foreground/30 hover:border-foreground/80 pb-px transition-colors"
              >
                <GithubIcon className="size-3.5" />
                constantinexanthos/team-room
              </a>
              . The plugin bundles an MCP stdio server alongside slash commands;
              requires Claude CLI and Codex CLI on PATH.
            </Para>
          </Section>

          <Section id="quick-start" num="02" title="Quick start">
            <Para>
              Inside any Claude Code session, ask Claude to invoke team-room
              with natural language:
            </Para>
            <Code>
{`# Costa says (natural language):
"Ask team-room: should we ship the auth refactor as one PR or split it?"

# Claude calls:
team_room_ask({
  question: "Should we ship the auth refactor as one PR or split it?",
  mode: "dialogue",
  wait: true,
})`}
            </Code>
            <Para>
              Claude and Codex deliberate over up to 8 short turns and return a
              structured <Mono>final_brief</Mono> with the joint read.
            </Para>
          </Section>

          <Section id="outcomes" num="03" title="The four outcomes">
            <Para>
              Every session ends in exactly one of four terminal states. The MCP
              tool surfaces <Mono>outcome</Mono> + <Mono>final_brief</Mono> as
              the primary artifact; the full transcript is in <Mono>messages</Mono>{" "}
              for expansion.
            </Para>
            <div className="my-6 divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">
              <OutcomeRow
                color="emerald"
                tag="converged"
                field="final_brief.joint_read"
                desc="One to two sentences — the actual answer."
              />
              <OutcomeRow
                color="amber"
                tag="forked"
                field="final_brief.fork"
                desc="Each agent's view + the deciding evidence."
              />
              <OutcomeRow
                color="sky"
                tag="timed-out"
                field="final_brief.partial"
                desc="Last turn's content; progress isn't lost."
              />
              <OutcomeRow
                color="rose"
                tag="failed"
                field="final_brief.error"
                desc="One-line reason an agent or orchestrator failed."
              />
            </div>
          </Section>

          <Section id="protocol" num="04" title="The dialogue protocol">
            <Para>
              Dialogue mode is a function-labeled working session. Each turn
              opens with a tag the system captures as metadata and uses to
              detect terminal moves.
            </Para>
            <div className="my-5 divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">
              <TagRow tag="frame" desc="Turn 1: decision + criteria + uncertainty + lens" />
              <TagRow
                tag="frame-clear"
                desc="Turn 1 fast-path: frame is obvious, go to evidence"
              />
              <TagRow
                tag="reshape"
                desc="Turn 2: improve the frame before adding substance"
              />
              <TagRow
                tag="evidence · build · refine"
                desc="Mid-dialogue moves"
              />
              <TagRow
                tag="push-back"
                desc="Substantive disagreement, mapped not graded"
              />
              <TagRow tag="converge" desc="Terminal: joint read for the user" />
              <TagRow tag="fork" desc="Terminal: explicit unresolved disagreement" />
            </div>
            <Para>The protocol enforces three rules:</Para>
            <ul className="mt-3 space-y-3 text-[15px] leading-[1.65] text-foreground/82">
              <Bullet>
                <strong className="text-foreground font-medium">
                  Substantive uptake.
                </strong>{" "}
                Every non-first turn opens by naming what it&apos;s taking from
                the prior turn. Generic agreement is called out in-prompt as
                collaboration theater.
              </Bullet>
              <Bullet>
                <strong className="text-foreground font-medium">
                  Map the fork.
                </strong>{" "}
                Disagreement uses <em>condition under which the other&apos;s
                view is right</em> language, not scoring rubrics.
              </Bullet>
              <Bullet>
                <strong className="text-foreground font-medium">
                  Asymmetry as lens.
                </strong>{" "}
                Claude and Codex surface their training-data differences
                explicitly (&ldquo;my UX lens flags…&rdquo;, &ldquo;my
                code-base-heavy prior says…&rdquo;).
              </Bullet>
            </ul>
          </Section>

          <Section id="tools" num="05" title="MCP tool surface">
            <Para>
              Four tools, all under <Mono>team_room_*</Mono>:
            </Para>
            <div className="my-5 space-y-4">
              <ToolDoc
                name="team_room_ask"
                desc="Open a session. Required: question. Optional: mode (dialogue|rounds), wait, timeout_s, topic, project_id. Returns outcome + final_brief + messages."
              />
              <ToolDoc
                name="team_room_status"
                desc="Get the current state for a topic. While in-flight, returns live status. After completion, returns idle + final_brief."
              />
              <ToolDoc
                name="team_room_recent"
                desc="List recent topics by last-modified time."
              />
              <ToolDoc
                name="team_room_cancel"
                desc="SIGTERM an in-flight orchestrator on a topic."
              />
            </div>
          </Section>

          <Section id="modes" num="06" title="Dialogue vs rounds">
            <Para>Two modes:</Para>
            <ul className="mt-3 space-y-3 text-[15px] leading-[1.65] text-foreground/82">
              <Bullet>
                <Mono>dialogue</Mono> (default): collaborative micro-turn working
                session. Claude and Codex address each other by name, build on
                each other&apos;s frames, converge or fork. This is the product.
              </Bullet>
              <Bullet>
                <Mono>rounds</Mono>: legacy adversarial review. R1 = parallel
                independent answers; R2 = each critiques the other&apos;s R1.
                Use only when you explicitly want stress-testing, not
                collaboration.
              </Bullet>
            </ul>
          </Section>

          <Section id="environment" num="07" title="Environment">
            <Para>
              State lives at <Mono>$TEAM_ROOM_DIR</Mono> (default{" "}
              <Mono>~/.team-room/</Mono>). Per topic:{" "}
              <Mono>{`<topic>.jsonl`}</Mono> (transcript),{" "}
              <Mono>{`<topic>.state.json`}</Mono> (live state),{" "}
              <Mono>{`<topic>.brief.json`}</Mono> (structured envelope).
            </Para>
            <Para>Tunables (env vars, all optional):</Para>
            <ul className="mt-3 space-y-2">
              <EnvRow name="TEAM_ROOM_MAX_TURNS" def="8" />
              <EnvRow name="TEAM_ROOM_TURN_WORDS" def="150" />
              <EnvRow name="TEAM_ROOM_AGENT_TIMEOUT" def="480" />
              <EnvRow name="CODEX_REASONING_EFFORT" def="high" />
            </ul>
          </Section>

          <div className="mt-20 pt-8 border-t border-foreground/[0.08] text-center">
            <p className="text-[14px] text-muted-foreground">
              Found a bug or want to contribute?{" "}
              <a
                href="https://github.com/constantinexanthos/team-room/issues"
                target="_blank"
                rel="noreferrer"
                className="text-foreground border-b border-foreground/30 hover:border-foreground/80 pb-px transition-colors"
              >
                Open an issue
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 first:mt-0 scroll-mt-24">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-[11px] text-amber-300/80">{num}</span>
        <h2 className="tr-h3">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.65] text-foreground/82">{children}</p>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5">
      <span
        className="absolute left-0 top-[0.7em] inline-block h-px w-3 bg-foreground/40"
        aria-hidden
      />
      {children}
    </li>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-foreground rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[0.88em]">
      {children}
    </code>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="my-5 rounded-lg border border-foreground/12 bg-foreground/[0.03] p-4 overflow-x-auto">
      <code className="font-mono text-[12.5px] text-foreground/90 leading-[1.6]">
        {children}
      </code>
    </pre>
  );
}

function OutcomeRow({
  color,
  tag,
  field,
  desc,
}: {
  color: "emerald" | "amber" | "sky" | "rose";
  tag: string;
  field: string;
  desc: string;
}) {
  const dot = {
    emerald: "bg-emerald-400 shadow-emerald-400/40",
    amber: "bg-amber-400 shadow-amber-400/40",
    sky: "bg-sky-400 shadow-sky-400/40",
    rose: "bg-rose-400 shadow-rose-400/40",
  }[color];

  return (
    <div className="grid grid-cols-12 gap-x-4 items-baseline py-4">
      <div className="col-span-12 sm:col-span-4 flex items-center gap-2.5">
        <span
          className={`inline-block size-1.5 rounded-full ${dot} shadow-[0_0_6px]`}
          aria-hidden
        />
        <span className="font-mono text-[12.5px] text-foreground">{tag}</span>
      </div>
      <div className="col-span-12 sm:col-span-8 mt-1 sm:mt-0">
        <p className="text-[14px] leading-[1.55] text-foreground/80">{desc}</p>
        <span className="mt-1 inline-block font-mono text-[10.5px] text-muted-foreground/70">
          {field}
        </span>
      </div>
    </div>
  );
}

function TagRow({ tag, desc }: { tag: string; desc: string }) {
  return (
    <div className="grid grid-cols-12 gap-x-4 py-3 items-baseline">
      <div className="col-span-12 sm:col-span-4 font-mono text-[12.5px] text-foreground">
        [{tag}]
      </div>
      <div className="col-span-12 sm:col-span-8 text-[14px] leading-[1.55] text-foreground/75">
        {desc}
      </div>
    </div>
  );
}

function ToolDoc({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="relative pl-4 border-l border-foreground/[0.15]">
      <div className="font-mono text-[13px] text-foreground">{name}</div>
      <p className="mt-1.5 text-[14px] text-foreground/75 leading-[1.6]">
        {desc}
      </p>
    </div>
  );
}

function EnvRow({ name, def }: { name: string; def: string }) {
  return (
    <li className="flex items-baseline gap-3 text-[13px]">
      <code className="font-mono text-foreground">{name}</code>
      <span className="text-muted-foreground/70 font-mono text-[11px]">=</span>
      <code className="font-mono text-amber-300/80">{def}</code>
    </li>
  );
}
