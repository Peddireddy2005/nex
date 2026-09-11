import { BeforeAfterRow } from "@/data/caseStudies";
import { X, Check } from "lucide-react";

export default function BeforeAfter({ rows }: { rows?: BeforeAfterRow[] }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10">
      <h3 className="text-lg font-bold text-slate-900 font-display mb-6">Before → After</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-rose-200/70 bg-rose-50/50 p-5 space-y-3">
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider font-display">
            Before
          </span>
          <ul className="space-y-2.5">
            {rows.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <span className="font-semibold">{r.label}:</span> {r.before}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/50 p-5 space-y-3">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider font-display">
            After
          </span>
          <ul className="space-y-2.5">
            {rows.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <span className="font-semibold">{r.label}:</span> {r.after}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
