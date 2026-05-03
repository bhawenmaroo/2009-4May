import { useEffect, useRef, useState } from "react";

const ACCENT = "#0B6A4D";
const ACCENT_BRIGHT = "#14B57E";
const LIME = "#C8FF4D";
const DARK = "#0E2A1C";
const DARK_DEEP = "#061A10";

type Burst = { id: number; x: number; y: number; dark: boolean };

// Walk up from the clicked point until we find an element with a non-transparent
// background, then return true if that background is "dark" (luminance < 0.5).
function isPointOnDarkBg(x: number, y: number): boolean {
  const el = document.elementFromPoint(x, y) as HTMLElement | null;
  let node: HTMLElement | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
      const [r, g, b, a = 1] = parts;
      if (a > 0.05) {
        // Relative luminance (sRGB approx)
        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return lum < 0.5;
      }
    }
    node = node.parentElement;
  }
  return false;
}

export function AtomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const electronRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -200, y: -200 });
  const dot = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf = useRef<number | null>(null);
  const pressed = useRef(false);
  const lastBgSample = useRef(0);
  const isDarkBg = useRef(false);

  const [bursts, setBursts] = useState<Burst[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onDown = (e: MouseEvent) => {
      pressed.current = true;
      const id = Date.now() + Math.random();
      const dark = isPointOnDarkBg(e.clientX, e.clientY);
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, dark }]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id));
      }, 900);
    };

    const onUp = () => {
      pressed.current = false;
    };

    const tick = (now: number) => {
      // Inner dot — quick, tight follow
      dot.current.x += (mouse.current.x - dot.current.x) * 0.32;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.32;
      // Outer ring — slow, graceful lag (the satisfying part)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

      const pressScale = pressed.current ? 0.78 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${pressScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${pressed.current ? 1.25 : 1})`;
      }

      // Sample background under cursor ~every 120ms and update electron / ring tint
      if (now - lastBgSample.current > 120 && mouse.current.x >= 0) {
        lastBgSample.current = now;
        const dark = isPointOnDarkBg(mouse.current.x, mouse.current.y);
        if (dark !== isDarkBg.current) {
          isDarkBg.current = dark;
          if (electronRef.current) {
            const c = dark ? LIME : ACCENT;
            const glow = dark
              ? `0 0 8px ${LIME}, 0 0 14px rgba(200,255,77,0.5)`
              : `0 0 8px ${ACCENT}, 0 0 14px rgba(11,106,77,0.55)`;
            electronRef.current.style.background = c;
            electronRef.current.style.boxShadow = glow;
          }
          if (ringRef.current) {
            ringRef.current.style.borderColor = dark
              ? "rgba(20,181,126,0.55)"
              : "rgba(11,106,77,0.55)";
            ringRef.current.style.boxShadow = dark
              ? "0 0 14px rgba(20,181,126,0.18)"
              : "0 0 14px rgba(11,106,77,0.20)";
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @keyframes atom-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes atom-nucleus-pulse {
          0%, 100% { opacity: 1;    box-shadow: 0 0 8px ${ACCENT_BRIGHT}, 0 0 18px rgba(20,181,126,0.45); }
          50%      { opacity: 0.85; box-shadow: 0 0 12px ${ACCENT_BRIGHT}, 0 0 26px rgba(20,181,126,0.65); }
        }
        @keyframes atom-burst-ring {
          0%   { transform: translate(-50%, -50%) scale(0.15); opacity: 0.95; border-width: 2.5px; }
          70%  { opacity: 0.35; }
          100% { transform: translate(-50%, -50%) scale(2.2);  opacity: 0;    border-width: 1px; }
        }
        @keyframes atom-burst-particle {
          0%   { transform: translate(-50%, -50%) translate(0, 0) scale(1);   opacity: 1; }
          70%  { opacity: 0.9; }
          100% { transform: translate(-50%, -50%) translate(var(--bx), var(--by)) scale(0.15); opacity: 0; }
        }
        .atom-cursor-root, .atom-cursor-root * { pointer-events: none; }
      `}</style>

      {/* Outer soft ring — slow, satisfying lag */}
      <div
        ref={ringRef}
        className="atom-cursor-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: `1.5px solid rgba(20,181,126,0.55)`,
          boxShadow: "0 0 14px rgba(20,181,126,0.18)",
          zIndex: 99998,
          willChange: "transform",
          transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden
      >
        {/* Single elegant orbit with one electron */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            animation: "atom-orbit 3.4s linear infinite",
          }}
        >
          <div
            ref={electronRef}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 8px ${LIME}, 0 0 14px rgba(200,255,77,0.5)`,
              transform: "translate(-50%, -50%)",
              transition: "background 0.25s ease, box-shadow 0.25s ease",
            }}
          />
        </div>
      </div>

      {/* Inner nucleus — tight follow */}
      <div
        ref={dotRef}
        className="atom-cursor-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: ACCENT_BRIGHT,
          zIndex: 99999,
          willChange: "transform",
          animation: "atom-nucleus-pulse 2.2s ease-in-out infinite",
          transition: "transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden
      />

      {/* Click bursts — color adapts to background luminance under the click */}
      {bursts.map((b) => {
        const ringMain    = b.dark ? LIME       : DARK;
        const ringTrail   = b.dark ? ACCENT_BRIGHT : ACCENT;
        const particleA   = b.dark ? LIME       : DARK_DEEP;
        const particleB   = b.dark ? ACCENT_BRIGHT : ACCENT;
        const ringGlow    = b.dark ? "rgba(200,255,77,0.55)"  : "rgba(14,42,28,0.45)";
        const particleGlow = b.dark ? "rgba(200,255,77,0.55)" : "rgba(14,42,28,0.55)";
        return (
          <div
            key={b.id}
            className="atom-cursor-root"
            style={{
              position: "fixed",
              top: b.y,
              left: b.x,
              width: 0,
              height: 0,
              zIndex: 99997,
            }}
            aria-hidden
          >
            {/* Primary expanding ring */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `2.5px solid ${ringMain}`,
                boxShadow: `0 0 16px ${ringGlow}`,
                animation: "atom-burst-ring 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              }}
            />
            {/* Soft trailing ring */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `1px solid ${ringTrail}`,
                opacity: 0.75,
                animation: "atom-burst-ring 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.08s forwards",
              }}
            />
            {/* Six radiating particles */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const dist = 32;
              const bx = `${Math.cos(angle) * dist}px`;
              const by = `${Math.sin(angle) * dist}px`;
              const color = i % 2 === 0 ? particleA : particleB;
              return (
                <div
                  key={i}
                  style={
                    {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 6px ${particleGlow}`,
                      "--bx": bx,
                      "--by": by,
                      animation: "atom-burst-particle 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
