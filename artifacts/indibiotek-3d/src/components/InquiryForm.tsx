import { useState } from "react";

const ACCENT = "#0B6A4D";
const ACCENT_BRIGHT = "#14B57E";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const TEXT_MUTED = "rgba(14,42,28,0.55)";
const LIME = "#C8FF4D";

const WHATSAPP = "919608768647";
const EMAIL = "info@indibiotek.com";

export function InquiryForm({
  subject,
  eyebrow = "Inquire",
  title,
  intro,
}: {
  subject: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  // Lightweight client validation. Required: name + message. Optional fields
  // (email, phone) are validated only when present so we never hand bad data
  // to the mailto / WhatsApp URLs.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^\+?[0-9 ()\-]{7,20}$/;
  const MAX_MESSAGE = 1500;

  const emailOk = !email.trim() || EMAIL_RE.test(email.trim());
  const phoneOk = !phone.trim() || PHONE_RE.test(phone.trim());
  const messageOk =
    message.trim().length > 4 && message.trim().length <= MAX_MESSAGE;
  const valid = name.trim().length > 1 && messageOk && emailOk && phoneOk;

  const errorBorder = (ok: boolean): string =>
    ok ? "rgba(14,42,28,0.14)" : "rgba(220,38,38,0.55)";

  const buildText = () => {
    const lines = [
      `Inquiry: ${subject}`,
      "",
      `Name: ${name}`,
      org && `Organisation: ${org}`,
      email && `Email: ${email}`,
      phone && `Phone: ${phone}`,
      "",
      "Message:",
      message,
      "",
      "— Sent via indibiotek.com",
    ].filter(Boolean) as string[];
    return lines.join("\n");
  };

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent("whatsapp");
  };

  const sendEmail = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const subj = encodeURIComponent(`Inquiry: ${subject}`);
    const body = encodeURIComponent(buildText());
    window.location.href = `mailto:${EMAIL}?subject=${subj}&body=${body}`;
    setSent("email");
  };

  const fieldStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(14,42,28,0.14)",
    borderRadius: 10,
    padding: "12px 14px",
    color: TEXT_DARK,
    fontSize: 14,
    outline: "none",
    width: "100%",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  };

  return (
    <section
      className="px-5 sm:px-8 md:px-16 py-12 sm:py-16"
      data-testid={`inquiry-section-${subject.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="max-w-3xl mx-auto">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(244,248,245,0.85) 100%)",
            border: "1px solid rgba(11,106,77,0.16)",
            borderRadius: 22,
            padding: "clamp(24px, 4vw, 40px)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.9) inset, 0 18px 40px -18px rgba(11,106,77,0.18), 0 4px 14px rgba(14,42,28,0.04)",
          }}
        >
          <div
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 12,
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
            {eyebrow}
          </div>

          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              fontWeight: 600,
              color: TEXT_DARK,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              marginBottom: intro ? 10 : 22,
              maxWidth: "26ch",
            }}
          >
            {title ?? `Talk to our team about ${subject}.`}
          </h3>

          {intro && (
            <p
              style={{
                color: TEXT_BODY,
                fontSize: "0.98rem",
                lineHeight: 1.65,
                marginBottom: 22,
                maxWidth: 560,
              }}
            >
              {intro}
            </p>
          )}

          {sent ? (
            <div
              style={{
                padding: 22,
                background: "rgba(20,181,126,0.08)",
                border: "1px solid rgba(20,181,126,0.30)",
                borderRadius: 12,
                color: TEXT_DARK,
              }}
              data-testid="inquiry-success"
            >
              <div style={{ fontWeight: 700, marginBottom: 6, color: ACCENT }}>
                {sent === "whatsapp" ? "Opening WhatsApp…" : "Opening your email app…"}
              </div>
              <div style={{ fontSize: 14, color: TEXT_BODY }}>
                If nothing opened, reach us directly at{" "}
                <a href={`mailto:${EMAIL}`} style={{ color: ACCENT, fontWeight: 600 }}>
                  {EMAIL}
                </a>{" "}
                or{" "}
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: ACCENT, fontWeight: 600 }}
                >
                  WhatsApp +91 96087 68647
                </a>
                .
              </div>
              <button
                type="button"
                onClick={() => setSent(null)}
                style={{
                  marginTop: 14,
                  background: "transparent",
                  border: "none",
                  color: TEXT_MUTED,
                  fontSize: 12.5,
                  fontFamily: "Menlo, monospace",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  padding: 0,
                }}
                data-testid="inquiry-reset"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={sendWhatsApp} data-testid="inquiry-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  required
                  type="text"
                  placeholder="Your full name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={fieldStyle}
                  data-testid="inquiry-name"
                  aria-label="Your full name"
                />
                <input
                  type="text"
                  placeholder="Organisation"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  style={fieldStyle}
                  data-testid="inquiry-org"
                  aria-label="Organisation"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!emailOk}
                  style={{
                    ...fieldStyle,
                    border: `1px solid ${errorBorder(emailOk)}`,
                  }}
                  data-testid="inquiry-email"
                  aria-label="Work email"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={!phoneOk}
                  style={{
                    ...fieldStyle,
                    border: `1px solid ${errorBorder(phoneOk)}`,
                  }}
                  data-testid="inquiry-phone"
                  aria-label="Phone"
                />
              </div>
              <textarea
                required
                rows={5}
                maxLength={MAX_MESSAGE}
                placeholder={`Tell us about your ${subject.toLowerCase()} requirement…`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...fieldStyle, resize: "vertical", marginBottom: 6 }}
                data-testid="inquiry-message"
                aria-label="Message"
              />
              <div
                style={{
                  fontSize: 11,
                  color: TEXT_MUTED,
                  textAlign: "right",
                  marginBottom: 10,
                  fontFamily: "Menlo, monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {!emailOk && <span style={{ color: "#B23434", marginRight: 12 }}>Invalid email</span>}
                {!phoneOk && <span style={{ color: "#B23434", marginRight: 12 }}>Invalid phone</span>}
                <span>{message.length}/{MAX_MESSAGE}</span>
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: TEXT_MUTED,
                  marginBottom: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "Menlo, monospace",
                  letterSpacing: "0.04em",
                }}
              >
                <span>Subject auto-set:</span>
                <span
                  style={{
                    background: "rgba(11,106,77,0.08)",
                    color: ACCENT,
                    padding: "3px 9px",
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                  data-testid="inquiry-subject-pill"
                >
                  {subject}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <button
                  type="submit"
                  disabled={!valid}
                  data-testid="inquiry-submit-whatsapp"
                  style={{
                    flex: "1 1 220px",
                    height: 50,
                    padding: "0 22px",
                    borderRadius: 999,
                    background: valid
                      ? `linear-gradient(135deg, ${ACCENT_BRIGHT}, ${ACCENT})`
                      : "rgba(14,42,28,0.18)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: valid ? "pointer" : "not-allowed",
                    boxShadow: valid ? "0 10px 28px rgba(11,106,77,0.30)" : "none",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.36.572-1.001 3.65 3.74-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/>
                  </svg>
                  Send via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={sendEmail}
                  disabled={!valid}
                  data-testid="inquiry-submit-email"
                  style={{
                    height: 50,
                    padding: "0 22px",
                    borderRadius: 999,
                    background: "transparent",
                    color: valid ? ACCENT : TEXT_MUTED,
                    fontWeight: 700,
                    fontSize: 12.5,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    border: `1px solid ${valid ? "rgba(11,106,77,0.35)" : "rgba(14,42,28,0.18)"}`,
                    cursor: valid ? "pointer" : "not-allowed",
                    fontFamily: "Menlo, monospace",
                  }}
                >
                  or email us →
                </button>
              </div>

              <p
                style={{
                  marginTop: 14,
                  fontSize: 12,
                  color: TEXT_MUTED,
                  lineHeight: 1.6,
                }}
              >
                Your message opens in WhatsApp or your email app — pre-filled for one-tap send.
                We respond within two working days.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
