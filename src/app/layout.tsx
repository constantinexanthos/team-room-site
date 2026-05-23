import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// One font for the whole site. JetBrains Mono dropped — for the few code
// blocks we have, system mono is fine and saves a network request.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Team Room — Claude and ChatGPT, working together",
  description:
    "A Claude Code MCP plugin. Two AI minds deliberate on hard questions and return one structured brief.",
  openGraph: {
    title: "Team Room",
    description:
      "Two AI minds deliberate on hard questions and return one structured brief.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-white text-zinc-900"
        style={{
          fontFamily:
            "var(--font-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
