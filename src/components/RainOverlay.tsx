"use client";

import { useEffect, useRef } from "react";

export default function RainOverlay({
  // ===== Base (desktop) controls =====
  density = 5,                 // number of falling drops (desktop base)
  speed = 0.3,                    // global fall-speed multiplier
  color = "#3BA7FF",
  maxLength = 22,
  minLength = 10,
  zIndex = 5,
  collideSelectors = ["[data-splash]"],
  collidePadding = 2,

  // ===== Splash realism controls =====
  splashDroplets = 5,          // avg droplets per impact (desktop)
  splashSpreadDeg = 70,         // total spread cone angle
  splashEnergy = 1,             // splash velocity scaler
  splashDrag = 0.985,           // horizontal damping per frame
  splashGravity = 1000,         // downward accel for splash droplets
  ripple = true,                // draw small, fading ripple rings
  rippleMaxRadius = 36,         // max ripple radius (desktop)
  rippleLineWidth = 1.2,        // ripple stroke width
  rippleFade = 0.9,             // fade factor per frame

  // ===== Mobile tuning (applies on < mobileBreakpoint) =====
  mobileBreakpoint = 768,
  mobileDensityFactor = 0.25,   // fewer rain drops
  mobileSizeFactor = 0.65,      // shorter/narrower streaks
  mobileSpeedFactor = 0.6,      // slower fall
  mobileWindFactor = 0.6,       // less sway
  mobileSplashCountFactor = 0.55,   // fewer splash droplets (but not zero)
  mobileSplashEnergyFactor = 0.75,  // softer splash velocity
  mobileRippleRadiusFactor = 0.7,   // smaller ripples
}: {
  density?: number;
  speed?: number;
  color?: string;
  maxLength?: number;
  minLength?: number;
  zIndex?: number;
  collideSelectors?: string[];
  collidePadding?: number;

  splashDroplets?: number;
  splashSpreadDeg?: number;
  splashEnergy?: number;
  splashDrag?: number;
  splashGravity?: number;
  ripple?: boolean;
  rippleMaxRadius?: number;
  rippleLineWidth?: number;
  rippleFade?: number;

  mobileBreakpoint?: number;
  mobileDensityFactor?: number;
  mobileSizeFactor?: number;
  mobileSpeedFactor?: number;
  mobileWindFactor?: number;
  mobileSplashCountFactor?: number;
  mobileSplashEnergyFactor?: number;
  mobileRippleRadiusFactor?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const collidersRef = useRef<DOMRect[]>([]);
  const isMobileRef = useRef(false);

  const sizeFactorRef = useRef(1);
  const speedFactorRef = useRef(1);
  const windFactorRef = useRef(1);
  const splashCountRef = useRef(splashDroplets);
  const splashEnergyRef = useRef(splashEnergy);
  const rippleRadiusRef = useRef(rippleMaxRadius);
  const targetDensityRef = useRef(density);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = 1;

    type Drop = {
      x: number; y: number; prevY: number;
      vx: number; vy: number; len: number; wid: number; a: number; z: number; windPhase: number;
    };

    type Splash = {
      x: number; y: number; vx: number; vy: number; life: number; a: number; wid: number;
    };

    type Ripple = {
      x: number; y: number; r: number; life: number; alive: boolean;
    };

    const drops: Drop[] = [];
    const splashes: Splash[] = [];
    const ripples: Ripple[] = [];

    const updateMobileTuning = () => {
      isMobileRef.current = window.innerWidth < mobileBreakpoint;

      sizeFactorRef.current   = isMobileRef.current ? mobileSizeFactor   : 1;
      speedFactorRef.current  = isMobileRef.current ? mobileSpeedFactor  : 1;
      windFactorRef.current   = isMobileRef.current ? mobileWindFactor   : 1;

      splashCountRef.current  = Math.max(
        2,
        Math.round(splashDroplets * (isMobileRef.current ? mobileSplashCountFactor : 1))
      );
      splashEnergyRef.current = splashEnergy * (isMobileRef.current ? mobileSplashEnergyFactor : 1);
      rippleRadiusRef.current = rippleMaxRadius * (isMobileRef.current ? mobileRippleRadiusFactor : 1);

      const factor = isMobileRef.current ? mobileDensityFactor : 1;
      targetDensityRef.current = Math.max(1, Math.round(density * factor));
    };

    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const computeColliders = () => {
      const rects: DOMRect[] = [];
      collideSelectors.forEach((sel) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) rects.push(r);
        });
      });
      collidersRef.current = rects;
    };

    const reconcileDensity = () => {
      const target = targetDensityRef.current;
      if (drops.length < target) {
        const need = target - drops.length;
        for (let i = 0; i < need; i++) spawnDrop(Math.random() * canvas.clientHeight);
      } else if (drops.length > target) {
        drops.splice(target);
      }
    };

    const onResize = () => {
      updateMobileTuning();
      setSize();
      computeColliders();
      reconcileDensity();
    };

    const onScroll = () => computeColliders();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    // ----- Spawners -----
    const spawnDrop = (yStart?: number) => {
      const z = Math.random();
      const vyBase = (400 + Math.random() * 380) * (0.65 + z * 0.6);
      const vy = vyBase * speed * speedFactorRef.current;

      const sizeFactor = sizeFactorRef.current;
      const len =
        (Math.random() * (maxLength - minLength) + minLength) *
        (0.7 + z * 0.5) *
        sizeFactor;
      const wid = (0.8 + z * 1.1) * sizeFactor;

      const x = Math.random() * canvas.clientWidth;
      const y = yStart ?? -Math.random() * canvas.clientHeight * 0.6;
      drops.push({
        x, y, prevY: y,
        vx: (Math.random() * 10 - 5) * (0.4 + z * 0.6),
        vy, len, wid, a: 0.45 + z * 0.45, z,
        windPhase: Math.random() * Math.PI * 2,
      });
    };

    const spawnSplash = (x: number, y: number, normalAngle = -Math.PI / 2) => {
      // fan-shaped emission around the surface normal
      const count = splashCountRef.current;
      const spread = (splashSpreadDeg * Math.PI) / 180;
      const half = spread / 2;
      const energy = splashEnergyRef.current;

      for (let i = 0; i < count; i++) {
        const t = i / Math.max(1, count - 1);
        // cosine interpolation for denser center
        const off = (t - 0.5);
        const angle = normalAngle + off * spread + (Math.random() - 0.5) * (spread * 0.15);
        const speed = (180 + Math.random() * 220) * energy; // px/s
        const vx = Math.cos(angle) * speed * (0.7 + Math.random() * 0.6);
        const vy = Math.sin(angle) * speed * (0.7 + Math.random() * 0.6);

        splashes.push({
          x, y, vx, vy,
          life: 0.18 + Math.random() * 0.32,
          a: 0.35 + Math.random() * 0.25,
          wid: 0.8 * sizeFactorRef.current,
        });
      }

      if (ripple) {
        ripples.push({
          x, y,
          r: 1,
          life: 1,
          alive: true,
        });
        // cap ripples to avoid memory growth
        if (ripples.length > 200) ripples.splice(0, ripples.length - 200);
      }

      // cap splashes too
      if (splashes.length > 1200) splashes.splice(0, splashes.length - 1200);
    };

    // ----- Init -----
    updateMobileTuning();
    setSize();
    computeColliders();
    for (let i = 0; i < targetDensityRef.current; i++) {
      spawnDrop(Math.random() * canvas.clientHeight);
    }

    canvas.style.color = color;
    const stroke = () => getComputedStyle(canvas).color;

    // ----- Loop -----
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.strokeStyle = stroke();

      const t = now / 1000;
      const windGlobal =
        (Math.sin(t * 0.7) * 35 + Math.sin(t * 1.43) * 18) * windFactorRef.current;

      // ===== Rain drops =====
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];

        d.prevY = d.y;
        const wind =
          windGlobal * (0.3 + 0.7 * d.z) +
          Math.sin(t * 2 + d.windPhase) * 8 * d.z * windFactorRef.current;

        d.x += (d.vx + wind) * dt;
        d.y += d.vy * dt;

        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;

        // collision with top edges of colliders
        let hit = false;
        for (const r of collidersRef.current) {
          const top = r.top - collidePadding;
          if (d.prevY < top && d.y >= top && d.x >= r.left && d.x <= r.right) {
            spawnSplash(d.x, top, -Math.PI / 2); // normal pointing up
            drops.splice(i, 1);
            spawnDrop();
            hit = true;
            break;
          }
        }
        if (hit) continue;

        // ground
        if (d.y > h - 2) {
          spawnSplash(d.x, h - 2, -Math.PI / 2);
          drops.splice(i, 1);
          spawnDrop();
          continue;
        }

        // draw streak
        ctx.globalAlpha = d.a;
        ctx.lineWidth = d.wid;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - d.len);
        ctx.lineTo(d.x + 0.8 * d.z, d.y);
        ctx.stroke();

        // highlight
        ctx.globalAlpha = d.a * 0.5;
        ctx.lineWidth = Math.max(0.5, d.wid * 0.6);
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.beginPath();
        ctx.moveTo(d.x - 0.2, d.y - d.len * 0.6);
        ctx.lineTo(d.x + 0.4 * d.z, d.y - d.len * 0.1);
        ctx.stroke();
        ctx.strokeStyle = stroke();
      }

      // ===== Splash droplets =====
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.life -= dt;
        if (s.life <= 0) {
          splashes.splice(i, 1);
          continue;
        }
        s.vy += splashGravity * dt;   // gravity
        s.vx *= splashDrag;           // air drag
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        // fade faster near end
        const lifeAlpha = Math.max(0, Math.min(1, s.life * 4));
        ctx.globalAlpha = s.a * lifeAlpha;
        ctx.lineWidth = s.wid;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.vx * 0.02, s.y + s.vy * 0.02);
        ctx.stroke();
      }

      // ===== Ripples =====
      if (ripple) {
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = rippleLineWidth * sizeFactorRef.current;
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          if (!rp.alive) {
            ripples.splice(i, 1);
            continue;
          }
          rp.r += 60 * dt * (0.8 + 0.4 * Math.random());
          rp.life *= rippleFade;
          if (rp.r > rippleRadiusRef.current || rp.life < 0.03) rp.alive = false;

          ctx.globalAlpha = 0.25 * rp.life;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // keep density in sync after resizes
      if (drops.length !== targetDensityRef.current) {
        reconcileDensity();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!rafRef.current) {
        last = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    color,
    density,
    maxLength,
    minLength,
    speed,
    collideSelectors,
    collidePadding,

    splashDroplets,
    splashSpreadDeg,
    splashEnergy,
    splashDrag,
    splashGravity,
    ripple,
    rippleMaxRadius,
    rippleLineWidth,
    rippleFade,

    mobileBreakpoint,
    mobileDensityFactor,
    mobileSizeFactor,
    mobileSpeedFactor,
    mobileWindFactor,
    mobileSplashCountFactor,
    mobileSplashEnergyFactor,
    mobileRippleRadiusFactor,
  ]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    />
  );
}
