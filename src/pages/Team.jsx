import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassSurface from '../components/Common/GlassSurface';
import './PageTheme.css';

const teamMembers = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Technical Director',
    bio: 'Former lead engineer at a Fortune 500. Obsessed with scalable architectures and perfect UI execution.',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Samantha Chen',
    role: 'Head of Product Design',
    bio: 'Award-winning designer with a focus on immersive, glass-morphic web experiences and user psychology.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Marcus Thorne',
    role: 'Lead AI Engineer',
    bio: 'Pioneering integration of deep learning models into consumer-facing web applications.',
    avatar: 'https://i.pravatar.cc/150?img=8'
  },
  {
    name: 'Elena Rostova',
    role: 'Full Stack Architect',
    bio: 'Specialist in high-performance WebGL rendering and physics-based interactions.',
    avatar: 'https://i.pravatar.cc/150?img=44'
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Team = () => {
  useEffect(() => {
    document.title = 'Our Team | Vincie Studios';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Meet the expert engineers and designers behind Vincie Studios building world-class MVPs and SaaS platforms.');
  }, []);

  return (
    <div className="page-container">
      <motion.div 
        className="page-team-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {teamMembers.map((member, i) => (
          <motion.div key={i} variants={fadeUp}>
            <a href="#" className="team-card-link">
              <GlassSurface
                className="team-card"
                width="100%"
                height="100%"
                borderRadius={16}
                borderWidth={1}
                blur={16}
                brightness={80}
                opacity={0.8}
                backgroundOpacity={0.05}
                padding="24px"
              >
                <div className="team-info-top">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
                <div className="team-image-placeholder">
                  Image Placeholder
                </div>
              </GlassSurface>
            </a>
          </motion.div>
        ))}
      </motion.div>

      {/* Join Our Team Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="join-team-section"
      >
        <GlassSurface
          className="join-team-card"
          width="100%"
          height="auto"
          borderRadius={32}
          borderWidth={1}
          blur={24}
          brightness={30}
          opacity={0.85}
          backgroundOpacity={0.6}
          padding="60px"
        >
          <div className="join-team-content">
            <h2 className="join-team-title">Join our team</h2>
            <p className="join-team-desc">
              Automate ticket routing, responses, and escalations with intelligent support agents that scale with your customer base.
            </p>
            <div className="join-team-positions">
              <span className="positions-label">Open positions right now:</span>
              <div className="positions-badges">
                <span className="position-badge">Frontend Engineer</span>
                <span className="position-badge">Product Designer</span>
                <span className="position-badge">Customer Success Lead</span>
                <span className="position-badge">QA Engineer</span>
                <span className="position-badge">Data Analyst</span>
                <span className="position-badge">Cloud &amp; DevOps Engineer</span>
              </div>
            </div>
          </div>
          <div className="join-team-image">
            <div className="team-image-placeholder large-placeholder">
              Image / Video Placeholder
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  );
};

export default Team;
