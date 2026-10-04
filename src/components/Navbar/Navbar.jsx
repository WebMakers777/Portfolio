import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Layers, ShoppingBag, Cloud, Users, Building2, LayoutDashboard, Sparkles, HeartHandshake, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import MagneticButton from '../Common/MagneticButton';
import GlassSurface from '../Common/GlassSurface';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const featuresTimeoutRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null); // 'about' | 'features' | null

  useEffect(() => {
    setDropdownOpen(false);
    setFeaturesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (window.innerWidth <= 960) return;
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setFeaturesDropdownOpen(false);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 960) return;
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const handleFeaturesMouseEnter = () => {
    if (window.innerWidth <= 960) return;
    if (featuresTimeoutRef.current) clearTimeout(featuresTimeoutRef.current);
    setDropdownOpen(false);
    setFeaturesDropdownOpen(true);
  };

  const handleFeaturesMouseLeave = () => {
    if (window.innerWidth <= 960) return;
    featuresTimeoutRef.current = setTimeout(() => {
      setFeaturesDropdownOpen(false);
    }, 150);
  };

  const handleNavClick = (e, path) => {
    e.preventDefault();
    
    // If it's a hash link (e.g. #features)
    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + path);
      } else {
        if (window.lenis) {
          window.lenis.scrollTo(path, { offset: -80 });
        } else {
          document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
    setDropdownOpen(false);
    setFeaturesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileSection(null);
  };

  const toggleMobileSection = (section) => {
    setMobileSection((prev) => (prev === section ? null : section));
  };

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="navbar-container">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={32}
        borderWidth={0.05}
        brightness={60}
        opacity={0.7}
        blur={8}
        displace={0.4}
        backgroundOpacity={0.15}
        saturation={1.1}
        distortionScale={-120}
        redOffset={0}
        greenOffset={6}
        blueOffset={12}
        mixBlendMode="difference"
        className={`navbar ${scrolled ? 'scrolled' : ''} ${dropdownOpen || featuresDropdownOpen || mobileMenuOpen ? 'dropdown-open' : ''}`}
        style={{ 
          maxWidth: 1200, 
          transition: 'background 0.4s ease',
          flexDirection: 'column', 
          alignItems: 'flex-start'
        }}
      >
        <nav className="navbar-inner" aria-label="Main navigation">
          <div className="navbar-logo" onClick={(e) => handleNavClick(e, '/')} style={{ cursor: 'pointer' }}>
            <img className="logo-icon" src="/vinciestudio.png" alt="Vincie Studios Logo" />
            <span className="logo-text">vincie <span className="logo-text-accent">Studios.</span></span>
          </div>

          <ul className="navbar-links" role="list" aria-label="Page sections">
              {/* About Us Dropdown Trigger */}
            <li 
              className="nav-dropdown-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="nav-link dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => {
                  setFeaturesDropdownOpen(false);
                  setDropdownOpen((prev) => !prev);
                }}
              >
                About Us
                <svg className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </li>
            
            <div className="nav-separator"></div>

            {/* Features Dropdown Trigger */}
            <li className="nav-dropdown-container" onMouseEnter={handleFeaturesMouseEnter} onMouseLeave={handleFeaturesMouseLeave}>
              <button
                className="nav-link dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={featuresDropdownOpen}
                onClick={() => {
                  setDropdownOpen(false);
                  setFeaturesDropdownOpen((prev) => !prev);
                }}
              >
                Features
                <svg className={`dropdown-arrow ${featuresDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </li>

            <div className="nav-separator"></div>

            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <li>
                  <a href={link.path} className="nav-link" onClick={(e) => handleNavClick(e, link.path)}>
                    {link.name}
                  </a>
                </li>
                {index < navLinks.length - 1 && (
                  <div className="nav-separator"></div>
                )}
              </React.Fragment>
            ))}
          </ul>

          <div className="navbar-actions">
            {/* Magnetic Button with an extended hover radius effect */}
            <a href="/contact" className="navbar-cta-link" style={{ textDecoration: 'none' }} onClick={(e) => handleNavClick(e, '/contact')}>
              <MagneticButton className="liquid-badge-wrapper navbar-cta-wrapper" elasticity={0.25} magneticRadius={120}>
                <div className="liquid-badge">
                  <span className="badge-content-text">Book a slot ↗</span>
                  <div className="liquid-container">
                    <div className="liquid-wave wave-1"></div>
                    <div className="liquid-wave wave-2"></div>
                  </div>
                </div>
              </MagneticButton>
            </a>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              type="button"
              className="navbar-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                setDropdownOpen(false);
                setFeaturesDropdownOpen(false);
                setMobileMenuOpen((prev) => !prev);
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mega Menu Dropdown Integrated into Navbar */}
        <motion.div
          className="mega-menu-wrapper"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: dropdownOpen ? 'auto' : 0, 
            opacity: dropdownOpen ? 1 : 0 
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden', width: '100%' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mega-menu-grid">
            
            {/* Column 1: Company */}
            <div className="mega-col">
              <h4 className="mega-heading">COMPANY</h4>
              <Link to="/story" className="mega-link" onClick={() => setDropdownOpen(false)}>Story</Link>
              <Link to="/team" className="mega-link" onClick={() => setDropdownOpen(false)}>Team</Link>
              <Link to="/partners" className="mega-link" onClick={() => setDropdownOpen(false)}>Partners</Link>
              <Link to="/integrations" className="mega-link" onClick={() => setDropdownOpen(false)}>Integrations</Link>
            </div>

            {/* Column 3: Contact Card */}
            <div className="mega-col mega-col-contact">
              <div className="mega-contact-card">
                <h3 className="mega-contact-title">Get in Touch</h3>
                <p className="mega-contact-desc">Ready to transform your business? Let's talk.</p>
                <button className="mega-contact-btn" onClick={(e) => handleNavClick(e, '/contact')}>
                  Contact Us
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Features Mega Menu */}
        <motion.div
          className="mega-menu-wrapper features-mega-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: featuresDropdownOpen ? 'auto' : 0, 
            opacity: featuresDropdownOpen ? 1 : 0 
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden', width: '100%' }}
          onMouseEnter={handleFeaturesMouseEnter}
          onMouseLeave={handleFeaturesMouseLeave}
        >
          <div className="mega-menu-grid features-mega-grid">
            <div className="mega-col">
              <h4 className="mega-heading">SOLUTIONS</h4>
              <Link to="/features/web-mobile" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <Globe size={16} /><span>Web & Mobile Development</span>
              </Link>
              <Link to="/features/saas" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <Layers size={16} /><span>SaaS Platforms</span>
              </Link>
              <Link to="/features/ecommerce" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <ShoppingBag size={16} /><span>E-Commerce Solutions</span>
              </Link>
              <Link to="/features/cloud-enterprise" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <Cloud size={16} /><span>Cloud & Enterprise</span>
              </Link>
            </div>

            <div className="mega-col">
              <h4 className="mega-heading">ENTERPRISE & BESPOKE</h4>
              <Link to="/features/crm" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <Users size={16} /><span>CRM Solutions</span>
              </Link>
              <Link to="/features/erp" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <Building2 size={16} /><span>ERP Systems</span>
              </Link>
              <Link to="/features/portals" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <LayoutDashboard size={16} /><span>Business Portals</span>
              </Link>
              <Link to="/features/wedding-invitation" className="mega-link mega-link-icon" onClick={() => setFeaturesDropdownOpen(false)}>
                <HeartHandshake size={16} /><span>Wedding Invitations</span>
              </Link>
            </div>

            <div className="mega-col mega-col-featured">
              <div className="mega-featured-card">
                <div className="mega-featured-icon"><Sparkles size={20} /></div>
                <h3 className="mega-featured-title">AI & Automation</h3>
                <p className="mega-featured-desc">Intelligent solutions powered by LLMs, custom RAG, and smart workflow engines.</p>
                <Link to="/features/ai-automation" className="mega-featured-link" onClick={() => setFeaturesDropdownOpen(false)}>
                  Explore AI Solutions <ArrowRight size={14} />
                </Link>
              </div>
              <Link to="/features" className="mega-all-services-link" onClick={() => setFeaturesDropdownOpen(false)}>
                View All Services <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Mobile & Tablet Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden', width: '100%' }}
            >
              <div className="mobile-menu-inner">
                {/* Accordion 1: About Us */}
                <div className="mobile-accordion">
                  <button
                    type="button"
                    className={`mobile-accordion-trigger ${mobileSection === 'about' ? 'active' : ''}`}
                    onClick={() => toggleMobileSection('about')}
                  >
                    <span>About Us</span>
                    <ChevronDown size={16} className={`mobile-chevron ${mobileSection === 'about' ? 'open' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSection === 'about' && (
                      <motion.div
                        className="mobile-accordion-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="mobile-sublinks-grid">
                          <Link to="/story" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Story</Link>
                          <Link to="/team" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Team</Link>
                          <Link to="/partners" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
                          <Link to="/integrations" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Integrations</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: Features */}
                <div className="mobile-accordion">
                  <button
                    type="button"
                    className={`mobile-accordion-trigger ${mobileSection === 'features' ? 'active' : ''}`}
                    onClick={() => toggleMobileSection('features')}
                  >
                    <span>Features &amp; Services</span>
                    <ChevronDown size={16} className={`mobile-chevron ${mobileSection === 'features' ? 'open' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSection === 'features' && (
                      <motion.div
                        className="mobile-accordion-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="mobile-sublinks-grid">
                          <Link to="/features/web-mobile" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <Globe size={15} /><span>Web &amp; Mobile</span>
                          </Link>
                          <Link to="/features/saas" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <Layers size={15} /><span>SaaS Platforms</span>
                          </Link>
                          <Link to="/features/ecommerce" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <ShoppingBag size={15} /><span>E-Commerce</span>
                          </Link>
                          <Link to="/features/cloud-enterprise" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <Cloud size={15} /><span>Cloud &amp; Enterprise</span>
                          </Link>
                          <Link to="/features/crm" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <Users size={15} /><span>CRM Solutions</span>
                          </Link>
                          <Link to="/features/erp" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <Building2 size={15} /><span>ERP Systems</span>
                          </Link>
                          <Link to="/features/portals" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <LayoutDashboard size={15} /><span>Business Portals</span>
                          </Link>
                          <Link to="/features/wedding-invitation" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                            <HeartHandshake size={15} /><span>Wedding Invites</span>
                          </Link>
                          <Link to="/features/ai-automation" className="mobile-sublink mobile-sublink-gold" onClick={() => setMobileMenuOpen(false)}>
                            <Sparkles size={15} /><span>AI &amp; Automation</span>
                          </Link>
                          <Link to="/features" className="mobile-sublink mobile-sublink-all" onClick={() => setMobileMenuOpen(false)}>
                            <span>View All Services</span><ArrowRight size={14} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Nav Links */}
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="mobile-direct-link"
                    onClick={(e) => handleNavClick(e, link.path)}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={15} />
                  </a>
                ))}

                {/* Mobile Drawer CTA */}
                <a
                  href="/contact"
                  className="mobile-drawer-cta-link"
                  onClick={(e) => handleNavClick(e, '/contact')}
                >
                  <div className="liquid-badge mobile-drawer-liquid-badge">
                    <span className="badge-content-text">Book a slot ↗</span>
                    <div className="liquid-container">
                      <div className="liquid-wave wave-1"></div>
                      <div className="liquid-wave wave-2"></div>
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassSurface>
    </div>
  );
};

export default Navbar;
