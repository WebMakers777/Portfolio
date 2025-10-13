type Item = { title: string; tag: string; img: string };

export default function PortfolioBuilders() {
  const work: Item[] = [
    { title: "FinTech — Lead Gen Reels",        tag: "Reels / Performance", img: "/builders/work-1.jpg" },
    { title: "D2C Beauty — UGC Ads Pack",       tag: "UGC / Meta Ads",      img: "/builders/work-2.jpg" },
    { title: "SaaS — LinkedIn Carousels",       tag: "Carousels / LinkedIn",img: "/builders/work-3.jpg" },
    { title: "Edu — YouTube Shorts Sprint",     tag: "Shorts / YouTube",    img: "/builders/work-4.jpg" },
    { title: "Hospitality — Influencer Collab", tag: "Influencer / IG",     img: "/builders/work-5.jpg" },
    { title: "Local Brand — Offer Funnel",      tag: "Offers / Landing",    img: "/builders/work-6.jpg" },
  ];

  return (
    <section id="portfolio" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Selected Work</h2>
            <p className="mt-2 text-foreground/70">A snapshot of sprints we've shipped recently.</p>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:inline-block rounded-xl border border-border px-4 py-2 text-sm text-foreground/70 hover:bg-card/50"
          >
            Request Case Studies
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((w) => (
            <article
              key={w.title}
              className="card-3d rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-[16/10] play-overlay">
                <img src={w.img} alt={w.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-card/90 border border-border text-foreground/80">
                  Case study →
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-foreground/50">{w.tag}</div>
                <h3 className="mt-1 text-lg font-semibold text-foreground/90">{w.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
