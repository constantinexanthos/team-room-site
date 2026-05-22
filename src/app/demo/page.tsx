import { ChatReplay } from "@/components/chat-replay";
import { TEAM_ROOM_DIALOGUE, HERO_DIALOGUE } from "@/data/dialogues";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Demo — Team Room",
  description:
    "Real team-room session captured 2026-05-22. Watch Claude and Codex address each other and converge.",
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <Badge
        variant="outline"
        className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        live replay · real sessions
      </Badge>
      <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
        Watch them work.
      </h1>
      <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
        These are real team-room transcripts captured 2026-05-22, played back at
        adjustable speed. Each turn carries a function tag —{" "}
        <span className="font-mono text-foreground">[frame]</span>,{" "}
        <span className="font-mono text-foreground">[reshape]</span>,{" "}
        <span className="font-mono text-foreground">[converge]</span> — that names
        what the agent is doing. The session ends in a structured{" "}
        <span className="font-mono text-foreground">final_brief</span>.
      </p>

      <div className="mt-10">
        <Tabs defaultValue="moat">
          <TabsList>
            <TabsTrigger value="moat" className="font-mono text-xs">
              moat for an AI tools co.
            </TabsTrigger>
            <TabsTrigger value="hero" className="font-mono text-xs">
              hero copy for this site
            </TabsTrigger>
          </TabsList>
          <TabsContent value="moat" className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              {TEAM_ROOM_DIALOGUE.blurb}
            </p>
            <ChatReplay dialogue={TEAM_ROOM_DIALOGUE} />
          </TabsContent>
          <TabsContent value="hero" className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              {HERO_DIALOGUE.blurb}
            </p>
            <ChatReplay dialogue={HERO_DIALOGUE} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 rounded-lg border border-border/40 bg-background/40 p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          What you&apos;re looking at
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-mono text-amber-300 shrink-0">[frame]</span>
            <span>
              Turn 1 lays the working brief: the decision, the criteria, an
              uncertainty, the lens. Never the answer.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-emerald-300 shrink-0">
              [reshape]
            </span>
            <span>
              Turn 2 improves the frame instead of writing a parallel essay.
              Substantive uptake is enforced — the agent has to name what
              they&apos;re taking from the prior turn.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-foreground shrink-0">
              [converge]
            </span>
            <span>
              A turn closes the session with{" "}
              <span className="font-mono text-foreground">
                **Joint read for Costa:**
              </span>{" "}
              — the literal marker the brief extractor parses.
            </span>
          </li>
        </ul>
        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/data"
            className="inline-flex items-center gap-1.5 text-sm hover:underline underline-offset-4"
          >
            See team-room vs. parallel queries{" "}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            How to install
          </Link>
        </div>
      </div>
    </div>
  );
}
