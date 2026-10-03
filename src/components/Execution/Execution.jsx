import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Server, Rocket, Timer } from 'lucide-react';
import './Execution.css';

const Execution = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const videos = sectionEl.querySelectorAll('video');
        const observer = new IntersectionObserver(
            (entries) => {
                const isVisible = entries[0]?.isIntersecting;
                videos.forEach((video) => {
                    if (isVisible) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { rootMargin: '200px 0px', threshold: 0.01 }
        );

        observer.observe(sectionEl);
        return () => observer.disconnect();
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <section ref={sectionRef} className="execution-section" id="execution" aria-label="Services and delivery speed">
            {/* Ambient Background Glow */}
            <div className="execution-bg-glow"></div>

            <motion.div
                className="execution-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
            >
                <div className="liquid-badge-wrapper section-badge">
                    <div className="liquid-badge">
                        <span className="badge-content-text">Lightning Fast Delivery</span>
                        <div className="liquid-container">
                            <div className="liquid-wave wave-1"></div>
                            <div className="liquid-wave wave-2"></div>
                        </div>
                    </div>
                </div>
                <h2 className="execution-headline">
                    We engineer complete<br />products at velocity
                </h2>
                <p className="execution-subtext">
                    Your vision, realized. Stop waiting months for a product that can be built in weeks.
                </p>
            </motion.div>

            <motion.div 
                className="bento-grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {/* 1. Massive 21 Days Card */}
                <motion.div className="bento-card bento-large bento-21-days" variants={fadeUp}>
                    <div className="bento-content">
                        <div className="bento-icon-wrapper"><Timer size={24} color="#059669" /></div>
                        <h3 className="bento-title">From Idea to MVP in 21 Days</h3>
                        <p className="bento-desc">Traditional teams take 3 to 6 months. We deploy production-ready applications in 3 weeks by leveraging AI workflows and pre-built scalable infrastructure.</p>
                        
                        <div className="comparison-graphic">
                            <div className="comp-row">
                                <span className="comp-label">Vincie Studios</span>
                                <div className="comp-bar-wrapper">
                                    <div className="comp-bar elixor-bar-fill">
                                        <span className="comp-value">21 Days</span>
                                        <Zap size={14} className="flash-icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="comp-row">
                                <span className="comp-label">Traditional Teams</span>
                                <div className="comp-bar-wrapper">
                                    <div className="comp-bar traditional-bar-fill">
                                        <span className="comp-value">180+ Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="bento-note">*The Earth moves 54M km around the Sun in 21 days. We launch your MVP just as fast.</p>
                    </div>
                </motion.div>

                {/* 2. Architecture Card */}
                <motion.div className="bento-card bento-tall image-card" variants={fadeUp}>
                    <video className="bento-image video-frame-1" loop muted playsInline preload="none" poster="/exec-arch.webp">
                        <source src="https://cdn.coverr.co/videos/coverr-abstract-neon-lines-4113/1080p.mp4" type="video/mp4" />
                    </video>
                    <div className="bento-overlay">
                        <div className="bento-icon-wrapper"><Server size={20} color="#0f172a" /></div>
                        <h3 className="bento-title">Solid Architecture</h3>
                        <p className="bento-desc">Built to handle millions of requests without breaking a sweat.</p>
                    </div>
                </motion.div>

                {/* 3. Speed & Velocity Card */}
                <motion.div className="bento-card bento-wide image-card" variants={fadeUp}>
                    <video className="bento-image video-frame-2" loop muted playsInline preload="none" poster="/exec-speed.webp">
                        <source src="https://cdn.coverr.co/videos/coverr-abstract-neon-lines-4113/1080p.mp4" type="video/mp4" />
                    </video>
                    <div className="bento-overlay">
                        <div className="bento-icon-wrapper"><Zap size={20} color="#0f172a" /></div>
                        <h3 className="bento-title">Maximum Velocity</h3>
                        <p className="bento-desc">AI-driven pipelines and zero technical debt ensure we move faster than your competition.</p>
                    </div>
                </motion.div>

                {/* 4. Launch Card */}
                <motion.div className="bento-card image-card" variants={fadeUp}>
                    <video className="bento-image video-frame-3" loop muted playsInline preload="none" poster="/exec-launch.webp">
                        <source src="https://cdn.coverr.co/videos/coverr-abstract-neon-lines-4113/1080p.mp4" type="video/mp4" />
                    </video>
                    <div className="bento-overlay">
                        <div className="bento-icon-wrapper"><Rocket size={20} color="#0f172a" /></div>
                        <h3 className="bento-title">Flawless Launch</h3>
                        <p className="bento-desc">Stress-tested, secured, and deployed seamlessly.</p>
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
};

export default Execution;
