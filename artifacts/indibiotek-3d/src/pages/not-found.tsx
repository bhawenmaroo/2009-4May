import { Link } from "wouter";

const ACCENT = "#0B6A4D";
const ACCENT_BRIGHT = "#14B57E";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const LIME = "#C8FF4D";
const BG = "#F4F8F5";

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-5 py-20 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top, #ECF3EE 0%, ${BG} 60%)`,
      }}
      data-testid="not-found-page"
    >
      {/* Soft accent glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(20,181,126,0.18) 0%, rgba(20,181,126,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,255,77,0.16) 0%, rgba(200,255,77,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Brand mark */}
        <img
          src="/logo-mark.png"
          alt="Indibiotek"
          width={88}
          height={88}
          style={{
            width: 88,
            height: 88,
            margin: "0 auto 28px",
            display: "block",
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "1px solid rgba(20,181,126,0.25)",
            padding: 14,
            boxShadow:
              "0 14px 32px rgba(11,106,77,0.18), 0 0 0 6px rgba(244,248,245,0.6)",
          }}
        />

        {/* Mono eyebrow */}
        <div
          style={{
            fontFamily: "Menlo, monospace",
            fontSize: 11,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 10px ${LIME}`,
            }}
          />
          Error 404 · Sample lost in the centrifuge
        </div>

        {/* Big "404" with brand accent */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 9rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${TEXT_DARK} 0%, ${ACCENT_BRIGHT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
          }}
        >
          404
        </h1>

        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            fontWeight: 600,
            color: TEXT_DARK,
            marginBottom: 14,
            maxWidth: "20ch",
            margin: "0 auto 14px",
          }}
        >
          This page didn't culture properly.
        </h2>

        <p
          style={{
            color: TEXT_BODY,
            fontSize: "1.02rem",
            lineHeight: 1.65,
            maxWidth: 480,
            margin: "0 auto 32px",
          }}
        >
          The link you followed may be broken, or the page may have been moved.
          Let's get you back to something more productive.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <Link
            href="/"
            data-testid="link-home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              height: 50,
              padding: "0 26px",
              borderRadius: 999,
              background: TEXT_DARK,
              color: LIME,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              fontFamily: "Menlo, monospace",
              textDecoration: "none",
              boxShadow: "0 10px 28px rgba(14,42,28,0.25)",
              cursor: "pointer",
            }}
          >
            ← Back to home
          </Link>
          <Link
            href="/contact"
            data-testid="link-contact-from-404"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              height: 50,
              padding: "0 26px",
              borderRadius: 999,
              background: "transparent",
              color: ACCENT,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              fontFamily: "Menlo, monospace",
              textDecoration: "none",
              border: "1px solid rgba(11,106,77,0.30)",
              cursor: "pointer",
            }}
          >
            Contact us →
          </Link>
        </div>

        {/* Helpful links */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 28,
            borderTop: "1px solid rgba(14,42,28,0.10)",
            color: "rgba(14,42,28,0.55)",
            fontSize: 12,
            fontFamily: "Menlo, monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ marginBottom: 12 }}>Or jump to a division</div>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 18,
            }}
          >
            {[
              { href: "/lifesciences", label: "Lifesciences" },
              { href: "/agri", label: "Agri" },
              { href: "/scientific", label: "Scientific" },
              { href: "/services", label: "Services" },
              { href: "/rnd", label: "R&D" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: ACCENT,
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
