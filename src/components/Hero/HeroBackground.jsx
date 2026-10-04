import React, { useState, useEffect, lazy, Suspense } from 'react';
import './HeroBackground.css';

// Lazy-load the 3D WebGL fluid background
const LiquidEther = lazy(() => import('./LiquidEther'));
const HERO_GOLD_COLORS = ['#C89565', '#F3D5B5', '#8C5A32'];

const HeroBackground3D = () => {
    const [prefersReduced, setPrefersReduced] = useState(false);
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        const checkCapability = () => {
            setIsCompact(window.innerWidth <= 768);
            setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        };
        checkCapability();
        window.addEventListener('resize', checkCapability, { passive: true });
        return () => window.removeEventListener('resize', checkCapability);
    }, []);

    return (
        <div className="hero-3d-wrapper">
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <div className="hero-gradient-bg" />
                {!prefersReduced && (
                    <Suspense fallback={null}>
                        <LiquidEther
                            colors={HERO_GOLD_COLORS}
                            mouseForce={isCompact ? 16 : 20}
                            cursorSize={isCompact ? 80 : 100}
                            isViscous
                            viscous={15}
                            iterationsViscous={4}
                            iterationsPoisson={4}
                            resolution={isCompact ? 0.16 : 0.2}
                            isBounce={false}
                            autoDemo
                            autoSpeed={isCompact ? 0.6 : 0.5}
                            autoIntensity={isCompact ? 2.4 : 2.2}
                            takeoverDuration={0.25}
                            autoResumeDelay={2500}
                            autoRampDuration={0.6}
                        />
                    </Suspense>
                )}
            </div>

            {/* Overlays */}
            <div className="hero-3d-vignette" />
            <div className="hero-3d-bottom-fade" />
        </div>
    );
};

export default HeroBackground3D;
