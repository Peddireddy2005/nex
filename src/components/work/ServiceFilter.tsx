import { cn } from "@/lib/utils";

export default function ServiceFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider font-display border transition-all duration-200 cursor-pointer",
            active === cat
              ? "bg-slate-900 text-white border-slate-900 shadow-md"
              : "bg-white text-slate-600 border-slate-200/70 hover:border-slate-300 hover:text-slate-900"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
