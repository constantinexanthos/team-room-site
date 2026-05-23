import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// One typeface. One weight. The entire site speaks in JetBrains Mono —
// it's terminal-native (team-room is a Claude Code plugin) and it makes
// the whole page feel like a single coherent artifact, not a typography
// exercise. No display serif. No italics.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Team Room — Claude and Codex, answering each other",
  description:
    "Two AI minds in one room, talking to each other. A Claude Code MCP plugin.",
  openGraph: {
    title: "Team Room",
    description:
      "Two AI minds in one room, talking to each other.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-black text-[#e8e6e3]" style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}>
        {children}
      </body>
    </html>
  );
}
