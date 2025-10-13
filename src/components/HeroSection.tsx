"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import heroBackground from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  // Smooth cursor-based parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const px = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const py = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Map to subtle translations for layers
  const layer1X = useTransform(px, [0, 1], [-15, 15]);
  const layer1Y = useTransform(py, [0, 1], [-15, 15]);
  const layer2X = useTransform(px, [0, 1], [10, -10]);
  const layer2Y = useTransform(py, [0, 1], [10, -10]);

  const onMouseMove: React.MouseEventHandler = (e) => {
    const { left, width, top, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  // Animated counters
  const Stat = ({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) => {
    const mv = useMotionValue(0);
    const [val, setVal] = useState(0);
    useEffect(() => {
      const controls = animate(mv, to, { duration: 1.8, ease: "easeOut" });
      const unsub = mv.on("change", (v) => setVal(Math.floor(v)));
      return () => {
        controls.stop();
        unsub();
      };
    }, [to]);
    return (
      <div className="text-center">
        <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
          {val}
          {suffix}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    );
  };

  const headline = ["Crafting", "Digital", "Experiences", "That", "Convert"];

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${(heroBackground as any).src ?? heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Parallax gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(35% 35% at 50% 50%, rgba(99,102,241,0.8), rgba(99,102,241,0) 70%)",
          x: layer1X,
          y: layer1Y,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(35% 35% at 50% 50%, rgba(16,185,129,0.8), rgba(16,185,129,0) 70%)",
          x: layer2X,
          y: layer2Y,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}
        >
          {/* Badge (no splash) */}
          <motion.div
            className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Premium Web Development Team
            </span>
          </motion.div>

          {/* Main Headline (no splash) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            {headline.map((w, i) => (
              <motion.span
                key={w + i}
                className={i === 1 ? "text-gradient" : ""}
                initial={{ opacity: 0, y: 30, rotateX: 25 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
              >
                {w}{" "}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle (no splash) */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            We&apos;re a team of passionate developers and designers who transform your ideas into
            stunning, high-performance Software that drive results and engage your audience.
          </motion.p>

          {/* CTAs (ONLY these have splashes) */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            <motion.button
              data-splash
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToWork}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium inline-flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              View Work <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              data-splash
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="px-6 py-3 rounded-xl border border-border bg-card/60 backdrop-blur-sm font-medium"
            >
              Let’s Talk
            </motion.button>
          </motion.div>

          {/* Stats (no splash) */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              { to: 5, label: "Projects Delivered", suffix: "+" },
              { to: 99, label: "Client Satisfaction", suffix: "%" },
              { to: 24, label: "Support Available", suffix: "/7" },
              { to: 2, label: "Years Experience", suffix: "+" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              >
                <Stat to={s.to} label={s.label} suffix={s.suffix} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
