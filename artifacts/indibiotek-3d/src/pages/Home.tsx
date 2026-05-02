import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard, SectionHeading } from "@/components/PageShell";
import { CssMolecule } from "@/components/CssMolecule";
import { Tilt3D } from "@/components/Tilt3D";
import { useParallax } from "@/hooks/useParallax";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=2000&q=80&auto=format&fit=crop";
const LAB_IMG =
  "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1600&q=80&auto=format&fit=crop";
const FIELD_IMG =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop";
const SPROUT_IMG =
  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80&auto=format&fit=crop";
const PIPETTE_IMG =
  "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80&auto=format&fit=crop";

const DIVISIONS = [
  { title: "Lifesciences", desc: "Drug discovery, biopharmaceutical development and translational research.", href: "/lifesciences", num: "01" },
  { title: "Agriculture",  desc: "Crop biotechnology, biofertilizers and sustainable precision farming.",     href: "/agri",          num: "02" },
  { title: "Healthcare",   desc: "Diagnostics, therapeutics and patient-centred biomedical solutions.",       href: "/services",      num: "03" },
  { title: "Waste Management", desc: "Bioremediation and circular bio-based environmental solutions.",       href: "/services",      num: "04" },
  { title: "Scientific Services", desc: "Analytical testing, contract research and laboratory services.",   href: "/scientific",    num: "05" },
  { title: "R&D",          desc: "Cross-disciplinary research labs driving every Indibiotek division.",      href: "/rnd",           num: "06" },
];

const STATS = [
  { num: "15+",  label: "Active research pipelines" },
  { num: "120+", label: "Scientists & engineers" },
  { num: "20+",  label: "Industry partners" },
  { num: "6",    label: "Operating divisions" },
];

const PILLARS = [
  { num: "01", title: "Science First",       desc: "Rigorous scientific method underpins every product, paper and partnership." },
  { num: "02", title: "Built for Scale",     desc: "From bench to bioreactor — engineered to translate discovery into impact." },
  { num: "03", title: "Sustainably Designed",desc: "Solutions that respect biology and the planet across their full lifecycle." },
];

