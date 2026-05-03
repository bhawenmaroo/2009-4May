import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const FOCUS = [
  { title: "Synthetic Biology", desc: "Rationally engineered microbes and cell-free systems for therapeutics, materials and food." },
  { title: "Computational Discovery", desc: "ML-driven candidate screening, structure prediction and assay optimisation." },
  { title: "Bioprocess Engineering", desc: "From shake-flask to pilot scale — fermentation, downstream and analytics." },
  { title: "Translational Research", desc: "Bridging discovery and clinical / field utility with rigorous validation." },
];

const PIPELINE = [
  { stage: "Discovery", desc: "Target identification, screening, lead generation.", color: "#5AC8FF" },
  { stage: "Development", desc: "Optimisation, preclinical validation, scale-up.", color: "#0B6A4D" },
  { stage: "Translation", desc: "Clinical, regulatory and field studies.", color: "#3EE6A8" },
  { stage: "Commercial", desc: "Manufacturing, distribution, deployment.", color: "#B8E8C8" },
];

export default function RnD() {
  return (
    <PageShell
      eyebrow="Research & Development"
      title="The engine that powers every Indibiotek division."
      intro="Our R&D platform brings together molecular biology, computation and engineering — operating across the full path from hypothesis to product."
      heroImage="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?"
    >
      <section className="px-5 sm:px-8 md:px-16 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Focus Areas" title="Four core capabilities." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FOCUS.map((f) => (
              <GlassCard key={f.title} style={{ padding: 28 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 12 }}>
                  {f.title}
                </h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 15, lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-16 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Pipeline" title="From idea to impact." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {PIPELINE.map((p, i) => (
              <GlassCard key={p.stage} style={{ padding: 24 }} className="page-reveal">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
                  <span style={{ color: p.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 8 }}>{p.stage}</h3>
                <p style={{ color: "rgba(14,42,28,0.62)", fontSize: 13.5, lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
