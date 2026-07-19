import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
// Home is kept as a static import since it's the most common entry point.
import Home from "./pages/Home";
// Every other route is code-split so mobile users landing on "/" only
// download Home's JS instead of the whole site's JS up front.
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Support = lazy(() => import("./pages/Support"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Booking = lazy(() => import("./pages/Booking"));
const Careers = lazy(() => import("./pages/Careers"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Apply = lazy(() => import("./pages/Apply"));
// Visual & Conversion widgets
import SmoothScroll from "./components/SmoothScroll";
import StickyCTA from "./components/StickyCTA";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";

function RouteFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
        <StickyCTA />
      </SmoothScroll>
      <Toaster />
      <ChatWidget />
    </Router>
  );
}
