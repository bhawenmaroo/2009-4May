const ACCENT = "#0B6A4D";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const TEXT_MUTE = "rgba(14,42,28,0.55)";

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
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 text-center">
        {/* Logo - prominent */}
        <img
          src="/logo.png"
          alt="Indibiotek Private Limited"
          style={{ height: 64, width: "auto", margin: "0 auto 24px" }}
        />

        {/* Locations - structured rows for clarity */}
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <LocationRow
            label="R&D Facility"
            text="Centre for Drug Design Discovery & Development (C4D), SRM University, Delhi-NCR, Sonipat"
          />
          <LocationRow
            label="Incubation"
            text="E-YUVA Centre (Supported by BIRAC), Adamas University · The Bengal Chamber of Commerce & Industry (BCCI)"
          />
          <LocationRow
            label="Registered Office"
            text="Kolkata, West Bengal"
          />
          <LocationRow
            label="Regional Offices"
            text="Kolkata · Guwahati · Bengaluru · Delhi-NCR · Andaman & Nicobar (UT)"
          />
        </div>

        {/* Contact pill */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
            padding: "10px 22px",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(20,181,126,0.22)",
            borderRadius: 999,
            marginBottom: 22,
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
            Contact
          </span>
          <a
            href="tel:+918902052927"
            style={{ color: TEXT_DARK, fontWeight: 600, textDecoration: "none", fontSize: 13.5 }}
            data-testid="footer-phone"
          >
            +91 89020 52927
          </a>
          <span style={{ color: TEXT_MUTE }}>·</span>
          <a
            href="mailto:info@indibiotek.com"
            style={{ color: TEXT_DARK, fontWeight: 600, textDecoration: "none", fontSize: 13.5 }}
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
            paddingTop: 16,
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

function LocationRow({ label, text }: { label: string; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "baseline",
        gap: 10,
        fontSize: 12.5,
        lineHeight: 1.6,
      }}
    >
      <span
        className="font-display"
        style={{
          fontSize: 13,
          letterSpacing: "0.01em",
          color: ACCENT,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {label}:
      </span>
      <span style={{ color: TEXT_BODY, fontFamily: "Inter, sans-serif" }}>{text}</span>
    </div>
  );
}
