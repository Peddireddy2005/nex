import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MessageSquare, Zap, Users, Cpu, BrainCircuit, ArrowRight, Target, Check } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

const SERVICES = [
  {
    id: "chatbots",
    icon: <MessageSquare className="group-hover-wiggle" />,
    title: "AI Chatbots",
    problem: "Customers waiting hours for email support replies.",
    solution: "Create custom chatbots trained on your website URL or help docs, then embed them on your site with a single line of code.",
    benefits: ["Trained on website URLs", "Embed code copies in seconds", "Answers customers 24/7"],
    gradient: "from-orange-500/20 via-orange-500/5 to-transparent"
  },
  {
    id: "lead-generation",
    icon: <Users className="group-hover-pulse-gentle" />,
    title: "Lead Systems",
    problem: "Clunky contact forms that don't capture the right details or qualify prospects.",
    solution: "Build custom, high-converting forms that you can easily put on your website to capture and sync leads.",
    benefits: ["Easily embed forms on any site", "Custom forms built in minutes", "Syncs directly to your CRM"],
    gradient: "from-blue-600/20 via-blue-600/5 to-transparent"
  },
  {
    id: "workflows",
    icon: <Zap className="group-hover-float" />,
    title: "Automated Workflows",
    problem: "Constantly copying and pasting details between different apps manually.",
    solution: "Connect your custom lead capture forms to automatically send notification emails or add rows to Google Sheets.",
    benefits: ["No-code trigger & action", "Google Sheets integration", "Toggle active state instantly"],
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent"
  },
  {
    id: "voice-agents",
    icon: <Cpu className="group-hover-spin-slow" />,
    title: "Voice AI SDRs",
    problem: "High cost of hiring teams to make outbound qualification calls.",
    solution: "Deploy voice assistants with custom scripts and phone numbers to call prospects back and qualify them in real time.",
    benefits: ["WebRTC dashboard calling", "Select voice alloy/shimmer/echo", "Call transcripts typed automatically"],
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent"
  },
  {
    id: "custom",
    icon: <BrainCircuit className="group-hover-pulse-gentle" />,
    title: "Custom AI Systems",
    problem: "Out-of-the-box software plugins failing to connect to your proprietary database and custom business rules.",
    solution: "Deploy private database nodes and custom AI architectures customized specifically for your secure APIs.",
    benefits: ["Private data deployments", "Proprietary RAG architecture", "Scoped specifically for you"],
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent"
  }
];

interface ServiceCardProps {
  key?: string;
  service: typeof SERVICES[number];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative glass-card glass-card-hover rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[380px] group overflow-hidden text-left"
    >
      {/* Dynamic gradient background at the bottom matching the reference layout in white theme */}
      <div className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t ${service.gradient} opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none`} />

      <div>
        {/* Top Left Icon Pill */}
        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-8 shadow-md shadow-slate-900/10 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-5 [&>svg]:h-5">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mb-4">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-8 font-normal">
          {service.solution}
        </p>
      </div>

      {/* Action link with right arrow */}
      <div className="relative z-10 self-start">
        <Link 
          to={service.id === "custom" ? "/book" : `/services/${service.id}`}
          className="text-slate-900 hover:text-primary font-bold text-sm flex items-center gap-1.5 transition-colors"
        >
          <span>{service.id === "custom" ? "Book Integration Scope" : "Explore Module Details"}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  useSEO({
    title: "Nexubotics - Our AI Automation Services & Solutions",
    description: "Explore our AI chatbots, lead routing automation, automated workflows, and custom voice AI SDR systems to scale your business operations.",
    keywords: "AI automation services, lead routing automation, AI phone SDR, automated workflows, custom chatbots"
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid overflow-x-hidden">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-slate-900 font-display leading-[1.05]">
            Engineered modules <br />
            <span className="text-brand-gradient">to automate everything.</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Eliminate operational friction. Deploy dedicated agents built specifically for enterprise software layers.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom Features Row matching reference style */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto border-t border-slate-200/50 pt-10 flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-500 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary shrink-0" /> Always Current
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary shrink-0" /> Focused for You
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary shrink-0" /> Actionable Steps
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
