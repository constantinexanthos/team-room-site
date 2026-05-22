import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  AB_QUESTION,
  CLAUDE_SOLO,
  CODEX_SOLO,
  TEAM_ROOM_DIALOGUE,
} from "@/data/dialogues";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Why it's better — Team Room",
  description:
    "Side-by-side: Claude alone, Codex alone, and Team Room. Same question, three columns.",
};

// Small inline markdown renderer: handles **bold** and paragraph breaks.
// Trusted content only (our own data file), but written without
// dangerouslySetInnerHTML so it's safe regardless.
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-foreground">
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
        <p key={i} className="text-sm text-foreground/85 leading-relaxed mb-3 last:mb-0">
          {renderInline(p)}
        </p>
      ))}
    </>
  );
}

export default function DataPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <Badge
        variant="outline"
        className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        the moat, in three columns
      </Badge>
      <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-balance max-w-3xl">
        Both alone? Same answer. Together? Sharper answer.
      </h1>
      <p className="mt-4 text-muted-foreground text-lg max-w-3xl">
        We ran the same strategic question through Claude alone, Codex alone,
        and Team Room. Both solo agents picked{" "}
        <span className="font-mono text-foreground">(c) deep integrations</span>.
        Team Room reshaped it into{" "}
        <span className="font-mono text-foreground">
          the version of (c) that compounds
        </span>
        . Read all three below.
      </p>

      <Card className="mt-10 border-border/40 bg-background/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              the question
            </span>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed">
            {AB_QUESTION}
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card className="border-amber-200/30 bg-amber-200/[0.02]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-amber-300 shadow-[0_0_6px] shadow-amber-300/60" />
                <span className="font-mono text-sm text-amber-200">
                  claude solo
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                opus 4.7
              </span>
            </div>
            <PlainProse text={CLAUDE_SOLO} />
            <div className="mt-4 pt-4 border-t border-amber-200/20">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                picks (c) deep integrations
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200/30 bg-emerald-200/[0.02]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_6px] shadow-emerald-300/60" />
                <span className="font-mono text-sm text-emerald-200">
                  codex solo
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                gpt-5.5
              </span>
            </div>
            <PlainProse text={CODEX_SOLO} />
            <div className="mt-4 pt-4 border-t border-emerald-200/20">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                picks (c) deep integrations
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-foreground/30 bg-gradient-to-b from-amber-200/[0.04] to-emerald-200/[0.04]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-foreground" />
                <span className="font-mono text-sm text-foreground">
                  team room
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                3 turns · 22s
              </span>
            </div>
            <div className="space-y-3">
              {TEAM_ROOM_DIALOGUE.turns.map((t) => (
                <div key={t.turn} className="text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`font-mono ${
                        t.agent === "claude"
                          ? "text-amber-200"
                          : "text-emerald-200"
                      }`}
                    >
                      {t.agent}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-mono text-[9px] uppercase tracking-widest h-4 border-foreground/20"
                    >
                      [{t.label}]
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {t.content
                      .replace(/^\[[a-z-]+\]\s*\n*/i, "")
                      .replace(/\*\*([^*]+)\*\*/g, "$1")
                      .slice(0, 220)}
                    …
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-foreground/20">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                joint read
              </span>
              <p className="mt-1.5 text-sm text-foreground leading-relaxed">
                {TEAM_ROOM_DIALOGUE.joint_read}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            The reshape is the value.
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            When you A/B test the same prompt across two models, you get two
            answers. If they agree, you assume that&apos;s the right answer. If
            they disagree, you do the synthesis yourself. In neither case do you
            get the <em>reshape move</em> — the place where one agent collapses
            the other&apos;s framing into something better.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
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
        <div className="rounded-lg border border-border/40 bg-background/40 p-6 self-start">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            what changed across the room
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-amber-300 shrink-0 w-24">
                claude · frame
              </span>
              <span className="text-muted-foreground">
                Narrows to (b) vs (c) — &ldquo;which compounds faster under
                capital constraints?&rdquo;
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-emerald-300 shrink-0 w-24">
                codex · reshape
              </span>
              <span className="text-foreground">
                Collapses (b) into (c): &ldquo;the wedge is workflow
                integration; the moat is the data exhaust it produces.&rdquo;
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-amber-300 shrink-0 w-24">
                claude · converge
              </span>
              <span className="text-foreground">
                Adds the outcome-signal qualifier: &ldquo;not all integrations
                produce useful exhaust. Only the ones that observe
                outcomes.&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-border/40 pt-8">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
        >
          Watch this dialogue play turn by turn{" "}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
