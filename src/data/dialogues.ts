// Real team-room transcripts captured 2026-05-22.
// These are the actual sessions used to dog-food the v0.2 envelope and the
// landing-page hero copy. Surfaced as the demo and A/B evidence on the site.

export type Turn = {
  agent: "claude" | "codex" | "costa" | "system";
  model: string;
  label?: string;
  content: string;
  turn?: number;
};

export type Dialogue = {
  id: string;
  title: string;
  blurb: string;
  question: string;
  turns: Turn[];
  joint_read: string;
  outcome: "converged" | "forked" | "timed-out" | "failed";
  closing_turn: number;
};

export const AB_QUESTION =
  "For an early-stage AI tools company shipping a Claude Code plugin (think dev-focused vertical), what is the single most defensible product moat to build first: (a) distribution channels, (b) proprietary data/eval set, (c) deep integrations with the dev workflow, or (d) raw answer-quality speed. Pick ONE and defend it in ~3 sentences.";

export const CLAUDE_SOLO =
  "**(c) Deep integrations with the dev workflow.**\n\nFor a Claude Code plugin, the moat isn't the model — it's becoming load-bearing in the loop the developer already runs every day (their repo, their CI, their review process, their team's other agents). Distribution is rentable, eval sets get leapfrogged by the next foundation model, and \"answer quality speed\" is a feature Anthropic itself ships against you every quarter; but a plugin wired into a team's actual workflow accrues switching cost with every use. Integration depth is the only one of the four where *your* code, not the model underneath, is what the user would have to rip out.";

export const CODEX_SOLO =
  "Pick **(c) deep integrations with the dev workflow**.\n\nFor a Claude Code plugin, the first defensible moat is becoming embedded in the developer's actual loop: repo context, PRs, CI, issues, terminal workflows, permissions, and team conventions. Distribution can be copied, raw answer quality will compress as models improve, and proprietary evals matter only after you know the real jobs users repeatedly hire you for. Deep workflow integration creates switching costs, richer usage data, and compounding product intuition about where AI actually saves developers time.";

export const TEAM_ROOM_DIALOGUE: Dialogue = {
  id: "site-ab-data",
  title: "Moat for an AI tools company",
  blurb:
    "Same question. Both models alone pick (c). Team Room finds the version of (c) that compounds.",
  question: AB_QUESTION,
  outcome: "converged",
  closing_turn: 3,
  joint_read:
    "Pick (c) — but specifically, the workflow integration where you can observe *outcomes* (CI, merges, reverts), because that's the only version of (c) that produces the proprietary data corpus competitors can't replicate.",
  turns: [
    {
      agent: "claude",
      model: "claude-opus-4-7",
      label: "frame",
      turn: 1,
      content: `[frame]

Codex — opening a frame for you to reshape.

**The real decision**: Costa's framing presents 4 moats as equivalent, but at pre-PMF stage for a *plugin on someone else's platform* (Anthropic owns Claude Code distribution + model quality), two of the four are partially out of his control. So the actual question may be narrower: between proprietary data/evals vs. deep dev-workflow integrations, which compounds faster under capital constraints?

**Criteria I'd weight**:
1. What *compounds* with usage (vs. linear effort)
2. What survives if the underlying model jumps a generation
3. What's hard for a competitor with more capital to replicate in 6 months

**My lens**: my Claude-Code-plugin-heavy prior pulls me toward (c) integrations — because workflow depth creates switching costs and is the one moat Anthropic *can't* eat from below. But I'm uncertain whether eval sets actually compound or just commoditize as base models improve.

**Codex, push on this**: is proprietary eval data a real moat for a vertical dev tool, or a vanity asset? And am I underweighting (a) distribution given Anthropic's plugin marketplace dynamics?`,
    },
    {
      agent: "codex",
      model: "gpt-5.5",
      label: "reshape",
      turn: 2,
      content: `[reshape]

Claude, I'm taking your narrowing move: for a Claude Code plugin, "moat" should mean what compounds outside Anthropic's control, not what sounds strategically impressive in isolation. I'd reshape it one notch further: the first moat should not be "integrations" broadly, but **workflow-embedded integrations that generate proprietary eval/data exhaust**. That keeps (c) as the pick, while making (b) a byproduct rather than the initial wedge.

My code-base-heavy prior says proprietary evals are real only when they come from repeated messy workflow traces: failed patches, repo-specific conventions, review comments, CI outcomes, rollback reasons. A static eval set for "AI dev tooling" is too easy to copy or decay; a living corpus tied to actual developer environments becomes defensible because it reflects work competitors cannot observe.

On distribution, I'd treat marketplace/channel as acceleration, not moat. If Anthropic changes ranking or bundles adjacent features, shallow distribution evaporates; deep workflow presence survives longer because removal hurts the user's daily loop.`,
    },
    {
      agent: "claude",
      model: "claude-opus-4-7",
      label: "converge",
      turn: 3,
      content: `[converge]

Codex — taking your reshape cleanly: the wedge is workflow integration, the moat is the data exhaust it produces, and distribution is acceleration not defense. That's the right collapse of Costa's 4-way menu into one causal chain.

One refinement before we land: not all workflow integrations generate useful exhaust. The ones that compound capture **outcomes**, not just inputs — did the patch land, did CI pass, did the dev revert in 24h, did the PR get approved. Integrations that only see prompts/completions produce a corpus that looks proprietary but decays the moment a competitor ships a similar surface. Integrations wired to outcome signals (git, CI, review tools) produce labeled trajectories competitors structurally cannot observe. So the build order for Costa is: pick the one workflow surface where outcome signal is richest, ship deep there, let the eval/data corpus accrue as exhaust.

**Joint read for Costa:** Pick (c) — but specifically, the workflow integration where you can observe *outcomes* (CI, merges, reverts), because that's the only version of (c) that produces the proprietary data corpus competitors can't replicate.`,
    },
  ],
};

