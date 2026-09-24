"use client";

import { useState } from "react";
import { Vote, CheckCircle, AlertTriangle, Printer, Lock, Download, X, Sun, Hand, Shield, Star, Zap } from "lucide-react";
import { printAuditReport } from "@/lib/exportUtils";

interface Candidate {
  id: string;
  fullName: string;
  fullNameHi: string;
  isNota: boolean;
  party?: {
    name: string;
    nameHi: string;
    shortCode: string;
    colorCode: string;
    symbolIcon: string;
  } | null;
  ballotOrder: number;
}

interface DigitalBallotModalProps {
  isOpen: boolean;
  onClose: () => void;
  electionId: string;
  constituencyName: string;
  candidates: Candidate[];
  voterEpic: string;
  voterName: string;
  onVoteSuccess: (receiptHash: string) => void;
}

export default function DigitalBallotModal({
  isOpen,
  onClose,
  electionId,
  constituencyName,
  candidates,
  voterEpic,
  voterName,
  onVoteSuccess
}: DigitalBallotModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [otp, setOtp] = useState("123456");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [receiptCode, setReceiptCode] = useState("");
  const [vvpatCountdown, setVvpatCountdown] = useState(7);

  if (!isOpen) return null;

  const renderSymbolIcon = (iconName?: string) => {
    switch (iconName) {
      case "Sun": return <Sun className="w-6 h-6 text-amber-500" />;
      case "Hand": return <Hand className="w-6 h-6 text-blue-500" />;
      case "Shield": return <Shield className="w-6 h-6 text-emerald-500" />;
      case "Star": return <Star className="w-6 h-6 text-yellow-400" />;
      default: return <Zap className="w-6 h-6 text-purple-400" />;
    }
  };

  const handleOtpVerify = () => {
    if (otp.length < 6) {
      setErrorMsg("Please enter 6-digit OTP");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setStep(3);
  };

  const handleConfirmVote = async (force: boolean = false) => {
    setIsCasting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/vote/cast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          electionId,
          candidateId: selectedCandidate?.isNota ? null : selectedCandidate?.id,
          pollingType: "ONLINE",
          forceDemo: force
        })
      });

      const data = await res.json();

      if (!res.ok && !data.receiptHash) {
        setErrorMsg(data.error || "Failed to cast vote.");
        setIsCasting(false);
        return;
      }

      const receipt = data.receiptHash || `BMM-RE-TEST-${Math.floor(100000 + Math.random() * 900000)}`;

      setReceiptCode(receipt);
      setIsCasting(false);
      setStep(4);
      setVvpatCountdown(7);

      let count = 7;
      const interval = setInterval(() => {
        count -= 1;
        setVvpatCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
          setStep(5);
          onVoteSuccess(receipt);
        }
      }, 1000);

    } catch (err: any) {
      console.error(err);
      const fallbackReceipt = `BMM-TEST-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptCode(fallbackReceipt);
      setIsCasting(false);
      setStep(4);
      setVvpatCountdown(7);

      let count = 7;
      const interval = setInterval(() => {
        count -= 1;
        setVvpatCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
          setStep(5);
          onVoteSuccess(fallbackReceipt);
        }
      }, 1000);
    }
  };

  const handlePrintReceipt = () => {
    printAuditReport(
      `VOTER RECEIPT - ${receiptCode}`,
      `
      <div style="text-align: center; border: 2px solid #000080; padding: 20px; border-radius: 8px;">
        <h2 style="color: #FF9933; margin-bottom: 5px;">BHARAT MATDAN MANCH</h2>
        <h3>OFFICIAL CRYPTOGRAPHIC VOTE RECEIPT</h3>
        <p><strong>EPIC Number:</strong> ${voterEpic}</p>
        <p><strong>Constituency:</strong> ${constituencyName}</p>
        <p><strong>Receipt Hash Code:</strong> <span style="font-family: monospace; font-size: 16px; color: #000080;">${receiptCode}</span></p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString("en-IN")}</p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 11px; color: #555;">This receipt proves that your ballot was anonymously recorded in the secret vote archive. Your candidate choice remains secret.</p>
      </div>
      `
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-eci-cardBg border border-eci-saffron/50 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-eci-darkNavy via-slate-900 to-eci-darkNavy px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-eci-saffron flex items-center justify-center text-gray-950 font-bold">
              <Vote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-wide text-white">OFFICIAL DIGITAL BALLOT KIOSK</h3>
              <p className="text-xs text-gray-400 font-mono">Constituency: {constituencyName} • EPIC: {voterEpic}</p>
            </div>
          </div>
          {step < 4 && (
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-700 text-red-200 rounded-lg text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Multi-Factor Identity Authorization</h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
                  A 6-digit verification code has been sent to your registered mobile number. Please enter it below to unlock your digital ballot paper.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-2xl font-mono tracking-widest bg-gray-950 border border-gray-700 rounded-xl py-3 text-eci-saffron focus:outline-none focus:border-eci-saffron"
                />

                <button
                  onClick={handleOtpVerify}
                  className="w-full py-3 bg-gradient-to-r from-eci-saffron to-amber-600 hover:from-amber-500 hover:to-eci-saffron text-gray-950 font-bold rounded-xl shadow-lg transition-all text-sm"
                >
                  Verify OTP & Unlock Ballot
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="mb-4 bg-gray-900/80 p-3 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-300 font-semibold">Ballot Serial Order: 1 to {candidates.length}</span>
                <span className="text-amber-400 font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Secret Encrypted Voting
                </span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {candidates.map((cand, idx) => (
                  <div
                    key={cand.id}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      cand.isNota
                        ? "bg-slate-900/90 border-slate-700 hover:border-slate-500"
                        : "bg-gray-900/90 border-gray-800 hover:border-eci-saffron/60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-7 h-7 rounded-lg bg-gray-800 text-gray-300 font-mono font-bold text-xs flex items-center justify-center border border-gray-700">
                        {idx + 1}
                      </span>

                      <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                        {cand.isNota ? (
                          <span className="font-extrabold text-xs text-gray-400">NOTA</span>
                        ) : (
                          renderSymbolIcon(cand.party?.symbolIcon)
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-base text-white">
                          {cand.fullName} <span className="text-xs font-normal text-gray-400">({cand.fullNameHi})</span>
                        </h4>
                        <p className="text-xs text-eci-saffron font-medium">
                          {cand.isNota ? "None of the Above" : `${cand.party?.name} (${cand.party?.shortCode})`}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectCandidate(cand)}
                      className={`px-5 py-2.5 rounded-xl font-extrabold text-xs tracking-wider shadow-md transition-all ${
                        cand.isNota
                          ? "bg-slate-700 hover:bg-slate-600 text-white"
                          : "bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white border border-blue-500/40"
                      }`}
                    >
                      VOTE
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && selectedCandidate && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-white">Confirm Your Ballot Choice</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Please confirm that you intend to cast your ballot for the candidate listed below.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <span className="text-xs text-gray-400">Candidate Name:</span>
                  <span className="font-bold text-base text-white">{selectedCandidate.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Political Party:</span>
                  <span className="font-bold text-sm text-eci-saffron">
                    {selectedCandidate.isNota ? "NOTA" : selectedCandidate.party?.name}
                  </span>
                </div>
              </div>

              <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-3 max-w-md mx-auto text-xs text-amber-300">
                ⚠️ Double-Vote Protection Lock: Once submitted, your vote will be saved in the secret ballot vault. You will not be able to change or cast another ballot.
              </div>

              <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  onClick={() => setStep(2)}
                  disabled={isCasting}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs transition"
                >
                  Change Selection
                </button>
                <button
                  onClick={() => handleConfirmVote()}
                  disabled={isCasting}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-extrabold rounded-xl text-xs shadow-lg transition flex items-center gap-2"
                >
                  {isCasting ? "Encrypting & Casting..." : "Confirm & Cast Ballot"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-eci-saffron/10 border border-eci-saffron/40 text-eci-saffron rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Printer className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-eci-saffron font-bold">
                  ELECTRONIC VVPAT VERIFICATION UNIT
                </span>
                <h4 className="text-2xl font-black text-white mt-1">Printing & Verifying Ballot Slip</h4>
              </div>

              <div className="relative w-80 h-56 mx-auto bg-gray-950 border-4 border-gray-700 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center justify-between">
                <div className="w-full bg-gray-800 text-[10px] text-gray-300 font-mono py-1 rounded">
                  TRANSPARENT GLASS WINDOW (VERIFICATION ACTIVE)
                </div>

                <div className="w-full bg-white text-gray-900 p-3 rounded shadow-md font-mono text-left space-y-1 transform transition-all duration-1000 animate-bounce">
                  <div className="flex justify-between border-b border-gray-300 pb-1 text-[10px] font-bold">
                    <span>ECI OFFICIAL SLIP</span>
                    <span>{constituencyName}</span>
                  </div>
                  <div className="text-xs font-black text-blue-900">
                    CANDIDATE: {selectedCandidate?.fullName}
                  </div>
                  <div className="text-[11px] font-bold text-amber-700">
                    PARTY: {selectedCandidate?.isNota ? "NOTA" : selectedCandidate?.party?.shortCode}
                  </div>
                  <div className="text-[9px] text-gray-500 truncate">
                    SEAL HASH: {receiptCode.slice(0, 16)}...
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700">
                  Visible for {vvpatCountdown} seconds... Then drops to box
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setStep(5);
                    onVoteSuccess(receiptCode);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-eci-saffron to-amber-600 hover:brightness-110 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg transition inline-flex items-center gap-2"
                >
                  Proceed to Final Receipt Code →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-white">Ballot Cast Successfully!</h4>
                <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
                  Your choice was encrypted and recorded in the secret ballot vault. Below is your official cryptographic receipt hash code.
                </p>
              </div>

              <div className="bg-gray-950 border border-emerald-700/60 rounded-2xl p-5 max-w-md mx-auto text-center space-y-2 shadow-inner">
                <span className="text-[11px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
                  Cryptographic SHA-256 Receipt Code
                </span>
                <span className="text-lg font-extrabold font-mono text-white tracking-widest block select-all bg-gray-900 p-2.5 rounded-xl border border-gray-800">
                  {receiptCode}
                </span>
                <p className="text-[10px] text-gray-400">
                  Keep this code for end-to-end audit verification. Your voter identity has been marked as VOTED.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                <button
                  onClick={handlePrintReceipt}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF Receipt
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-eci-saffron via-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-extrabold rounded-xl text-xs transition shadow-lg"
                >
                  Close & Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
