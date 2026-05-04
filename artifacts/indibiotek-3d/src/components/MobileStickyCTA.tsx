const ACCENT = "#0B6A4D";
const ACCENT_BRIGHT = "#14B57E";
const TEXT_DARK = "#0E2A1C";

export function MobileStickyCTA() {
  return (
    <div
      data-testid="mobile-sticky-cta"
      className="md:hidden fixed left-0 right-0 z-40"
      style={{
        bottom: 0,
        padding: "8px 10px calc(8px + env(safe-area-inset-bottom, 0px))",
        background:
          "linear-gradient(180deg, rgba(244,248,245,0.0) 0%, rgba(244,248,245,0.95) 38%, #F4F8F5 100%)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          background: "rgba(255,255,255,0.96)",
          border: "1px solid rgba(14,42,28,0.10)",
          borderRadius: 18,
          padding: 6,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 12px 32px rgba(11,28,18,0.18)",
        }}
      >
        <a
          href="tel:+918902052927"
          data-testid="mcta-call"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "10px 6px",
            borderRadius: 14,
            color: TEXT_DARK,
            textDecoration: "none",
            background: "rgba(14,42,28,0.04)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>Call</span>
        </a>

        <a
          href="https://wa.me/919608768647"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mcta-whatsapp"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "10px 6px",
            borderRadius: 14,
            color: "#FFFFFF",
            textDecoration: "none",
            background: `linear-gradient(135deg, ${ACCENT_BRIGHT}, ${ACCENT})`,
            boxShadow: "0 6px 16px rgba(11,106,77,0.30)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.36.572-1.001 3.65 3.74-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
