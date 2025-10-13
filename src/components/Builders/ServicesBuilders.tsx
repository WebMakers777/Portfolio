export default function ServicesBuilders() {
  const items = [
    {
      title: "Social Media Management",
      desc: "Daily posting, calendars, copywriting, and community growth across Instagram, YouTube, LinkedIn, and X.",
      bullets: ["Monthly calendar", "Brand voice guides", "Community & DM care"],
    },
    {
      title: "Content Studio (Reels/Shorts)",
      desc: "Hook-first scripting, shooting, editing, motion GFX, subtitles—optimized for retention.",
      bullets: ["Studio or remote UGC", "Batch production", "Retention-focused edits"],
    },
    {
      title: "Paid Performance Ads",
      desc: "Meta, Google, YouTube—creative testing with funnel strategy for measurable ROAS.",
      bullets: ["Funnel & audiences", "Creative iteration sprints", "A/B testing dashboards"],
    },
    {
      title: "Influencer & UGC",
      desc: "Creator sourcing, briefs, contracts, and tracking to scale authentic content.",
      bullets: ["Creator matchmaking", "Usage rights", "Performance tracking"],
    },
    {
      title: "Brand & Campaign Strategy",
      desc: "Positioning, offers, and multi-channel launch playbooks for new products and seasons.",
      bullets: ["Personas & JTBD", "Offer & landing pages", "Campaign SOPs"],
    },
    {
      title: "Analytics & Reporting",
      desc: "One source of truth for KPIs with actions every week to move numbers.",
      bullets: ["Weekly scorecards", "Attribution clarity", "Next steps & experiments"],
    },
  ];

  return (
    <section id="services" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Services built for growth</h2>
        <p className="mt-2 text-foreground/70 max-w-2xl">
          Choose a focused sprint or a monthly retainer—either way, we ship outcomes.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((s) => (
            <article key={s.title} className="card-hover">
              <h3 className="text-xl font-semibold text-foreground/90">{s.title}</h3>
              <p className="mt-2 text-foreground/70">{s.desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-foreground/70 list-disc list-inside">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
