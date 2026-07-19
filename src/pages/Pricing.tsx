import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, HelpCircle, MessageSquare, Database, GitBranch, Phone, Cpu } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

const SERVICES_PRICING = [
  {
    name: "AI Chatbots",
    icon: MessageSquare,
    startingPrice: "₹10,000",
    advancedPrice: "₹20,000 – ₹50,000",
    priceLabel: "Advanced Range",
    features: [
      "Website chatbot integration",
      "Trained on your content",
      "24/7 autonomous availability",
      "Embeddable on any website"
    ]
  },
  {
    name: "Lead Generation Systems",
    icon: Database,
    startingPrice: "₹15,000",
    advancedPrice: "₹30,000 – ₹70,000",
    priceLabel: "Advanced Range",
    features: [
      "Custom interactive lead forms",
      "Auto email/WhatsApp alerts",
      "Automated lead scoring system",
      "Direct CRM database sync"
    ]
  },
  {
    name: "Workflow Automation",
    icon: GitBranch,
    startingPrice: "₹8,000",
    advancedPrice: "₹20,000 – ₹60,000",
    priceLabel: "Complex Range",
    features: [
      "App integrations enabled",
      "Trigger-based automation",
      "Queue scheduled background tasks",
      "Multi-step operational logic"
    ]
  },
  {
    name: "AI Voice Agents",
    icon: Phone,
    startingPrice: "₹7,000",
    advancedPrice: "₹50,000 – ₹1,00,000+",
    priceLabel: "Advanced Range",
    features: [
      "AI phone receptionist module",
      "Call transcripts & audio logs",
      "24/7 autonomous line coverage",
      "₹3/min usage charge"
    ]
  },
  {
    name: "Custom AI Solutions",
    icon: Cpu,
    startingPrice: "Get a Quote",
    advancedPrice: "Price varies by complexity",
    priceLabel: "Custom Development",
    features: [
      "Fully custom AI microservices",
      "Automated document processing",
      "Industry-specific tailored AI",
      "Built exactly to your specifications"
    ]
  }
];

const PRICING_NOTES = [
  {
    title: "One-Time Setup Fee",
    desc: "High initial build cost, then minimal monthly maintenance to keep custom assets secure."
  },
  {
    title: "Monthly Maintenance",
    desc: "Small recurring fee to keep everything running smoothly with regular updates and telemetry monitoring."
  },
  {
    title: "Usage-Based Charges",
    desc: "Some services like Voice Agents charge ₹3/min of active calling usage on system networks."
  }
];

const FAQS = [
  {
    question: "What is an AI Operating System?",
    answer: "Unlike generic chatbots, an AI operating system orchestrates multi-agent workflows, routes leads, triggers databases, updates CRM systems, and logs telemetry autonomously from a single control plane."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple. Select a service plan, book a strategy call, and our engineering team will align on your specific goals and build your custom automation pipeline."
  },
  {
    question: "Do you offer custom pricing for large agencies?",
    answer: "Absolutely. If you run a high-volume enterprise agency requiring customized vector endpoints, custom models, or tailored SLA agreements, contact us to get a custom quote."
  }
];

export default function Pricing() {
  useSEO({
    title: "Nexubotics Pricing - Transparent & Scale-Ready AI Automation Plans",
    description: "Explore our flexible pricing plans for AI chatbots, lead generation systems, workflow automation, voice agents, and custom AI tools.",
    keywords: "AI automation pricing, AI chatbot cost, workflow automation pricing, voice agent pricing"
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid relative overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-28 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Header Block */}
        <div className="text-center space-y-6 mb-20 relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 font-display leading-[1.05]">
            Transparent Pricing
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Choose the service that fits your operational needs. Book a strategy session to get started.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch mb-24 relative z-10">
          {SERVICES_PRICING.map((service, i) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-[28px] border flex flex-col justify-between group transition-all duration-300 h-full backdrop-blur-md bg-white/80 border-slate-200/50 hover:bg-white/95 hover:border-primary/20 hover:shadow-2xl shadow-sm"
              >
                <div>
                  <div className="mb-6">
                    {/* Service Icon */}
                    <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight font-display mb-3">
                      {service.name}
                    </h3>
                    
                    <div className="space-y-0.5 text-left mt-2">
                      <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
                        {service.startingPrice === "Get a Quote" ? "Custom Pricing" : "Starting From"}
                      </div>
                      <div className="text-2xl font-black text-slate-900 font-display">
                        {service.startingPrice}
                      </div>
                      <div className="text-[10px] text-slate-600 font-bold bg-slate-100/60 border border-slate-200/40 rounded-md px-2 py-0.5 mt-1 inline-block font-mono">
                        {service.priceLabel}: {service.advancedPrice}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-4" />

                  {/* Features List */}
                  <div className="space-y-3 mb-6 text-left">
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[11px] text-slate-600 font-normal leading-normal">
                        <div className="w-4 h-4 bg-emerald-50 border border-emerald-150 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/book" className="w-full mt-auto">
                  <button className="w-full h-10 rounded-xl font-extrabold text-xs transition-all border-none cursor-pointer bg-brand-gradient text-white hover:opacity-95 shadow-md shadow-blue-500/10">
                    Book a Call
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Section 3 — Pricing Notes */}
        <div className="mb-28 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 font-display uppercase tracking-wider">Pricing Notes</h2>
            <p className="text-xs text-slate-500 font-semibold mt-2 uppercase tracking-widest">Key information regarding our billing model</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_NOTES.map((note, i) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-3xl border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
              >
                <h3 className="text-base font-extrabold text-slate-900 font-display mb-3">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {note.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Block */}
        <div className="mb-28 max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 font-display uppercase tracking-wider">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 font-semibold mt-2 uppercase tracking-widest">Find answers to quick questions</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className="p-6 bg-white border border-slate-200/80 rounded-2xl flex items-start gap-4 text-left shadow-sm"
              >
                <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 font-display leading-tight">{faq.question}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Glowing CTA Box */}
        <div className="relative border border-slate-200/50 bg-white/80 rounded-[48px] p-12 sm:p-20 text-center text-slate-900 overflow-hidden shadow-2xl backdrop-blur-lg mb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-8 relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-[10px] shadow-lg shadow-blue-500/20 font-brand">
                N
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] font-display">
              Step into the <br />
              <span className="text-brand-gradient">future of operations</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-normal">
              Join forward-thinking teams orchestrating their processes faster using our high-performing autonomous system.
            </p>
            <div className="flex items-center justify-center pt-2">
              <Link to="/book">
                <button className="h-12 px-8 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer border-none">
                  Book a Call
                </button>
              </Link>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
