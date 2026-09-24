"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Volume2, VolumeX, Sparkles, CheckCircle2, Shield, MapPin, Vote, ArrowRight } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  textHi?: string;
  time: string;
}

export default function AIElectionAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Namaste! I am your AI Sahayak for Bharat Matdan Manch. Ask me anything about polling stations, voter eligibility, secret ballot security, or live election results!",
      textHi: "नमस्ते! मैं भारत मतदान मंच का एआई सहायक हूँ। मतदान केंद्र, मतदाता पात्रता, गुप्त मतदान सुरक्षा या लाइव चुनाव परिणामों के बारे में कुछ भी पूछें!",
      time: "Just now"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");

    // Simulate AI response logic
    setTimeout(() => {
      let aiText = "I am processing your query against official Election Commission records. For voter verification, you can use your 10-digit EPIC number on the home page.";
      const q = textToSend.toLowerCase();

      if (q.includes("booth") || q.includes("station") || q.includes("where") || q.includes("kaha")) {
        aiText = "📍 Polling Station Finder: Enter your EPIC ID (e.g. EPIC100001) on the homepage search bar to view your assigned Polling Station, Booth Number, and District Electoral Officer contact.";
      } else if (q.includes("security") || q.includes("safe") || q.includes("hash") || q.includes("secret") || q.includes("vvpat")) {
        aiText = "🛡️ Cryptographic Security: Bharat Matdan Manch uses SHA-256 chained hash integrity and secret ballot isolation. Your voter identity is stored separately from your anonymous vote, guaranteeing 100% privacy and double-vote lock.";
      } else if (q.includes("result") || q.includes("count") || q.includes("tally") || q.includes("who is winning")) {
        aiText = "📊 Live Results Center: Visit the /results page to view dynamic constituency-wise seat tallies, party lead charts, and state-wise turnout maps updated every 5 seconds.";
      } else if (q.includes("epic") || q.includes("register") || q.includes("card") || q.includes("voter id")) {
        aiText = "🆔 Voter EPIC Registration: New voters can register using Aadhaar-linked OTP verification at /register. Once approved by the District Electoral Officer, your digital EPIC card is issued instantly.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiText);
    }, 600);
  };

  return (
    <>
      {/* FLOATING AI ASSISTANT LAUNCH BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-eci-saffron via-amber-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-2xl hover:scale-105 hover:shadow-amber-500/30 transition-all border border-amber-300/40"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="hidden sm:inline text-xs font-black tracking-wide uppercase">
            AI Sahayak 🤖
          </span>
        </button>
      </div>

      {/* AI ASSISTANT CHAT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[520px] z-50 glass-card bg-slate-950/95 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 backdrop-blur-2xl">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-eci-saffron">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  ECI AI Sahayak
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Voice Guided Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (isSpeaking) window.speechSynthesis.cancel();
                }}
                className={`p-2 rounded-xl border transition ${
                  soundEnabled ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
                title={soundEnabled ? "Mute Voice Output" : "Enable Voice Output"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/80 flex gap-2 overflow-x-auto text-[11px] font-medium no-scrollbar">
            <button
              onClick={() => handleSend("Where is my polling booth?")}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-eci-saffron border border-slate-700 whitespace-nowrap transition"
            >
              📍 Find Booth
            </button>
            <button
              onClick={() => handleSend("How does secret ballot encryption work?")}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-700 whitespace-nowrap transition"
            >
              🛡️ Security & Hash
            </button>
            <button
              onClick={() => handleSend("Show live results of election")}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700 whitespace-nowrap transition"
            >
              📊 Live Results
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 font-semibold rounded-tr-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-1.5"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  {msg.textHi && <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">{msg.textHi}</p>}
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask AI Assistant in English / हिन्दी..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-eci-saffron"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-eci-saffron to-amber-600 text-slate-950 font-bold rounded-xl hover:brightness-110 transition shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
