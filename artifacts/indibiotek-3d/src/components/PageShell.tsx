import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageShell({
  eyebrow,
  title,
  intro,
  heroImage,
  logo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  heroImage?: string;
  logo?: string;
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
        className="relative pt-28 sm:pt-36 md:pt-40 pb-14 sm:pb-20 md:pb-24 px-5 sm:px-6 md:px-12 overflow-hidden"
        style={{
          minHeight: "clamp(420px, 52vh, 640px)",
          backgroundImage: heroImage
            ? `linear-gradient(180deg, rgba(244,248,245,0.55) 0%, rgba(244,248,245,0.85) 70%, rgba(244,248,245,1) 100%), url("${heroImage}&w=1800&q=80&auto=format&fit=crop")`
            : "linear-gradient(180deg, #ECF3EE 0%, #F4F8F5 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto relative">
          {logo && (
            <div
              className="page-reveal"
              style={{
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={logo}
                alt={eyebrow}
                style={{
                  height: "clamp(64px, 11vw, 132px)",
                  width: "auto",
                  maxWidth: "min(440px, 80%)",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
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
              color: "#0B6A4D",
              marginBottom: 22,
            }}
          >
            <span style={{ width: 28, height: 1, background: "#0B6A4D" }} />
            {eyebrow}
          </div>
          <h1
            className="page-reveal font-display"
            style={{
              fontSize: "clamp(1.75rem, 4.5vw, 3.6rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#0E2A1C",
              marginBottom: 18,
              maxWidth: "22ch",
            }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="page-reveal"
              style={{
                color: "rgba(14,42,28,0.72)",
                fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
                lineHeight: 1.65,
                fontWeight: 400,
                maxWidth: 640,
              }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>
      <div className="page-reveal relative" style={{ background: "#F4F8F5" }}>
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
        background: "#FFFFFF",
        border: "1px solid rgba(20,181,126,0.16)",
        borderRadius: 16,
        boxShadow:
          "0 8px 32px rgba(11,106,77,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
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
          color: light ? "#FFFFFF" : "#0B6A4D",
          marginBottom: 14,
        }}
      >
        <span style={{ width: 24, height: 1, background: light ? "#FFFFFF" : "#0B6A4D" }} />
        {eyebrow}
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.015em",
          fontWeight: 700,
          color: light ? "#FFFFFF" : "#0E2A1C",
          maxWidth: "26ch",
          margin: align === "center" ? "0 auto" : "0",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
