import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  Code2, 
  Workflow, 
  ClipboardList, 
  Activity,
  GraduationCap,
  Server,
  Brain,
  GitBranch,
  Wallet,
  Award,
  Banknote,
  Calendar,
  Palette,
  Briefcase,
  Zap,
  Gift,
  ThumbsUp
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";

const JOB_OPENINGS = [
  {
    title: "Automation Developer",
    icon: Workflow,
    department: "Engineering",
    location: "Remote (IST)",
    type: "Full-Time",
    description: "Design and implement autonomous agent solutions, design node-based workflow triggers, and write JavaScript/Python scripts to connect custom automation pipes.",
    requirements: [
      "2+ years experience building workflow automations",
      "Proficient in Python, Node.js, and scripting APIs",
      "Experience with visual automation platforms (Zapier, Make)",
      "Strong debugging and systems integration skills"
    ]
  },
  {
    title: "API Integration Developer",
    icon: Code2,
    department: "Engineering",
    location: "Remote (IST)",
    type: "Full-Time",
    description: "Build secure REST and GraphQL API connectors, configure OAuth consent flows, and architect multi-tenant database synchronization scripts.",
    requirements: [
      "Strong experience writing server-side code (Node/Go/Python)",
      "Deep understanding of API authentication patterns (OAuth2, JWT, API Keys)",
      "Knowledge of relational and vector databases",
      "Familiarity with webhook architectures and queue systems"
    ]
  },
  {
    title: "Technical Operations Associate",
    icon: Activity,
    department: "Operations",
    location: "Remote (IST)",
    type: "Full-Time",
    description: "Monitor live workflow telemetry, run quality control testing, and manage direct system integration issues for core enterprise partners.",
    requirements: [
      "Strong analytical mindset and troubleshooting capability",
      "Experience with database management or basic programming concepts",
      "Excellent client-facing technical communication",
      "Familiarity with logging and monitoring tools"
    ]
  },
  {
    title: "Task Manager",
    icon: ClipboardList,
    department: "Operations",
    location: "Remote (IST)",
    type: "Full-Time",
    description: "Manage sprint velocity, coordinate tasks between automation builders and clients, and enforce meticulous technical documentation guidelines.",
    requirements: [
      "Proven project management or task coordination experience in tech",
      "Excellent time management and structural organization skills",
      "Ability to write crystal-clear functional requirements",
      "Comfortable working in fast-paced startup environments"
    ]
  }
];

