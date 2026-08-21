import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
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
  Workflow,
  ShieldCheck,
  Zap,
  Boxes,
  Lock,
  GitMerge,
  BarChart3,
  Globe2,
} from "lucide-react";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import WhatsAppFloat from "@/components/WhatsappFloat";
import TechStackShowcase from "@/components/gateway/TechStackShowcase";
import { servicesData, ServiceItem } from "@/data/servicesData";

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
    case "Workflow":
      return Workflow;
    case "ShieldCheck":
      return ShieldCheck;
    case "Zap":
      return Zap;
    case "Boxes":
      return Boxes;
    case "Lock":
      return Lock;
    case "GitMerge":
      return GitMerge;
    case "BarChart3":
      return BarChart3;
    case "Globe2":
      return Globe2;
    default:
      return Sparkles;
  }
};

const categories = [
  { id: "all", label: "All Capabilities" },
  { id: "engineering", label: "Web & SaaS" },
  { id: "enterprise", label: "Enterprise Software" },
  { id: "cloud_ai", label: "Cloud & AI" },
  { id: "growth", label: "Growth & SEO" },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  const expandedService = servicesData.find((s) => s.id === expandedServiceId);

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#0A0A0A] overflow-hidden font-inter">
      <Navbar />

      {/* Cinematic noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' type='fractalNoise' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative z-10 pt-[22vh] pb-[8vh] px-6 md:px-12">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] blur-[120px]" />

        <div className="mx-auto max-w-[1280px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutQuint }}
            className="max-w-[850px] mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#111111]/40 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3] mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>Capabilities & Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              Comprehensive engineering for{" "}
              <span className="bg-gradient-to-r from-white via-[#D0D0D0] to-[#888888] bg-clip-text text-transparent">
                ambitious digital products.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#A3A3A3] font-light leading-relaxed max-w-[55ch] mx-auto">
              From web applications and SaaS to bespoke CRMs, ERPs, AI automation, and cloud infrastructure — explore our technical capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── ARCHITECTURE BANNER ──────────────── */}
      <section className="relative z-10 py-6 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeOutQuint }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_20px_80px_rgba(0,0,0,0.8)] aspect-[21/9] w-full"
          >
            <img
              src="/saas-dashboard.jpg"
              alt="SaaS & Enterprise Systems Engineering"
              className="w-full h-full object-cover grayscale contrast-125 opacity-75 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-[550px]">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#AAA] mb-2 block">
                Engineering Standard
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                Enterprise Reliability & High Throughput
              </h3>
              <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed hidden sm:block">
                Engineered with multi-tenant data partitioning, zero-downtime containerized deployments, and sub-100ms response SLAs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── CATEGORY FILTER TABS ──────────────── */}
      <section className="relative z-10 pt-16 pb-4 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedServiceId(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isSelected
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                      : "bg-white/[0.03] text-[#888888] border border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── SERVICES GRID ──────────────── */}
      <section className="relative z-10 py-12 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredServices.map((service, i) => {
              const Icon = getIcon(service.iconName);
              const isExpanded = expandedServiceId === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: easeOutQuint }}
                  className="group relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    background: isExpanded
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(12px)",
                    border: isExpanded
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isExpanded
                      ? "0 20px 60px rgba(0,0,0,0.8)"
                      : "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  {/* Distinct White Glow Abstract Image Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#000000] border-b border-white/[0.08]">
                    <img
                      src={service.primaryImage}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale contrast-150 brightness-95 opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-radial-gradient from-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[#000000]/80 backdrop-blur-md border border-white/[0.15] flex items-center justify-center text-white shadow-lg">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#000000]/80 backdrop-blur-md text-[#D4D4D4] border border-white/[0.12] shadow-sm">
                        {service.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-white transition-colors">
                        {service.shortTitle}
                      </h3>
                      <p className="text-xs text-[#A3A3A3] leading-relaxed font-light mb-4 line-clamp-2">
                        {service.tagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.05] space-y-2">
                      <Link
                        to={`/services/${service.slug}`}
                        className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white text-xs font-semibold text-white hover:text-black transition-all group/btn"
                      >
                        <span>Explore Software & Impact</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>

                      <button
                        onClick={() =>
                          setExpandedServiceId(isExpanded ? null : service.id)
                        }
                        className="w-full flex items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#666] hover:text-[#AAA] transition-colors py-1"
                      >
                        {isExpanded ? "Hide Deliverables" : "Preview Specs"}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Preview Box */}
          <AnimatePresence mode="wait">
            {expandedService && (
              <motion.div
                key={expandedService.id}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
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
                    boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                  }}
                >
                  <button
                    onClick={() => setExpandedServiceId(null)}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#888] hover:text-white hover:bg-white/[0.1] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center">
                          {(() => {
                            const ExpIcon = getIcon(expandedService.iconName);
                            return <ExpIcon className="w-5 h-5 text-white" />;
                          })()}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#888]">
                            {expandedService.categoryLabel}
                          </span>
                          <h3 className="text-2xl font-bold text-white tracking-tight">
                            {expandedService.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-[#A3A3A3] leading-relaxed text-sm font-light mb-8">
                        {expandedService.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <Link
                          to={`/services/${expandedService.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#E5E5E5] transition-all"
                        >
                          View Full Service Page & ROI
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/contact?service=${expandedService.slug}`}
                          className="text-xs font-semibold text-[#888] hover:text-white transition-colors"
                        >
                          Start Project &rarr;
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase font-bold tracking-[0.15em] text-[#A3A3A3] mb-5">
                        Key Deliverables Included
                      </h4>
                      <ul className="space-y-3">
                        {expandedService.deliverables.slice(0, 5).map((item, idx) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: idx * 0.06,
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

      {/* Tech stack showcase integration */}
      <TechStackShowcase />

      {/* ──────────────── CTA ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center border-t border-white/[0.06]">
        <div className="mx-auto max-w-[800px]">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Have a custom requirement in mind?
          </h2>
          <p className="text-base sm:text-lg text-[#A3A3A3] font-light max-w-[45ch] mx-auto mb-10">
            Tell us about your technical specs or business goals and we will engineer the right solution.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-b from-white to-[#E5E5E5] text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
