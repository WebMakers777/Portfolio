import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ServiceAbstractArtProps {
  slug: string;
  title: string;
  imageSrc: string;
  categoryLabel: string;
}

export default function ServiceAbstractArt({
  slug,
  title,
  imageSrc,
  categoryLabel,
}: ServiceAbstractArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden border border-white/[0.12] bg-[#000000] shadow-[0_25px_80px_rgba(0,0,0,0.95)] group aspect-[16/10] w-full cursor-crosshair"
    >
      {/* Background Deep Black Void */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Main Abstract White Glow Image */}
      <motion.img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover grayscale contrast-150 brightness-95 opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          transform: isHovered
            ? `scale(1.05) translate(${(mousePos.x - 0.5) * 12}px, ${(mousePos.y - 0.5) * 12}px)`
            : "scale(1)",
        }}
      />

      {/* Volumetric White Light Glow Mesh Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${
            mousePos.y * 100
          }%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Ambient Vignette & Shadow Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/60 via-transparent to-[#000000]/60" />

      {/* Floating Interactive Geometric Light Accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Glowing Orb 1 */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/[0.08] blur-3xl"
        />

        {/* Glowing Orb 2 */}
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-white/[0.1] blur-3xl"
        />
      </div>

      {/* Bottom Information Glass Card */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 flex items-end justify-between gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.1] shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-[420px]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#AAA]">
              {categoryLabel} • Monochromatic Standard
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {title}
          </h4>
          <p className="text-xs text-[#888888] font-light mt-0.5 line-clamp-1">
            Engineered with zero latency, pure white luminescent state, and fullstack precision.
          </p>
        </div>

        <div className="hidden sm:flex w-10 h-10 rounded-2xl bg-[#0A0A0A]/80 backdrop-blur-md border border-white/[0.15] items-center justify-center text-white shadow-lg shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
