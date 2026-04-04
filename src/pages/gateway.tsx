import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  MessageSquare,
  Instagram,
  ArrowUpRight,
  Zap,
  Gem,
  Target,
  ArrowDown,
  Globe,
  Layers,
  Code2,
  Megaphone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WhatsAppFloat from "@/components/WhatsappFloat";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (used as Tailwind arbitrary values)
   Base:      #060B18
   Surface:   #0D1321
   Gold:      #C8A04E
   Gold-lt:   #D4AD5F
   Text-1:    #F0EDE6  (warm cream)
   Text-2:    #8B93A7  (muted slate)
   Text-3:    #5B6478  (dimmed)
   Border:    rgba(255,255,255,0.06)
   Gold-brd:  rgba(200,160,78,0.25)
────────────────────────────────────────────── */

// Noise grain — inline SVG data URI for subtle film-grain texture
const GRAIN_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.7' numOctaves='4' type='fractalNoise' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ──────── Animation presets (subtle, refined) ────────
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// ──────── Animated counter hook ────────
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            // ease-out quad
            const val = Math.round(end * (1 - (1 - t) * (1 - t)));
            setCount(val);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return { count, ref };
}

// ════════════════════════════════════════════
//  GATEWAY  (main export)
// ════════════════════════════════════════════
export default function Gateway() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // scroll-to from router state
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

  // sticky nav opacity
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // stat counters
  const projects = useCounter(50);
  const clients  = useCounter(100);
  const years    = useCounter(5);

  return (
    <main className="relative min-h-screen w-full bg-[#060B18] text-[#F0EDE6] overflow-hidden font-inter">
      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.025] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI }}
      />

      {/* ── Ambient warm glow (very faint) ── */}
      <div className="pointer-events-none absolute top-[-20rem] left-1/2 -translate-x-1/2 h-[50rem] w-[50rem] rounded-full blur-[160px] bg-[#C8A04E]/[0.035]" />
      <div className="pointer-events-none absolute bottom-[-16rem] right-[-8rem] h-[36rem] w-[36rem] rounded-full blur-[140px] bg-[#C8A04E]/[0.02]" />

      {/* ── Top gold accent bar ── */}
      <div className="fixed top-0 inset-x-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-[#C8A04E]/60 to-transparent" />

      {/* ═══════ STICKY NAV ═══════ */}
      <motion.nav
        className={`fixed top-[2px] inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#060B18]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" aria-label="Home">
            <img
              src="/vinciestudio.png"
              alt="Vincie Studios"
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium tracking-wide text-[#F0EDE6]/80 group-hover:text-[#F0EDE6] transition-colors hidden sm:inline">
              Vincie Studios
            </span>
          </a>

          {/* Right nav */}
          <div className="flex items-center gap-6">
            <Link
              to="/blog"
              className="text-sm text-[#8B93A7] hover:text-[#F0EDE6] transition-colors duration-200"
            >
              Journal
            </Link>
            <a
              href="#contact"
              className="text-sm font-medium px-5 py-2 rounded-lg bg-[#C8A04E] text-[#060B18] hover:bg-[#D4AD5F] transition-colors duration-200"
            >
              Start a Project
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ═══════ HERO ═══════ */}
      <motion.section
        className="relative z-10 mx-auto max-w-5xl px-6 pt-36 pb-20 md:pt-44 md:pb-28"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Section label */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.25em] text-[#C8A04E] uppercase mb-8"
          variants={fadeUp}
        >
          Engineering · Marketing · Design
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-tight"
          variants={fadeUp}
        >
          We build products.
          <br />
          <span className="text-[#C8A04E]">We grow brands.</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          className="mt-8 text-[#8B93A7] max-w-[52ch] text-base md:text-lg leading-relaxed"
          variants={fadeUp}
        >
          Vincie Studios is where engineering meets storytelling. We ship
          production-grade software through{" "}
          <span className="text-[#F0EDE6]/90">ElixorTech</span> and build
          brand presence through{" "}
          <span className="text-[#F0EDE6]/90">ClickCrafters</span> — two
          studios, one standard of excellence.
        </motion.p>

        {/* CTA row */}
        <motion.div className="mt-10 flex flex-wrap gap-4" variants={fadeUp}>
          <a
            href="#contact"
            id="hero-cta-primary"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C8A04E] text-[#060B18] px-7 py-3.5 text-sm font-semibold hover:bg-[#D4AD5F] transition-colors duration-200"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#divisions"
            id="hero-cta-secondary"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] text-[#F0EDE6] px-7 py-3.5 text-sm font-medium hover:bg-white/[0.04] transition-colors duration-200"
          >
            Explore Our Work
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.section>

      {/* ─── Thin divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ═══════ STATS ═══════ */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {/* — Projects — */}
          <motion.div className="text-center md:text-left" variants={fadeUp}>
            <div
              ref={projects.ref}
              className="text-3xl md:text-5xl font-bold text-[#F0EDE6] tabular-nums"
            >
              {projects.count}+
            </div>
            <p className="mt-2 text-xs md:text-sm text-[#5B6478] uppercase tracking-wider">
              Projects Shipped
            </p>
          </motion.div>

          {/* — Clients — */}
          <motion.div className="text-center" variants={fadeUp}>
            <div
              ref={clients.ref}
              className="text-3xl md:text-5xl font-bold text-[#F0EDE6] tabular-nums"
            >
              {clients.count}+
            </div>
            <p className="mt-2 text-xs md:text-sm text-[#5B6478] uppercase tracking-wider">
              Clients Served
            </p>
          </motion.div>

          {/* — Years — */}
          <motion.div className="text-center md:text-right" variants={fadeUp}>
            <div
              ref={years.ref}
              className="text-3xl md:text-5xl font-bold text-[#F0EDE6] tabular-nums"
            >
              {years.count}+
            </div>
            <p className="mt-2 text-xs md:text-sm text-[#5B6478] uppercase tracking-wider">
              Years in the Industry
            </p>
          </motion.div>
        </div>

        <motion.p
          className="mt-10 text-center text-sm text-[#5B6478]"
          variants={fadeUp}
        >
          Trusted by startups and growing businesses across India&nbsp;&&nbsp;beyond.
        </motion.p>
      </motion.section>

      {/* ─── Thin divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ═══════ DIVISIONS ═══════ */}
      <motion.section
        id="divisions"
        className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section label */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.25em] text-[#C8A04E] uppercase mb-4"
          variants={fadeUp}
        >
          Our Studios
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight"
          variants={fadeUp}
        >
          Two studios. One vision.
        </motion.h2>
        <motion.p
          className="text-[#8B93A7] max-w-[48ch] mb-14 text-base leading-relaxed"
          variants={fadeUp}
        >
          Product engineering that ships, and marketing that scales — working
          in lockstep so every launch has momentum from day one.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── ElixorTech card ── */}
          <motion.div variants={fadeUp}>
            <a
              href="https://elixortech.com"
              target="_blank"
              rel="noopener noreferrer"
              id="card-elixortech"
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 min-h-[360px] hover:border-[#C8A04E]/20 transition-all duration-500"
              aria-label="Visit ElixorTech website"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center mb-8">
                <Code2 className="w-5 h-5 text-[#C8A04E]" />
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#5B6478] uppercase">
                  Product Development & Engineering
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mt-2 tracking-tight">
                  ElixorTech
                </h3>
                <p className="mt-4 text-[#8B93A7] text-sm leading-relaxed max-w-[38ch]">
                  From concept to production — high-performance web and mobile
                  applications engineered for scale. React, Next.js, Node,
                  Flutter, and cloud-native infrastructure.
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["React / Next.js", "Node.js", "Flutter", "AWS", "AI & Automation"].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#C8A04E]/8 text-[#8B93A7] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#C8A04E] group-hover:gap-3 transition-all duration-300">
                  Visit ElixorTech
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom accent line */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C8A04E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </motion.div>

          {/* ── ClickCrafters card ── */}
          <motion.div variants={fadeUp}>
            <Link
              to="/clickcrafters"
              id="card-clickcrafters"
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 min-h-[360px] hover:border-[#C8A04E]/20 transition-all duration-500"
              aria-label="Explore ClickCrafters"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center mb-8">
                <Megaphone className="w-5 h-5 text-[#C8A04E]" />
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#5B6478] uppercase">
                  Digital Marketing & Social Media
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mt-2 tracking-tight">
                  ClickCrafters
                </h3>
                <p className="mt-4 text-[#8B93A7] text-sm leading-relaxed max-w-[38ch]">
                  Strategic content, data-driven campaigns, and creative that
                  converts. We turn brands into movements through social
                  media, paid acquisition, and audience building.
                </p>

                {/* Marketing tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Social Media", "Paid Ads", "Content Studio", "UGC & Influencer", "Brand Strategy"].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#C8A04E]/8 text-[#8B93A7] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#C8A04E] group-hover:gap-3 transition-all duration-300">
                  Explore ClickCrafters
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom accent line */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C8A04E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Thin divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ═══════ CAPABILITIES ═══════ */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p
          className="font-mono text-[11px] tracking-[0.25em] text-[#C8A04E] uppercase mb-4"
          variants={fadeUp}
        >
          Why Us
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold tracking-tight mb-14"
          variants={fadeUp}
        >
          What drives our work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 hover:border-[#C8A04E]/15 transition-all duration-500"
            variants={fadeUp}
          >
            <div className="w-10 h-10 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center mb-6">
              <Zap className="w-5 h-5 text-[#C8A04E]" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Speed & Scale</h3>
            <p className="text-[#8B93A7] text-sm leading-relaxed">
              We ship fast. MVPs in weeks, not months. Our architecture scales
              from launch day to enterprise loads without a rewrite.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 hover:border-[#C8A04E]/15 transition-all duration-500"
            variants={fadeUp}
          >
            <div className="w-10 h-10 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center mb-6">
              <Gem className="w-5 h-5 text-[#C8A04E]" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Craft & Precision</h3>
            <p className="text-[#8B93A7] text-sm leading-relaxed">
              Every interface hand-crafted. Every interaction considered.
              Design that earns trust, holds attention, and drives action.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 hover:border-[#C8A04E]/15 transition-all duration-500"
            variants={fadeUp}
          >
            <div className="w-10 h-10 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center mb-6">
              <Target className="w-5 h-5 text-[#C8A04E]" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Strategy & Results</h3>
            <p className="text-[#8B93A7] text-sm leading-relaxed">
              No vanity metrics. Every campaign, every feature backed by data
              and tied directly to business outcomes that matter.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Thin divider ─── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ═══════ SERVICES ═══════ */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p
          className="font-mono text-[11px] tracking-[0.25em] text-[#C8A04E] uppercase mb-4"
          variants={fadeUp}
        >
          Services
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold tracking-tight mb-14"
          variants={fadeUp}
        >
          A unified approach to digital
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engineering */}
          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10"
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#C8A04E]" />
              </div>
              <h3 className="font-semibold text-lg">Product & Engineering</h3>
            </div>
            <p className="text-[#8B93A7] text-sm leading-relaxed mb-6">
              We build high-performance, scalable web and mobile applications.
              From custom software and UI/UX design to AI-powered automations
              — ideas become enterprise-grade products.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "React / Next.js",
                "Node.js / Python",
                "UI/UX Design",
                "Flutter / React Native",
                "AI & Automation",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#C8A04E]/8 text-[#C8A04E]/80 border border-[#C8A04E]/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Marketing */}
          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10"
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#C8A04E]" />
              </div>
              <h3 className="font-semibold text-lg">Brand & Marketing</h3>
            </div>
            <p className="text-[#8B93A7] text-sm leading-relaxed mb-6">
              We build scroll-stopping brands. Performance-driven digital
              marketing campaigns, studio-quality social content, and paid ad
              strategies that convert attention into revenue.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Social Media Mgmt",
                "Content Studio (Reels)",
                "Paid Ads (Meta/Google)",
                "Influencer & UGC",
                "Brand Strategy",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-[#C8A04E]/8 text-[#C8A04E]/80 border border-[#C8A04E]/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════ CTA BAND ═══════ */}
      <motion.section
        className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.25em] text-[#C8A04E] uppercase mb-6">
            Next Step
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            Ready to build something remarkable?
          </h2>
          <p className="text-[#8B93A7] mb-10 leading-relaxed">
            Whether you need a product that scales or a brand that resonates
            — we're ready when you are.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C8A04E] text-[#060B18] px-8 py-4 text-sm font-semibold hover:bg-[#D4AD5F] transition-colors duration-200"
          >
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.section>

      {/* ═══════ CONTACT ═══════ */}
      <ContactSection />

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-6">
        <div className="h-px bg-white/[0.06] mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5B6478]">
            © {new Date().getFullYear()} Vincie Studios — ElixorTech &
            ClickCrafters. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/blog"
              className="text-xs text-[#5B6478] hover:text-[#8B93A7] transition-colors"
            >
              Journal
            </Link>
            <a
              href="https://elixortech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#5B6478] hover:text-[#8B93A7] transition-colors"
            >
              ElixorTech
            </a>
            <Link
              to="/clickcrafters"
              className="text-xs text-[#5B6478] hover:text-[#8B93A7] transition-colors"
            >
              ClickCrafters
            </Link>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </main>
  );
}

// ════════════════════════════════════════════
//  CONTACT SECTION  (internal component)
// ════════════════════════════════════════════
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

  const SCRIPT_URL = "/api/contact";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "gateway",
        utm: window.location.search || "",
      };
      const resp = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data;
      try {
        data = await resp.json();
      } catch {
        data = { success: resp.ok };
      }
      if (data?.success) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data?.error || "Submission failed");
      }
    } catch (err) {
      console.error("Submit error", err);
      toast({
        title: "Unable to send message",
        description: "There was a problem sending your message. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Divider */}
      <div className="h-px bg-white/[0.06] mb-16" />

      {/* Header */}
      <motion.div className="mb-14" variants={fadeUp}>
        <p className="font-mono text-[11px] tracking-[0.25em] text-[#C8A04E] uppercase mb-4">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          Get in touch
        </h2>
        <p className="text-[#8B93A7] max-w-[50ch] leading-relaxed">
          Have a project in mind? We'd love to hear about it. Send us a
          message and we'll respond within 24 hours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* ── Info column ── */}
        <motion.div className="space-y-8" variants={fadeUp}>
          <div className="space-y-5">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#C8A04E]" />
              </div>
              <div>
                <p className="text-sm font-medium mb-0.5">Email</p>
                <a
                  href="mailto:vinciestudios@gmail.com"
                  className="text-sm text-[#8B93A7] hover:text-[#F0EDE6] transition-colors"
                >
                  vinciestudios@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#C8A04E]" />
              </div>
              <div>
                <p className="text-sm font-medium mb-0.5">Phone</p>
                <a
                  href="tel:+917375038069"
                  className="text-sm text-[#8B93A7] hover:text-[#F0EDE6] transition-colors"
                >
                  +91 73750 38069
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C8A04E]/10 border border-[#C8A04E]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#C8A04E]" />
              </div>
              <div>
                <p className="text-sm font-medium mb-0.5">Location</p>
                <p className="text-sm text-[#8B93A7]">
                  Jaipur, Rajasthan, 302031
                </p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-medium mb-4">Follow us</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/studiovincie/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:border-[#C8A04E]/25 hover:text-[#C8A04E] text-[#8B93A7] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vincie-studios-034378398/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:border-[#C8A04E]/25 hover:text-[#C8A04E] text-[#8B93A7] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/7375038069"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:border-[#C8A04E]/25 hover:text-[#C8A04E] text-[#8B93A7] transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Form column ── */}
        <motion.div variants={fadeUp}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium mb-2 text-[#F0EDE6]/80"
              >
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[#F0EDE6] placeholder:text-[#5B6478] focus:outline-none focus:border-[#C8A04E]/40 focus:ring-1 focus:ring-[#C8A04E]/20 transition-all text-sm"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium mb-2 text-[#F0EDE6]/80"
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[#F0EDE6] placeholder:text-[#5B6478] focus:outline-none focus:border-[#C8A04E]/40 focus:ring-1 focus:ring-[#C8A04E]/20 transition-all text-sm"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium mb-2 text-[#F0EDE6]/80"
              >
                Project Details
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[#F0EDE6] placeholder:text-[#5B6478] focus:outline-none focus:border-[#C8A04E]/40 focus:ring-1 focus:ring-[#C8A04E]/20 transition-all text-sm resize-none"
                placeholder="Tell us about your project, timeline, and budget..."
              />
            </div>

            <button
              type="submit"
              id="contact-submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8A04E] text-[#060B18] py-3.5 px-6 font-semibold text-sm hover:bg-[#D4AD5F] disabled:opacity-50 transition-colors duration-200"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};
