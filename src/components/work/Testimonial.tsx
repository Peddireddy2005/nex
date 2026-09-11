import { Testimonial as TestimonialType } from "@/data/caseStudies";
import { Quote } from "lucide-react";

export default function Testimonial({ testimonial }: { testimonial: TestimonialType | null }) {
  if (!testimonial) return null;

  return (
    <div className="bg-white border border-slate-200/70 rounded-3xl p-8 md:p-10 relative overflow-hidden">
      <Quote className="w-8 h-8 text-primary/20 mb-4" />
      <p className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed font-display">
        "{testimonial.quote}"
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-display">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{testimonial.author}</p>
          {testimonial.role && <p className="text-xs text-slate-500">{testimonial.role}</p>}
        </div>
      </div>
    </div>
  );
}
