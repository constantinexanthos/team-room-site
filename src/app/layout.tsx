import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Two roles, one principle: Inter for everything readable, JetBrains Mono for
// code/labels only. No display serif. No italics. The mono is the legitimate
// exception because code in a proportional font reads wrong.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Team Room — Claude and ChatGPT, working together",
  description:
    "A Claude Code MCP plugin. Two AI minds deliberate on hard questions and return one structured brief.",
  openGraph: {
    title: "Team Room",
    description: "Two AI minds deliberate on hard questions and return one structured brief.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white text-zinc-900" style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
