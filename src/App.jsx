import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import WhatsAppButton from './components/Common/WhatsAppButton';
import Home from './pages/Home';
import './App.css';

// Lazy-load the WebGL fluid cursor
const SplashCursor = lazy(() => import('./components/Common/SplashCursor'));

// Lazy-load all sub-pages for code splitting
const Story = lazy(() => import('./pages/Story'));
const Team = lazy(() => import('./pages/Team'));
const Partners = lazy(() => import('./pages/Partners'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Integrations = lazy(() => import('./pages/Integrations'));
const FeaturesPage = lazy(() => import('./pages/Features'));
const ServicePage = lazy(() => import('./pages/services/ServicePage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  // Only enable the WebGL cursor on capable desktop devices
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    if (!prefersReducedMotion && !isTouch && !isLowEnd) {
      const t = setTimeout(() => setShowCursor(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    
    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      smoothTouch: false,
      infinite: false,
    });
    
    window.lenis = lenis;
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`app ${loading ? 'app-loading' : ''}`}>
      {/* Premium Loader Overlay */}
      <Loader isLoading={loading} />

      {/* WebGL Fluid Cursor — only on capable devices */}
      {showCursor && (
        <Suspense fallback={null}>
          <SplashCursor
            SIM_RESOLUTION={32}
            DYE_RESOLUTION={512}
            PRESSURE_ITERATIONS={8}
            DENSITY_DISSIPATION={6.0}
            VELOCITY_DISSIPATION={3.0}
            PRESSURE={0.1}
            CURL={2}
            SPLAT_RADIUS={0.1}
            SPLAT_FORCE={3000}
            COLOR_UPDATE_SPEED={10}
            SHADING
            RAINBOW_MODE={false}
            COLOR="#DCB49A"
          />
        </Suspense>
      )}

      <Navbar />
      <ScrollToTop />

      <Suspense fallback={<div style={{minHeight:'100vh'}} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/about" element={<Story />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/services" element={<FeaturesPage />} />
          <Route path="/features/:serviceSlug" element={<ServicePage />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />
          <Route path="/process" element={<Story />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Suspense>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
