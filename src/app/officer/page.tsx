"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Search, UserCheck, CheckCircle, AlertTriangle, Users, Ticket, RefreshCw } from "lucide-react";

export default function PollingOfficerPage() {
  const router = useRouter();
  const [officerSession, setOfficerSession] = useState<any>(null);
  const [votersQueue, setVotersQueue] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState("");

  const loadQueue = (query = "") => {
    setLoading(true);
    fetch(`/api/officer?query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          router.push("/login");
          return;
        }
        setVotersQueue(data.voters || []);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated || (data.user.role !== "POLLING_OFFICER" && data.user.role !== "ADMIN" && data.user.role !== "SUPER_ADMIN")) {
          router.push("/login");
          return;
        }
        setOfficerSession(data.user);
        loadQueue();
      });
  }, []);

  const handleVerifyVoter = async (voterId: string, epicNumber: string) => {
    setActionSuccess("");
    try {
      const res = await fetch("/api/officer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterId, action: "VERIFY_IDENTITY" })
      });
      const data = await res.json();
      if (res.ok) {
        setActionSuccess(`Voter Identity Verified for ${epicNumber}. Digital Voting Authorization Token issued.`);
        loadQueue(searchQuery);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !officerSession) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-400 font-mono text-sm">
        Authenticating Polling Officer Terminal...
      </div>
    );
  }

  const votedCount = votersQueue.filter(v => v.hasVoted).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            BOOTH OFFICER TERMINAL
          </span>
          <h1 className="text-3xl font-extrabold text-white">Polling Station & Booth Queue Portal</h1>
          <p className="text-xs text-gray-400 mt-1">
            Officer: {officerSession?.fullName} ({officerSession?.epicNumber}) • Station: {officerSession?.pollingStation?.name || "St. Xavier High School"} • Booth #{officerSession?.boothNumber || 1}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] text-gray-400 uppercase block">Verified Turnout</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              {votedCount} / {votersQueue.length} Voters
            </span>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-xl text-xs flex items-center gap-2 shadow">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* VOTER QUEUE SEARCH & CONTROL */}
      <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              Assigned Booth Voter Verification Queue
            </h3>
            <p className="text-xs text-gray-400">Search elector by EPIC number or full name to issue voting token</p>
          </div>

          <div className="relative w-full sm:w-80 flex gap-2">
            <input
              type="text"
              placeholder="Search EPIC or Name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                loadQueue(e.target.value);
              }}
              className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
            />
            <button
              onClick={() => loadQueue(searchQuery)}
              className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 text-gray-300"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QUEUE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900 text-gray-300 font-bold uppercase text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="px-4 py-3">EPIC Number</th>
                <th className="px-4 py-3">Elector Name</th>
                <th className="px-4 py-3">Aadhaar Link</th>
                <th className="px-4 py-3">Constituency</th>
                <th className="px-4 py-3">Booth Status</th>
                <th className="px-4 py-3 text-right">Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              {votersQueue.map((v) => (
                <tr key={v.id} className="hover:bg-gray-800/40 transition">
                  <td className="px-4 py-3 font-mono font-bold text-eci-saffron">{v.epicNumber}</td>
                  <td className="px-4 py-3 font-bold text-white">{v.fullName}</td>
                  <td className="px-4 py-3 font-mono text-gray-400">{v.aadhaarHash || "LINKED"}</td>
                  <td className="px-4 py-3">{v.constituencyName}</td>
                  <td className="px-4 py-3">
                    {v.hasVoted ? (
                      <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 font-bold text-[10px] rounded border border-emerald-800">
                        VOTED (RECEIPT: {v.receiptHash?.slice(0, 10)}...)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-bold text-[10px] rounded border border-amber-800">
                        AWAITING TOKEN
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!v.hasVoted && (
                      <button
                        onClick={() => handleVerifyVoter(v.id, v.epicNumber)}
                        className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-extrabold rounded-lg text-[11px] shadow transition inline-flex items-center gap-1"
                      >
                        <Ticket className="w-3.5 h-3.5" /> Issue Token
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
