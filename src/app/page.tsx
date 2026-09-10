"use client";

import { useState } from "react";
import Link from "next/link";
import { Vote, MapPin, Shield, Search, ArrowRight, Radio } from "lucide-react";
import IndiaMap from "@/components/IndiaMap";
import LiveDemoSimulator from "@/components/LiveDemoSimulator";

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
    <div className="space-y-12 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-eci-darkNavy via-slate-900 to-eci-darkNavy py-16 border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-eci-saffron/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eci-saffron/10 border border-eci-saffron/40 text-eci-saffron text-xs font-mono font-bold tracking-wide">
              <Vote className="w-3.5 h-3.5" />
              18th Lok Sabha General Elections 2026 Active
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Bharat Matdan Manch <br />
              <span className="bg-gradient-to-r from-eci-saffron via-amber-200 to-eci-green bg-clip-text text-transparent">
                India Digital Election Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              A secure, end-to-end verifiable digital voting workflow featuring multi-factor voter authorization, interactive VVPAT print demo verification, double-vote prevention lock, and real-time constituency analytics across 543 Parliamentary Constituencies.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/voter"
                className="px-6 py-3.5 bg-gradient-to-r from-eci-saffron to-amber-600 hover:from-amber-500 hover:to-eci-saffron text-gray-950 font-extrabold rounded-xl shadow-xl hover:shadow-amber-500/20 text-sm transition-all flex items-center gap-2 group"
              >
                <Vote className="w-4 h-4" />
                Cast Digital Ballot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/results"
                className="px-6 py-3.5 bg-gray-800/80 hover:bg-gray-800 border border-gray-700 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                View Live Results & Map
              </Link>
            </div>
          </div>

          {/* NATIONAL STATS TICKER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-5xl mx-auto">
            <div className="bg-eci-cardBg/90 border border-gray-700/80 p-5 rounded-2xl text-center shadow-xl">
              <span className="text-2xl sm:text-3xl font-black text-eci-saffron font-mono block">95.4 Cr</span>
              <span className="text-xs text-gray-400 font-medium">Registered Voters</span>
            </div>
            <div className="bg-eci-cardBg/90 border border-gray-700/80 p-5 rounded-2xl text-center shadow-xl">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono block">543</span>
              <span className="text-xs text-gray-400 font-medium">Parliamentary Constituencies</span>
            </div>
            <div className="bg-eci-cardBg/90 border border-gray-700/80 p-5 rounded-2xl text-center shadow-xl">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">10.5 Lakh</span>
              <span className="text-xs text-gray-400 font-medium">Polling Booths</span>
            </div>
            <div className="bg-eci-cardBg/90 border border-gray-700/80 p-5 rounded-2xl text-center shadow-xl">
              <span className="text-2xl sm:text-3xl font-black text-sky-400 font-mono block">67.8%</span>
              <span className="text-xs text-gray-400 font-medium">National Voter Turnout</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DEMO AUTO-VOTING SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveDemoSimulator onVoteCast={() => setRefreshTrigger(prev => prev + 1)} />
      </section>

      {/* QUICK EPIC VOTER LOOKUP TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-eci-saffron" />
              Check EPIC Voter Eligibility & Assigned Station
            </h2>
            <p className="text-xs text-gray-400">
              Enter your Electoral Photo Identity Card (EPIC) Number to check constituency allocation and voting status.
            </p>
          </div>

          <form onSubmit={handleEpicSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. EPIC100001 or EPIC100002"
              value={epicSearch}
              onChange={(e) => setEpicSearch(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-eci-saffron font-mono"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-eci-saffron hover:bg-amber-500 text-gray-950 font-bold rounded-xl text-sm transition shadow-lg"
            >
              {isSearching ? "Searching..." : "Search Index"}
            </button>
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="mt-3 text-center text-xs text-gray-400 flex justify-center gap-2 flex-wrap">
            <span>Demo EPIC Shortcuts:</span>
            <button onClick={() => setEpicSearch("EPIC100001")} className="underline text-eci-saffron hover:text-amber-300">EPIC100001 (Mumbai South)</button>
            <button onClick={() => setEpicSearch("EPIC100003")} className="underline text-eci-saffron hover:text-amber-300">EPIC100003 (Varanasi)</button>
          </div>

          {/* Search Result Card */}
          {searchResult && (
            <div className="mt-6 max-w-xl mx-auto bg-gray-950 border border-gray-800 rounded-xl p-5 text-left text-xs space-y-2">
              {searchResult.notFound ? (
                <p className="text-red-400 font-semibold">❌ No voter record found for EPIC "{epicSearch}". Try demo ID: EPIC100001.</p>
              ) : searchResult.error ? (
                <p className="text-red-400 font-semibold">{searchResult.error}</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <span className="font-bold text-sm text-white">{searchResult.fullName}</span>
                    <span className="font-mono text-eci-saffron font-bold">{searchResult.epicNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-gray-300">
                    <p><strong>Constituency:</strong> {searchResult.constituencyName}</p>
                    <p><strong>Polling Station:</strong> {searchResult.stationName}</p>
                    <p><strong>Booth No:</strong> Booth #{searchResult.boothNumber}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {searchResult.hasVoted ? (
                        <span className="text-emerald-400 font-bold">Ballot Cast & Hash Verified</span>
                      ) : (
                        <span className="text-amber-400 font-bold">Eligible to Vote</span>
                      )}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/voter"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-eci-saffron to-amber-600 text-gray-950 font-bold rounded-lg text-xs"
                    >
                      Login to Voter Portal <ArrowRight className="w-3.5 h-3.5" />
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
        <IndiaMap key={refreshTrigger} lang="en" />
      </section>
    </div>
  );
}
