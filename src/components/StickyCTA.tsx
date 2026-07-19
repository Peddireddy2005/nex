import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";

export default function StickyCTA() {
  const location = useLocation();
  
  // Hide if they are already on the booking or login/signup/dashboard screens
  const hiddenRoutes = ["/book", "/login", "/signup", "/dashboard", "/onboarding"];
  const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));

  if (isHidden) return null;

  return (
    // Positioned bottom-left on mobile (bottom-right is reserved for the
    // chat bubble there) and bottom-right with extra clearance on larger
    // screens where the chat bubble is smaller relative to the viewport.
    // `env(safe-area-inset-*)` keeps it clear of the home-indicator area
    // on iOS devices with a notch/gesture bar.
    <div
      className="fixed z-40 left-4 right-auto bottom-4 sm:left-auto sm:right-6 sm:bottom-6"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link to="/book">
          <Button className="h-11 sm:h-12 px-5 sm:px-6 bg-primary hover:bg-primary/95 text-slate-950 rounded-full font-bold text-xs shadow-2xl shadow-primary/25 flex items-center gap-2 border-none cursor-pointer uppercase tracking-widest font-sans">
            <Calendar className="w-4 h-4" />
            Book a Call
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
