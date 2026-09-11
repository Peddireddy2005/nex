import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useSEO from "../hooks/useSEO";
import { CATEGORIES, caseStudies } from "@/data/caseStudies";
import ServiceFilter from "@/components/work/ServiceFilter";
import CaseStudyCard from "@/components/work/CaseStudyCard";
import CTASection from "@/components/work/CTASection";

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useSEO({
    title: "Nexubotics - Work & Case Studies",
    description:
      "Systems built to solve real business problems — AI agents, automation, websites, and custom software from Nexubotics.",
    keywords: "Nexubotics work, Nexubotics case studies, AI automation portfolio",
    // Preview route: keep this out of search results until the page is approved for launch.
    noindex: true,
  });

  const featured = caseStudies.find((p) => p.status === "client");
  const rest = caseStudies.filter((p) => p !== featured);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return rest;
    return rest.filter((p) => p.category.includes(activeCategory));
  }, [activeCategory, rest]);

  const showFeatured = activeCategory === "All" || featured?.category.includes(activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans bg-grid overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-14 px-6">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-display">
            Our Work
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 font-display leading-[1.05]">
            Things we've built.
            <br />
            Systems designed to solve <span className="text-primary">real business problems.</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Nexubotics builds AI agents, automation, websites, and custom software — from client
            work already live today to demos and concepts that show what's possible next.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12 px-6 relative z-10">
        <ServiceFilter categories={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
      </section>

      {/* Grid */}
      <section className="pb-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {showFeatured && featured && <CaseStudyCard project={featured} index={0} featured />}
          {filtered.map((project, i) => (
            <CaseStudyCard project={project} index={i + 1} key={project.slug} />
          ))}
        </div>

        {!showFeatured && filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-16">
            No projects in this category yet — check back soon.
          </p>
        )}
      </section>

      {/* Trust strip */}
      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto border-t border-slate-200/50 pt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
          <span>Client Project — verified, real work</span>
          <span>Nexubotics Demo — illustrative capability demo</span>
          <span>Nexubotics Concept — visual prototype, not deployed</span>
        </div>
      </section>

      <CTASection
        heading="Have a problem worth solving?"
        subtext="Tell us what's slowing your business down — we'll design and build the system that fixes it."
        ctaLabel="Let's Build the System"
        to="/book"
      />

      <Footer />
    </div>
  );
}
