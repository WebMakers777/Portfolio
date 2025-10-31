import { motion } from "framer-motion";

export default function ServicesBuilders() {
  const items = [
    {
      title: "Social Media Management",
      desc: "Daily posting, calendars, copywriting, and community growth across Instagram, YouTube, LinkedIn, and X.",
      bullets: ["Monthly calendar", "Brand voice guides", "Community & DM care"],
      icon: "📣",
    },
    {
      title: "Content Studio (Reels/Shorts)",
      desc: "Hook-first scripting, shooting, editing, motion GFX, subtitles—optimized for retention.",
      bullets: ["Studio or remote UGC", "Batch production", "Retention-focused edits"],
      icon: "🎬",
    },
    {
      title: "Paid Performance Ads",
      desc: "Meta, Google, YouTube—creative testing with funnel strategy for measurable ROAS.",
      bullets: ["Funnel & audiences", "Creative iteration sprints", "A/B testing dashboards"],
      icon: "📈",
    },
    {
      title: "Influencer & UGC",
      desc: "Creator sourcing, briefs, contracts, and tracking to scale authentic content.",
      bullets: ["Creator matchmaking", "Usage rights", "Performance tracking"],
      icon: "🤝",
    },
    {
      title: "Brand & Campaign Strategy",
      desc: "Positioning, offers, and multi-channel launch playbooks for new products and seasons.",
      bullets: ["Personas & JTBD", "Offer & landing pages", "Campaign SOPs"],
      icon: "🧭",
    },
    {
      title: "Analytics & Reporting",
      desc: "One source of truth for KPIs with actions every week to move numbers.",
      bullets: ["Weekly scorecards", "Attribution clarity", "Next steps & experiments"],
      icon: "📊",
    },
  ];

  return (
    <section id="services" className="relative py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
          Services built for growth
        </h2>
        <p className="mt-2 text-foreground/70 max-w-2xl text-sm md:text-base">
          Choose a focused sprint or a monthly retainer—either way, we ship outcomes.
        </p>

        {/* 2 cols on phones/smaller devices, 3 cols on md+ */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-3 md:p-4
                         shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200
                         hover:border-foreground/20"
            >
              <div className="flex items-start gap-2.5">
                <div className="shrink-0 text-lg md:text-xl leading-none select-none">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground/90 leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[12px] md:text-sm text-foreground/70">
                    {s.desc}
                  </p>
                </div>
              </div>

              <ul className="mt-3 md:mt-4 space-y-1.5 text-[12px] md:text-sm text-foreground/70">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/50 group-hover:bg-foreground/70 transition-colors" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
