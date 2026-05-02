import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";
import { Link } from "wouter";

const ROLES = [
  { title: "Senior Scientist — Synthetic Biology", loc: "India · Full-time", team: "R&D" },
  { title: "Bioprocess Engineer", loc: "India · Full-time", team: "Manufacturing" },
  { title: "Computational Biologist", loc: "Remote / India · Full-time", team: "R&D" },
  { title: "Field Agronomist", loc: "India · Field-based", team: "Agri" },
  { title: "Quality Assurance Lead", loc: "India · Full-time", team: "Scientific Services" },
  { title: "Business Development Manager", loc: "India · Full-time", team: "Commercial" },
];

const PERKS = [
  { title: "Meaningful Work", desc: "Solve problems that affect millions of people and the planet." },
  { title: "Modern Labs", desc: "Equipment, software and computational resources to do your best work." },
  { title: "Growth Pathway", desc: "Mentorship, learning budgets and clear progression." },
  { title: "Hybrid & Inclusive", desc: "A culture that respects difference and supports flexibility." },
];

export default function Careers() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Build a career at the intersection of biology, technology and impact."
      intro="We are hiring scientists, engineers and operators who want to do science that ships — and ships at scale."
      heroImage="https://images.unsplash.com/photo-1582719471384-894fbb16e074?"
    >
      <section className="px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Why Indibiotek" title="What you can expect." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {PERKS.map((p) => (
              <GlassCard key={p.title} style={{ padding: 24 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 13.5, lineHeight: 1.65, fontWeight: 400 }}>{p.desc}</p>
              </GlassCard>
            ))}
          </div>

          <SectionHeading eyebrow="Open Roles" title="Join the team." />
          <GlassCard style={{ padding: 8 }} className="page-reveal">
            {ROLES.map((r, i) => (
              <div
                key={r.title}
                style={{
                  padding: "20px 22px",
                  borderBottom: i < ROLES.length - 1 ? "1px solid rgba(20,181,126,0.12)" : "none",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ color: "#0E2A1C", fontWeight: 600, fontSize: "1.02rem", marginBottom: 4 }}>{r.title}</div>
                  <div style={{ color: "rgba(14,42,28,0.62)", fontSize: 13 }}>
                    <span style={{ color: "#0B6A4D", marginRight: 12, fontWeight: 600 }}>{r.team}</span>
                    {r.loc}
                  </div>
                </div>
                <Link href="/contact">
                  <span
                    className="cursor-pointer"
                    style={{
                      padding: "8px 18px",
                      borderRadius: 999,
                      background: "rgba(20,181,126,0.10)",
                      border: "1px solid rgba(20,181,126,0.30)",
                      color: "#0B6A4D",
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  >
                    Apply →
                  </span>
                </Link>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
