import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParallax } from "./useParallax";
import { Bullet } from "./Bullet";

// simple inline icons (no extra deps)
const Icon = {
  lock: () => (
    <path d="M8 9V7a4 4 0 1 1 8 0v2m-9 0h10v8H7V9Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
  card: () => (
    <>
      <rect x="6" y="8" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="6" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  brain: () => (
    <path
      d="M10 7a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3m0-7V6a2 2 0 0 0-2-2m2 6V8m4-1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3m0-7V6a2 2 0 0 1 2-2m-2 6V8"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  db: () => (
    <>
      <ellipse cx="12" cy="7" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M7 7v6c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M7 10c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
};

export default function APIConnectivityMap({ className = "" }) {
  const { ref, transform } = useParallax(12);
  const [hover, setHover] = useState<string | null>(null);

  const core = { x: 50, y: 52, r: 20 };
  const satellites = [
    { id: "auth", x: 20, y: 22, label: "Auth", icon: "lock" as const },
    { id: "pay", x: 82, y: 25, label: "Payments", icon: "card" as const },
    { id: "ai", x: 20, y: 82, label: "AI", icon: "brain" as const },
    { id: "db", x: 82, y: 80, label: "Database", icon: "db" as const },
  ];

  const pipes: Array<[number, number]> = [
    [core.x, core.y, /* to auth */ satellites[0].x, satellites[0].y],
  ] as any; // we won’t use this tuple—using map below

  return (
    <section className={`relative w-full py-24 md:py-32 px-6 md:px-10 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">API connectivity that scales globally</h2>
        <p className="text-neutral-300 mb-6 max-w-2xl">
          We wire up REST, GraphQL, webhooks, and streaming pipelines—securely and observably.
        </p>

        <div ref={ref} className="relative">
          <motion.div
            style={{ transform }}
            className="rounded-3xl p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 shadow-2xl"
          >
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
              {/* SVG network */}
              <svg viewBox="0 0 100 100" className="w-full h-[360px] md:h-[420px]">
                {/* defs */}
                <defs>
                  <radialGradient id="glowCore" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </radialGradient>
                  <linearGradient id="dash" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <filter id="soft">
                    <feGaussianBlur stdDeviation="2.2" />
                  </filter>
                </defs>

                {/* rotating ring behind core */}
                <motion.circle
                  cx={core.x}
                  cy={core.y}
                  r={core.r + 10}
                  fill="none"
                  stroke="url(#dash)"
                  strokeWidth="0.6"
                  strokeDasharray="2 6"
                  animate={{ rotate: 360 }}
                  transform={`rotate(0 ${core.x} ${core.y})`}
                  transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                  opacity={0.35}
                />

                {/* links */}
                {satellites.map((s, i) => {
                  const d = `M ${core.x} ${core.y} Q ${(core.x + s.x) / 2} ${(core.y + s.y) / 2 - 10} ${s.x} ${s.y}`;
                  return (
                    <g key={s.id}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="url(#dash)"
                        strokeWidth={hover === s.id || hover === "core" ? 1.2 : 0.8}
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0.5 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: i * 0.08 }}
                        filter="url(#soft)"
                      />
                      {/* flowing packet */}
                      <motion.circle
                        r="1.1"
                        fill="white"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
                        style={{ offsetPath: `path('${d}')` }}
                      />
                    </g>
                  );
                })}

                {/* core hexagon */}
                <g
                  onMouseEnter={() => setHover("core")}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "default" }}
                >
                  <motion.polygon
                    points={hexagonPoints(core.x, core.y, core.r).join(" ")}
                    fill="url(#glowCore)"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    filter="url(#soft)"
                  />
                  <text
                    x={core.x}
                    y={core.y + 1.5}
                    textAnchor="middle"
                    className="fill-white opacity-90 text-[4px] font-semibold"
                  >
                    Your App
                  </text>
                </g>

                {/* satellite nodes with icons + hover pop */}
                {satellites.map((s, i) => (
                  <g
                    key={s.id}
                    onMouseEnter={() => setHover(s.id)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      r={hover === s.id ? 8.5 : 7.5}
                      fill="url(#glowCore)"
                      stroke="#ffffff22"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      filter="url(#soft)"
                    />
                    <g transform={`translate(${s.x - 6}, ${s.y - 6})`} opacity={0.9}>
                      <svg viewBox="0 0 24 24" width="12" height="12">
                        <g stroke="currentColor" color="white">
                          {Icon[s.icon]()}
                        </g>
                      </svg>
                    </g>
                    <text
                      x={s.x}
                      y={s.y + 14}
                      textAnchor="middle"
                      className="fill-white opacity-80 text-[3.2px]"
                    >
                      {s.label}
                    </text>
                  </g>
                ))}
              </svg>

              {/* bullets */}
              <div className="space-y-3">
                <Bullet title="Secure by design" desc="OAuth, JWT, role-based access, audit trails" />
                <Bullet title="Observability" desc="Tracing, metrics, structured logs, alerts" />
                <Bullet title="Performance" desc="Queueing, caching, streams, backpressure" />
                <Bullet title="Reliability" desc="Retries, idempotency keys, circuit breakers" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// helpers
function hexagonPoints(cx: number, cy: number, r: number) {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}
