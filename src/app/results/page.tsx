"use client";

import { useState, useEffect } from "react";
import { MapPin, Trophy, BarChart2, Download, Search, RefreshCw, Filter } from "lucide-react";
import IndiaMap from "@/components/IndiaMap";
import LiveDemoSimulator from "@/components/LiveDemoSimulator";
import GeoSelector, { GeoSelection } from "@/components/GeoSelector";
import { exportToCSV } from "@/lib/exportUtils";

const FALLBACK_OFFLINE_RESULTS = {
  totalVotesCounted: 678450,
  partyTally: [
    { partyId: "p1", name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", seatsWon: 278, votes: 284500 },
    { partyId: "p2", name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", seatsWon: 182, votes: 210400 },
    { partyId: "p3", name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", seatsWon: 54, votes: 112300 },
    { partyId: "p4", name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", seatsWon: 29, votes: 71250 }
  ],
  constituencyResults: [
    { code: "PC01-MH", name: "Mumbai South", districtName: "Mumbai City", stateName: "Maharashtra", turnoutPercent: "64.5%", leadingCandidate: "Devendra Shinde", leadingParty: "BEP", votesCounted: 32400 },
    { code: "PC02-UP", name: "Varanasi", districtName: "Varanasi", stateName: "Uttar Pradesh", turnoutPercent: "69.2%", leadingCandidate: "Narendra Swamy", leadingParty: "BEP", votesCounted: 48500 },
    { code: "PC03-KL", name: "Wayanad", districtName: "Wayanad", stateName: "Kerala", turnoutPercent: "77.4%", leadingCandidate: "Rahul Nair", leadingParty: "NPA", votesCounted: 16800 },
    { code: "PC01-KA", name: "Bangalore South", districtName: "Bengaluru Urban", stateName: "Karnataka", turnoutPercent: "71.0%", leadingCandidate: "Anand Patel", leadingParty: "NPA", votesCounted: 21200 },
    { code: "PC01-DL", name: "Chandni Chowk", districtName: "Central Delhi", stateName: "Delhi", turnoutPercent: "62.1%", leadingCandidate: "Vikram Verma", leadingParty: "BEP", votesCounted: 12400 },
    { code: "PC01-WB", name: "Kolkata Uttar", districtName: "Kolkata", stateName: "West Bengal", turnoutPercent: "78.9%", leadingCandidate: "Smriti Banerjee", leadingParty: "DSF", votesCounted: 31200 },
    { code: "PC01-RJ", name: "Jaipur", districtName: "Jaipur", stateName: "Rajasthan", turnoutPercent: "66.3%", leadingCandidate: "Rajesh Kumar", leadingParty: "BEP", votesCounted: 19800 },
    { code: "PC01-GJ", name: "Ahmedabad East", districtName: "Ahmedabad", stateName: "Gujarat", turnoutPercent: "66.4%", leadingCandidate: "Amit Patel", leadingParty: "BEP", votesCounted: 18400 },
    { code: "PC01-BR", name: "Patna Sahib", districtName: "Patna", stateName: "Bihar", turnoutPercent: "62.8%", leadingCandidate: "Devendra Verma", leadingParty: "NPA", votesCounted: 24500 }
  ]
};

export default function ResultsPage() {
  const [resultsData, setResultsData] = useState<any>(FALLBACK_OFFLINE_RESULTS);
  const [loading, setLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [geoFilter, setGeoFilter] = useState<GeoSelection>({});

  const fetchResults = (filter = geoFilter, search = filterQuery) => {
    const params = new URLSearchParams();
    if (filter.stateId) params.set("stateId", filter.stateId);
    if (filter.districtId) params.set("districtId", filter.districtId);
    if (filter.constituencyId) params.set("constituencyId", filter.constituencyId);
    if (search.trim()) params.set("search", search.trim());

    fetch(`/api/results?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        if (data && data.constituencyResults) {
          setResultsData(data);
          setIsOfflineMode(false);
        } else {
          setResultsData(FALLBACK_OFFLINE_RESULTS);
          setIsOfflineMode(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setResultsData(FALLBACK_OFFLINE_RESULTS);
        setIsOfflineMode(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResults(geoFilter, filterQuery);
    const interval = setInterval(() => {
      fetchResults(geoFilter, filterQuery);
    }, 5000);
    return () => clearInterval(interval);
  }, [geoFilter.stateId, geoFilter.districtId, geoFilter.constituencyId, filterQuery]);

  const handleGeoSelectionChange = (selection: GeoSelection) => {
    setGeoFilter(selection);
    fetchResults(selection, filterQuery);
  };

  const handleExportCSV = () => {
    if (!resultsData?.constituencyResults) return;
    const rows = resultsData.constituencyResults.map((c: any) => ({
      Constituency_Code: c.code,
      Constituency_Name: c.name,
      District: c.districtName,
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

  const filteredConstituencies = resultsData?.constituencyResults?.filter(
    (c: any) =>
      c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.stateName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (c.districtName && c.districtName.toLowerCase().includes(filterQuery.toLowerCase())) ||
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
          <p className="text-xs text-gray-400 mt-1">
            Dynamic database feeds across 36 States & Union Territories • ECI Delimitation 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isOfflineMode && (
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Cached Data Feed
            </span>
          )}
          <button
            onClick={() => fetchResults(geoFilter, filterQuery)}
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

      {/* DYNAMIC CASCADING GEOGRAPHY FILTER BAR */}
      <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-eci-saffron" />
            Database Geographic Filters & Hierarchy Lookup
          </h3>
          {geoFilter.stateId && (
            <button
              onClick={() => {
                setGeoFilter({});
                setFilterQuery("");
              }}
              className="text-[11px] font-bold text-red-400 hover:underline"
            >
              Clear Geographic Filters
            </button>
          )}
        </div>

        <GeoSelector
          showPollingStation={false}
          showBooth={false}
          initialSelection={geoFilter}
          onSelectionChange={handleGeoSelectionChange}
        />
      </div>

      {/* LIVE DEMO AUTO-VOTING SIMULATOR */}
      <LiveDemoSimulator onVoteCast={() => fetchResults(geoFilter, filterQuery)} />

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

      {/* DYNAMIC INDIA MASTER MAP (ALL 36 STATES/UTS) */}
      <IndiaMap
        statesData={resultsData?.statesData}
        constituencyResults={resultsData?.constituencyResults}
        onSelectState={(st) => {
          const matchedState = resultsData?.statesData?.find((s: any) => s.code === st.code || s.name === st.name) || st;
          const targetId = matchedState.id || st.id;
          setGeoFilter({
            stateId: targetId || undefined,
            stateCode: st.code,
            stateName: st.name
          });
        }}
        lang="en"
      />

      {/* CONSTITUENCY RESULTS BREAKDOWN TABLE */}
      <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-sky-400" />
              Constituency-wise Results & Turnout
            </h3>
            <p className="text-xs text-gray-400">
              Live breakdown across verified parliamentary & assembly constituencies
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search constituency, district or state..."
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
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">State / UT</th>
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
                  <td className="px-4 py-3 text-sky-300 font-semibold">{c.districtName}</td>
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
              {filteredConstituencies.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-400 italic">
                    No constituency records match the selected geographic filters or search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
