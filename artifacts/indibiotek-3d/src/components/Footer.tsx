const ACCENT = "#0B6A4D";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const TEXT_MUTE = "rgba(14,42,28,0.55)";
const LIME = "#C8FF4D";

const LOCATIONS = [
  "R&D Facility: Centre for Drug Design Discovery & Development (C4D), SRM University, Delhi-NCR, Sonipat",
  "E-YUVA Centre (Supported by BIRAC), Adamas University",
  "The Bengal Chamber of Commerce & Industry (BCCI)",
  "Registered Office: Kolkata, West Bengal",
  "Regional Offices: Kolkata · Guwahati · Bengaluru · Delhi-NCR · Andaman & Nicobar (UT)",
];

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-24"
      data-testid="footer"
      style={{
        background: "linear-gradient(180deg, #ECF3EE 0%, #DCE9DF 100%)",
        borderTop: "1px solid rgba(20,181,126,0.18)",
      }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-14 sm:py-20 text-center">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Indibiotek Private Limited"
          style={{ height: 56, width: "auto", margin: "0 auto 22px" }}
        />

        {/* Mono eyebrow */}
        <div
          style={{
            fontFamily: "Menlo, monospace",
            fontSize: 11,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: LIME, boxShadow: `0 0 10px ${LIME}`,
            }}
          />
          Indibiotek Private Limited
        </div>

        {/* Tagline */}
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
            fontWeight: 600,
            color: TEXT_DARK,
            letterSpacing: "-0.01em",
            marginBottom: 28,
          }}
        >
          Biotech solutions for people and planet.
        </h3>

        {/* Locations as pill chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            maxWidth: 820,
            margin: "0 auto 32px",
          }}
        >
          {LOCATIONS.map((loc) => (
            <span
              key={loc}
              style={{
                fontSize: "clamp(11px, 2.6vw, 12.5px)",
                lineHeight: 1.5,
                color: TEXT_BODY,
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(20,181,126,0.20)",
                borderRadius: 18,
                padding: "8px 14px",
                fontWeight: 500,
                maxWidth: "100%",
                overflowWrap: "anywhere",
              }}
            >
              {loc}
            </span>
          ))}
        </div>

        {/* Contact line */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
            padding: "14px 22px",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(20,181,126,0.25)",
            borderRadius: 22,
            marginBottom: 28,
            maxWidth: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: ACCENT,
              fontWeight: 700,
            }}
          >
            Contact us
          </span>
          <a
            href="tel:+918902052927"
            style={{
              color: TEXT_DARK,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
            data-testid="footer-phone"
          >
            +91 89020 52927
          </a>
          <span style={{ color: TEXT_MUTE, fontSize: 14 }}>·</span>
          <a
            href="mailto:info@indibiotek.com"
            style={{
              color: TEXT_DARK,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
            data-testid="footer-email"
          >
            info@indibiotek.com
          </a>
          <span style={{ color: TEXT_MUTE, fontSize: 14 }}>·</span>
          <a
            href="https://in.linkedin.com/company/indibiotek-private-limited"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-testid="footer-linkedin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "rgba(11,106,77,0.08)",
              border: "1px solid rgba(20,181,126,0.30)",
              color: ACCENT,
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background: "rgba(20,181,126,0.30)",
            margin: "0 auto 22px",
          }}
        />

        {/* Copyright */}
        <div
          style={{
            color: TEXT_MUTE,
            fontSize: 12.5,
            letterSpacing: "0.02em",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <span style={{ color: TEXT_DARK, fontWeight: 700, letterSpacing: "0.05em" }}>
            INDIBIOTEK PRIVATE LIMITED
          </span>{" "}
          — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
