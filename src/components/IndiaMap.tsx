"use client";

import { useState, useEffect } from "react";
import { MapPin, Trophy, Users, BarChart2, Search, Building } from "lucide-react";

export interface StateMapData {
  id?: string;
  code: string;
  name: string;
  nameHi?: string;
  type?: "STATE" | "UNION_TERRITORY";
  seats: number;
  districtCount?: number;
  constituencyCount?: number;
  leadingParty: string;
  partyColor: string;
  turnout: string;
  votesCounted: number;
}

// Complete Master List of all 36 States and Union Territories (28 States + 8 UTs)
const MASTER_36_STATES: StateMapData[] = [
  // 28 States
  { code: "AP", name: "Andhra Pradesh", nameHi: "आंध्र प्रदेश", type: "STATE", seats: 25, districtCount: 26, leadingParty: "BEP", partyColor: "#FF9933", turnout: "68.4%", votesCounted: 14200 },
  { code: "AR", name: "Arunachal Pradesh", nameHi: "अरुणाचल प्रदेश", type: "STATE", seats: 2, districtCount: 26, leadingParty: "BEP", partyColor: "#FF9933", turnout: "71.2%", votesCounted: 3100 },
  { code: "AS", name: "Assam", nameHi: "असम", type: "STATE", seats: 14, districtCount: 35, leadingParty: "BEP", partyColor: "#FF9933", turnout: "74.5%", votesCounted: 11800 },
  { code: "BR", name: "Bihar", nameHi: "बिहार", type: "STATE", seats: 40, districtCount: 38, leadingParty: "NPA", partyColor: "#000080", turnout: "62.8%", votesCounted: 24500 },
  { code: "CG", name: "Chhattisgarh", nameHi: "छत्तीसगढ़", type: "STATE", seats: 11, districtCount: 33, leadingParty: "BEP", partyColor: "#FF9933", turnout: "69.1%", votesCounted: 9200 },
  { code: "GA", name: "Goa", nameHi: "गोवा", type: "STATE", seats: 2, districtCount: 2, leadingParty: "BEP", partyColor: "#FF9933", turnout: "75.4%", votesCounted: 4800 },
  { code: "GJ", name: "Gujarat", nameHi: "गुजरात", type: "STATE", seats: 26, districtCount: 33, leadingParty: "BEP", partyColor: "#FF9933", turnout: "66.4%", votesCounted: 18400 },
  { code: "HR", name: "Haryana", nameHi: "हरियाणा", type: "STATE", seats: 10, districtCount: 22, leadingParty: "NPA", partyColor: "#000080", turnout: "67.9%", votesCounted: 8900 },
  { code: "HP", name: "Himachal Pradesh", nameHi: "हिमाचल प्रदेश", type: "STATE", seats: 4, districtCount: 12, leadingParty: "BEP", partyColor: "#FF9933", turnout: "72.1%", votesCounted: 5200 },
  { code: "JH", name: "Jharkhand", nameHi: "झारखंड", type: "STATE", seats: 14, districtCount: 24, leadingParty: "NPA", partyColor: "#000080", turnout: "65.3%", votesCounted: 10400 },
  { code: "KA", name: "Karnataka", nameHi: "कर्नाटक", type: "STATE", seats: 28, districtCount: 31, leadingParty: "NPA", partyColor: "#000080", turnout: "71.0%", votesCounted: 21200 },
  { code: "KL", name: "Kerala", nameHi: "केरल", type: "STATE", seats: 20, districtCount: 14, leadingParty: "NPA", partyColor: "#000080", turnout: "77.4%", votesCounted: 16800 },
  { code: "MP", name: "Madhya Pradesh", nameHi: "मध्य प्रदेश", type: "STATE", seats: 29, districtCount: 55, leadingParty: "BEP", partyColor: "#FF9933", turnout: "68.5%", votesCounted: 22100 },
  { code: "MH", name: "Maharashtra", nameHi: "महाराष्ट्र", type: "STATE", seats: 48, districtCount: 36, leadingParty: "BEP", partyColor: "#FF9933", turnout: "64.5%", votesCounted: 32400 },
  { code: "MN", name: "Manipur", nameHi: "मणिपुर", type: "STATE", seats: 2, districtCount: 16, leadingParty: "SJP", partyColor: "#138808", turnout: "78.2%", votesCounted: 2900 },
  { code: "ML", name: "Meghalaya", nameHi: "मेघालय", type: "STATE", seats: 2, districtCount: 12, leadingParty: "NPA", partyColor: "#000080", turnout: "76.1%", votesCounted: 3100 },
  { code: "MZ", name: "Mizoram", nameHi: "मिजोरम", type: "STATE", seats: 1, districtCount: 11, leadingParty: "SJP", partyColor: "#138808", turnout: "81.4%", votesCounted: 1800 },
  { code: "NL", name: "Nagaland", nameHi: "नागालैंड", type: "STATE", seats: 1, districtCount: 16, leadingParty: "BEP", partyColor: "#FF9933", turnout: "82.9%", votesCounted: 1900 },
  { code: "OD", name: "Odisha", nameHi: "ओडिशा", type: "STATE", seats: 21, districtCount: 30, leadingParty: "BEP", partyColor: "#FF9933", turnout: "74.1%", votesCounted: 15600 },
  { code: "PB", name: "Punjab", nameHi: "पंजाब", type: "STATE", seats: 13, districtCount: 23, leadingParty: "SJP", partyColor: "#138808", turnout: "65.8%", votesCounted: 11200 },
  { code: "RJ", name: "Rajasthan", nameHi: "राजस्थान", type: "STATE", seats: 25, districtCount: 50, leadingParty: "BEP", partyColor: "#FF9933", turnout: "66.3%", votesCounted: 19800 },
  { code: "SK", name: "Sikkim", nameHi: "सिक्किम", type: "STATE", seats: 1, districtCount: 6, leadingParty: "SJP", partyColor: "#138808", turnout: "79.8%", votesCounted: 1400 },
  { code: "TN", name: "Tamil Nadu", nameHi: "तमिलनाडु", type: "STATE", seats: 39, districtCount: 38, leadingParty: "SJP", partyColor: "#138808", turnout: "72.8%", votesCounted: 28900 },
  { code: "TG", name: "Telangana", nameHi: "तेलंगाना", type: "STATE", seats: 17, districtCount: 33, leadingParty: "NPA", partyColor: "#000080", turnout: "67.4%", votesCounted: 13500 },
  { code: "TR", name: "Tripura", nameHi: "त्रिपुरा", type: "STATE", seats: 2, districtCount: 8, leadingParty: "BEP", partyColor: "#FF9933", turnout: "80.2%", votesCounted: 3400 },
  { code: "UP", name: "Uttar Pradesh", nameHi: "उत्तर प्रदेश", type: "STATE", seats: 80, districtCount: 75, leadingParty: "BEP", partyColor: "#FF9933", turnout: "69.2%", votesCounted: 48500 },
  { code: "UK", name: "Uttarakhand", nameHi: "उत्तराखंड", type: "STATE", seats: 5, districtCount: 13, leadingParty: "BEP", partyColor: "#FF9933", turnout: "63.7%", votesCounted: 6100 },
  { code: "WB", name: "West Bengal", nameHi: "पश्चिम बंगाल", type: "STATE", seats: 42, districtCount: 23, leadingParty: "DSF", partyColor: "#D4AF37", turnout: "78.9%", votesCounted: 31200 },

  // 8 Union Territories
  { code: "AN", name: "Andaman and Nicobar Islands", nameHi: "अंडमान और निकोबार द्वीप समूह", type: "UNION_TERRITORY", seats: 1, districtCount: 3, leadingParty: "BEP", partyColor: "#FF9933", turnout: "65.1%", votesCounted: 950 },
  { code: "CH", name: "Chandigarh", nameHi: "चंडीगढ़", type: "UNION_TERRITORY", seats: 1, districtCount: 1, leadingParty: "BEP", partyColor: "#FF9933", turnout: "67.8%", votesCounted: 1850 },
  { code: "DN", name: "Dadra & Nagar Haveli and Daman & Diu", nameHi: "दादरा और नगर हवेली और दमन और दीव", type: "UNION_TERRITORY", seats: 2, districtCount: 3, leadingParty: "BEP", partyColor: "#FF9933", turnout: "71.9%", votesCounted: 1400 },
  { code: "DL", name: "Delhi", nameHi: "दिल्ली", type: "UNION_TERRITORY", seats: 7, districtCount: 11, leadingParty: "BEP", partyColor: "#FF9933", turnout: "62.1%", votesCounted: 12400 },
  { code: "JK", name: "Jammu and Kashmir", nameHi: "जम्मू और कश्मीर", type: "UNION_TERRITORY", seats: 5, districtCount: 20, leadingParty: "NPA", partyColor: "#000080", turnout: "58.4%", votesCounted: 7600 },
  { code: "LA", name: "Ladakh", nameHi: "लद्दाख", type: "UNION_TERRITORY", seats: 1, districtCount: 2, leadingParty: "BEP", partyColor: "#FF9933", turnout: "71.0%", votesCounted: 890 },
  { code: "LD", name: "Lakshadweep", nameHi: "लक्षद्वीप", type: "UNION_TERRITORY", seats: 1, districtCount: 1, leadingParty: "NPA", partyColor: "#000080", turnout: "85.2%", votesCounted: 620 },
  { code: "PY", name: "Puducherry", nameHi: "पुडुचेरी", type: "UNION_TERRITORY", seats: 1, districtCount: 4, leadingParty: "NPA", partyColor: "#000080", turnout: "81.2%", votesCounted: 2400 }
];

