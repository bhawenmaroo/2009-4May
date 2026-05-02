import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const HEALTHCARE = [
  { title: "Diagnostic Platforms", desc: "Affordable, accurate molecular and immuno-diagnostic systems for clinical settings." },
  { title: "Therapeutic Development", desc: "Co-development of biologics and small molecules for unmet medical needs." },
  { title: "Hospital & Clinic Partnerships", desc: "Long-term collaborations enabling translational and outcomes research." },
];

const WASTE = [
  { title: "Bioremediation", desc: "Microbial systems for soil and water remediation in industrial and municipal contexts." },
  { title: "Organic Waste-to-Value", desc: "Conversion of agricultural and food waste into bio-based fertilisers and feedstocks." },
  { title: "Circular Bioeconomy", desc: "Designing closed-loop processes that minimise waste and maximise resource recovery." },
];

export default function Services() {
  return (
    <PageShell
      eyebrow="Healthcare & Waste Management"
      title="Applied biology for human and planetary health."
      intro="Beyond discovery, we design and deliver services that improve clinical outcomes and restore environmental balance — at industrial scale."
      heroImage="https://images.unsplash.com/photo-1559757175-5700dde675bc?"
    >
      <section className="px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Healthcare" title="Better diagnostics. Better therapies." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {HEALTHCARE.map((s) => (
              <GlassCard key={s.title} style={{ padding: 28 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 14.5, lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
              </GlassCard>
            ))}
          </div>

          <SectionHeading eyebrow="Waste Management" title="Closing the loop with biology." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WASTE.map((s) => (
              <GlassCard key={s.title} style={{ padding: 28 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 14.5, lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
