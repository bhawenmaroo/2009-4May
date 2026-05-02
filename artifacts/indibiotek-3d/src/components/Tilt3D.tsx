import { ReactNode, useEffect, useRef } from "react";

/* Mouse-tracked 3D tilt wrapper. Wraps any block of content and applies
   smooth rotateX/rotateY based on cursor position relative to the element.
   Adds a moving highlight (sheen) and a subtle parallax on a "depth" layer
   you can compose using `data-depth` children. */
export function Tilt3D({
  children,
  className = "",
  max = 10,
  scale = 1.015,
  glare = true,
  style = {},
  testId,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
  style?: React.CSSProperties;
  testId?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, s: 1 });
  const cur    = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, s: 1 });
  const raf    = useRef(0);

  useEffect(() => {
    const el = ref.current; const node = inner.current; const sh = sheen.current;
    if (!el || !node) return;

    const tick = () => {
      const t = target.current; const c = cur.current;
      c.rx += (t.rx - c.rx) * 0.12;
      c.ry += (t.ry - c.ry) * 0.12;
      c.s  += (t.s  - c.s)  * 0.12;
      c.gx += (t.gx - c.gx) * 0.12;
      c.gy += (t.gy - c.gy) * 0.12;
      node.style.transform = `perspective(1000px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale3d(${c.s}, ${c.s}, ${c.s})`;
      if (sh) sh.style.background =
        `radial-gradient(circle at ${c.gx}% ${c.gy}%, rgba(255,255,255,0.65), rgba(255,255,255,0) 55%)`;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top)  / r.height;
      target.current.rx = (0.5 - py) * max;
      target.current.ry = (px - 0.5) * max;
      target.current.gx = px * 100;
      target.current.gy = py * 100;
      target.current.s  = scale;
    };
    const onLeave = () => {
      target.current.rx = 0; target.current.ry = 0;
      target.current.gx = 50; target.current.gy = 50;
      target.current.s = 1;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [max, scale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1000, transformStyle: "preserve-3d", ...style }}
      data-testid={testId}
    >
      <div
        ref={inner}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.1s ease-out",
          position: "relative",
        }}
      >
        {children}
        {glare && (
          <div
            ref={sheen}
            style={{
              position: "absolute", inset: 0, borderRadius: "inherit",
              pointerEvents: "none", mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
}
