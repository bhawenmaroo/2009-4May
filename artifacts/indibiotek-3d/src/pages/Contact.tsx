import { useState } from "react";
import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell
      eyebrow="Contact Us"
      title="Let's build something biological — together."
      intro="Reach out to discuss collaborations, partnerships, scientific services or career opportunities. Our team responds within two working days."
      heroImage="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?"
    >
      <section className="px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 page-reveal">
            <GlassCard style={{ padding: 36 }}>
              <SectionHeading eyebrow="Send a Message" title="We'd love to hear from you." />
              {submitted ? (
                <div
                  style={{
                    padding: 28,
                    background: "rgba(20,181,126,0.10)",
                    border: "1px solid rgba(20,181,126,0.30)",
                    borderRadius: 12,
                    color: "#E8F5EE",
                    textAlign: "center",
                  }}
                  data-testid="contact-success"
                >
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: "#0B6A4D" }}>
                    Thank you.
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(14,42,28,0.72)" }}>
                    We've received your message and will be in touch shortly.
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  data-testid="contact-form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { ph: "Full name", type: "text", id: "input-name" },
                      { ph: "Work email", type: "email", id: "input-email" },
                    ].map((f) => (
                      <input
                        key={f.id}
                        required
                        type={f.type}
                        placeholder={f.ph}
                        data-testid={f.id}
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(20,181,126,0.25)",
                          borderRadius: 10,
                          padding: "13px 16px",
                          color: "#E8F5EE",
                          fontSize: 14,
                          outline: "none",
                          width: "100%",
                          fontFamily: "Inter, sans-serif",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mb-4">
                    <select
                      data-testid="input-interest"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(20,181,126,0.25)",
                        borderRadius: 10,
                        padding: "13px 16px",
                        color: "#E8F5EE",
                        fontSize: 14,
                        outline: "none",
                        width: "100%",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <option style={{ background: "#FFFFFF" }}>I'm interested in…</option>
                      <option style={{ background: "#FFFFFF" }}>Partnership / Investment</option>
                      <option style={{ background: "#FFFFFF" }}>Lifesciences</option>
                      <option style={{ background: "#FFFFFF" }}>Agri</option>
                      <option style={{ background: "#FFFFFF" }}>Scientific Services</option>
                      <option style={{ background: "#FFFFFF" }}>Careers</option>
                      <option style={{ background: "#FFFFFF" }}>Other</option>
                    </select>
                  </div>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project or inquiry…"
                    data-testid="input-message"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(20,181,126,0.25)",
                      borderRadius: 10,
                      padding: "13px 16px",
                      color: "#E8F5EE",
                      fontSize: 14,
                      outline: "none",
                      width: "100%",
                      resize: "vertical",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: 18,
                    }}
                  />
                  <button
                    type="submit"
                    data-testid="button-submit"
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 999,
                      background: "linear-gradient(135deg, #3EE6A8, #5AC8FF)",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: "0.04em",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 28px rgba(62,230,168,0.30)",
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </GlassCard>
          </div>

          <div className="lg:col-span-5 page-reveal space-y-4">
            <GlassCard style={{ padding: 28 }}>
              <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: 14 }}>
                Headquarters
              </h3>
              <p style={{ color: "rgba(14,42,28,0.72)", fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>
                Indibiotek Private Limited<br />
                India
              </p>
            </GlassCard>

            <GlassCard style={{ padding: 28 }}>
              <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: 14 }}>
                Email
              </h3>
              <a
                href="mailto:info@indibiotek.com"
                style={{ color: "#0B6A4D", fontSize: 14, textDecoration: "none" }}
                data-testid="link-email"
              >
                info@indibiotek.com
              </a>
            </GlassCard>

            <GlassCard style={{ padding: 28 }}>
              <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: 14 }}>
                Departments
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "rgba(14,42,28,0.72)", fontSize: 14, lineHeight: 1.9 }}>
                <li>Partnerships — partners@indibiotek.com</li>
                <li>Careers — careers@indibiotek.com</li>
                <li>Press — press@indibiotek.com</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
