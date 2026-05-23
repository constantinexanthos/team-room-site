import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Editorial display serif — Instrument Serif is the only one used for headlines.
// Italic variant matters; we'll use it as accent inside the wordmark and pull-quotes.
const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Body face — Inter at the heavier end. We keep it tight, optical-size-friendly.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

// Mono kept narrow and intentional — only labels, code, tags, captions.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Team Room — Claude and Codex, answering each other",
  description:
    "Two models from different labs deliberate by name and converge on one answer you can ship. A Claude Code MCP plugin.",
  openGraph: {
    title: "Team Room — Claude and Codex, answering each other",
    description:
      "Two models from different labs deliberate by name and converge on one answer you can ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${mono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-amber-300/30 selection:text-amber-50">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
