import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";

const VALUES = [
  { title: "Integrity", desc: "Transparent, ethical conduct in every collaboration and discovery." },
  { title: "Innovation", desc: "We invest in basic and applied research that creates new categories." },
  { title: "Impact", desc: "Science that reaches farmers, patients and communities — at real scale." },
  { title: "Inclusion", desc: "Diverse minds collaborating to solve problems that affect everyone." },
];

const FACTS = [
  { num: "15+", label: "Active research pipelines" },
  { num: "3",   label: "Operating divisions" },
  { num: "120+", label: "Scientists & engineers" },
  { num: "20+", label: "Industry partners" },
];

type Person = {
  name: string;
  role: string;
  org?: string;
  photo?: string; // image path; if undefined, render initials avatar
};

const LEADERSHIP: Person[] = [
  {
    name: "Dr. Subhadeep Mukherjee",
    role: "Chief Operating Officer & Director",
    photo: "/team/subhadeep-mukherjee.png",
  },
  {
    name: "Dr. Pritam Biswas",
    role: "Chief Scientific Officer (R&D)",
    photo: "/team/pritam-biswas.png",
  },
  {
    name: "Mr. Bhawen Maroo",
    role: "Chief Marketing Officer — West & South Region",
  },
  {
    name: "Mr. Debjeet Saha",
    role: "International Business Head — Sales & Marketing Division",
  },
];

const ADVISORS: Person[] = [
  {
    name: "Mr. Ajjay Manohar Sharma",
    role: "Director",
    org: "Zenith Transformers & Switchgears Pvt. Ltd.",
  },
  {
    name: "Prof. V. Samuel Raj",
    role: "Registrar & Dean Academic Affairs & Director",
    org: "Department of Microbiology & Biotechnology, SRM University, Delhi-NCR, Sonipat",
  },
  {
    name: "Dr. Shounak Roy",
    role: "Scientist (PDR)",
    org: "Department of Biomedical Engineering, Texas A&M University, USA",
  },
  {
    name: "Mr. Akhilesh Kumar",
    role: "Advocate & Legal Consultant",
    org: "High Court",
  },
  {
    name: "Dr. Rajendra Kumar Dubey",
    role: "Regulatory and Compliance",
    org: "Biocon — QA & QC Head",
  },
  {
    name: "Dr. Subba Reddy",
    role: "Scientist",
  },
];

const ACCENT = "#0B6A4D";
const ACCENT_BRIGHT = "#14B57E";
const TEXT_DARK = "#0E2A1C";
const TEXT_BODY = "rgba(14,42,28,0.72)";
const LIME = "#C8FF4D";

function initialsOf(name: string) {
  // Strip honorifics like Dr. / Mr. / Prof. / Mrs.
  const cleaned = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, "");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

function PersonCard({ p, num }: { p: Person; num: string }) {
  return (
    <div
      className="page-reveal"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(14,42,28,0.08)",
        borderRadius: 18,
        padding: 26,
        boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 8px 24px rgba(14,42,28,0.06)",
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      data-testid={`person-${p.name.toLowerCase().replace(/[^a-z]/g, "")}`}
    >
      {/* Top-right index marker */}
      <div
        style={{
          position: "absolute",
          top: 14, right: 16,
          fontFamily: "Menlo, monospace",
          fontSize: 10.5,
          letterSpacing: "0.18em",
          color: ACCENT,
          fontWeight: 700,
        }}
      >
        — {num}
      </div>

      {/* Avatar */}
      <div
        style={{
          width: 132, height: 132, borderRadius: "50%",
          background: p.photo
            ? `url("${p.photo}") center 20% / cover no-repeat`
            : `linear-gradient(135deg, ${ACCENT_BRIGHT} 0%, ${ACCENT} 100%)`,
          border: "3px solid #FFFFFF",
          boxShadow: `0 0 0 1px rgba(20,181,126,0.30), 0 12px 28px rgba(14,42,28,0.18)`,
          marginTop: 6,
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontFamily: "var(--app-font-display, 'Outfit', sans-serif)",
          fontWeight: 600,
          fontSize: 36,
          letterSpacing: "0.02em",
        }}
      >
        {!p.photo && initialsOf(p.name)}
      </div>

      {/* Lime accent dot */}
      <div
        style={{
          width: 6, height: 6, borderRadius: "50%",
          background: LIME,
          boxShadow: `0 0 10px ${LIME}`,
          marginBottom: 14,
        }}
      />

      <h4
        className="font-display"
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: TEXT_DARK,
          letterSpacing: "-0.01em",
          marginBottom: 6,
          lineHeight: 1.25,
        }}
      >
        {p.name}
      </h4>
      <p
        style={{
          color: ACCENT,
          fontSize: 12.5,
          fontWeight: 600,
          lineHeight: 1.5,
          marginBottom: p.org ? 6 : 0,
        }}
      >
        {p.role}
      </p>
      {p.org && (
        <p
          style={{
            color: TEXT_BODY,
            fontSize: 12,
            lineHeight: 1.55,
            fontWeight: 400,
            maxWidth: 240,
          }}
        >
          {p.org}
        </p>
      )}
    </div>
  );
}

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

      {/* ─── LEADERSHIP TEAM ─── */}
      <section className="px-8 md:px-16 py-20" style={{ background: "rgba(20,181,126,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <div
              className="page-reveal"
              style={{
                fontFamily: "Menlo, monospace",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: LIME, boxShadow: `0 0 10px ${LIME}` }} />
              — 02 / Leadership
            </div>
            <h2
              className="page-reveal font-display"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: TEXT_DARK,
                maxWidth: "20ch",
                margin: "0 auto",
              }}
            >
              The team building Indibiotek.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEADERSHIP.map((p, i) => (
              <PersonCard key={p.name} p={p} num={String(i + 1).padStart(2, "0")} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOARD OF ADVISORS ─── */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <div
              className="page-reveal"
              style={{
                fontFamily: "Menlo, monospace",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: LIME, boxShadow: `0 0 10px ${LIME}` }} />
              — 03 / Board of Advisors
            </div>
            <h2
              className="page-reveal font-display"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: TEXT_DARK,
                maxWidth: "22ch",
                margin: "0 auto",
              }}
            >
              Guided by scientists, scholars and industry leaders.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVISORS.map((p, i) => (
              <PersonCard key={p.name} p={p} num={String(i + 1).padStart(2, "0")} />
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
                <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 10 }}>
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
