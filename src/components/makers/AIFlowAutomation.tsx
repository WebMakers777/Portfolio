import React from "react";
import { motion } from "framer-motion";
import { Bullet } from "./Bullet";

export default function AIFlowAutomation({ className = "" }) {
  const modules = [
    { id: "crm", label: "CRM", x: 12, y: 35 },
    { id: "erp", label: "ERP", x: 18, y: 70 },
    { id: "bot", label: "WhatsApp Bot", x: 82, y: 30 },
    { id: "dash", label: "Dashboard", x: 80, y: 70 },
    { id: "store", label: "Data Lake", x: 50, y: 88 },
  ];
  const center = { x: 50, y: 50 };

  return (
    <section
      className={`relative w-full py-24 md:py-32 px-6 md:px-10 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          AI automations that save hours
        </h2>
        <p className="text-neutral-300 mb-8 max-w-2xl">
          Orchestrate workflows with LLMs, webhooks, schedulers, and
          event-driven jobs.
        </p>

        <div className="rounded-3xl p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 items-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-[360px] md:h-[420px]"
            >
              <defs>
                <radialGradient id="brain">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </radialGradient>
                <linearGradient id="pipe" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              <motion.circle
                cx={center.x}
                cy={center.y}
                r="14"
                fill="url(#brain)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
              <text
                x={center.x}
                y={center.y + 24}
                textAnchor="middle"
                className="fill-white opacity-80 text-[3.2px]"
              >
                AI Orchestrator
              </text>

              {modules.map((m, i) => (
                <g key={m.id}>
                  <motion.path
                    d={`M ${center.x} ${center.y} Q ${(center.x + m.x) / 2} ${
                      (center.y + m.y) / 2 - 10
                    } ${m.x} ${m.y}`}
                    fill="none"
                    stroke="url(#pipe)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    strokeLinecap="round"
                  />
                  <motion.circle
                    r="1.1"
                    fill="white"
                    initial={{ x: center.x, y: center.y, opacity: 0 }}
                    animate={{ x: m.x, y: m.y, opacity: 1 }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: 0.3 + i * 0.28,
                    }}
                  />
                  <motion.rect
                    x={m.x - 10}
                    y={m.y - 6}
                    width="20"
                    height="12"
                    rx="3"
                    fill="#0b1220"
                    stroke="#ffffff22"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                  />
                  <text
                    x={m.x}
                    y={m.y + 0.8}
                    textAnchor="middle"
                    className="fill-white opacity-90 text-[3px]"
                  >
                    {m.label}
                  </text>
                </g>
              ))}
            </svg>

            <div className="space-y-3">
              <Bullet
                title="AI Assistants"
                desc="Chatbots, RAG, fine-tuning, secure context"
              />
              <Bullet
                title="Robotic Processes"
                desc="Background jobs, queues, schedulers"
              />
              <Bullet
                title="Smart Integrations"
                desc="CRMs, ERPs, WhatsApp, Slack, email"
              />
              <Bullet
                title="Analytics"
                desc="Event pipelines, dashboards, alerts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
