import { useEffect, useRef } from "react";

/* Apply a smooth scroll-based translateY parallax to an element.
   Speed is a multiplier of the scroll offset. */
export function useParallax<T extends HTMLElement>(speed = 0.3) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let target = 0;
    let cur = 0;

    const tick = () => {
      cur += (target - cur) * 0.12;
      el.style.transform = `translate3d(0, ${cur}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const center = r.top + r.height / 2;
      const offset = center - winH / 2;
      target = -offset * speed;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
