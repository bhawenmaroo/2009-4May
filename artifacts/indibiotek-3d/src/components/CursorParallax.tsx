import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

type ParallaxState = { x: number; y: number };

const CursorContext = createContext<{ getOffset: () => ParallaxState }>({
  getOffset: () => ({ x: 0, y: 0 }),
});

export function CursorParallaxProvider({ children }: { children: ReactNode }) {
  const offset = useRef<ParallaxState>({ x: 0, y: 0 });
  const target = useRef<ParallaxState>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      target.current = { x: nx, y: ny };
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const tick = () => {
      offset.current.x += (target.current.x - offset.current.x) * 0.06;
      offset.current.y += (target.current.y - offset.current.y) * 0.06;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <CursorContext.Provider value={{ getOffset: () => offset.current }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursorParallax = () => useContext(CursorContext);
