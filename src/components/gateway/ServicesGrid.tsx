import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Layers,
  Code2,
  Monitor,
  Smartphone,
  Cloud,
  Megaphone,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  X,
} from "lucide-react";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  brief: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

const services: Service[] = [
  {
    id: "saas",
    icon: Layers,
    label: "SaaS Development",
    brief: "Multi-tenant platforms built for scale",
    description:
      "End-to-end SaaS platform engineering — multi-tenant architecture, subscription billing, user dashboards, and analytics. We handle the full lifecycle from MVP to enterprise-grade scale.",
    deliverables: [
      "Multi-tenant Architecture",
      "Subscription & Billing Integration",
      "Admin Dashboards & Analytics",
      "Role-based Access Control",
      "API-first Design",
    ],
    tags: ["React", "Next.js", "Node.js", "Stripe", "AWS"],
  },
  {
    id: "custom",
    icon: Code2,
    label: "Custom Software",
    brief: "Bespoke solutions for unique workflows",
    description:
      "Tailored software engineered from the ground up for your unique business processes — ERP systems, CRM platforms, inventory management, and internal tools designed specifically for how you operate.",
    deliverables: [
      "Business Process Automation",
      "Custom ERP & CRM Systems",
      "Internal Tools & Portals",
      "Legacy System Modernization",
      "Third-party Integrations",
    ],
    tags: ["TypeScript", "Python", "PostgreSQL", "Docker", "Redis"],
  },
  {
    id: "web",
    icon: Monitor,
    label: "Web Applications",
    brief: "High-performance, pixel-perfect experiences",
    description:
      "Responsive web applications with stunning UI, real-time features, and enterprise-grade security. From complex data dashboards to consumer-facing platforms — built for performance.",
    deliverables: [
      "Responsive & Adaptive UI",
      "Real-time Data & WebSockets",
      "Progressive Web Apps (PWA)",
      "SEO & Performance Optimization",
      "Accessibility Compliance",
    ],
    tags: ["React", "Next.js", "Tailwind", "GraphQL", "WebSocket"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile Development",
    brief: "Native & cross-platform mobile apps",
    description:
      "Beautiful, performant mobile applications for iOS and Android — from consumer-facing apps to enterprise mobility solutions with offline-first architecture and seamless sync.",
    deliverables: [
      "Cross-platform Development",
      "Native iOS & Android",
      "Push Notifications & Deep Links",
      "Offline-first Architecture",
      "App Store Optimization",
    ],
    tags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud & DevOps",
    brief: "Scalable infrastructure, zero downtime",
    description:
      "Production-grade cloud infrastructure, CI/CD pipelines, auto-scaling, monitoring, and security hardening — we architect, deploy, and manage your entire cloud ecosystem so you can focus on growth.",
    deliverables: [
      "Cloud Architecture Design",
      "CI/CD Pipeline Setup",
      "Auto-scaling & Load Balancing",
      "Monitoring, Logging & Alerts",
      "Security & Compliance Audits",
    ],
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    label: "Digital Marketing",
    brief: "Performance campaigns that convert",
    description:
      "Data-driven digital marketing with measurable ROI — social media management, paid acquisition, content strategy, and SEO that turns attention into revenue and builds lasting brand equity.",
    deliverables: [
      "Social Media Management",
      "Paid Advertising (Meta & Google)",
      "Content Strategy & Creation",
      "SEO & Search Marketing",
      "Analytics & Attribution",
    ],
    tags: ["Meta Ads", "Google Ads", "SEO", "Analytics", "Content"],
  },
];

export default function ServicesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = services.find((s) => s.id === activeId);

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
            From SaaS platforms to custom enterprise software — we engineer,
            design, and scale your entire digital presence.
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
              transition: { staggerChildren: 0.08, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16"
        >
          {services.map((service) => {
            const Icon = service.icon;
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
                onClick={() => setActiveId(isActive ? null : service.id)}
                className="group relative flex flex-col p-8 rounded-2xl cursor-pointer transition-all duration-500 ease-out"
                style={{
                  background: isActive
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(12px)",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.15)"
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
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent transition-opacity duration-700 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 border ${
                      isActive
                        ? "bg-white/[0.1] border-white/[0.15] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "bg-[#1A1A1A] border-white/[0.08] group-hover:bg-[#222] group-hover:border-white/[0.12]"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {service.label}
                  </h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light">
                    {service.brief}
                  </p>

                  {/* Expand indicator */}
                  <div
                    className={`mt-5 flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-[#666] group-hover:text-[#999]"
                    }`}
                  >
                    {isActive ? "Close" : "Learn More"}
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </motion.div>
                  </div>
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
              animate={{ opacity: 1, height: "auto", marginTop: 20 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: easeOutQuint }}
              className="overflow-hidden"
            >
              <div
                className="relative p-10 md:p-14 rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
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

                {/* Ambient glow inside panel */}
                <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left: Description */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center">
                        <activeService.icon className="w-5 h-5 text-white/90" />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {activeService.label}
                      </h3>
                    </div>
                    <p className="text-[#A3A3A3] leading-relaxed text-base font-light mb-8">
                      {activeService.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {activeService.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] uppercase font-semibold tracking-wider px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-white/[0.08] text-[#D4D4D4] shadow-inner"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Deliverables */}
                  <div>
                    <h4 className="text-[11px] uppercase font-bold tracking-[0.15em] text-[#A3A3A3] mb-5">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-3">
                      {activeService.deliverables.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.08,
                            ease: easeOutQuint,
                          }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                          <span className="text-[#D4D4D4] text-sm font-medium">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#D4D4D4] transition-colors group/cta"
                    >
                      Discuss this service
                      <ArrowUpRight className="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                    </a>
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
