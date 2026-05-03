import { useEffect, useRef, useState } from "react";

const ACCENT = "#0B6A4D";
const ACCENT_BRIGHT = "#14B57E";
const LIME = "#C8FF4D";

type Burst = { id: number; x: number; y: number };

export function AtomCursor() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id));
      }, 700);
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onClick, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @keyframes atom-orbit-1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes atom-orbit-2 { from { transform: rotate(60deg); } to { transform: rotate(420deg); } }
        @keyframes atom-orbit-3 { from { transform: rotate(120deg); } to { transform: rotate(480deg); } }
        @keyframes atom-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
          50%      { transform: translate(-50%, -50%) scale(1.25); opacity: 0.85; }
        }
        @keyframes atom-burst-ring {
          0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0;   }
        }
        @keyframes atom-burst-particle {
          0%   { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--bx), var(--by)) scale(0.2); opacity: 0; }
        }
        .atom-cursor-root, .atom-cursor-root * { pointer-events: none; }
      `}</style>

      {/* Atom that follows cursor */}
      <div
        ref={wrapRef}
        className="atom-cursor-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          zIndex: 99999,
          willChange: "transform",
          mixBlendMode: "normal",
        }}
        aria-hidden
      >
        {/* Nucleus */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: ACCENT_BRIGHT,
            boxShadow: `0 0 8px ${ACCENT_BRIGHT}, 0 0 16px rgba(20,181,126,0.55)`,
            animation: "atom-pulse 1.6s ease-in-out infinite",
          }}
        />
        {/* Orbits + electrons */}
        {[
          { rot: "atom-orbit-1", color: ACCENT_BRIGHT, dur: "2.2s" },
          { rot: "atom-orbit-2", color: ACCENT,        dur: "2.8s" },
          { rot: "atom-orbit-3", color: LIME,          dur: "3.4s" },
        ].map((o, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              animation: `${o.rot} ${o.dur} linear infinite`,
              transform: `rotate(${i * 60}deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `1px solid ${o.color}`,
                opacity: 0.35,
                transform: i === 1 ? "scaleY(0.45)" : i === 2 ? "scaleX(0.45)" : "scaleY(0.6)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: o.color,
                boxShadow: `0 0 6px ${o.color}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Click bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="atom-cursor-root"
          style={{
            position: "fixed",
            top: b.y,
            left: b.x,
            width: 0,
            height: 0,
            zIndex: 99998,
          }}
          aria-hidden
        >
          {/* Expanding ring */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `2px solid ${ACCENT_BRIGHT}`,
              boxShadow: `0 0 14px rgba(20,181,126,0.55)`,
              animation: "atom-burst-ring 0.6s ease-out forwards",
            }}
          />
          {/* Second ring (lime) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1px solid ${LIME}`,
              opacity: 0.8,
              animation: "atom-burst-ring 0.7s ease-out 0.05s forwards",
            }}
          />
          {/* Particles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dist = 36;
            const bx = `${Math.cos(angle) * dist}px`;
            const by = `${Math.sin(angle) * dist}px`;
            const color = i % 2 === 0 ? ACCENT_BRIGHT : LIME;
            return (
              <div
                key={i}
                style={
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 6px ${color}`,
                    "--bx": bx,
                    "--by": by,
                    animation: "atom-burst-particle 0.6s ease-out forwards",
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
