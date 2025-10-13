// src/pages/Gateway.tsx
import { Link } from "react-router-dom";

export default function Gateway() {
  return (
    <main className="relative min-h-screen w-full bg-[#0B1120] text-white overflow-hidden">
      {/* ---------- Background décor (subtle grid + floating glows) ---------- */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.075] grid-noise" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full blur-3xl bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-transparent animate-float-slower" />

      {/* ---------- Header / Quote ---------- */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 pt-14 text-center">
        <p className="text-xs tracking-widest text-white/60 uppercase mb-2">
          DevCraft Studio
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Crafting Digital Experiences that
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300">
            Build Products & Grow Brands
          </span>
        </h1>
        <p className="mt-4 text-white/70 max-w-3xl mx-auto">
          “Makers turn ideas into products. Builders turn stories into demand.”
          Choose your path below.
        </p>
      </header>

      {/* ---------- Cards ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Makers */}
          <Link
            to="/makers"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition will-change-transform animate-fade-up delay-100"
            aria-label="Enter The Makers site"
          >
            {/* Shine */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl group-hover:opacity-100 opacity-80 transition" />
            {/* Content */}
            <div className="relative aspect-[4/3] md:aspect-[3/2] p-8 flex flex-col items-start justify-end">
              <span className="text-xs px-2 py-1 rounded-full bg-cyan-400/15 text-cyan-200 border border-cyan-400/20 mb-3">
                Product Development & Engineering
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                The Forge
              </h2>
              <p className="mt-4 text-white/70 max-w-[42ch]">
                Where powerful ideas are forged into reality.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:translate-x-1 transition">
                Enter The Forge →
              </span>
            </div>
            {/* Bottom border glow */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          </Link>

          {/* Builders */}
          <Link
            to="/builders"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition will-change-transform animate-fade-up delay-200"
            aria-label="Enter The Builders site"
          >
            {/* Shine */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl group-hover:opacity-100 opacity-80 transition" />
            {/* Content */}
            <div className="relative aspect-[4/3] md:aspect-[3/2] p-8 flex flex-col items-start justify-end">
              <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/20 mb-3">
                Digital Marketing & Social Media
              </span>
              <h2 className="text-3xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                The Growth Engine
              </h2>
              <p className="mt-4 text-white/70 max-w-[44ch]">
                Accelerating your brand's presence and engagement.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:translate-x-1 transition">
                Experience The Growth →
              </span>
            </div>
            {/* Bottom border glow */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
          </Link>
        </div>
      </section>

      {/* ---------- Footer note ---------- */}
      <footer className="relative z-10 pb-10 text-center text-white/50 text-xs">
        © {new Date().getFullYear()} DevCraft Studio — The Forge & The Growth Engine
      </footer>
    </main>
  );
}
