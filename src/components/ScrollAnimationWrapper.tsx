// src/components/ScrollAnimationWrapper.js

import { motion } from 'framer-motion';

const ScrollAnimationWrapper = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.95 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      // THE FIX IS HERE 👇
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
      transition={{
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1],
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;