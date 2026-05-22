import Link from "next/link";
import { PyramidDiagram } from "@/components/pyramid-diagram";
import { InstallSnippet } from "@/components/install-snippet";
import { ArrowRight, GitBranch, Layers, MessagesSquare, Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border/40 overflow-hidden relative">
        {/* Aurora blobs — claude (amber) + codex (emerald), the two-mind palette */}
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <div className="aurora-blob-claude absolute -top-1/4 left-1/4 h-[32rem] w-[32rem] rounded-full bg-amber-400/15 blur-3xl" />
          <div className="aurora-blob-codex absolute -bottom-1/4 right-1/4 h-[32rem] w-[32rem] rounded-full bg-emerald-400/15 blur-3xl" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-20 sm:pt-28 pb-16 text-center">
          <Badge
            variant="outline"
            className="mb-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            <span className="inline-block size-1.5 rounded-full bg-emerald-400 mr-2 shadow-[0_0_6px] shadow-emerald-400/70" />
            MCP plugin for Claude Code · v0.1.1
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-balance">
            Claude and Codex,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-foreground to-emerald-200">
              answering each other
            </span>
            .
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground text-balance">
            Two models from different labs deliberate by name and converge on one
            answer you can ship.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <InstallSnippet />
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>or</span>
              <Link
                href="/demo"
                className="inline-flex items-center gap-1 text-foreground hover:underline underline-offset-4"
              >
                see it in action <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge
                variant="outline"
                className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
              >
                why it&apos;s different
              </Badge>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                Not parallel queries. A meeting.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                A/B testing the same prompt in Claude and Codex gives you two
                separate answers and homework: you reconcile them. Team Room
                puts both models in one room with a structured protocol —{" "}
                <span className="text-foreground">they address each other by name</span>,{" "}
                <span className="text-foreground">build on each other&apos;s frames</span>, and{" "}
                <span className="text-foreground">converge on one joint read</span> for you.
              </p>
              <p className="mt-4 text-muted-foreground">
                The reshape is the irreducible value. Same question, both models
                alone said <span className="font-mono text-foreground">(c) deep integrations</span>.
                Team Room reshaped to{" "}
                <span className="font-mono text-foreground">
                  (c) — but the version that observes outcomes
                </span>{" "}
                — the version that compounds.
              </p>
              <div className="mt-6">
                <Link
                  href="/data"
                  className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline underline-offset-4"
                >
                  See the side-by-side <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <PyramidDiagram />
          </div>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <Badge
            variant="outline"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            how it works
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Four turns. One structured brief.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Dialogue mode runs a function-labeled working session: frame → reshape
            → evidence/build → converge or fork. Every session ends in one of
            four legible terminal states.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="bg-background/40 border-border/40 hover:border-border transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Layers className="size-4 text-amber-300" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">claude</span>
                </div>
                <div className="font-mono text-sm text-foreground mb-2">[frame]</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  States the decision, criteria, an uncertainty, and the lens its training pulls toward.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/40 border-border/40 hover:border-border transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Workflow className="size-4 text-emerald-300" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">codex</span>
                </div>
                <div className="font-mono text-sm text-foreground mb-2">[reshape]</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Takes the frame, improves it before adding new substance. Don&apos;t write a parallel essay — improve the working brief.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/40 border-border/40 hover:border-border transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <MessagesSquare className="size-4 text-muted-foreground" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">alternating</span>
                </div>
                <div className="font-mono text-sm text-foreground mb-2">[build / evidence]</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Substantive uptake required. Map forks instead of grading. Dispatch sub-agents inline for read-only evidence.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/40 border-border/40 hover:border-border transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <GitBranch className="size-4 text-muted-foreground" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">either</span>
                </div>
                <div className="font-mono text-sm text-foreground mb-2">[converge or fork]</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Joint read for you (1–2 sentences) — or an explicit mapped fork if disagreement is real and load-bearing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
          <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            the envelope
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Every session ends in a citable state.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            No silent failures, no half-finished output. Each room closes in exactly one of four states — the MCP tool surfaces the structured <code className="font-mono text-foreground">final_brief</code> as the primary artifact.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <OutcomeCard dot="bg-emerald-400" tag="converged" copy="The team landed on a joint read for you. Surfaced as one to two sentences in final_brief.joint_read." />
            <OutcomeCard dot="bg-amber-400" tag="forked" copy="They explicitly mapped an unresolved disagreement. final_brief.fork has both views and the deciding evidence." />
            <OutcomeCard dot="bg-sky-400" tag="timed-out" copy="Max turns reached. Partial brief includes the last turn's content so progress isn't lost." />
            <OutcomeCard dot="bg-rose-400" tag="failed" copy="An agent or orchestrator failure. final_brief.error captures the reason." />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
            Put a meeting in your terminal.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Team Room is a Claude Code MCP plugin. One command to install, one tool call to use.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <InstallSnippet />
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground transition-colors">Read the docs →</Link>
              <a href="https://github.com/constantinexanthos/team-room" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Star on GitHub →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OutcomeCard({ dot, tag, copy }: { dot: string; tag: string; copy: string }) {
  return (
    <Card className="bg-background/40 border-border/40">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block size-2 rounded-full ${dot}`} />
          <span className="font-mono text-sm text-foreground">{tag}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
      </CardContent>
    </Card>
  );
}
