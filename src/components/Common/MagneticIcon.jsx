import React, { useRef, useCallback } from 'react';

const MagneticIcon = ({ children, className = '', maxRotation = 15 }) => {
    const iconRef = useRef(null);
    const rectRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
        if (iconRef.current) {
            rectRef.current = iconRef.current.getBoundingClientRect();
        }
    }, []);

    const handleMouseMove = useCallback((e) => {
        const el = iconRef.current;
        if (!el) return;
        const rect = rectRef.current || el.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const halfW = Math.max(rect.width, 40);
        const halfH = Math.max(rect.height, 40);

        const rotateX = Math.max(-maxRotation, Math.min(maxRotation, ((e.clientY - centerY) / halfH) * -maxRotation));
        const rotateY = Math.max(-maxRotation, Math.min(maxRotation, ((e.clientX - centerX) / halfW) * maxRotation));

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    }, [maxRotation]);

    const handleMouseLeave = useCallback(() => {
        rectRef.current = null;
        if (iconRef.current) {
            iconRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    }, []);

    return (
        <div
            ref={iconRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`magnetic-icon-wrapper ${className}`}
            style={{
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: 'transform 0.15s ease-out',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {children}
        </div>
    );
};

export default MagneticIcon;
