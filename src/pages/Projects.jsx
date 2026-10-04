import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProjectsComponent from '../components/Projects/Projects';
import MagneticButton from '../components/Common/MagneticButton';
import './Projects.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const ProjectsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Projects & Portfolio | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Explore our portfolio of Websites, Custom Softwares, AI Automations, and SaaS platforms engineered by Vincie Studios.'
    );
  }, []);

  return (
    <div className="projects-page">
      {/* Core Scroll-Choreographed Projects Showcase */}
      <ProjectsComponent />

      {/* Impact / Metrics Section */}
      <motion.section 
        className="projects-metrics"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer}
      >
        <div className="projects-metrics-lines" aria-hidden="true" />
        <div className="metrics-grid">
          <motion.div variants={fadeUp} style={{ height: '100%' }}>
            <div className="metric-card">
              <div className="metric-value">50+</div>
              <div className="metric-label">Products Shipped</div>
              <div className="metric-desc">From zero-to-one MVPs to full-scale enterprise migrations.</div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} style={{ height: '100%' }}>
            <div className="metric-card">
              <div className="metric-value">99%</div>
              <div className="metric-label">Client Retention</div>
              <div className="metric-desc">Our partners stay with us because we treat their business like our own.</div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} style={{ height: '100%' }}>
            <div className="metric-card">
              <div className="metric-value">6 mo</div>
              <div className="metric-label">Average Engagement</div>
              <div className="metric-desc">Long-term architectural partnerships, not just gig work.</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="projects-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">Ready to build your next big thing?</h2>
            <p className="cta-desc">
              Whether you need a rapid MVP or a scalable enterprise architecture, our engineering team is ready to execute.
            </p>
            <div
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
                if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
              }}
              style={{ cursor: 'pointer' }}
            >
              <MagneticButton className="liquid-badge-wrapper navbar-cta-wrapper" elasticity={0.25} magneticRadius={120} style={{ marginTop: '16px' }}>
                <div className="liquid-badge" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                  <span className="badge-content-text">Start a Project ↗</span>
                  <div className="liquid-container">
                    <div className="liquid-wave wave-1"></div>
                    <div className="liquid-wave wave-2"></div>
                  </div>
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectsPage;
