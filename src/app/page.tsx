import Link from "next/link";
import { InstallSnippet } from "@/components/install-snippet";
import { ChatReplay } from "@/components/chat-replay";
import { TEAM_ROOM_DIALOGUE } from "@/data/dialogues";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* =========================================================
          01 — HERO. Editorial serif headline, no gradient text,
          no badge. Two-color hairline declares the two-mind axis.
          ========================================================= */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Aurora wash — softer than v1, single layer, off-axis. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
          <div className="aurora-blob-claude absolute -top-40 -left-20 h-[34rem] w-[34rem] rounded-full bg-amber-400/[0.09] blur-3xl" />
          <div className="aurora-blob-codex absolute -bottom-40 -right-10 h-[34rem] w-[34rem] rounded-full bg-emerald-400/[0.09] blur-3xl" />
        </div>
        {/* Faint grid texture under the hero — almost invisible at first glance */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,oklch(0.97_0.01_80/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0.01_80/0.025)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_30%,transparent_85%)]"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-5 sm:px-8 pt-16 sm:pt-24 pb-12 sm:pb-20">
          {/* Left — meta column */}
          <aside className="col-span-12 lg:col-span-3 lg:pt-2">
            <div className="tr-fade" style={{ animationDelay: "0ms" }}>
              <span className="tr-rule">A meeting · not a query</span>
            </div>
            <p
              className="mt-6 text-sm leading-relaxed text-muted-foreground tr-fade hidden lg:block"
              style={{ animationDelay: "300ms" }}
            >
              An MCP plugin for Claude Code. Claude (Opus 4.7) and Codex (gpt-5.5)
              deliberate in one structured room and return a single brief.
            </p>
          </aside>

          {/* Right — headline + CTAs */}
          <div className="col-span-12 lg:col-span-9">
            <h1
              className="tr-display max-w-[18ch] tr-fade"
              style={{ animationDelay: "120ms" }}
            >
              Claude and Codex,
              <br />
              <em>answering each other</em>.
            </h1>

            <p
              className="mt-7 max-w-[52ch] text-[1.0625rem] sm:text-[1.125rem] leading-[1.55] text-foreground/72 tr-fade"
              style={{ animationDelay: "260ms" }}
            >
              Two models from different labs deliberate by name and converge on
              one answer you can ship.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 tr-fade"
              style={{ animationDelay: "400ms" }}
            >
              <InstallSnippet />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                or
              </span>
              <a
                href="#replay"
                className="group inline-flex items-center gap-1.5 text-sm text-foreground/85 hover:text-foreground transition-colors"
              >
                <span className="border-b border-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
                  watch them work
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REPLAY — on the home page, immediately visible.
          Two-column: caption beside the live transcript.
          ========================================================= */}
      <section
        id="replay"
        className="relative border-b border-border/40 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <span className="tr-eyebrow-number" data-num="01">
                The room, replayed
              </span>
              <h2 className="tr-h2 mt-4">
                Watch the <em>reshape</em> happen in real time.
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.6] text-foreground/72 max-w-[44ch]">
                A real session captured{" "}
                <span className="font-mono text-foreground text-[13.5px]">
                  2026-05-22
                </span>
                . Claude opens a frame, Codex collapses it, Claude lands the
                version that compounds. Three turns, one joint read.
              </p>
              <div className="mt-7 flex flex-col gap-2 text-sm">
                <Link
                  href="/demo"
                  className="group inline-flex items-center gap-2 text-foreground/85 hover:text-foreground transition-colors"
                >
                  <span className="border-b border-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
                    Both transcripts in /demo
                  </span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/data"
                  className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="border-b border-muted-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
                    Side-by-side with solo agents
                  </span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <ChatReplay dialogue={TEAM_ROOM_DIALOGUE} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          02 — Not parallel queries. Asymmetric editorial spread,
          no card grid, no pyramid diagram. A typographic comparison.
          ========================================================= */}
      <section className="relative border-b border-border/40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <span className="tr-eyebrow-number" data-num="02">
            Why it&apos;s different
          </span>

          <div className="mt-6 grid grid-cols-12 gap-x-8">
            <h2 className="col-span-12 lg:col-span-8 tr-display !text-[clamp(2.25rem,4.5vw,4rem)] !leading-[1.02]">
              Not parallel queries. <em>A meeting.</em>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-12 gap-x-8 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <p
                className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.55] text-foreground/82"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A/B testing the same prompt in Claude and Codex gives you two
                separate answers and homework: you reconcile them. Team Room
                puts both models in one room with a structured protocol — they
                address each other by name, build on each other&apos;s frames,
                and converge on one joint read for you.
              </p>
              <p className="mt-6 text-[15.5px] leading-[1.65] text-foreground/70">
                The reshape is the irreducible value. Same question, both models
                alone said{" "}
                <span className="font-mono text-foreground text-[13.5px]">
                  (c) deep integrations
                </span>
                . Team Room reshaped to{" "}
                <span className="font-mono text-foreground text-[13.5px]">
                  (c) — but the version that observes outcomes
                </span>{" "}
                — the version that compounds.
              </p>
              <div className="mt-8">
                <Link
                  href="/data"
                  className="group inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground transition-colors"
                >
                  <span className="border-b border-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
                    See all three answers
                  </span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Comparison block — typographic diagram, not a pyramid SVG */}
            <div className="col-span-12 lg:col-span-5">
              <ComparisonBlock />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03 — The protocol. Numbered list, not a card grid.
          ========================================================= */}
      <section className="relative border-b border-border/40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-12 lg:col-span-4">
              <span className="tr-eyebrow-number" data-num="03">
                The protocol
              </span>
              <h2 className="tr-h2 mt-4">
                Four turns. One structured <em>brief</em>.
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.65] text-foreground/72 max-w-[40ch]">
                Dialogue mode runs a function-labeled working session: frame →
                reshape → evidence/build → converge or fork. Every session ends
                in one of four legible terminal states.
              </p>
            </div>

            <ol className="col-span-12 lg:col-span-7 lg:col-start-6 mt-2 space-y-px">
              <ProtocolRow
                idx="01"
                tag="frame"
                accent="amber"
                speaker="Claude"
                model="opus 4.7"
                desc="States the decision, criteria, an uncertainty, and the lens its training pulls toward. Never the answer."
              />
              <ProtocolRow
                idx="02"
                tag="reshape"
                accent="emerald"
                speaker="Codex"
                model="gpt-5.5"
                desc="Takes the frame and improves it before adding new substance. Substantive uptake — not a parallel essay."
              />
              <ProtocolRow
                idx="03"
                tag="build · evidence"
                accent="both"
                speaker="Alternating"
                model="up to 8 turns"
                desc="Map forks instead of grading. Dispatch sub-agents inline for read-only evidence as needed."
              />
              <ProtocolRow
                idx="04"
                tag="converge · fork"
                accent="both"
                speaker="Either"
                model="terminal"
                desc="Joint read for you (1–2 sentences) — or an explicit mapped fork if disagreement is real and load-bearing."
              />
            </ol>
          </div>
        </div>
      </section>

      {/* =========================================================
          04 — The envelope. Four outcomes as a single editorial row.
          ========================================================= */}
      <section className="relative border-b border-border/40">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-12 lg:col-span-5">
              <span className="tr-eyebrow-number" data-num="04">
                The envelope
              </span>
              <h2 className="tr-h2 mt-4">
                Every session ends in a <em>citable</em> state.
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.65] text-foreground/72 max-w-[40ch]">
                No silent failures, no half-finished output. Each room closes in
                exactly one of four states — the MCP tool surfaces the
                structured{" "}
                <span className="font-mono text-foreground text-[13.5px]">
                  final_brief
                </span>{" "}
                as the primary artifact.
              </p>
            </div>

            <dl className="col-span-12 lg:col-span-7 lg:pl-4 mt-2 divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">
              <OutcomeRow
                color="emerald"
                tag="converged"
                field="final_brief.joint_read"
                desc="The team landed on a joint read. Surfaced as one to two sentences."
              />
              <OutcomeRow
                color="amber"
                tag="forked"
                field="final_brief.fork"
                desc="They explicitly mapped an unresolved disagreement, with deciding evidence named."
              />
              <OutcomeRow
                color="sky"
                tag="timed-out"
                field="final_brief.partial"
                desc="Max turns reached. Partial brief includes the last turn so progress isn't lost."
              />
              <OutcomeRow
                color="rose"
                tag="failed"
                field="final_brief.error"
                desc="An agent or orchestrator failure. One-line reason captured."
              />
            </dl>
          </div>
        </div>
      </section>

      {/* =========================================================
          05 — Final CTA. Editorial, large serif, restrained.
          ========================================================= */}
      <section className="relative">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 py-24 sm:py-32 text-center">
          <span className="tr-rule mx-auto">Install · one command</span>
          <h2 className="tr-display mt-7 !text-[clamp(2.25rem,5vw,4rem)]">
            Put a meeting in <em>your terminal</em>.
          </h2>
          <p className="mt-6 text-[15.5px] leading-[1.65] text-foreground/72 max-w-xl mx-auto">
            Team Room is a Claude Code MCP plugin. One command to install. One
            tool call to use. Returns a structured brief, every time.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <InstallSnippet />
            <div className="flex items-center gap-7 text-sm text-muted-foreground">
              <Link
                href="/docs"
                className="hover:text-foreground transition-colors"
              >
                Read the docs →
              </Link>
              <a
                href="https://github.com/constantinexanthos/team-room"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Star on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
   Sub-components — kept in this file because they are page-specific.
   ============================================================================ */

