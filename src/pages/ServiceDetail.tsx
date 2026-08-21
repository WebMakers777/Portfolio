import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Layers,
  Monitor,
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
  Terminal,
  Activity,
} from "lucide-react";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import WhatsAppFloat from "@/components/WhatsappFloat";
import ServiceInteractiveWidget from "@/components/gateway/ServiceInteractiveWidgets";
import ServiceAbstractArt from "@/components/gateway/ServiceAbstractArt";
import { servicesData, ServiceItem } from "@/data/servicesData";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

// Helper to resolve icon by string name
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

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const serviceIndex = useMemo(() => {
    return servicesData.findIndex((s) => s.slug === slug);
  }, [slug]);

  const service: ServiceItem | undefined = servicesData[serviceIndex];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const prevService =
    serviceIndex > 0
      ? servicesData[serviceIndex - 1]
      : servicesData[servicesData.length - 1];

  const nextService =
    serviceIndex < servicesData.length - 1
      ? servicesData[serviceIndex + 1]
      : servicesData[0];

  const MainIcon = getIcon(service.iconName);

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

      {/* ──────────────── HERO SECTION ──────────────── */}
      <section className="relative z-10 pt-[20vh] pb-[6vh] px-6 md:px-12">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] blur-[140px]" />
        <div className="pointer-events-none absolute top-40 right-10 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] blur-[100px]" />

        <div className="mx-auto max-w-[1280px]">
          {/* Interactive Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutQuint }}
            className="flex items-center gap-2 text-xs font-medium text-[#888888] mb-8"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#555]" />
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#555]" />
            <span className="text-white font-semibold">{service.shortTitle}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOutQuint }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.1] bg-[#141414]/60 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4D4D4] mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>{service.categoryLabel}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                {service.heroHeadline}{" "}
                <span className="bg-gradient-to-r from-white via-[#E0E0E0] to-[#888888] bg-clip-text text-transparent">
                  {service.heroHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#A3A3A3] font-light leading-relaxed mb-8 max-w-[58ch]">
                {service.extendedDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`/contact?service=${service.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-b from-white to-[#E5E5E5] text-black text-sm font-bold shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  Start {service.shortTitle} Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#problem-solution"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] text-white text-sm font-semibold transition-all"
                >
                  How Software Solves It
                  <ArrowRight className="w-4 h-4 text-white/70" />
                </a>
              </div>
            </motion.div>

            {/* Visual Hero Abstract Glowing Art */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: easeOutQuint }}
              className="lg:col-span-5"
            >
              <ServiceAbstractArt
                slug={service.slug}
                title={service.title}
                imageSrc={service.primaryImage}
                categoryLabel={service.categoryLabel}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── 2. SOFTWARE IN ACTION: LIVE INTERACTIVE ENGINE ──────────────── */}
      <section className="relative z-10 py-16 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-10">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-3 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Software Architecture in Action
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Interact with the {service.shortTitle} Engine
            </h2>
            <p className="text-sm text-[#888] max-w-[50ch] mx-auto mt-2">
              Experience the live mechanics, reactive state, and automated telemetry powering this solution.
            </p>
          </div>

          <ServiceInteractiveWidget
            type={service.interactiveWidgetType}
            serviceTitle={service.title}
          />
        </div>
      </section>

      {/* ──────────────── 3. BUSINESS PROBLEM VS SOFTWARE SOLUTION ──────────────── */}
      <section id="problem-solution" className="relative z-10 py-24 px-6 md:px-12 bg-gradient-to-b from-[#0A0A0A] to-[#111111] border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Business Transformation
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              How our software eliminates business bottlenecks.
            </h2>
            <p className="text-base sm:text-lg text-[#A3A3A3] font-light max-w-[55ch] mx-auto">
              We design software specifically around the operational friction points that cost your company time, revenue, and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* The Business Problem */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOutQuint }}
              className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-red-950/[0.1] border border-red-500/20 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[11px] uppercase font-bold tracking-widest text-red-400 mb-6 w-fit">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Legacy Business Problem</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                  {service.businessProblem.problemTitle}
                </h3>
                <p className="text-sm text-[#B0B0B0] leading-relaxed font-light mb-8">
                  {service.businessProblem.problemDescription}
                </p>

                <div className="space-y-3.5">
                  {service.businessProblem.painPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#D4D4D4] font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-red-500/10 text-xs text-red-300/80 font-mono">
                Outcome: Lost revenue, high employee churn, and operational fragility.
              </div>
            </motion.div>

            {/* The Engineered Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeOutQuint }}
              className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-emerald-950/[0.1] border border-emerald-500/20 backdrop-blur-xl flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] uppercase font-bold tracking-widest text-emerald-400 mb-6 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>The Vincie Software Solution</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                  {service.solutionTransformation.solutionTitle}
                </h3>
                <p className="text-sm text-[#B0B0B0] leading-relaxed font-light mb-8">
                  {service.solutionTransformation.solutionDescription}
                </p>

                <div className="space-y-3.5">
                  {service.solutionTransformation.keyAdvantages.map((advantage) => (
                    <div key={advantage} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#D4D4D4] font-medium">
                        {advantage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-8 border-t border-emerald-500/10 text-xs text-emerald-300 font-mono flex items-center justify-between">
                <span>Outcome: Total operational visibility & 99.99% reliability.</span>
                <span className="font-bold text-white">100% Custom Codebase</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. SECONDARY SOFTWARE VISUAL SHOWCASE ──────────────── */}
      <section className="relative z-10 py-12 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-12 backdrop-blur-2xl">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#AAA] mb-3 block">
                Full-Stack Precision
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                Designed for Mission-Critical Production
              </h3>
              <p className="text-sm text-[#A3A3A3] font-light leading-relaxed mb-6">
                Our architectures are built for zero downtime, resilient failovers, and complete end-to-end data security. Every workflow is audited to ensure compliance with enterprise SOC2 and ISO standards.
              </p>
              <div className="flex flex-wrap gap-2">
                {service.techStack.flatMap((ts) => ts.technologies).slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg bg-[#181818] border border-white/[0.08] text-[#D4D4D4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
                <img
                  src={service.secondaryImage}
                  alt={`${service.title} Workflow`}
                  className="w-full h-72 sm:h-80 object-cover grayscale contrast-125 opacity-80 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-[#AAA]">
                  vincie-os :: module-spec :: {service.slug}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. BUSINESS IMPACT & ROI BAR ──────────────── */}
      <section className="relative z-10 py-16 px-6 md:px-12 border-y border-white/[0.06] bg-[#0E0E0E]/60 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#AAA] block mb-2">
              Quantifiable Return On Investment
            </span>
            <h3 className="text-2xl font-bold text-white">
              {service.businessImpact.roiHeadline}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.businessImpact.outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: easeOutQuint }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 block bg-gradient-to-r from-white via-[#EDEDED] to-[#AAAAAA] bg-clip-text text-transparent">
                    {outcome.value}
                  </span>
                  <span className="text-sm font-bold text-white mb-1 block">
                    {outcome.label}
                  </span>
                </div>
                <p className="text-xs text-[#888] font-light leading-relaxed mt-2">
                  {outcome.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 6. CORE CAPABILITIES ──────────────── */}
      <section id="capabilities" className="relative z-10 py-24 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Technical Capabilities
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5">
              Engineered for uncompromising performance.
            </h2>
            <p className="text-base sm:text-lg text-[#A3A3A3] font-light max-w-[50ch] mx-auto">
              Our core capabilities designed to power high-scale enterprise workloads and seamless user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, i) => {
              const CapIcon = getIcon(cap.iconName);
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: easeOutQuint }}
                  className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#161616] border border-white/[0.1] flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 shadow-md">
                    <CapIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light">
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── 7. ARCHITECTURE & DELIVERABLES SPLIT ──────────────── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-gradient-to-b from-[#0A0A0A] to-[#121212] border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Architecture Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutQuint }}
              className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] uppercase font-bold tracking-widest text-[#AAA] mb-6">
                  Architecture Overview
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  High-Availability Architecture
                </h3>
                <p className="text-sm sm:text-base text-[#A3A3A3] font-light leading-relaxed mb-8">
                  {service.architectureOverview}
                </p>

                <div className="space-y-3.5 mb-8">
                  {service.architectureHighlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#D4D4D4] font-medium">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#888]">
                <span>SOC2 & ISO Ready Architecture</span>
                <span className="text-white font-semibold">100% Owned Codebase</span>
              </div>
            </motion.div>

            {/* Enterprise Deliverables Checklist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutQuint }}
              className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] uppercase font-bold tracking-widest text-[#AAA] mb-6">
                  What You Receive
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
                  Scope & Enterprise Deliverables
                </h3>

                <ul className="space-y-4 mb-8">
                  {service.deliverables.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#D4D4D4] font-medium">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/contact?service=${service.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-[#E5E5E5] transition-all"
              >
                Request Custom Deliverables Scope &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── 8. TECH STACK SHOWCASE ──────────────── */}
      <section className="relative z-10 py-24 px-6 md:px-12 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Technology Ecosystem
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Modern, battle-tested stack.
            </h2>
            <p className="text-base text-[#A3A3A3] font-light max-w-[45ch] mx-auto">
              We leverage reliable, enterprise-grade tooling to build scalable and maintainable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.techStack.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: easeOutQuint }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md"
              >
                <h4 className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#181818] border border-white/[0.08] text-[#E0E0E0] hover:border-white/[0.2] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 9. 4-STEP DELIVERY LIFECYCLE ──────────────── */}
      <section className="relative z-10 py-28 px-6 md:px-12 bg-[#0C0C0C]/80 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-20">
            <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Delivery Lifecycle
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              How we engineer your solution.
            </h2>
            <p className="text-base text-[#A3A3A3] font-light max-w-[50ch] mx-auto">
              A transparent, sprint-based lifecycle ensuring predictable milestones and zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: easeOutQuint }}
                className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] flex flex-col justify-between hover:border-white/[0.15] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-white/20 font-mono">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] text-[#AAA] border border-white/[0.08]">
                      {step.timeframe}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {step.points.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs text-[#C0C0C0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 10. FREQUENTLY ASKED QUESTIONS ──────────────── */}
      {service.faq && service.faq.length > 0 && (
        <section className="relative z-10 py-24 px-6 md:px-12 border-t border-white/[0.06]">
          <div className="mx-auto max-w-[900px]">
            <div className="text-center mb-16">
              <div className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-white/20" />
                Frequently Asked
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Service FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((faqItem, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faqItem.question}
                    className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-base font-semibold text-white pr-4">
                        {faqItem.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#888] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: easeOutQuint }}
                          className="px-6 pb-6 text-sm text-[#A3A3A3] leading-relaxed font-light border-t border-white/[0.04] pt-4"
                        >
                          {faqItem.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────── PREV / NEXT NAVIGATION ──────────────── */}
      <section className="relative z-10 py-12 px-6 md:px-12 border-t border-white/[0.06] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={`/services/${prevService.slug}`}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.05] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#161616] border border-white/[0.08] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] block">
                  Previous Capability
                </span>
                <span className="text-sm font-bold text-white group-hover:text-white truncate block">
                  {prevService.shortTitle}
                </span>
              </div>
            </Link>

            <Link
              to={`/services/${nextService.slug}`}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.05] transition-all text-right"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] block">
                  Next Capability
                </span>
                <span className="text-sm font-bold text-white group-hover:text-white truncate block">
                  {nextService.shortTitle}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#161616] border border-white/[0.08] flex items-center justify-center text-white group-hover:scale-105 transition-transform ml-4">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── CTA SECTION ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center border-t border-white/[0.06]">
        <div className="mx-auto max-w-[800px]">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to engineer your {service.shortTitle}?
          </h2>
          <p className="text-base sm:text-lg text-[#A3A3A3] font-light max-w-[45ch] mx-auto mb-10">
            Let's discuss your technical specifications, architecture requirements, and milestone timeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={`/contact?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-b from-white to-[#E5E5E5] text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Start {service.shortTitle} Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] text-white font-semibold transition-all"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
