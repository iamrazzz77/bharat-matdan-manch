"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, CheckCircle2, Zap, Radio, RefreshCw } from "lucide-react";

interface AuditBlock {
  blockHeight: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  constituency: string;
  status: string;
}

export default function LiveAuditLedger() {
  const [blocks, setBlocks] = useState<AuditBlock[]>([
    {
      blockHeight: 104582,
      hash: "0x8f7d9a1c...e4b2",
      previousHash: "0x3e1f7c8b...d901",
      timestamp: "Just now",
      constituency: "Mumbai South (PC01-MH)",
      status: "VALIDATED"
    },
    {
      blockHeight: 104581,
      hash: "0x3e1f7c8b...d901",
      previousHash: "0x9a4b2c1d...f8e7",
      timestamp: "12s ago",
      constituency: "Varanasi (PC02-UP)",
      status: "VALIDATED"
    },
    {
      blockHeight: 104580,
      hash: "0x9a4b2c1d...f8e7",
      previousHash: "0x1234abcd...5678",
      timestamp: "28s ago",
      constituency: "Wayanad (PC03-KL)",
      status: "VALIDATED"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const constituencies = ["Bangalore South (PC01-KA)", "Chandni Chowk (PC01-DL)", "Kolkata Uttar (PC01-WB)", "Jaipur (PC01-RJ)", "Ahmedabad East (PC01-GJ)"];
      const randomPC = constituencies[Math.floor(Math.random() * constituencies.length)];
      const randomHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
      
      setBlocks((prev) => [
        {
          blockHeight: prev[0].blockHeight + 1,
          hash: randomHash,
          previousHash: prev[0].hash,
          timestamp: "Just now",
          constituency: randomPC,
          status: "VALIDATED"
        },
        ...prev.slice(0, 4)
      ]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card border border-emerald-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden bg-slate-900/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              Cryptographic Audit Stream
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                SHA-256 Ledger
              </span>
            </h3>
            <p className="text-xs text-slate-400">Real-time tamper-evident block validation feed across 543 Constituencies</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-dot inline-block" />
          <span>Syncing Nodes (10.5L Booths)</span>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map((block) => (
          <div
            key={block.blockHeight}
            className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono transition hover:border-emerald-500/30"
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-slate-900 rounded-lg text-emerald-400 font-bold border border-slate-800">
                #{block.blockHeight}
              </span>
              <div>
                <span className="text-slate-200 font-sans font-bold block">{block.constituency}</span>
                <span className="text-[11px] text-slate-400">Hash: <span className="text-amber-400">{block.hash}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-slate-500">{block.timestamp}</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 font-sans font-bold text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {block.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
