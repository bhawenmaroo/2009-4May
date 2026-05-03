import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const PROGRAMS = [
  { title: "Biofertilizers", desc: "Microbial consortia that improve soil health and nutrient uptake — reducing chemical inputs." },
  { title: "Biopesticides", desc: "Targeted, low-residue crop protection from beneficial microbes and natural compounds." },
  { title: "Crop Biotechnology", desc: "Trait development for yield, resilience and nutrition in cereals, pulses and horticulture." },
  { title: "Soil Health Diagnostics", desc: "Field-grade testing platforms that translate biology into actionable agronomy." },
  { title: "Precision Farming", desc: "Decision-support tools combining sensing, climate data and crop biology." },
  { title: "Farmer Programs", desc: "Distribution, training and advisory networks reaching smallholders at scale." },
];

export default function Agri() {
  return (
    <PageShell
      eyebrow="Agri Division"
      title="Biology that grows with the planet."
      intro="Our agricultural biotechnology division develops products and platforms that help farmers grow more food with fewer chemicals, less water and healthier soils."
      heroImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?"
      logo="/divisions/agri.png"
    >
      <section className="px-5 sm:px-8 md:px-16 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Programs" title="Solutions for soil, crop and farmer." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p) => (
              <GlassCard key={p.title} style={{ padding: 28 }} className="page-reveal">
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 10 }}>
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
