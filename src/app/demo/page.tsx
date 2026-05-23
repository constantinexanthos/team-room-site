import { ChatReplay } from "@/components/chat-replay";
import { TEAM_ROOM_DIALOGUE, HERO_DIALOGUE } from "@/data/dialogues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Replay — Team Room",
  description:
    "Real team-room sessions captured 2026-05-22. Watch Claude and Codex address each other and converge.",
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
      <header className="grid grid-cols-12 gap-x-8 gap-y-6 border-b border-foreground/[0.08] pb-12">
        <div className="col-span-12 lg:col-span-4">
          <span className="tr-eyebrow-number" data-num="02">
            Replay · two sessions
          </span>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <h1 className="tr-display !text-[clamp(2.5rem,5vw,4.5rem)]">
            Watch them <em>work</em>.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[15.5px] leading-[1.65] text-foreground/72">
            Real team-room transcripts captured{" "}
            <span className="font-mono text-foreground text-[13.5px]">
              2026-05-22
            </span>
            , played back at adjustable speed. Each turn carries a function tag
            — <span className="font-mono text-foreground text-[13.5px]">[frame]</span>,{" "}
            <span className="font-mono text-foreground text-[13.5px]">[reshape]</span>,{" "}
            <span className="font-mono text-foreground text-[13.5px]">[converge]</span>{" "}
            — naming what the agent is doing. The session ends in a structured{" "}
            <span className="font-mono text-foreground text-[13.5px]">
              final_brief
            </span>
            .
          </p>
        </div>
      </header>

      <div className="mt-12">
        <Tabs defaultValue="moat">
          <TabsList className="bg-transparent border-b border-foreground/[0.08] rounded-none w-full justify-start gap-0 h-auto p-0">
            <TabsTrigger
              value="moat"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-amber-300 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground data-[state=active]:text-foreground"
            >
              <span className="text-amber-300/70 mr-2">01</span>
              Moat for an AI tools co.
            </TabsTrigger>
            <TabsTrigger
              value="hero"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-300 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground data-[state=active]:text-foreground"
            >
              <span className="text-emerald-300/70 mr-2">02</span>
              Hero copy for this site
            </TabsTrigger>
          </TabsList>

          <TabsContent value="moat" className="mt-8">
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <div className="col-span-12 lg:col-span-4">
                <h2 className="tr-h3">
                  {TEAM_ROOM_DIALOGUE.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-foreground/72">
                  {TEAM_ROOM_DIALOGUE.blurb}
                </p>
                <dl className="mt-6 space-y-3 text-[13px]">
                  <DialogueMeta
                    label="turns"
                    value={String(TEAM_ROOM_DIALOGUE.turns.length)}
                  />
                  <DialogueMeta
                    label="outcome"
                    value={TEAM_ROOM_DIALOGUE.outcome}
                  />
                  <DialogueMeta label="closing turn" value="3" />
                </dl>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <ChatReplay dialogue={TEAM_ROOM_DIALOGUE} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hero" className="mt-8">
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
              <div className="col-span-12 lg:col-span-4">
                <h2 className="tr-h3">{HERO_DIALOGUE.title}</h2>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-foreground/72">
                  {HERO_DIALOGUE.blurb}
                </p>
                <dl className="mt-6 space-y-3 text-[13px]">
                  <DialogueMeta
                    label="turns"
                    value={String(HERO_DIALOGUE.turns.length)}
                  />
                  <DialogueMeta label="outcome" value={HERO_DIALOGUE.outcome} />
                  <DialogueMeta label="closing turn" value="3" />
                </dl>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <ChatReplay dialogue={HERO_DIALOGUE} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* What you're looking at — editorial annotation, not a card */}
      <section className="mt-24 grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <span className="tr-eyebrow-number" data-num="03">
            How to read it
          </span>
          <h2 className="tr-h3 mt-4">
            What each tag is <em>doing</em>.
          </h2>
        </div>
        <ol className="col-span-12 lg:col-span-8 divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">
          <TagExplainer
            tag="frame"
            color="amber"
            desc="Turn 1 lays the working brief: the decision, the criteria, an uncertainty, the lens its training pulls toward. Never the answer."
          />
          <TagExplainer
            tag="reshape"
            color="emerald"
            desc="Turn 2 improves the frame instead of writing a parallel essay. The protocol enforces substantive uptake — the agent has to name what it's taking from the prior turn."
          />
          <TagExplainer
            tag="converge"
            color="both"
            desc="A turn closes the session with `**Joint read for Costa:**` — the literal marker the brief extractor parses. The room ends with one citable answer."
          />
        </ol>
        <div className="col-span-12 mt-2 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/data"
            className="group inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground transition-colors"
          >
            <span className="border-b border-foreground/30 group-hover:border-foreground/80 pb-px transition-colors">
              See team-room vs. parallel queries
            </span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How to install →
          </Link>
        </div>
      </section>
    </div>
  );
}

function DialogueMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 border-t border-foreground/[0.08] pt-3 first:border-t-0 first:pt-0">
      <dt className="w-20 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
        {label}
      </dt>
      <dd className="font-mono text-foreground text-[12.5px]">{value}</dd>
    </div>
  );
}

function TagExplainer({
  tag,
  color,
  desc,
}: {
  tag: string;
  color: "amber" | "emerald" | "both";
  desc: string;
}) {
  const tagClass =
    color === "amber"
      ? "text-amber-200"
      : color === "emerald"
      ? "text-emerald-200"
      : "text-foreground";
  return (
    <li className="grid grid-cols-12 gap-x-4 items-baseline py-5">
      <div className="col-span-12 sm:col-span-3 font-mono text-[12.5px]">
        <span className={tagClass}>[{tag}]</span>
      </div>
      <p className="col-span-12 sm:col-span-9 text-[14.5px] leading-[1.6] text-foreground/80 mt-1 sm:mt-0">
        {desc}
      </p>
    </li>
  );
}
