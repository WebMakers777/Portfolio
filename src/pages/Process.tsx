import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Layers,
  PenTool,
  Database,
  Cpu,
  Code2,
  Sparkles,
  ShieldCheck,
  GitBranch,
  Cloud,
  Rocket,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/gateway/Navbar";
import Footer from "@/components/gateway/Footer";
import WhatsAppFloat from "@/components/WhatsappFloat";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Strategy",
    timeframe: "Week 1",
    row: 1,
    description:
      "Deep-dive stakeholder audit, user journey mapping, and technical feasibility scoping.",
    details: [
      "User persona mapping & user journey flows",
      "Technical feasibility & dependency auditing",
      "Core KPI definition & risk mitigation plan",
    ],
  },
  {
    number: "02",
    icon: Layers,
    title: "System Architecture",
    timeframe: "Week 1–2",
    row: 1,
    description:
      "High-level architecture blueprints, microservices boundaries, and data flow modeling.",
    details: [
      "Microservices & modular monolith topology",
      "High-throughput caching & state strategy",
      "Security protocols & compliance blueprint",
    ],
  },
  {
    number: "03",
    icon: PenTool,
    title: "UI/UX & Design Tokens",
    timeframe: "Weeks 2–3",
    row: 1,
    description:
      "Tactile high-fidelity Figma design systems, interactive prototypes, and WCAG accessibility.",
    details: [
      "Custom design token architecture",
      "Interactive 60fps micro-animations",
      "Responsive layout for all screen sizes",
    ],
  },
  {
    number: "04",
    icon: Database,
    title: "Database Modeling",
    timeframe: "Weeks 3–4",
    row: 1,
    description:
      "Relational schema design, Row-Level Security (RLS), and ACID transaction constraints.",
    details: [
      "PostgreSQL schemas with Prisma/Drizzle",
      "Redis distributed cache layer",
      "Multi-tenant isolation patterns",
    ],
  },
  {
    number: "05",
    icon: Cpu,
    title: "Core API & Services",
    timeframe: "Weeks 4–5",
    row: 2,
    description:
      "Type-safe REST / GraphQL / tRPC endpoints, background queues, and webhook pipelines.",
    details: [
      "End-to-end TypeScript contracts",
      "BullMQ asynchronous job workers",
      "Third-party integrations (Stripe, Twilio)",
    ],
  },
  {
    number: "06",
    icon: Code2,
    title: "Frontend Engineering",
    timeframe: "Weeks 5–7",
    row: 2,
    description:
      "Edge-rendered Next.js/React applications, optimistic state updates, and sub-100ms response.",
    details: [
      "Edge-side partial prerendering",
      "Zustand & TanStack Query caching",
      "Tailwind CSS & Radix UI primitives",
    ],
  },
  {
    number: "07",
    icon: Sparkles,
    title: "AI & Automation Flows",
    timeframe: "Weeks 7–8",
    row: 2,
    description:
      "Autonomous LLM agents, enterprise RAG vector search, and automated webhook workflows.",
    details: [
      "LangChain / LlamaIndex orchestration",
      "Vector embeddings with pgvector",
      "Deterministic JSON extraction schemas",
    ],
  },
  {
    number: "08",
    icon: ShieldCheck,
    title: "Rigorous QA & Testing",
    timeframe: "Weeks 8–9",
    row: 2,
    description:
      "Automated end-to-end testing, penetration audits, and Core Web Vitals optimization.",
    details: [
      "Playwright end-to-end test suites",
      "Unit & integration coverage > 90%",
      "Security fuzzing and vulnerability scans",
    ],
  },
  {
    number: "09",
    icon: GitBranch,
    title: "Staging & Demos",
    timeframe: "Weeks 9–10",
    row: 3,
    description:
      "Isolated preview environments, weekly stakeholder demos, and rapid sprint feedback.",
    details: [
      "Branch preview deployments on PRs",
      "Weekly live demos and backlog steering",
      "User acceptance testing (UAT)",
    ],
  },
  {
    number: "10",
    icon: Cloud,
    title: "Cloud Infrastructure",
    timeframe: "Week 10",
    row: 3,
    description:
      "Terraform IaC provisioning, Kubernetes clusters, and automated CI/CD GitOps pipelines.",
    details: [
      "AWS / GCP multi-AZ high availability",
      "Docker & Kubernetes pod auto-scaling",
      "GitHub Actions automated release gates",
    ],
  },
  {
    number: "11",
    icon: Rocket,
    title: "Zero-Downtime Launch",
    timeframe: "Week 11",
    row: 3,
    description:
      "Blue/green cutover, CDN edge cache warming, DNS routing, and 24/7 launch telemetry.",
    details: [
      "Seamless zero-downtime DNS cutover",
      "Telemetry, Sentry & Prometheus alarms",
      "Global Cloudflare CDN optimization",
    ],
  },
  {
    number: "12",
    icon: TrendingUp,
    title: "Scale & Advisory",
    timeframe: "Week 12+",
    row: 3,
    description:
      "Post-launch performance audits, automated backups, and ongoing engineering advisory.",
    details: [
      "99.99% uptime SLA maintenance",
      "15-minute point-in-time recovery backups",
      "Continuous feature roadmap expansion",
    ],
  },
];

