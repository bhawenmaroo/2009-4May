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
      <div className="max-w-4xl mx-auto px-8 md:px-12 py-20 text-center">
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
                fontSize: 12.5,
                lineHeight: 1.5,
                color: TEXT_BODY,
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(20,181,126,0.20)",
                borderRadius: 999,
                padding: "8px 14px",
                fontWeight: 500,
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
            gap: 18,
            padding: "16px 26px",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(20,181,126,0.25)",
            borderRadius: 999,
            marginBottom: 28,
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
