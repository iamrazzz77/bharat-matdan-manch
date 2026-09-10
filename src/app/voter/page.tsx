"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Vote, CheckCircle, Shield, AlertTriangle, MapPin, User, FileText, Download, Lock, Mail } from "lucide-react";
import DigitalBallotModal from "@/components/DigitalBallotModal";
import { printAuditReport } from "@/lib/exportUtils";

export default function VoterPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [activeElection, setActiveElection] = useState<any>(null);
  const [isBallotOpen, setIsBallotOpen] = useState(false);
  const [absenteeReason, setAbsenteeReason] = useState("");
  const [absenteeSuccess, setAbsenteeSuccess] = useState("");

  const loadUserData = () => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push("/login");
          return;
        }
        setUser(data.user);
        setLoading(false);

        if (data.user.constituency?.id) {
          fetch(`/api/elections?constituencyId=${data.user.constituency.id}`)
            .then(r => r.json())
            .then(eData => {
              setActiveElection(eData.activeElection);
              setCandidates(eData.candidates || []);
            });
        }
      })
      .catch(() => {
        router.push("/login");
      });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleVoteSuccess = (receiptHash: string) => {
    loadUserData();
  };

  const handlePrintReceipt = () => {
    if (!user || !user.activeElection?.receiptHash) return;
    printAuditReport(
      `VOTER RECEIPT - ${user.activeElection.receiptHash}`,
      `
      <div style="text-align: center; border: 2px solid #000080; padding: 20px; border-radius: 8px;">
        <h2 style="color: #FF9933; margin-bottom: 5px;">BHARAT MATDAN MANCH</h2>
        <h3>OFFICIAL CRYPTOGRAPHIC VOTE RECEIPT</h3>
        <p><strong>Voter Name:</strong> ${user.fullName}</p>
        <p><strong>EPIC Number:</strong> ${user.epicNumber}</p>
        <p><strong>Constituency:</strong> ${user.constituency?.name}</p>
        <p><strong>Receipt Hash Code:</strong> <span style="font-family: monospace; font-size: 16px; color: #000080;">${user.activeElection.receiptHash}</span></p>
        <p><strong>Timestamp:</strong> ${user.activeElection.votedAt ? new Date(user.activeElection.votedAt).toLocaleString("en-IN") : new Date().toLocaleString("en-IN")}</p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 11px; color: #555;">This receipt proves that your ballot was anonymously recorded in the secret vote archive. Your candidate choice remains secret.</p>
      </div>
      `
    );
  };

  const handleAbsenteeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!absenteeReason) return;
    setAbsenteeSuccess(`Absentee / Mail-In Ballot Request submitted under Tracking Code BMM-ABS-${Math.floor(100000 + Math.random() * 900000)}`);
    setAbsenteeReason("");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-gray-400 font-mono text-sm">
        Authenticating Elector Identity...
      </div>
    );
  }

  const hasVoted = user.activeElection?.hasVoted;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER TITLE */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-eci-saffron">
            ELECTORAL PHOTO IDENTITY PORTAL
          </span>
          <h1 className="text-3xl font-extrabold text-white">Voter Identity & Digital Kiosk</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {hasVoted ? (
            <span className="px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Ballot Cast & Hash Verified
            </span>
          ) : (
            <span className="px-3.5 py-1.5 bg-amber-950/80 border border-amber-700 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow">
              <Shield className="w-4 h-4 text-amber-400" />
              Eligible to Cast Digital Ballot
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COL: DIGITAL EPIC CARD */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-eci-darkNavy border-2 border-eci-saffron/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* ECI Seal Header */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-eci-saffron text-gray-950 font-bold flex items-center justify-center text-xs">
                  <Vote className="w-4 h-4" />
                </div>
                <span className="text-xs font-black tracking-wider text-white">ELECTION COMMISSION OF INDIA</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase">OFFICIAL EPIC CARD</span>
            </div>

            {/* EPIC Card Details */}
            <div className="flex gap-4 items-start">
              <div className="w-20 h-24 bg-gray-800 border border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 flex-shrink-0">
                <User className="w-10 h-10 text-gray-400" />
                <span className="text-[9px] text-gray-400 font-mono mt-1">VERIFIED</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider">Elector Name</p>
                <p className="font-extrabold text-sm text-white">{user.fullName}</p>

                <p className="text-gray-400 text-[10px] uppercase tracking-wider pt-1">EPIC Number</p>
                <p className="font-mono font-extrabold text-eci-saffron text-sm tracking-wider select-all">{user.epicNumber}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 block">State / UT</span>
                <span className="font-bold text-white">{user.state?.name || "Maharashtra"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Constituency</span>
                <span className="font-bold text-white">{user.constituency?.name || "Mumbai South"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-gray-400 block">Assigned Polling Station</span>
                <span className="font-semibold text-gray-200">{user.pollingStation?.name || "St. Xavier High School"}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" /> Aadhaar Hash Linked
              </span>
              <span className="text-gray-400">Booth #{user.boothNumber || 1}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COL: DIGITAL BALLOT ACTION & RECEIPT */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* ELECTION BALLOT KIOSK CARD */}
          <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-eci-saffron font-mono font-bold uppercase tracking-wider">Active Election</span>
                <h3 className="text-xl font-extrabold text-white">{activeElection?.title || "18th Lok Sabha General Elections 2026"}</h3>
              </div>
              <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 font-mono text-xs font-bold rounded-lg border border-emerald-800">
                STATUS: OPEN
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Official digital ballot paper for <strong>{user.constituency?.name}</strong>. Candidate roster is loaded with party symbols, affidavits, and NOTA.
            </p>

            {hasVoted ? (
              <div className="bg-gray-900 border border-emerald-700/50 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-5 h-5" />
                  Your Ballot Has Been Successfully Recorded!
                </div>
                <p className="text-xs text-gray-300">
                  Receipt Hash: <span className="font-mono text-white font-bold select-all">{user.activeElection?.receiptHash}</span>
                </p>
                <button
                  onClick={handlePrintReceipt}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg text-xs transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Printable PDF Receipt
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => setIsBallotOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-eci-saffron via-amber-500 to-eci-saffron hover:brightness-110 text-gray-950 font-black rounded-xl text-base shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <Vote className="w-5 h-5" />
                  PROCEED TO DIGITAL BALLOT PAPER
                </button>
              </div>
            )}
          </div>

          {/* ABSENTEE / MAIL-IN BALLOT MODULE */}
          <div className="bg-eci-cardBg border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-eci-saffron" />
              Absentee & Mail-In Ballot Module
            </h3>
            <p className="text-xs text-gray-400">
              Senior citizens (85+), persons with disabilities, or election duty staff can request postal / mail-in ballot authorization.
            </p>

            {absenteeSuccess ? (
              <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-xl text-xs">
                {absenteeSuccess}
              </div>
            ) : (
              <form onSubmit={handleAbsenteeSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Reason for Absentee Request (e.g., Essential Duty / Senior Citizen)"
                  value={absenteeReason}
                  onChange={(e) => setAbsenteeReason(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-eci-saffron"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-xl text-xs transition"
                >
                  Submit Absentee Ballot Application
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* DIGITAL BALLOT MODAL */}
      {user && activeElection && (
        <DigitalBallotModal
          isOpen={isBallotOpen}
          onClose={() => setIsBallotOpen(false)}
          electionId={activeElection.id}
          constituencyName={user.constituency?.name || "Constituency"}
          candidates={candidates}
          voterEpic={user.epicNumber}
          voterName={user.fullName}
          onVoteSuccess={handleVoteSuccess}
        />
      )}

    </div>
  );
}
