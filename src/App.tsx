import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
// PRD public additions
import Booking from "./pages/Booking";
import Careers from "./pages/Careers";
import ServiceDetail from "./pages/ServiceDetail";
import Apply from "./pages/Apply";
// Visual & Conversion widgets
import SmoothScroll from "./components/SmoothScroll";
import StickyCTA from "./components/StickyCTA";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";
import SpinToWinModal from "./components/SpinToWinModal";

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <StickyCTA />
      </SmoothScroll>
      <Toaster />
      <ChatWidget />
      {/* Mounted once at the app root so it does NOT reset/reload every
          time you navigate back to the Home page. */}
      <SpinToWinModal />
    </Router>
  );
}