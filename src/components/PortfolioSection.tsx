import { ExternalLink, ArrowUpRight, Sparkles, Code2, Users, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Book My CA",
    category: "Website Development",
    description:
      "BookMyCA is a financial services platform that provides end-to-end solutions including tax filing, GST, accounting, company registration, compliance, audits, and advisory. The website is designed to offer a seamless user experience, secure transactions, and easy integration of multiple financial service modules for individuals, startups, and enterprises.",
    image: "/bookmyca (1).png",
    tags: ["Next js", "Razorpay", "MongoDB"],
    demoUrl: "https://www.bookmyca.in",
    highlight: "Live Platform",
    features: ["Payment Integration", "Multi-module Architecture", "SEO Optimized"],
  },
  {
    id: 2,
    title: "ACTTS CRM",
    category: "Software Development",
    description:
      "ACTTS CRM is a customer relationship management (CRM) system designed to help businesses manage their customer interactions and data effectively. The system provides features such as contact management, lead tracking, and sales tracking to help businesses improve their customer relationships and sales processes.",
    image: "/actts-crm-1.png",
    tags: ["React", "TypeScript", "Tailwind", "Databases"],
    highlight: "Enterprise CRM",
    features: ["Contact Management", "Lead Tracking", "Sales Analytics"],
  },
  {
    id: 4,
    title: "Enterprise Resource Planning (ERP) Portal",
    category: "Software Development",
    description:
      "A comprehensive, full-stack enterprise management system designed to streamline project tracking, financial calculations, and invoicing. Features interactive data grids, secure role-based employee management, and robust reporting.",
    image: "/erp.png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    demoUrl: "#",
    highlight: "Full-Stack ERP",
    features: ["Role-Based Access", "Invoice Generation", "Real-time Dashboard"],
  },
  {
    id: 5,
    title: "Hansha Pharmaceuticals",
    category: "Pharma Company",
    description:
      "Leading pharmaceutical company focused on manufacturing and supplying high-quality medicines and healthcare products.",
    image: "/hansha-1.png",
    tags: ["Next.js", "React", "Tailwind"],
    demoUrl: "https://www.hanshapharmaceuticals.in",
    highlight: "Corporate Website",
    features: ["Product Catalogue", "Responsive Design", "Fast Performance"],
  },
];

const stats = [
  { icon: Layers, label: "Projects Delivered", value: 15, suffix: "+" },
  { icon: Users, label: "Happy Clients", value: 10, suffix: "+" },
  { icon: Code2, label: "Technologies Used", value: 20, suffix: "+" },
];

/* ── Animated counter hook ───────────────────────────────────────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(target * progress));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ── Stat Card ───────────────────────────────────────────────────── */
const StatCard = ({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: typeof Layers;
  label: string;
  value: number;
  suffix: string;
}) => {
  const { count, ref } = useCounter(value);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-card/60 border border-border backdrop-blur-sm"
    >
      <Icon className="w-6 h-6 text-primary mb-1" />
      <span className="text-3xl sm:text-4xl font-bold text-foreground">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
};

/* ── Featured Card (horizontal layout) ────────────────────────────── */
const FeaturedCard = ({
  project,
}: {
  project: (typeof projects)[0];
}) => {
  return (
    <div
      data-splash
      className="group relative rounded-2xl overflow-hidden border border-border transition-all duration-500 hover:shadow-glow hover:-translate-y-1"
    >
      {/* Animated gradient border on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-accent/30 group-hover:to-primary/40 transition-all duration-700 -z-10 opacity-0 group-hover:opacity-100 blur-[1px]" />

      <div className="relative bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Image — left side on desktop */}
        <div className="relative overflow-hidden md:w-1/2 h-56 md:h-auto md:min-h-[320px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-card/30 to-transparent opacity-50" />

          {/* Highlight badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            {project.highlight}
          </div>

          {/* Hover action */}
          {project.demoUrl && project.demoUrl !== "#" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 w-10 h-10 bg-foreground/10 backdrop-blur-md rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground border border-white/10"
              title="View Live"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Content — right side on desktop */}
        <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2">
          <div className="text-xs text-primary/80 font-semibold uppercase tracking-wider mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
            {project.description}
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.features.map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-primary/90 bg-primary/10 rounded-md border border-primary/10"
              >
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {feature}
              </span>
            ))}
          </div>

          {/* Tags + Link */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2.5 py-1 bg-muted/80 text-muted-foreground text-xs rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View Live
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Standard Project Card ───────────────────────────────────────── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  return (
    <div
      data-splash
      className="portfolio-card group relative rounded-2xl overflow-hidden border border-border transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-accent/30 group-hover:to-primary/40 transition-all duration-700 -z-10 opacity-0 group-hover:opacity-100 blur-[1px]" />

      <div className="relative h-full bg-card rounded-2xl overflow-hidden flex flex-col">
        {/* Project Image */}
        <div className="relative overflow-hidden h-52">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60" />

          {/* Highlight badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            {project.highlight}
          </div>

          {/* Hover action */}
          {project.demoUrl && project.demoUrl !== "#" && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 w-10 h-10 bg-foreground/10 backdrop-blur-md rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground border border-white/10"
              title="View Live"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="text-xs text-primary/80 font-semibold uppercase tracking-wider mb-1.5">
            {project.category}
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.features.map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-primary/90 bg-primary/10 rounded-md border border-primary/10"
              >
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {feature}
              </span>
            ))}
          </div>

          {/* Tags + Link */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-0.5 bg-muted/80 text-muted-foreground text-xs rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View Live
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Section ────────────────────────────────────────────────── */
const PortfolioSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goContact = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "contact" } });
      return;
    }
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const [featured, ...rest] = projects;

  return (
    <section id="work" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Featured Projects
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a look at some of our recent projects. Each one represents our
            commitment to quality, innovation, and client satisfaction.
          </p>
        </div>

        {/* Featured Project — full-width horizontal card */}
        <div className="mb-6">
          <FeaturedCard project={featured} />
        </div>

        {/* Remaining Projects — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-lg">
            Impressed? Let&apos;s create something amazing together.
          </p>
          <button data-splash onClick={goContact} className="btn-hero">
            Start Your Project
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
