import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes pt-blur-veil {
          0%   { backdrop-filter: blur(0px) saturate(100%); -webkit-backdrop-filter: blur(0px) saturate(100%); background-color: rgba(244,248,245,0); }
          38%  { backdrop-filter: blur(18px) saturate(115%); -webkit-backdrop-filter: blur(18px) saturate(115%); background-color: rgba(244,248,245,0.45); }
          62%  { backdrop-filter: blur(18px) saturate(115%); -webkit-backdrop-filter: blur(18px) saturate(115%); background-color: rgba(244,248,245,0.45); }
          100% { backdrop-filter: blur(0px) saturate(100%); -webkit-backdrop-filter: blur(0px) saturate(100%); background-color: rgba(244,248,245,0); }
        }
        @keyframes pt-logo-rise {
          0%   { opacity: 0; transform: translateY(28px) scale(0.94); }
          38%  { opacity: 1; transform: translateY(0) scale(1); }
          62%  { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-22px) scale(0.96); }
        }
        @keyframes pt-bar-grow {
          0%   { transform: scaleX(0); opacity: 0; }
          38%  { transform: scaleX(1); opacity: 1; }
          62%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }
      `}</style>

      {/* Frosted veil — blurs whatever is underneath, no solid color */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          willChange: "backdrop-filter, background-color",
          animation: `pt-blur-veil ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      />

      {/* Centered stack — logo + lime accent bar rise into view */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <img
          src="/logo-mark.png"
          alt=""
          style={{
            width: "min(110px, 20vw)",
            height: "auto",
            opacity: 0,
            filter: "drop-shadow(0 12px 32px rgba(11,106,77,0.35))",
            animation: `pt-logo-rise ${TOTAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            willChange: "opacity, transform",
          }}
        />
        <div
          style={{
            width: "min(120px, 22vw)",
            height: 2,
            background: "#C8FF4D",
            boxShadow: "0 0 14px rgba(200,255,77,0.55)",
            transformOrigin: "center",
            transform: "scaleX(0)",
            opacity: 0,
            animation: `pt-bar-grow ${TOTAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
}
