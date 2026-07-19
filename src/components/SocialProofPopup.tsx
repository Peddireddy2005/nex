import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, MessageSquare, Zap, Cpu } from "lucide-react";

const EVENTS = [
  { text: "Someone in New York booked a Strategy Call", time: "2 mins ago", icon: <ShieldCheck className="w-4 h-4 text-primary" /> },
  { text: "AI Assistant successfully deflected support ticket #284", time: "just now", icon: <MessageSquare className="w-4 h-4 text-emerald-500" /> },
  { text: "Lead sync automation configured for Cyberdyne Inc.", time: "12 mins ago", icon: <Zap className="w-4 h-4 text-amber-500" /> },
  { text: "Enterprise customer completed an onboarding sequence", time: "4 mins ago", icon: <Cpu className="w-4 h-4 text-indigo-500" /> },
  { text: "Voice SDR agent completed outbound lead screening call", time: "8 mins ago", icon: <Cpu className="w-4 h-4 text-primary" /> }
];

export default function SocialProofPopup() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first message after 5 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 6000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % EVENTS.length);
        setVisible(true);
      }, 1000); // 1s transition gap
    }, 20000); // Cycle every 20s

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const event = EVENTS[currentIdx];

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="liquid-glass p-3 px-4 rounded-xl flex items-center gap-3 max-w-sm pointer-events-auto"
          >
            <div className="w-8 h-8 rounded-lg liquid-glass-inner flex items-center justify-center shrink-0">
              {event.icon}
            </div>
            <div className="font-sans">
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                {event.text}
              </p>
              <span className="text-[9px] text-slate-400 font-medium">
                {event.time} // verified
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
