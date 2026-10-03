import React, { useState, useEffect, lazy, Suspense } from 'react';
import './HeroBackground.css';

// Lazy-load the heavy 3D WebGL background to exclude it from the initial bundle
const LiquidEther = lazy(() => import('./LiquidEther'));
const HERO_GOLD_COLORS = ['#C89565', '#F3D5B5', '#8C5A32'];

const HeroBackground3D = () => {
    const [isMobile, setIsMobile] = useState(true); // default to mobile (no WebGL)

    useEffect(() => {
        const checkCapability = () => {
            const width = window.innerWidth;
            const isTouch = window.matchMedia('(pointer: coarse)').matches;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsMobile(width <= 768 || isTouch || prefersReduced);
        };
        checkCapability();
        window.addEventListener('resize', checkCapability, { passive: true });
        return () => window.removeEventListener('resize', checkCapability);
    }, []);

    return (
        <div className="hero-3d-wrapper">
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                {!isMobile ? (
                    <Suspense fallback={<div className="hero-gradient-bg" />}>
                        <LiquidEther
                            colors={HERO_GOLD_COLORS}
                            mouseForce={20}
                            cursorSize={100}
                            isViscous
                            viscous={15}
                            iterationsViscous={4}
                            iterationsPoisson={4}
                            resolution={0.2}
                            isBounce={false}
                            autoDemo
                            autoSpeed={0.5}
                            autoIntensity={2.2}
                            takeoverDuration={0.25}
                            autoResumeDelay={3000}
                            autoRampDuration={0.6}
                        />
                    </Suspense>
                ) : (
                    <div className="hero-gradient-bg" />
                )}
            </div>

            {/* Overlays */}
            <div className="hero-3d-vignette" />
            <div className="hero-3d-bottom-fade" />
        </div>
    );
};

export default HeroBackground3D;
