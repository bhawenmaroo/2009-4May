import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tilt3D } from "@/components/Tilt3D";
import { useParallax } from "@/hooks/useParallax";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=2400&q=85&auto=format&fit=crop";
const LAB_IMG =
  "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1800&q=85&auto=format&fit=crop";
const FIELD_IMG =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85&auto=format&fit=crop";
const SPROUT_IMG =
  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1400&q=85&auto=format&fit=crop";
const PIPETTE_IMG =
  "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1400&q=85&auto=format&fit=crop";

const DIVISIONS = [
  { title: "Lifesciences",          desc: "Drug discovery, biopharmaceutical development and translational research.", href: "/lifesciences", num: "01", logo: "/divisions/lifesciences.png" },
  { title: "Scientific Services",   desc: "Analytical testing, contract research and laboratory services.",            href: "/scientific",    num: "02", logo: "/divisions/scientific.png" },
  { title: "Agriculture",           desc: "Crop biotechnology, biofertilizers and sustainable precision farming.",     href: "/agri",          num: "03", logo: "/divisions/agri.png" },
];

const PILLARS = [
  { num: "01", title: "Science First",        desc: "Rigorous scientific method underpins every product, paper and partnership." },
  { num: "02", title: "Built for Scale",      desc: "From bench to bioreactor — engineered to translate discovery into impact." },
  { num: "03", title: "Sustainably Designed", desc: "Solutions that respect biology and the planet across their full lifecycle." },
];

