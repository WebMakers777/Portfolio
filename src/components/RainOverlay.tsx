"use client";

import { useEffect, useRef } from "react";

export default function RainOverlay({
  density = 90,                 // number of drops
  speed = 1,                    // global speed multiplier
  color = "#3BA7FF",            // blue rain
  maxLength = 22,
  minLength = 10,
  zIndex = 5,
  splashes = true,              // tiny shard splashes (no ripples)
  collideSelectors = ["[data-splash]"], // elements to collide with
  collidePadding = 2,           // px padding above element top for impact
}: {
  density?: number;
  speed?: number;
  color?: string;
  maxLength?: number;
  minLength?: number;
  zIndex?: number;
  splashes?: boolean;
  collideSelectors?: string[];
  collidePadding?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const collidersRef = useRef<DOMRect[]>([]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = 1;

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

    setSize();
    computeColliders();

    const onResize = () => {
      setSize();
      computeColliders();
    };
    const onScroll = () => computeColliders();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    type Drop = {
      x: number; y: number; prevY: number;
      vx: number; vy: number; len: number; wid: number; a: number; z: number; windPhase: number;
    };
    type Shard = { x: number; y: number; vx: number; vy: number; a: number; life: number };

    const drops: Drop[] = [];
    const shards: Shard[] = [];

    const spawnDrop = (yStart?: number) => {
      const z = Math.random();
      const vy = (400 + Math.random() * 380) * (0.65 + z * 0.6) * speed;
      const len = (Math.random() * (maxLength - minLength) + minLength) * (0.7 + z * 0.5);
      const wid = 0.8 + z * 1.1;
      const x = Math.random() * canvas.clientWidth;
      const y = yStart ?? -Math.random() * canvas.clientHeight * 0.6;
      drops.push({
        x, y, prevY: y,
        vx: (Math.random() * 10 - 5) * (0.4 + z * 0.6),
        vy, len, wid, a: 0.45 + z * 0.45, z,
        windPhase: Math.random() * Math.PI * 2,
      });
    };

    for (let i = 0; i < density; i++) spawnDrop(Math.random() * canvas.clientHeight);

    canvas.style.color = color;
    const stroke = () => getComputedStyle(canvas).color;

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
      const windGlobal = Math.sin(t * 0.7) * 35 + Math.sin(t * 1.43) * 18;

      // Draw/update drops
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];

        // advance
        d.prevY = d.y;
        const wind = windGlobal * (0.3 + 0.7 * d.z) + Math.sin(t * 2 + d.windPhase) * 8 * d.z;
        d.x += (d.vx + wind) * dt;
        d.y += d.vy * dt;

        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;

        // collision with text tops
        let hit = false;
        for (const r of collidersRef.current) {
          const top = r.top - collidePadding;
          if (d.prevY < top && d.y >= top && d.x >= r.left && d.x <= r.right) {
            // spawn splash shards at impact
            if (splashes) {
              const n = 3 + Math.floor(Math.random() * 3);
              for (let s = 0; s < n; s++) {
                shards.push({
                  x: d.x,
                  y: top,
                  vx: (Math.random() * 180 - 90) * (0.4 + d.z * 0.7),
                  vy: - (120 + Math.random() * 160) * (0.5 + d.z * 0.7),
                  a: 0.35 + Math.random() * 0.25,
                  life: 0.2 + Math.random() * 0.25,
                });
              }
            }
            drops.splice(i, 1);
            spawnDrop();
            hit = true;
            break;
          }
        }
        if (hit) continue;

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

        // ground (no ripple—just despawn)
        if (d.y > h - 2) {
          drops.splice(i, 1);
          spawnDrop();
        }
      }

      // Draw/update shards
      if (splashes) {
        for (let i = shards.length - 1; i >= 0; i--) {
          const s = shards[i];
          s.life -= dt;
          if (s.life <= 0) {
            shards.splice(i, 1);
            continue;
          }
          // gravity & drag
          s.vy += 900 * dt;
          s.vx *= 0.98;
          s.x += s.vx * dt;
          s.y += s.vy * dt;

          ctx.globalAlpha = s.a * Math.max(0, s.life * 3);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + s.vx * 0.02, s.y + s.vy * 0.02);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color, density, maxLength, minLength, speed, splashes, collideSelectors, collidePadding]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    />
  );
}
