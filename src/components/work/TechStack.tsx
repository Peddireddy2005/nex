export default function TechStack({ stack, services }: { stack: string[]; services: string[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 grid sm:grid-cols-2 gap-8">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display block mb-4">
          Technology Used
        </span>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display block mb-4">
          Services Delivered
        </span>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <span
              key={s}
              className="text-xs font-semibold text-white bg-primary/20 border border-primary/30 rounded-full px-3 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
