import React, { useState, useEffect } from "react";
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

  // Close the mobile drawer whenever the route changes (e.g. back/forward nav)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the mobile drawer is open, so users can't
  // drag-scroll the page underneath it.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevWidth = document.body.style.width;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = "";
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

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
      <nav className="max-w-6xl mx-auto liquid-glass rounded-full py-2.5 px-4 sm:px-6 transition-all duration-300 pointer-events-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <img
            src="/favicon.ico"
            alt="Nexubotics"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-500 transition-colors font-display">
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
          className="md:hidden h-10 w-10 shrink-0 rounded-full border border-slate-200/50 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
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
        <div
          className="md:hidden fixed inset-0 z-40 pointer-events-auto"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 76px)" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="relative mx-4 mt-3 bg-white/95 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-2xl transition-all duration-300 max-h-[calc(100vh-110px)] overflow-y-auto"
            style={{ marginBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
          >
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

              <Link to="/book" className="w-full" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-11 bg-primary text-white font-bold rounded-xl text-sm border-none cursor-pointer flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}