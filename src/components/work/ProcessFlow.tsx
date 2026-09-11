import { ProcessStep } from "@/data/caseStudies";
import { Workflow } from "lucide-react";

export default function ProcessFlow({ steps }: { steps?: ProcessStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10">
      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-display mb-6">
        <Workflow className="w-4 h-4" /> Process
      </span>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-5 bg-slate-50 border border-slate-200/70 rounded-2xl text-center flex flex-col items-center gap-2"
          >
            <span className="w-7 h-7 rounded-full bg-white border border-slate-200/70 flex items-center justify-center text-[10px] font-bold text-slate-900 font-display">
              {i + 1}
            </span>
            <h4 className="text-xs font-bold text-slate-800 font-display">{step.title}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
