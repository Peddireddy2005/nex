import { ShieldAlert, CheckCircle2 } from "lucide-react";

export function ProblemSection({ problem }: { problem: string }) {
  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10 space-y-4">
      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5 font-display">
        <ShieldAlert className="w-4 h-4" /> The Problem
      </span>
      <p className="text-slate-600 text-sm md:text-base leading-relaxed">{problem}</p>
    </div>
  );
}

export function SolutionSection({
  solution,
  built,
}: {
  solution: string;
  built: string[];
}) {
  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10 space-y-6">
      <div className="space-y-4">
        <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 font-display">
          <CheckCircle2 className="w-4 h-4" /> What We Built
        </span>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">{solution}</p>
      </div>
      {built.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-3">
          {built.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-slate-700 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
