import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Rocket, Search, ClipboardList, Lightbulb, Target, Users } from 'lucide-react';
import MagneticIcon from '../Common/MagneticIcon';
import GradualBlur from '../Common/GradualBlur';
import './Process.css';

const ProcessCard = ({ number, title, text, visual, className, startX, startY, progressRange, scrollYProgress }) => {
    const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });

    const x = useTransform(smoothProgress, progressRange, [startX, "0vw"]);
    const y = useTransform(smoothProgress, progressRange, [startY, "0vh"]);
    const scale = useTransform(smoothProgress, progressRange, [0.6, 1]);
    const opacity = useTransform(smoothProgress, [0, 0.1, progressRange[1]], [0, 1, 1]);

    return (
        <motion.div 
            className={`process-card-absolute ${className}`}
            style={{ x, y, scale, opacity }}
        >
            <div className="process-card-inner">
                <div className="card-visual">
                    {visual}
                </div>
                <div className="card-content">
                    <span className="step-number">{number}</span>
                    <h3 className="step-title">{title}</h3>
                    <p className="step-text">{text}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Process = () => {
    const fadeUp = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 80 } }
    };

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
    const pathLength = useTransform(smoothProgress, [0, 0.9], [0, 1]);

    // Ellipse Path: Starts at Top-Left, goes clockwise to Top-Right, Bottom-Right, Bottom-Left, back to Top-Left.
    const ellipsePath = "M 340,238 A 650 300 0 0 1 1260,238 A 650 300 0 0 1 1260,662 A 650 300 0 0 1 340,662 A 650 300 0 0 1 340,238";

    return (
        <section ref={sectionRef} className="process-section" id="process" aria-label="Our development process">
            <div className="sticky-glass-wrapper">
                
                <div className="process-glass-container">
                    
                    <div className="process-roadmap-container">
                        {/* SVG Orbital Ellipse */}
                        <div className="roadmap-svg-wrapper">
                            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" className="roadmap-svg">
                                {/* Base dotted orbit track */}
                                <path 
                                    d={ellipsePath}
                                    fill="none" 
                                    stroke="rgba(14, 165, 233, 0.2)" 
                                    strokeWidth="4" 
                                    strokeDasharray="12 12" 
                                />
                                {/* Animated solid orbit track */}
                                <motion.path 
                                    d={ellipsePath}
                                    fill="none" 
                                    stroke="#0ea5e9" 
                                    strokeWidth="6" 
                                    style={{ pathLength }} 
                                />
                                
                                {/* Checkpoints on the ellipse */}
                                <circle cx="340" cy="238" r="10" fill="#ffffff" stroke="#0ea5e9" strokeWidth="4" />
                                <circle cx="1260" cy="238" r="10" fill="#ffffff" stroke="#0ea5e9" strokeWidth="4" />
                                <circle cx="1260" cy="662" r="10" fill="#ffffff" stroke="#0ea5e9" strokeWidth="4" />
                                <circle cx="340" cy="662" r="10" fill="#ffffff" stroke="#0ea5e9" strokeWidth="4" />
                            </svg>
                        </div>

                        {/* Central Details */}
                        <motion.div
                            className="process-center-details"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUp}
                        >
                            <div className="liquid-badge-wrapper section-badge center-badge">
                                <div className="liquid-badge">
                                    <span className="badge-content-text">Our Process</span>
                                    <div className="liquid-container">
                                        <div className="liquid-wave wave-1"></div>
                                        <div className="liquid-wave wave-2"></div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="process-headline">Move at Startup Speed</h2>
                            <p className="process-description">
                                Our streamlined methodology guarantees rapid deployment without compromising on quality. We prioritize what matters most to your users.
                            </p>
                        </motion.div>

                        {/* Step 01 */}
                        <ProcessCard
                            className="card-1"
                            number="01"
                            title="Discovery"
                            text="We begin by diving deep into your vision, target audience, and core objectives."
                            startX="-40vw"
                            startY="-40vh"
                            progressRange={[0, 0.8]}
                            scrollYProgress={scrollYProgress}
                            visual={
                                <div className="discovery-nodes-wrapper mini">
                                    <div className="node-center">
                                        <div className="node-glow"></div>
                                        <MagneticIcon maxRotation={15}>
                                            <Lightbulb size={24} color="#0ea5e9" />
                                        </MagneticIcon>
                                    </div>
                                    <div className="node node-1"><Search size={14} color="#64748b" /></div>
                                    <div className="node node-2"><ClipboardList size={14} color="#64748b" /></div>
                                    <div className="node node-3"><Target size={14} color="#64748b" /></div>
                                    <div className="node node-4"><Users size={14} color="#64748b" /></div>
                                </div>
                            }
                        />

                        {/* Step 02 */}
                        <ProcessCard
                            className="card-2"
                            number="02"
                            title="Architecture"
                            text="Designing a scalable blueprint. We outline the technical infrastructure required."
                            startX="40vw"
                            startY="-40vh"
                            progressRange={[0, 0.8]}
                            scrollYProgress={scrollYProgress}
                            visual={
                                <div className="tilted-cards-wrapper mini">
                                    <div className="tilted-card card-back"></div>
                                    <div className="tilted-card card-mid"></div>
                                    <div className="tilted-card card-front">
                                        <div className="ui-header"></div>
                                        <div className="ui-body">
                                            <div className="ui-sidebar"></div>
                                            <div className="ui-content-area">
                                                <div className="ui-line" style={{ width: '60%' }}></div>
                                                <div className="ui-line" style={{ width: '80%' }}></div>
                                                <div className="ui-line" style={{ width: '40%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />

                        {/* Step 03 */}
                        <ProcessCard
                            className="card-3"
                            number="03"
                            title="Development"
                            text="Execution phase. We build your product using modern, robust technologies."
                            startX="40vw"
                            startY="40vh"
                            progressRange={[0, 0.8]}
                            scrollYProgress={scrollYProgress}
                            visual={
                                <div className="code-block-mock mini">
                                    <span className="code-line keyword">import</span> React;<br/>
                                    <span className="code-line keyword">const</span> <span className="code-line function">App</span> = () =&gt; {'{'}<br/>
                                    &nbsp;&nbsp;&lt;<span className="code-line component">Process</span> /&gt;<br/>
                                    {'}'};
                                </div>
                            }
                        />

                        {/* Step 04 */}
                        <ProcessCard
                            className="card-4"
                            number="04"
                            title="Deployment"
                            text="Taking your product live. We handle the deployment and ensure it runs smoothly."
                            startX="-40vw"
                            startY="40vh"
                            progressRange={[0, 0.8]}
                            scrollYProgress={scrollYProgress}
                            visual={
                                <div className="rocket-badge mini">
                                    <MagneticIcon maxRotation={30}>
                                        <Rocket size={32} color="#0284c7" />
                                    </MagneticIcon>
                                </div>
                            }
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Process;