const INTERNSHIP_TYPES = [
  {
    title: "Automation Developer Intern",
    icon: Workflow,
    duration: "3 Months",
    requirements: [
      { icon: GraduationCap, text: "Pursuing or completed a B.Tech / technical degree (3rd year, final year, or graduate)." },
      { icon: Zap, text: "Hands-on experience with automation tools, APIs, workflows, or integrations." },
      { 
        icon: null,
        techStack: [
          { name: "Make", bg: "bg-purple-50 text-purple-700 border-purple-200/50" },
          { name: "Zapier", bg: "bg-orange-50 text-orange-700 border-orange-200/50" },
          { name: "n8n", bg: "bg-red-50 text-red-700 border-red-200/50" },
          { name: "OpenAI", bg: "bg-emerald-50 text-emerald-700 border-emerald-200/50" },
          { name: "Python", bg: "bg-blue-50 text-blue-700 border-blue-200/50" },
          { name: "JS", bg: "bg-yellow-50 text-yellow-800 border-yellow-200/50" }
        ]
      },
      { icon: Brain, text: "Understanding of AI automation workflows, AI agents, or prompt engineering (plus)." },
      { icon: GitBranch, text: "Basic knowledge of scripting, triggers, and connecting custom APIs." }
    ],
    details: [
      { icon: Wallet, text: "Type: Commission-Based Internship" },
      { icon: Award, text: "Performance-based Pre-Placement Offer (PPO) opportunity" },
      { icon: Banknote, text: "Expected Full-Time Package post-internship: ₹4 LPA – ₹8 LPA" }
    ]
  },
  {
    title: "Backend Developer Intern",
    icon: Code2,
    duration: "3 Months",
    requirements: [
      { icon: GraduationCap, text: "Pursuing or completed a degree in CS, IT, or related technical field." },
      { icon: Server, text: "Good understanding of backend concepts, APIs, and server-side architecture." },
      { 
        icon: null,
        techStack: [
          { name: "Node.js", bg: "bg-[#153a1a]/10 text-[#237035] border-[#237035]/20" },
          { name: "Python", bg: "bg-[#1d4ed8]/10 text-[#1d4ed8] border-[#1d4ed8]/20" },
          { name: "MongoDB", bg: "bg-[#115e59]/10 text-[#115e59] border-[#115e59]/20" },
          { name: "Express", bg: "bg-[#9d174d]/10 text-[#9d174d] border-[#9d174d]/20" },
          { name: "SQL", bg: "bg-[#075985]/10 text-[#075985] border-[#075985]/20" }
        ]
      },
      { icon: Brain, text: "Basic understanding of AI-integrated backend systems or LLM APIs (plus)." },
      { icon: GitBranch, text: "Familiarity with Git/GitHub and collaborative development practices." }
    ],
    details: [
      { icon: Wallet, text: "Initial Training Period (Unpaid)." },
      { icon: ThumbsUp, text: "High-Performing candidates can receive PPO." },
      { icon: Banknote, text: "Full-Time Compensation (post-internship) per industry standards." }
    ]
  },
  {
    title: "Technical Operations Associate Intern",
    icon: Activity,
    duration: "Flexible",
    requirements: [
      { icon: GraduationCap, text: "Pursuing or completed a technical or operations-focused degree." },
      { icon: Activity, text: "Strong logical thinking, analytical mindset, and problem-solving abilities." },
      { 
        icon: null,
        techStack: [
          { name: "AI Tools", bg: "bg-emerald-50 text-emerald-700 border-emerald-200/50" },
          { name: "Workflows", bg: "bg-blue-50 text-blue-700 border-blue-200/50" },
          { name: "APIs", bg: "bg-indigo-50 text-indigo-700 border-indigo-200/50" },
          { name: "Excel/Sheets", bg: "bg-green-50 text-green-700 border-green-200/50" },
          { name: "LLMs", bg: "bg-purple-50 text-purple-700 border-purple-200/50" }
        ]
      },
      { icon: Briefcase, text: "Good understanding of business operations, automation flows, and technology connections." },
      { icon: Brain, text: "Basic understanding of AI productivity tools, workflow automation, or LLMs is preferred." }
    ],
    details: [
      { icon: Wallet, text: "Internship duration and compensation discussed during interview process" },
      { icon: Award, text: "High-growth role with long-term opportunities based on performance" },
      { icon: Gift, text: "Direct mentorship on live real-world workflow automation maps" }
    ]
  },
  {
    title: "Graphic Designer Intern",
    icon: Palette,
    duration: "2 Months",
    requirements: [
      { icon: GraduationCap, text: "Pursuing or completed a degree in design, fine arts, or related field." },
      { icon: Palette, text: "Ability to create high-quality social media graphics, posters, and visual creatives." },
      { 
        icon: null,
        techStack: [
          { name: "Photoshop", bg: "bg-blue-50 text-blue-700 border-blue-200/50" },
          { name: "Illustrator", bg: "bg-orange-50 text-orange-700 border-orange-200/50" },
          { name: "Figma", bg: "bg-red-50 text-red-700 border-red-200/50" },
          { name: "Canva", bg: "bg-cyan-50 text-cyan-700 border-cyan-200/50" },
          { name: "Midjourney", bg: "bg-slate-100 text-slate-700 border-slate-300" }
        ]
      },
      { icon: Briefcase, text: "Good understanding of layout, typography, color combinations, and branding." },
      { icon: Clock, text: "Strong creativity, consistency, and ability to meet deadlines." }
    ],
    details: [
      { icon: Wallet, text: "Type: Commission-Based Internship" },
      { icon: Clock, text: "Flexible Workload: Approximately 8–9 hours per week" },
      { icon: Award, text: "Performance-based Pre-Placement Offer (PPO) opportunity" },
      { icon: Banknote, text: "Expected Full-Time Package post-internship: ₹3 LPA – ₹5 LPA" }
    ]
  }
];


