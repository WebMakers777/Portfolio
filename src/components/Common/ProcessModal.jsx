import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck, Database, Calendar, Award } from 'lucide-react';
import './ProcessModal.css';

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    short: "Discovery",
    desc: "We analyze your business objectives, map technical requirements, and define a feature blueprint in under a week.",
    bullets: [
      "Define business goals & success metrics",
      "Stakeholder alignment workshops",
      "Requirement gathering & user stories",
      "Technical feasibility & roadmap planning"
    ],
    deliverables: ["Scope document", "Technical roadmap", "Project timeline"]
  },
  {
    num: "02",
    title: "Architecture & Design",
    short: "Design",
    desc: "Our design team structures interactive high-fidelity user flows and wireframes to finalize the layout concept.",
    bullets: [
      "User journey mapping & flowcharts",
      "High-fidelity UI/UX design components",
      "Interactive Figma prototypes",
      "Database schema & API contract planning"
    ],
    deliverables: ["Design system", "Technical architecture", "API planning"]
  },
  {
    num: "03",
    title: "Development",
    short: "Development",
    desc: "Using modular React architectures and secure backend API structures, we build your application in sprints.",
    bullets: [
      "Agile sprint execution & weekly review cycles",
      "Reusable component library construction",
      "Robust API & database integration",
      "Automated CI/CD setup for early testing"
    ],
    deliverables: ["Production-ready code", "Test coverage", "Documentation"]
  },
  {
    num: "04",
    title: "Quality Assurance",
    short: "QA",
    desc: "We perform automated build testing, browser usability testing, and speed checks to guarantee stability.",
    bullets: [
      "Automated end-to-end & unit test runs",
      "Cross-browser and viewport usability testing",
      "Code quality, performance & speed optimization",
      "Security audit & dependency reviews"
    ],
    deliverables: ["Stable release candidate", "Bug reports", "Performance validation"]
  },
  {
    num: "05",
    title: "Deployment & Scale",
    short: "Launch",
    desc: "We deploy your system to AWS or Vercel and provide post-launch optimization support for scaling.",
    bullets: [
      "Cloud infrastructure provisioning (AWS/Vercel)",
      "Continuous logging, monitoring & analytics setup",
      "Production-ready traffic testing & DNS routing",
      "Comprehensive knowledge transfer & handoff"
    ],
    deliverables: ["Live production system", "Monitoring setup", "Knowledge transfer"]
  }
];

const trustItems = [
  "Source Code Ownership",
  "Complete Documentation",
  "CI/CD Pipelines",
  "Security Reviews",
  "Deployment Support",
  "Knowledge Transfer",
  "Monitoring & Logging",
  "Post-Launch Support"
];

const metrics = [
  {
    value: "100%",
    label: "Delivery Milestones",
    desc: "Achieved on-time launches",
    icon: <Award size={20} />
  },
  {
    value: "Agile",
    label: "Sprint-Based Execution",
    desc: "Adaptive development sprints",
    icon: <Calendar size={20} />
  },
  {
    value: "24/7",
    label: "Transparent Communication",
    desc: "Continuous progress syncs",
    icon: <Database size={20} />
  },
  {
    value: "Secure",
    label: "Production-Ready Architecture",
    desc: "Optimized for scaling loads",
    icon: <ShieldCheck size={20} />
  }
];

const ProcessModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('process-modal-backdrop')) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="process-modal-backdrop" onClick={handleBackdropClick}>
          {/* Ambient Glowing Orbs inside Backdrop */}
          <div className="modal-ambient-orbs">
            <div className="modal-orb modal-orb-1"></div>
            <div className="modal-orb modal-orb-2"></div>
          </div>

          <motion.div
            className="process-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button 
              className="modal-close-btn" 
              onClick={onClose} 
              aria-label="Close process walkthrough modal"
            >
              <X size={20} />
            </button>

            <div className="modal-scroll-container">
              {/* Header */}
              <header className="modal-header">
                <span className="modal-pretitle">Delivery System</span>
                <h2 className="modal-title">How We Deliver Software</h2>
                <p className="modal-desc">
                  A transparent engineering process designed to move from idea to production with speed, quality, and predictability.
                </p>
              </header>

              {/* Interactive timeline grid */}
              <div className="modal-interactive-timeline">
                
                {/* Steps Stepper */}
                <div className="timeline-stepper">
                  <div className="timeline-progress-line-bg">
                    <div 
                      className="timeline-progress-line-active"
                      style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    />
                  </div>
                  {steps.map((step, idx) => {
                    const isActive = idx === activeStep;
                    const isCompleted = idx < activeStep;
                    return (
                      <button
                        key={idx}
                        className={`stepper-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        onClick={() => setActiveStep(idx)}
                      >
                        <div className="node-indicator">
                          {isCompleted ? <Check size={12} /> : <span>{step.num}</span>}
                        </div>
                        <span className="node-label">{step.short}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Step Detail Card */}
                <div className="timeline-detail-box">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="step-detail-content"
                    >
                      <span className="step-detail-num">Phase {steps[activeStep].num}</span>
                      <h3 className="step-detail-title">{steps[activeStep].title}</h3>
                      <p className="step-detail-desc">{steps[activeStep].desc}</p>
                      
                      <div className="step-detail-columns">
                        <div className="detail-column">
                          <h4>Process Tasks</h4>
                          <ul>
                            {steps[activeStep].bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="detail-column">
                          <h4>Deliverables</h4>
                          <div className="deliverable-tags">
                            {steps[activeStep].deliverables.map((deliv, dIdx) => (
                              <span key={dIdx} className="deliverable-tag">
                                <Check size={12} /> {deliv}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Trust Indicators */}
              <section className="modal-trust-section">
                <h3 className="modal-section-title">What Every Project Includes</h3>
                <div className="trust-grid">
                  {trustItems.map((item, idx) => (
                    <div key={idx} className="trust-grid-item">
                      <div className="trust-check-icon">
                        <Check size={14} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Outcome Metrics */}
              <section className="modal-metrics-section">
                <h3 className="modal-section-title">Outcome & Execution Standards</h3>
                <div className="metrics-grid">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="metric-box">
                      <div className="metric-icon-wrap">
                        {metric.icon}
                      </div>
                      <div className="metric-val">{metric.value}</div>
                      <div className="metric-lbl">{metric.label}</div>
                      <div className="metric-desc">{metric.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Final Conversion Block */}
              <section className="modal-cta-section">
                <div className="modal-cta-card">
                  <div className="modal-cta-glow"></div>
                  <h3 className="modal-cta-title">Ready to discuss your project?</h3>
                  <p className="modal-cta-desc">
                    Let's map your requirements, define the architecture, and build a roadmap tailored to your business.
                  </p>
                  <div className="modal-cta-buttons">
                    <a href="/contact" className="modal-primary-btn" onClick={onClose}>
                      Book a Strategy Call <ArrowRight size={16} />
                    </a>
                    <button className="modal-secondary-btn" onClick={onClose}>
                      View Our Capabilities
                    </button>
                  </div>
                </div>
              </section>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProcessModal;
