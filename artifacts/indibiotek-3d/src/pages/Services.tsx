import { PageShell, GlassCard } from "@/components/PageShell";
import { InquiryForm } from "@/components/InquiryForm";

const OFFERINGS = [
  {
    n: "01",
    title: "Nucleic Acid Services",
    items: [
      "DNA / RNA Oligo Synthesis",
      "DNA & RNA Purification",
      "PCR Solutions",
    ],
  },
  {
    n: "02",
    title: "Gene Expression & Cloning",
    items: [
      "Gene Expression Analysis",
      "Cloning & Subcloning",
      "TA Cloning and Screening",
    ],
  },
  {
    n: "03",
    title: "Protein Engineering",
    items: [
      "Site-Directed Mutagenesis",
      "Recombinant Protein Expression",
      "Recombinant Protein Purification",
    ],
  },
  {
    n: "04",
    title: "Protein Analysis",
    items: [
      "Western Blot Analysis",
      "Enzyme Kinetics",
    ],
  },
  {
    n: "05",
    title: "Multi-Omics Studies",
    items: [
      "Genomics & Epigenomics",
      "Transcriptomics",
      "Microbiome & Metagenomics",
      "Proteomics & Metabolomics Integration Studies",
      "Pharmacogenomics & Toxicogenomics",
    ],
  },
  {
    n: "06",
    title: "Genome Editing & Bioinformatics",
    items: [
      "Oncology Genomics",
      "CRISPR & Genome Editing Services",
      "Multi-Omics Integration",
      "Bioinformatics & Data Analysis",
      "Agricultural & Environmental Omics",
    ],
  },
  {
    n: "07",
    title: "Custom Synthesis & Reagents",
    items: [
      "Gene & Peptide Synthesis",
      "Custom Antibodies",
      "Customised Reagents",
    ],
  },
];

const ACCENT = "#0B6A4D";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const LIME = "#C8FF4D";

export default function Services() {
  return (
    <PageShell
      eyebrow="Services"
      title="What we offer."
      intro="A complete molecular biology and multi-omics services portfolio — from oligo synthesis and cloning to CRISPR, bioinformatics and custom reagents — delivered end-to-end."
      heroImage="https://images.unsplash.com/photo-1559757175-5700dde675bc?"
    >
      <section className="px-5 sm:px-8 md:px-16 pb-12 mt-0 sm:-mt-16 md:-mt-24 lg:-mt-32" style={{ position: "relative", zIndex: 2 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map((o) => (
              <GlassCard
                key={o.n}
                style={{ padding: 28, position: "relative" }}
                className="page-reveal"
              >
                {/* mono index */}
                <span
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 22,
                    fontFamily: "Menlo, monospace",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: ACCENT,
                    fontWeight: 700,
                  }}
                >
                  — {o.n}
                </span>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.18rem",
                    fontWeight: 600,
                    color: TEXT_DARK,
                    marginBottom: 16,
                    paddingRight: 40,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {o.title}
                </h3>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {o.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "6px 0",
                        color: TEXT_BODY,
                        fontSize: 14,
                        lineHeight: 1.55,
                        fontWeight: 400,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: LIME,
                          boxShadow: `0 0 8px ${LIME}`,
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 48,
              padding: "clamp(22px, 4vw, 32px) clamp(20px, 4vw, 36px)",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(20,181,126,0.22)",
              borderRadius: 20,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Menlo, monospace",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: 6,
                  fontWeight: 700,
                }}
              >
                Need a custom workflow?
              </div>
              <div
                className="font-display"
                style={{ fontSize: "1.25rem", fontWeight: 600, color: TEXT_DARK, marginBottom: 8 }}
              >
                Talk to our scientists about your project.
              </div>
              <a
                href="mailto:info@indibiotek.com"
                style={{
                  color: ACCENT,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                data-testid="services-cta-email"
              >
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: LIME, boxShadow: `0 0 8px ${LIME}`,
                }} />
                info@indibiotek.com
              </a>
            </div>
            <a
              href="https://wa.me/919608768647"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0E1C14",
                color: LIME,
                padding: "14px 26px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Contact us →
            </a>
          </div>
        </div>
      </section>

      <InquiryForm
        subject="Services"
        eyebrow="Inquire · Services"
        title="Request a quote on any service."
        intro="Share your project goals, sample details and expected turnaround. We'll respond with a tailored quote and timeline."
      />
    </PageShell>
  );
}