function ComparisonBlock() {
  return (
    <div className="relative pl-6">
      {/* Vertical hairline holding both rows */}
      <span
        className="absolute left-0 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-amber-300/60 via-foreground/30 to-emerald-300/60"
        aria-hidden
      />
      <div className="space-y-7">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Parallel queries
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/60">
              {"//"} two browser tabs
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-amber-200/15 bg-amber-200/[0.025] px-3 py-2.5">
              <div className="font-mono text-[11px] text-amber-200/90">
                claude → answer
              </div>
              <div className="font-mono text-[10px] text-muted-foreground/70">
                in isolation
              </div>
            </div>
            <div className="rounded-md border border-emerald-200/15 bg-emerald-200/[0.025] px-3 py-2.5">
              <div className="font-mono text-[11px] text-emerald-200/90">
                codex → answer
              </div>
              <div className="font-mono text-[10px] text-muted-foreground/70">
                in isolation
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-muted-foreground/85 leading-relaxed">
            You reconcile. Two outputs, your synthesis.
          </p>
        </div>

        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
              Team Room
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/60">
              {"//"} one structured room
            </span>
          </div>
          <div className="mt-2 rounded-md border border-foreground/15 bg-foreground/[0.025] px-3 py-3">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-amber-200/90">claude</span>
              <span className="text-muted-foreground/70">⇄</span>
              <span className="text-emerald-200/90">codex</span>
            </div>
            <div className="mt-1 font-mono text-[10px] text-muted-foreground/80">
              frame → reshape → converge
            </div>
            <div className="mt-2 pt-2 border-t border-foreground/10">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/85">
                final_brief
              </div>
              <div className="font-mono text-[10px] text-muted-foreground/85">
                one joint read · ready to ship
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtocolRow({
  idx,
  tag,
  speaker,
  model,
  desc,
  accent,
}: {
  idx: string;
  tag: string;
  speaker: string;
  model: string;
  desc: string;
  accent: "amber" | "emerald" | "both";
}) {
  const rule =
    accent === "amber"
      ? "bg-amber-300/70"
      : accent === "emerald"
      ? "bg-emerald-300/70"
      : "bg-gradient-to-b from-amber-300/70 to-emerald-300/70";
  return (
    <li className="group relative grid grid-cols-12 gap-x-4 py-6 border-t border-foreground/[0.08] last:border-b">
      <span
        className={`absolute -left-3 top-6 bottom-6 w-px ${rule}`}
        aria-hidden
      />
      <div className="col-span-2 sm:col-span-1 font-mono text-[11px] text-muted-foreground/60 pt-1">
        {idx}
      </div>
      <div className="col-span-10 sm:col-span-3">
        <div className="font-mono text-[12.5px] text-foreground">
          [{tag}]
        </div>
        <div className="mt-1 font-mono text-[10.5px] text-muted-foreground/80">
          {speaker} · {model}
        </div>
      </div>
      <p className="col-span-12 sm:col-span-8 text-[14.5px] leading-[1.6] text-foreground/80">
        {desc}
      </p>
    </li>
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
    <div className="grid grid-cols-12 gap-x-4 items-baseline py-5">
      <dt className="col-span-12 sm:col-span-4 flex items-center gap-2.5">
        <span
          className={`inline-block size-1.5 rounded-full ${dot} shadow-[0_0_6px]`}
          aria-hidden
        />
        <span className="font-mono text-[13px] text-foreground">{tag}</span>
      </dt>
      <dd className="col-span-12 sm:col-span-8 mt-1 sm:mt-0">
        <p className="text-[14.5px] leading-[1.55] text-foreground/80">
          {desc}
        </p>
        <span className="mt-1 inline-block font-mono text-[10.5px] text-muted-foreground/70">
          {field}
        </span>
      </dd>
    </div>
  );
}
