import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Award,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CheckCircle,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Eye,
  FileText,
  Gauge,
  GitMerge,
  Globe,
  Headphones,
  HeartHandshake,
  Key,
  Layers,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  Package,
  Paintbrush,
  Palette,
  PieChart,
  Plug,
  Receipt,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Target,
  TrendingUp,
  Truck,
  UserCheck,
  UserPlus,
  Users,
  Workflow,
  Zap
} from 'lucide-react';
import { getServiceBySlug } from '../services/serviceData';
import MagneticButton from '../../components/Common/MagneticButton';
import './ServicePage.css';

const ICON_MAP = {
  Activity,
  ArrowUpRight,
  Award,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CheckCircle,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Eye,
  FileText,
  Gauge,
  GitMerge,
  Globe,
  Headphones,
  HeartHandshake,
  Key,
  Layers,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  Package,
  Paintbrush,
  Palette,
  PieChart,
  Plug,
  Receipt,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Target,
  TrendingUp,
  Truck,
  UserCheck,
  UserPlus,
  Users,
  Workflow,
  Zap
};

// ---------------------------------------------------------------------------
// Dynamic Icon Helper – renders any mapped lucide icon by its PascalCase name
// ---------------------------------------------------------------------------
const DynamicIcon = ({ name, size = 24, ...props }) => {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} {...props} />;
};

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ---------------------------------------------------------------------------
// Animated Counter – animates stat values into view
// ---------------------------------------------------------------------------
const AnimatedCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} className="stat-item" variants={fadeUp}>
      <motion.span
        className="stat-value"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// ServicePage Component
// ---------------------------------------------------------------------------
const ServicePage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(serviceSlug);

  // Redirect to /features if the slug doesn't match any service
  useEffect(() => {
    if (!service) navigate('/features');
  }, [service, navigate]);

  // Set document title, meta description and scroll to top on slug change
  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Vincie Studios`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', service.description);
    }
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, [serviceSlug, service]);

  if (!service) return null;

  // CSS custom properties so the service colour cascades to child elements
  const serviceStyle = {
    '--service-color': service.color,
    '--service-color-light': service.color + '15'
  };

  return (
    <div className="service-page" style={serviceStyle}>
      {/* ---------------------------------------------------------------- */}
      {/* 1. Ambient Background Orbs                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="service-ambient-orbs">
        <div className="service-orb service-orb-1" style={{ background: service.color + '30' }}></div>
        <div className="service-orb service-orb-2" style={{ background: service.color + '20' }}></div>
        <div className="service-orb service-orb-3" style={{ background: service.color + '15' }}></div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. Hero Section                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-hero">
        <motion.div
          className="service-hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="service-badge" variants={fadeUp}>
            <DynamicIcon name={service.iconName} size={14} /> {service.title}
          </motion.div>

          <motion.h1 className="service-hero-title" variants={fadeUp}>
            {service.tagline}
          </motion.h1>

          <motion.p className="service-hero-desc" variants={fadeUp}>
            {service.description}
          </motion.p>

          <motion.div className="service-stats-row" variants={staggerContainer}>
            {service.stats.map((stat, i) => (
              <AnimatedCounter key={i} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="service-hero-visual"
          initial="hidden"
          animate="visible"
          variants={fadeRight}
        >
          <motion.img
            src={service.heroImage}
            alt={service.title}
            className="service-hero-image"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. Business Value Section                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-section">
        <motion.div
          className="service-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="service-section-pretitle">Business Impact</span>
          <h2 className="service-section-title">What It Brings to Your Business</h2>
          <p className="service-section-desc">
            Measurable outcomes that directly impact your bottom line.
          </p>
        </motion.div>

        <motion.div
          className="business-value-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {service.businessValue.map((item, i) => (
            <motion.div key={i} className="value-card" variants={fadeUp}>
              <div className="value-card-icon">
                <DynamicIcon name={item.iconName} size={22} />
              </div>
              <h3 className="value-card-title">{item.title}</h3>
              <p className="value-card-desc">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. Vincie Approach Section                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-section approach-section">
        <motion.div
          className="service-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="service-section-pretitle">Our Process</span>
          <h2 className="service-section-title">How Vincie Delivers</h2>
          <p className="service-section-desc">
            A structured approach from discovery to deployment.
          </p>
        </motion.div>

        <motion.div
          className="approach-timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {service.elixorApproach.map((step, i) => (
            <motion.div key={i} className="approach-step" variants={fadeLeft}>
              <div className="approach-step-number">{step.step}</div>
              <div className="approach-step-content">
                <h3 className="approach-step-title">{step.title}</h3>
                <p className="approach-step-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. Key Capabilities Grid                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-section">
        <motion.div
          className="service-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="service-section-pretitle">Capabilities</span>
          <h2 className="service-section-title">Key Features & Capabilities</h2>
        </motion.div>

        <motion.div
          className="features-capability-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {service.features.map((feat, i) => (
            <motion.div key={i} className="capability-card" variants={scaleIn}>
              <div className="capability-icon">
                <DynamicIcon name={feat.iconName} size={20} />
              </div>
              <h3 className="capability-title">{feat.title}</h3>
              <p className="capability-desc">{feat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. Tech Stack Marquee                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-section tech-marquee-section">
        <motion.div
          className="service-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="service-section-pretitle">Technology Stack</span>
          <h2 className="service-section-title">Built With Best-in-Class Tools</h2>
        </motion.div>

        <div className="tech-marquee-wrapper">
          <div className="tech-marquee-track">
            {[...service.techStack, ...service.techStack].map((tech, i) => (
              <div key={i} className="tech-marquee-item">
                <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} loading="lazy" decoding="async" />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. Use Cases                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-section">
        <motion.div
          className="service-section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="service-section-pretitle">Use Cases</span>
          <h2 className="service-section-title">Industries & Applications</h2>
        </motion.div>

        <motion.div
          className="use-cases-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {service.useCases.map((useCase, i) => (
            <motion.div key={i} className="use-case-item" variants={fadeUp}>
              <DynamicIcon name="CheckCircle" size={20} />
              <span>{useCase}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. CTA Section                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="service-cta-section">
        <motion.div
          className="service-cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="service-cta-content">
            <h2>Ready to build your {service.title.toLowerCase()}?</h2>
            <p>
              Let's discuss your requirements and create a solution that transforms your business
              operations.
            </p>
          </div>

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <MagneticButton
              className="liquid-badge-wrapper navbar-cta-wrapper"
              elasticity={0.25}
              magneticRadius={120}
            >
              <div
                className="liquid-badge"
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  padding: '16px 32px',
                  height: 'auto'
                }}
              >
                <span
                  className="badge-content-text"
                  style={{ color: '#0f172a', fontWeight: 700 }}
                >
                  Start your project <DynamicIcon name="ArrowUpRight" size={18} />
                </span>
                <div className="liquid-container">
                  <div className="liquid-wave wave-1"></div>
                  <div className="liquid-wave wave-2"></div>
                </div>
              </div>
            </MagneticButton>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicePage;