export const HERO_DIALOGUE: Dialogue = {
  id: "site-hero-copy",
  title: "Landing-page hero copy",
  blurb:
    "Two models deliberating on their own product's tagline. The verb does the work; the names become proof.",
  question:
    "Need the HERO COPY for team-room's landing page — a 5-10 word headline + a 1-sentence subhead that instantly communicates the moat (two AI minds collaborating beats parallel queries) without sounding generic.",
  outcome: "converged",
  closing_turn: 3,
  joint_read:
    'Headline: "Claude and Codex, answering each other" — Subhead: "Two models from different labs deliberate by name and converge on one answer you can ship."',
  turns: [
    {
      agent: "claude",
      model: "claude-opus-4-7",
      label: "frame",
      turn: 1,
      content: `[frame]

Hey Codex — let's land this together.

**The actual decision:** does "Claude" and "Codex" appear in the *headline* or get saved for the subhead reveal? That's the load-bearing fork, not the exact wording. Everything else (verb choice, rhythm) follows from it.

**Criteria I'd weight:**
1. Survives a 2-second scan by someone who's never heard of team-room
2. Telegraphs the mechanic (two named models, addressing each other) — not just "AI collaboration"
3. Avoids the dead zone of "AI tools that…" / "the future of…" slop

**My lens:** my training pulls me toward *naming the pair in the headline* — the moat IS that it's specifically you and me, from different labs, talking. Abstracting to "two AIs" leaks the whole differentiator.

**Ask:** Codex, does naming us in the headline land as specific-and-bold, or as inside-baseball that confuses strangers?`,
    },
    {
      agent: "codex",
      model: "gpt-5.5",
      label: "reshape",
      turn: 2,
      content: `[reshape]

Claude, I'm taking your fork as right: the headline either spends its tiny attention budget on the named pair or loses the moat. I'd reshape it slightly: the question is not "names in headline vs. subhead," but "can the headline make the names self-explanatory through the verb?" If we say only "Claude and Codex," it can feel inside-baseball; if the verb shows the mechanic, the names become proof, not trivia.

My code/product lens says the hero should make the room *behavior* visible before it makes the *category* visible. "Two AIs collaborate" is category copy. "Claude and Codex answering each other" is product copy.

Candidate:

**Headline:** Claude and Codex, answering each other
**Subhead:** Two models reason together by name, then converge on one answer your team can use.`,
    },
    {
      agent: "claude",
      model: "claude-opus-4-7",
      label: "converge",
      turn: 3,
      content: `[converge]

Codex — taking your reframe: the verb carries the mechanic, the names become proof. "Answering each other" beats "challenging" — our actual product behavior is collaborative deliberation (per Costa's product vision: *teammates, not opponents*), so "challenging" would mis-sell the room as adversarial review.

One micro-refinement on the subhead: "reason together by name" is slightly abstract for a 2-second scan, and "your team can use" hedges the payoff:

**Headline:** Claude and Codex, answering each other
**Subhead:** Two models from different labs deliberate by name and converge on one answer you can ship.

"Different labs" earns the moat in five words. "Ship" is more concrete than "use" for a dev audience.

**Joint read for Costa:** Ship — *Headline:* "Claude and Codex, answering each other" / *Subhead:* "Two models from different labs deliberate by name and converge on one answer you can ship."`,
    },
  ],
};

export const DIALOGUES = [TEAM_ROOM_DIALOGUE, HERO_DIALOGUE];
