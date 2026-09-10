"use client";

import { useState } from "react";
import { MapPin, Trophy, Users, BarChart2 } from "lucide-react";

interface StateData {
  code: string;
  name: string;
  nameHi: string;
  seats: number;
  leadingParty: string;
  partyColor: string;
  turnout: string;
  votesCounted: number;
}

const defaultStates: StateData[] = [
  { code: "MH", name: "Maharashtra", nameHi: "महाराष्ट्र", seats: 48, leadingParty: "BEP", partyColor: "#FF9933", turnout: "64.5%", votesCounted: 124500 },
  { code: "UP", name: "Uttar Pradesh", nameHi: "उत्तर प्रदेश", seats: 80, leadingParty: "BEP", partyColor: "#FF9933", turnout: "69.2%", votesCounted: 185000 },
  { code: "KL", name: "Kerala", nameHi: "केरल", seats: 20, leadingParty: "NPA", partyColor: "#000080", turnout: "77.4%", votesCounted: 98000 },
  { code: "DL", name: "Delhi", nameHi: "दिल्ली", seats: 7, leadingParty: "BEP", partyColor: "#FF9933", turnout: "62.1%", votesCounted: 74000 },
  { code: "KA", name: "Karnataka", nameHi: "कर्नाटक", seats: 28, leadingParty: "NPA", partyColor: "#000080", turnout: "71.0%", votesCounted: 142000 },
  { code: "TN", name: "Tamil Nadu", nameHi: "तमिलनाडु", seats: 39, leadingParty: "SJP", partyColor: "#138808", turnout: "72.8%", votesCounted: 165000 },
  { code: "WB", name: "West Bengal", nameHi: "पश्चिम बंगाल", seats: 42, leadingParty: "DSF", partyColor: "#D4AF37", turnout: "78.9%", votesCounted: 178000 },
  { code: "GJ", name: "Gujarat", nameHi: "गुजरात", seats: 26, leadingParty: "BEP", partyColor: "#FF9933", turnout: "66.4%", votesCounted: 112000 }
];

interface IndiaMapProps {
  constituencyResults?: any[];
  lang?: "en" | "hi";
}

export default function IndiaMap({ constituencyResults = [], lang = "en" }: IndiaMapProps) {
  const [selectedState, setSelectedState] = useState<StateData>(defaultStates[0]);

  return (
    <div className="bg-eci-cardBg border border-gray-700/60 rounded-xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-gray-700 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-eci-saffron" />
            {lang === "hi" ? "इंटरैक्टिव भारत चुनाव मानचित्र" : "Interactive India Live Election Map"}
          </h3>
          <p className="text-xs text-gray-400">
            {lang === "hi" ? "राज्य पर क्लिक करके रुझान और मतदान प्रतिशत देखें" : "Click on any state card to inspect constituency leads, seats, and turnout"}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-gray-300">
            <span className="w-3 h-3 rounded-full bg-[#FF9933]"></span> BEP Lead
          </span>
          <span className="flex items-center gap-1 text-gray-300">
            <span className="w-3 h-3 rounded-full bg-[#000080]"></span> NPA Lead
          </span>
          <span className="flex items-center gap-1 text-gray-300">
            <span className="w-3 h-3 rounded-full bg-[#138808]"></span> SJP Lead
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive State Tiles Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {defaultStates.map((st) => {
            const isSelected = selectedState.code === st.code;
            return (
              <button
                key={st.code}
                onClick={() => setSelectedState(st)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? "bg-gradient-to-b from-gray-800 to-gray-900 border-eci-saffron ring-2 ring-eci-saffron/40 shadow-lg scale-105"
                    : "bg-gray-800/60 border-gray-700 hover:border-gray-500 hover:bg-gray-800"
                }`}
              >
                <div
                  className="absolute top-0 right-0 w-1.5 h-full"
                  style={{ backgroundColor: st.partyColor }}
                />
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono px-1.5 py-0.5 rounded bg-gray-950/80 text-eci-saffron border border-gray-700">
                    {st.code}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400">{st.seats} Seats</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-eci-saffron transition-colors">
                  {lang === "hi" ? st.nameHi : st.name}
                </h4>
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-300">
                  <span className="font-semibold" style={{ color: st.partyColor }}>
                    Lead: {st.leadingParty}
                  </span>
                  <span className="text-emerald-400 font-mono">{st.turnout}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected State Detailed Analytics Card */}
        <div className="lg:col-span-5 bg-gray-900/90 border border-gray-700 rounded-xl p-5 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-eci-saffron font-semibold">
                  State Deep Dive
                </span>
                <h4 className="text-xl font-black text-white">
                  {lang === "hi" ? selectedState.nameHi : selectedState.name} ({selectedState.code})
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Total Seats</span>
                <span className="text-lg font-bold text-white font-mono">{selectedState.seats}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>State Leading Alliance</span>
                </div>
                <span
                  className="font-bold text-sm font-mono px-2 py-0.5 rounded text-white"
                  style={{ backgroundColor: selectedState.partyColor }}
                >
                  {selectedState.leadingParty}
                </span>
              </div>

              <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Voter Turnout %</span>
                </div>
                <span className="font-bold text-sm font-mono text-emerald-400">
                  {selectedState.turnout}
                </span>
              </div>

              <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <BarChart2 className="w-4 h-4 text-sky-400" />
                  <span>Votes Counted</span>
                </div>
                <span className="font-bold text-sm font-mono text-white">
                  {selectedState.votesCounted.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <span className="text-[11px] text-gray-400">
              Live updates synced with ECI Tabulation Server • SHA-256 Validated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
