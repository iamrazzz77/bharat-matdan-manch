"use client";

import { useState } from "react";
import Link from "next/link";
import { Vote, MapPin, Shield, Search, ArrowRight, Radio } from "lucide-react";
import IndiaMap from "@/components/IndiaMap";
import LiveDemoSimulator from "@/components/LiveDemoSimulator";
import LiveAuditLedger from "@/components/LiveAuditLedger";

export default function HomePage() {
  const [epicSearch, setEpicSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEpicSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!epicSearch) return;
    setIsSearching(true);
    setSearchResult(null);

    try {
      const res = await fetch(`/api/officer?query=${encodeURIComponent(epicSearch.trim())}`);
      const data = await res.json();
      if (data.voters && data.voters.length > 0) {
        setSearchResult(data.voters[0]);
      } else {
        setSearchResult({ notFound: true });
      }
    } catch (err) {
      setSearchResult({ error: "Failed to query voter index." });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-14 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-20 border-b border-slate-800/80 bg-slate-950/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-eci-saffron/15 via-amber-500/5 to-transparent pointer-events-none blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eci-saffron/10 border border-eci-saffron/30 text-eci-saffron text-xs font-mono font-bold tracking-wide shadow-lg backdrop-blur-md animate-pulse-glow">
              <Vote className="w-4 h-4 text-eci-saffron" />
              <span>18th Lok Sabha General Elections 2026 Active</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Bharat Matdan Manch <br />
              <span className="bg-gradient-to-r from-eci-saffron via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                India Digital Election Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Official end-to-end verifiable digital voting portal with multi-factor voter authentication, double-vote lock, instant VVPAT audit verification, and real-time live results across 543 Parliamentary Constituencies.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/voter"
                className="px-7 py-4 bg-gradient-to-r from-eci-saffron via-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black rounded-2xl shadow-xl hover:shadow-amber-500/25 text-sm transition-all flex items-center gap-2 group tracking-wide"
              >
                <Vote className="w-5 h-5 text-slate-950" />
                Cast Digital Ballot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/results"
                className="px-7 py-4 glass-card hover:bg-slate-800/80 border border-slate-700 text-white font-bold rounded-2xl text-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                View Live Results & Interactive Map
              </Link>
            </div>
          </div>

          {/* NATIONAL STATS TICKER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
            <div className="glass-card glass-card-hover p-5 rounded-2xl text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-eci-saffron/10 rounded-full blur-xl group-hover:bg-eci-saffron/20 transition-all" />
              <span className="text-2xl sm:text-3xl font-black text-eci-saffron font-mono block tracking-tight">95.4 Cr</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">Registered Voters</span>
            </div>

            <div className="glass-card glass-card-hover p-5 rounded-2xl text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block tracking-tight">543</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">Constituencies</span>
            </div>

            <div className="glass-card glass-card-hover p-5 rounded-2xl text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block tracking-tight">10.5 Lakh</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">Polling Booths</span>
            </div>

            <div className="glass-card glass-card-hover p-5 rounded-2xl text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono block tracking-tight">67.8%</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">National Voter Turnout</span>
            </div>
          </div>
        </div>
      </section>

      {/* RECRUITER & ENGINEERING ARCHITECTURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-slate-900/50 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                ⚙️ Technical Portfolio Showcase
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Full-Stack Security & System Architecture</h2>
              <p className="text-xs text-slate-400 mt-0.5">Built with Next.js 14 App Router, TypeScript, Prisma ORM, JWT RBAC, and SHA-256 Chained Hashes.</p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow hover:brightness-110 transition flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Quick Demo Login
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-eci-saffron font-bold text-sm block font-mono">01. Secret Ballot Privacy</span>
              <p className="text-slate-300 leading-relaxed">Voter authentication (`VoterParticipation`) is cryptographically decoupled from anonymous vote choices (`AnonymousVote`).</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-sm block font-mono">02. Double-Vote Prevention</span>
              <p className="text-slate-300 leading-relaxed">Unique DB composite constraint on `(voterId, electionId)` guarantees non-repeatable single ballot submissions.</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold text-sm block font-mono">03. Audit Log Ledger</span>
              <p className="text-slate-300 leading-relaxed">Tamper-evident SHA-256 hash chains record every ballot event, candidate creation, and status transition.</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold text-sm block font-mono">04. Interactive VVPAT Slip</span>
              <p className="text-slate-300 leading-relaxed">Real-time electronic VVPAT paper slip printing simulation with verification receipt generation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DEMO AUTO-VOTING SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveDemoSimulator onVoteCast={() => setRefreshTrigger(prev => prev + 1)} />
      </section>

      {/* LIVE CRYPTOGRAPHIC AUDIT STREAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveAuditLedger />
      </section>

      {/* QUICK EPIC VOTER LOOKUP TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center gap-2.5">
              <Search className="w-6 h-6 text-eci-saffron" />
              EPIC Voter Status & Polling Booth Finder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Enter your Electoral Photo Identity Card (EPIC) Number to verify constituency allocation and voting status instantly.
            </p>
          </div>

          <form onSubmit={handleEpicSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. EPIC100001 or EPIC100002"
              value={epicSearch}
              onChange={(e) => setEpicSearch(e.target.value)}
              className="flex-1 px-5 py-3.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-eci-saffron font-mono tracking-wider shadow-inner"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-7 py-3.5 bg-gradient-to-r from-eci-saffron to-amber-600 hover:brightness-110 text-slate-950 font-extrabold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
            >
              {isSearching ? "Searching Index..." : "Verify EPIC"}
            </button>
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="mt-4 text-center text-xs text-slate-400 flex justify-center gap-2 flex-wrap items-center">
            <span className="font-semibold text-slate-300">Try Sample EPIC IDs:</span>
            <button onClick={() => setEpicSearch("EPIC100001")} className="px-2 py-0.5 rounded bg-slate-800 text-eci-saffron hover:bg-slate-700 font-mono transition">EPIC100001 (Mumbai South)</button>
            <button onClick={() => setEpicSearch("EPIC100003")} className="px-2 py-0.5 rounded bg-slate-800 text-eci-saffron hover:bg-slate-700 font-mono transition">EPIC100003 (Varanasi)</button>
          </div>

          {/* Search Result Card */}
          {searchResult && (
            <div className="mt-8 max-w-xl mx-auto bg-slate-950/90 border border-slate-700 rounded-2xl p-6 text-left text-xs space-y-3 shadow-2xl animate-in fade-in duration-200">
              {searchResult.notFound ? (
                <p className="text-rose-400 font-semibold text-sm">❌ No voter record found for EPIC "{epicSearch}". Please try demo ID: EPIC100001.</p>
              ) : searchResult.error ? (
                <p className="text-rose-400 font-semibold text-sm">{searchResult.error}</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="block font-extrabold text-base text-white">{searchResult.fullName}</span>
                      <span className="text-[11px] text-slate-400">Gender: {searchResult.gender} • Age: {searchResult.age}</span>
                    </div>
                    <span className="font-mono text-eci-saffron font-extrabold text-sm px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      {searchResult.epicNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-slate-300 text-xs">
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">Constituency</strong>
                      <span className="font-semibold text-white">{searchResult.constituencyName}</span>
                    </p>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">Polling Station</strong>
                      <span className="font-semibold text-white">{searchResult.stationName}</span>
                    </p>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">Booth Number</strong>
                      <span className="font-semibold text-white">Booth #{searchResult.boothNumber}</span>
                    </p>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">Ballot Status</strong>
                      {searchResult.hasVoted ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          ✓ Hash Verified
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                          Eligible to Vote
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/voter"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg hover:brightness-110 transition-all"
                    >
                      Proceed to Voter Portal <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE INDIA MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IndiaMap lang="en" />
      </section>
    </div>
  );
}
