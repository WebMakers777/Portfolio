import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We deep-dive into your business, users, and goals to define the perfect scope and technical requirements.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Architecture",
    description:
      "We design scalable system architecture and create detailed technical blueprints before writing a single line of code.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build & Iterate",
    description:
      "Agile development with weekly demos — you see real progress, give feedback, and shape the product in real time.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "We deploy to production, set up monitoring, and optimize performance — then help you scale with confidence.",
  },
];

export default function HowWeWork() {
  return (
    <section id="process" className="relative z-10 py-32 px-6 md:px-12 bg-gradient-to-b from-[#111111] to-[#0A0A0A]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: easeOutQuint }}
          className="text-center mb-20"
        >
          <div className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#A3A3A3] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/20" />
            Our Process
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-[#999] bg-clip-text text-transparent">
            How we work.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px">
            <motion.div
              className="h-full w-full bg-gradient-to-r from-white/[0.04] via-white/[0.12] to-white/[0.04]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: easeOutQuint }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: easeOutQuint,
                  }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Step Number + Icon */}
                  <div className="relative mb-8 w-[120px] h-[120px] flex items-center justify-center">
                    {/* Large faded number — offset to peek behind top-right of icon */}
                    <span className="absolute -top-1 left-[58%] text-[80px] font-black bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-transparent select-none leading-none">
                      {step.number}
                    </span>
                    {/* Icon circle overlay */}
                    <div className="relative w-14 h-14 rounded-2xl bg-[#151515] border border-white/[0.1] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)] group-hover:border-white/[0.2] group-hover:bg-[#1A1A1A] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] transition-all duration-500">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed font-light max-w-[26ch]">
                    {step.description}
                  </p>

                  {/* Mobile connecting arrow (visible on small screens) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-8 w-px h-8 bg-gradient-to-b from-white/[0.1] to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
