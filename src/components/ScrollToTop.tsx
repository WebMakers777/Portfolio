// src/components/ScrollToTop.tsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  // Instant scroll position reset before paint to ensure fresh page load feel
  useLayoutEffect(() => {
    // 1. Reset window scroll instantly
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    } catch {
      window.scrollTo(0, 0);
    }

    // 2. Reset document root and body scroll
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. Optional fall-through for any scroll containers
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.scrollTop = 0;
    }
  }, [pathname, search]);

  return null;
}