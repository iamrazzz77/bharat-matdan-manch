"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Vote, Shield, MapPin, User, LogOut } from "lucide-react";
import { translations, Language } from "@/lib/i18n";

interface NavbarProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function Navbar({ currentLang = "en", onLanguageChange }: NavbarProps) {
  const [lang, setLang] = useState<Language>(currentLang);
  const [sessionUser, setSessionUser] = useState<any>(null);

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

  return (
    <header className="sticky top-0 z-50 bg-eci-darkNavy border-b border-eci-saffron/30 text-white shadow-xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-eci-saffron via-white to-eci-green px-4 py-1 text-center text-xs font-semibold text-gray-900 tracking-wide flex items-center justify-between">
        <span className="hidden md:inline font-bold">BHARAT MATDAN MANCH (INDIA DIGITAL ELECTION PLATFORM)</span>
        <span className="bg-slate-900 text-eci-saffron px-2.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider shadow border border-slate-700">
          OFFICIAL DIGITAL ELECTION INFRASTRUCTURE
        </span>
        <span className="hidden md:inline text-[11px] font-medium text-gray-800">
          18th Lok Sabha General Elections 2026
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-eci-saffron via-white to-eci-navy flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-eci-darkNavy rounded-full flex items-center justify-center">
              <Vote className="w-5 h-5 text-eci-saffron" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-eci-saffron via-white to-eci-green bg-clip-text text-transparent">
              {t.platformName}
            </span>
            <span className="block text-[10px] text-gray-400 font-medium">
              National Election Commission Portal
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-eci-saffron transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/results" className="hover:text-eci-saffron transition-colors flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            {t.nav.results}
          </Link>
          <Link href="/voter" className="hover:text-eci-saffron transition-colors flex items-center gap-1.5">
            <Vote className="w-4 h-4 text-eci-saffron" />
            {t.nav.voterPortal}
          </Link>
          {(sessionUser?.role === "POLLING_OFFICER" || sessionUser?.role === "ADMIN" || sessionUser?.role === "SUPER_ADMIN") && (
            <Link href="/officer" className="hover:text-eci-saffron transition-colors text-amber-400 flex items-center gap-1">
              <Shield className="w-4 h-4" />
              {t.nav.officerPortal}
            </Link>
          )}
          {(sessionUser?.role === "ADMIN" || sessionUser?.role === "SUPER_ADMIN") && (
            <Link href="/admin" className="hover:text-eci-saffron transition-colors text-cyan-400 font-bold flex items-center gap-1">
              <Shield className="w-4 h-4" />
              {t.nav.adminPortal}
            </Link>
          )}
        </nav>

        {/* Controls & User Session */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center bg-gray-800/80 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => handleLangToggle("en")}
              className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                lang === "en" ? "bg-eci-saffron text-gray-950 shadow" : "text-gray-400 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLangToggle("hi")}
              className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                lang === "hi" ? "bg-eci-saffron text-gray-950 shadow" : "text-gray-400 hover:text-white"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* User Profile / Auth Action */}
          {sessionUser ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-700">
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-gray-200">{sessionUser.fullName}</span>
                <span className="text-[10px] text-eci-saffron font-mono uppercase">{sessionUser.epicNumber} ({sessionUser.role})</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-800/50 text-red-300 transition"
                title={t.nav.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-eci-saffron to-amber-600 hover:from-amber-500 hover:to-eci-saffron text-gray-950 rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              {t.nav.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
