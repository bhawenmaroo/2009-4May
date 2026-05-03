import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const SERVICES = [
  { title: "Analytical Testing", desc: "HPLC, LC-MS, NMR, microbiology and genomic assays under quality systems." },
  { title: "Contract Research (CRO)", desc: "Method development, stability studies, and custom research projects for partners." },
  { title: "Bioassay Development", desc: "Cell-based and biochemical assays validated for routine industrial use." },
  { title: "Genomics & Sequencing", desc: "Whole-genome, targeted and metagenomic sequencing with bioinformatics support." },
  { title: "Quality & Compliance", desc: "Auditable workflows aligned to GLP, GMP and ISO standards." },
  { title: "Consulting", desc: "Scientific advisory across discovery, scale-up and regulatory strategy." },
];

export default function Scientific() {
  return (
    <PageShell
      eyebrow="Scientific Services"
      title="A laboratory partner you can build on."
      intro="Our scientific services arm provides regulated, high-quality analytical and research capabilities to industry, government and academic clients."
      heroImage="https://images.unsplash.com/photo-1579165466949-3180a3d056d5?"
      logo="/divisions/scientific.png"
    >
      <section className="px-5 sm:px-8 md:px-16 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Capabilities" title="Trusted services, end-to-end." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <GlassCard key={s.title} style={{ padding: 28 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 14.5, lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
