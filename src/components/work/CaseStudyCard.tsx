import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import StatusBadge from "./StatusBadge";
import VisualFrame from "./VisualFrame";

export default function CaseStudyCard({
  project,
  index,
  featured = false,
}: {
  project: CaseStudy;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link
        to={`/work-preview/${project.slug}`}
        className="group block glass-card glass-card-hover rounded-3xl overflow-hidden h-full"
      >
        <div className="p-3 pb-0">
          <VisualFrame
            screenshots={project.screenshots}
            label={project.visualLabel}
            aspect={featured ? "aspect-[16/8]" : "aspect-[16/10]"}
            className="group-hover:border-primary/30 transition-colors duration-300"
          />
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <StatusBadge status={project.status} />
            <span className="text-[11px] font-semibold text-slate-400">{project.client}</span>
          </div>

          <h3 className={`font-bold text-slate-900 font-display tracking-tight leading-snug ${featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
            {project.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed">{project.summary}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-1.5 text-slate-900 group-hover:text-primary font-bold text-sm transition-colors">
            View Case Study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
