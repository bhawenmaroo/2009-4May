import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard, SectionHeading } from "@/components/PageShell";

gsap.registerPlugin(ScrollTrigger);

const DIVISIONS = [
  {
    title: "Lifesciences",
    desc: "Drug discovery, biopharmaceutical development and translational research.",
    href: "/lifesciences",
    icon: "Lf",
  },
  {
    title: "Agriculture",
    desc: "Crop biotechnology, biofertilizers and sustainable precision farming.",
    href: "/agri",
    icon: "Ag",
  },
  {
    title: "Healthcare",
    desc: "Diagnostics, therapeutics and patient-centred biomedical solutions.",
    href: "/services",
    icon: "Hc",
  },
  {
    title: "Waste Management",
    desc: "Bioremediation and circular bio-based environmental solutions.",
    href: "/services",
    icon: "Wm",
  },
  {
    title: "Scientific Services",
    desc: "Analytical testing, contract research and laboratory services.",
    href: "/scientific",
    icon: "Sc",
  },
  {
    title: "R&D",
    desc: "Cross-disciplinary research labs driving every Indibiotek division.",
    href: "/rnd",
    icon: "Rd",
  },
];

const PILLARS = [
  { num: "01", title: "Science First", desc: "Rigorous scientific method underpins every product, paper and partnership." },
  { num: "02", title: "Built for Scale", desc: "From bench to bioreactor — engineered to translate discovery into impact." },
  { num: "03", title: "Sustainably Designed", desc: "Solutions that respect biology and the planet across their full lifecycle." },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, root.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* HERO */}
      <section className="relative h-screen flex items-center px-8 md:px-16">
        <div className="max-w-5xl">
          <div
            className="reveal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7AFFD4",
              marginBottom: 22,
            }}
          >
            <span style={{ width: 28, height: 1, background: "#7AFFD4" }} />
            Indibiotek Private Limited
          </div>

          <h1
            className="reveal font-display"
            style={{
              fontSize: "clamp(2.2rem, 5.6vw, 5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 28,
              maxWidth: "18ch",
              textShadow: "0 0 50px rgba(62,230,168,0.18)",
            }}
            data-testid="hero-headline"
          >
            Solutions in{" "}
            <span
              style={{
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundImage:
                  "linear-gradient(135deg, #3EE6A8 0%, #7AFFD4 50%, #5AC8FF 100%)",
              }}
            >
              Lifesciences, Biotechnology, Agriculture, Healthcare
            </span>{" "}
            &amp; Waste Management
          </h1>

          <p
            className="reveal"
            style={{
              color: "rgba(232,245,238,0.70)",
              fontSize: "1.1rem",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: 580,
              marginBottom: 36,
            }}
          >
            Indibiotek is a science-driven biotechnology company building integrated solutions across the lifesciences and agri value chain — from discovery and development to scaled, sustainable delivery.
          </p>

          <div className="reveal flex flex-wrap gap-4">
            <Link href="/about" data-testid="button-explore-divisions">
              <span
                className="cursor-pointer"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #3EE6A8, #5AC8FF)",
                  color: "#03130A",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.02em",
                  boxShadow: "0 8px 28px rgba(62,230,168,0.30)",
                }}
              >
                Explore Divisions →
              </span>
            </Link>
            <Link href="/contact" data-testid="button-contact-hero">
              <span
                className="cursor-pointer"
                style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(122,255,212,0.30)",
                  color: "#E8F5EE",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.02em",
                  backdropFilter: "blur(8px)",
                }}
              >
                Contact Us
              </span>
            </Link>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(122,255,212,0.5)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="relative px-8 md:px-16 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Who We Are" title="A multi-disciplinary biotech enterprise." />
            </div>
            <div className="lg:col-span-7 reveal">
              <p
                style={{
                  color: "rgba(232,245,238,0.78)",
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: 18,
                }}
              >
                Headquartered in India, Indibiotek brings together scientists, engineers and industry experts to translate biology into practical, scalable products and services for global markets.
              </p>
              <p
                style={{
                  color: "rgba(232,245,238,0.55)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Our integrated platform spans research, manufacturing and field deployment — enabling us to address complex problems in human and plant health, sustainability and circular economies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="relative px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Our Divisions" title="Six pillars, one integrated company." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIVISIONS.map((d) => (
              <Link key={d.title} href={d.href} data-testid={`card-division-${d.title.toLowerCase().replace(/\s/g, "")}`}>
                <div className="reveal cursor-pointer group" style={{ height: "100%" }}>
                  <GlassCard
                    className="transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ padding: 28, height: "100%" }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, rgba(62,230,168,0.20), rgba(90,200,255,0.10))",
                        border: "1px solid rgba(122,255,212,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7AFFD4",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.05em",
                        marginBottom: 22,
                      }}
                    >
                      {d.icon}
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 10,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {d.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(232,245,238,0.62)",
                        fontSize: "0.95rem",
                        lineHeight: 1.65,
                        fontWeight: 300,
                        marginBottom: 18,
                      }}
                    >
                      {d.desc}
                    </p>
                    <span
                      style={{
                        color: "#7AFFD4",
                        fontSize: 12.5,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Explore →
                    </span>
                  </GlassCard>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative px-8 md:px-16 py-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Our Approach" title="Built on three pillars." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <div key={p.num} className="reveal">
                <GlassCard style={{ padding: 28, height: "100%" }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "#5AC8FF",
                      marginBottom: 12,
                    }}
                  >
                    {p.num}
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 10,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(232,245,238,0.62)",
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      fontWeight: 300,
                    }}
                  >
                    {p.desc}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-8 md:px-16 py-24">
        <div className="max-w-4xl mx-auto reveal">
          <GlassCard style={{ padding: "56px 44px", textAlign: "center" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.1,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
                letterSpacing: "-0.015em",
              }}
            >
              Build the next generation of biology with us.
            </h2>
            <p
              style={{
                color: "rgba(232,245,238,0.65)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: 520,
                margin: "0 auto 30px",
              }}
            >
              Investors, researchers and industry partners — connect with our team to explore collaborations.
            </p>
            <Link href="/contact">
              <span
                className="cursor-pointer"
                style={{
                  display: "inline-block",
                  padding: "14px 30px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #3EE6A8, #5AC8FF)",
                  color: "#03130A",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.02em",
                  boxShadow: "0 8px 28px rgba(62,230,168,0.30)",
                }}
                data-testid="button-cta-contact"
              >
                Get in Touch →
              </span>
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
