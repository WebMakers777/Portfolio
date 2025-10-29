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
  const [cardPositions, setCardPositions] = React.useState<
    Array<{ x: number; y: number }>
  >([]);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll("[data-card]");
      const positions = Array.from(cards).map((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });
      setCardPositions(positions);

      // Check if desktop view (6 columns in 1 row)
      const isDesktopView =
        positions.length === 6 &&
        Math.abs(positions[0].y - positions[5].y) < 20;
      setIsDesktop(isDesktopView);
    };

    calculatePositions();
    const resizeObserver = new ResizeObserver(calculatePositions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const getPathData = () => {
    if (cardPositions.length === 0) return "";

    // Desktop view: simple horizontal line
    if (isDesktop) {
      const firstCard = cardPositions[0];
      const lastCard = cardPositions[5];
      return `M ${firstCard.x} ${firstCard.y} L ${lastCard.x} ${lastCard.y}`;
    }

    // Mobile/Tablet view: Snake pattern: 1->2->3, down, 6->5->4
    const sequence = [0, 1, 2, 5, 4, 3]; // indices in order
    const points = sequence.map((i) => cardPositions[i]);

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const prev = points[i - 1];

      // Check if we're moving to a new row (y position changes significantly)
      const isNewRow = Math.abs(current.y - prev.y) > 20;

      if (isNewRow) {
        // Single right angle turn: go right then down
        const cornerDistance = 40;
        path += ` L ${prev.x + cornerDistance} ${prev.y}`;
        path += ` L ${prev.x + cornerDistance} ${current.y}`;
        path += ` L ${current.x} ${current.y}`;
      } else {
        // Same row, straight line
        path += ` L ${current.x} ${current.y}`;
      }
    }

    return path;
  };

  return (
    <section
      className={`relative w-full py-24 md:py-32 lg:py-48 px-6 md:px-10 lg:px-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
          From idea to production
        </h2>
        <p className="text-neutral-300 mb-8 lg:mb-12 max-w-2xl text-base md:text-lg">
          A transparent, milestone-driven process that ships reliably.
        </p>

        <div className="relative" ref={containerRef}>
          {/* SVG connector line for mobile/tablet */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none lg:hidden"
            style={{
              height: "400px",
              overflow: "visible",
            }}
            viewBox={`0 0 ${containerRef.current?.offsetWidth || 1000} 400`}
          >
            <motion.path
              d={getPathData()}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              stroke="url(#lineGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>

          {/* Horizontal line for desktop */}
          <motion.div
            className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full transform -translate-y-1/2 pointer-events-none"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ originX: 0 }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-8 relative z-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.k}
                data-card
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.05 }}
                className="p-2 md:p-3 lg:p-5 rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10"
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 lg:mb-4">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="uppercase tracking-wide text-[10px] md:text-xs lg:text-sm text-neutral-400">
                    Step {i + 1}
                  </div>
                </div>
                <div className="text-sm md:text-base lg:text-2xl font-semibold leading-tight">
                  {s.t}
                </div>
                <div className="text-[10px] md:text-xs lg:text-base text-neutral-300 leading-tight">
                  {s.d}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
