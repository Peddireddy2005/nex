import { LayoutDashboard, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders real screenshots when a project has them in `screenshots`.
 * Otherwise renders a clean, honestly-labeled placeholder frame instead
 * of a fabricated or stock image — per project guidance, we never
 * pretend a placeholder is a real product screenshot.
 */
export default function VisualFrame({
  screenshots,
  label,
  className,
  aspect = "aspect-[16/10]",
}: {
  screenshots: string[];
  label: string;
  className?: string;
  aspect?: string;
}) {
  const hasReal = screenshots.length > 0;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden border border-slate-200/70 bg-white shadow-sm",
        className
      )}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-slate-200/70 bg-slate-50">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="ml-3 text-[10px] text-slate-400 font-mono truncate">{label}</span>
      </div>

      {hasReal ? (
        <img
          src={screenshots[0]}
          alt={label}
          className={cn("w-full object-cover object-top", aspect)}
        />
      ) : (
        <div
          className={cn(
            "w-full flex flex-col items-center justify-center gap-2 bg-grid bg-slate-50/60",
            aspect
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/70 shadow-sm flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-slate-300" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display flex items-center gap-1.5">
            <ImageOff className="w-3 h-3" /> Visual pending
          </span>
        </div>
      )}
    </div>
  );
}
