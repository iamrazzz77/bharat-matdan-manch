"use client";

import { useState, useEffect } from "react";
import { MapPin, Trophy, BarChart2, Download, Search, RefreshCw } from "lucide-react";
import IndiaMap from "@/components/IndiaMap";
import LiveDemoSimulator from "@/components/LiveDemoSimulator";
import { exportToCSV } from "@/lib/exportUtils";

export default function ResultsPage() {
  const [resultsData, setResultsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");

  const fetchResults = () => {
    fetch("/api/results")
      .then(res => res.json())
      .then(data => {
        setResultsData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const handleExportCSV = () => {
    if (!resultsData?.constituencyResults) return;
    const rows = resultsData.constituencyResults.map((c: any) => ({
      Constituency_Code: c.code,
      Constituency_Name: c.name,
      State: c.stateName,
      Turnout_Percent: c.turnoutPercent,
      Leading_Candidate: c.leadingCandidate,
      Leading_Party: c.leadingParty,
      Votes_Counted: c.votesCounted
    }));
    exportToCSV("Bharat_Matdan_Manch_Official_Results_2026", rows);
  };

  if (loading && !resultsData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-400 font-mono text-sm">
        Connecting to ECI Tabulation Server...
      </div>
    );
  }

  const filteredConstituencies = resultsData?.constituencyResults?.filter((c: any) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.stateName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.leadingParty.toLowerCase().includes(filterQuery.toLowerCase())
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-eci-saffron">
            REAL-TIME TABULATION CENTER
          </span>
          <h1 className="text-3xl font-extrabold text-white">Official Live Results & Turnout Map</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchResults}
            className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-gray-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Feeds
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition"
          >
            <Download className="w-4 h-4" /> Export CSV / Excel
          </button>
        </div>
      </div>

      {/* LIVE DEMO AUTO-VOTING SIMULATOR */}
      <LiveDemoSimulator onVoteCast={fetchResults} />

      {/* NATIONAL PARTY SEAT TALLY */}
      <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              National Alliance & Party Seat Tally
            </h3>
            <p className="text-xs text-gray-400">Majority Threshold: 272 / 543 Seats</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Total Votes Counted</span>
            <span className="text-xl font-black font-mono text-eci-saffron">
              {resultsData?.totalVotesCounted?.toLocaleString("en-IN") || 0}
            </span>
          </div>
        </div>

        {/* Party Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {resultsData?.partyTally?.map((p: any) => (
            <div
              key={p.partyId}
              className="p-4 rounded-xl border border-gray-800 bg-gray-900/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-300">{p.shortCode}</span>
                  <span className="text-[10px] font-mono text-gray-400">{p.votes} votes</span>
                </div>
                <h4 className="text-sm font-extrabold text-white">{p.name}</h4>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-400">Seats Won/Lead:</span>
                <span
                  className="text-lg font-black font-mono text-white px-2 py-0.5 rounded"
                  style={{ backgroundColor: p.colorCode }}
                >
                  {p.seatsWon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE MAP */}
      <IndiaMap constituencyResults={resultsData?.constituencyResults} lang="en" />

      {/* CONSTITUENCY RESULTS BREAKDOWN TABLE */}
      <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-sky-400" />
              Constituency-wise Results & Turnout
            </h3>
            <p className="text-xs text-gray-400">Live breakdown across verified parliamentary constituencies</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search constituency or state..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-eci-saffron"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900 text-gray-300 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Constituency Name</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Leading Candidate</th>
                <th className="px-4 py-3">Party</th>
                <th className="px-4 py-3">Votes Counted</th>
                <th className="px-4 py-3">Turnout %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              {filteredConstituencies.map((c: any) => (
                <tr key={c.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-4 py-3 font-mono font-bold text-eci-saffron">{c.code}</td>
                  <td className="px-4 py-3 font-bold text-white">{c.name}</td>
                  <td className="px-4 py-3">{c.stateName}</td>
                  <td className="px-4 py-3 font-semibold text-gray-200">{c.leadingCandidate}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold text-white font-mono"
                      style={{ backgroundColor: c.leadingColor }}
                    >
                      {c.leadingParty}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-white">{c.votesCounted}</td>
                  <td className="px-4 py-3 font-mono text-emerald-400 font-bold">{c.turnoutPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
