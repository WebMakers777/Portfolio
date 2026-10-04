import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Briefcase, 
  HeartHandshake, 
  Globe, 
  Smartphone, 
  Layers, 
  ShoppingBag, 
  Cpu, 
  Activity, 
  TrendingUp, 
  GitMerge, 
  Cloud, 
  ShieldCheck, 
  Sparkles, 
  LayoutDashboard,
  Zap,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import GlassSurface from '../components/Common/GlassSurface';
import MagneticButton from '../components/Common/MagneticButton';
import './Features.css';

const capabilities = [
  {
    title: "Custom CRM Solutions",
    desc: "Tailored customer relationship management platforms designed around your specific sales, pipeline, and communication workflows.",
    value: "Streamlined sales pipeline, increased lead conversion, and automated deal logging.",
    icon: <Users size={24} />,
    color: "blue"
  },
  {
    title: "ERP Systems",
    desc: "End-to-end Enterprise Resource Planning solutions that unite finance, human resources, supply chain, and operations.",
    value: "Single source of truth, reduced operational overhead, and real-time inventory tracking.",
    icon: <Building2 size={24} />,
    color: "purple"
  },
  {
    title: "Business Management Portals",
    desc: "Centralized operating systems for managing business tasks, team collaboration, invoicing, and client file sharing.",
    value: "Enhanced cross-team efficiency, secured client communications, and centralized document sharing.",
    icon: <Briefcase size={24} />,
    color: "emerald"
  },
  {
    title: "Customer Self-Service Portals",
    desc: "Secure portals allowing clients to manage profiles, subscription plans, submit support tickets, and review order histories.",
    value: "Substantially lower support overhead, 24/7 customer empowerment, and simplified renewals.",
    icon: <HeartHandshake size={24} />,
    color: "orange"
  },
  {
    title: "Web Applications",
    desc: "Fast, responsive, and secure web products engineered with modern frameworks (React/Next.js) and optimized for search engines.",
    value: "Increased organic reach, excellent user conversion rates, and global cross-device compatibility.",
    icon: <Globe size={24} />,
    color: "pink"
  },
  {
    title: "Mobile Applications",
    desc: "High-performance iOS and Android applications built with React Native and Flutter for native-like user experiences.",
    value: "Direct mobile user engagement, offline functionality, and seamless app store distribution.",
    icon: <Smartphone size={24} />,
    color: "blue"
  },
  {
    title: "SaaS Platforms",
    desc: "Multi-tenant Software-as-a-Service applications engineered with robust subscription billing, security, and tenant isolation.",
    value: "Scalable recurring revenue models, high system availability, and self-serve user onboarding.",
    icon: <Layers size={24} />,
    color: "purple"
  },
  {
    title: "E-Commerce Solutions",
    desc: "Feature-rich online storefronts with custom checkout flows, payment integrations, and inventory control dashboards.",
    value: "Frictionless checkout experience, optimized sales funnels, and automated inventory sync.",
    icon: <ShoppingBag size={24} />,
    color: "emerald"
  },
  {
    title: "Internal Business Tools",
    desc: "Custom-built internal databases, utilities, and admin controls designed to automate spreadsheets and manual entry.",
    value: "Elimination of repetitive manual processes, heightened data security, and lower human error rates.",
    icon: <Cpu size={24} />,
    color: "orange"
  },
  {
    title: "Workflow Automation Systems",
    desc: "Event-driven automation platforms connecting third-party APIs, scheduling background tasks, and automating operations.",
    value: "Hundreds of manual work-hours saved weekly, instant system alerts, and reliable background sync.",
    icon: <Activity size={24} />,
    color: "pink"
  },
  {
    title: "Analytics & Reporting Dashboards",
    desc: "Interactive data dashboards containing real-time charting, custom cohort metrics, and downloadable reporting sheets.",
    value: "Data-backed executive decisions, visualized KPI fluctuations, and immediate operational insights.",
    icon: <TrendingUp size={24} />,
    color: "blue"
  },
  {
    title: "API Development & Integrations",
    desc: "Secure and structured RESTful/GraphQL API engineering, database schema designs, and seamless third-party connections.",
    value: "Fast system-to-system communications, hardened data protection, and clean modular codebases.",
    icon: <GitMerge size={24} />,
    color: "purple"
  },
  {
    title: "Cloud-Native Applications",
    desc: "Serverless and containerized systems deployed on cloud providers with automatic scaling and zero-downtime pipelines.",
    value: "Drastically reduced cloud compute costs, 99.99% system availability, and instant traffic handling.",
    icon: <Cloud size={24} />,
    color: "emerald"
  },
  {
    title: "Enterprise Software Solutions",
    desc: "Legacy system modernization, massive database migrations, and high-security software built for large-scale operations.",
    value: "Compliance with data protection laws, system-wide stabilization, and clean modernization roadmaps.",
    icon: <ShieldCheck size={24} />,
    color: "orange"
  },
  {
    title: "AI-Powered Business Applications",
    desc: "Smart integrations featuring Large Language Models, custom vector retrieval (RAG), automated search, and intelligence logic.",
    value: "Automated custom customer assistance, cognitive content drafting, and instant documentation searches.",
    icon: <Sparkles size={24} />,
    color: "pink"
  },
  {
    title: "Custom Admin Dashboards",
    desc: "Intuitive administrative panels for managing system states, registered users, billing statuses, and application settings.",
    value: "Granular administrative user roles, quick database lookups, and total operational transparency.",
    icon: <LayoutDashboard size={24} />,
    color: "blue"
  },
  {
    title: "Bespoke Wedding Invitations",
    desc: "Luxury interactive digital wedding invitations and celebration microsites featuring 3D envelope reveals, custom monograms, event itineraries, and live RSVP portals.",
    value: "Unforgettable couture guest experience, instant WhatsApp sharing, and effortless real-time RSVP management.",
    icon: <HeartHandshake size={24} />,
    color: "orange"
  }
];

