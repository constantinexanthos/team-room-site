import {
  AB_QUESTION,
  CLAUDE_SOLO,
  CODEX_SOLO,
  TEAM_ROOM_DIALOGUE,
} from "@/data/dialogues";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Evidence — Team Room",
  description:
    "Side-by-side: Claude alone, Codex alone, and Team Room. Same question, three columns.",
};

// Inline markdown — bold + paragraph breaks only. Safe by construction
// (no dangerouslySetInnerHTML), content is trusted local data.
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-foreground font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function PlainProse({ text }: { text: string }) {
  const paras = text.split("\n\n").filter(Boolean);
  return (
    <>
      {paras.map((p, i) => (
        <p
          key={i}
          className="text-[14.5px] text-foreground/85 leading-[1.6] mb-3 last:mb-0"
        >
          {renderInline(p)}
        </p>
      ))}
    </>
  );
}

export default function DataPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
      {/* Header */}
      <header className="grid grid-cols-12 gap-x-8 gap-y-6 border-b border-foreground/[0.08] pb-12">
        <div className="col-span-12 lg:col-span-4">
          <span className="tr-eyebrow-number" data-num="03">
            Evidence · the moat
          </span>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <h1 className="tr-display !text-[clamp(2.25rem,4.8vw,4.25rem)] max-w-[20ch]">
            Both alone? <em>Same answer.</em>
            <br />
            Together? <em>Sharper answer.</em>
          </h1>
          <p className="mt-7 max-w-[60ch] text-[15.5px] leading-[1.65] text-foreground/72">
            We ran the same strategic question through Claude alone, Codex
            alone, and Team Room. Both solo agents picked{" "}
            <span className="font-mono text-foreground text-[13.5px]">
              (c) deep integrations
            </span>
            . Team Room reshaped it into{" "}
            <span className="font-mono text-foreground text-[13.5px]">
              the version of (c) that compounds
            </span>
            .
          </p>
        </div>
      </header>

      {/* The question — set in serif, large, as a pull quote */}
      <section className="mt-16 grid grid-cols-12 gap-x-8">
        <div className="col-span-12 lg:col-span-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            The prompt
          </span>
          <div className="mt-2 font-mono text-[10px] text-muted-foreground/60">
            sent to each
          </div>
        </div>
        <blockquote
          className="col-span-12 lg:col-span-9 relative pl-6 border-l border-foreground/[0.12]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <p className="text-[1.125rem] sm:text-[1.25rem] leading-[1.45] text-foreground/90 max-w-[68ch]">
            {AB_QUESTION}
          </p>
        </blockquote>
      </section>

      {/* The three columns — asymmetric: solo answers small, team room expanded */}
      <section className="mt-16 grid grid-cols-12 gap-x-6 gap-y-6">
        <SoloColumn
          label="claude · solo"
          model="opus 4.7"
          color="amber"
          body={CLAUDE_SOLO}
          conclusion="picks (c) deep integrations"
        />
        <SoloColumn
          label="codex · solo"
          model="gpt-5.5"
          color="emerald"
          body={CODEX_SOLO}
          conclusion="picks (c) deep integrations"
        />

        <div className="col-span-12 md:col-span-4 relative">
          {/* Subtle amber→emerald glow border to mark the synthesis */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-lg bg-gradient-to-b from-amber-300/30 via-foreground/15 to-emerald-300/30 opacity-50 blur-[2px]"
          />
          <div className="relative rounded-lg border border-foreground/15 bg-card/60 p-5 sm:p-6">
            <header className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center" aria-hidden>
                  <span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_5px] shadow-amber-400/60" />
                  <span className="-ml-0.5 size-1.5 rounded-full bg-emerald-300 shadow-[0_0_5px] shadow-emerald-400/60" />
                </span>
                <span className="font-mono text-[12px] text-foreground">
                  team room
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground/80">
                3 turns · 22s
              </span>
            </header>

            <ol className="space-y-3.5">
              {TEAM_ROOM_DIALOGUE.turns.map((t) => (
                <li key={t.turn} className="relative pl-3">
                  <span
                    className={`absolute left-0 top-1 bottom-1 w-px ${
                      t.agent === "claude"
                        ? "bg-amber-300/70"
                        : "bg-emerald-300/70"
                    }`}
                    aria-hidden
                  />
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className={`font-mono text-[11px] ${
                        t.agent === "claude"
                          ? "text-amber-200"
                          : "text-emerald-200"
                      }`}
                    >
                      {t.agent}
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground/80">
                      [{t.label}]
                    </span>
                  </div>
                  <p className="text-[12.5px] leading-[1.55] text-foreground/75 line-clamp-3">
                    {t.content
                      .replace(/^\[[a-z-]+\]\s*\n*/i, "")
                      .replace(/\*\*([^*]+)\*\*/g, "$1")
                      .slice(0, 200)}
                    …
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-5 pt-5 border-t border-foreground/[0.08]">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/85">
                joint read
              </div>
              <p
                className="mt-2 text-[14px] leading-[1.55] text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {TEAM_ROOM_DIALOGUE.joint_read}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The reshape, told as an editorial spread */}
      <section className="mt-24 grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <span className="tr-eyebrow-number" data-num="04">
            The reshape is the value
          </span>
          <h2 className="tr-h2 mt-4 max-w-[18ch]">
            One agent collapsed the other&apos;s frame into something <em>better</em>.
          </h2>
          <div className="mt-7 space-y-5 text-[15.5px] leading-[1.65] text-foreground/80">
            <p>
              When you A/B test the same prompt across two models, you get two
              answers. If they agree, you assume that&apos;s the right answer.
              If they disagree, you do the synthesis yourself. In neither case
              do you get the <em>reshape move</em> — the place where one agent
              collapses the other&apos;s framing into something better.
            </p>
            <p>
              In this run, both Claude and Codex independently picked (c). A
              human looking at parallel outputs would conclude: &ldquo;okay,
              (c).&rdquo; Team Room&apos;s Codex turn went further:{" "}
              <span className="text-foreground">
                &ldquo;not integrations broadly — workflow-embedded integrations
                that generate proprietary eval/data exhaust.&rdquo;
              </span>{" "}
              That&apos;s a sharper, more defensible answer to the same question.
            </p>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <div className="border-l border-foreground/[0.12] pl-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              What changed across the room
            </span>
            <div className="mt-5 space-y-5">
              <MoveStep
                color="amber"
                speaker="claude · frame"
                desc="Narrows to (b) vs (c) — “which compounds faster under capital constraints?”"
                weight="muted"
              />
              <MoveStep
                color="emerald"
                speaker="codex · reshape"
                desc="Collapses (b) into (c): “the wedge is workflow integration; the moat is the data exhaust it produces.”"
                weight="strong"
              />
              <MoveStep
                color="amber"
                speaker="claude · converge"
                desc="Adds the outcome-signal qualifier: “not all integrations produce useful exhaust. Only the ones that observe outcomes.”"
                weight="strong"
              />
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-20 border-t border-foreground/[0.08] pt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link
          href="/demo"
          className="group inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground transition-colors"
        >
          <span className="border-b border-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
            Watch this dialogue play turn by turn
          </span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/docs"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="border-b border-muted-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
            How to install
          </span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

function SoloColumn({
  label,
  model,
  color,
  body,
  conclusion,
}: {
  label: string;
  model: string;
  color: "amber" | "emerald";
  body: string;
  conclusion: string;
}) {
  const ring =
    color === "amber" ? "border-amber-200/20" : "border-emerald-200/20";
  const dot = color === "amber" ? "bg-amber-300" : "bg-emerald-300";
  const dotGlow =
    color === "amber" ? "shadow-amber-400/60" : "shadow-emerald-400/60";
  const tone = color === "amber" ? "text-amber-200" : "text-emerald-200";

  return (
    <div className="col-span-12 md:col-span-4">
      <div className={`rounded-lg border ${ring} bg-card/40 p-5 sm:p-6 h-full`}>
        <header className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span
              className={`size-1.5 rounded-full ${dot} shadow-[0_0_5px] ${dotGlow}`}
              aria-hidden
            />
            <span className={`font-mono text-[12px] ${tone}`}>{label}</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/80">
            {model}
          </span>
        </header>
        <PlainProse text={body} />
        <footer className={`mt-5 pt-5 border-t ${ring}`}>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone}`}
          >
            → {conclusion}
          </span>
        </footer>
      </div>
    </div>
  );
}

function MoveStep({
  color,
  speaker,
  desc,
  weight,
}: {
  color: "amber" | "emerald";
  speaker: string;
  desc: string;
  weight: "muted" | "strong";
}) {
  const dot =
    color === "amber"
      ? "bg-amber-300 shadow-amber-400/60"
      : "bg-emerald-300 shadow-emerald-400/60";
  const speakerColor =
    color === "amber" ? "text-amber-200/90" : "text-emerald-200/90";
  const bodyColor =
    weight === "strong" ? "text-foreground/90" : "text-foreground/65";
  return (
    <div className="relative pl-5">
      <span
        className={`absolute left-0 top-1.5 size-1.5 rounded-full ${dot} shadow-[0_0_5px]`}
        aria-hidden
      />
      <div className={`font-mono text-[11px] ${speakerColor}`}>{speaker}</div>
      <p className={`mt-1.5 text-[14px] leading-[1.55] ${bodyColor}`}>
        {desc}
      </p>
    </div>
  );
}
