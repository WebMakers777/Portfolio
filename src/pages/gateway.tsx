import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import {
  Mail,
  Phone,
  Send,
  ArrowUpRight,
  Zap,
  Gem,
  Target,
  ArrowDown,
  Globe,
  Layers,
  Code2,
  Megaphone,
  Menu,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WhatsAppFloat from "@/components/WhatsappFloat";
import TechStackShowcase from "@/components/gateway/TechStackShowcase";
import HowWeWork from "@/components/gateway/HowWeWork";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// MOTION PRESETS (Refined cinematic timings)
// ─────────────────────────────────────────────────────────────────────────────
const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: easeOutQuint } 
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
  <span className="mx-8 text-[#555] font-semibold tracking-widest uppercase text-xs flex items-center gap-4">
    <Gem className="w-3 h-3 text-[#333]" />
    {children}
  </span>
);

const TechMarquee = () => {
  return (
    <div className="w-full relative overflow-hidden py-10 border-y border-white/[0.04] bg-[#0A0A0A]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <div className="flex items-center">
          <MarqueeItem>React & Next.js</MarqueeItem>
          <MarqueeItem>SaaS Architecture</MarqueeItem>
          <MarqueeItem>Custom Software</MarqueeItem>
          <MarqueeItem>iOS & Android Native</MarqueeItem>
          <MarqueeItem>Cloud Infrastructure</MarqueeItem>
          <MarqueeItem>Enterprise Architecture</MarqueeItem>
          <MarqueeItem>Data Science & AI</MarqueeItem>
          <MarqueeItem>CI/CD Pipelines</MarqueeItem>
          <MarqueeItem>PostgreSQL & Redis</MarqueeItem>
        </div>
        <div className="flex items-center">
          <MarqueeItem>React & Next.js</MarqueeItem>
          <MarqueeItem>SaaS Architecture</MarqueeItem>
          <MarqueeItem>Custom Software</MarqueeItem>
          <MarqueeItem>iOS & Android Native</MarqueeItem>
          <MarqueeItem>Cloud Infrastructure</MarqueeItem>
          <MarqueeItem>Enterprise Architecture</MarqueeItem>
          <MarqueeItem>Data Science & AI</MarqueeItem>
          <MarqueeItem>CI/CD Pipelines</MarqueeItem>
          <MarqueeItem>PostgreSQL & Redis</MarqueeItem>
        </div>
      </motion.div>
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <section id="about" className="relative z-10 py-32 px-6 md:px-12 bg-[#0A0A0A] overflow-hidden">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="lg:col-span-6"
          >
            <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-white/20"></span>
              The Standard
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-[1.1] mb-8">
              We don't build MVPs.<br />
              <span className="text-[#888]">We build market leaders.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#A3A3A3] font-light leading-relaxed max-w-[45ch] mb-8">
              At Vincie Studios, we believe that software should feel tactile and marketing should be invisible. We combine obsessive product engineering with elite digital strategy to scale ambitious brands.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#AAA]">Zero-Debt Code</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#AAA]">Custom Architecture</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="lg:col-span-6 relative group"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#111111]/80 backdrop-blur-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img 
                  src="/cloud-code.jpg" 
                  alt="Vincie Studios Code Engineering Workstation" 
                  className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
              </div>
              
              <div className="p-8 sm:p-10 relative -mt-16 z-10">
                <div className="w-12 h-12 rounded-xl border border-white/[0.12] bg-black/80 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Precision over Pace</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6 font-light">
                  While others rush to ship incomplete code, we engineer for the long term. Every line of code, software architecture, and database query is calibrated for absolute perfection.
                </p>
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-[#888]">
                  <span className="text-[10px] uppercase tracking-widest text-[#AAA] font-semibold">Silicon Valley Standard</span>
                  <span>100% Crafted In-House</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER HOOK
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 2000;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WHY US SECTION (Enhanced with counters + hover effects)
// ─────────────────────────────────────────────────────────────────────────────
const whyUsItems = [
  {
    icon: Zap,
    title: "Speed & Scale",
    description: "We move fast without breaking things. Our engineered solutions are designed to scale smoothly from day one to enterprise loads.",
  },
  {
    icon: Gem,
    title: "Craft & Precision",
    description: "Every line of code and pixel of design is meticulously refined. We deliver a Stripe-level feel to your digital presence.",
  },
  {
    icon: Target,
    title: "Strategy & Results",
    description: "No vanity metrics. Everything we ship is tied to concrete business results, user engagement, and measurable ROI.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="relative z-10 py-32 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: easeOutQuint }}
          className="text-center mb-20"
        >
          <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/20" />
            Why Vincie Studios
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-[#999] bg-clip-text text-transparent">
            Built different.
          </h2>
        </motion.div>

        {/* Animated Stat Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: easeOutQuint }}
          className="grid grid-cols-3 gap-6 md:gap-12 mb-20 max-w-[700px] mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            <AnimatedCounter target={50} suffix="+" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#888888] tracking-[0.15em] uppercase mt-2">Projects</span>
          </div>
          <div className="flex flex-col items-center text-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/[0.06]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/[0.06]" />
            <AnimatedCounter target={100} suffix="+" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#888888] tracking-[0.15em] uppercase mt-2">Clients</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <AnimatedCounter target={5} suffix="+" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#888888] tracking-[0.15em] uppercase mt-2">Years</span>
          </div>
        </motion.div>

        {/* Why Us Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyUsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: easeOutQuint }}
                className="group relative flex flex-col p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Hover border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                    borderRadius: "inherit",
                  }}
                />
                {/* Hover inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 mb-8 flex items-center justify-center rounded-xl bg-[#1C1C1C] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.4)] group-hover:bg-[#222] group-hover:border-white/[0.14] group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(255,255,255,0.04)] transition-all duration-500">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <h4 className="text-xl font-semibold tracking-tight text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[#A3A3A3] text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social Proof Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOutQuint }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#A3A3A3] font-light italic max-w-[50ch] mx-auto leading-relaxed">
            "Trusted by bold founders and established enterprises globally. From high-performance SaaS platforms to convert-first digital campaigns."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-10% ", filter: "blur(20px)", transition: { duration: 0.8, ease: easeOutQuint } }}
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: easeOutQuint }}
        className="flex flex-col items-center gap-8"
      >
        <img src="/vinciestudio.png" alt="Vincie Studios" className="h-10 md:h-12 w-auto object-contain" />
        <div className="w-48 md:w-64 h-[2px] bg-white/[0.05] rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-[#FFF] to-[#FFF]"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.6, ease: easeOutQuint }}
          >
             <div className="absolute top-0 right-0 h-full w-8 bg-white shadow-[0_0_15px_white]" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Gateway() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2-Second premium cinematic delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const location = useLocation();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(24px)"]);

  // Navigate to sections via router state
  useEffect(() => {
    const to = (location.state as any)?.scrollTo;
    if (to) {
      setTimeout(() => {
        document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
        try {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        } catch (_) {}
      }, 80);
    }
  }, [location]);

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#0A0A0A] overflow-hidden font-inter">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {/* ──────────────── GRAIN & TEXTURE (Cinematic feel) ──────────────── */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' type='fractalNoise' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ──────────────── STICKY NAV ──────────────── */}
      <Navbar />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative z-10 pt-[24vh] pb-[16vh] px-6 md:px-12">
        {/* Floating gradient vignette (subtle luxury lighting) */}
        <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(44,42,38,0.12)_0%,_transparent_70%)] rounded-[100%] blur-[120px]" />
        
        <motion.div
          className="relative mx-auto max-w-[1280px] flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Top Hero Content that fades out on scroll */}
          <motion.div style={{ y: heroY, opacity: heroOpacity, filter: heroBlur }} className="flex flex-col items-center w-full">
            {/* Tag */}
            <motion.div
              variants={fadeUp}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#111111]/40 px-4 sm:px-5 py-1.5 md:mb-10 text-[10px] sm:text-[12px] uppercase font-semibold tracking-[0.1em] text-[#A3A3A3] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-center max-w-full"
            >
              Engineering meets storytelling
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[1.05] sm:leading-[1] tracking-[-0.04em] max-w-[15ch] px-2 sm:px-0"
            >
              <span className="bg-gradient-to-r from-white via-[#E0E0E0] to-[#999999] bg-clip-text text-transparent drop-shadow-sm">
                We build products.
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#999999] via-[#C0C0C0] to-[#FFFFFF] bg-clip-text text-transparent drop-shadow-sm">
                We grow brands.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 sm:mt-8 text-sm sm:text-base md:text-xl text-[#A3A3A3] max-w-[48ch] leading-relaxed font-light px-4 sm:px-0"
            >
              From SaaS platforms to custom enterprise software — we engineer, design, and scale your entire digital presence. Built for startups, funded companies, and serious businesses.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto px-6 sm:px-0">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5] border border-white/[0.1] text-black px-8 py-4 text-sm font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                Start a Project
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#111111]/80 hover:bg-[#161616] text-[#F5F5F5] px-8 py-4 text-sm font-medium shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 active:scale-[0.98] transition-all backdrop-blur-sm"
              >
                Explore Our Work
                <ArrowDown className="w-4 h-4 ml-1 opacity-60" />
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={fadeUp} className="mt-16 md:mt-28 flex items-center justify-center gap-4 sm:gap-8 md:gap-16 border-t border-white/[0.06] pt-10 w-full max-w-[800px] mx-auto px-4 sm:px-0">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent">50+</span>
              <span className="text-[9px] sm:text-[11px] font-semibold text-[#888888] tracking-[0.15em] uppercase mt-1 sm:mt-2">Projects</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-white/[0.06] shadow-[0_0_10px_rgba(255,255,255,0.05)]"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent">100+</span>
              <span className="text-[9px] sm:text-[11px] font-semibold text-[#888888] tracking-[0.15em] uppercase mt-1 sm:mt-2">Clients</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-white/[0.06] shadow-[0_0_10px_rgba(255,255,255,0.05)]"></div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent">5+</span>
              <span className="text-[9px] sm:text-[11px] font-semibold text-[#888888] tracking-[0.15em] uppercase mt-1 sm:mt-2">Years</span>
            </div>
          </motion.div>

          {/* Additional Trust Content */}
          <motion.div variants={fadeUp} className="mt-12 text-center max-w-[60ch]">
            <p className="text-sm text-[#A3A3A3] font-light leading-relaxed">
              Trusted by bold founders and established enterprises globally. From <strong className="text-white font-medium">high-performance SaaS platforms</strong> to <strong className="text-white font-medium">convert-first digital campaigns</strong>, we bring Silicon Valley standards to every project we undertake.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────────── NEW CONTENT: MARQUEE & PHILOSOPHY ──────────────── */}
      <TechMarquee />
      <PhilosophySection />

      {/* ──────────────── TECH STACK SHOWCASE ──────────────── */}
      <TechStackShowcase />

      {/* ──────────────── HOW WE WORK ──────────────── */}
      <HowWeWork />

      {/* ──────────────── WHY US (Authority) ──────────────── */}
      <WhyUsSection />

      {/* ──────────────── CTA ──────────────── */}
      <section className="relative z-10 py-40 px-6 md:px-12 bg-gradient-to-b from-[#111111] to-[#0A0A0A]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="mx-auto max-w-[800px] text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOutQuint }}
          >
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-white mb-8 leading-[1.05]">
              Ready to build something <span className="bg-gradient-to-r from-[#DDDDDD] to-[#888888] bg-clip-text text-transparent">remarkable?</span>
            </h2>
            <p className="text-[#A3A3A3] text-lg md:text-xl font-light mb-14 max-w-[40ch] mx-auto">
              We don't just deliver. We scale what matters. Let's engineer your next big move.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5] border border-white/[0.1] text-black px-10 py-5 text-base font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1 active:scale-[0.98] transition-all"
            >
              Start a Conversation
              <ArrowUpRight className="w-5 h-5 ml-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── CONTACT FORM ──────────────── */}
      <ContactSection />

      {/* ──────────────── FOOTER ──────────────── */}
      <Footer />

      <WhatsAppFloat />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT SECTION (Refined Depth)
