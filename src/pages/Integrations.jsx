import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Integrations.css';

const allTools = [
  { name: "Stripe", slug: "stripe" },
  { name: "Razorpay", slug: "razorpay" },
  { name: "GitHub", slug: "github" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Shopify", slug: "shopify" },
  { name: "Mailchimp", slug: "mailchimp" },
  { name: "QuickBooks", slug: "quickbooks" },
  { name: "Xero", slug: "xero" },
  { name: "Zoho", slug: "zoho" },
  { name: "WooCommerce", slug: "woocommerce" },
  { name: "SAP", slug: "sap" },
  { name: "Jira", slug: "jira" },
  { name: "GitLab", slug: "gitlab" },
  { name: "Bitbucket", slug: "bitbucket" },
  { name: "Datadog", slug: "datadog" },
  { name: "Sentry", slug: "sentry" },
  { name: "Vercel", slug: "vercel" },
  { name: "Netlify", slug: "netlify" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Notion", slug: "notion" },
  { name: "Figma", slug: "figma" },
  { name: "Zendesk", slug: "zendesk" },
  { name: "Intercom", slug: "intercom" },
  { name: "Discord", slug: "discord" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Linux", slug: "linux" },
  { name: "Apple", slug: "apple" },
  { name: "Android", slug: "android" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "YouTube", slug: "youtube" },
  { name: "Meta", slug: "meta" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Zoom", slug: "zoom" },
  { name: "Trello", slug: "trello" },
  { name: "Asana", slug: "asana" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Redis", slug: "redis" }
];

const Integrations = () => {
  useEffect(() => {
    document.title = 'Integrations | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore the tools and platforms we integrate with — from Stripe and AWS to Shopify, HubSpot, and more.');
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="integrations-page">
      <div className="integrations-ambient-bg"></div>

      {/* Hero Section */}
      <section className="int-hero-section">
        <motion.div
          className="liquid-badge-wrapper"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="liquid-badge">
            <span className="badge-content-text">Integrations</span>
            <div className="liquid-container">
              <div className="liquid-wave wave-1"></div>
              <div className="liquid-wave wave-2"></div>
            </div>
          </div>
        </motion.div>

        <motion.h1 
          className="int-hero-title"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          Connect with the <br />tools you already <span className="text-gradient">love</span>.
        </motion.h1>

        <motion.p 
          className="int-hero-desc"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          We don't build in isolation. Our products are designed to seamlessly integrate with your existing workflows, CRMs, payment gateways, and data pipelines.
        </motion.p>
      </section>

      {/* Floating Logos Section (No Blocks) */}
      <section className="int-logos-section">
        <motion.div 
          className="int-logos-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {allTools.map((tool, i) => (
            <motion.div 
              key={i} 
              className="int-logo-item" 
              variants={fadeUp}
              title={tool.name}
            >
              <img 
                src={`https://cdn.simpleicons.org/${tool.slug}`} 
                alt={`${tool.name} logo`} 
                className="int-logo-img"
                loading="lazy"
                decoding="async"
              />
              <span className="int-logo-name">{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Custom CTA */}
      <section className="int-cta-section">
        <motion.div 
          className="int-cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <div className="int-cta-content">
            <h2>Need a custom integration?</h2>
            <p>If your tool isn't listed here, we can build a custom API bridge specifically tailored for your workflow.</p>
          </div>
          <a href="/contact" className="int-cta-btn">
            Let's Talk <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Integrations;
