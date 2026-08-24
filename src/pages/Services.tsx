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
  Activity,
  Check,
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
  { id: "all", label: "All Capabilities", count: 8 },
  { id: "engineering", label: "Web & SaaS", count: 3 },
  { id: "enterprise", label: "Enterprise Software", count: 2 },
  { id: "cloud_ai", label: "Cloud & AI", count: 2 },
  { id: "growth", label: "Growth & SEO", count: 1 },
];

const featuredShowcases = [
  {
    id: "saas",
    title: "SaaS Platform Analytics & Multi-Tenant Engine",
    subtitle: "Enterprise MRR analytics, automated Stripe webhooks, and granular RBAC permissions.",
    image: "/services/saas-snapshot.jpg",
    slug: "saas",
    badge: "Cloud Platform",
    metric: "99.99% Isolation",
  },
  {
    id: "web-applications",
    title: "Real-Time Web Application & Collaborative State",
    subtitle: "Edge-rendered Next.js/React workspace with sub-100ms response times and live telemetry.",
    image: "/services/web-app-snapshot.jpg",
    slug: "web-applications",
    badge: "Web Engineering",
    metric: "< 100ms Latency",
  },
  {
    id: "automation",
    title: "AetherFlow Autonomous AI Agent Studio",
    subtitle: "Node-based visual workflow automation canvas with streaming LLM execution timelines.",
    image: "/services/ai-snapshot.jpg",
    slug: "automation",
    badge: "AI & Intelligence",
    metric: "10x Throughput",
  },
  {
    id: "cloud-devops",
    title: "Cybernetic Ops Kubernetes Cluster & Telemetry",
    subtitle: "Multi-region pod health monitoring, automated GitOps CI/CD, and Prometheus observability.",
    image: "/services/devops-snapshot.jpg",
    slug: "cloud-devops",
    badge: "DevOps & Cloud",
    metric: "99.99% SLA",
  },
  {
    id: "erp",
    title: "Axon Enterprise Supply Chain & Operations Command",
    subtitle: "Multi-warehouse inventory matrix with real-time shipment maps and financial double-entry.",
    image: "/services/erp-snapshot.jpg",
    slug: "erp",
    badge: "Enterprise ERP",
    metric: "Zero Stockouts",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);

  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  const expandedService = servicesData.find((s) => s.id === expandedServiceId);
  const currentShowcase = featuredShowcases[activeShowcaseIndex];

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#0A0A0A] overflow-hidden font-inter">
      <Navbar />

      {/* Cinematic noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' type='fractalNoise' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative z-10 pt-[20vh] pb-[6vh] px-6 md:px-12">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] blur-[140px]" />
        <div className="pointer-events-none absolute top-40 right-10 w-[450px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] blur-[100px]" />

        <div className="mx-auto max-w-[1280px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutQuint }}
            className="max-w-[900px] mx-auto"
          >
            {/* Capability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.1] bg-[#141414]/70 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4D4D4] mb-6 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Full-Stack Engineering & Capabilities</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              Precision engineering for{" "}
              <span className="bg-gradient-to-r from-white via-[#E0E0E0] to-[#888888] bg-clip-text text-transparent">
                ambitious digital products.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#A3A3A3] font-light leading-relaxed max-w-[58ch] mx-auto mb-8">
              From web applications and SaaS platforms to bespoke CRMs, ERPs, autonomous AI agents, and cloud DevOps — explore our production-grade capabilities.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-[#D4D4D4] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>99.99% High Availability</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-[#D4D4D4] font-medium">
                <span className="w-2 h-2 rounded-full bg-white/60" />
                <span>Sub-100ms Edge Latency</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-[#D4D4D4] font-medium">
                <span className="w-2 h-2 rounded-full bg-white/60" />
                <span>100% Owned Custom Codebase</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── INTERACTIVE PRODUCTION ECOSYSTEM SHOWCASE (UPPER BANNER) ──────────────── */}
      <section className="relative z-10 py-8 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutQuint }}
            className="rounded-3xl border border-white/[0.12] bg-[#000000] shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Window Topbar & Showcase Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#111111] border-b border-white/[0.08]">
              {/* macOS Window dots */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]" />
                <span className="hidden sm:inline-block ml-3 text-xs font-mono text-[#777]">
                  vincie-os :: interactive-snapshot-engine
                </span>
              </div>

              {/* Showcase Switcher Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {featuredShowcases.map((sc, idx) => {
                  const isActive = activeShowcaseIndex === idx;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setActiveShowcaseIndex(idx)}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-black font-bold shadow-md"
                          : "text-[#888] hover:text-white bg-white/[0.03] hover:bg-white/[0.07]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="showcaseActivePill"
                          className="absolute inset-0 bg-white rounded-lg -z-0"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{sc.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Showcase Visual Area */}
            <div className="relative aspect-[21/10] sm:aspect-[21/9] w-full overflow-hidden bg-[#0A0A0A]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentShowcase.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.5, ease: easeOutQuint }}
                  className="relative w-full h-full"
                >
                  <img
                    src={currentShowcase.image}
                    alt={currentShowcase.title}
                    className="w-full h-full object-cover brightness-95 contrast-105"
                  />

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent max-w-[70%]" />

                  {/* Showcase Info Card */}
                  <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-[650px] z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-md">
                        {currentShowcase.badge}
                      </span>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {currentShowcase.metric}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                      {currentShowcase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B0B0B0] font-light leading-relaxed mb-5 line-clamp-2 max-w-[55ch]">
                      {currentShowcase.subtitle}
                    </p>

                    <Link
                      to={`/services/${currentShowcase.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-[#EDEDED] hover:scale-105 transition-all"
                    >
                      <span>Explore Capability & Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── CATEGORY FILTER TABS ──────────────── */}
      <section className="relative z-10 pt-16 pb-6 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-8">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-3 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Interactive Directory
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Explore Our Core Service Domains
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl w-fit mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedServiceId(null);
                  }}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isSelected
                      ? "text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      : "text-[#888888] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-white rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-black/10 text-black font-mono font-bold"
                          : "bg-white/[0.06] text-[#777]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── SERVICES GRID ──────────────── */}
      <section className="relative z-10 py-8 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
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
                      backdropFilter: "blur(14px)",
                      border: isExpanded
                        ? "1px solid rgba(255,255,255,0.22)"
                        : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: isExpanded
                        ? "0 25px 70px rgba(0,0,0,0.85)"
                        : "0 4px 25px rgba(0,0,0,0.4)",
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  >
                    {/* Abstract Luminescent Art Thumbnail with Snapshot preview on hover */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#000000] border-b border-white/[0.08]">
                      {/* Primary glowing art */}
                      <img
                        src={service.primaryImage}
                        alt={service.title}
                        className="w-full h-full object-cover grayscale contrast-150 brightness-95 opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                      {/* Icon bubble */}
                      <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#000000]/80 backdrop-blur-md border border-white/[0.15] flex items-center justify-center text-white shadow-lg group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Category Label */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md text-[#D4D4D4] border border-white/[0.12] shadow-sm">
                          {service.categoryLabel}
                        </span>
                      </div>

                      {/* Bottom metric highlight on card */}
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#AAA] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
                          {service.metrics[0]?.label || "Production Ready"}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                          {service.metrics[0]?.value || "99.9%"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                          {service.shortTitle}
                        </h3>
                        <p className="text-xs text-[#A3A3A3] leading-relaxed font-light mb-4 line-clamp-2">
                          {service.tagline}
                        </p>

                        {/* Tech tags preview */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {service.techStack[0]?.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[#B0B0B0]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-4 border-t border-white/[0.06] space-y-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white text-xs font-semibold text-white hover:text-black transition-all group/btn shadow-sm"
                        >
                          <span>Explore Software & Impact</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>

                        <button
                          onClick={() =>
                            setExpandedServiceId(isExpanded ? null : service.id)
                          }
                          className="w-full flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#777] hover:text-white transition-colors py-1"
                        >
                          {isExpanded ? "Hide Deliverables" : "Preview Specs"}
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-white" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ──────────────── EXPANDED PREVIEW DRAWER ──────────────── */}
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
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.85)",
                  }}
                >
                  <button
                    onClick={() => setExpandedServiceId(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-[#888] hover:text-white hover:bg-white/[0.15] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center shadow-lg">
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

                        <p className="text-[#A3A3A3] leading-relaxed text-sm font-light mb-6">
                          {expandedService.description}
                        </p>

                        {/* Snapshot thumbnail preview */}
                        <div className="rounded-xl overflow-hidden border border-white/10 mb-6 relative aspect-[16/8]">
                          <img
                            src={expandedService.secondaryImage}
                            alt={`${expandedService.title} Snapshot`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-3 text-[11px] font-mono text-[#D4D4D4]">
                            {expandedService.imageCaption}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          to={`/services/${expandedService.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#E5E5E5] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                          View Full Service Page & ROI
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/contact?service=${expandedService.slug}`}
                          className="text-xs font-semibold text-[#AAA] hover:text-white transition-colors"
                        >
                          Start Project &rarr;
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08] lg:pl-10 pt-6 lg:pt-0">
                      <div>
                        <h4 className="text-[11px] uppercase font-bold tracking-[0.15em] text-[#D4D4D4] mb-5 flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Enterprise Deliverables Included</span>
                        </h4>

                        <ul className="space-y-3 mb-8">
                          {expandedService.deliverables.map((item, idx) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: idx * 0.05,
                                ease: easeOutQuint,
                              }}
                              className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              <span className="text-[#D4D4D4] text-xs sm:text-sm font-medium">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-[#888]">
                        <span>ROI Outcome: {expandedService.businessImpact.outcomes[0]?.label}</span>
                        <span className="text-white font-bold">{expandedService.businessImpact.outcomes[0]?.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ──────────────── CAPABILITY COMPARISON MATRIX ──────────────── */}
      <section className="relative z-10 py-24 px-6 md:px-12 border-t border-white/[0.06] bg-[#0C0C0C]/60 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Engineering Standards
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Architecture & SLA Matrix
            </h2>
            <p className="text-base text-[#A3A3A3] font-light max-w-[50ch] mx-auto">
              Every system we engineer adheres to rigorous performance criteria, security baselines, and scalability thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutQuint }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Sub-100ms Response</h4>
              <p className="text-xs text-[#888] font-light leading-relaxed">
                Edge SSR and intelligent client-side prefetching ensure instant interaction speeds worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutQuint }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">SOC2 & ISO Compliant</h4>
              <p className="text-xs text-[#888] font-light leading-relaxed">
                Row-level database security, automated audit trails, and zero customer data used for AI training.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOutQuint }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">99.99% Uptime SLA</h4>
              <p className="text-xs text-[#888] font-light leading-relaxed">
                Multi-AZ container failovers, auto-scaling Kubernetes clusters, and zero-downtime blue/green rollouts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOutQuint }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-4">
                <Boxes className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">100% Owned Codebase</h4>
              <p className="text-xs text-[#888] font-light leading-relaxed">
                Zero recurring per-seat vendor licensing locks. Full IP sovereignty and comprehensive documentation.
              </p>
            </motion.div>
          </div>
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
