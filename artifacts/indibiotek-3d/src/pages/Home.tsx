import { useEffect } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── CSS atmospheric glow — warm amber + green bio ── */
function AtmoBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 100% 80% at 55% 10%, #1A0800 0%, #060300 55%, #020100 100%)',
      }} />
      {/* Warm amber glow — top-centre (from DNA) */}
      <div className="absolute" style={{
        top: '-5vh', left: '35%', transform: 'translateX(-50%)',
        width: '60vw', height: '60vw', maxWidth: 900, maxHeight: 900,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,120,0,0.18) 0%, rgba(255,80,0,0.06) 40%, transparent 68%)',
      }} />
      {/* Green bioluminescent glow — bottom left */}
      <div className="absolute" style={{
        bottom: '-5vh', left: '-12vw',
        width: '55vw', height: '55vw', maxWidth: 750, maxHeight: 750,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(120,255,0,0.14) 0%, rgba(80,200,0,0.04) 50%, transparent 70%)',
      }} />
      {/* Subtle green glow right side */}
      <div className="absolute" style={{
        top: '40vh', right: '-5vw',
        width: '35vw', height: '35vw', maxWidth: 450, maxHeight: 450,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,255,50,0.07) 0%, transparent 65%)',
      }} />
    </div>
  );
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`content-section ${className}`}>{children}</div>;
}

