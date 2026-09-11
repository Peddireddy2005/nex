import { ArchitectureNode } from "@/data/caseStudies";
import { ArrowRight, ArrowDown, Boxes } from "lucide-react";

export default function SystemArchitecture({ nodes }: { nodes?: ArchitectureNode[] }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10">
      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-display mb-6">
        <Boxes className="w-4 h-4" /> How the System Works
      </span>

      <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
        {nodes.map((node, i) => (
          <div key={i} className="flex-1 flex flex-col md:flex-row items-center gap-3 md:gap-2">
            <div className="w-full bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col gap-1.5 text-center md:text-left">
              <span className="w-6 h-6 rounded-full bg-white border border-slate-200/70 text-[10px] font-bold text-slate-900 flex items-center justify-center font-display mx-auto md:mx-0">
                {i + 1}
              </span>
              <h4 className="text-sm font-bold text-slate-900 font-display">{node.label}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{node.description}</p>
            </div>
            {i < nodes.length - 1 && (
              <>
                <ArrowDown className="w-4 h-4 text-slate-300 shrink-0 md:hidden" />
                <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden md:block" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
