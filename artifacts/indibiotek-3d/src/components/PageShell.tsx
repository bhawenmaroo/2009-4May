import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageShell({
  eyebrow,
  title,
  intro,
  heroImage,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  heroImage?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "power3.out" },
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="min-h-screen">
      {/* Page hero with optional image */}
      <section
        className="relative pt-40 pb-24 px-6 md:px-12 overflow-hidden"
        style={{
          minHeight: "60vh",
          backgroundImage: heroImage
            ? `linear-gradient(180deg, rgba(3,19,10,0.55) 0%, rgba(3,19,10,0.85) 70%, rgba(3,19,10,1) 100%), url("${heroImage}&w=1800&q=80&auto=format&fit=crop")`
            : "linear-gradient(180deg, rgba(3,19,10,0.0) 0%, rgba(3,19,10,0.6) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto relative">
          <div
            className="page-reveal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7AFFD4",
              marginBottom: 22,
            }}
          >
            <span style={{ width: 28, height: 1, background: "#7AFFD4" }} />
            {eyebrow}
          </div>
          <h1
            className="page-reveal font-display"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 22,
              maxWidth: "22ch",
            }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="page-reveal"
              style={{
                color: "rgba(232,245,238,0.78)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 640,
              }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>
      <div className="page-reveal relative" style={{ background: "#03130A" }}>
        {children}
      </div>
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background:
          "linear-gradient(135deg, rgba(20,52,36,0.55) 0%, rgba(8,28,18,0.40) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(122,255,212,0.14)",
        borderRadius: 16,
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div style={{ textAlign: align, marginBottom: 40 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: light ? "#3EE6A8" : "#7AFFD4",
          marginBottom: 14,
        }}
      >
        <span style={{ width: 24, height: 1, background: light ? "#3EE6A8" : "#7AFFD4" }} />
        {eyebrow}
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.015em",
          fontWeight: 700,
          color: "#fff",
          maxWidth: "26ch",
          margin: align === "center" ? "0 auto" : "0",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
