const ACCENT = "#0B6A4D";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const TEXT_MUTE = "rgba(14,42,28,0.55)";
const LIME = "#C8FF4D";

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-20"
      data-testid="footer"
      style={{
        background: "linear-gradient(180deg, #ECF3EE 0%, #DCE9DF 100%)",
        borderTop: "1px solid rgba(20,181,126,0.18)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 text-center">
        {/* Eyebrow with logo */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: LIME, boxShadow: `0 0 10px ${LIME}`,
            }}
          />
          <img
            src="/logo.png"
            alt="Indibiotek Private Limited"
            style={{ height: 26, width: "auto" }}
          />
        </div>

        {/* Locations as one tight paragraph */}
        <p
          style={{
            fontSize: 12.5,
            lineHeight: 1.7,
            color: TEXT_BODY,
            maxWidth: 880,
            margin: "0 auto 14px",
          }}
        >
          <strong style={{ color: ACCENT, fontWeight: 700 }}>R&D Facility:</strong>{" "}
          Centre for Drug Design Discovery & Development (C4D), SRM University, Delhi-NCR, Sonipat
          <span style={{ color: TEXT_MUTE, margin: "0 8px" }}>|</span>
          E-YUVA Centre (Supported by BIRAC), Adamas University
          <span style={{ color: TEXT_MUTE, margin: "0 8px" }}>|</span>
          The Bengal Chamber of Commerce & Industry (BCCI)
          <span style={{ color: TEXT_MUTE, margin: "0 8px" }}>|</span>
          <strong style={{ color: ACCENT, fontWeight: 700 }}>Registered Office:</strong>{" "}
          Kolkata, West Bengal
          <span style={{ color: TEXT_MUTE, margin: "0 8px" }}>|</span>
          <strong style={{ color: ACCENT, fontWeight: 700 }}>Regional Offices:</strong>{" "}
          Kolkata · Guwahati · Bengaluru · Delhi-NCR · Andaman & Nicobar (UT)
        </p>

        {/* Contact line - inline, no pill */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 10.5,
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
            style={{ color: TEXT_DARK, fontWeight: 600, textDecoration: "none" }}
            data-testid="footer-phone"
          >
            +91 89020 52927
          </a>
          <span style={{ color: TEXT_MUTE }}>·</span>
          <a
            href="mailto:info@indibiotek.com"
            style={{ color: TEXT_DARK, fontWeight: 600, textDecoration: "none" }}
            data-testid="footer-email"
          >
            info@indibiotek.com
          </a>
        </div>

        {/* Copyright */}
        <div
          style={{
            color: TEXT_MUTE,
            fontSize: 11.5,
            letterSpacing: "0.02em",
            paddingTop: 12,
            borderTop: "1px solid rgba(20,181,126,0.18)",
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
