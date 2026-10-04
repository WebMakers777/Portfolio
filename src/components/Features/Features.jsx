import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Box, CreditCard, Ship, Zap } from 'lucide-react';
import MagneticIcon from '../Common/MagneticIcon';
import './Features.css';

const Features = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <section className="features-section" id="features" aria-label="Why choose Vincie Studios">

            {/* Soft Glow behind the title */}
            <div className="section-glow"></div>



            {/* 4. "Why Vincie Studios" Header & Cards */}
            <motion.div
                className="features-secondary-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                variants={fadeUp}
            >
                <div className="secondary-glow"></div>
                <div className="liquid-badge-wrapper">
                    <div className="liquid-badge">
                        <span className="badge-content-text">Why Vincie Studios?</span>
                        <div className="liquid-container">
                            <div className="liquid-wave wave-1"></div>
                            <div className="liquid-wave wave-2"></div>
                        </div>
                    </div>
                </div>

                <h2 className="why-labs-headline">
                    We're not just builders.<br />
                    We're your <span className="highlight-dark">mission control.</span>
                    <br />
                    <span className="blue-highlight">We move faster, build leaner, and deliver</span>
                    <br />
                    a working product in under a month so you can start validating, not waiting.
                </h2>

                <motion.div
                    className="why-cards-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.08 }}
                >

                    {/* Card 1 */}
                    <motion.div className="why-card" variants={fadeUp}>
                        <div className="card-ambient-glow glow-blue"></div>
                        <div className="card-top-gradient-strip strip-blue"></div>
                        <div className="why-card-iconbox icon-blue">
                            <MagneticIcon maxRotation={20}>
                                <Rocket size={24} color="#3b82f6" />
                            </MagneticIcon>
                        </div>
                        <div className="why-card-content">
                            <h3>Built for Velocity</h3>
                            <p>Ship your core product at breakneck speed. We cut through the noise to deliver the essential features that prove your market fit.</p>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div className="why-card" variants={fadeUp}>
                        <div className="card-ambient-glow glow-orange"></div>
                        <div className="card-top-gradient-strip strip-orange"></div>
                        <div className="why-card-iconbox icon-orange">
                            <MagneticIcon maxRotation={20}>
                                <Box size={24} color="#f97316" />
                            </MagneticIcon>
                        </div>
                        <div className="why-card-content">
                            <h3>End-to-End Ownership</h3>
                            <p>Forget micromanaging tasks. We handle the architecture, design, and deployment so you can stay focused on growth and sales.</p>
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div className="why-card" variants={fadeUp}>
                        <div className="card-ambient-glow glow-teal"></div>
                        <div className="card-top-gradient-strip strip-teal"></div>
                        <div className="why-card-iconbox icon-teal">
                            <MagneticIcon maxRotation={20}>
                                <CreditCard size={24} color="#14b8a6" />
                            </MagneticIcon>
                        </div>
                        <div className="why-card-content">
                            <h3>Predictable Investment</h3>
                            <p>No scope creep or runaway hourly bills. We provide clear, milestone-based pricing that aligns perfectly with your startup's runway.</p>
                        </div>
                    </motion.div>

                </motion.div>
            </motion.div>

        </section>
    );
};

export default Features;
