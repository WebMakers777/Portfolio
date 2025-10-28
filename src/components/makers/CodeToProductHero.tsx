import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useParallax } from "./useParallax";
import { StatTile } from "./StatTile";

type Phase = "idle" | "typing" | "building" | "ui";

export default function CodeToProductHero({ className = "" }) {
  const rawLines = useMemo(
    () => [
      "const features = ['Auth', 'Billing', 'Analytics'];",
      "export default function App(){",
      "  return (",
      "    <Dashboard>",
      "      <KPI title=\"MRR\" value=\"₹18.2L\" />",
      "      <Chart type=\"area\" data={revenue} />",
      "      <Users active={1248} growth=\"+12%\" />",
      "    </Dashboard>",
      "  )",
      "}",
    ],
    []
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [typedCount, setTypedCount] = useState(0);
  const controls = useAnimation();
  const { ref, transform } = useParallax(20);
  const timers = useRef<number[]>([]);

  // start sequence
  const run = () => {
    clearTimers();
    setTypedCount(0);
    setPhase("typing");

    // type one line at a time
    const perLine = 120; // ms per line
    rawLines.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setTypedCount(i + 1), i * perLine)
      );
    });

    // after typing, show build overlay
    const typingTotal = rawLines.length * perLine + 400;
    timers.current.push(
      window.setTimeout(() => setPhase("building"), typingTotal)
    );

    // then morph to UI
    timers.current.push(
      window.setTimeout(() => setPhase("ui"), typingTotal + 1400)
    );
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setTypedCount(0);
  };

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    controls.start(phase === "ui" ? "ui" : "code");
  }, [phase, controls]);

  const codeToShow =
    phase === "typing" ? rawLines.slice(0, typedCount) : rawLines;

  return (
    <section className={`relative w-full py-24 md:py-32 px-6 md:px-10 ${className}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left copy */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            We turn <span className="text-emerald-400">code</span> into{" "}
            <span className="text-sky-400">products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg md:text-xl text-neutral-300"
          >
            Custom web & mobile software engineered for scale: React, Next.js, Node,
            Flutter, AWS.
          </motion.p>

          <div className="flex gap-3">
            {phase !== "ui" ? (
              <button
                onClick={run}
                className="px-5 py-3 rounded-2xl bg-emerald-500 text-black font-semibold shadow-emerald-500/30 shadow-lg hover:translate-y-[-1px] transition"
              >
                ▶ Run
              </button>
            ) : (
              <button
                onClick={reset}
                className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 transition"
              >
                Reset
              </button>
            )}
            <a
              href="#work"
              className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 transition"
            >
              View work
            </a>
          </div>
        </div>

        {/* Right: code → build → UI */}
        <div ref={ref} className="relative">
          <motion.div
            style={{ transform }}
            className="relative rounded-3xl p-5 bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 shadow-2xl"
          >
            {/* CODE PANEL */}
            <motion.div
              variants={{ code: { opacity: 1, scale: 1 }, ui: { opacity: 0, scale: 0.98 } }}
              animate={controls}
              className="font-mono text-sm md:text-base leading-6 bg-black/40 rounded-2xl p-5 border border-white/10 min-h-[260px]"
            >
              {codeToShow.map((l, i) => (
                <motion.pre
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="text-emerald-200/90"
                >
                  {l}
                </motion.pre>
              ))}

              {/* typing caret when in typing */}
              {phase === "typing" && (
                <span className="inline-block w-3 h-5 bg-emerald-300 animate-pulse ml-1 align-middle" />
              )}

              {/* build overlay */}
              {phase === "building" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl"
                >
                  <div className="w-[85%] max-w-md">
                    <div className="text-center text-neutral-200 mb-3 font-medium font-mono">
                      npm run build
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-sky-400"
                      />
                    </div>
                    <div className="text-center text-xs text-neutral-400 mt-2 font-mono">
                      bundling • optimizing • deploying…
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* UI PANEL */}
            <motion.div
              variants={{ code: { opacity: 0, scale: 1.02 }, ui: { opacity: 1, scale: 1 } }}
              animate={controls}
              className="absolute inset-0 p-5"
            >
              <div className="w-full h-full bg-neutral-900/60 rounded-2xl border border-white/10 p-4 grid grid-rows-[auto_1fr] gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-400">Dashboard</div>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse [animation-delay:200ms]" />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse [animation-delay:400ms]" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <StatTile title="MRR" value="₹18.2L" subtitle="+12% MoM" />
                  <StatTile title="Active Users" value="1,248" subtitle="+6%" />
                  <StatTile title="Latency" value="78ms" subtitle="-32%" />
                  <div className="col-span-3 h-36 rounded-xl bg-gradient-to-tr from-sky-500/20 to-emerald-500/20 border border-white/10 overflow-hidden">
                    <AnimatedAreaChart />
                  </div>
                </div>
              </div>

              {/* success toast on first reveal */}
              {phase === "ui" && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute top-4 right-6 px-3 py-2 rounded-xl bg-emerald-500 text-black font-medium shadow-lg"
                >
                  ✅ Deployed!
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedAreaChart() {
  const bars = new Array(26).fill(0).map((_, i) => Math.sin(i / 3) * 22 + 28 + (i % 3) * 6);
  return (
    <div className="flex items-end h-full px-4 gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0.25 }}
          animate={{ height: `${h}%`, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.03 }}
          className="w-2 bg-gradient-to-t from-sky-500/50 to-emerald-400/70 rounded"
        />
      ))}
    </div>
  );
}
