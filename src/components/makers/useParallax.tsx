import { useEffect, useRef, useState } from "react";

export function useParallax(strength = 20) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("perspective(800px)");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -2 * (strength / 100) * 10;
      const ry = ((x / rect.width) - 0.5) * 2 * (strength / 100) * 10;
      setTransform(`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`);
    };
    const onLeave = () => setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return { ref, transform };
}
