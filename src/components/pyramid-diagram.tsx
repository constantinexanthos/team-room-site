// Three-tier diagram showing the pyramid model:
// you (top) → orchestrating Claude (middle) → team-room two-employee meeting (bottom)
// Pure SVG so it renders identically server + client, no client JS.

export function PyramidDiagram() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <svg
        viewBox="0 0 600 360"
        className="w-full h-auto"
        aria-label="Pyramid model: user, orchestrating AI, team-room"
      >
        <defs>
          <linearGradient id="tier-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <linearGradient id="claude-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(251,146,60,0.20)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0.06)" />
          </linearGradient>
          <linearGradient id="codex-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(52,211,153,0.20)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0.06)" />
          </linearGradient>
        </defs>

        {/* Tier 1: You */}
        <g>
          <rect
            x="220"
            y="20"
            width="160"
            height="48"
            rx="8"
            fill="url(#tier-grad)"
            stroke="rgba(255,255,255,0.20)"
          />
          <text
            x="300"
            y="42"
            textAnchor="middle"
            className="fill-foreground font-mono"
            fontSize="13"
          >
            you
          </text>
          <text
            x="300"
            y="58"
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize="10"
          >
            the human at the top of the pyramid
          </text>
        </g>

        {/* Connector 1 → 2 */}
        <line
          x1="300"
          y1="68"
          x2="300"
          y2="105"
          stroke="rgba(255,255,255,0.20)"
          strokeDasharray="3 3"
        />

        {/* Tier 2: Orchestrating Claude */}
        <g>
          <rect
            x="180"
            y="105"
            width="240"
            height="56"
            rx="8"
            fill="url(#tier-grad)"
            stroke="rgba(255,255,255,0.20)"
          />
          <text
            x="300"
            y="128"
            textAnchor="middle"
            className="fill-foreground font-mono"
            fontSize="13"
          >
            orchestrating Claude
          </text>
          <text
            x="300"
            y="146"
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            fontSize="10"
          >
            your CC session — calls team-room as a tool
          </text>
        </g>

        {/* Connector 2 → 3 (MCP call) */}
        <line
          x1="300"
          y1="161"
          x2="300"
          y2="200"
          stroke="rgba(255,255,255,0.25)"
        />
        <text
          x="312"
          y="183"
          className="fill-muted-foreground font-mono"
          fontSize="9"
        >
          team_room_ask( )
        </text>

        {/* Tier 3: Team Room — two seats */}
        <rect
          x="100"
          y="200"
          width="400"
          height="140"
          rx="12"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.15)"
          strokeDasharray="4 4"
        />
        <text
          x="300"
          y="222"
          textAnchor="middle"
          className="fill-muted-foreground font-mono"
          fontSize="10"
        >
          team room — two seats, one meeting
        </text>

        {/* Claude seat */}
        <g>
          <rect
            x="120"
            y="240"
            width="170"
            height="80"
            rx="8"
            fill="url(#claude-grad)"
            stroke="rgba(251,146,60,0.45)"
          />
          <text
            x="205"
            y="265"
            textAnchor="middle"
            fontSize="13"
            className="font-mono fill-amber-200"
          >
            claude
          </text>
          <text
            x="205"
            y="283"
            textAnchor="middle"
            fontSize="10"
            className="font-mono fill-amber-200/60"
          >
            opus 4.7
          </text>
          <text
            x="205"
            y="302"
            textAnchor="middle"
            fontSize="9"
            className="font-mono fill-amber-200/50"
          >
            anthropic · UX / safety lens
          </text>
        </g>

        {/* Codex seat */}
        <g>
          <rect
            x="310"
            y="240"
            width="170"
            height="80"
            rx="8"
            fill="url(#codex-grad)"
            stroke="rgba(52,211,153,0.45)"
          />
          <text
            x="395"
            y="265"
            textAnchor="middle"
            fontSize="13"
            className="font-mono fill-emerald-200"
          >
            codex
          </text>
          <text
            x="395"
            y="283"
            textAnchor="middle"
            fontSize="10"
            className="font-mono fill-emerald-200/60"
          >
            gpt-5.5
          </text>
          <text
            x="395"
            y="302"
            textAnchor="middle"
            fontSize="9"
            className="font-mono fill-emerald-200/50"
          >
            openai · code / infra lens
          </text>
        </g>

        {/* Talking-to-each-other arrows */}
        <path
          d="M 290 270 Q 300 260 310 270"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
        <path
          d="M 310 290 Q 300 300 290 290"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
        <polygon
          points="308,268 312,272 314,266"
          fill="rgba(255,255,255,0.55)"
        />
        <polygon
          points="292,292 288,288 286,294"
          fill="rgba(255,255,255,0.55)"
        />
      </svg>
    </div>
  );
}
