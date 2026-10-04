import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Eye, ShieldCheck, Key } from 'lucide-react';
import GlassSurface from '../components/Common/GlassSurface';
import './Story.css';

const Story = () => {
  useEffect(() => {
    document.title = 'Our Story | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Learn how Vincie Studios became a leading software engineering and MVP development agency helping startups ship products in record time.');
  }, []);

  const [activeTab, setActiveTab] = useState('Workspace');

  const tabContent = {
    Workspace: {
      title: 'Our Workspace',
      desc: 'Where ideas become systems. Our team operates in a high-energy, collaborative environment where developers, AI engineers, and strategists work side by side — solving real problems, every single day.'
    },
    Process: {
      title: 'Our Process',
      desc: 'We do not believe in endless meetings. We believe in rapid prototyping, iterative engineering, and shipping code that works. Our process is designed to turn your vision into a scalable product in record time.'
    },
    Culture: {
      title: 'Our Culture',
      desc: 'A culture built on transparency, deep technical rigor, and a relentless obsession with quality. We hire the top 1% of talent who are passionate about building the future, not just participating in it.'
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.06 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="story-page">
      
      {/* 1. Hero Section */}
      <motion.section className="story-hero" {...fadeInUp}>
        <h1 className="story-title">About Us</h1>
        <p className="story-desc">Building the future of AI-powered solutions</p>
      </motion.section>

      {/* 2. Why Choose Us Section */}
      <motion.section className="story-section section-purple" {...fadeInUp}>
        <div className="story-section-header">
          <span className="story-pretitle">OUR NUMBERS</span>
          <h2 className="story-title">Why choose us?</h2>
          <p className="story-desc">
            We don't just build technology — we build partnerships. Here's what five years of focused execution, dedicated teams, and client-first thinking looks like in numbers.
          </p>
        </div>

        <div className="story-numbers-grid">
          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={16} brightness={50}>
            <div className="number-card">
              <h3 className="number-value">50+</h3>
              <h4 className="number-title">Projects delivered</h4>
              <p className="number-desc">From startups to enterprises across 10+ industries — every project fully customized, on time, and built to scale.</p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={16} brightness={50}>
            <div className="number-card">
              <h3 className="number-value">95%</h3>
              <h4 className="number-title">Client satisfaction</h4>
              <p className="number-desc">Our clients trust us for quality, reliability, and continuous support — long after the product goes live.</p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={16} brightness={50}>
            <div className="number-card">
              <h3 className="number-value">30+</h3>
              <h4 className="number-title">Team members</h4>
              <p className="number-desc">A world-class team of developers, AI engineers, and consultants — working as one unit to bring your vision to life.</p>
            </div>
          </GlassSurface>
        </div>
        <div className="section-lines"></div>
      </motion.section>

      {/* 3. Values Section */}
      <motion.section className="story-section story-split section-green" {...fadeInUp}>
        <div className="story-split-content">
          <span className="story-pretitle">VALUES</span>
          <h2 className="story-title">Guided by what matters</h2>
          <p className="story-desc">
            We believe great technology is built on even greater principles — clarity, commitment, and a relentless drive to deliver value for every client we work with.
          </p>
          <button className="story-cta-btn">Get started</button>
        </div>

        <div className="story-values-grid">
          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={12}>
            <div className="value-card">
              <div className="motion-loop-container">
                <img src="/story-loop-1.webp" alt="Focus on scale visual" className="motion-loop-visual anim-float-1" loading="lazy" />
              </div>
              <h4 className="value-title">Focus on scale</h4>
              <p className="value-desc">Every solution we build is designed to grow with you. From day one, scalability is baked into the architecture.</p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={12}>
            <div className="value-card">
              <div className="motion-loop-container">
                <img src="/story-loop-2.webp" alt="Team focus visual" className="motion-loop-visual anim-float-2" loading="lazy" />
              </div>
              <h4 className="value-title">Strong team focus</h4>
              <p className="value-desc">Our 30+ member team brings together specialists in development, AI, and consulting — collaborating closely.</p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={12}>
            <div className="value-card">
              <div className="motion-loop-container">
                <img src="/story-loop-3.webp" alt="Engineering rigor visual" className="motion-loop-visual anim-float-3" loading="lazy" />
              </div>
              <h4 className="value-title">Engineering Rigor</h4>
              <p className="value-desc">We never cut corners. Clean code, comprehensive testing, and robust infrastructure are non-negotiable.</p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} borderWidth={1} blur={12}>
            <div className="value-card">
              <div className="motion-loop-container">
                <img src="/story-loop-4.webp" alt="Transparency visual" className="motion-loop-visual anim-float-4" loading="lazy" />
              </div>
              <h4 className="value-title">Transparency</h4>
              <p className="value-desc">Zero jargon, no hidden fees. We believe in building trust through absolute transparency and honest communication.</p>
            </div>
          </GlassSurface>
        </div>
        <div className="section-lines"></div>
      </motion.section>

      {/* 4. Workspace Section */}
      <motion.section className="story-section section-blue" {...fadeInUp}>
        <div className="story-section-header">
          <span className="story-pretitle">INSIDE VINCIE</span>
          <h2 className="story-title">A glimpse into how we work</h2>
        </div>

        <GlassSurface width="100%" height="auto" borderRadius={32} borderWidth={1} blur={16} padding="0">
          <div className="story-split workspace-split-inner">
            <div className="story-split-content" style={{ position: 'static' }}>
              <div className="workspace-tabs">
                {['Workspace', 'Process', 'Culture'].map((tab) => (
                  <button 
                    key={tab}
                    className={`workspace-tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="workspace-content-title">{tabContent[activeTab].title}</h3>
                <p className="story-desc">{tabContent[activeTab].desc}</p>
              </motion.div>
            </div>

            <div className="workspace-motion-loop">
              <img src="/story-loop-5.webp" alt="Workspace dynamic visual" className="motion-loop-visual anim-float-5" loading="lazy" />
            </div>
          </div>
        </GlassSurface>
        <div className="section-lines"></div>
      </motion.section>

      {/* 5. Promise Section */}
      <motion.section className="story-section story-split section-pink" {...fadeInUp}>
        <div className="story-split-content">
          <span className="story-pretitle">OUR PROMISE</span>
          <h2 className="story-title">What you actually get when you work with us</h2>
          <p className="story-desc">
            Beyond the tech, beyond the deliverables — here's what working with Vincie Studios truly feels like.
          </p>
          <button className="story-cta-btn">Get started</button>
        </div>

        <div className="promise-list">
          {[
            {
              num: '01',
              icon: <HeartHandshake size={20} color="#3b82f6" />,
              title: 'We treat your business like our own',
              desc: "We don't clock in and clock out. Every decision we make — from architecture to UI — is made with your growth in mind. Your problems become our problems, until they're solved."
            },
            {
              num: '02',
              icon: <Eye size={20} color="#3b82f6" />,
              title: 'Zero jargon, full transparency',
              desc: "No confusing tech-talk, no hidden surprises. We keep communication clear, timelines honest, and you in the loop — always. You'll always know exactly where your project stands."
            },
            {
              num: '03',
              icon: <ShieldCheck size={20} color="#3b82f6" />,
              title: 'Built right the first time',
              desc: "We'd rather take the time to do it properly than rush a half-baked solution. Every system we deliver is tested, refined, and genuinely ready for the real world."
            },
            {
              num: '04',
              icon: <Key size={20} color="#3b82f6" />,
              title: 'You own everything, completely',
              desc: "Your code, your data, your IP — all of it belongs to you from day one. No lock-ins, no dependency traps. We build for your freedom, not ours."
            }
          ].map((promise) => (
            <div className="promise-item" key={promise.num}>
              <span className="promise-num">{promise.num}</span>
              <div className="promise-icon-wrapper">
                {promise.icon}
              </div>
              <div className="promise-content">
                <h4>{promise.title}</h4>
                <p>{promise.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="section-lines"></div>
      </motion.section>

    </div>
  );
};

export default Story;
