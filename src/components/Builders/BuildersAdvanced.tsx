// No "use client" needed in Vite, but harmless if kept
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  Wand2,
  Sparkles,
  Flame,
  Scissors,
  Paintbrush2,
  Palette,
  Video,
  Layers,
  Workflow,
  Zap,
  Megaphone,
  Camera,
  Rocket,
  FileVideo2,
  Brush,
  ImageIcon,
  MonitorPlay,
  PenTool,
} from "lucide-react";

/***************************
 * Utility
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

/***************************
 * 1) Creative Ribbon
 ***************************/
const items = [
  { icon: <Film />, label: "Reels" },
  { icon: <FileVideo2 />, label: "Shorts" },
  { icon: <MonitorPlay />, label: "Ads" },
  { icon: <Wand2 />, label: "VFX" },
  { icon: <Scissors />, label: "Cuts" },
  { icon: <Brush />, label: "Thumbnails" },
  { icon: <ImageIcon />, label: "Carousels" },
  { icon: <Palette />, label: "Brand Kits" },
  { icon: <PenTool />, label: "Logos" },
  { icon: <Layers />, label: "Motion GFX" },
];

function CreativeRibbon() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/60 bg-gradient-to-b from-background/40 via-background/10 to-background/40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,.15),transparent_60%)]" />
      <motion.div
        className="flex gap-8 py-3 will-change-transform"
        animate={{ x: [0, -1200] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {[...Array(3)].map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-8">
            {items.map((it, i) => (
              <div
                key={`${k}-${i}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-sm backdrop-blur-md hover:shadow-md hover:border-border"
              >
                <span className="opacity-70 group-hover:opacity-100 transition">
                  {it.icon}
                </span>
                <span className="text-foreground/80 group-hover:text-foreground transition">
                  {it.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/***************************
 * 2) Showreel Grid
 ***************************/
function HoverVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => ref.current?.pause()}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="absolute left-3 top-3 rounded-full bg-background/70 px-2 py-1 text-xs backdrop-blur-md border border-border text-foreground/70">
        0:12 sample
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <p className="text-sm font-medium text-white drop-shadow">{title}</p>
        <div className="flex items-center gap-1 text-white/80">
          <Sparkles size={16} />
          <span className="text-xs">Hover to play</span>
        </div>
      </div>
    </div>
  );
}

function ShowreelGrid() {
  return (
    <Section id="portfolio" className="py-16">
      <Title
        kicker="Editing Showcase"
        title={
          <>
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Showreel
            </span>
          </>
        }
        subtitle="A taste of reels, ads, motion graphics, and design-first edits."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <HoverVideo
          src="/assets/demos/reel-01.mp4"
          poster="/assets/demos/poster-01.jpg"
          title="Product Reel • Tech"
        />
        <HoverVideo
          src="/assets/demos/reel-02.mp4"
          poster="/assets/demos/poster-02.jpg"
          title="UGC Ad • Lifestyle"
        />
        <HoverVideo
          src="/assets/demos/reel-03.mp4"
          poster="/assets/demos/poster-03.jpg"
          title="Motion GFX • Logo Reveal"
        />
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href="#contact"
          className="rounded-xl border border-border bg-primary/10 px-5 py-2 text-sm hover:bg-primary/20"
        >
          Get a custom showreel →
        </a>
      </div>
    </Section>
  );
}

/***************************
 * 3) Before/After Retouch
 ***************************/
function BeforeAfter() {
  return (
    <Section className="py-16" id="design">
      <Title
        kicker="Graphic Designing"
        title={
          <>
            Before / After <span className="text-primary">Retouch</span>
          </>
        }
        subtitle="Slide to see the transformation (color grade, cleanup, typography)."
      />
      <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={50}
              className="range w-full"
              aria-label="before-after slider"
              onInput={(e) => {
                const val = Number((e.target as HTMLInputElement).value);
                const clip = document.getElementById("after-clip");
                if (clip)
                  (clip as HTMLDivElement).style.clipPath = `inset(0 ${
                    100 - val
                  }% 0 0)`;
              }}
            />
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl">
              <img
                alt="before"
                src="/img1_before.png"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                id="after-clip"
                className="absolute inset-0 h-full w-full"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <img
                  alt="after"
                  src="/img2_after.png"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="grid gap-4 text-foreground/80">
          {[
            "Color Grading",
            "Skin & Scene Cleanup",
            "Typography & Layout",
            "Background Replacement",
            "Social-first Formats",
          ].map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <span className="mt-1">
                <Sparkles className="opacity-70" />
              </span>
              <div>
                <p className="font-medium">{p}</p>
                <p className="text-sm opacity-70">
                  High-clarity visual editing with subtle, premium aesthetics.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/***************************
 * 4) Workflow Timeline
 ***************************/
const steps = [
  {
    icon: <Camera />,
    title: "Brief + Assets",
    desc: "We align on goals, audience and creative direction.",
  },
  {
    icon: <Wand2 />,
    title: "Scripting + Shot Plan",
    desc: "Hooks, beats, transitions and brand moments.",
  },
  {
    icon: <Scissors />,
    title: "Edit",
    desc: "Rhythm, pacing, captions and meme-cuts that hold attention.",
  },
  {
    icon: <Paintbrush2 />,
    title: "Design + Motion",
    desc: "Custom GFX, typography, logo reveals, tracked callouts.",
  },
  {
    icon: <Flame />,
    title: "Color + Sound",
    desc: "Cinematic grade + punchy SFX/music for scroll-stopping feel.",
  },
  {
    icon: <Rocket />,
    title: "Delivery + Variations",
    desc: "Platform-ready renders (Reel/Short/TikTok, 4:5, 1:1).",
  },
];

function WorkflowTimeline() {
  return (
    <Section id="services" className="py-16">
      <Title
        kicker="Process"
        title={
          <>
            Creative <span className="text-primary">Workflow</span>
          </>
        }
        subtitle="Battle-tested for speed and quality."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative rounded-2xl border border-border/70 bg-card/60 p-6"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs">
              <span className="opacity-70">{i + 1}</span>
              <span className="opacity-60">/</span>
              <span className="opacity-80">{steps.length}</span>
            </div>
            <div className="mb-3 flex items-center gap-3 text-foreground">
              <span className="rounded-lg border border-border/50 bg-background/60 p-2">
                {s.icon}
              </span>
              <p className="text-lg font-medium">{s.title}</p>
            </div>
            <p className="text-foreground/70">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/***************************
 * 5) Tools Wall
 ***************************/
const tools = [
  { icon: <Video />, name: "Premiere Pro" },
  { icon: <Layers />, name: "After Effects" },
  { icon: <Palette />, name: "Photoshop" },
  { icon: <PenTool />, name: "Illustrator" },
  { icon: <Zap />, name: "CapCut" },
  { icon: <Workflow />, name: "Notion + Drive" },
  { icon: <Megaphone />, name: "Meta Ads" },
];

function ToolsWall() {
  return (
    <Section className="py-16">
      <Title
        kicker="Craft"
        title={
          <>
            Tools we <span className="text-primary">Master</span>
          </>
        }
        subtitle="We blend pro software + social insights to maximize outcomes."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {tools.map((t, i) => (
          <div
            key={i}
            className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 p-4 hover:bg-card/70"
          >
            <div className="rounded-lg border border-border/60 bg-background/60 p-2 text-foreground/80 group-hover:text-foreground">
              {t.icon}
            </div>
            <p className="text-sm text-foreground/80 group-hover:text-foreground">
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/***************************
 * 6) Sticky CTA
 ***************************/
function StickyCta() {
  return (
    <div className="sticky bottom-3 z-30 mx-auto max-w-3xl px-4">
      <div className="rounded-2xl border border-border/70 bg-gradient-to-r from-indigo-500/15 via-violet-500/15 to-fuchsia-500/15 p-3 backdrop-blur-md">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-foreground/90">
            Have raw footage or assets? We’ll turn them into scroll-stoppers
            within 72h.*
          </p>
          <a
            href="#contact"
            className="rounded-xl border border-border bg-primary/10 px-4 py-2 text-sm hover:bg-primary/20"
          >
            Start a Project
          </a>
        </div>
      </div>
    </div>
  );
}

/***************************
 * Gyro Parallax Showpiece
 ***************************/
function useGyroTilt() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  useEffect(() => {
    let mounted = true;
    function onOrientation(e: DeviceOrientationEvent) {
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

function GyroShowpiece() {
  const { rx, ry } = useGyroTilt();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ rx: 0, ry: 0 });
  const [useMouse, setUseMouse] = useState(false);

  // Mouse fallback (desktop)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const ry = (x - 0.5) * 24;
      const rx = -(y - 0.5) * 20;
      setMouseTilt({ rx, ry });
    };
    const onEnter = () => setUseMouse(true);
    const onLeave = () => setUseMouse(false);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
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
            transition: useMouse
              ? "transform 80ms linear"
              : "transform 180ms ease-out",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/20 to-cyan-500/20" />
          <div
            className="absolute left-6 top-6 right-6 bottom-6 rounded-xl overflow-hidden border border-white/10 shadow-xl transform-gpu"
            style={{ transform: `translateZ(60px)` }}
          >
            <video
              src="/assets/demos/reel-02.mp4"
              poster="/assets/demos/poster-02.jpg"
              muted
              loop
              playsInline
              autoPlay
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute top-4 left-4 flex gap-2 transform-gpu"
            style={{ transform: `translateZ(100px)` }}
          >
            <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs backdrop-blur">
              <span className="inline-block translate-y-[1px] opacity-80 mr-1">
                🎬
              </span>{" "}
              Cuts + Captions
            </span>
            <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs backdrop-blur">
              <span className="inline-block translate-y-[1px] opacity-80 mr-1">
                ✨
              </span>{" "}
              Motion GFX
            </span>
          </div>
          <div
            className="pointer-events-none absolute right-6 bottom-6 flex items-center gap-3 text-white/90 transform-gpu"
            style={{ transform: `translateZ(140px)` }}
          >
            <div className="rounded-lg border border-white/20 bg-black/30 p-2 backdrop-blur">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="opacity-90"
              >
                <path fill="currentColor" d="M3 5h18v14H3zM5 9h14v6H5z" />
              </svg>
            </div>
            <div className="rounded-lg border border-white/20 bg-black/30 p-2 backdrop-blur">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="opacity-90"
              >
                <path
                  fill="currentColor"
                  d="M12 3l4 7H8l4-7zm0 18l-4-7h8l-4 7z"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-fuchsia-400/25 blur-3xl transform-gpu"
            style={{ transform: `translateZ(220px)` }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-400/25 blur-3xl transform-gpu"
            style={{ transform: `translateZ(220px)` }}
          />
        </div>

        <p className="mt-4 text-xs text-foreground/60">
          Tip: On iOS, tap once to allow motion access.
        </p>
      </div>
    </Section>
  );
}

/***************************
 * 7) New Footer
 ***************************/
export function NewFooterBuilders() {
  return (
    <footer className="relative mt-16 border-t border-border bg-gradient-to-t from-card/50 to-transparent">
      <Section className="flex flex-col items-center py-10 px-auto mx-auto justify-center ">
        <div className="text-sm text-foreground/70 items-center ">
          © {new Date().getFullYear()} The Builders • Digital Marketing & Social
          Content
        </div>
      </Section>
    </footer>
  );
}

/***************************
 * Root Component
 ***************************/
export default function BuildersAdvanced() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(closest-side,rgba(88,28,135,.25),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,78,216,.25),transparent_70%)] blur-3xl" />
      </div>

      <CreativeRibbon />
      {/* Gyro section placed near the top */}
      <GyroShowpiece />
      <ShowreelGrid />
      <BeforeAfter />
      <WorkflowTimeline />
      <ToolsWall />
      <StickyCta />
    </div>
  );
}