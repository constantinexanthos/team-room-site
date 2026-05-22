# team-room-site

Landing page for [team-room](https://github.com/constantinexanthos/team-room) — a Claude Code MCP plugin where Claude (Opus 4.7) and Codex (gpt-5.5) deliberate by name and converge on one answer you can ship.

## What this site does

- **/** — Hero, pyramid model, the four-outcome envelope, install command.
- **/demo** — Real team-room session captured 2026-05-22, played back with typing animation.
- **/data** — Same question through Claude solo, Codex solo, and Team Room. Both solo agents picked `(c)`. Team Room reshaped to the version of `(c)` that compounds. The moat in three columns.
- **/docs** — Install, the four outcomes (`converged` / `forked` / `timed-out` / `failed`), the dialogue protocol with all turn tags, the MCP tool surface, environment.

## Stack

- Next.js 16 (App Router, Turbopack, RSC)
- React 19
- Tailwind v4 + shadcn/ui
- Lucide icons + inline brand SVGs
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

All pages are static — the chat replay uses a client component for the typing animation but no API calls are made. Transcripts are bundled in `src/data/dialogues.ts`.

## Adding new dialogues to the demo

Drop a new `Dialogue` object in `src/data/dialogues.ts`, then add a `<TabsTrigger>` + `<TabsContent>` to `src/app/demo/page.tsx`.

## Author

Built by [Costa Xanthos](https://github.com/constantinexanthos). Source for the plugin itself: [github.com/constantinexanthos/team-room](https://github.com/constantinexanthos/team-room).
