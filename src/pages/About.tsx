import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Zap,
  Gem,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
} from "lucide-react";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import WhatsAppFloat from "@/components/WhatsappFloat";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutQuint },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

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
    <span ref={ref} className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
};

const values = [
  {
    icon: Zap,
    title: "Speed & Scale",
    description:
      "We move fast without breaking things. Our engineered systems are built to scale gracefully from day-one prototypes to high-concurrency enterprise workloads.",
  },
  {
    icon: Gem,
    title: "Craft & Precision",
    description:
      "Every line of code and pixel of interface design is calibrated with obsessive attention to detail, delivering an elite Stripe-caliber user experience.",
  },
  {
    icon: Target,
    title: "Strategy & Impact",
    description:
      "No vanity metrics or throwaway code. Everything we engineer is aligned with measurable business results, user engagement, and lasting product equity.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Reliability",
    description:
      "Zero-compromise security posture, rock-solid uptime, comprehensive automated testing, and resilient cloud architecture.",
  },
  {
    icon: Cpu,
    title: "Modern Engineering",
    description:
      "Leveraging modern stacks (Next.js, TypeScript, AI models, distributed databases) to give your product an unbeatable technical edge.",
  },
  {
    icon: Layers,
    title: "End-to-End Ownership",
    description:
      "From architectural blueprints and UI prototyping to production rollout and ongoing scale optimization — we own the entire outcome.",
  },
];

export default function About() {
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
      <section className="relative z-10 pt-[22vh] pb-[12vh] px-6 md:px-12">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)] blur-[120px]" />

        <div className="mx-auto max-w-[1280px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center max-w-[900px] mx-auto"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#111111]/40 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3] mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>Who We Are</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.08]"
            >
              We engineer products for the{" "}
              <span className="bg-gradient-to-r from-white via-[#D0D0D0] to-[#888888] bg-clip-text text-transparent">
                future of digital business.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[#A3A3A3] font-light leading-relaxed max-w-[60ch] mx-auto"
            >
              Vincie Studios is an elite software engineering and design collective. We partner with ambitious founders and forward-thinking enterprises to build industry-defining platforms.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── STATS STRIP ──────────────── */}
      <section className="relative z-10 py-16 px-6 md:px-12 border-y border-white/[0.06] bg-[#0E0E0E]/60 backdrop-blur-sm">
        <div className="mx-auto max-w-[1000px]">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <AnimatedCounter target={50} suffix="+" />
              <span className="text-[10px] sm:text-xs font-semibold text-[#888888] uppercase tracking-[0.2em] mt-2">
                Projects Shipped
              </span>
            </div>
            <div className="flex flex-col items-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.08]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.08]" />
              <AnimatedCounter target={100} suffix="+" />
              <span className="text-[10px] sm:text-xs font-semibold text-[#888888] uppercase tracking-[0.2em] mt-2">
                Global Clients
              </span>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={5} suffix="+" />
              <span className="text-[10px] sm:text-xs font-semibold text-[#888888] uppercase tracking-[0.2em] mt-2">
                Years of Excellence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── PHILOSOPHY ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" />
                Our Philosophy
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                We don't build throwaway MVPs.<br />
                <span className="text-[#888]">We build market leaders.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#A3A3A3] font-light leading-relaxed mb-6">
                Too many agencies build quick prototypes that fall apart at scale. At Vincie Studios, we approach every build with architectural rigor, ensuring your codebase remains fast, clean, and extensible for years to come.
              </p>
              <p className="text-base sm:text-lg text-[#A3A3A3] font-light leading-relaxed">
                Whether you need a multi-tenant enterprise SaaS or a convert-first mobile application, we combine Silicon Valley engineering standards with bespoke design.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <div
                className="relative rounded-3xl overflow-hidden backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/saas-dashboard.jpg"
                    alt="SaaS Platform Engineering & Analytics"
                    className="w-full h-full object-cover grayscale contrast-125 opacity-85 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
                </div>
                <div className="p-8 sm:p-10 relative -mt-12 z-10">
                  <div className="w-12 h-12 rounded-xl bg-black/80 border border-white/[0.12] flex items-center justify-center mb-5 shadow-xl">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Precision Over Pace</h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light mb-6">
                    While others rush to deploy fragile code, we architect for longevity. Every database query, state transition, and API endpoint is built for flawless execution.
                  </p>
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#888]">
                    <span className="font-semibold uppercase tracking-wider text-white">Vincie Standard</span>
                    <span>100% Type-Safe & Tested</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── CORE VALUES ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12 bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easeOutQuint }}
            className="text-center mb-20"
          >
            <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-white/20" />
              Core Principles
              <span className="w-8 h-px bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-[#999] bg-clip-text text-transparent">
              Built on uncompromising standards.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: easeOutQuint }}
                  className="group relative flex flex-col p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-[#181818] border border-white/[0.08] group-hover:border-white/[0.18] transition-all">
                    <Icon className="w-5 h-5 text-white/80 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── CTA ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center">
        <div className="mx-auto max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutQuint }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to work with Vincie Studios?
            </h2>
            <p className="text-base sm:text-lg text-[#A3A3A3] font-light max-w-[45ch] mx-auto mb-10">
              Let's engineer your software vision into a market-leading reality.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-b from-white to-[#E5E5E5] text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
