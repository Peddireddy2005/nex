import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Booking from "./pages/Booking";
import Careers from "./pages/Careers";
import ServiceDetail from "./pages/ServiceDetail";
import Work from "./pages/Work";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Apply from "./pages/Apply";
import SmoothScroll from "./components/SmoothScroll";
import StickyCTA from "./components/StickyCTA";
import ScrollToTop from "./components/ScrollToTop";
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
          {/* Preview/unlisted Work & Case Studies routes — not linked from the
              Navbar and marked noindex until this page is approved for launch. */}
          <Route path="/work-preview" element={<Work />} />
          <Route path="/work-preview/:slug" element={<CaseStudyDetail />} />
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
      <SpinToWinModal />
    </Router>
  );
}
