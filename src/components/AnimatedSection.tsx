// src/components/AnimatedSection.js

import { motion } from 'framer-motion';

const animationVariants = {
  up: {
    hidden: { y: 100, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1 },
  },
  down: {
    hidden: { y: -100, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1 },
  },
  left: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const AnimatedSection = ({ children, direction = 'up', delay = 0 }) => {
  return (
    <motion.div
      variants={animationVariants[direction]} // Selects animation based on the 'direction' prop
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // The reliable trigger
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // A smoother, more premium easing curve
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;