const TEXT_DARK    = "#0E2A1C";
const TEXT_BODY    = "rgba(14,42,28,0.72)";
const TEXT_MUTED   = "rgba(14,42,28,0.55)";
const ACCENT       = "#0B6A4D";
const ACCENT_BRIGHT= "#14B57E";
const BG           = "#F4F8F5";
const BG_ALT       = "#ECF3EE";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const heroBg = useParallax<HTMLDivElement>(0.18);
  const labParallax = useParallax<HTMLDivElement>(0.10);
  const fieldParallax = useParallax<HTMLDivElement>(0.10);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } },
        );
      });
    }, root.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* ─── HERO with CSS 3D molecule ─── */}
      <section className="relative min-h-[100vh] flex items-end px-6 md:px-12 pb-20 pt-40 overflow-hidden">
        {/* Parallax background image with strong WHITE wash */}
        <div
          ref={heroBg}
          className="absolute inset-0 -top-20 -bottom-20"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(244,248,245,0.78) 0%, rgba(244,248,245,0.85) 50%, rgba(244,248,245,1) 100%), url("${HERO_IMG}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        {/* Soft mint vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(20,181,126,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(90,200,255,0.10) 0%, transparent 60%)",
          }}
        />

        {/* CSS 3D molecule */}
        <div
          className="hidden md:block absolute pointer-events-none"
          style={{ right: "-60px", top: "10%", width: 560, height: 560 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle, rgba(20,181,126,0.20), rgba(20,181,126,0) 60%)",
              filter: "blur(40px)",
              animation: "pulse-glow 6s ease-in-out infinite",
            }}
          />
          <CssMolecule size={520} nodeCount={28} className="absolute inset-0 m-auto" />
          <div
            className="absolute"
            style={{
              left: "50%", top: "50%",
              width: 480, height: 480, marginLeft: -240, marginTop: -240,
              borderRadius: "50%",
              border: "1px solid rgba(11,106,77,0.18)",
              transformStyle: "preserve-3d",
              animation: "orbit-ring 18s linear infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "50%", top: "50%",
              width: 360, height: 360, marginLeft: -180, marginTop: -180,
              borderRadius: "50%",
              border: "1px solid rgba(20,181,126,0.22)",
              transformStyle: "preserve-3d",
              animation: "orbit-ring-rev 24s linear infinite",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full" style={{ zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div
                className="reveal"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: ACCENT, marginBottom: 24,
                }}
              >
                <span style={{ width: 28, height: 1, background: ACCENT }} />
                Indibiotek Private Limited
              </div>

              <h1
                className="reveal font-display"
                data-testid="hero-headline"
                style={{
                  fontSize: "clamp(1.9rem, 4.4vw, 3.6rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                  color: TEXT_DARK,
                  marginBottom: 22,
                  maxWidth: "18ch",
                }}
              >
                Solutions in <span style={{ color: ACCENT_BRIGHT }}>Lifesciences</span>, Biotechnology, <span style={{ color: ACCENT_BRIGHT }}>Agriculture</span>, Healthcare &amp; Waste Management.
              </h1>

              <p
                className="reveal"
                style={{
                  color: TEXT_BODY,
                  fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400,
                  maxWidth: 520, marginBottom: 36,
                }}
              >
                A science-driven biotechnology company building integrated solutions across the lifesciences and agri value chain — from discovery to scaled, sustainable delivery.
              </p>

              <div className="reveal flex flex-wrap gap-4">
                <Link href="/about" data-testid="button-explore-divisions">
                  <span
                    className="cursor-pointer inline-block"
                    style={{
                      padding: "14px 28px", borderRadius: 999,
                      background: `linear-gradient(135deg, ${ACCENT_BRIGHT}, ${ACCENT})`,
                      color: "#FFFFFF", fontWeight: 700, fontSize: 14, letterSpacing: "0.02em",
                      boxShadow: "0 10px 30px rgba(20,181,126,0.30)",
                      transform: "translateZ(0)",
                    }}
                  >
                    Explore Divisions →
                  </span>
                </Link>
                <Link href="/contact" data-testid="button-contact-hero">
                  <span
                    className="cursor-pointer inline-block"
                    style={{
                      padding: "14px 28px", borderRadius: 999,
                      background: "#FFFFFF",
                      border: "1px solid rgba(20,181,126,0.30)",
                      color: ACCENT, fontWeight: 600, fontSize: 14,
                      letterSpacing: "0.02em",
                      boxShadow: "0 4px 12px rgba(11,106,77,0.06)",
                    }}
                  >
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 reveal hidden lg:block">
              <Tilt3D max={8} testId="card-stats">
                <GlassCard style={{ padding: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: ACCENT, marginBottom: 14 }}>
                    AT A GLANCE
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                    {STATS.map((s) => (
                      <div key={s.label}>
                        <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: TEXT_DARK, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                        <div style={{ fontSize: 11.5, color: TEXT_MUTED, lineHeight: 1.4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Tilt3D>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ─── */}
      <section className="relative px-6 md:px-12 py-24" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Who We Are" title="A multi-disciplinary biotech enterprise." />
            </div>
            <div className="lg:col-span-7 reveal">
              <p style={{ color: TEXT_BODY, fontSize: "1.15rem", lineHeight: 1.8, fontWeight: 400, marginBottom: 18 }}>
                Headquartered in India, Indibiotek brings together scientists, engineers and industry experts to translate biology into practical, scalable products and services for global markets.
              </p>
              <p style={{ color: TEXT_MUTED, fontSize: "1rem", lineHeight: 1.8, fontWeight: 400 }}>
                Our integrated platform spans research, manufacturing and field deployment — enabling us to address complex problems in human and plant health, sustainability and circular economies.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label} style={{ borderLeft: `2px solid ${ACCENT_BRIGHT}`, paddingLeft: 16 }}>
                    <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: ACCENT, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                    <div style={{ fontSize: 12, color: TEXT_MUTED, lineHeight: 1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVISIONS — 3D tilted cards on light bg ─── */}
      <section className="relative px-6 md:px-12 py-24" style={{ background: BG_ALT }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <SectionHeading eyebrow="Our Divisions" title="Six pillars, one integrated company." />
            <Link href="/about">
              <span className="cursor-pointer" style={{ color: ACCENT, fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>
                View all →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISIONS.map((d) => (
              <Link key={d.title} href={d.href} data-testid={`card-division-${d.title.toLowerCase().replace(/\s/g, "")}`}>
                <Tilt3D max={12} scale={1.02}>
                  <div
                    className="reveal cursor-pointer relative overflow-hidden"
                    style={{
                      padding: 32, height: "100%", minHeight: 240, borderRadius: 18,
                      background: "#FFFFFF",
                      border: "1px solid rgba(20,181,126,0.16)",
                      boxShadow:
                        "0 16px 40px rgba(11,106,77,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: -60, right: -60, width: 200, height: 200,
                      borderRadius: "50%", pointerEvents: "none",
                      background: "radial-gradient(circle, rgba(20,181,126,0.10), transparent 70%)",
                    }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, position: "relative" }}>
                      <div className="font-display" style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.18em" }}>
                        {d.num}
                      </div>
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: `radial-gradient(circle at 30% 30%, #6FE7B5, ${ACCENT_BRIGHT})`,
                        boxShadow: `0 0 12px ${ACCENT_BRIGHT}, 0 0 4px rgba(255,255,255,0.6) inset`,
                      }} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 600, color: TEXT_DARK, marginBottom: 12, letterSpacing: "-0.01em", position: "relative" }}>
                      {d.title}
                    </h3>
                    <p style={{ color: TEXT_BODY, fontSize: 14.5, lineHeight: 1.7, fontWeight: 400, marginBottom: 24, minHeight: 60, position: "relative" }}>
                      {d.desc}
                    </p>
                    <span style={{ color: ACCENT, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em", position: "relative" }}>
                      Explore →
                    </span>
                  </div>
                </Tilt3D>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED — INSIDE OUR LABS / FROM LAB TO FIELD ─── */}
      <section className="relative px-6 md:px-12 py-24" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Tilt3D max={6} scale={1.01}>
            <div
              className="reveal relative overflow-hidden"
              style={{
                borderRadius: 20, minHeight: 460,
                border: "1px solid rgba(20,181,126,0.16)",
                boxShadow: "0 24px 60px rgba(11,106,77,0.15)",
              }}
            >
              <div
                ref={labParallax}
                className="absolute -inset-y-12 inset-x-0"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(3,19,10,0.10) 0%, rgba(3,19,10,0.85) 100%), url("${LAB_IMG}")`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  willChange: "transform",
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 36 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: "#7AFFD4", marginBottom: 12 }}>
                  INSIDE OUR LABS
                </div>
                <h3 className="font-display" style={{ fontSize: "1.7rem", fontWeight: 600, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                  Modern facilities, rigorous science.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.65, fontWeight: 300, maxWidth: 420, marginBottom: 20 }}>
                  State-of-the-art laboratories spanning molecular biology, chemistry, fermentation and analytics.
                </p>
                <Link href="/rnd">
                  <span className="cursor-pointer" style={{ color: "#7AFFD4", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>
                    Tour our R&amp;D →
                  </span>
                </Link>
              </div>
            </div>
          </Tilt3D>

          <Tilt3D max={6} scale={1.01}>
            <div
              className="reveal relative overflow-hidden"
              style={{
                borderRadius: 20, minHeight: 460,
                border: "1px solid rgba(20,181,126,0.16)",
                boxShadow: "0 24px 60px rgba(11,106,77,0.15)",
              }}
            >
              <div
                ref={fieldParallax}
                className="absolute -inset-y-12 inset-x-0"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(3,19,10,0.10) 0%, rgba(3,19,10,0.85) 100%), url("${FIELD_IMG}")`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  willChange: "transform",
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 36 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: "#7AFFD4", marginBottom: 12 }}>
                  FROM LAB TO FIELD
                </div>
                <h3 className="font-display" style={{ fontSize: "1.7rem", fontWeight: 600, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                  Biology that reaches the soil.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14.5, lineHeight: 1.65, fontWeight: 300, maxWidth: 420, marginBottom: 20 }}>
                  Our agri division partners with farmers across India to deliver biological inputs at meaningful scale.
                </p>
                <Link href="/agri">
                  <span className="cursor-pointer" style={{ color: "#7AFFD4", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>
                    Explore Agri →
                  </span>
                </Link>
              </div>
            </div>
          </Tilt3D>
        </div>
      </section>

      {/* ─── PILLARS — 3D tilt ─── */}
      <section className="relative px-6 md:px-12 py-24" style={{ background: BG_ALT }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Our Approach" title="Built on three pillars." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <Tilt3D key={p.num} max={10} scale={1.02}>
                <div className="reveal" style={{
                  padding: 32, height: "100%", borderRadius: 18,
                  background: "#FFFFFF",
                  border: "1px solid rgba(20,181,126,0.16)",
                  boxShadow: "0 16px 40px rgba(11,106,77,0.10), inset 0 1px 0 rgba(255,255,255,1)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: -50, right: -50, width: 180, height: 180,
                    borderRadius: "50%", pointerEvents: "none",
                    background: "radial-gradient(circle, rgba(90,200,255,0.12), transparent 70%)",
                  }} />
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: ACCENT_BRIGHT, marginBottom: 18, position: "relative" }}>
                    {p.num}
                  </div>
                  <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: TEXT_DARK, marginBottom: 12, position: "relative" }}>
                    {p.title}
                  </h3>
                  <p style={{ color: TEXT_BODY, fontSize: 14.5, lineHeight: 1.7, fontWeight: 400, position: "relative" }}>
                    {p.desc}
                  </p>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE with floating molecules ─── */}
      <section className="relative px-6 md:px-12 py-24 overflow-hidden" style={{ background: BG }}>
        <div
          className="absolute pointer-events-none opacity-50"
          style={{ left: "-120px", top: "50%", transform: "translateY(-50%)", width: 360, height: 360 }}
        >
          <CssMolecule size={340} nodeCount={20} />
        </div>
        <div
          className="absolute pointer-events-none opacity-50"
          style={{ right: "-120px", top: "50%", transform: "translateY(-50%)", width: 360, height: 360 }}
        >
          <CssMolecule size={340} nodeCount={20} />
        </div>
        <div className="max-w-3xl mx-auto reveal text-center relative" style={{ zIndex: 2 }}>
          <div style={{ fontSize: 56, color: ACCENT_BRIGHT, lineHeight: 1, marginBottom: 12, fontFamily: "Georgia, serif" }}>“</div>
          <p
            className="font-display"
            style={{
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              lineHeight: 1.4,
              fontWeight: 400,
              color: TEXT_DARK,
              marginBottom: 24,
              letterSpacing: "-0.005em",
            }}
          >
            Biology is the most powerful manufacturing platform on Earth — Indibiotek exists to make it work for everyone.
          </p>
          <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Indibiotek Leadership
          </div>
        </div>
      </section>

      {/* ─── DUAL FEATURE — SCIENCE + AGRI ─── */}
      <section className="relative px-6 md:px-12 py-24" style={{ background: BG_ALT }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          <Tilt3D className="lg:col-span-5 reveal" max={8} scale={1.02}>
            <div style={{
              backgroundImage: `linear-gradient(135deg, rgba(3,19,10,0.10) 0%, rgba(3,19,10,0.30) 100%), url("${PIPETTE_IMG}")`,
              backgroundSize: "cover", backgroundPosition: "center",
              borderRadius: 20, minHeight: 380,
              border: "1px solid rgba(20,181,126,0.16)",
              boxShadow: "0 24px 60px rgba(11,106,77,0.15)",
            }} />
          </Tilt3D>
          <div className="lg:col-span-7 reveal">
            <SectionHeading eyebrow="Lifesciences" title="From molecule to medicine." />
            <p style={{ color: TEXT_BODY, fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 400, marginBottom: 24, maxWidth: 520 }}>
              Discovery, development and manufacturing of next-generation therapeutics, diagnostics and biopharmaceutical processes — built on rigorous science and modern manufacturing.
            </p>
            <Link href="/lifesciences">
              <span className="cursor-pointer inline-block" style={{
                padding: "12px 24px", borderRadius: 999,
                border: `1px solid ${ACCENT}`, color: ACCENT,
                fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                background: "#FFFFFF",
              }}>
                Explore Lifesciences →
              </span>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal lg:order-1 order-2">
            <SectionHeading eyebrow="Agriculture" title="Biology that grows with the planet." />
            <p style={{ color: TEXT_BODY, fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 400, marginBottom: 24, maxWidth: 520 }}>
              Biofertilizers, biopesticides and crop biotechnology that help farmers grow more food with fewer chemicals, less water and healthier soils.
            </p>
            <Link href="/agri">
              <span className="cursor-pointer inline-block" style={{
                padding: "12px 24px", borderRadius: 999,
                border: `1px solid ${ACCENT}`, color: ACCENT,
                fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                background: "#FFFFFF",
              }}>
                Explore Agri →
              </span>
            </Link>
          </div>
          <Tilt3D className="lg:col-span-5 reveal lg:order-2 order-1" max={8} scale={1.02}>
            <div style={{
              backgroundImage: `linear-gradient(135deg, rgba(3,19,10,0.10) 0%, rgba(3,19,10,0.30) 100%), url("${SPROUT_IMG}")`,
              backgroundSize: "cover", backgroundPosition: "center",
              borderRadius: 20, minHeight: 380,
              border: "1px solid rgba(20,181,126,0.16)",
              boxShadow: "0 24px 60px rgba(11,106,77,0.15)",
            }} />
          </Tilt3D>
        </div>
      </section>

      {/* ─── FINAL CTA — dark teal card on light bg ─── */}
      <section className="relative px-6 md:px-12 py-32 overflow-hidden" style={{ background: BG }}>
        <div
          className="absolute pointer-events-none"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 700, height: 700, opacity: 0.30 }}
        >
          <CssMolecule size={620} nodeCount={32} />
        </div>
        <Tilt3D className="max-w-5xl mx-auto reveal relative" max={5} scale={1.005} style={{ zIndex: 2 }}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 24, padding: "72px 48px", textAlign: "center",
              background: `linear-gradient(135deg, ${ACCENT_BRIGHT} 0%, ${ACCENT} 100%)`,
              border: "1px solid rgba(11,106,77,0.30)",
              boxShadow: "0 30px 80px rgba(11,106,77,0.30), inset 0 1px 0 rgba(255,255,255,0.20)",
            }}
          >
            <div style={{
              position: "absolute", top: -120, right: -80, width: 400, height: 400,
              borderRadius: "50%", pointerEvents: "none",
              background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)",
            }} />
            <div style={{
              position: "absolute", bottom: -120, left: -80, width: 360, height: 360,
              borderRadius: "50%", pointerEvents: "none",
              background: "radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)",
            }} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: "rgba(255,255,255,0.85)", marginBottom: 20, position: "relative" }}>
              PARTNER WITH US
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
                lineHeight: 1.15, fontWeight: 700, color: "#FFFFFF",
                marginBottom: 20, letterSpacing: "-0.015em", maxWidth: "20ch", margin: "0 auto 20px",
                position: "relative",
              }}
            >
              Build the next generation of biology with us.
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.88)", fontSize: "1.05rem", lineHeight: 1.7,
              fontWeight: 400, maxWidth: 520, margin: "0 auto 32px", position: "relative",
            }}>
              Investors, researchers and industry partners — connect with our team to explore collaborations.
            </p>
            <Link href="/contact">
              <span
                className="cursor-pointer inline-block"
                style={{
                  padding: "14px 30px", borderRadius: 999,
                  background: "#FFFFFF",
                  color: ACCENT, fontWeight: 700, fontSize: 14, letterSpacing: "0.02em",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                  position: "relative",
                }}
                data-testid="button-cta-contact"
              >
                Get in Touch →
              </span>
            </Link>
          </div>
        </Tilt3D>
      </section>
    </div>
  );
}
