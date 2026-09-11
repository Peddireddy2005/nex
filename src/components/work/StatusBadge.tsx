import { ProjectStatus, STATUS_LABEL } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

const STYLES: Record<ProjectStatus, string> = {
  client: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  internal: "bg-blue-50 text-primary border-blue-200/80",
  demo: "bg-slate-100 text-slate-600 border-slate-200/80",
  concept: "bg-amber-50 text-amber-700 border-amber-200/80",
};

export default function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest font-display",
        STYLES[status],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "client" && "bg-emerald-500",
          status === "internal" && "bg-primary",
          status === "demo" && "bg-slate-400",
          status === "concept" && "bg-amber-500"
        )}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
