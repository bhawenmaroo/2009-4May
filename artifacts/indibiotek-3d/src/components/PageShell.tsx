import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out" },
      );
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="min-h-screen">
      {/* Page hero */}
      <section className="relative pt-40 pb-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
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
              marginBottom: 18,
            }}
          >
            <span style={{ width: 28, height: 1, background: "#7AFFD4" }} />
            {eyebrow}
          </div>
          <h1
            className="page-reveal font-display"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 22,
              maxWidth: "20ch",
            }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="page-reveal"
              style={{
                color: "rgba(232,245,238,0.72)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 720,
              }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>
      <div className="page-reveal">{children}</div>
    </div>
  );
}

/* Reusable glassmorphism card */
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
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
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
          color: "#7AFFD4",
          marginBottom: 14,
        }}
      >
        <span style={{ width: 24, height: 1, background: "#7AFFD4" }} />
        {eyebrow}
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.015em",
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
