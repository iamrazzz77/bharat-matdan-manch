"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Building, Landmark, Ticket, CheckCircle2, ChevronRight } from "lucide-react";
import { INDIA_MASTER_GEO } from "../../prisma/seedData/indiaMasterGeo";

export interface GeoSelection {
  stateId?: string;
  stateCode?: string;
  stateName?: string;
  districtId?: string;
  districtName?: string;
  constituencyId?: string;
  constituencyCode?: string;
  constituencyName?: string;
  stationId?: string;
  stationName?: string;
  boothNumber?: number;
}

interface GeoSelectorProps {
  onSelectionChange?: (selection: GeoSelection) => void;
  initialSelection?: GeoSelection;
  showPollingStation?: boolean;
  showBooth?: boolean;
  compact?: boolean;
  className?: string;
}

export default function GeoSelector({
  onSelectionChange,
  initialSelection,
  showPollingStation = true,
  showBooth = true,
  compact = false,
  className = ""
}: GeoSelectorProps) {
  // Master lists fetched from API
  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [constituencies, setConstituencies] = useState<any[]>([]);
  const [pollingStations, setPollingStations] = useState<any[]>([]);

  // Selected state IDs
  const [selectedStateId, setSelectedStateId] = useState<string>(initialSelection?.stateId || "");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(initialSelection?.districtId || "");
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<string>(initialSelection?.constituencyId || "");
  const [selectedStationId, setSelectedStationId] = useState<string>(initialSelection?.stationId || "");
  const [selectedBoothNumber, setSelectedBoothNumber] = useState<number>(initialSelection?.boothNumber || 1);

  // Loading flags
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingConstituencies, setLoadingConstituencies] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);

  // Ref to hold the latest callback to break any React function reference loop
  const callbackRef = useRef(onSelectionChange);
  useEffect(() => {
    callbackRef.current = onSelectionChange;
  }, [onSelectionChange]);

  const isInitialMount = useRef(true);

  // Sync initialSelection props when parent changes them externally (e.g. from Map clicks or Filter clears)
  useEffect(() => {
    if (initialSelection?.stateId !== undefined && initialSelection.stateId !== selectedStateId) {
      setSelectedStateId(initialSelection.stateId || "");
      setSelectedDistrictId(initialSelection.districtId || "");
      setSelectedConstituencyId(initialSelection.constituencyId || "");
      setSelectedStationId(initialSelection.stationId || "");
    } else if (!initialSelection?.stateId && selectedStateId) {
      setSelectedStateId("");
      setSelectedDistrictId("");
      setSelectedConstituencyId("");
      setSelectedStationId("");
    }
  }, [initialSelection?.stateId, initialSelection?.districtId, initialSelection?.constituencyId]);

  // 1. Fetch States on Mount (ONCE)
  useEffect(() => {
    setLoadingStates(true);
    fetch("/api/geography/states")
      .then((res) => res.json())
      .then((data) => {
        if (data.states && data.states.length > 0) {
          setStates(data.states);
        } else {
          throw new Error("Empty states API");
        }
        setLoadingStates(false);
      })
      .catch((err) => {
        // Offline / Fallback using INDIA_MASTER_GEO
        const offlineStates = INDIA_MASTER_GEO.map((s: any) => ({
          id: s.code,
          code: s.code,
          name: s.name,
          nameHi: s.nameHi,
          type: s.type,
          totalSeats: s.totalSeats
        }));
        setStates(offlineStates);
        setLoadingStates(false);
      });
  }, []);

  // 2. Fetch Districts when selectedStateId changes (or on mount for all districts)
  useEffect(() => {
    setLoadingDistricts(true);
    const url = selectedStateId
      ? `/api/geography/districts?stateId=${selectedStateId}`
      : `/api/geography/districts`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const dList = data.districts || [];
        setDistricts(dList);
        if (selectedDistrictId) {
          const exists = dList.some((d: any) => d.id === selectedDistrictId);
          if (!exists) {
            setSelectedDistrictId("");
          }
        }
        setLoadingDistricts(false);
      })
      .catch((err) => {
        // Offline Fallback for Districts
        let offlineDists: any[] = [];
        if (selectedStateId) {
          const matchState = states.find((s: any) => s.id === selectedStateId || s.code === selectedStateId);
          const geoState = INDIA_MASTER_GEO.find((s: any) => s.code === matchState?.code || s.code === selectedStateId);
          if (geoState) {
            offlineDists = geoState.districts.map((d: any) => ({
              id: `${geoState.code}:${d.name}`,
              name: d.name,
              nameHi: d.nameHi,
              stateId: selectedStateId,
              stateName: geoState.name
            }));
          }
        } else {
          INDIA_MASTER_GEO.forEach((s: any) => {
            s.districts.forEach((d: any) => {
              offlineDists.push({
                id: `${s.code}:${d.name}`,
                name: d.name,
                nameHi: d.nameHi,
                stateId: s.code,
                stateName: s.name
              });
            });
          });
        }

        setDistricts(offlineDists);
        if (selectedDistrictId) {
          const exists = offlineDists.some((d: any) => d.id === selectedDistrictId);
          if (!exists) {
            setSelectedDistrictId("");
          }
        }
        setLoadingDistricts(false);
      });
  }, [selectedStateId, states]);

  // 3. Fetch Constituencies when selectedDistrictId or selectedStateId changes
  useEffect(() => {
    if (!selectedDistrictId && !selectedStateId) {
      setConstituencies([]);
      setSelectedConstituencyId("");
      setPollingStations([]);
      setSelectedStationId("");
      return;
    }

    setLoadingConstituencies(true);
    const url = selectedDistrictId
      ? `/api/geography/constituencies?districtId=${selectedDistrictId}`
      : `/api/geography/constituencies?stateId=${selectedStateId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const cList = data.constituencies || [];
        if (cList.length > 0) {
          setConstituencies(cList);
          const exists = cList.some((c: any) => c.id === selectedConstituencyId);
          if (!exists) {
            setSelectedConstituencyId(cList[0].id);
          }
        } else {
          throw new Error("No API constituencies");
        }
        setLoadingConstituencies(false);
      })
      .catch((err) => {
        // Offline Fallback for Constituencies
        let offlineConsts: any[] = [];
        const matchState = states.find((s: any) => s.id === selectedStateId || s.code === selectedStateId);
        const geoState = INDIA_MASTER_GEO.find((s: any) => s.code === matchState?.code || s.code === selectedStateId);

        if (geoState) {
          geoState.districts.forEach((d: any) => {
            const distKey = `${geoState.code}:${d.name}`;
            if (!selectedDistrictId || selectedDistrictId === distKey || d.name.toLowerCase().includes(selectedDistrictId.toLowerCase())) {
              d.constituencies.forEach((c: any) => {
                offlineConsts.push({
                  id: c.code,
                  code: c.code,
                  name: c.name,
                  nameHi: c.nameHi,
                  type: c.type,
                  districtId: distKey,
                  districtName: d.name,
                  stateId: geoState.code,
                  stateName: geoState.name
                });
              });
            }
          });
        }

        setConstituencies(offlineConsts);
        if (offlineConsts.length > 0) {
          const exists = offlineConsts.some((c: any) => c.id === selectedConstituencyId);
          if (!exists) {
            setSelectedConstituencyId(offlineConsts[0].id);
          }
        } else {
          setSelectedConstituencyId("");
        }
        setLoadingConstituencies(false);
      });
  }, [selectedDistrictId, selectedStateId]);

  // 4. Fetch Polling Stations when selectedConstituencyId changes
  useEffect(() => {
    if (!selectedConstituencyId || !showPollingStation) {
      setPollingStations([]);
      setSelectedStationId("");
      return;
    }

    setLoadingStations(true);
    fetch(`/api/geography/polling-stations?constituencyId=${selectedConstituencyId}`)
      .then((res) => res.json())
      .then((data) => {
        const stList = data.pollingStations || [];
        setPollingStations(stList);
        setLoadingStations(false);

        if (stList.length > 0) {
          const exists = stList.some((s: any) => s.id === selectedStationId);
          if (!exists) {
            setSelectedStationId(stList[0].id);
          }
        }
      })
      .catch((err) => {
        // Offline Fallback for Stations
        let offlineStations: any[] = [];
        INDIA_MASTER_GEO.forEach((s: any) => {
          s.districts.forEach((d: any) => {
            d.constituencies.forEach((c: any) => {
              if (c.code === selectedConstituencyId || c.name.toLowerCase() === selectedConstituencyId.toLowerCase()) {
                c.pollingStations.forEach((ps: any) => {
                  offlineStations.push({
                    id: ps.stationCode,
                    stationCode: ps.stationCode,
                    name: ps.name,
                    nameHi: ps.nameHi,
                    address: ps.address
                  });
                });
              }
            });
          });
        });

        setPollingStations(offlineStations);
        if (offlineStations.length > 0) {
          setSelectedStationId(offlineStations[0].id);
        }
        setLoadingStations(false);
      });
  }, [selectedConstituencyId, showPollingStation]);

  // 5. Notify parent ONLY when user state changes (ignoring initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!callbackRef.current) return;

    const matchedState = states.find((s) => s.id === selectedStateId);
    const matchedDistrict = districts.find((d) => d.id === selectedDistrictId);
    const matchedConstituency = constituencies.find((c) => c.id === selectedConstituencyId);
    const matchedStation = pollingStations.find((s) => s.id === selectedStationId);

    callbackRef.current({
      stateId: selectedStateId || undefined,
      stateCode: matchedState?.code,
      stateName: matchedState?.name,
      districtId: selectedDistrictId || undefined,
      districtName: matchedDistrict?.name,
      constituencyId: selectedConstituencyId || undefined,
      constituencyCode: matchedConstituency?.code,
      constituencyName: matchedConstituency?.name,
      stationId: selectedStationId || undefined,
      stationName: matchedStation?.name,
      boothNumber: selectedBoothNumber
    });
  }, [selectedStateId, selectedDistrictId, selectedConstituencyId, selectedStationId, selectedBoothNumber]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* CASCADING DROPDOWNS GRID */}
      <div className={`grid grid-cols-1 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"} gap-4 text-xs`}>
        
        {/* 1. STATE SELECTOR */}
        <div className="space-y-1.5">
          <label className="font-bold text-gray-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-eci-saffron font-mono uppercase tracking-wider text-[11px]">
              <MapPin className="w-3.5 h-3.5" /> 1. State / UT *
            </span>
            {loadingStates && <span className="text-[10px] text-amber-400 animate-pulse">Loading...</span>}
          </label>
          <select
            value={selectedStateId}
            onChange={(e) => {
              setSelectedStateId(e.target.value);
              setSelectedDistrictId("");
              setSelectedConstituencyId("");
              setSelectedStationId("");
            }}
            className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700/90 rounded-xl text-white focus:outline-none focus:border-eci-saffron shadow-sm cursor-pointer"
          >
            <option value="">-- All 36 States & UTs --</option>
            {states.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} {st.nameHi ? `(${st.nameHi})` : ""} • [{st.code}] ({st.totalSeats} Seats)
              </option>
            ))}
          </select>
        </div>

        {/* 2. DISTRICT SELECTOR */}
        <div className="space-y-1.5">
          <label className="font-bold text-gray-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-400 font-mono uppercase tracking-wider text-[11px]">
              <Building className="w-3.5 h-3.5" /> 2. District
            </span>
            {loadingDistricts ? (
              <span className="text-[10px] text-sky-400 animate-pulse">Loading...</span>
            ) : (
              districts.length > 0 && <span className="text-[10px] text-sky-400 font-mono font-bold">{districts.length} Districts</span>
            )}
          </label>
          <select
            disabled={districts.length === 0}
            value={selectedDistrictId}
            onChange={(e) => {
              setSelectedDistrictId(e.target.value);
              setSelectedConstituencyId("");
              setSelectedStationId("");
            }}
            className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700/90 rounded-xl text-white focus:outline-none focus:border-sky-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm font-medium cursor-pointer"
          >
            <option value="">
              {districts.length === 0
                ? "Loading Districts..."
                : selectedStateId
                ? `-- All Districts in State (${districts.length}) --`
                : `-- All Districts across India (${districts.length}) --`}
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} {d.nameHi ? `(${d.nameHi})` : ""} {d.stateCode ? `[${d.stateCode}]` : d.stateName ? `[${d.stateName}]` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* 3. CONSTITUENCY SELECTOR */}
        <div className="space-y-1.5">
          <label className="font-bold text-gray-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono uppercase tracking-wider text-[11px]">
              <Landmark className="w-3.5 h-3.5" /> 3. Constituency
            </span>
            {loadingConstituencies && <span className="text-[10px] text-emerald-400 animate-pulse">Loading...</span>}
          </label>
          <select
            disabled={!selectedStateId || constituencies.length === 0}
            value={selectedConstituencyId}
            onChange={(e) => {
              setSelectedConstituencyId(e.target.value);
              setSelectedStationId("");
            }}
            className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700/90 rounded-xl text-white focus:outline-none focus:border-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-[11px] shadow-sm font-medium"
          >
            <option value="">
              {!selectedStateId
                ? "Select State First"
                : constituencies.length === 0
                ? "No Constituencies Loaded"
                : "-- Select Constituency --"}
            </option>
            {constituencies.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.code}] {c.name} {c.nameHi ? `(${c.nameHi})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* 4. POLLING STATION SELECTOR */}
        {showPollingStation && (
          <div className="space-y-1.5">
            <label className="font-bold text-gray-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-400 font-mono uppercase tracking-wider text-[11px]">
                <Ticket className="w-3.5 h-3.5" /> 4. Polling Station & Booth
              </span>
              {loadingStations && <span className="text-[10px] text-amber-400 animate-pulse">Loading...</span>}
            </label>
            <select
              disabled={!selectedConstituencyId || pollingStations.length === 0}
              value={selectedStationId}
              onChange={(e) => {
                setSelectedStationId(e.target.value);
              }}
              className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700/90 rounded-xl text-white focus:outline-none focus:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-[11px] shadow-sm font-medium"
            >
              <option value="">
                {!selectedConstituencyId
                  ? "Select Constituency First"
                  : pollingStations.length === 0
                  ? "No Station Registered"
                  : "-- Select Station --"}
              </option>
              {pollingStations.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.stationCode || 'ST'}] {s.name} {s.nameHi ? `(${s.nameHi})` : ""}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* SELECTION SUMMARY BADGE */}
      {selectedStateId && (
        <div className="p-3 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border border-gray-800 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Active Geographic Context:{" "}
              <strong className="text-eci-saffron font-extrabold">
                {states.find((s) => s.id === selectedStateId)?.name}
              </strong>
              {selectedDistrictId && (
                <>
                  {" "}
                  <ChevronRight className="w-3.5 h-3.5 inline text-gray-500" />{" "}
                  <strong className="text-sky-400 font-bold">
                    {districts.find((d) => d.id === selectedDistrictId)?.name}
                  </strong>
                </>
              )}
              {selectedConstituencyId && (
                <>
                  {" "}
                  <ChevronRight className="w-3.5 h-3.5 inline text-gray-500" />{" "}
                  <strong className="text-emerald-400 font-mono font-bold">
                    {constituencies.find((c) => c.id === selectedConstituencyId)?.name}
                  </strong>
                </>
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedStateId("");
              setSelectedDistrictId("");
              setSelectedConstituencyId("");
              setSelectedStationId("");
            }}
            className="text-[11px] font-bold text-gray-400 hover:text-red-400 underline transition"
          >
            Reset Hierarchy
          </button>
        </div>
      )}
    </div>
  );
}
