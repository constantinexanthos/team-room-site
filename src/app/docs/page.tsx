import { Badge } from "@/components/ui/badge";
import { InstallSnippet } from "@/components/install-snippet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "@/components/icons";

export const metadata = {
  title: "Docs — Team Room",
  description:
    "Install, the four outcomes, the dialogue protocol, and the MCP tool surface.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <Badge
        variant="outline"
        className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        docs · v0.1.1
      </Badge>
      <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
        Team Room docs.
      </h1>
      <p className="mt-4 text-muted-foreground text-lg">
        A small, opinionated Claude Code MCP plugin. Install, ask, get a
        structured brief.
      </p>

      <Section id="install" title="Install">
        <p>
          Team Room is a Claude Code plugin. From a Claude Code session:
        </p>
        <div className="not-prose my-4">
          <InstallSnippet />
        </div>
        <p>
          Repo lives at{" "}
          <a
            href="https://github.com/constantinexanthos/team-room"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
          >
            <GithubIcon className="size-3.5" />
            constantinexanthos/team-room
          </a>
          . The plugin bundles an MCP stdio server alongside slash commands;
          requires Claude CLI and Codex CLI on PATH.
        </p>
      </Section>

      <Section id="quick-start" title="Quick start">
        <p>
          Inside any Claude Code session, ask Claude to invoke team-room with
          natural language:
        </p>
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
        <p>
          Claude and Codex deliberate over up to 8 short turns and return a
          structured <Mono>final_brief</Mono> with the joint read.
        </p>
      </Section>

      <Section id="outcomes" title="The four outcomes">
        <p>
          Every session ends in exactly one of four terminal states. The MCP
          tool surfaces <Mono>outcome</Mono> + <Mono>final_brief</Mono> as the
          primary artifact; the full transcript is in <Mono>messages</Mono> for
          expansion.
        </p>
        <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
          <OutcomeRow
            dot="bg-emerald-400"
            tag="converged"
            field="final_brief.joint_read"
            copy="One to two sentences — the actual answer."
          />
          <OutcomeRow
            dot="bg-amber-400"
            tag="forked"
            field="final_brief.fork"
            copy="Each agent's view + the deciding evidence."
          />
          <OutcomeRow
            dot="bg-sky-400"
            tag="timed-out"
            field="final_brief.partial"
            copy="Last turn's content; progress isn't lost."
          />
          <OutcomeRow
            dot="bg-rose-400"
            tag="failed"
            field="final_brief.error"
            copy="One-line reason an agent or orchestrator failed."
          />
        </div>
      </Section>

      <Section id="protocol" title="The dialogue protocol">
        <p>
          Dialogue mode is a function-labeled working session. Each turn opens
          with a tag the system captures as metadata and uses to detect
          terminal moves.
        </p>
        <div className="not-prose space-y-2 my-4 font-mono text-sm">
          <TagRow tag="frame" desc="Turn 1: decision + criteria + uncertainty + lens" />
          <TagRow tag="frame-clear" desc="Turn 1 fast-path: frame is obvious, go to evidence" />
          <TagRow tag="reshape" desc="Turn 2: improve the frame before adding substance" />
          <TagRow tag="evidence / build / refine" desc="Mid-dialogue moves" />
          <TagRow tag="push-back" desc="Substantive disagreement, mapped not graded" />
          <TagRow tag="converge" desc="Terminal: joint read for the user" />
          <TagRow tag="fork" desc="Terminal: explicit unresolved disagreement" />
        </div>
        <p>
          The protocol enforces three rules:
        </p>
        <ul>
          <li>
            <strong>Substantive uptake.</strong> Every non-first turn opens by
            naming what it&apos;s taking from the prior turn. Generic agreement
            is called out in-prompt as collaboration theater.
          </li>
          <li>
            <strong>Map the fork.</strong> Disagreement uses{" "}
            <em>condition under which the other&apos;s view is right</em> language,
            not scoring rubrics.
          </li>
          <li>
            <strong>Asymmetry as lens.</strong> Claude and Codex surface their
            training-data differences explicitly (&ldquo;my UX lens flags…&rdquo;,
            &ldquo;my code-base-heavy prior says…&rdquo;).
          </li>
        </ul>
      </Section>

      <Section id="tools" title="MCP tool surface">
        <p>Four tools, all under <Mono>team_room_*</Mono>:</p>
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
      </Section>

      <Section id="modes" title="Dialogue vs rounds">
        <p>Two modes:</p>
        <ul>
          <li>
            <Mono>dialogue</Mono> (default): collaborative micro-turn working
            session. Claude and Codex address each other by name, build on each
            other&apos;s frames, converge or fork. This is the product.
          </li>
          <li>
            <Mono>rounds</Mono>: legacy adversarial review. R1 = parallel
            independent answers; R2 = each critiques the other&apos;s R1. Use
            only when you explicitly want stress-testing, not collaboration.
          </li>
        </ul>
      </Section>

      <Section id="environment" title="Environment">
        <p>
          State lives at <Mono>$TEAM_ROOM_DIR</Mono> (default{" "}
          <Mono>~/.team-room/</Mono>). Per topic: <Mono>{`<topic>.jsonl`}</Mono>{" "}
          (transcript), <Mono>{`<topic>.state.json`}</Mono> (live state),{" "}
          <Mono>{`<topic>.brief.json`}</Mono> (structured envelope).
        </p>
        <p>
          Tunables (env vars, all optional):
        </p>
        <ul className="not-prose space-y-1.5 text-sm font-mono mt-3">
          <li><Mono>TEAM_ROOM_MAX_TURNS=8</Mono></li>
          <li><Mono>TEAM_ROOM_TURN_WORDS=150</Mono></li>
          <li><Mono>TEAM_ROOM_AGENT_TIMEOUT=480</Mono></li>
          <li><Mono>CODEX_REASONING_EFFORT=high</Mono></li>
        </ul>
      </Section>

      <Separator className="my-12" />

      <div className="text-center">
        <p className="text-muted-foreground">
          Found a bug or want to contribute?{" "}
          <a
            href="https://github.com/constantinexanthos/team-room/issues"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:underline underline-offset-4"
          >
            Open an issue
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="prose prose-invert mt-4 max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-li:leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-foreground rounded bg-muted/40 px-1.5 py-0.5 text-[0.9em]">
      {children}
    </code>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="not-prose my-4 rounded-lg border border-border/60 bg-background/60 p-4 overflow-x-auto">
      <code className="font-mono text-xs text-foreground/90 leading-relaxed">
        {children}
      </code>
    </pre>
  );
}

function OutcomeRow({
  dot,
  tag,
  field,
  copy,
}: {
  dot: string;
  tag: string;
  field: string;
  copy: string;
}) {
  return (
    <Card className="border-border/40 bg-background/40">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block size-2 rounded-full ${dot}`} />
          <span className="font-mono text-sm">{tag}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{copy}</p>
        <div className="mt-2 font-mono text-[10px] text-muted-foreground">
          {field}
        </div>
      </CardContent>
    </Card>
  );
}

function TagRow({ tag, desc }: { tag: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-3 py-1">
      <span className="text-foreground shrink-0 w-32">[{tag}]</span>
      <span className="text-muted-foreground text-sm font-sans">{desc}</span>
    </div>
  );
}

function ToolDoc({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="not-prose border-l-2 border-border/60 pl-4 my-4">
      <div className="font-mono text-sm text-foreground">{name}</div>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
