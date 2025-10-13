import { useEffect } from "react";

export default function HeroBuilders() {
  // optional mouse parallax on the BTS image
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.querySelectorAll(".parallax-hero").forEach((el) => {
        const speed = Number((el as HTMLElement).dataset.speed || 6);
        const x = (window.innerWidth - e.pageX * speed) / 160;
        const y = (window.innerHeight - e.pageY * speed) / 160;
        (el as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* soft background already added from page, keep hero clean */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: copy */}
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            We Build Brands for the
            <span className="block gradient-text">Scroll-Stopping Era</span>
          </h1>

          <p className="mt-4 text-lg text-foreground/80">
            Performance-driven digital marketing and studio-quality social content:
            reels, shorts, carousels, UGC, influencer collabs, and paid ads that convert.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="btn-hero">Explore Services</button>
            <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">See Our Work</button>
          </div>

          {/* KPIs */}
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
            {[
              { k: "200M+", v: "Views" },
              { k: "4.8x",  v: "Avg ROAS" },
              { k: "1,200+",v: "Assets" },
            ].map((i) => (
              <div key={i.k} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
                <div className="text-xl font-semibold text-foreground/90">{i.k}</div>
                <div className="text-foreground/60 text-sm">{i.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: media collage */}
        <div className="relative">
          {/* main portrait */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/builders/hero-reel-portrait.jpg"
              alt="Reel portrait"
              className="w-full h-auto object-cover"
            />
            <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/70 text-white">
              Hook 0:03
            </span>
          </div>

          {/* parallax BTS shot */}
          <img
            src="/builders/hero-bts-studio.jpg"
            alt="Studio BTS"
            className="parallax-hero absolute -right-8 -bottom-10 w-2/3 rounded-2xl shadow-lg rotate-2"
            data-speed="6"
          />

          {/* small UGC */}
          <div className="absolute -left-6 bottom-14 w-2/5 rounded-2xl overflow-hidden shadow-lg -rotate-2">
            <img src="/builders/hero-ugc-candid.jpg" alt="UGC candid" className="w-full h-auto object-cover" />
            <div className="absolute bottom-2 left-2 text-[10px] px-2 py-1 rounded bg-black/60 text-white">
              Swipe to learn more
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
