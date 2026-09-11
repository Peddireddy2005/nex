import { Link, useParams } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";
import { getCaseStudy } from "@/data/caseStudies";
import StatusBadge from "@/components/work/StatusBadge";
import VisualFrame from "@/components/work/VisualFrame";
import MetricStrip from "@/components/work/MetricStrip";
import { ProblemSection, SolutionSection } from "@/components/work/ProblemSolution";
import SystemArchitecture from "@/components/work/SystemArchitecture";
import ProcessFlow from "@/components/work/ProcessFlow";
import BeforeAfter from "@/components/work/BeforeAfter";
import TechStack from "@/components/work/TechStack";
import Testimonial from "@/components/work/Testimonial";
import CTASection from "@/components/work/CTASection";
import { Button } from "@/components/ui/button";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getCaseStudy(slug) : undefined;

  useSEO({
    title: project ? `Nexubotics - ${project.title}` : "Nexubotics - Case Study",
    description: project?.summary ?? "A Nexubotics case study.",
    keywords: project ? `${project.client}, ${project.tags.join(", ")}` : "Nexubotics case study",
    noindex: true,
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <HelpCircle className="w-12 h-12 text-primary animate-bounce" />
          <h2 className="text-2xl font-bold font-display text-slate-900">Case Study Not Found</h2>
          <Link to="/work-preview">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs border-none cursor-pointer">
              Back to Work
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-10 px-6">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          <Link
            to="/work-preview"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="text-xs font-semibold text-slate-400">{project.client}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.08] max-w-3xl">
            {project.title}
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero visual */}
      <section className="pb-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <VisualFrame
            screenshots={project.screenshots}
            label={project.visualLabel}
            aspect="aspect-[16/8]"
          />
        </div>
      </section>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <section className="pb-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10">
            <MetricStrip metrics={project.metrics} />
          </div>
        </section>
      )}

      {/* Problem + Solution */}
      <section className="pb-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <ProblemSection problem={project.problem} />
          <SolutionSection solution={project.solution} built={project.built} />
        </div>
      </section>

      {/* Architecture */}
      {project.architecture && (
        <section className="pb-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <SystemArchitecture nodes={project.architecture} />
          </div>
        </section>
      )}

      {/* Process */}
      {project.process && (
        <section className="pb-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <ProcessFlow steps={project.process} />
          </div>
        </section>
      )}

      {/* Before / After */}
      {project.beforeAfter && (
        <section className="pb-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <BeforeAfter rows={project.beforeAfter} />
          </div>
        </section>
      )}

      {/* Stack + Services */}
      <section className="pb-12 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <TechStack stack={project.stack} services={project.services} />
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="pb-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Testimonial testimonial={project.testimonial} />
          </div>
        </section>
      )}

      {/* Results */}
      {project.results && (
        <section className="pb-12 px-6 relative z-10">
          <div className="max-w-5xl mx-auto bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10">
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider font-display block mb-3">
              Results / Impact
            </span>
            <p className="text-slate-600 text-sm leading-relaxed">{project.results}</p>
          </div>
        </section>
      )}

      <CTASection
        heading={project.ctaText}
        subtext="Tell us what you're trying to solve — we'll scope the system that solves it."
        ctaLabel="Start a Project"
        to="/book"
      />

      <Footer />
    </div>
  );
}
