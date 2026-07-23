import React, { useEffect, useState, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  ChevronRight,
  MessageSquare,
  Zap,
  GitBranch,
  CheckCircle2,
  Sliders,
  Shield,
  Activity,
  ArrowUpRight,
  Search,
  Sparkles,
  RefreshCw,
  Terminal as TermIcon,
  Send,
  Database,
  Mail,
  User,
  Briefcase,
  MapPin,
  Clock,
  Phone,
  Settings,
  Bot,
  Tag,
  HeartHandshake
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

const INDUSTRIES_DATA = [
  {
    id: "saas",
    name: "SaaS & Software",
    metric: "Customer Support Resolution",
    desc: "AI support assistants train directly on API references and documentation to resolve tickets automatically.",
    stat: "Integration Target",
    value: "Unified Helpdesk Suite",
    action: "Active Support Webhooks"
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    metric: "Shopping Cart Recovery",
    desc: "Deploy automated recovery follow-ups and email notifications based on real-time database checkout checks.",
    stat: "Integration State",
    value: "E-Commerce Engine Sync",
    action: "Direct Store Integrations"
  },
  {
    id: "enterprise",
    name: "Enterprise Operations",
    metric: "Enterprise Database Sync",
    desc: "Link database schemas and sync records across multiple clouds and databases automatically.",
    stat: "Database Target",
    value: "Cloud Databases & CRMs",
    action: "Cross-App Operations"
  }
];

const CAREERS_PREVIEW = [
  {
    title: "Automation Developer",
    location: "Remote (IST)",
    type: "Full-Time",
    description: "Design and implement autonomous agent solutions, design node-based workflow triggers, and write JavaScript/Python scripts.",
    department: "Engineering"
  },
  {
    title: "API Integration Developer",
    location: "Remote (IST)",
    type: "Full-Time",
    description: "Build secure REST and GraphQL API connectors, configure OAuth consent flows, and architect multi-tenant database systems.",
    department: "Engineering"
  }
];

function NeuralBackground() {
  return null;
}

// ------------------------------------------------------------------
// Quick action buttons shown on the "chat with our AI assistant" promo
// card. Every action just opens the real live chat widget (see
// ChatWidget.tsx) instead of faking a scripted conversation.
// ------------------------------------------------------------------
const QUICK_ACTIONS = [
  { icon: Phone, label: "Book a Call", topic: "book" },
  { icon: MessageSquare, label: "AI Chatbots", topic: "chatbots" },
  { icon: Settings, label: "AI Automation", topic: "automation" },
  { icon: Bot, label: "AI Agents", topic: "agents" },
  { icon: Tag, label: "Pricing", topic: "pricing" },
  { icon: HeartHandshake, label: "Human Assistance", topic: "human" }
] as const;

export default function Home() {
  useSEO({
    title: "Nexubotics - Smarter Workflows. Faster Growth. Powered by AI.",
    description: "Orchestrate autonomous AI systems that automate workflows, scale operations, and handle customer support 24/7.",
    keywords: "autonomous AI systems, workflow automation, AI chatbots, operations automation, Nexubotics, business scaling"
  });

  const [activeIndustry, setActiveIndustry] = useState("saas");
  const [leadForm, setLeadForm] = useState({
    name: "Rahul Sharma",
    email: "rahul@acmecorp.in",
    company: "Acme Corp India"
  });
  const [activeWorkflowNode, setActiveWorkflowNode] = useState<number | null>(null);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);

  const runWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRunningWorkflow) return;

    setIsRunningWorkflow(true);
    setActiveWorkflowNode(0);

    setTimeout(() => { setActiveWorkflowNode(1); }, 1500);
    setTimeout(() => { setActiveWorkflowNode(2); }, 3200);
    setTimeout(() => { setActiveWorkflowNode(3); }, 5000);
    setTimeout(() => {
      setActiveWorkflowNode(4);
      setIsRunningWorkflow(false);
    }, 6800);
  };

  // Opens the REAL live chatbot (the widget floating bottom-right on every
  // page).
  const openLiveChat = () => {
    window.dispatchEvent(new CustomEvent("nexubotics:open-chat"));
  };

  const FEATURES_DATA = [
    {
      title: "ChatbotBuilder",
      desc: "Create helpful chatbots that learn from your website or files to answer customer questions automatically.",
      icon: <MessageSquare className="w-5 h-5 text-slate-900 group-hover-wiggle" />
    },
    {
      title: "Voice Agents",
      desc: "Create voice assistants that talk like real people to welcome new users, book meetings, and qualify phone leads.",
      icon: <Cpu className="w-5 h-5 text-slate-900 group-hover-spin-slow" />
    },
    {
      title: "Workflows",
      desc: "Connect your favorite apps to automatically share information and trigger actions across systems.",
      icon: <GitBranch className="w-5 h-5 text-slate-900 group-hover-float" />
    },
    {
      title: "Lead Capture",
      desc: "Build contact forms that instantly look up business details and send promising prospects directly to your sales team.",
      icon: <Sliders className="w-5 h-5 text-slate-900 group-hover-pulse-gentle" />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans relative">

      <NeuralBackground />

      <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/3 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[20%] right-1/4 w-150 h-150 bg-indigo-500/2 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] left-1/3 w-175 h-175 bg-purple-500/2 blur-[160px] pointer-events-none rounded-full" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-28 px-6 overflow-hidden border-b border-slate-200/50 bg-slate-50/50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-100">
          <video
            src="/HeroBackground.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-white/10 via-white/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-background)_95%)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 font-display leading-[1.1]"
          >
            Smarter workflows. <br />
            Faster growth. <br />
            Powered by <span className="text-primary">AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal"
          >
            Orchestrate autonomous systems that run operations, route databases, and resolve tickets. High-performance enterprise infrastructure engineered for speed, safety, and scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link to="/book">
              <Button size="lg" className="h-11 px-7 bg-primary hover:bg-primary/95 text-white font-bold rounded-full text-xs shadow-md border-none cursor-pointer">
                Book Strategy Call
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="h-11 px-7 border-slate-200 hover:border-slate-300 text-slate-800 font-bold rounded-full text-xs cursor-pointer bg-white hover:bg-slate-50">
                Get Custom AI Plan
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chat With Our AI Assistant Section (static promo card that opens
          the real live chat widget instead of a scripted demo) */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-200/50 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-display leading-[1.1]">
              Try the Nexubotics <br />
              <span className="text-brand-gradient">AI assistant.</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Experience the speed, style, and intelligence of our chatbot interfaces instantly. Open the live assistant in the bottom-right corner and ask it anything.
            </p>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-100 w-full"
            >
              <div className="rounded-3xl relative overflow-hidden bg-white border border-slate-200/60 shadow-2xl p-8 md:p-10 flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 shrink-0">
                  N
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Chat with our AI assistant
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ask about chatbots, automation, voice agents, or pricing.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                  {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={openLiveChat}
                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{label}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={openLiveChat}
                  className="w-full max-w-sm h-11 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md border-none"
                >
                  <Send className="w-4 h-4" /> Open Live Chat
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-200/50 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-display">
            Automate your business workflows.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {FEATURES_DATA.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="bg-white border border-slate-200/60 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-75 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[url('/dashboard_bg.png')] bg-cover bg-center opacity-0 group-hover:opacity-[0.08] scale-105 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mb-3">{feat.title}</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal max-w-sm">{feat.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end">
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lead Capture & Workflow Section */}
      <section className="py-24 px-6 bg-slate-50/20 border-b border-slate-200/50 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-display">
                Lead Capture & Workflow.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                See what happens when a new lead submits their details. Nexubotics enriches the profile, syncs database rows, triggers email alerts, and alerts your team instantly.
              </p>
            </div>

            <form onSubmit={runWorkflow} className="liquid-glass p-6 rounded-3xl space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Full Name</label>
                <input
                  type="text" required disabled={isRunningWorkflow}
                  value={leadForm.name}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Email Address</label>
                <input
                  type="email" required disabled={isRunningWorkflow}
                  value={leadForm.email}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Company Name</label>
                <input
                  type="text" required disabled={isRunningWorkflow}
                  value={leadForm.company}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                />
              </div>
              <button
                type="submit" disabled={isRunningWorkflow}
                className="w-full bg-slate-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md mt-2 border-none"
              >
                {isRunningWorkflow ? (
                  <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Executing Automations...</>
                ) : (
                  <><Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Run Test Workflow</>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4 relative">
              <div className="absolute left-7.5 top-6 bottom-6 w-0.5 bg-slate-100 -z-10" />
              <div
                className="absolute left-7.5 top-6 w-0.5 bg-primary -z-10 transition-all duration-700"
                style={{ height: activeWorkflowNode === null ? "0%" : activeWorkflowNode === 0 ? "0%" : activeWorkflowNode === 1 ? "30%" : activeWorkflowNode === 2 ? "65%" : "100%" }}
              />

              {/* Step 1 */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${activeWorkflowNode === null ? "bg-white border-slate-200/60 opacity-60" : activeWorkflowNode === 0 ? "bg-primary/5 border-primary shadow-[0_0_12px_rgba(0,102,204,0.15)] scale-[1.02]" : "bg-white border-slate-200/60"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeWorkflowNode !== null && activeWorkflowNode >= 1 ? "bg-emerald-50 border-emerald-200 text-emerald-500" : activeWorkflowNode === 0 ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 1 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <User className="w-5 h-5" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">Trigger</span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">Form Submit</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">Lead Captured</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Inbound submission received.</p>
                  {activeWorkflowNode !== null && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-semibold text-slate-700 font-mono">
                      Name: {leadForm.name} | Co: {leadForm.company}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${activeWorkflowNode === null ? "bg-white border-slate-200/60 opacity-60" : activeWorkflowNode < 1 ? "bg-white border-slate-200/60 opacity-50" : activeWorkflowNode === 1 ? "bg-primary/5 border-primary shadow-[0_0_12px_rgba(0,102,204,0.15)] scale-[1.02]" : "bg-white border-slate-200/60"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeWorkflowNode !== null && activeWorkflowNode >= 2 ? "bg-emerald-50 border-emerald-200 text-emerald-500" : activeWorkflowNode === 1 ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 2 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Database className="w-5 h-5" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">Action</span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">Enterprise CRM</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">Sync CRM Contact</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Create deal profile and update record parameters.</p>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 1 && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-700 flex justify-between font-medium">
                      <span className="font-semibold">Status:</span>
                      <span className="text-emerald-600 font-bold font-mono flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Contact Created</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${activeWorkflowNode === null ? "bg-white border-slate-200/60 opacity-60" : activeWorkflowNode < 2 ? "bg-white border-slate-200/60 opacity-50" : activeWorkflowNode === 2 ? "bg-primary/5 border-primary shadow-[0_0_12px_rgba(0,102,204,0.15)] scale-[1.02]" : "bg-white border-slate-200/60"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeWorkflowNode !== null && activeWorkflowNode >= 3 ? "bg-emerald-50 border-emerald-200 text-emerald-500" : activeWorkflowNode === 2 ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 3 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Mail className="w-5 h-5" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">Action</span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">Email Service API</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">Send Email Notification</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Dispatch instant alert to your team's inbox with lead details.</p>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 2 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-3 p-4 bg-slate-50 border border-slate-200/80 rounded-xl shadow-inner space-y-2 relative">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2 text-[10px] font-semibold text-slate-500">
                        <span>To: you@acmecorp.in</span>
                        <span>From: notifications@nexubotics.com</span>
                      </div>
                      <div className="text-left space-y-1">
                        <span className="text-[10px] font-extrabold text-slate-800 block">Subject: A Lead Filled out your form!</span>
                        <p className="text-[9px] text-slate-600 leading-relaxed font-normal">
                          Hi there,<br />
                          A new lead has just submitted details via your website form:<br />
                          • <strong>Name:</strong> <span className="text-primary font-bold">{leadForm.name}</span><br />
                          • <strong>Email:</strong> {leadForm.email}<br />
                          • <strong>Company:</strong> <span className="text-indigo-500 font-bold">{leadForm.company}</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Step 4 */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${activeWorkflowNode === null ? "bg-white border-slate-200/60 opacity-60" : activeWorkflowNode < 3 ? "bg-white border-slate-200/60 opacity-50" : activeWorkflowNode === 3 ? "bg-primary/5 border-primary shadow-[0_0_12px_rgba(0,102,204,0.15)] scale-[1.02]" : "bg-white border-slate-200/60"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeWorkflowNode !== null && activeWorkflowNode >= 4 ? "bg-emerald-50 border-emerald-200 text-emerald-500" : activeWorkflowNode === 3 ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 4 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Zap className="w-5 h-5" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">Action</span>
                    <span className="text-[10px] font-bold text-slate-500 font-mono">Webhook Alert</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">Post Team Alert</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Alert sales representative team with enrichment scoring.</p>
                  {activeWorkflowNode !== null && activeWorkflowNode >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 uppercase">
                        <span>#leads</span>
                        <span>System bot</span>
                      </div>
                      <p className="text-[10px] text-zinc-200 font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-emerald-400 font-bold">New Lead Captured:</span>
                        <span className="font-bold">{leadForm.name}</span> from <span className="font-semibold text-primary">{leadForm.company}</span>
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 px-6 bg-slate-50/20 border-b border-slate-200/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-display">
              AI <span className="font-serif-italic text-primary font-normal italic">tailored</span> for your industry.
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-2">
              {INDUSTRIES_DATA.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`w-full text-left p-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${activeIndustry === ind.id ? "bg-slate-100 border border-slate-200 shadow-lg text-primary" : "text-slate-500 hover:text-slate-900 hover:bg-white/5"}`}
                >
                  {ind.name}
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 shadow-2xl min-h-60 flex flex-col justify-between relative overflow-hidden backdrop-blur-lg">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none" />
              {(() => {
                const data = INDUSTRIES_DATA.find(i => i.id === activeIndustry)!;
                return (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Metric Focus</span>
                        <span className="text-xl font-bold text-slate-900 tracking-tight font-display">{data.metric}</span>
                      </div>
                      <span className="text-[9px] bg-slate-50 border border-slate-200/50 text-slate-700 px-3 py-1 rounded-full font-bold uppercase font-mono">{data.action}</span>
                    </div>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-xl font-normal text-left">{data.desc}</p>
                    <div className="pt-6 border-t border-slate-200/50 flex gap-12 text-left">
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider font-mono">{data.stat}</span>
                        <span className="text-base font-bold text-slate-800 font-mono">{data.value}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider font-mono">Integration State</span>
                        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-1 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Active
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-200/50 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 text-left">
          <div className="space-y-3">
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-display">
              Join our active <span className="font-serif-italic text-primary font-normal italic">workspace</span>.
            </h3>
          </div>
          <Link to="/careers">
            <Button variant="outline" className="border-slate-200 hover:bg-white/5 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer">
              View All Openings <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {CAREERS_PREVIEW.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="p-6 md:p-8 glass-card glass-card-hover rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest font-mono">{role.department}</span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200/50 px-3 py-1 rounded-full font-mono flex items-center gap-1"><MapPin size={11} /> {role.location}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-display mb-3">{role.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed font-normal mb-4">{role.description}</p>
              </div>
              <div className="pt-6 border-t border-slate-200/50 mt-6 flex justify-between items-center text-xs">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><Clock size={11} /> {role.type}</span>
                <Link to="/careers" className="text-primary font-bold hover:underline flex items-center gap-1">
                  Learn More <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-20 text-center text-slate-900 relative overflow-hidden shadow-2xl backdrop-blur-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none font-display">
              Ready to automate <br /> your operations?
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-md mx-auto font-normal">
              Schedule a custom consultation call to map out integrations for your business.
            </p>
            <div className="flex items-center justify-center pt-4">
              <Link to="/book">
                <button className="h-12 px-8 text-xs font-bold bg-white text-black hover:bg-zinc-200 rounded-full shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer font-sans">
                  Book Strategy Call
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