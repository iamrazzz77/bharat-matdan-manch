"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Vote, Shield, MapPin, User, LogOut, Menu, X, Home, CheckCircle2 } from "lucide-react";
import { translations, Language } from "@/lib/i18n";

interface NavbarProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function Navbar({ currentLang = "en", onLanguageChange }: NavbarProps) {
  const [lang, setLang] = useState<Language>(currentLang);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const t = translations[lang] || translations.en;

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setSessionUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLangToggle = (newLang: Language) => {
    setLang(newLang);
    if (onLanguageChange) onLanguageChange(newLang);
    localStorage.setItem("bmm_lang", newLang);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-eci-saffron/20 text-white shadow-2xl backdrop-blur-xl">
      {/* Top National Banner */}
      <div className="bg-gradient-to-r from-eci-saffron via-white to-eci-green px-4 py-1 text-center text-xs font-semibold text-gray-950 tracking-wide flex items-center justify-between shadow-inner">
        <span className="hidden md:flex items-center gap-1.5 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
          BHARAT MATDAN MANCH (INDIA DIGITAL ELECTION PLATFORM)
        </span>
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-dot inline-block" />
          <span className="bg-slate-950 text-eci-saffron px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider border border-amber-500/30 shadow">
            OFFICIAL ELECTION INFRASTRUCTURE • LOK SABHA 2026
          </span>
        </div>
        <span className="hidden md:inline text-[11px] font-bold text-gray-900">
          Election Commission of India
        </span>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-eci-saffron via-amber-200 to-eci-green flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#0b132b] rounded-[10px] flex items-center justify-center">
              <Vote className="w-5 h-5 text-eci-saffron group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight tricolor-gradient-text">
              {t.platformName}
            </span>
            <span className="block text-[10px] text-slate-400 font-medium tracking-wide">
              National Digital Voting Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              isActive("/")
                ? "bg-eci-saffron/15 text-eci-saffron border border-eci-saffron/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Home className="w-4 h-4" />
            {t.nav.home}
          </Link>

          <Link
            href="/results"
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              isActive("/results")
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            {t.nav.results}
          </Link>

          <Link
            href="/voter"
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              isActive("/voter")
                ? "bg-amber-500/15 text-eci-saffron border border-amber-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Vote className="w-4 h-4 text-eci-saffron" />
            {t.nav.voterPortal}
          </Link>

          {(sessionUser?.role === "POLLING_OFFICER" || sessionUser?.role === "ADMIN" || sessionUser?.role === "SUPER_ADMIN") && (
            <Link
              href="/officer"
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                isActive("/officer")
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : "text-amber-400 hover:bg-amber-950/40"
              }`}
            >
              <Shield className="w-4 h-4" />
              {t.nav.officerPortal}
            </Link>
          )}

          {(sessionUser?.role === "ADMIN" || sessionUser?.role === "SUPER_ADMIN") && (
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                isActive("/admin")
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                  : "text-cyan-400 hover:bg-cyan-950/40 font-bold"
              }`}
            >
              <Shield className="w-4 h-4" />
              {t.nav.adminPortal}
            </Link>
          )}
        </nav>

        {/* Right Action Bar & User Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector Switcher */}
          <div className="relative flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-700/80 shadow-inner">
            <button
              onClick={() => handleLangToggle("en")}
              className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                lang === "en" ? "bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLangToggle("hi")}
              className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                lang === "hi" ? "bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* User Profile / Auth Action */}
          {sessionUser ? (
            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-700">
              <div className="text-right">
                <span className="block text-xs font-bold text-slate-100">{sessionUser.fullName}</span>
                <span className="text-[10px] text-eci-saffron font-mono uppercase tracking-wider font-semibold">
                  {sessionUser.epicNumber}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-red-950/50 hover:bg-red-900/80 border border-red-700/40 text-red-300 transition shadow-sm"
                title={t.nav.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex px-4 py-2 text-xs font-extrabold bg-gradient-to-r from-eci-saffron via-amber-500 to-amber-600 hover:brightness-110 text-gray-950 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              {t.nav.login}
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive("/") ? "bg-eci-saffron/20 text-eci-saffron font-bold" : "text-slate-300"
              }`}
            >
              <Home className="w-4 h-4" />
              {t.nav.home}
            </Link>

            <Link
              href="/results"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive("/results") ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-slate-300"
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              {t.nav.results}
            </Link>

            <Link
              href="/voter"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                isActive("/voter") ? "bg-amber-500/20 text-eci-saffron font-bold" : "text-slate-300"
              }`}
            >
              <Vote className="w-4 h-4 text-eci-saffron" />
              {t.nav.voterPortal}
            </Link>

            {(sessionUser?.role === "POLLING_OFFICER" || sessionUser?.role === "ADMIN" || sessionUser?.role === "SUPER_ADMIN") && (
              <Link
                href="/officer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-400 bg-amber-950/20"
              >
                <Shield className="w-4 h-4" />
                {t.nav.officerPortal}
              </Link>
            )}

            {(sessionUser?.role === "ADMIN" || sessionUser?.role === "SUPER_ADMIN") && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-cyan-400 bg-cyan-950/20 font-bold"
              >
                <Shield className="w-4 h-4" />
                {t.nav.adminPortal}
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {sessionUser ? (
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="block text-xs font-bold text-white">{sessionUser.fullName}</span>
                  <span className="text-[10px] text-eci-saffron font-mono">{sessionUser.epicNumber}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs bg-red-950 text-red-300 rounded-lg border border-red-800 flex items-center gap-1 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