export default function Home() {
  useEffect(() => {
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach((section: any) => {
      gsap.fromTo(
        section.querySelectorAll('.reveal'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />
      <Scene />
      <AtmoBg />

      {/* ── HERO — text directly on 3D, no card ── */}
      <section className="relative h-screen flex flex-col justify-end px-10 md:px-20 pb-24 z-10">
        <RevealSection className="max-w-4xl">
          <div className="reveal mb-4">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#FF9A00', opacity: 0.9,
            }}>
              <span style={{ width: 28, height: 1, background: '#FF9A00', display: 'inline-block' }} />
              Indibiotek Private Limited
            </span>
          </div>

          <h1
            className="reveal font-display font-black"
            style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#FFF8F0',
              marginBottom: 24,
              textShadow: '0 0 80px rgba(255,120,0,0.3)',
            }}
          >
            ENGINEER<br />
            <span style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(90deg, #FF6A00 0%, #FF9A00 50%, #FFD000 100%)',
              filter: 'drop-shadow(0 0 30px rgba(255,120,0,0.7))',
            }}>
              THE FUTURE.
            </span>
          </h1>

          <p className="reveal" style={{
            maxWidth: 500, fontSize: '1.05rem', lineHeight: 1.75,
            color: 'rgba(255,240,220,0.60)', fontWeight: 300, marginBottom: 36,
          }}>
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges — from our state-of-the-art facilities in India.
          </p>

          <div className="reveal flex flex-wrap gap-4">
            <a href="#about" data-testid="button-explore-tech"
              style={{
                padding: '14px 32px', borderRadius: 4,
                background: 'linear-gradient(90deg, #FF6A00, #FF9A00)',
                color: '#0A0300', fontWeight: 800, fontSize: 13,
                letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                boxShadow: '0 4px 30px rgba(255,100,0,0.45)',
              }}>
              Explore Our Science
            </a>
            <a href="#contact" data-testid="button-partner-hero"
              style={{
                padding: '14px 32px', borderRadius: 4,
                border: '1px solid rgba(255,200,100,0.30)',
                color: 'rgba(255,240,220,0.85)', fontWeight: 600, fontSize: 13,
                letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
              Partner With Us
            </a>
          </div>
        </RevealSection>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 32, right: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.35,
        }}>
          <div style={{
            width: 20, height: 32, borderRadius: 10,
            border: '1.5px solid rgba(255,150,0,0.6)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6,
          }}>
            <div style={{
              width: 4, height: 8, borderRadius: 2, background: '#FF9A00',
              animation: 'scrollBounce 1.5s ease-in-out infinite',
            }} />
          </div>
          <style>{`@keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }`}</style>
        </div>
      </section>

      {/* ── ABOUT — text on scene, no glass ── */}
      <section id="about" className="relative z-10 px-10 md:px-20 py-32">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <p className="reveal" style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#AAFF44', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ width: 28, height: 1, background: '#AAFF44', display: 'inline-block' }} />
                  Who We Are
                </p>
                <h2 className="reveal font-display font-black"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', lineHeight: 1.0,
                    letterSpacing: '-0.025em', color: '#FFF8F0', marginBottom: 24,
                    textShadow: '0 0 60px rgba(170,255,68,0.15)',
                  }}>
                  REDEFINING<br />BIOLOGICAL<br />BOUNDARIES.
                </h2>
                <div style={{ width: 48, height: 2, background: 'linear-gradient(to right, #AAFF44, #FF9A00)', marginBottom: 28, borderRadius: 1 }} />
                <p className="reveal" style={{ color: 'rgba(255,240,220,0.65)', fontWeight: 300, lineHeight: 1.8, fontSize: '1.05rem' }}>
                  At Indibiotek, we view biology as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions that transform lives.
                </p>
              </div>
              <div className="reveal grid gap-px" style={{ border: '1px solid rgba(255,180,60,0.12)', borderRadius: 8, overflow: 'hidden' }}>
                {[
                  { num: '15+', label: 'Active Research Pipelines', col: '#FF9A00' },
                  { num: '4',   label: 'Global Partnerships',       col: '#AAFF44' },
                  { num: '∞',   label: 'Commitment to Innovation',  col: '#FFD000' },
                ].map(({ num, label, col }, i) => (
                  <div key={i} style={{
                    padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20,
                    background: 'rgba(255,255,255,0.025)',
                    borderBottom: i < 2 ? '1px solid rgba(255,180,60,0.10)' : 'none',
                  }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 42, color: col, lineHeight: 1, minWidth: 70 }}>{num}</span>
                    <span style={{ color: 'rgba(255,240,220,0.75)', fontSize: '0.95rem', fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section id="technology" className="relative z-10 px-10 md:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <p className="reveal" style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#FF9A00', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 28, height: 1, background: '#FF9A00', display: 'inline-block' }} />
              Our Capabilities
            </p>
            <h2 className="reveal font-display font-black"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.025em', color: '#FFF8F0', marginBottom: 56, lineHeight: 1.0 }}>
              PROPRIETARY PLATFORMS.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,180,60,0.08)', borderRadius: 8, overflow: 'hidden' }}>
              {[
                { title: 'Synthetic\nBiology', desc: 'Engineering novel biological systems and redesigning existing ones for targeted medical and industrial purposes.', icon: '01', col: '#FF9A00' },
                { title: 'Computational\nDiscovery', desc: 'AI-driven molecular modeling to predict binding interactions and optimize therapeutic candidates at scale.', icon: '02', col: '#AAFF44' },
                { title: 'Precision\nBiomanufacturing', desc: 'Scaling biological processes with unprecedented precision, yield, and environmental sustainability.', icon: '03', col: '#FFD000' },
              ].map((tech) => (
                <div key={tech.icon} className="reveal" style={{ padding: '48px 36px', background: 'rgba(6,3,0,0.6)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', top: 24, right: 24,
                    fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 72,
                    color: `${tech.col}12`, lineHeight: 1,
                  }}>{tech.icon}</div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 6, background: `${tech.col}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28,
                    border: `1px solid ${tech.col}30`,
                  }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: tech.col }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 800,
                    fontSize: '1.3rem', color: '#FFF8F0', marginBottom: 14,
                    lineHeight: 1.15, whiteSpace: 'pre-line',
                  }}>{tech.title}</h3>
                  <p style={{ color: 'rgba(255,240,220,0.50)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300 }}>{tech.desc}</p>
                  <div style={{ marginTop: 28, color: tech.col, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }}>LEARN MORE →</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section id="solutions" className="relative z-10 px-10 md:px-20 py-24">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <p className="reveal" style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#AAFF44', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ width: 28, height: 1, background: '#AAFF44', display: 'inline-block' }} />
                  Research Pipeline
                </p>
                <h2 className="reveal font-display font-black"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.025em', color: '#FFF8F0', lineHeight: 1.0 }}>
                  FROM SEQUENCE<br />TO SCALE.
                </h2>
              </div>
              <p className="reveal lg:max-w-xs" style={{ color: 'rgba(255,240,220,0.45)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.95rem' }}>
                A robust pipeline addressing critical unmet needs in healthcare and industry.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,180,60,0.12)' }}>
              {[
                { name: 'IBT-001', cat: 'Oncology', phase: 'Pre-clinical', desc: 'Targeted nanoparticle therapy for solid tumors.', prog: 30, col: '#FF6A00' },
                { name: 'SynEnzymes', cat: 'Industrial', phase: 'Commercial', desc: 'Custom-engineered biocatalysts for industrial applications.', prog: 100, col: '#AAFF44' },
                { name: 'BioMaterials', cat: 'Sustainability', phase: 'Development', desc: 'Sustainable alternatives to petroleum-based polymers.', prog: 55, col: '#FFD000' },
              ].map((item, idx) => (
                <div key={idx} className="reveal" style={{
                  padding: '28px 0', borderBottom: '1px solid rgba(255,180,60,0.10)',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 36, color: `${item.col}22`, lineHeight: 1, minWidth: 44 }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#FFF8F0' }}>{item.name}</span>
                          <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 2, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,240,220,0.40)', letterSpacing: '0.08em' }}>{item.cat}</span>
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'rgba(255,240,220,0.45)', fontWeight: 300 }}>{item.desc}</span>
                      </div>
                    </div>
                    <span style={{
                      padding: '6px 16px', borderRadius: 2, fontSize: 11, fontWeight: 800,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      background: `${item.col}18`, border: `1px solid ${item.col}40`, color: item.col,
                    }}>{item.phase}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }}>
                    <div style={{ height: '100%', width: `${item.prog}%`, background: item.col, borderRadius: 1, boxShadow: `0 0 8px ${item.col}88` }} />
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 px-10 md:px-20 py-36">
        <div className="max-w-2xl">
          <RevealSection>
            <p className="reveal" style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#FF9A00', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 28, height: 1, background: '#FF9A00', display: 'inline-block' }} />
              Connect With Us
            </p>
            <h2 className="reveal font-display font-black"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 0.95,
                letterSpacing: '-0.03em', color: '#FFF8F0', marginBottom: 20,
              }}>
              SHAPE THE<br />
              <span style={{
                color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text',
                backgroundImage: 'linear-gradient(90deg, #FF6A00, #FFD000)',
                filter: 'drop-shadow(0 0 20px rgba(255,120,0,0.5))',
              }}>FUTURE.</span>
            </h2>
            <p className="reveal" style={{ color: 'rgba(255,240,220,0.50)', lineHeight: 1.75, marginBottom: 40, fontWeight: 300, maxWidth: 420 }}>
              Investor, researcher, or potential partner — join us in engineering tomorrow's solutions.
            </p>

            <form onSubmit={(e) => e.preventDefault()} data-testid="contact-form" className="reveal space-y-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,180,60,0.12)', borderRadius: 8, padding: 36 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ ph: 'Name', type: 'text', id: 'input-name' }, { ph: 'Email', type: 'email', id: 'input-email' }].map(({ ph, type, id }) => (
                  <input key={id} type={type} placeholder={ph} data-testid={id}
                    style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,180,60,0.15)',
                      borderRadius: 4, padding: '12px 16px', color: '#FFF8F0', fontSize: 14,
                      outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif',
                    }} />
                ))}
              </div>
              <textarea placeholder="Tell us about your interest…" rows={4} data-testid="input-message"
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,180,60,0.15)',
                  borderRadius: 4, padding: '12px 16px', color: '#FFF8F0', fontSize: 14,
                  outline: 'none', resize: 'none', width: '100%', fontFamily: 'Inter, sans-serif',
                }} />
              <button type="submit" data-testid="button-submit"
                style={{
                  width: '100%', padding: '14px', borderRadius: 4,
                  background: 'linear-gradient(90deg, #FF6A00, #FF9A00)',
                  color: '#0A0300', fontWeight: 800, fontSize: 13, letterSpacing: '0.12em',
                  textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(255,100,0,0.35)',
                }}>
                Send Inquiry →
              </button>
            </form>

            <div className="reveal" style={{
              marginTop: 40, paddingTop: 28, borderTop: '1px solid rgba(255,180,60,0.08)',
              display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12,
              fontSize: 13, color: 'rgba(255,240,220,0.28)',
            }}>
              <p>&copy; {new Date().getFullYear()} Indibiotek Private Limited.</p>
              <div style={{ display: 'flex', gap: 24 }}>
                {['Privacy', 'Terms', 'LinkedIn'].map(l => <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>)}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
