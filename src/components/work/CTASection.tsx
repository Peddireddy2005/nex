import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection({
  heading,
  subtext,
  ctaLabel = "Start a Project",
  to = "/book",
}: {
  heading: string;
  subtext?: string;
  ctaLabel?: string;
  to?: string;
}) {
  return (
    <section className="pb-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white border border-slate-800 rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
          <h4 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight">
            {heading}
          </h4>
          {subtext && (
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              {subtext}
            </p>
          )}
          <Link to={to} className="inline-block pt-2">
            <Button className="h-12 px-8 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl border-none cursor-pointer shadow-lg shadow-black/10 hover:scale-102 transition-all duration-300 flex items-center gap-2">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
