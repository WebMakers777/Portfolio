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
      '      <KPI title="MRR" value="₹18.2L" />',
      '      <Chart type="area" data={revenue} />',
      '      <Users active={1248} growth="+12%" />',
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
    <section
      className={`relative w-full py-12 sm:py-16 md:py-24 lg:py-32 px-3 sm:px-6 md:px-10 ${className}`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-stretch md:items-center">
        {/* Left copy */}
        <div className="space-y-4 md:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight"
          >
            We turn <span className="text-emerald-400">code</span> into{" "}
            <span className="text-sky-400">products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl text-neutral-300 leading-relaxed"
          >
            Custom web & mobile software engineered for scale: React, Next.js,
            Node, Flutter, AWS.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            {phase !== "ui" ? (
              <button
                onClick={run}
                className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3 rounded-2xl bg-emerald-500 text-black font-semibold shadow-emerald-500/30 shadow-lg hover:translate-y-[-1px] transition text-sm sm:text-base lg:text-base"
              >
                ▶ Run
              </button>
            ) : (
              <button
                onClick={reset}
                className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 transition text-sm sm:text-base lg:text-base"
              >
                Reset
              </button>
            )}
            <a
              href="#work"
              className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 transition text-sm sm:text-base lg:text-base"
            >
              View work
            </a>
          </div>
        </div>

        {/* Right: code → build → UI */}
        <div
          ref={ref}
          className="relative w-full min-h-[200px] sm:min-h-[240px] md:min-h-[320px] lg:min-h-[400px] xl:min-h-[480px]"
        >
          <motion.div
            style={{ transform }}
            className="relative rounded-lg sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 shadow-2xl w-full h-full"
          >
            {/* CODE PANEL */}
            <motion.div
              variants={{
                code: { opacity: 1, scale: 1 },
                ui: { opacity: 0, scale: 0.98 },
              }}
              animate={controls}
              className="font-mono text-xs sm:text-sm md:text-base lg:text-base xl:text-lg leading-4 sm:leading-5 md:leading-6 lg:leading-7 bg-black/40 rounded-lg md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 border border-white/10 min-h-[200px] sm:min-h-[240px] md:min-h-[320px] lg:min-h-[400px] xl:min-h-[480px] overflow-y-auto"
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
                  className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg md:rounded-2xl"
                >
                  <div className="w-[90%] max-w-sm px-3 sm:px-4">
                    <div className="text-center text-neutral-200 mb-2 sm:mb-3 font-medium font-mono text-xs sm:text-sm">
                      npm run build
                    </div>
                    <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-sky-400"
                      />
                    </div>
                    <div className="text-center text-[10px] sm:text-xs text-neutral-400 mt-1.5 sm:mt-2 font-mono">
                      bundling • optimizing • deploying…
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* UI PANEL */}
            <motion.div
              variants={{
                code: { opacity: 0, scale: 1.02 },
                ui: { opacity: 1, scale: 1 },
              }}
              animate={controls}
              className="absolute inset-0 p-3 sm:p-4 md:p-5 lg:p-6"
            >
              <div className="w-full h-full bg-neutral-900/60 rounded-xl md:rounded-2xl border border-white/10 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 grid grid-rows-[auto_1fr] gap-2 md:gap-3 lg:gap-4">
                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-base">
                  <div className="text-neutral-400">Dashboard</div>
                  <div className="flex gap-1.5 md:gap-2 lg:gap-3">
                    <span className="w-1.5 md:w-2 lg:w-2.5 h-1.5 md:h-2 lg:h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-1.5 md:w-2 lg:w-2.5 h-1.5 md:h-2 lg:h-2.5 rounded-full bg-sky-400 animate-pulse [animation-delay:200ms]" />
                    <span className="w-1.5 md:w-2 lg:w-2.5 h-1.5 md:h-2 lg:h-2.5 rounded-full bg-violet-400 animate-pulse [animation-delay:400ms]" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5 md:gap-3 lg:gap-4">
                  <StatTile title="MRR" value="₹18.2L" subtitle="+12% MoM" />
                  <StatTile title="Active Users" value="1,248" subtitle="+6%" />
                  <StatTile title="Latency" value="78ms" subtitle="-32%" />
                  <div className="col-span-3 h-24 sm:h-32 md:h-36 lg:h-48 xl:h-56 rounded-lg md:rounded-xl bg-gradient-to-tr from-sky-500/20 to-emerald-500/20 border border-white/10 overflow-hidden">
                    <AnimatedAreaChart />
                  </div>
                </div>
              </div>

              {/* success toast on first reveal */}
              {phase === "ui" && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute top-2 sm:top-3 md:top-4 lg:top-8 right-3 sm:right-4 md:right-6 lg:right-8 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-lg md:rounded-xl bg-emerald-500 text-black font-medium text-xs sm:text-sm lg:text-base shadow-lg"
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
  const bars = new Array(26)
    .fill(0)
    .map((_, i) => Math.sin(i / 3) * 22 + 28 + (i % 3) * 6);
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
