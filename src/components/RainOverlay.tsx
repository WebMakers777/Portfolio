"use client";

import { useEffect, useRef } from "react";

export default function RainOverlay({
  // ===== Base (desktop) controls =====
  density = 5,
  speed = 0.3,
  color = "#3BA7FF",
  maxLength = 22,
  minLength = 10,
  zIndex = 5,
  collideSelectors = ["[data-splash]"],
  collidePadding = 2,

  // ===== Splash realism controls =====
  splashDroplets = 5,
  splashSpreadDeg = 70,
  splashEnergy = 1,
  splashDrag = 0.985,
  splashGravity = 1000,
  ripple = true,
  rippleMaxRadius = 36,
  rippleLineWidth = 1.2,
  rippleFade = 0.9,

  // ===== Mobile tuning =====
  mobileBreakpoint = 768,
  mobileDensityFactor = 0.25,
  mobileSizeFactor = 0.65,
  mobileSpeedFactor = 0.6,
  mobileWindFactor = 0.6,
  mobileSplashCountFactor = 0.55,
  mobileSplashEnergyFactor = 0.75,
  mobileRippleRadiusFactor = 0.7,

  // ===== NEW: laptop tuning & auto-governor =====
  laptopMin = 1024,                  // typical laptop min width
  laptopMax = 1600,                  // typical laptop max width
  laptopDensityFactor = 0.6,         // reduce intensity on laptops
  governor = true,                   // enable FPS-based governor
  governorSample = 24,               // frames per decision window
  governorTargetFps = 50,            // prefer >= target FPS
  governorMaxDrop = 1.0,             // allow up to 100% of target density
  governorMinDrop = 0.35,            // never go below 35% of target density
  governorEase = 0.08,               // easing for density adjustments
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

  laptopMin?: number;
  laptopMax?: number;
  laptopDensityFactor?: number;

  governor?: boolean;
  governorSample?: number;
  governorTargetFps?: number;
  governorMaxDrop?: number;
  governorMinDrop?: number;
  governorEase?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const collidersRef = useRef<DOMRect[]>([]);
  const colliderRosRef = useRef<ResizeObserver[]>([]);
  const isMobileRef = useRef(false);
  const isLaptopRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const sizeFactorRef = useRef(1);
  const speedFactorRef = useRef(1);
  const windFactorRef = useRef(1);
  const splashCountRef = useRef(splashDroplets);
  const splashEnergyRef = useRef(splashEnergy);
  const rippleRadiusRef = useRef(rippleMaxRadius);

  const baseTargetDensityRef = useRef(density);   // density after device-class adjustments (mobile/laptop/RM)
  const governedFactorRef = useRef(1);            // 0..1 factor applied by governor
  const displayDensityRef = useRef(0);            // final rounded count used in sim

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

    // ---------- Device class + reduced motion
    const updateDeviceClasses = () => {
      const w = window.innerWidth;
      isMobileRef.current = w < mobileBreakpoint;
      isLaptopRef.current = w >= laptopMin && w <= laptopMax;
      reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      sizeFactorRef.current   = isMobileRef.current ? mobileSizeFactor : 1;
      speedFactorRef.current  = (isMobileRef.current ? mobileSpeedFactor : 1) * (reducedMotionRef.current ? 0.7 : 1);
      windFactorRef.current   = (isMobileRef.current ? mobileWindFactor : 1);

      splashCountRef.current  = Math.max(
        2,
        Math.round(splashDroplets * (isMobileRef.current ? mobileSplashCountFactor : 1))
      );
      splashEnergyRef.current = splashEnergy * (isMobileRef.current ? mobileSplashEnergyFactor : 1);
      rippleRadiusRef.current = rippleMaxRadius * (isMobileRef.current ? mobileRippleRadiusFactor : 1);

      // Base density with class modifiers
      let base = density;
      if (isMobileRef.current) base *= mobileDensityFactor;
      else if (isLaptopRef.current) base *= laptopDensityFactor;
      if (reducedMotionRef.current) base *= 0.6;

      baseTargetDensityRef.current = Math.max(1, Math.round(base));
    };

    // ---------- Canvas sizing
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

    // ---------- Colliders
    const computeColliders = () => {
      collidersRef.current = [];
      colliderRosRef.current.forEach((ro) => ro.disconnect());
      colliderRosRef.current = [];

      const els: HTMLElement[] = [];
      collideSelectors.forEach((sel) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (el.offsetWidth && el.offsetHeight) els.push(el);
        })
      );

      const updateRects = () => {
        const rects: DOMRect[] = [];
        els.forEach((el) => rects.push(el.getBoundingClientRect()));
        collidersRef.current = rects;
      };

      updateRects();
      els.forEach((el) => {
        const ro = new ResizeObserver(updateRects);
        ro.observe(el);
        colliderRosRef.current.push(ro);
      });
    };

    // ---------- Density reconcile
    const reconcileDensity = () => {
      const target = Math.round(baseTargetDensityRef.current * governedFactorRef.current);
      displayDensityRef.current = target;

      if (drops.length < target) {
        const need = target - drops.length;
        for (let i = 0; i < need; i++) spawnDrop(Math.random() * canvas.clientHeight);
      } else if (drops.length > target) {
        drops.splice(target);
      }
    };

    // ---------- Spawners
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
      const count = splashCountRef.current;
      const spread = (splashSpreadDeg * Math.PI) / 180;
      const energy = splashEnergyRef.current;

      for (let i = 0; i < count; i++) {
        const t = i / Math.max(1, count - 1);
        const off = t - 0.5;
        const angle = normalAngle + off * spread + (Math.random() - 0.5) * (spread * 0.15);
        const speedPx = (180 + Math.random() * 220) * energy;
        const vx = Math.cos(angle) * speedPx * (0.7 + Math.random() * 0.6);
        const vy = Math.sin(angle) * speedPx * (0.7 + Math.random() * 0.6);

        splashes.push({
          x, y, vx, vy,
          life: 0.18 + Math.random() * 0.32,
          a: 0.35 + Math.random() * 0.25,
          wid: 0.8 * sizeFactorRef.current,
        });
      }

      if (ripple) {
        ripples.push({ x, y, r: 1, life: 1, alive: true });
        if (ripples.length > 200) ripples.splice(0, ripples.length - 200);
      }
      if (splashes.length > 1200) splashes.splice(0, splashes.length - 1200);
    };

    // ---------- Init
    updateDeviceClasses();
    setSize();
    computeColliders();
    for (let i = 0; i < Math.round(baseTargetDensityRef.current); i++) {
      spawnDrop(Math.random() * canvas.clientHeight);
    }

    canvas.style.color = color;
    const stroke = () => getComputedStyle(canvas).color;

    // ---------- Governor sampling
    let sampleCount = 0;
    let timeAcc = 0;
    let last = performance.now();

    // ---------- Loop
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // governor sample
      if (governor) {
        timeAcc += dt;
        sampleCount++;
        if (sampleCount >= governorSample) {
          const avgFps = sampleCount / timeAcc;
          let targetFactor = governedFactorRef.current;

          if (avgFps < governorTargetFps) {
            // lower density a bit
            targetFactor = Math.max(governorMinDrop, governedFactorRef.current * 0.9);
          } else {
            // ease up toward max
            targetFactor = Math.min(governorMaxDrop, governedFactorRef.current * 1.03);
          }

          governedFactorRef.current =
            governedFactorRef.current + (targetFactor - governedFactorRef.current) * governorEase;

          sampleCount = 0;
          timeAcc = 0;
          reconcileDensity();
        }
      }

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

        // subtle jitter for more natural look
        const jitter = (Math.sin(t * 27 + d.windPhase * 1.7) + Math.cos(t * 19 + d.windPhase)) * 0.6;
        const wind =
          windGlobal * (0.3 + 0.7 * d.z) +
          Math.sin(t * 2 + d.windPhase) * 8 * d.z * windFactorRef.current +
          jitter;

        d.x += (d.vx + wind) * dt;
        d.y += d.vy * dt;

        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;

        // collision with top edges of colliders
        let hit = false;
        for (const r of collidersRef.current) {
          const top = r.top - collidePadding;
          if (d.prevY < top && d.y >= top && d.x >= r.left && d.x <= r.right) {
            spawnSplash(d.x, top, -Math.PI / 2);
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

        // streak
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
        s.vy += splashGravity * dt;
        s.vx *= splashDrag;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

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

      // keep density synced (handles manual resizes)
      if (drops.length !== Math.round(baseTargetDensityRef.current * governedFactorRef.current)) {
        reconcileDensity();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // ---------- Events
    const onResize = () => {
      updateDeviceClasses();
      setSize();
      computeColliders();
      reconcileDensity();
    };

    window.addEventListener("resize", onResize, { passive: true });

    // start
    let start = performance.now();
    rafRef.current = requestAnimationFrame((t) => {
      start = t;
      loop(t);
    });

    const onVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!rafRef.current) {
        const now = performance.now();
        rafRef.current = requestAnimationFrame((t) => loop(t ?? now));
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      colliderRosRef.current.forEach((ro) => ro.disconnect());
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

    laptopMin,
    laptopMax,
    laptopDensityFactor,

    governor,
    governorSample,
    governorTargetFps,
    governorMaxDrop,
    governorMinDrop,
    governorEase,
  ]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex, color }}
      aria-hidden="true"
    />
  );
}
