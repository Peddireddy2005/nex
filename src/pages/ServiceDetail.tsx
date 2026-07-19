import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MessageSquare, 
  TrendingUp, 
  Volume2, 
  GitBranch, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Zap,
  Activity
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

// Custom service definitions from the PRD
const SERVICES_MAP: Record<string, any> = {
  chatbots: {
    title: "AI Customer Support Chatbots",
    icon: <MessageSquare className="w-8 h-8 text-slate-900" />,
    intro: "Build custom support chatbots trained on your guides and website URLs to answer customer questions automatically.",
    roi: "Faster Response Times",
    metricLabel: "Average Resolution Rate",
    problem: "Support teams are buried under repetitive questions, leading to slow response times and unhappy customers.",
    solution: "Create custom chat widgets trained directly on your website URL or help docs, then embed them on your site to answer questions instantly.",
    steps: [
      { label: "Configure & Train", desc: "Provide your documentation or website URL for the AI to study." },
      { label: "Test & Sandbox", desc: "Chat with your agent in the dashboard to adjust its greeting and guidelines." },
      { label: "Embed Widget", desc: "Copy the secure script snippet and paste it into your website header." }
    ]
  },
  "lead-generation": {
    title: "Custom Lead Capture Forms",
    icon: <TrendingUp className="w-8 h-8 text-slate-900" />,
    intro: "Create custom contact and signup forms that you can easily put on your website to capture, qualify, and sync leads.",
    roi: "Increased Lead Conversion",
    metricLabel: "Active Embedded Forms",
    problem: "Generic contact forms fail to ask the right qualifying questions, leaving your sales team with poor-quality contacts and empty databases.",
    solution: "We build tailored, easy-to-embed forms that pre-screen fields and instantly push clean prospect details directly to your sales pipeline.",
    steps: [
      { label: "Create & Customize", desc: "Build tailored forms with custom input fields, text areas, and branding guidelines." },
      { label: "Embed on Your Site", desc: "Copy and paste our secure, responsive form code onto any page of your website." },
      { label: "Automatic CRM Routing", desc: "Instantly alerts your team and syncs submissions to HubSpot, Salesforce, or Slack." }
    ]
  },
  "voice-agents": {
    title: "Voice AI Phone SDRs",
    icon: <Volume2 className="w-8 h-8 text-slate-900" />,
    intro: "Initialize custom voice receptionists that can qualify phone leads and confirm booking details in real time.",
    roi: "Instant Call Qualification",
    metricLabel: "Average Answer Delay",
    problem: "Sales reps spend hours playing phone tag with new signups, letting hot leads go cold before qualifying them.",
    solution: "Deploy a custom voice assistant with a custom script and vocal profile that talks to prospects instantly to qualify them.",
    steps: [
      { label: "Choose Voice Tone", desc: "Select a vocal profile (alloy, shimmer, or echo) and input custom behavioral rules." },
      { label: "WebRTC Dashboard Call", desc: "Connect to your agent right inside the dashboard web caller to test conversation paths." },
      { label: "Automatic Transcripts", desc: "Schedules meetings and syncs call summaries and transcripts to your database." }
    ]
  },
  workflows: {
    title: "Automated Workflows",
    icon: <GitBranch className="w-8 h-8 text-slate-900" />,
    intro: "Build custom connections that automatically link form submissions and events directly to your notification and spreadsheet tools.",
    roi: "Manual Work Eliminated",
    metricLabel: "Tasks Automated Daily",
    problem: "Important lead details get lost or delayed because team members forget to manually copy form submissions to CRMs or Slack.",
    solution: "Create workflows that instantly trigger actions, like sending email alerts or adding spreadsheet rows, whenever a form is filled out.",
    steps: [
      { label: "Define the Trigger", desc: "Choose which lead form or submission event starts the workflow." },
      { label: "Select the Action", desc: "Decide what happens next—like sending an email alert or updating Google Sheets." },
      { label: "Activate & Monitor", desc: "Turn the workflow on in one click to sync data automatically in the background." }
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? SERVICES_MAP[serviceId] : null;

  const seoTitle = service ? `Nexubotics - ${service.title}` : "Nexubotics - Service Detail";
  const seoDesc = service ? service.intro : "Explore our automated modules built specifically for enterprise software layers.";
  const seoKeywords = service ? `AI ${serviceId}, Nexubotics ${serviceId}, ${service.title}` : "AI automation modules, Nexubotics services";

  useSEO({
    title: seoTitle,
    description: seoDesc,
    keywords: seoKeywords,
  });

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
           <HelpCircle className="w-12 h-12 text-primary animate-bounce" />
           <h2 className="text-2xl font-bold font-display text-slate-900">Service Profile Not Found</h2>
           <Link to="/services">
             <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs border-none cursor-pointer">
                Back to All Services
             </Button>
           </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-20 pb-12 px-6">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 flex flex-col items-center">
           <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Services
           </Link>
           <div className="flex flex-col items-center gap-3 mt-4">
              <div className="p-4 bg-white border border-slate-200/50 rounded-2xl shadow-sm animate-float-infinite w-16 h-16 flex items-center justify-center">
                 {service.icon}
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-display mt-2">Specialized System Module</span>
           </div>
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1] max-w-2xl">
              {service.title}
           </h1>
           <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed font-normal">
              {service.intro}
           </p>
        </div>
      </section>

      {/* Detailed Diagnostics Bento Grid */}
      <section className="pb-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
           
           {/* Problem Card */}
           <div className="bg-white/70 border border-slate-200/50 p-8 rounded-3xl shadow-lg backdrop-blur-md flex flex-col space-y-4">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5 font-display">
                 <ShieldAlert className="w-4 h-4" /> Operational Bottleneck
              </span>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">{service.problem}</p>
           </div>

           {/* Solution Card */}
           <div className="bg-white/70 border border-slate-200/50 p-8 rounded-3xl shadow-lg backdrop-blur-md flex flex-col space-y-4">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-display">
                 <Zap className="w-4 h-4 text-slate-900" /> The Engineered Solution
              </span>
              <p className="text-slate-800 text-sm leading-relaxed font-semibold">{service.solution}</p>
           </div>

           {/* ROI Dashboard Stat Card */}
           <div className="bg-slate-900 border border-slate-800 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-display">Expected ROI Target</span>
                 <h3 className="text-2xl font-extrabold font-display leading-tight text-white my-3">{service.roi}</h3>
                 <p className="text-slate-400 text-xs leading-relaxed font-normal">
                    Designed to connect seamlessly to active database records, generating qualified actions on launch.
                 </p>
              </div>

              <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-[10px] mt-6">
                 <span className="font-semibold text-slate-500">{service.metricLabel}</span>
                 <span className="font-bold text-slate-300 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-slate-400" /> High Performance
                 </span>
              </div>
           </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
           <div className="text-center space-y-3 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 font-display">Automation Delivery Pipeline</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Our structured pipeline propagates active nodes across your distributed database layers.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {service.steps.map((st: any, idx: number) => (
                <div key={idx} className="p-6 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col items-center text-center relative group hover:bg-white hover:shadow-lg transition-all duration-300">
                   {/* Connection line between steps */}
                   {idx < 2 && (
                      <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-slate-200 group-hover:bg-slate-300 transition-colors z-0" />
                   )}
                   
                   <div className="w-8 h-8 rounded-full bg-white border border-slate-200/50 flex items-center justify-center text-[11px] font-bold text-slate-900 shrink-0 font-display shadow-sm mb-4 relative z-10 group-hover:border-slate-400 transition-colors">
                      0{idx + 1}
                   </div>
                   <h4 className="text-sm font-bold text-slate-800 font-display mb-1">{st.label}</h4>
                   <p className="text-slate-500 text-xs leading-relaxed max-w-[240px]">{st.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-24 px-6 relative z-10">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white border border-slate-800 rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            {/* Ambient gradients */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
               <h4 className="text-3xl font-bold text-white font-display tracking-tight">Ready to integrate this system?</h4>
               <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
                  Schedule a technical mapping call with our engineers to scope database configurations, API authorization credentials, and webhook endpoints.
               </p>
               <Link to="/book" className="inline-block pt-2">
                  <Button className="h-12 px-8 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl border-none cursor-pointer shadow-lg shadow-black/10 hover:scale-102 transition-all duration-300">
                     Book Integration Scoping
                  </Button>
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
