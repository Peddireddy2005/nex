import { Metric } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

export default function MetricStrip({ metrics }: { metrics: Metric[] }) {
  if (!metrics.length) return null;

  const hasNonReal = metrics.some((m) => m.type !== "real");

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "grid gap-4 sm:gap-6",
          metrics.length === 2 && "grid-cols-2",
          metrics.length === 3 && "grid-cols-3",
          metrics.length >= 4 && "grid-cols-2 sm:grid-cols-4"
        )}
      >
        {metrics.map((m, i) => (
          <div key={i} className="text-center sm:text-left">
            <div className="text-2xl md:text-3xl font-bold text-slate-900 font-display tracking-tight">
              {m.value}
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-snug mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>
      {hasNonReal && (
        <p className="text-[10px] text-slate-400 italic">
          Illustrative / demo figures — not measured results from a paying client.
        </p>
      )}
    </div>
  );
}
