import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const TOTAL_MS = 1250;

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
        @keyframes pt-veil {
          0%   { backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); background-color: rgba(244,248,245,0); }
          35%  { backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px); background-color: rgba(244,248,245,0.28); }
          65%  { backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px); background-color: rgba(244,248,245,0.28); }
          100% { backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); background-color: rgba(244,248,245,0); }
        }
        @keyframes pt-glow {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          35%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          65%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes pt-logo {
          0%   { opacity: 0; transform: translateY(20px) scale(0.82); }
          28%  { opacity: 1; transform: translateY(0)    scale(1.04); }
          38%  { opacity: 1; transform: translateY(0)    scale(1); }
          65%  { opacity: 1; transform: translateY(0)    scale(1); }
          100% { opacity: 0; transform: translateY(-18px) scale(0.96); }
        }
        @keyframes pt-bar-fill {
          0%   { transform: scaleX(0); opacity: 0; }
          20%  { opacity: 1; }
          55%  { transform: scaleX(1); opacity: 1; }
          70%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes pt-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50%      { opacity: 1;   transform: scale(1); }
        }
      `}</style>

      {/* Soft frosted veil — page underneath stays mostly readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          willChange: "backdrop-filter, background-color",
          animation: `pt-veil ${TOTAL_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      />

      {/* Centered stage */}
      <div style={{ position: "relative", width: 0, height: 0 }}>
        {/* Mint radial glow behind logo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 320,
            height: 320,
            transform: "translate(-50%, -50%) scale(0.4)",
            background:
              "radial-gradient(circle, rgba(20,181,126,0.28) 0%, rgba(20,181,126,0.08) 35%, rgba(20,181,126,0) 70%)",
            opacity: 0,
            animation: `pt-glow ${TOTAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            willChange: "opacity, transform",
          }}
        />

        {/* Logo + bar stack */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: "min(108px, 19vw)",
              height: "min(108px, 19vw)",
              borderRadius: "50%",
              background: "#FFFFFF",
              border: "1px solid rgba(20,181,126,0.25)",
              boxShadow:
                "0 14px 32px rgba(11,106,77,0.18), 0 0 0 6px rgba(244,248,245,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              animation: `pt-logo ${TOTAL_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
              willChange: "opacity, transform",
              overflow: "hidden",
            }}
          >
            <img
              src="/logo-mark.png"
              alt=""
              style={{
                width: "62%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Lime "loading" bar that fills L→R */}
          <div
            style={{
              width: "min(140px, 24vw)",
              height: 2,
              background: "rgba(11,106,77,0.15)",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, #14B57E 0%, #C8FF4D 50%, #14B57E 100%)",
                boxShadow: "0 0 10px rgba(200,255,77,0.55)",
                transformOrigin: "left center",
                transform: "scaleX(0)",
                opacity: 0,
                animation: `pt-bar-fill ${TOTAL_MS}ms cubic-bezier(0.65, 0, 0.35, 1) forwards`,
                willChange: "transform, opacity",
              }}
            />
          </div>

          {/* Three subtle dots — micro-detail under the bar */}
          <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#14B57E",
                  opacity: 0.3,
                  animation: `pt-dot 900ms ease-in-out ${i * 140}ms infinite`,
                  willChange: "opacity, transform",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
