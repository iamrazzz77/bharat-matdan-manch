import Link from "next/link";
import { Vote, Shield, CheckCircle, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-eci-darkNavy text-gray-400 border-t border-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-eci-saffron" />
              <span className="font-bold text-white tracking-wide">BHARAT MATDAN MANCH</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              India Digital Election Platform — A secret-ballot, end-to-end verifiable digital voting platform architected for democratic integrity across 543 Parliamentary Constituencies.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
              <Lock className="w-3.5 h-3.5" />
              SHA-256 Chained Hash Integrity
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Voter Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/voter" className="hover:text-eci-saffron">Digital EPIC Card Verification</Link></li>
              <li><Link href="/results" className="hover:text-eci-saffron">Live Turnout & Results Map</Link></li>
              <li><Link href="/#eligibility" className="hover:text-eci-saffron">Polling Station Finder</Link></li>
              <li><Link href="/voter#absentee" className="hover:text-eci-saffron">Absentee & Mail-In Ballot Module</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Official Dashboards</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/officer" className="hover:text-amber-400">Polling Officer Booth Check-In</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-400">Admin Lifecycle Manager</Link></li>
              <li><Link href="/admin#audit" className="hover:text-cyan-400">Tamper-Evident Audit Logs</Link></li>
              <li><Link href="/admin#reports" className="hover:text-cyan-400">Download Reports</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Security & Compliance</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle className="w-3.5 h-3.5 text-eci-saffron" />
                Double-Vote Prevention Lock
              </p>
              <p className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle className="w-3.5 h-3.5 text-eci-saffron" />
                VVPAT Electronic Verification Slip
              </p>
              <p className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle className="w-3.5 h-3.5 text-eci-saffron" />
                Secret Ballot Choice Isolation
              </p>
              <p className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle className="w-3.5 h-3.5 text-eci-saffron" />
                WCAG 2.1 Accessibility Compliant
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 Bharat Matdan Manch (India Digital Election Platform). All rights reserved.</p>
          <div className="flex gap-4 font-mono">
            <span>Secure Encryption</span>
            <span>REST API</span>
            <span>Cryptographic Auditing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