/*
 * SCROLL PHASES (total track = 600vh):
 *
 *  0.00 – 0.18   Row 1 laser traces left→right across 01→04
 *  0.18 – 0.30   Curve draws down-right while content slides up to Row 2
 *  0.30 – 0.48   Row 2 laser traces right→left across 08→07→06→05
 *  0.48 – 0.60   Curve draws down-left while content slides up to Row 3
 *  0.60 – 0.78   Row 3 laser traces left→right across 09→10→11→12
 *  0.78 – 1.00   Section unpins
 *
 * SVG path proportions (approx):
 *   Row1 horiz = 0.231,  Curve1 = 0.154,  Row2 horiz = 0.231,  Curve2 = 0.154,  Row3 horiz = 0.231
 *   Cumulative: 0, 0.231, 0.385, 0.615, 0.769, 1.0
 */

const ROW_H = 320;
const ROW_GAP = 60;
const SHIFT = ROW_H + ROW_GAP;

/*
 * Card activation thresholds — precisely matched to laser position.
 *
 * Row 1 (left→right):  01@0.00,  02@0.06,  03@0.12,  04@0.18
 * Row 2 (right→left):  08@0.30,  07@0.36,  06@0.42,  05@0.48
 * Row 3 (left→right):  09@0.60,  10@0.66,  11@0.72,  12@0.78
 */
