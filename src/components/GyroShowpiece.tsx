// File: components/GyroShowpiece.js
"use client"; // Good practice for components with heavy client-side interactivity

import React, { useEffect, useRef, useState } from "react";

// Note: You need to make your Section and Title components available here.
// The easiest way is to export them from BuildersAdvanced.js and import them here.
// Or move them to a shared utility file.
// import { Section, Title } from "./Builders/BuildersAdvanced"; 

/***************************
 * Gyro Tilt Hook
 ***************************/
const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`relative mx-auto max-w-7xl px-4 md:px-8 ${className}`}
  >
    {children}
  </section>
);

const Title = ({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="mx-auto max-w-3xl text-center">
    {kicker && (
      <p className="mb-2 text-xs tracking-widest text-foreground/50 uppercase">
        {kicker}
      </p>
    )}
    <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-foreground">
      {title}
    </h2>
    {subtitle && <p className="mt-3 text-foreground/70">{subtitle}</p>}
  </div>
);
function useGyroTilt() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  useEffect(() => {
    let mounted = true;

    function onOrientation(e) {
      if (!mounted) return;
      const gamma = e.gamma ?? 0; // left/right
      const beta = e.beta ?? 0; // front/back
      const ry = (gamma / 30) * 12;
      const rx = -(beta / 45) * 10;
      setTilt({ rx, ry });
    }

    const enable = async () => {
      // @ts-ignore
      if (window.DeviceOrientationEvent?.requestPermission) {
        try {
          // @ts-ignore
          const perm = await window.DeviceOrientationEvent.requestPermission();
          if (perm === "granted")
            window.addEventListener("deviceorientation", onOrientation);
        } catch {}
      } else {
        window.addEventListener("deviceorientation", onOrientation);
      }
    };

    if ("DeviceOrientationEvent" in window) {
      const handler = () => {
        enable();
        window.removeEventListener("click", handler);
        window.removeEventListener("touchstart", handler);
      };
      window.addEventListener("click", handler, { once: true });
      window.addEventListener("touchstart", handler, { once: true });
    }

    return () => {
      mounted = false;
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);
  return tilt;
}


/***************************
 * Gyro Parallax Showpiece Component
 ***************************/
export default function GyroShowpiece() {
  const { rx, ry } = useGyroTilt();
  const wrapperRef = useRef(null);
  const [mouseTilt, setMouseTilt] = useState({ rx: 0, ry: 0 });
  const [useMouse, setUseMouse] = useState(false);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    
    const onMove = (e: MouseEvent) => {
      // Throttle updates to 16ms (~60fps) for smooth performance
      if (throttleRef.current) return;
      
      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
      }, 16);
      
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const ry = (x - 0.5) * 24;
        const rx = -(y - 0.5) * 20;
        setMouseTilt({ rx, ry });
      });
    };
    
    const onEnter = () => setUseMouse(true);
    const onLeave = () => {
      setUseMouse(false);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }
    };
    
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, []);

  const aRx = useMouse ? mouseTilt.rx : rx;
  const aRy = useMouse ? mouseTilt.ry : ry;

  return (
    <Section className="py-16" id="gyro">
      <Title
        kicker="Immersive Preview"
        title={
          <>
            Gyroscopic <span className="text-primary">Parallax</span> Stage
          </>
        }
        subtitle="Move your phone (or mouse) to feel the depth—perfect for motion-first brands."
      />
      <div
        ref={wrapperRef}
        className="relative mx-auto mt-10 grid max-w-5xl place-items-center rounded-3xl border border-border/70 bg-card/40 p-6 backdrop-blur-md"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden transform-gpu will-change-transform"
          style={{
            transform: `rotateX(${aRx}deg) rotateY(${aRy}deg)`,
            transition: useMouse ? "transform 80ms linear" : "transform 180ms ease-out",
          }}
        >
          {/* ... The rest of the JSX for the parallax stage ... */}
            <video
              src="https://kcoykkkdrahdcdhf.public.blob.vercel-storage.com/gyro_4k.mp4"
              poster="/placeholder.svg"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="h-full w-full object-cover"
            />
          {/* ... other layers ... */}
        </div>
        <p className="mt-4 text-xs text-foreground/60">
          Tip: On iOS, tap once to allow motion access.
        </p>
      </div>
    </Section>
  );
}