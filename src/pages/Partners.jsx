import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ShieldCheck, 
  Maximize2, 
  GitMerge 
} from 'lucide-react';
import GlassSurface from '../components/Common/GlassSurface';
import './Partners.css';

const trustIndicators = [
  {
    title: "Production-Ready Architecture",
    desc: "Rigorous standards for stability.",
    icon: <Activity size={20} />
  },
  {
    title: "Secure Infrastructure",
    desc: "High grade data encryption.",
    icon: <ShieldCheck size={20} />
  },
  {
    title: "Scalable Systems",
    desc: "Dynamic resource auto-scaling.",
    icon: <Maximize2 size={20} />
  },
  {
    title: "Enterprise Integrations",
    desc: "Seamless third-party APIs.",
    icon: <GitMerge size={20} />
  }
];

const categories = [
  {
    id: "infra",
    name: "Infrastructure & Deployment",
    glowClass: "glow-infra",
    dotClass: "infra",
    items: [
      {
        name: "AWS",
        slug: "amazonwebservices",
        desc: "Secure cloud infrastructure engineered for scalability and reliability.",
        value: "Ensures 99.99% system availability with automated failover and instant auto-scaling."
      },
      {
        name: "Vercel",
        slug: "vercel",
        desc: "High-performance deployments and global edge delivery.",
        value: "Guarantees sub-second page loads and dynamic routing at global edge scale."
      },
      {
        name: "Docker",
        slug: "docker",
        desc: "Containerized application packaging for isolated execution environments.",
        value: "Provides 100% environment parity between local staging and live production."
      }
    ]
  },
  {
    id: "ai",
    name: "AI & Automation",
    glowClass: "glow-ai",
    dotClass: "ai",
    items: [
      {
        name: "OpenAI",
        slug: "openai",
        desc: "AI-powered automation, copilots, and intelligent workflows.",
        value: "Powers advanced search indexing, semantic retrieval, and automated assistance."
      },
      {
        name: "GitHub",
        slug: "github",
        desc: "Cloud-hosted version control and automated CI/CD deployment pipelines.",
        value: "Enables secure collaborative engineering workflows and automated test checks."
      }
    ]
  },
  {
    id: "data",
    name: "Data & Storage",
    glowClass: "glow-data",
    dotClass: "data",
    items: [
      {
        name: "Supabase",
        slug: "supabase",
        desc: "Modern backend services with authentication, storage, and databases.",
        value: "Accelerates secure admin dashboard construction with auto-generated APIs."
      },
      {
        name: "PostgreSQL",
        slug: "postgresql",
        desc: "Advanced open-source relational database engineered for complex queries.",
        value: "Guarantees transactional integrity (ACID) and scales to millions of data tables."
      },
      {
        name: "Redis",
        slug: "redis",
        desc: "Ultra-fast in-memory data store for caching and real-time session storage.",
        value: "Drastically lowers database query load by caching hot data in memory."
      }
    ]
  },
  {
    id: "payments",
    name: "Payments & Commerce",
    glowClass: "glow-payments",
    dotClass: "payments",
    items: [
      {
        name: "Stripe",
        slug: "stripe",
        desc: "Enterprise-grade payment processing and subscription billing.",
        value: "Facilitates global frictionless checkout conversions and unified billing tables."
      }
    ]
  },
  {
    id: "design",
    name: "Design & Product Development",
    glowClass: "glow-design",
    dotClass: "design",
    items: [
      {
        name: "Figma",
        slug: "figma",
        desc: "Collaborative product design and rapid prototyping workflows.",
        value: "Enables real-time design iterations and zero-friction developer handoffs."
      },
      {
        name: "Framer Motion",
        slug: "framer",
        desc: "Modern animation library for creating fluid, gesture-driven web interactions.",
        value: "Powers high-performance scroll animations and responsive page entries."
      }
    ]
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Partners = () => {
  useEffect(() => {
    document.title = 'Technology Ecosystem | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content', 
      'Explore the battle-tested technologies and infrastructure platforms powering the software ecosystems engineered by Vincie Studios.'
    );
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  return (
    <div className="page-container partners-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={32}
          borderWidth={1}
          blur={16}
          className="page-surface partners-surface"
        >
          <div className="partners-page-inner">
            
            {/* Redesigned Header Block */}
            <header className="partners-header">
              <span className="partners-pretitle">Ecosystem</span>
              <h1 className="partners-title">Built on Proven Infrastructure</h1>
              <p className="partners-desc">
                Our application platforms and custom workflows are built using industry-leading technologies 
                trusted by startups, enterprises, and high-growth businesses worldwide. We deploy robust, 
                high-availability ecosystems for uncompromised reliability.
              </p>
            </header>

            {/* Trust Indicators Row */}
            <motion.div 
              className="trust-indicators-row"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.06 }}
            >
              {trustIndicators.map((indicator, idx) => (
                <motion.div 
                  key={idx} 
                  className="trust-indicator-card"
                  variants={fadeUp}
                >
                  <div className="trust-icon-box">
                    {indicator.icon}
                  </div>
                  <div className="trust-text-box">
                    <span className="trust-title">{indicator.title}</span>
                    <span className="trust-desc">{indicator.desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Categorized Grids */}
            <div className="ecosystem-categories">
              {categories.map((category) => (
                <div key={category.id} className="category-block">
                  
                  {/* Category Header */}
                  <div className="category-title-wrap">
                    <div className={`category-dot ${category.dotClass}`}></div>
                    <h2 className="category-name">{category.name}</h2>
                  </div>

                  {/* Grid for this Category */}
                  <motion.div 
                    className="ecosystem-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.06 }}
                  >
                    {category.items.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        className={`ecosystem-card ${category.glowClass}`}
                        variants={fadeUp}
                      >
                        <div className="ecosystem-card-header">
                          <div className="tech-icon-container">
                            <img 
                              src={`https://cdn.simpleicons.org/${item.slug}`} 
                              alt={`${item.name} logo`} 
                              className="tech-icon-img"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loops
                                e.target.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${item.slug}.svg`;
                              }}
                            />
                          </div>
                          <h3 className="tech-title">{item.name}</h3>
                        </div>
                        <p className="tech-role">{item.desc}</p>
                        <div className="tech-value">
                          <span className="value-tag">Business Value</span>
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

          </div>
        </GlassSurface>
      </motion.div>
    </div>
  );
};

export default Partners;
