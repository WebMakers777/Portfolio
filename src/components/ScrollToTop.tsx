// src/components/ScrollToTop.tsx
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Use useLayoutEffect to scroll before the browser paints
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Triggers every time the route changes

  return null;
}