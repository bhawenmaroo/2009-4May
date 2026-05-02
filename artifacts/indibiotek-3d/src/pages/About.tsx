import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const VALUES = [
  { title: "Integrity", desc: "Transparent, ethical conduct in every collaboration and discovery." },
  { title: "Innovation", desc: "We invest in basic and applied research that creates new categories." },
  { title: "Impact", desc: "Science that reaches farmers, patients and communities — at real scale." },
  { title: "Inclusion", desc: "Diverse minds collaborating to solve problems that affect everyone." },
];

const FACTS = [
  { num: "15+", label: "Active research pipelines" },
  { num: "6",   label: "Operating divisions" },
  { num: "120+", label: "Scientists & engineers" },
  { num: "20+", label: "Industry partners" },
];

export default function About() {
  return (
    <PageShell
      eyebrow="About Indibiotek"
      title="A biotech company built for India, designed for the world."
      intro="Indibiotek brings deep scientific capability and operational rigour together to build durable bio-based businesses across human health, agriculture and the environment."
      heroImage="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?"
    >
      <section className="px-8 md:px-16 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 page-reveal">
            <GlassCard style={{ padding: 36, height: "100%" }}>
              <SectionHeading eyebrow="Our Story" title="From laboratory to landscape." />
              <p style={{ color: "rgba(14,42,28,0.80)", fontSize: "1.05rem", lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>
                Founded by scientists and entrepreneurs with decades of combined experience across biotechnology, healthcare and agriculture, Indibiotek was created to bridge the gap between deep science and commercial viability.
              </p>
              <p style={{ color: "rgba(14,42,28,0.65)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>
                We believe biology is the most powerful manufacturing platform on Earth — one that can decarbonise industries, restore ecosystems, feed populations and heal diseases. Our work spans every step of that translation.
              </p>
            </GlassCard>
          </div>
          <div className="lg:col-span-5 page-reveal grid grid-cols-2 gap-4">
            {FACTS.map((f) => (
              <GlassCard key={f.label} style={{ padding: 24 }}>
                <div className="font-display" style={{ fontSize: "2rem", fontWeight: 700, color: "#0B6A4D", marginBottom: 6, letterSpacing: "-0.02em" }}>
                  {f.num}
                </div>
                <div style={{ color: "rgba(14,42,28,0.65)", fontSize: 13, lineHeight: 1.5 }}>{f.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Our Values" title="What guides every decision." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <GlassCard key={v.title} style={{ padding: 26 }}>
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#fff", marginBottom: 10 }}>
                  {v.title}
                </h3>
                <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 14, lineHeight: 1.65, fontWeight: 300 }}>{v.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