const processSteps = [
  {
    num: "01",
    title: "Discovery & Scope",
    desc: "We analyze your business objectives, map technical requirements, and define a feature blueprint in under a week."
  },
  {
    num: "02",
    title: "UI/UX Prototyping",
    desc: "Our design team structures interactive high-fidelity user flows and wireframes to finalize the layout concept."
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "Using modular React architectures and secure backend API structures, we build your application in sprints."
  },
  {
    num: "04",
    title: "Quality Assurance",
    desc: "We perform automated build testing, browser usability testing, and speed checks to guarantee stability."
  },
  {
    num: "05",
    title: "Launch & Iterate",
    desc: "We deploy your system to AWS or Vercel and provide post-launch optimization support for scaling."
  }
];

const technologies = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "AWS", slug: "amazonwebservices" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Framer Motion", slug: "framermotion" },
  { name: "Vercel", slug: "vercel" }
];

const whyChooseUs = [
  {
    title: "Built for Velocity",
    desc: "We deliver full-stack working applications and high-fidelity MVPs in less than 4 weeks, helping you validate your product instantly.",
    icon: <Zap size={24} />
  },
  {
    title: "Architectural Integrity",
    desc: "Clean modular codebases, containerized setups, serverless auto-scaling, and secure API layers are built in from day one.",
    icon: <Cpu size={24} />
  },
  {
    title: "Complete Transparency",
    desc: "No hidden hourly fees, no scope creep. We provide milestone-based flat rates and complete ownership of your intellectual property.",
    icon: <Clock size={24} />
  }
];

