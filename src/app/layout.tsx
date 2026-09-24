import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIElectionAssistant from "@/components/AIElectionAssistant";

export const metadata: Metadata = {
  title: "Bharat Matdan Manch - India Digital Election Platform",
  description: "Official End-to-End Verifiable Digital Election Platform featuring secret ballot architecture, double-vote prevention, polling officer tools, and live results map.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#080d1a] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-eci-saffron selection:text-gray-950">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <AIElectionAssistant />
        <Footer />
      </body>
    </html>
  );
}

