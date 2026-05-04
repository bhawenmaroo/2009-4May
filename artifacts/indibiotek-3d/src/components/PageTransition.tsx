import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const DARK_BG = "#0E1C14";
const TOTAL_MS = 1100;

export function PageTransition() {
  const [location] = useLocation();
  const [transitionKey, setTransitionKey] = useState(0);
  const [active, setActive] = useState(false);
  const firstRender = useRef(true);
  const hideTimer = useRef<number | null>(null);

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

  return (
    <div
      key={transitionKey}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pt-curtain-sweep {
          0%   { transform: translate3d(0, 100%, 0); }
          42%  { transform: translate3d(0, 0%, 0); }
          58%  { transform: translate3d(0, 0%, 0); }
          100% { transform: translate3d(0, -100%, 0); }
        }
        @keyframes pt-logo-reveal {
          0%   { opacity: 0; transform: translateY(14px); }
          42%  { opacity: 1; transform: translateY(0); }
          58%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-14px); }
        }
        @keyframes pt-bar-grow {
          0%   { transform: scaleX(0); }
          42%  { transform: scaleX(1); }
          58%  { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `}</style>

      {/* The curtain — solid dark panel that sweeps up across the viewport */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: DARK_BG,
          willChange: "transform",
          animation: `pt-curtain-sweep ${TOTAL_MS}ms cubic-bezier(0.76, 0, 0.24, 1) forwards`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <img
          src="/logo-mark.png"
          alt=""
          style={{
            width: "min(96px, 18vw)",
            height: "auto",
            opacity: 0,
            filter: "drop-shadow(0 0 22px rgba(20,181,126,0.35))",
            animation: `pt-logo-reveal ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            willChange: "opacity, transform",
          }}
        />
        {/* Thin lime accent bar that grows under the logo, then collapses */}
        <div
          style={{
            width: "min(120px, 22vw)",
            height: 2,
            background: "#C8FF4D",
            boxShadow: "0 0 14px rgba(200,255,77,0.55)",
            transformOrigin: "center",
            transform: "scaleX(0)",
            animation: `pt-bar-grow ${TOTAL_MS}ms cubic-bezier(0.76, 0, 0.24, 1) forwards`,
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
}
