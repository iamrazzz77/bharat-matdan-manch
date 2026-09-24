"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Vote, UserPlus, CheckCircle, AlertCircle, MapPin } from "lucide-react";
import GeoSelector, { GeoSelection } from "@/components/GeoSelector";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    epicNumber: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    aadhaarNumber: ""
  });

  const [geoSelection, setGeoSelection] = useState<GeoSelection>({});
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!geoSelection.stateId || !geoSelection.constituencyId) {
      setError("Please select a State and Constituency for voter registration.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          stateId: geoSelection.stateId,
          districtId: geoSelection.districtId,
          constituencyId: geoSelection.constituencyId,
          stationId: geoSelection.stationId,
          boothNumber: geoSelection.boothNumber || 1
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccessMsg("EPIC Voter Account Registered Successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError("Network error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-eci-cardBg border border-gray-700/80 rounded-2xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-eci-saffron to-amber-500 flex items-center justify-center mx-auto text-gray-950 shadow-lg">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">New EPIC Voter Registration</h2>
          <p className="text-xs text-gray-400">Register your Elector Photo Identity Card with official database hierarchy</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* PERSONAL & IDENTITY DETAILS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-2">1. Personal & Identity Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">EPIC Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EPIC998877"
                  value={formData.epicNumber}
                  onChange={(e) => setFormData({ ...formData, epicNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white font-mono uppercase focus:border-eci-saffron focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Full Name (As per EPIC) *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white focus:border-eci-saffron focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91-9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white focus:border-eci-saffron focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="voter@domain.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white focus:border-eci-saffron focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Aadhaar Number (Demo Link)</label>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="12-digit Aadhaar"
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white font-mono focus:border-eci-saffron focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300 mb-1">Set Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white focus:border-eci-saffron focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC GEOGRAPHIC HIERARCHY SELECTOR */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-eci-saffron" />
              2. Electoral Boundary Assignment (Database Driven)
            </h3>
            
            <GeoSelector
              compact={false}
              showPollingStation={true}
              showBooth={true}
              onSelectionChange={(selection) => setGeoSelection(selection)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-eci-saffron to-amber-600 hover:from-amber-500 hover:to-eci-saffron text-gray-950 font-extrabold rounded-xl text-sm shadow-xl transition-all"
          >
            {loading ? "Registering Voter Account..." : "Complete Voter Onboarding"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Already registered?{" "}
            <Link href="/login" className="text-eci-saffron font-bold hover:underline">
              Sign In to Voter Portal
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
