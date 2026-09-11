import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { motion } from "motion/react";

export default function Navbar({
  position = "fixed",
}: {
  position?: "fixed" | "absolute" | "relative";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Careers", to: "/careers" },
    { label: "Pricing", to: "/pricing" },
    { label: "Support", to: "/support" },
  ];

  return (
    <div
      className={`${
        position === "fixed"
          ? "fixed top-0 left-0"
          : position === "absolute"
          ? "absolute top-0 left-0"
          : "relative"
      } w-full z-50 px-4 md:px-8 pt-4 pointer-events-none select-none`}
    >
      <nav className="max-w-6xl mx-auto liquid-glass rounded-full py-2.5 px-6 transition-all duration-300 pointer-events-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/favicon.ico"
            alt="Nexubotics"
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-500 transition-colors font-display">
            Nexubotics
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1.5 transition-colors hover:text-slate-900 ${
                  isActive ? "text-primary font-bold" : ""
                }`}
              >
                {item.label}

                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/book">
            <Button className="bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/10 h-9 px-5 rounded-full font-bold tracking-wider text-xs uppercase transition-all hover:translate-y-[-1px] border-none cursor-pointer flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Book a Call
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((val) => !val)}
          className="md:hidden h-9 w-9 rounded-full border border-slate-200/50 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-3 bg-white/95 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-2xl transition-all duration-300 pointer-events-auto">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-slate-100/50 ${
                  location.pathname === item.to
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-slate-100 my-2" />

            <Link to="/book" className="w-full">
              <Button className="w-full h-11 bg-primary text-white font-bold rounded-xl text-sm border-none cursor-pointer flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}