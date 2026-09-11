import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ChevronRight, Home, Calendar, Cloud, Heart } from "lucide-react";
import useSEO from "../hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Nexubotics - Page Not Found",
    description: "The page you are looking for does not exist on Nexubotics.",
    noindex: true
  });
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-primary/20 selection:text-primary font-sans flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center py-20 px-6 max-w-4xl mx-auto w-full relative z-10">
        
        {/* Subtle top subheader */}
        <div className="text-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Seems you've wandered off...</span>
        </div>

        {/* Headline with absolute floating elements */}
        <div className="relative inline-block text-center px-4 max-w-xl">
          {/* Floating purple cloud on left */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-8 -left-6 text-indigo-300 opacity-60 pointer-events-none hidden sm:block"
          >
            <Cloud className="w-8 h-8 fill-indigo-100" />
          </motion.div>
          
          {/* Floating light purple heart on right */}
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -right-6 text-purple-300 opacity-60 pointer-events-none hidden sm:block"
          >
            <Heart className="w-6 h-6 fill-purple-100" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1]">
            Whoops! Nothing here yet
          </h1>
        </div>

        {/* Copy text block with inline pills/badges */}
        <div className="max-w-md mx-auto text-center text-slate-500 text-xs sm:text-sm mt-6 mb-8 px-4 leading-relaxed space-y-3 font-medium">
          <p>
            Grab a 30-minute 
            <span className="px-2.5 py-0.5 mx-1.5 inline-flex items-center text-xs font-extrabold bg-slate-100 border border-slate-200/50 rounded-md text-slate-700 font-mono">chat</span> 
            to explore your ideas, scope, and vision.
          </p>
          <p>
            We'll find common ground, sync and 
            <span className="px-2.5 py-0.5 mx-1.5 inline-flex items-center text-xs font-extrabold bg-slate-100 border border-slate-200/50 rounded-md text-slate-700 font-mono">define</span> 
            a clear roadmap.
          </p>
        </div>

        {/* Concentric Orbiting circles and UFO container */}
        <div className="relative w-full max-w-lg flex justify-center items-center py-6">
          {/* Concentric dashed orbit rings in the background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
            {/* Radial purple glow in the center */}
            <div className="absolute w-[280px] h-[280px] bg-purple-500/10 blur-[80px] rounded-full" />
            
            {/* Dashed outer rings */}
            <div className="absolute w-[280px] h-[280px] border border-dashed border-slate-200/80 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[400px] h-[400px] border border-dashed border-slate-200/50 rounded-full animate-[spin_70s_linear_infinite]" />
            <div className="absolute w-[520px] h-[520px] border border-dashed border-slate-200/30 rounded-full animate-[spin_100s_linear_infinite]" />
          </div>

          {/* Hovering metallic UFO image */}
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, 1.5, -1.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4.5, 
              ease: "easeInOut" 
            }}
            className="relative z-10 select-none pointer-events-none"
          >
            <img 
              src="/ufo_404.png" 
              alt="Whoops 404 Spacecraft" 
              className="w-52 sm:w-60 h-auto drop-shadow-[0_16px_32px_rgba(168,85,247,0.12)]"
            />
          </motion.div>
        </div>

        {/* Bottom stacked navigation cards */}
        <div className="max-w-md w-full mx-auto space-y-3 mt-6">
          <Link to="/" className="block group">
            <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 border border-slate-200/60 hover:border-slate-300 rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-primary/5 group-hover:border-primary/10 group-hover:text-primary transition-all shadow-sm">
                  <Home className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 block font-display tracking-tight">Main Page</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium font-sans">Back where it all begins...</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          <Link to="/book" className="block group">
            <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 border border-slate-200/60 hover:border-slate-300 rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-primary/5 group-hover:border-primary/10 group-hover:text-primary transition-all shadow-sm">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 block font-display tracking-tight">Book Consult</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium font-sans">Let's align and define your roadmap...</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