interface IndiaMapProps {
  statesData?: StateMapData[];
  constituencyResults?: any[];
  onSelectState?: (state: StateMapData) => void;
  lang?: "en" | "hi";
}

export default function IndiaMap({
  statesData = [],
  constituencyResults = [],
  onSelectState,
  lang = "en"
}: IndiaMapProps) {
  // Initialize with complete 36 States/UTs so UI is 100% visible immediately without loading flickers
  const [dbStates, setDbStates] = useState<StateMapData[]>(MASTER_36_STATES);
  const [selectedState, setSelectedState] = useState<StateMapData>(MASTER_36_STATES[13]); // Default to MH (Maharashtra)
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "STATE" | "UNION_TERRITORY">("ALL");

  useEffect(() => {
    if (statesData && statesData.length > 0) {
      // Merge live database stats into master state entries
      const merged = MASTER_36_STATES.map((m) => {
        const live = statesData.find((s) => s.code === m.code || s.name === m.name);
        if (live) {
          return {
            ...m,
            id: live.id || m.id,
            seats: live.seats || m.seats,
            districtCount: live.districtCount !== undefined ? live.districtCount : m.districtCount,
            leadingParty: live.leadingParty && live.leadingParty !== "N/A" ? live.leadingParty : m.leadingParty,
            partyColor: live.partyColor && live.partyColor !== "#64748B" ? live.partyColor : m.partyColor,
            votesCounted: live.votesCounted || m.votesCounted,
            turnout: live.turnout || m.turnout
          };
        }
        return m;
      });
      setDbStates(merged);

      setSelectedState((prev) => {
        const currentCode = prev?.code || "MH";
        return merged.find((s) => s.code === currentCode) || merged[13];
      });
    }
  }, [statesData]);

  const handleStateClick = (st: StateMapData) => {
    setSelectedState(st);
    if (onSelectState) onSelectState(st);
  };

  const filteredStates = dbStates.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.nameHi && st.nameHi.includes(searchQuery));

    const matchesType =
      filterType === "ALL" ||
      (filterType === "STATE" && st.type !== "UNION_TERRITORY") ||
      (filterType === "UNION_TERRITORY" && st.type === "UNION_TERRITORY");

    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 border border-gray-700/80 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* HEADER & LEGEND */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-eci-saffron" />
            <h3 className="text-xl font-extrabold text-white">
              {lang === "hi" ? "भारत के सभी 36 राज्य एवं केंद्र शासित प्रदेश" : "All 36 States & Union Territories Master Hierarchy"}
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {lang === "hi"
              ? "किसी भी राज्य या केंद्र शासित प्रदेश पर क्लिक करके रुझान देखें"
              : "Click any state or UT card below to inspect districts, Lok Sabha seats, and live turnout"}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs flex-wrap">
          <span className="flex items-center gap-1.5 text-gray-200 bg-gray-950 px-2.5 py-1 rounded-lg border border-gray-800">
            <span className="w-3 h-3 rounded-full bg-[#FF9933]"></span> BEP Lead
          </span>
          <span className="flex items-center gap-1.5 text-gray-200 bg-gray-950 px-2.5 py-1 rounded-lg border border-gray-800">
            <span className="w-3 h-3 rounded-full bg-[#000080]"></span> NPA Lead
          </span>
          <span className="flex items-center gap-1.5 text-gray-200 bg-gray-950 px-2.5 py-1 rounded-lg border border-gray-800">
            <span className="w-3 h-3 rounded-full bg-[#138808]"></span> SJP Lead
          </span>
          <span className="flex items-center gap-1.5 text-gray-200 bg-gray-950 px-2.5 py-1 rounded-lg border border-gray-800">
            <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span> DSF Lead
          </span>
        </div>
      </div>

      {/* CATEGORY TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs bg-gray-950 p-1.5 rounded-xl border border-gray-800">
          <button
            type="button"
            onClick={() => setFilterType("ALL")}
            className={`px-4 py-2 rounded-lg font-extrabold transition ${
              filterType === "ALL"
                ? "bg-gradient-to-r from-eci-saffron to-amber-500 text-gray-950 shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All 36 Entities ({dbStates.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("STATE")}
            className={`px-4 py-2 rounded-lg font-extrabold transition ${
              filterType === "STATE"
                ? "bg-gradient-to-r from-eci-saffron to-amber-500 text-gray-950 shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            28 States
          </button>
          <button
            type="button"
            onClick={() => setFilterType("UNION_TERRITORY")}
            className={`px-4 py-2 rounded-lg font-extrabold transition ${
              filterType === "UNION_TERRITORY"
                ? "bg-gradient-to-r from-eci-saffron to-amber-500 text-gray-950 shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            8 UTs
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search state code or name (e.g., MH, UP, Delhi)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-eci-saffron font-medium"
          />
        </div>
      </div>

      {/* MAIN GRID & STATE DETAIL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Tiles Grid (Left 8 Columns) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredStates.map((st) => {
            const isSelected = selectedState?.code === st.code;
            return (
              <button
                key={st.code}
                type="button"
                onClick={() => handleStateClick(st)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group shadow-md ${
                  isSelected
                    ? "bg-gradient-to-b from-gray-800 to-gray-900 border-eci-saffron ring-2 ring-eci-saffron/60 scale-[1.03] z-10"
                    : "bg-gray-950/80 border-gray-800 hover:border-gray-600 hover:bg-gray-900"
                }`}
              >
                <div
                  className="absolute top-0 right-0 w-1.5 h-full"
                  style={{ backgroundColor: st.partyColor || "#FF9933" }}
                />
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black font-mono px-1.5 py-0.5 rounded bg-gray-900 text-eci-saffron border border-gray-700">
                    {st.code}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">{st.seats} Seats</span>
                </div>

                <h4 className="text-xs font-black text-white truncate group-hover:text-eci-saffron transition-colors">
                  {lang === "hi" ? st.nameHi || st.name : st.name}
                </h4>

                <div className="mt-2 pt-1 border-t border-gray-800/80 flex items-center justify-between text-[10px]">
                  <span
                    className="font-black px-1.5 py-0.2 rounded text-[10px]"
                    style={{ backgroundColor: `${st.partyColor}25`, color: st.partyColor }}
                  >
                    {st.leadingParty}
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">{st.turnout}</span>
                </div>
              </button>
            );
          })}

          {filteredStates.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 text-xs italic bg-gray-950/60 rounded-xl border border-gray-800">
              No State or UT matched "{searchQuery}".
            </div>
          )}
        </div>

        {/* Selected State Detailed Analytics Card (Right 4 Columns) */}
        <div className="lg:col-span-4 bg-gray-950 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-2xl space-y-4">
          {selectedState ? (
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-eci-saffron font-extrabold font-mono">
                    {selectedState.type === "UNION_TERRITORY" ? "UNION TERRITORY ANALYTICS" : "STATE ELECTORAL ANALYTICS"}
                  </span>
                  <h4 className="text-xl font-black text-white mt-0.5">
                    {selectedState.name} ({selectedState.code})
                  </h4>
                  {selectedState.nameHi && (
                    <span className="text-xs text-gray-400">{selectedState.nameHi}</span>
                  )}
                </div>
                <div className="text-right bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
                  <span className="text-[9px] text-gray-400 block uppercase">LS Seats</span>
                  <span className="text-xl font-black text-eci-saffron font-mono">{selectedState.seats}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold">Leading Party</span>
                  </div>
                  <span
                    className="font-extrabold text-xs font-mono px-2.5 py-1 rounded-lg text-white shadow-sm"
                    style={{ backgroundColor: selectedState.partyColor || "#FF9933" }}
                  >
                    {selectedState.leadingParty}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Estimated Voter Turnout</span>
                  </div>
                  <span className="font-extrabold text-xs font-mono text-emerald-400">
                    {selectedState.turnout}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2 text-gray-300">
                    <BarChart2 className="w-4 h-4 text-sky-400" />
                    <span className="font-semibold">Total Votes Counted</span>
                  </div>
                  <span className="font-extrabold text-xs font-mono text-white">
                    {(selectedState.votesCounted || 0).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-900/90 p-3 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building className="w-4 h-4 text-eci-saffron" />
                    <span className="font-semibold">Districts Configured</span>
                  </div>
                  <span className="font-extrabold text-xs font-mono text-eci-saffron">
                    {selectedState.districtCount || 1} Districts
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-xs text-center py-10">Select a State or UT to view details</div>
          )}

          <div className="pt-3 border-t border-gray-800 text-center">
            <span className="text-[10px] text-gray-400 font-mono">
              Official ECI Database Master Hierarchy • 2026 Delimitation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
