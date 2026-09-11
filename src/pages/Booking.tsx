import React from "react";
import { Calendar, ShieldCheck, Clock, RefreshCw, MessageSquare } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

export default function Booking() {
  useSEO({
    title: "Nexubotics - Book a Strategy Call",
    description: "Schedule a strategy call with the Nexubotics engineering team to plan your AI chatbots, CRM integrations, and workflow automation.",
    keywords: "book AI strategy call, Nexubotics consulting, AI automation discovery, consult automation developer"
  });

  let rawCalLink = (import.meta.env.VITE_CAL_LINK || "https://cal.com/nexubotics/strategy-call").trim();
  
  if (rawCalLink && !rawCalLink.startsWith("http://") && !rawCalLink.startsWith("https://")) {
    if (rawCalLink.includes("cal.com")) {
      rawCalLink = `https://${rawCalLink}`;
    } else {
      rawCalLink = `https://cal.com/${rawCalLink}`;
    }
  }
  
  const embedUrl = rawCalLink.includes("?") ? `${rawCalLink}&embed=true` : `${rawCalLink}?embed=true`;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Navbar position="absolute" />

      <section className="relative pt-28 pb-28 px-3 sm:px-6 max-w-6xl mx-auto z-10">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-slate-200/50 text-primary text-xs font-semibold tracking-wide backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5" /> Direct Scheduling
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1] max-w-3xl mx-auto">
            Book your custom <br />
            <span className="text-brand-gradient">AI strategy session.</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-normal">
            Schedule a strategy call with our team below. All times are synced in real time.
          </p>
        </div>

        {/* Cal.com Embed Container */}
        <div className="glass-card rounded-3xl p-2 sm:p-4 md:p-6 shadow-2xl relative overflow-hidden backdrop-blur-lg min-h-[680px]">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/50 pb-4 mb-6 gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest font-mono">Calendar Availability</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> 30 Min Consultation
              </span>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/5 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
                <ShieldCheck className="w-3.5 h-3.5" /> SSL Secured
              </span>
            </div>
          </div>

          {/* Iframe scheduler */}
          <div className="w-full h-[650px] rounded-2xl overflow-hidden bg-slate-50/60 border border-slate-200/50 relative">
            {/* Loading placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50 text-slate-500 -z-10">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="text-[10px] uppercase tracking-widest font-bold font-mono">Loading calendar...</span>
            </div>
            
            <iframe 
              src={embedUrl}
              style={{ width: "100%", height: "100%", border: "none" }}
              className="w-full h-full relative z-10"
              title="Scheduling Calendar"
              allow="camera; microphone; clipboard-write; autoplay;"
            />
          </div>
        </div>

        {/* Divider and WhatsApp Option */}
        <div className="mt-12 flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center justify-center text-slate-400 font-semibold text-xs font-mono tracking-widest uppercase">
            --------- OR ----------
          </div>

          <a 
            href="https://wa.me/917829527825" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div className="liquid-glass hover:bg-white/40 border border-slate-200 hover:border-emerald-500/20 px-8 py-4 rounded-2xl flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-500/20">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block font-sans">Chat on WhatsApp</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Speak with our team instantly</span>
              </div>
            </div>
          </a>
        </div>

        {/* Footer Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Secure calendar integration. No data cached outside your provider.
        </div>
      </section>

      <Footer />
    </div>
  );
}
