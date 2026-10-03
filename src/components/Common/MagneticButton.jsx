import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

const MagneticButton = ({ children, className = '', elasticity = 0.4, style = {} }) => {
    const ref = useRef(null);
    const rectRef = useRef(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    const handleMouseEnter = useCallback(() => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = rectRef.current || (ref.current && ref.current.getBoundingClientRect());
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        rawX.set((e.clientX - centerX) * elasticity);
        rawY.set((e.clientY - centerY) * elasticity);
    }, [elasticity, rawX, rawY]);

    const handleMouseLeave = useCallback(() => {
        rectRef.current = null;
        rawX.set(0);
        rawY.set(0);
    }, [rawX, rawY]);

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', x, y, ...style }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
