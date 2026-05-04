import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const DARK_BG = "#0E1C14";

export function PageTransition() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const firstRender = useRef(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    setVisible(true);
    setPhase("in");

    const tHold = window.setTimeout(() => setPhase("out"), 380);
    const tEnd = window.setTimeout(() => setVisible(false), 780);
    timers.current.push(tHold, tEnd);

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [location]);

  if (!visible) return null;

  const overlayOpacity = phase === "in" ? 1 : 0;
  const logoScale = phase === "in" ? 1 : 0.94;

  return (
    <>
      <style>{`
        @keyframes pt-logo-pulse {
          0%, 100% { opacity: 0.92; }
          50%      { opacity: 1; }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: DARK_BG,
          opacity: overlayOpacity,
          transition: "opacity 380ms cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 100000,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo-mark.png"
          alt=""
          style={{
            width: "min(120px, 22vw)",
            height: "auto",
            opacity: overlayOpacity,
            transform: `scale(${logoScale})`,
            transition:
              "opacity 380ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "drop-shadow(0 0 18px rgba(20,181,126,0.35))",
            animation: "pt-logo-pulse 1.2s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}
