// components/ScrollProgressBar.js
import { useState, useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  // Use a ref to store the animation frame ID
  const animationFrameId = useRef(null);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    const scrollableHeight = documentHeight - windowHeight;

    if (scrollableHeight > 0) {
      const percentage = (scrollY / scrollableHeight) * 100;
      setScrollPercentage(percentage);
    } else {
      setScrollPercentage(0);
    }
  };

  const onScroll = () => {
    // Cancel any existing animation frame to avoid multiple updates
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    // Schedule the next update with the browser's rendering cycle
    animationFrameId.current = requestAnimationFrame(handleScroll);
  };
  
  useEffect(() => {
    // Add the optimized scroll listener
    window.addEventListener('scroll', onScroll);

    // Clean up by removing the listener and canceling any pending frames
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px', 
        backgroundColor: '#4f46e5',
        width: `${scrollPercentage}%`,
        zIndex: 50,
        // The transition is no longer needed as rAF provides the smoothness
        // transition: 'width 0.1s ease-out', // You can remove this line
      }}
    />
  );
};

export default ScrollProgressBar;