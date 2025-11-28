import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Item = { title: string; tag: string; img: string };

export default function PortfolioBuilders() {
  const navigate = useNavigate();
  const work: Item[] = [
    {
      title: "FinTech — Lead Gen Reels",
      tag: "Reels / Performance",
      img: "/builders/work-1.jpg",
    },
    {
      title: "D2C Beauty — UGC Ads Pack",
      tag: "UGC / Meta Ads",
      img: "/builders/work-2.jpg",
    },
    {
      title: "SaaS — LinkedIn Carousels",
      tag: "Carousels / LinkedIn",
      img: "/builders/work-3.jpg",
    },
    {
      title: "Edu — YouTube Shorts Sprint",
      tag: "Shorts / YouTube",
      img: "/builders/work-4.jpg",
    },
    {
      title: "Hospitality — Influencer Collab",
      tag: "Influencer / IG",
      img: "/builders/work-5.jpg",
    },
    {
      title: "Local Brand — Offer Funnel",
      tag: "Offers / Landing",
      img: "/builders/work-6.jpg",
    },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section id="portfolio" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
              Selected Work
            </h2>
            <p className="mt-1 md:mt-2 text-foreground/70 text-sm md:text-base">
              A snapshot of sprints we've shipped recently.
            </p>
          </div>
          <button
            onClick={() => {
              // SPA navigate to gateway and pass a scroll target through location state
              navigate("/", { state: { scrollTo: "contact" } });
            }}
            className="hidden md:inline-block rounded-lg border border-border px-3.5 py-2 text-sm text-foreground/70 hover:bg-card/60"
          >
            Request Case Studies
          </button>
        </div>

        {/* Compact responsive grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-7 md:mt-8 grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-5"
        >
          {work.map((w, i) => (
            <motion.article
              key={w.title}
              variants={item}
              whileHover={{ y: -4, rotateX: -2, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="group rounded-xl overflow-hidden border border-border/60 bg-card/60 backdrop-blur-sm
                         shadow-sm hover:shadow-md will-change-transform"
            >
              <div className="relative aspect-[4/3]">
                {/* image with reduced opacity */}
                <motion.img
                  src={w.img}
                  alt={w.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-95 transition-opacity duration-300"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* subtle light sweep on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent
                                  translate-x-[-120%] group-hover:translate-x-[120%] duration-700 ease-out"
                  />
                </div>

                {/* top tag */}
                <div className="absolute top-2 left-2 text-[10px] md:text-xs px-2 py-1 rounded bg-black/55 text-white/90 backdrop-blur-sm">
                  {w.tag}
                </div>

                {/* bottom label */}
                <div className="absolute bottom-2 right-2 text-[10px] md:text-xs px-2 py-1 rounded bg-card/85 border border-border text-foreground/80">
                  Case study →
                </div>
              </div>

              {/* compact caption */}
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold text-foreground/90 leading-snug">
                  {w.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
