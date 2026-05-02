import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const PROGRAMS = [
  { title: "Drug Discovery", desc: "Small-molecule and biologics discovery across oncology, infectious disease and metabolic disorders." },
  { title: "Biopharma Development", desc: "Process development, formulation and analytical characterisation for biological products." },
  { title: "Diagnostics", desc: "Molecular and immunoassay platforms for clinical and point-of-care use." },
  { title: "Translational Medicine", desc: "Biomarker discovery and clinical study design supporting decision-making." },
  { title: "Regulatory & Quality", desc: "GLP / GMP-aligned operations and global regulatory dossier preparation." },
  { title: "Strategic Partnerships", desc: "Co-development with pharma, hospitals and academic centres of excellence." },
];

export default function Lifesciences() {
  return (
    <PageShell
      eyebrow="Lifesciences Division"
      title="From molecule to medicine."
      intro="Our lifesciences division engineers therapeutics, diagnostics and biopharmaceutical processes — built on rigorous science and modern manufacturing."
      heroImage="https://images.unsplash.com/photo-1576086213369-97a306d36557?"
    >
      <section className="px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Programs" title="Capabilities across the value chain." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p) => (
              <GlassCard key={p.title} style={{ padding: 28 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#fff", marginBottom: 10 }}>
                  {p.title}
                </h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 14.5, lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
