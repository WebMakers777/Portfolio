import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  X,
  Monitor,
  Layers,
  Database,
  Building2,
  Cpu,
  Smartphone,
  Cloud,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const getIcon = (name: string): React.ComponentType<{ className?: string }> => {
  switch (name) {
    case "Monitor":
      return Monitor;
    case "Layers":
      return Layers;
    case "Database":
      return Database;
    case "Building2":
      return Building2;
    case "Cpu":
      return Cpu;
    case "Smartphone":
      return Smartphone;
    case "Cloud":
      return Cloud;
    case "TrendingUp":
      return TrendingUp;
    default:
      return Sparkles;
  }
};

export default function ServicesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = servicesData.find((s) => s.id === activeId);

  return (
    <section
      id="services"
      className="relative z-10 py-32 px-6 md:px-12 bg-gradient-to-b from-[#0A0A0A] to-[#111111]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] rounded-full blur-[100px]" />

      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: easeOutQuint }}
          className="mb-6 text-center"
        >
          <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/20" />
            What We Do
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-[#999] bg-clip-text text-transparent mb-5">
            Complete tech stack support.
          </h2>
          <p className="text-[#A3A3A3] text-base md:text-lg max-w-[55ch] mx-auto font-light leading-relaxed">
            From web applications and SaaS to bespoke CRMs, ERPs, AI automation, and cloud infrastructure — we engineer and scale your entire digital presence.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16"
        >
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);
            const isActive = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: easeOutQuint },
                  },
                }}
                className="group relative flex flex-col justify-between p-7 rounded-2xl transition-all duration-500 ease-out"
                style={{
                  background: isActive
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(12px)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isActive
                    ? "0 20px 60px rgba(0,0,0,0.8)"
                    : "0 4px 20px rgba(0,0,0,0.4)",
                  transform: isActive ? "translateY(-4px)" : undefined,
                }}
                whileHover={!isActive ? { y: -4, transition: { duration: 0.3 } } : undefined}
              >
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent transition-opacity duration-700 pointer-events-none ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 border ${
                        isActive
                          ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          : "bg-[#181818] border-white/[0.08] text-white/80 group-hover:bg-white group-hover:text-black group-hover:border-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#777]">
                      {service.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {service.shortTitle}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed font-light mb-6">
                    {service.tagline}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/[0.05] space-y-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white text-xs font-semibold text-white hover:text-black transition-all group/btn"
                  >
                    <span>Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>

                  <button
                    onClick={() => setActiveId(isActive ? null : service.id)}
                    className="w-full flex items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#666] hover:text-[#AAA] transition-colors py-1"
                  >
                    {isActive ? "Close Preview" : "Preview Scope"}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: easeOutQuint }}
              className="overflow-hidden"
            >
              <div
                className="relative p-8 md:p-12 rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setActiveId(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#888] hover:text-white hover:bg-white/[0.1] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left: Description */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center">
                        {(() => {
                          const ExpIcon = getIcon(activeService.iconName);
                          return <ExpIcon className="w-5 h-5 text-white" />;
                        })()}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                          {activeService.categoryLabel}
                        </span>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {activeService.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[#A3A3A3] leading-relaxed text-sm font-light mb-8">
                      {activeService.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/services/${activeService.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#E5E5E5] transition-all"
                      >
                        View Full Service Page
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/contact?service=${activeService.slug}`}
                        className="text-xs font-semibold text-[#888] hover:text-white transition-colors"
                      >
                        Start Project &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Right: Deliverables */}
                  <div>
                    <h4 className="text-[11px] uppercase font-bold tracking-[0.15em] text-[#A3A3A3] mb-5">
                      Key Deliverables Included
                    </h4>
                    <ul className="space-y-3">
                      {activeService.deliverables.slice(0, 5).map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.06,
                            ease: easeOutQuint,
                          }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span className="text-[#D4D4D4] text-xs sm:text-sm font-medium">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
