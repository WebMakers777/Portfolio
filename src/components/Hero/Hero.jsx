import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, CodeXml, Clock, BrainCircuit, Box } from 'lucide-react';
import MagneticIcon from '../Common/MagneticIcon';
import BlurText from '../Common/BlurText';
import HeroBackground from './HeroBackground';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    const handleNavClick = (e, href) => {
        e.preventDefault();
        if (href.startsWith('#')) {
            if (window.lenis) {
                window.lenis.scrollTo(href, { offset: -80 });
            } else {
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(href);
            window.scrollTo(0, 0);
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 20 }
        }
    };

    const featureBarVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, delay: 0.6 }
        }
    };

    return (
        <section className="hero-section" id="home" aria-label="Hero — Craft and Launch with Velocity">
            {/* 3D Cursor-Responsive Background */}
            <HeroBackground />

            <motion.div
                className="hero-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
            >

                {/* Top Badge */}
                <motion.div className="hero-badge-container" variants={itemVariants}>
                    <div className="hero-trust-badge">
                        <div className="avatar-group">
                            <img src="https://i.pravatar.cc/100?img=11" alt="Startup founder testimonial for Vincie Studios" loading="lazy" width="40" height="40" />
                            <img src="https://i.pravatar.cc/100?img=12" alt="SaaS platform founder review for Vincie Studios" loading="lazy" width="40" height="40" />
                            <img src="https://i.pravatar.cc/100?img=13" alt="Tech startup CEO testimonial on rapid product development" loading="lazy" width="40" height="40" />
                        </div>
                        <span className="badge-text">Loved by forward-thinking startups.</span>
                        <span className="badge-highlight">⚡ FAST</span>
                    </div>
                </motion.div>

                {/* Main Content Split Layout */}
                <div className="hero-main">
                    {/* Left Column: Headline */}
                    <div className="hero-left">
                        <h1 className="hero-title">
                            <BlurText as="span" text="Craft " delay={50} style={{ verticalAlign: 'middle' }} />
                            <span className="glass-icon glass-icon-green" style={{ verticalAlign: 'middle' }}><CodeXml size={24} /></span> 
                            <BlurText as="span" text=" and Launch" delay={50} style={{ verticalAlign: 'middle' }} />
                            <br />
                            <BlurText as="span" text="with Velocity " delay={50} style={{ verticalAlign: 'middle' }} />
                            <MagneticIcon className="glass-icon glass-icon-silver" style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                                <Rocket size={24} fill="#0f172a" />
                            </MagneticIcon>
                        </h1>
                    </div>

                    {/* Right Column: Subheadline and CTA */}
                    <div className="hero-right">
                        <BlurText 
                            className="hero-subtitle"
                            text="Turn your vision into a stunning digital experience. We manage the heavy lifting of design and code, letting you focus on scaling."
                            delay={30}
                            direction="top"
                            animateBy="words"
                        />
                        <a href="/contact" style={{ textDecoration: 'none' }} onClick={(e) => handleNavClick(e, '/contact')}>
                            <div className="liquid-badge-wrapper hero-cta-wrapper">
                                <div className="liquid-badge">
                                    <span className="badge-content-text">Start your project ↗</span>
                                    <div className="liquid-container">
                                        <div className="liquid-wave wave-1"></div>
                                        <div className="liquid-wave wave-2"></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Bottom Features Glass Bar */}
                <motion.div className="hero-features-wrapper" variants={featureBarVariants}>
                    <div className="hero-features">
                        <div className="feature">
                            <MagneticIcon className="feature-icon">
                                <Clock size={16} />
                            </MagneticIcon>
                            <span className="feature-text">Rapid Delivery</span>
                        </div>
                        <div className="feature">
                            <MagneticIcon className="feature-icon">
                                <BrainCircuit size={16} />
                            </MagneticIcon>
                            <span className="feature-text">Custom Solutions</span>
                        </div>
                        <div className="feature">
                            <MagneticIcon className="feature-icon">
                                <Box size={16} />
                            </MagneticIcon>
                            <span className="feature-text">Future-Proof Architecture</span>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
