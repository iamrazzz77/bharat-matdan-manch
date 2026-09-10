"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Zap, RefreshCw, Radio, CheckCircle2, RotateCcw } from "lucide-react";

interface LiveDemoSimulatorProps {
  onVoteCast?: () => void;
}

export default function LiveDemoSimulator({ onVoteCast }: LiveDemoSimulatorProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<number>(1500); // 1.5 seconds default
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [totalSimulated, setTotalSimulated] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(async () => {
        try {
          const res = await fetch("/api/vote/demo-simulate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count: 1 })
          });
          const data = await res.json();
          if (data.success && data.latestEvents?.length > 0) {
            const event = data.latestEvents[0];
            setRecentLogs(prev => [event, ...prev.slice(0, 7)]);
            setTotalSimulated(data.totalVotes);
            if (onVoteCast) onVoteCast();
          }
        } catch (e) {
          console.error("Simulation error", e);
        }
      }, speed);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, speed, onVoteCast]);

  const handleCastBurst = async (batchCount: number) => {
    try {
      const res = await fetch("/api/vote/demo-simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: batchCount })
      });
      const data = await res.json();
      if (data.success) {
        setRecentLogs(prev => [...(data.latestEvents || []), ...prev].slice(0, 8));
        setTotalSimulated(data.totalVotes);
        if (onVoteCast) onVoteCast();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetVotes = async () => {
    setIsResetting(true);
    try {
      await fetch("/api/vote/demo-simulate", { method: "DELETE" });
      setRecentLogs([]);
      setTotalSimulated(0);
      setIsRunning(false);
      if (onVoteCast) onVoteCast();
    } catch (e) {
      console.error(e);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border border-eci-saffron/40 rounded-2xl p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-red-500 animate-ping" : "bg-gray-600"}`} />
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Radio className={`w-4 h-4 ${isRunning ? "text-red-400 animate-pulse" : "text-eci-saffron"}`} />
            LIVE DEMO AUTO-VOTING SIMULATOR
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 font-mono">
            Total Live Votes Cast: <strong className="text-eci-saffron font-bold text-xs">{totalSimulated}</strong>
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 rounded-xl text-xs font-black shadow-lg transition flex items-center gap-1.5 ${
            isRunning
              ? "bg-red-700 hover:bg-red-600 text-white animate-pulse"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Pause Auto-Voting
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Start Live Auto-Voting Simulation
            </>
          )}
        </button>

        <button
          onClick={() => handleCastBurst(10)}
          className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Cast +10 Quick Votes
        </button>

        <button
          onClick={handleResetVotes}
          disabled={isResetting}
          className="px-3 py-2 bg-red-950/70 hover:bg-red-900 border border-red-800 text-red-300 font-semibold rounded-xl text-xs flex items-center gap-1 transition ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Votes
        </button>
      </div>

      {/* Speed Selector */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400">
        <span>Interval Speed:</span>
        <button
          onClick={() => setSpeed(800)}
          className={`px-2 py-0.5 rounded font-mono ${speed === 800 ? "bg-eci-saffron text-gray-950 font-bold" : "bg-gray-800"}`}
        >
          Fast (0.8s)
        </button>
        <button
          onClick={() => setSpeed(1500)}
          className={`px-2 py-0.5 rounded font-mono ${speed === 1500 ? "bg-eci-saffron text-gray-950 font-bold" : "bg-gray-800"}`}
        >
          Normal (1.5s)
        </button>
        <button
          onClick={() => setSpeed(3000)}
          className={`px-2 py-0.5 rounded font-mono ${speed === 3000 ? "bg-eci-saffron text-gray-950 font-bold" : "bg-gray-800"}`}
        >
          Slow (3s)
        </button>
      </div>

      {/* Live Ticker Feed */}
      {recentLogs.length > 0 && (
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 max-h-36 overflow-y-auto space-y-1.5 text-xs font-mono">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block border-b border-gray-900 pb-1">
            ⚡ Real-Time Cast Stream
          </span>
          {recentLogs.map((log, idx) => (
            <div key={idx} className="flex items-center justify-between text-gray-300 py-0.5 border-b border-gray-900/60 last:border-0">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: log.partyColor }} />
                <span className="font-bold text-white">{log.constituencyName}</span>
                <span className="text-gray-400">→</span>
                <span>{log.candidateName}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold text-white" style={{ backgroundColor: log.partyColor }}>
                  {log.partyCode}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono ml-2 flex-shrink-0">
                {log.receiptHash?.slice(0, 14)}...
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
