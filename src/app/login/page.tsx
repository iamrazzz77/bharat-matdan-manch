"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Vote, Lock, AlertCircle, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Redirect based on role
      const role = data.user.role;
      if (role === "SUPER_ADMIN" || role === "ADMIN") {
        router.push("/admin");
      } else if (role === "POLLING_OFFICER") {
        router.push("/officer");
      } else {
        router.push("/voter");
      }
    } catch (err: any) {
      setError("Network connection error.");
      setLoading(false);
    }
  };

  const handleQuickLogin = (userIdent: string, pass: string) => {
    setIdentifier(userIdent);
    setPassword(pass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-eci-cardBg border border-gray-700/80 rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-eci-saffron to-amber-500 flex items-center justify-center mx-auto text-gray-950 shadow-lg">
            <Vote className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Identity Login Portal</h2>
          <p className="text-xs text-gray-400">Enter your EPIC Number or registered Email address</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              EPIC Number / Official Email
            </label>
            <input
              type="text"
              required
              placeholder="e.g. EPIC100001 or admin@eci.gov.in"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-eci-saffron font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-eci-saffron"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-eci-saffron to-amber-600 hover:from-amber-500 hover:to-eci-saffron text-gray-950 font-extrabold rounded-xl text-sm shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Login & Access Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* PRESET QUICK-LOGIN DEMO BUTTONS */}
        <div className="pt-4 border-t border-gray-800 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block text-center">
            ⚡ Quick Demo Credentials
          </span>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin("EPIC100001", "Voter123!")}
              className="p-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl text-left text-gray-200 transition"
            >
              <div className="font-bold text-eci-saffron flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Demo Voter 1
              </div>
              <div className="text-[10px] text-gray-400 font-mono">EPIC100001</div>
            </button>

            <button
              onClick={() => handleQuickLogin("EPIC100003", "Voter123!")}
              className="p-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl text-left text-gray-200 transition"
            >
              <div className="font-bold text-eci-saffron flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Demo Voter 2
              </div>
              <div className="text-[10px] text-gray-400 font-mono">EPIC100003</div>
            </button>

            <button
              onClick={() => handleQuickLogin("officer.mumbai@eci.gov.in", "Pass123!")}
              className="p-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl text-left text-gray-200 transition"
            >
              <div className="font-bold text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Polling Officer
              </div>
              <div className="text-[10px] text-gray-400 font-mono">officer.mumbai</div>
            </button>

            <button
              onClick={() => handleQuickLogin("admin@eci.gov.in", "Pass123!")}
              className="p-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl text-left text-gray-200 transition"
            >
              <div className="font-bold text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </div>
              <div className="text-[10px] text-gray-400 font-mono">admin@eci.gov.in</div>
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Don't have an EPIC account?{" "}
            <Link href="/register" className="text-eci-saffron font-bold hover:underline">
              Register New Voter EPIC
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