const TEXT_DARK    = "#0E2A1C";
const TEXT_BODY    = "rgba(14,42,28,0.72)";
const TEXT_MUTED   = "rgba(14,42,28,0.55)";
const ACCENT       = "#0B6A4D";
const ACCENT_BRIGHT= "#14B57E";
const LIME         = "#C8FF4D";
const BG           = "#F4F8F5";
const BG_ALT       = "#ECF3EE";
const DARK_BG      = "#0E1C14";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const heroBg = useParallax<HTMLDivElement>(0.20);
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
      {/* ─── CINEMATIC HERO — single full-bleed photo, navbar floats over it, no text on top ─── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: 560, maxHeight: 980, background: DARK_BG }}
      >
        <div
          ref={heroBg}
          className="absolute inset-0"
          style={{
            top: -80,
            backgroundImage: `url("${HERO_IMG}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            filter: "blur(6px)",
            transform: "scale(1.06)",
          }}
        />
        {/* Subtle warm-to-cool gradient over photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,28,20,0.45) 0%, rgba(14,28,20,0.25) 30%, rgba(14,28,20,0.30) 60%, rgba(244,248,245,0.88) 92%, rgba(244,248,245,1) 100%)",
          }}
        />
        {/* MAIN SOLUTIONS headline overlaid on the photo */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-5 sm:px-6"
          style={{ zIndex: 2 }}
        >
          <div
            className="reveal"
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 12,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: LIME,
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: LIME, boxShadow: `0 0 14px ${LIME}` }} />
            Indibiotek Private Limited
          </div>
          <h1
            className="reveal font-display text-center"
            data-testid="hero-headline"
            style={{
              fontSize: "clamp(1.9rem, 6.4vw, 6rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              color: "#FFFFFF",
              textShadow: "0 8px 40px rgba(0,0,0,0.55)",
              maxWidth: "18ch",
            }}
          >
            Solutions in <span style={{ fontStyle: "italic", color: LIME }}>lifesciences</span>, biotechnology, <span style={{ fontStyle: "italic", color: LIME }}>agriculture</span> &amp; healthcare.
          </h1>
          <div
            className="reveal text-center"
            style={{
              marginTop: 22,
              color: "rgba(255,255,255,0.88)",
              fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
              lineHeight: 1.6,
              maxWidth: 580,
              fontWeight: 400,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            A science-driven biotechnology company building integrated solutions across the lifesciences and agri value chain — from molecular discovery to scaled, sustainable delivery.
          </div>
        </div>
        {/* Bottom-left attribution / caption */}
        <div
          className="absolute"
          style={{
            left: 20, bottom: 28,
            color: "rgba(255,255,255,0.78)",
            fontSize: 10.5,
            letterSpacing: "0.20em",
            fontFamily: "Menlo, monospace",
            textTransform: "uppercase",
            zIndex: 2,
            maxWidth: "calc(100% - 40px)",
          }}
        >
          <div style={{ marginBottom: 4, color: LIME }}>● Live R&amp;D</div>
          Bench → Bioreactor → Field
        </div>
        {/* Bottom-right scroll cue */}
        <div
          className="absolute hidden md:block"
          style={{
            right: 32, bottom: 64,
            color: "rgba(255,255,255,0.78)",
            fontSize: 11,
            letterSpacing: "0.20em",
            fontFamily: "Menlo, monospace",
            textTransform: "uppercase",
            textAlign: "right",
            zIndex: 2,
          }}
        >
          Scroll<br/>
          <span style={{ color: LIME, fontSize: 18, lineHeight: 1 }}>↓</span>
        </div>
      </section>

      {/* ─── HUGE TYPOGRAPHIC STATEMENT — Terminal-style ─── */}
      <section
        className="relative px-5 sm:px-6 md:px-12"
        style={{ background: BG, paddingTop: "clamp(60px, 10vw, 120px)", paddingBottom: 32 }}
      >
        <div className="max-w-[1180px] mx-auto">
          {/* Prominent brand lockup */}
          <div
            className="reveal"
            style={{
              marginBottom: 44,
              display: "flex",
              alignItems: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <img
              src="/logo.png"
              alt="Indibiotek — Biotech Solutions for People and Planet"
              data-testid="img-brand-logo"
              style={{
                height: "clamp(72px, 11vw, 132px)",
                width: "auto",
                display: "block",
                filter: "drop-shadow(0 8px 24px rgba(11,106,77,0.18))",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingLeft: 24,
                borderLeft: "1px solid rgba(14,42,28,0.16)",
                fontFamily: "Menlo, monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: LIME, boxShadow: `0 0 12px ${LIME}`,
                }}
              />
              Indibiotek Private Limited<br/>est. India
            </div>
          </div>
          <h2
            className="reveal font-display"
            data-testid="hero-secondary-headline"
            style={{
              fontSize: "clamp(2.2rem, 5.4vw, 5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              color: TEXT_DARK,
              marginBottom: 40,
              maxWidth: "18ch",
            }}
          >
            Biotech solutions for <span style={{ color: ACCENT_BRIGHT, fontStyle: "italic" }}>people</span> and <span style={{ color: ACCENT_BRIGHT, fontStyle: "italic" }}>planet</span>.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p
              className="reveal lg:col-span-7"
              style={{
                color: TEXT_BODY,
                fontSize: "1.15rem", lineHeight: 1.65, fontWeight: 400,
                maxWidth: 620,
              }}
            >
              We bring deep scientific capability and operational rigour together to build durable bio-based businesses across human health, agriculture, scientific services and the environment — including bioremediation and circular waste management.
            </p>
          </div>
        </div>
      </section>

      {/* ─── RECOGNISED BY — Government of India affiliations ─── */}
      <section className="relative px-5 sm:px-6 md:px-12 pt-6 pb-12" style={{ background: BG }}>
        <div className="max-w-[1180px] mx-auto reveal">
          <div
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: ACCENT,
              marginBottom: 14, textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: ACCENT }} />
            Recognised by
            <span style={{ width: 28, height: 1, background: ACCENT }} />
          </div>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              lineHeight: 1.15, fontWeight: 600, color: TEXT_DARK,
              letterSpacing: "-0.015em", textAlign: "center",
              marginBottom: 36, maxWidth: "28ch", margin: "0 auto 36px",
            }}
          >
            Government of India affiliations & accreditations.
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              gap: 16,
              alignItems: "center",
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            {[
              { src: "/affiliations/startup-india.png", alt: "Recognised under Startup India — Department for Promotion of Industry and Internal Trade" },
              { src: "/affiliations/msme.png",          alt: "MSME registered — Ministry of Micro, Small & Medium Enterprises, Government of India" },
              { src: "/affiliations/make-in-india.png", alt: "Make in India initiative" },
            ].map((a) => (
              <div
                key={a.src}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(14,42,28,0.08)",
                  borderRadius: 14,
                  padding: "18px 22px",
                  aspectRatio: "16 / 10",
                  maxHeight: 200,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 6px 18px rgba(14,42,28,0.05)",
                }}
              >
                <img
                  src={a.src}
                  alt={a.alt}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIVISIONS — light cards on alt bg ─── */}
      <section className="relative px-5 sm:px-6 md:px-12 pt-12 pb-14 sm:pt-16 sm:pb-20" style={{ background: BG_ALT }}>
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
            <div>
              <div
                className="reveal"
                style={{
                  fontFamily: "Menlo, monospace",
                  fontSize: 11, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: ACCENT,
                  marginBottom: 18,
                }}
              >
                — 01 / Our Divisions
              </div>
              <h2
                className="reveal font-display"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                  lineHeight: 1.04, letterSpacing: "-0.02em",
                  fontWeight: 700, color: TEXT_DARK, maxWidth: "16ch",
                }}
              >
                Three pillars, one company.
              </h2>
            </div>
            <Link href="/about">
              <span
                className="cursor-pointer inline-flex items-center"
                style={{
                  height: 44, padding: "0 18px", borderRadius: 10,
                  background: DARK_BG, color: "#FFF",
                  fontSize: 11.5, fontWeight: 700, letterSpacing: "0.10em",
                  fontFamily: "Menlo, monospace",
                }}
              >
                VIEW ALL →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIVISIONS.map((d) => (
              <Link key={d.title} href={d.href} data-testid={`card-division-${d.title.toLowerCase().replace(/\s/g, "")}`}>
                <Tilt3D max={10} scale={1.015}>
                  <div
                    className="reveal cursor-pointer relative overflow-hidden flex flex-col"
                    style={{
                      padding: 24, height: "100%", minHeight: 260, borderRadius: 16,
                      background: "#FFFFFF",
                      border: "1px solid rgba(14,42,28,0.08)",
                      boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 8px 24px rgba(14,42,28,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div
                        style={{
                          fontFamily: "Menlo, monospace",
                          fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.18em",
                        }}
                      >
                        — {d.num}
                      </div>
                      <div
                        style={{
                          width: 10, height: 10, borderRadius: "50%",
                          background: LIME,
                          boxShadow: `0 0 10px ${LIME}`,
                        }}
                      />
                    </div>

                    {/* Division logo */}
                    <div
                      style={{
                        height: 72,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <img
                        src={d.logo}
                        alt={`Indibiotek ${d.title}`}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <p style={{
                      color: TEXT_BODY, fontSize: 14.5, lineHeight: 1.65,
                      fontWeight: 400, marginBottom: 14, flex: 1,
                    }}>
                      {d.desc}
                    </p>
                    <span
                      style={{
                        fontFamily: "Menlo, monospace",
                        color: ACCENT, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.10em",
                      }}
                    >
                      EXPLORE →
                    </span>
                  </div>
                </Tilt3D>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DARK CINEMATIC FEATURE STRIP — like Terminal's secondary hero ─── */}
      <section className="relative w-full overflow-hidden" style={{ background: DARK_BG, minHeight: 440 }}>
        <div
          ref={labParallax}
          className="absolute inset-0"
          style={{
            top: -60, bottom: -60,
            backgroundImage: `url("${LAB_IMG}")`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.55,
            willChange: "transform",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(14,28,20,0.92) 0%, rgba(14,28,20,0.55) 50%, rgba(14,28,20,0.30) 100%)",
          }}
        />
        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-6 md:px-12 py-20 sm:py-28 flex flex-col justify-center" style={{ minHeight: 440 }}>
          <div
            className="reveal"
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: LIME,
              marginBottom: 22,
            }}
          >
            — 02 / Inside our labs
          </div>
          <h2
            className="reveal font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.02, letterSpacing: "-0.025em",
              fontWeight: 700, color: "#FFFFFF",
              maxWidth: "20ch", marginBottom: 28,
            }}
          >
            Modern facilities. <span style={{ color: LIME, fontStyle: "italic" }}>Rigorous</span> science.
          </h2>
          <p
            className="reveal"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem", lineHeight: 1.65, fontWeight: 400,
              maxWidth: 540, marginBottom: 32,
            }}
          >
            State-of-the-art laboratories spanning molecular biology, chemistry, fermentation and analytics — built to translate discovery into product at meaningful scale.
          </p>
          <div className="reveal">
            <Link href="/rnd">
              <span
                className="cursor-pointer inline-flex items-center"
                style={{
                  height: 44, padding: "0 20px", borderRadius: 10,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#FFF", fontWeight: 700, fontSize: 12, letterSpacing: "0.10em",
                  fontFamily: "Menlo, monospace",
                  backdropFilter: "blur(8px)",
                }}
              >
                TOUR OUR R&amp;D →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PILLARS ─── */}
      <section className="relative px-5 sm:px-6 md:px-12 pt-12 pb-14 sm:pt-16 sm:pb-20" style={{ background: BG }}>
        <div className="max-w-[1180px] mx-auto">
          <div
            className="reveal"
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: ACCENT,
              marginBottom: 14,
            }}
          >
            — 03 / Our Approach
          </div>
          <h2
            className="reveal font-display mb-8"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              lineHeight: 1.04, letterSpacing: "-0.02em",
              fontWeight: 700, color: TEXT_DARK, maxWidth: "16ch",
            }}
          >
            Built on three pillars.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((p) => (
              <Tilt3D key={p.num} max={8} scale={1.015}>
                <div className="reveal" style={{
                  padding: 24, height: "100%", borderRadius: 16,
                  background: "#FFFFFF",
                  border: "1px solid rgba(14,42,28,0.08)",
                  boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 8px 24px rgba(14,42,28,0.06)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div
                    style={{
                      fontFamily: "Menlo, monospace",
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
                      color: ACCENT, marginBottom: 14,
                    }}
                  >
                    — {p.num}
                  </div>
                  <h3 className="font-display" style={{
                    fontSize: "1.4rem", fontWeight: 600, color: TEXT_DARK,
                    marginBottom: 12, letterSpacing: "-0.01em",
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ color: TEXT_BODY, fontSize: 14.5, lineHeight: 1.7, fontWeight: 400 }}>
                    {p.desc}
                  </p>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DUAL FEATURE — pipette + sprout zigzag ─── */}
      <section className="relative px-5 sm:px-6 md:px-12 pt-12 pb-14 sm:pt-16 sm:pb-20" style={{ background: BG_ALT }}>
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center mb-10 sm:mb-16">
          <Tilt3D className="lg:col-span-6 reveal" max={6} scale={1.01}>
            <div style={{
              backgroundImage: `linear-gradient(135deg, rgba(14,28,20,0.05) 0%, rgba(14,28,20,0.25) 100%), url("${PIPETTE_IMG}")`,
              backgroundSize: "cover", backgroundPosition: "center",
              borderRadius: 16, minHeight: "clamp(220px, 50vw, 360px)",
              border: "1px solid rgba(14,42,28,0.08)",
              boxShadow: "0 16px 40px rgba(14,42,28,0.10)",
            }} />
          </Tilt3D>
          <div className="lg:col-span-6 reveal">
            <div style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: ACCENT,
              marginBottom: 14,
            }}>
              — 04 / Lifesciences
            </div>
            <h2 className="font-display mb-4" style={{
              fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
              lineHeight: 1.05, letterSpacing: "-0.02em",
              fontWeight: 700, color: TEXT_DARK, maxWidth: "14ch",
            }}>
              From <span style={{ color: ACCENT_BRIGHT, fontStyle: "italic" }}>molecule</span> to medicine.
            </h2>
            <p style={{ color: TEXT_BODY, fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, marginBottom: 20, maxWidth: 520 }}>
              Discovery, development and manufacturing of next-generation therapeutics, diagnostics and biopharmaceutical processes — built on rigorous science and modern manufacturing.
            </p>
            <Link href="/lifesciences">
              <span className="cursor-pointer inline-flex items-center" style={{
                height: 44, padding: "0 18px", borderRadius: 10,
                background: DARK_BG, color: "#FFF",
                fontSize: 11.5, fontWeight: 700, letterSpacing: "0.10em",
                fontFamily: "Menlo, monospace",
              }}>
                EXPLORE LIFESCIENCES →
              </span>
            </Link>
          </div>
        </div>

        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          <div className="lg:col-span-6 reveal lg:order-1 order-2">
            <div style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: ACCENT,
              marginBottom: 14,
            }}>
              — 05 / Scientific
            </div>
            <h2 className="font-display mb-4" style={{
              fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
              lineHeight: 1.05, letterSpacing: "-0.02em",
              fontWeight: 700, color: TEXT_DARK, maxWidth: "14ch",
            }}>
              Precision <span style={{ color: ACCENT_BRIGHT, fontStyle: "italic" }}>science</span>, on demand.
            </h2>
            <p style={{ color: TEXT_BODY, fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, marginBottom: 20, maxWidth: 520 }}>
              Analytical testing, contract research and laboratory services — delivering accurate, audit-ready data for industry, academia and regulatory programmes.
            </p>
            <Link href="/scientific">
              <span className="cursor-pointer inline-flex items-center" style={{
                height: 44, padding: "0 18px", borderRadius: 10,
                background: DARK_BG, color: "#FFF",
                fontSize: 11.5, fontWeight: 700, letterSpacing: "0.10em",
                fontFamily: "Menlo, monospace",
              }}>
                EXPLORE SCIENTIFIC →
              </span>
            </Link>
          </div>
          <Tilt3D className="lg:col-span-6 reveal lg:order-2 order-1" max={6} scale={1.01}>
            <div style={{
              backgroundImage: `linear-gradient(135deg, rgba(14,28,20,0.05) 0%, rgba(14,28,20,0.25) 100%), url("${SPROUT_IMG}")`,
              backgroundSize: "cover", backgroundPosition: "center",
              borderRadius: 16, minHeight: "clamp(220px, 50vw, 360px)",
              border: "1px solid rgba(14,42,28,0.08)",
              boxShadow: "0 16px 40px rgba(14,42,28,0.10)",
            }} />
          </Tilt3D>
        </div>
      </section>

      {/* ─── FROM LAB TO FIELD — second cinematic strip ─── */}
      <section className="relative w-full overflow-hidden" style={{ background: DARK_BG, minHeight: 440 }}>
        <div
          ref={fieldParallax}
          className="absolute inset-0"
          style={{
            top: -60, bottom: -60,
            backgroundImage: `url("${FIELD_IMG}")`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.55,
            willChange: "transform",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(14,28,20,0.92) 0%, rgba(14,28,20,0.55) 50%, rgba(14,28,20,0.30) 100%)",
          }}
        />
        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-6 md:px-12 py-20 sm:py-28 flex flex-col justify-center lg:items-end lg:text-right" style={{ minHeight: 440 }}>
          <div
            className="reveal"
            style={{
              fontFamily: "Menlo, monospace",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", color: LIME,
              marginBottom: 22,
            }}
          >
            — 06 / From Lab to Field
          </div>
          <h2
            className="reveal font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.02, letterSpacing: "-0.025em",
              fontWeight: 700, color: "#FFFFFF",
              maxWidth: "20ch", marginBottom: 28,
            }}
          >
            Biology that <span style={{ color: LIME, fontStyle: "italic" }}>reaches</span> the soil.
          </h2>
          <p
            className="reveal"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem", lineHeight: 1.65, fontWeight: 400,
              maxWidth: 540, marginBottom: 32,
            }}
          >
            Our agri division partners with farmers across India to deliver biological inputs at meaningful scale — from research bench to working fields.
          </p>
          <div className="reveal">
            <Link href="/agri">
              <span
                className="cursor-pointer inline-flex items-center"
                style={{
                  height: 44, padding: "0 20px", borderRadius: 10,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#FFF", fontWeight: 700, fontSize: 12, letterSpacing: "0.10em",
                  fontFamily: "Menlo, monospace",
                  backdropFilter: "blur(8px)",
                }}
              >
                EXPLORE AGRI →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA — dark monolith with lime button ─── */}
      <section className="relative px-5 sm:px-6 md:px-12 pt-14 sm:pt-20 pb-8" style={{ background: BG }}>
        <Tilt3D className="max-w-[1180px] mx-auto reveal relative" max={3} scale={1.005}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 20,
              padding: "clamp(40px, 8vw, 80px) clamp(22px, 5vw, 48px)",
              background: DARK_BG,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 30px 80px rgba(14,28,20,0.30)",
            }}
          >
            <div style={{
              position: "absolute", top: -120, right: -80, width: 460, height: 460,
              borderRadius: "50%", pointerEvents: "none",
              background: "radial-gradient(circle, rgba(200,255,77,0.18), transparent 70%)",
            }} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end relative">
              <div className="lg:col-span-8">
                <div
                  style={{
                    fontFamily: "Menlo, monospace",
                    fontSize: 11, letterSpacing: "0.22em",
                    textTransform: "uppercase", color: LIME,
                    marginBottom: 22,
                  }}
                >
                  — 07 / Partner with us
                </div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                    lineHeight: 1.04, fontWeight: 700, color: "#FFFFFF",
                    letterSpacing: "-0.025em", maxWidth: "18ch",
                  }}
                >
                  Build the next generation of <span style={{ color: LIME, fontStyle: "italic" }}>biology</span> with us.
                </h2>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
                <p style={{
                  color: "rgba(255,255,255,0.72)", fontSize: "0.95rem", lineHeight: 1.65,
                  fontWeight: 400, maxWidth: 360,
                }}>
                  Investors, researchers and industry partners — connect with our team to explore collaborations.
                </p>
                <a
                  href="https://wa.me/919608768647"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-cta-contact"
                  className="cursor-pointer inline-flex items-center"
                  style={{
                    height: 48, padding: "0 22px", borderRadius: 10,
                    background: LIME, color: DARK_BG,
                    fontWeight: 700, fontSize: 12.5, letterSpacing: "0.10em",
                    fontFamily: "Menlo, monospace",
                    boxShadow: "0 8px 24px rgba(200,255,77,0.30)",
                    textDecoration: "none",
                  }}
                >
                  GET IN TOUCH →
                </a>
              </div>
            </div>
          </div>
        </Tilt3D>
      </section>
    </div>
  );
}
