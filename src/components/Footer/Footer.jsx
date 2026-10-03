import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import ProcessModal from '../Common/ProcessModal';
import './Footer.css';

const Footer = () => {
    const [isProcessOpen, setIsProcessOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (e, path) => {
        e.preventDefault();
        if (path.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/' + path);
            } else {
                if (window.lenis) {
                    window.lenis.scrollTo(path, { offset: -80 });
                } else {
                    const el = document.querySelector(path);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            navigate(path);
            window.scrollTo(0, 0);
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
        }
    };

    return (
        <footer className="footer" id="footer" role="contentinfo" aria-label="Site footer">
            <div className="footer-container">

                {/* 1. TOP CTA DARK CARD - Premium Software Feel */}
                <div className="footer-cta-card">
                    <div className="cta-card-pattern"></div>
                    <div className="cta-card-content">
                        <div className="cta-left">
                            <h2 className="cta-headline">
                                The range of capabilities <br />
                                we offer includes the ability <br />
                                to <span className="cta-glow-text">launch at lightspeed.</span>
                            </h2>
                        </div>
                        <div className="cta-right">
                            <p className="cta-subtext">
                                With a custom-built tech stack and AI-driven workflows that reduce
                                technical debt and automatically accelerate your momentum.
                            </p>
                            <div className="cta-actions">
                                <a href="/contact" style={{ textDecoration: 'none' }} onClick={(e) => handleNavClick(e, '/contact')}>
                                    <div className="liquid-badge-wrapper cta-main-btn">
                                        <div className="liquid-badge">
                                            <span className="badge-content-text">Get started <ArrowUpRight size={16} /></span>
                                            <div className="liquid-container">
                                                <div className="liquid-wave wave-1"></div>
                                                <div className="liquid-wave wave-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <button className="cta-secondary-btn" onClick={() => setIsProcessOpen(true)}>
                                    Watch how it works <span className="play-icon">▶</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN FOOTER CONTENT */}
                <div className="footer-main">
                    {/* Massive Outline Background Text */}
                    <div className="footer-bg-text">VINCIE</div>

                    <div className="footer-cols">
                        {/* Column 1: Branding */}
                        <div className="footer-col branding-col">
                            <div className="footer-logo" onClick={(e) => handleNavClick(e, '/')} style={{ cursor: 'pointer' }}>
                                <img className="logo-icon" src="/vinciestudio.png" alt="Vincie Studios Logo" />
                                <span className="logo-text">vincie <span className="logo-text-accent">Studios.</span></span>
                            </div>
                            <p className="footer-branding-desc">
                                We are the mission control for founders looking to build, validate, and scale MVPs and custom software in record time.
                            </p>
                            <div className="status-badge-glass">
                                <span className="status-dot-pulsing"></span>
                                All systems operational
                            </div>
                        </div>

                        {/* Link Columns */}
                        <div className="links-group" role="navigation" aria-label="Footer navigation">
                            <div className="footer-col">
                                <h4>Agency</h4>
                                <a href="/" onClick={(e) => handleNavClick(e, '/')}>Home</a>
                                <a href="/features" onClick={(e) => handleNavClick(e, '/features')}>Features</a>
                                <a href="#" onClick={(e) => { e.preventDefault(); setIsProcessOpen(true); }}>Process</a>
                                <a href="/projects" onClick={(e) => handleNavClick(e, '/projects')}>Projects</a>
                                <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>Contact</a>
                            </div>
                            <div className="footer-col">
                                <h4>Support</h4>
                                <a href="/story" onClick={(e) => handleNavClick(e, '/story')}>Our Story</a>
                                <a href="/faq" onClick={(e) => handleNavClick(e, '/faq')}>FAQ</a>
                                <a href="mailto:hello@vinciestudios.com">hello@vinciestudios.com</a>
                                <a href="tel:+917375038069">+91 73750 38069</a>
                            </div>
                            <div className="footer-col">
                                <h4>Connect</h4>
                                <a href="https://www.instagram.com/studiovincie" target="_blank" className="social-link" aria-label="Follow Vincie Studios on Instagram" rel="noopener noreferrer"><Instagram size={14} /> Instagram</a>
                                <a href="https://www.linkedin.com/company/111233207" target="_blank" className="social-link" aria-label="Follow Vincie Studios on LinkedIn" rel="noopener noreferrer"><Linkedin size={14} /> LinkedIn</a>
                                <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="social-link" aria-label="Contact Vincie Studios"><Github size={14} /> Start a Project</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM BAR */}
                <div className="footer-bottom">
                    <div className="copyright">
                        © {new Date().getFullYear()} Vincie Studios. All rights reserved
                    </div>
                    <div className="footer-legal">
                        <a href="#privacy" onClick={(e) => handleNavClick(e, '#privacy')}>Privacy Policy</a>
                        <a href="#terms" onClick={(e) => handleNavClick(e, '#terms')}>Terms of Use</a>
                    </div>
                </div>
            </div>
            
            {/* Interactive Process Walkthrough Modal */}
            <ProcessModal isOpen={isProcessOpen} onClose={() => setIsProcessOpen(false)} />
        </footer>
    );
};

export default Footer;