const FeaturesPage = () => {
  useEffect(() => {
    document.title = 'Capabilities & Features | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content', 
      'Explore the custom software engineering capabilities of Vincie Studios — from CRMs and ERP systems to SaaS platforms, Web Apps, and AI integrations.'
    );
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <div className="features-page-container">
      {/* Ambient Background Glowing Orbs */}
      <div className="features-ambient-orbs">
        <div className="features-orb features-orb-1"></div>
        <div className="features-orb features-orb-2"></div>
        <div className="features-orb features-orb-3"></div>
      </div>

      {/* Hero Section */}
      <section className="features-page-hero">
        <motion.div
          className="liquid-badge-wrapper"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="liquid-badge">
            <span className="badge-content-text">Capabilities</span>
            <div className="liquid-container">
              <div className="liquid-wave wave-1"></div>
              <div className="liquid-wave wave-2"></div>
            </div>
          </div>
        </motion.div>

        <motion.h1 
          className="features-hero-title"
          initial="hidden" 
          animate="visible" 
          variants={fadeUp}
        >
          Engineered for Performance.<br />Built for <span className="text-gradient">Scale</span>.
        </motion.h1>

        <motion.p 
          className="features-hero-desc"
          initial="hidden" 
          animate="visible" 
          variants={fadeUp}
        >
          We construct modular, high-speed applications, digital portals, and workflow engines. 
          Here is a detailed mapping of our technology solutions and engineering capabilities.
        </motion.p>
      </section>

      {/* Capabilities Grid */}
      <section className="features-grid-section">
        <div className="features-grid-header">
          <h2 className="features-grid-title">Our Services & Solutions</h2>
          <p className="features-grid-desc">Every product we engineer is fully responsive, highly secure, and optimized for maximum speed.</p>
        </div>

        <motion.div 
          className="features-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i} 
              className="feature-card-wrapper" 
              variants={fadeUp}
            >
              <div className={`feature-card color-${cap.color}`}>
                <div className="feature-card-header">
                  <div className="feature-icon-box">
                    {cap.icon}
                  </div>
                  <h3 className="feature-card-title">{cap.title}</h3>
                </div>
                <p className="feature-card-desc">{cap.desc}</p>
                <div className="feature-card-value">
                  <span className="value-label">Business Value</span>
                  {cap.value}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Development Process Timeline */}
      <section className="features-process-section">
        <div className="process-header">
          <span className="features-hero-pretitle">The Roadmap</span>
          <h2 className="process-title">Our Development Lifecycle</h2>
          <p className="process-desc">From concept alignment to deployment, we follow a highly structured development workflow.</p>
        </div>

        <motion.div 
          className="process-timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {processSteps.map((step, i) => (
            <motion.div key={i} className="process-step" variants={fadeUp}>
              <div className="process-step-num">{step.num}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Technology Stack Matrix */}
      <section className="features-tech-section">
        <div className="tech-header">
          <span className="features-hero-pretitle">Our Ecosystem</span>
          <h2 className="tech-title">Technology Competencies</h2>
        </div>

        <motion.div 
          className="tech-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {technologies.map((tech, i) => (
            <motion.div key={i} className="tech-item" variants={fadeUp}>
              <img 
                src={`https://cdn.simpleicons.org/${tech.slug}`} 
                alt={`${tech.name} logo`} 
                className="tech-icon-img"
                loading="lazy"
                decoding="async"
              />
              <span className="tech-name">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-why-section">
        <div className="why-header">
          <span className="features-hero-pretitle">Why Vincie Studios</span>
          <h2 className="why-header-title">The Engineering Advantage</h2>
        </div>

        <motion.div 
          className="why-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {whyChooseUs.map((item, i) => (
            <motion.div key={i} className="why-item" variants={fadeUp}>
              <div className="why-icon">{item.icon}</div>
              <h3 className="why-title-text">{item.title}</h3>
              <p className="why-desc-text">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Custom CTA Section */}
      <section className="features-cta-section">
        <motion.div 
          className="features-cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={fadeUp}
        >
          <div className="features-cta-content">
            <h2>Ready to transform your operations?</h2>
            <p>Let's map your technical specifications and build a modular, launch-ready application customized for your workflows.</p>
          </div>
          
          <a href="/contact" className="navbar-cta-link" style={{ textDecoration: 'none' }}>
            <MagneticButton className="liquid-badge-wrapper navbar-cta-wrapper" elasticity={0.25} magneticRadius={120}>
              <div className="liquid-badge" style={{ background: '#ffffff', color: '#0f172a', padding: '16px 32px', height: 'auto' }}>
                <span className="badge-content-text" style={{ color: '#0f172a', fontWeight: 700 }}>Start your project <ArrowUpRight size={18} /></span>
                <div className="liquid-container">
                  <div className="liquid-wave wave-1"></div>
                  <div className="liquid-wave wave-2"></div>
                </div>
              </div>
            </MagneticButton>
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default FeaturesPage;
