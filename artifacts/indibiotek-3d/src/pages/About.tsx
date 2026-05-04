import { PageShell, GlassCard, SectionHeading } from "@/components/PageShell";
import { Tilt3D } from "@/components/Tilt3D";

const VALUES = [
  { title: "Integrity", desc: "Transparent, ethical conduct in every collaboration and discovery." },
  { title: "Innovation", desc: "We invest in basic and applied research that creates new categories." },
  { title: "Impact", desc: "Science that reaches farmers, patients and communities — at real scale." },
  { title: "Inclusion", desc: "Diverse minds collaborating to solve problems that affect everyone." },
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
    role: "Chief Scientific Officer",
    photo: "/team/pritam-biswas.png",
  },
  {
    name: "Mr. Bhawen Maroo",
    role: "Chief Marketing Officer",
    photo: "/team/bhawen-maroo.png",
  },
  {
    name: "Mr. Debjeet Saha",
    role: "International Business Head",
    photo: "/team/debjeet-saha.png",
  },
];

const ADVISORS: Person[] = [
  {
    name: "Mr. Ajjay Manohar Sharma",
    role: "Director",
    org: "Zenith Transformers & Switchgears Pvt. Ltd.",
    photo: "/team/ajjay-manohar-sharma.png",
  },
  {
    name: "Prof. V. Samuel Raj",
    role: "Registrar & Dean Academic Affairs & Director",
    org: "Department of Microbiology & Biotechnology, SRM University, Delhi-NCR, Sonipat",
    photo: "/team/v-samuel-raj.png",
  },
  {
    name: "Dr. Shounak Roy",
    role: "Scientist (PDR)",
    org: "Department of Biomedical Engineering, Texas A&M University, USA",
    photo: "/team/shounak-roy.png",
  },
  {
    name: "Mr. Akhilesh Kumar",
    role: "Advocate & Legal Consultant",
    org: "High Court",
    photo: "/team/akhilesh-kumar.png",
  },
  {
    name: "Dr. Rajendra Kumar Dubey",
    role: "Regulatory and Compliance",
    org: "Biocon — QA & QC Head",
    photo: "/team/rajendra-kumar-dubey.png",
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

function LeaderCard({ p }: { p: Person }) {
  return (
    <div
      className="page-reveal"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(14,42,28,0.08)",
        borderRadius: 16,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 14px 34px rgba(14,42,28,0.10)",
        position: "relative",
      }}
      data-testid={`person-${p.name.toLowerCase().replace(/[^a-z]/g, "")}`}
    >
      {/* Tall portrait photo — no dark overlay, faces stay clear */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          background: p.photo
            ? `url("${p.photo}") center 15% / cover no-repeat`
            : `linear-gradient(135deg, ${ACCENT_BRIGHT} 0%, ${ACCENT} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontFamily: "var(--app-font-display, 'Outfit', sans-serif)",
          fontWeight: 600,
          fontSize: 56,
          letterSpacing: "0.02em",
          position: "relative",
          borderBottom: "1px solid rgba(14,42,28,0.06)",
        }}
      >
        {!p.photo && initialsOf(p.name)}
      </div>

      {/* Body — center aligned */}
      <div
        style={{
          padding: "22px 22px 26px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 28,
            height: 2,
            background: ACCENT,
            boxShadow: `0 0 10px rgba(20,181,126,0.65), 0 0 4px rgba(11,106,77,0.9)`,
            marginBottom: 14,
            borderRadius: 2,
          }}
        />
        <h4
          className="font-display"
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: TEXT_DARK,
            letterSpacing: "-0.01em",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          {p.name}
        </h4>
        <p
          style={{
            color: ACCENT,
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.45,
          }}
        >
          {p.role}
        </p>
      </div>
    </div>
  );
}

function PersonCard({ p }: { p: Person }) {
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

      {/* Dark-green glowing hyphen */}
      <div
        style={{
          width: 24, height: 2, borderRadius: 2,
          background: ACCENT,
          boxShadow: `0 0 10px rgba(20,181,126,0.65), 0 0 4px rgba(11,106,77,0.9)`,
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
      {/* ─── CREDENTIALS & RECOGNITION ─── */}
      <section className="px-5 sm:px-8 md:px-16 py-14 sm:py-20">
        <div
          className="max-w-6xl mx-auto relative overflow-hidden page-reveal"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(244,248,245,0.85) 100%)",
            border: "1px solid rgba(11,106,77,0.16)",
            borderRadius: 24,
            padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 56px)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.9) inset, 0 22px 50px -22px rgba(11,106,77,0.20), 0 4px 14px rgba(14,42,28,0.04)",
          }}
        >
          {/* Accent corner glows */}
          <div
            aria-hidden
            style={{
              position: "absolute", top: -80, left: -80, width: 260, height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(20,181,126,0.18) 0%, rgba(20,181,126,0) 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: -100, right: -80, width: 300, height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,255,77,0.18) 0%, rgba(200,255,77,0) 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="text-center relative" style={{ marginBottom: 48 }}>
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
              — 01 / Credentials & Recognition
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
              Recognised by the Government of India.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              {
                src: "/affiliations/startup-india.png",
                title: "Startup India",
                caption: "Recognised by the Department for Promotion of Industry and Internal Trade, Ministry of Commerce and Industry.",
              },
              {
                src: "/affiliations/msme.png",
                title: "MSME Registered",
                caption: "Ministry of Micro, Small & Medium Enterprises — Government of India.",
              },
              {
                src: "/affiliations/make-in-india.png",
                title: "Make in India",
                caption: "Aligned with the national initiative to design, develop and manufacture biotechnology in India.",
              },
            ].map((a) => (
              <div
                key={a.src}
                className="page-reveal"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(14,42,28,0.08)",
                  borderRadius: 18,
                  padding: 28,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 8px 24px rgba(14,42,28,0.06)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 10",
                    maxHeight: 200,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 22,
                    padding: "0 4px",
                  }}
                >
                  <img
                    src={a.src}
                    alt={a.title}
                    style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", objectFit: "contain" }}
                  />
                </div>
                <h4
                  className="font-display"
                  style={{ fontSize: "1.1rem", fontWeight: 700, color: TEXT_DARK, marginBottom: 8, letterSpacing: "-0.01em" }}
                >
                  {a.title}
                </h4>
                <p style={{ color: TEXT_BODY, fontSize: 13, lineHeight: 1.6, fontWeight: 400 }}>
                  {a.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM ─── */}
      <section className="px-5 sm:px-8 md:px-16 py-14 sm:py-20" style={{ background: "rgba(20,181,126,0.04)" }}>
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
            {LEADERSHIP.map((p) => (
              <LeaderCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOARD OF ADVISORS ─── */}
      <section className="px-5 sm:px-8 md:px-16 py-14 sm:py-20">
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
            {ADVISORS.map((p) => (
              <PersonCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-16 py-12 sm:py-16" style={{ background: "rgba(20,181,126,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Our Values" title="What guides every decision." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <Tilt3D key={v.title} max={8} scale={1.015}>
                <GlassCard style={{ padding: 26, height: "100%" }}>
                  <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "#0E2A1C", marginBottom: 10 }}>
                    {v.title}
                  </h3>
                  <p style={{ color: "rgba(14,42,28,0.65)", fontSize: 14, lineHeight: 1.65, fontWeight: 300 }}>{v.desc}</p>
                </GlassCard>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
