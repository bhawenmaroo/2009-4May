import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const DARK_BG = "#0E1C14";
const TOTAL_MS = 950;

export function PageTransition() {
  const [location] = useLocation();
  const [transitionKey, setTransitionKey] = useState(0);
  const firstRender = useRef(true);
  const hideTimer = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setTransitionKey((k) => k + 1);
    setActive(true);
    hideTimer.current = window.setTimeout(() => setActive(false), TOTAL_MS);
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [location]);

  if (!active) return null;

  // Use a fresh seed each transition so the noise pattern varies
  const seed = (transitionKey * 37) % 997;
  const filterId = `pt-dissolve-${transitionKey}`;

  return (
    <div
      key={transitionKey}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: `pt-bg-fade ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        background: DARK_BG,
      }}
    >
      <style>{`
        @keyframes pt-bg-fade {
          0%   { opacity: 0; }
          32%  { opacity: 1; }
          68%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes pt-logo-fade {
          0%   { opacity: 0; }
          18%  { opacity: 0.15; }
          45%  { opacity: 1; }
          60%  { opacity: 1; }
          88%  { opacity: 0.15; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Inline SVG filter with SMIL — remounted per transition so it auto-runs */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.022"
              numOctaves="2"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0">
              <animate
                attributeName="scale"
                values="140;0;0;140"
                keyTimes="0;0.45;0.6;1"
                dur={`${TOTAL_MS}ms`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0 0 1 1; 0.4 0 0.2 1"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <img
        src="/logo-mark.png"
        alt=""
        style={{
          width: "min(140px, 24vw)",
          height: "auto",
          filter: `url(#${filterId}) drop-shadow(0 0 22px rgba(20,181,126,0.35))`,
          animation: `pt-logo-fade ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          willChange: "filter, opacity",
        }}
      />
    </div>
  );
}