export default function Careers() {
  useSEO({
    title: "Nexubotics Careers - Join Our Team & Build the Future of AI",
    description: "Explore open job roles at Nexubotics including Automation Developer, API Integration Developer, and internships. Join us in building autonomous AI operations.",
    keywords: "nexubotics jobs, automation developer careers, API developer openings, tech internships, remote developer jobs India",
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[130px] rounded-full pointer-events-none" />

      <Navbar />

      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1] max-w-3xl mx-auto">
            Build the future of <br />
            <span className="text-brand-gradient">autonomous systems.</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal">
            At Nexubotics, we build high-performance workflow systems that eliminate manual overhead. Explore open roles and internships below.
          </p>
        </div>
      </section>

      {/* Job Openings List */}
      <section className="pb-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-left mb-12">

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display mt-2">Active Openings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {JOB_OPENINGS.map((job, idx) => {
              const Icon = job.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between hover:border-primary/45 transition-colors duration-300 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-display">{job.title}</h3>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono mt-1">
                          {job.department}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    <div className="flex gap-4 text-[10px] text-slate-500 font-mono font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {job.type}</span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      {job.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Requirements:</p>
                      <ul className="space-y-1 text-slate-600 text-[11px]">
                        {job.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-primary text-[10px] font-bold">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to={`/apply?job=${encodeURIComponent(job.title)}`} className="w-full block">
                      <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs py-2.5 border-none flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                        Apply for Role <ArrowUpRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internship Opportunities */}
      <section className="py-16 px-6 bg-slate-50/40 border-y border-slate-200/50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-left mb-12">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display mt-2">Internship Opportunities</h2>
              <p className="text-slate-500 text-xs mt-2 max-w-lg leading-relaxed">
                Kickstart your career in automation. We hire passionate interns who are eager to build, experiment, and learn how to operate modern AI architectures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-left">
            {INTERNSHIP_TYPES.map((intern, idx) => {
              const TopIcon = intern.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-[24px] p-6 md:p-8 border border-slate-200/60 shadow-md shadow-slate-100/50 flex flex-col gap-6"
                >
                  {/* Card Top: Title, Duration Badge, Circular Icon */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
                        {intern.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        {intern.duration.toUpperCase()}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-blue-200/40 bg-blue-50/20 flex items-center justify-center text-blue-600 shrink-0">
                      <TopIcon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Body: Left Column (Requirements) & Right Column (Opportunity Details) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Column (Key Requirements) */}
                    <div className="lg:col-span-7 space-y-4">
                      <h4 className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest">
                        KEY REQUIREMENTS
                      </h4>
                      <div className="space-y-3.5 text-xs text-slate-650 font-medium">
                        {intern.requirements.map((req, rIdx) => {
                          if (req.techStack) {
                            return (
                              <div key={rIdx} className="flex flex-wrap items-center gap-2 pl-7 pt-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">
                                  Tech Stack
                                </span>
                                {req.techStack.map((tech, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${tech.bg}`}
                                  >
                                    {tech.name}
                                  </span>
                                ))}
                              </div>
                            );
                          }
                          const ReqIcon = req.icon;
                          return (
                            <div key={rIdx} className="flex items-start gap-3">
                              <div className="w-4.5 h-4.5 flex items-center justify-center text-slate-400 mt-0.5 shrink-0">
                                <ReqIcon className="w-4 h-4" />
                              </div>
                              <span className="leading-relaxed">{req.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vertical Divider Line (Desktop only) */}
                    <div className="hidden lg:block w-px bg-slate-200/60 shrink-0" />

                    {/* Right Column (Internship Opportunity Box) */}
                    <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/60 rounded-2xl p-5 md:p-6 flex flex-col justify-center">
                      <h4 className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
                        INTERNSHIP OPPORTUNITY
                      </h4>
                      <div className="space-y-4 text-xs text-slate-650 font-medium">
                        {intern.details.map((detail, dIdx) => {
                          const DetailIcon = detail.icon;
                          const isGreen = detail.text.includes("PPO") || detail.text.includes("Full-Time") || detail.text.includes("Package") || detail.text.includes("Compensation");
                          return (
                            <div key={dIdx} className="flex items-start gap-3">
                              <div className={`w-5 h-5 flex items-center justify-center mt-0.5 shrink-0 ${isGreen ? "text-emerald-600" : "text-slate-400"}`}>
                                <DetailIcon className="w-4.5 h-4.5" />
                              </div>
                              <span className={`leading-relaxed ${isGreen ? "text-emerald-700 font-bold" : ""}`}>
                                {detail.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-2">
                    <Link to={`/apply?job=${encodeURIComponent(intern.title)}`} className="w-full block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs py-3.5 border-none flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                        Apply for Internship <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking strategy call CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-16 text-center relative overflow-hidden backdrop-blur-lg border border-slate-200/50">
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-3 font-display">Not looking for a role but want to scale operations?</h3>
          <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed mb-6 font-normal">Schedule a brief strategy call with our engineering team to plan your AI automated pipeline.</p>
          <Link to="/book">
            <Button size="lg" className="h-11 px-8 bg-primary hover:bg-primary/95 text-white font-bold rounded-full text-xs shadow-md border-none cursor-pointer">
              Book Call
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