const STEP_THRESHOLDS: Record<string, number> = {
  "01": 0.00,
  "02": 0.06,
  "03": 0.12,
  "04": 0.18,
  "05": 0.48, // Row 2 reversed — 05 is last hit
  "06": 0.42,
  "07": 0.36,
  "08": 0.30, // Row 2 reversed — 08 is first hit
  "09": 0.60,
  "10": 0.66,
  "11": 0.72,
  "12": 0.78,
};

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.0001,
  });

  // Content vertical shift
  const contentY = useTransform(
    smooth,
    [0, 0.18, 0.30, 0.48, 0.60, 1],
    [0, 0, -SHIFT, -SHIFT, -SHIFT * 2, -SHIFT * 2]
  );

  // Laser pathLength — curves draw DURING slide phases (smooth visual continuity)
  const laserProgress = useTransform(
    smooth,
    [0, 0.18, 0.30, 0.48, 0.60, 0.78],
    [0, 0.231, 0.385, 0.615, 0.769, 1.0]
  );

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#0A0A0A] overflow-x-clip font-inter">
      <Navbar />

      {/* Cinematic noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='3' type='fractalNoise' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative z-10 pt-[22vh] pb-[10vh] px-6 md:px-12">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] blur-[120px]" />

        <div className="mx-auto max-w-[1280px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutQuint }}
            className="max-w-[850px] mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#111111]/40 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A3A3A3] mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>12-Stage Engineering Pipeline</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
              Engineered for speed,{" "}
              <span className="bg-gradient-to-r from-white via-[#D0D0D0] to-[#888888] bg-clip-text text-transparent">
                calibrated for scale.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#A3A3A3] font-light leading-relaxed max-w-[58ch] mx-auto mb-8">
              Our structured 12-stage engineering lifecycle moves seamlessly
              from discovery and schema modeling to AI automation, cloud
              orchestration, and launch.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#888] uppercase tracking-widest bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full">
              <span>Scroll to trace the pipeline</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PINNED 12-STEP SERPENTINE SECTION ═══════════════ */}
      <section ref={sectionRef} className="relative z-20" style={{ height: "600vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
          {/* Soft edge fades */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0A0A0A] to-transparent z-30" />
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#0A0A0A] to-transparent z-30" />

          {/* Sliding content */}
          <motion.div
            style={{ y: contentY }}
            className="absolute inset-x-0 will-change-transform"
          >
            <div
              className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12"
              style={{ paddingTop: "calc(50vh - 170px)" }}
            >
              {/* SVG serpentine path */}
              <div
                className="absolute inset-x-6 md:inset-x-12 top-0 pointer-events-none z-10"
                style={{
                  paddingTop: "calc(50vh - 170px)",
                  height: `calc(${ROW_H * 3 + ROW_GAP * 2}px + 50vh - 170px)`,
                }}
              >
                <svg
                  className="w-full"
                  style={{ height: `${ROW_H * 3 + ROW_GAP * 2}px` }}
                  viewBox="0 0 1200 1040"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                      <stop offset="30%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="70%" stopColor="#F0F0F0" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
                      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
                      <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur3" />
                      <feMerge>
                        <feMergeNode in="blur3" />
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Faint dashed guide */}
                  <path
                    d="M 150,100 L 1050,100
                       C 1190,100 1190,490 1050,490
                       L 150,490
                       C 10,490 10,880 150,880
                       L 1050,880"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="6 10"
                  />

                  {/* Active glowing laser */}
                  <motion.path
                    d="M 150,100 L 1050,100
                       C 1190,100 1190,490 1050,490
                       L 150,490
                       C 10,490 10,880 150,880
                       L 1050,880"
                    stroke="url(#laserGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    style={{ pathLength: laserProgress }}
                  />
                </svg>
              </div>

              {/* 3 rows × 4 step cards */}
              <div className="relative z-20 flex flex-col" style={{ gap: `${ROW_GAP}px` }}>
                {[1, 2, 3].map((rowNum) => {
                  const rowSteps = processSteps.filter((s) => s.row === rowNum);
                  return (
                    <div
                      key={rowNum}
                      className="grid grid-cols-4 gap-6 lg:gap-8"
                      style={{ minHeight: `${ROW_H}px` }}
                    >
                      {rowSteps.map((step) => {
                        const Icon = step.icon;
                        const threshold = STEP_THRESHOLDS[step.number];

                        return (
                          <StepCard
                            key={step.number}
                            step={step}
                            Icon={Icon}
                            progress={smooth}
                            threshold={threshold}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── STICKY LEFT + SCROLLING GLASS CARDS RIGHT ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

            {/* ── LEFT: Sticky text column ── */}
            <div className="lg:w-[38%] lg:shrink-0">
              <div className="lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: easeOutQuint }}
                >
                  <div className="text-[12px] uppercase font-bold tracking-[0.2em] text-white/60 mb-5 flex items-center gap-3">
                    <span className="w-6 h-px bg-white/30" />
                    In-Depth Specifications
                  </div>

                  <h2 className="text-3xl md:text-[44px] font-bold tracking-tight text-white leading-[1.1] mb-6">
                    Every phase,{" "}
                    <span className="bg-gradient-to-r from-white to-[#888] bg-clip-text text-transparent">
                      precisely engineered.
                    </span>
                  </h2>

                  <p className="text-[15px] text-[#999] font-light leading-relaxed mb-8 max-w-[38ch]">
                    We believe great software is built on meticulous engineering — clear architecture, rigorous testing, and a relentless drive to deliver value at every stage.
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                  >
                    Get started
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  {/* Subtle stats */}
                  <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-[11px] text-[#888] uppercase tracking-widest mt-1">Engineering Phases</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-[11px] text-[#888] uppercase tracking-widest mt-1">Uptime SLA</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">90%+</div>
                      <div className="text-[11px] text-[#888] uppercase tracking-widest mt-1">Test Coverage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">2-Week</div>
                      <div className="text-[11px] text-[#888] uppercase tracking-widest mt-1">Sprint Cycles</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── RIGHT: Scrolling glassmorphic cards (2-column grid) ── */}
            <div className="lg:w-[62%]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.65,
                        delay: (i % 2) * 0.08,
                        ease: easeOutQuint,
                      }}
                      className="group relative rounded-2xl p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow:
                          "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Hover glow accent */}
                      <div className="pointer-events-none absolute -top-20 -right-20 w-40 h-40 bg-white/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Top glass shine line */}
                      <div className="pointer-events-none absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

                      {/* Header row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[9px] font-bold text-[#777] uppercase tracking-[0.15em]">
                              Phase {step.number}
                            </div>
                            <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <span className="text-[9px] font-semibold text-[#777] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06] shrink-0">
                          {step.timeframe}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[12px] text-[#999] leading-relaxed font-light mb-5">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                        {step.details.map((detail) => (
                          <div key={detail} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-white/50 mt-0.5 shrink-0" />
                            <span className="text-[11px] text-[#CCC] font-medium leading-tight">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────── CTA ──────────────── */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center border-t border-white/[0.06]">
        <div className="mx-auto max-w-[800px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutQuint }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Ready to initiate Phase 01?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOutQuint }}
            className="text-base sm:text-lg text-[#A3A3A3] font-light max-w-[45ch] mx-auto mb-10"
          >
            Book a discovery call to review your architecture, scope, and
            product timeline with our lead engineers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOutQuint }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-b from-white to-[#E5E5E5] text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              Start Your Project
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

/* ═══════════════════════════════════════════════════════════════
 *  STEP CARD
 * ═══════════════════════════════════════════════════════════════ */
function StepCard({
  step,
  Icon,
  progress,
  threshold,
}: {
  step: (typeof processSteps)[0];
  Icon: React.ComponentType<{ className?: string }>;
  progress: MotionValue<number>;
  threshold: number;
}) {
  // Card fade & scale
  const opacity = useTransform(
    progress,
    [threshold - 0.06, threshold - 0.02, threshold, threshold + 0.03],
    [0.2, 0.45, 1, 1]
  );
  const scale = useTransform(
    progress,
    [threshold - 0.04, threshold, threshold + 0.05],
    [0.92, 1.04, 1]
  );

  // Subtle upward float
  const cardY = useTransform(
    progress,
    [threshold - 0.04, threshold, threshold + 0.04],
    [6, 0, 0]
  );

  // BIG NUMBER — scales up when active
  const numberScale = useTransform(
    progress,
    [threshold - 0.04, threshold, threshold + 0.06],
    [1, 1.2, 1.08]
  );

  return (
    <motion.div
      style={{ opacity, scale, y: cardY }}
      className="relative flex flex-col items-center text-center select-none group will-change-transform"
    >
      {/* Node area */}
      <div className="relative mb-6 flex items-center justify-center" style={{ width: 140, height: 130 }}>
        {/* Big faded step number — scales up, no highlight */}
        <motion.span
          style={{ scale: numberScale }}
          className="absolute -top-2 left-[50%] text-[100px] font-black bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-transparent select-none leading-none pointer-events-none will-change-transform origin-center"
        >
          {step.number}
        </motion.span>

        {/* Circular icon container — matches reference */}
        <div className="relative w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/[0.12] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:border-white/[0.25] group-hover:scale-105 transition-all duration-400">
          <Icon className="w-[18px] h-[18px] text-white/90" />
        </div>
      </div>

      {/* Title — bold, clean */}
      <h3 className="text-base font-bold text-white mb-3 tracking-tight">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-[#999] leading-relaxed font-light max-w-[24ch]">
        {step.description}
      </p>
    </motion.div>
  );
}
