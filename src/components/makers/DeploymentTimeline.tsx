import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  { k: "idea", t: "Idea", d: "Workshop & scope" },
  { k: "design", t: "Design", d: "UX flows & UI kit" },
  { k: "dev", t: "Development", d: "APIs, web, mobile" },
  { k: "qa", t: "QA", d: "Automated & manual" },
  { k: "deploy", t: "Deployment", d: "CI/CD to cloud" },
  { k: "support", t: "Support", d: "SLA & iterations" },
];

export default function DeploymentTimeline({ className = "" }) {
  return (
    <section className={`relative w-full py-24 md:py-32 px-6 md:px-10 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">From idea to production</h2>
        <p className="text-neutral-300 mb-8 max-w-2xl">A transparent, milestone-driven process that ships reliably.</p>

        <div className="relative overflow-x-auto">
          <div className="min-w-[760px] grid grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="uppercase tracking-wide text-xs text-neutral-400">Step {i + 1}</div>
                </div>
                <div className="text-xl font-semibold">{s.t}</div>
                <div className="text-sm text-neutral-300">{s.d}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="origin-left h-1 mt-6 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