───────────────────────────────────────────────────────────────────────────── */
const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "gateway",
      };
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data = await resp.json().catch(() => ({ success: resp.ok }));
      if (data?.success) {
        toast({ title: "Inquiry received.", description: "We will reach out shortly." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data?.error || "Failed");
      }
    } catch (err) {
      toast({ title: "Error", description: "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Connect with us.</h2>
            <p className="text-[#A3A3A3] font-light max-w-[40ch] mb-14 leading-relaxed text-lg">
              Have an enterprise requirement or a new project idea? Send us the details.
            </p>

            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#111111] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-white/80" />
                </div>
                <a href="mailto:vinciestudios@gmail.com" className="text-lg font-medium text-white hover:text-[#A3A3A3] transition-colors">vinciestudios@gmail.com</a>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#111111] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-white/80" />
                </div>
                <a href="tel:+917375038069" className="text-lg font-medium text-white hover:text-[#A3A3A3] transition-colors">+91 73750 38069</a>
              </div>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 p-10 md:p-14 rounded-3xl overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Ambient light for form */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-2 relative z-10">
              <label htmlFor="name" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">Full Name</label>
              <input
                id="name" name="name" type="text" required
                value={formData.name} onChange={handleInputChange}
                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/[0.2] transition-colors text-base shadow-inner"
              />
            </div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <label htmlFor="email" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">Email Address</label>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleInputChange}
                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/[0.2] transition-colors text-base shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-2 mb-6 relative z-10">
              <label htmlFor="message" className="text-[10px] font-bold text-[#A3A3A3] tracking-[0.15em] uppercase">Project Details</label>
              <textarea
                id="message" name="message" rows={4} required
                value={formData.message} onChange={handleInputChange}
                className="w-full bg-[#0A0A0A]/50 border border-white/[0.08] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/[0.2] transition-colors resize-none text-base shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative z-10 flex items-center justify-center gap-2 bg-gradient-to-b from-[#FFFFFF] to-[#E5E5E5] text-[#0A0A0A] rounded-xl py-4 font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
              {!isSubmitting && <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
