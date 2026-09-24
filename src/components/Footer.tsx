import Link from "next/link";
import { Vote, Lock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950/90 text-slate-400 border-t border-slate-800 text-sm backdrop-blur-xl">
      <div className="h-1 w-full bg-gradient-to-r from-eci-saffron via-white to-eci-green opacity-80" />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-eci-saffron shadow-inner">
                <Vote className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white tracking-tight text-base tricolor-gradient-text">BHARAT MATDAN MANCH</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India Digital Election Platform — A secret-ballot, end-to-end verifiable digital voting platform architected for democratic integrity across 543 Parliamentary Constituencies.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/50 shadow-sm font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              SHA-256 Chained Hash Integrity
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Voter Resources</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/voter" className="hover:text-eci-saffron transition-colors">Digital EPIC Card Verification</Link></li>
              <li><Link href="/results" className="hover:text-eci-saffron transition-colors">Live Turnout & Results Map</Link></li>
              <li><Link href="/#eligibility" className="hover:text-eci-saffron transition-colors">Polling Station Finder</Link></li>
              <li><Link href="/voter#absentee" className="hover:text-eci-saffron transition-colors">Absentee & Mail-In Ballot Module</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Official Dashboards</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/officer" className="hover:text-amber-400 transition-colors text-amber-400/90">Polling Officer Booth Check-In</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-400 transition-colors text-cyan-400/90">Admin Lifecycle Manager</Link></li>
              <li><Link href="/admin#audit" className="hover:text-cyan-400 transition-colors text-slate-300">Tamper-Evident Audit Logs</Link></li>
              <li><Link href="/admin#reports" className="hover:text-cyan-400 transition-colors text-slate-300">Download Reports</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Security & Compliance</h4>
            <div className="space-y-2.5 text-xs font-medium">
              <p className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-eci-saffron shrink-0" />
                Double-Vote Prevention Lock
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                VVPAT Electronic Verification Slip
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                Secret Ballot Choice Isolation
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                WCAG 2.1 Accessibility Compliant
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© 2026 Bharat Matdan Manch (India Digital Election Platform). All rights reserved.</p>
          <div className="flex gap-4 font-mono text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">AES-256</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">REST API</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Audit Trail</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

