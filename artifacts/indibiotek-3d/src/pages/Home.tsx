import { useEffect } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAL = '#53CFCF';

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
      style={{ background: 'rgba(83,207,207,0.12)', border: `1px solid rgba(83,207,207,0.35)`, color: TEAL }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TEAL }} />
      {children}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach((section: any) => {
      const elements = section.querySelectorAll('.reveal-element');
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ color: '#fff' }} id="main-scroll-container">
      <Navbar />
      <Scene />

      {/* ── HERO ── centered, full screen */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="max-w-4xl content-section">
          <div className="reveal-element mb-6 flex justify-center">
            <SectionLabel>Biotechnology Redefined</SectionLabel>
          </div>

          <h1 className="reveal-element font-display font-black leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}>
            Engineering<br />
            <span style={{ color: TEAL }}>the Future</span><br />
            of Life
          </h1>

          <p className="reveal-element text-lg md:text-xl mb-10 max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.70)', fontWeight: 300, lineHeight: 1.7 }}>
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges — from our state-of-the-art facilities in India.
          </p>

          <div className="reveal-element flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#technology"
              data-testid="button-explore-tech"
              className="px-8 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300"
              style={{ background: TEAL, color: '#050810', boxShadow: `0 0 0 0 ${TEAL}` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px rgba(83,207,207,0.5)`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${TEAL}`)}
            >
              Explore Our Tech
            </a>
            <a
              href="#contact"
              data-testid="button-partner-hero"
              className="px-8 py-4 rounded-full font-medium text-base tracking-wide transition-all duration-300"
              style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = TEAL)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
            >
              Partner With Us
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-6 right-10 hidden md:flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: TEAL, writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="w-px h-14" style={{ background: `linear-gradient(to bottom, ${TEAL}, transparent)` }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto content-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="reveal-element"><SectionLabel>Who We Are</SectionLabel></div>
              <h2 className="reveal-element font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.15 }}>
                Redefining<br />Biological Boundaries
              </h2>
              <div className="reveal-element w-14 h-1 rounded-full mb-8" style={{ background: `linear-gradient(to right, ${TEAL}, #40D9A0)` }} />
              <p className="reveal-element mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300 }}>
                At Indibiotek Private Limited, we view biology not just as a science, but as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions.
              </p>
              <p className="reveal-element leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)', fontWeight: 300 }}>
                Our multidisciplinary team of researchers, computational biologists, and engineers work at the intersection of nature and digital innovation.
              </p>
            </div>

            <div className="reveal-element grid grid-cols-1 gap-4">
              {[
                { num: '15+', label: 'Active Research Pipelines' },
                { num: '4', label: 'Global Partnerships' },
                { num: '100%', label: 'Commitment to Innovation' },
              ].map(({ num, label }) => (
                <GlassCard key={label} className="px-8 py-5 flex items-center gap-6">
                  <span className="font-display font-black text-4xl shrink-0" style={{ color: TEAL }}>{num}</span>
                  <span className="font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{label}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section id="technology" className="relative z-10 px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto content-section">
          <div className="text-center mb-16">
            <div className="reveal-element flex justify-center"><SectionLabel>Our Capabilities</SectionLabel></div>
            <h2 className="reveal-element font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
              Proprietary Platforms
            </h2>
            <p className="reveal-element max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.60)', fontWeight: 300 }}>
              An interconnected ecosystem of bio-technologies that accelerates discovery from months to days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Synthetic Biology', desc: 'Engineering novel biological systems and redesigning existing ones for useful purposes.', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18' },
              { title: 'Computational Discovery', desc: 'AI-driven molecular modeling to predict interactions and optimize therapeutic candidates.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { title: 'Precision Biomanufacturing', desc: 'Scaling biological processes with unprecedented control and environmental sustainability.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
            ].map((tech, idx) => (
              <GlassCard key={idx} className="p-8 reveal-element group" style={{ transition: 'border-color 0.4s', cursor: 'default' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(83,207,207,0.12)' }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={TEAL} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tech.icon} />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-white">{tech.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{tech.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section id="solutions" className="relative z-10 px-6 md:px-16 py-24">
        <div className="max-w-5xl mx-auto content-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="reveal-element"><SectionLabel>Therapeutics & Solutions</SectionLabel></div>
              <h2 className="reveal-element font-display font-bold" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
                From Sequence to Scale
              </h2>
            </div>
            <p className="reveal-element max-w-xs" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, fontSize: '0.95rem' }}>
              A robust pipeline addressing critical unmet needs in healthcare and industry.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { name: 'IBT-001 (Oncology)', phase: 'Pre-clinical', desc: 'Targeted nanoparticle therapy for solid tumors.' },
              { name: 'SynEnzymes', phase: 'Commercial', desc: 'Custom-engineered biocatalysts for industrial applications.' },
              { name: 'BioMaterials', phase: 'Development', desc: 'Sustainable alternatives to petroleum-based polymers.' },
            ].map((item, idx) => (
              <GlassCard key={idx} className="px-8 py-6 reveal-element" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-1 text-white">{item.name}</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                      style={{ background: 'rgba(83,207,207,0.12)', border: `1px solid rgba(83,207,207,0.3)`, color: TEAL }}>
                      {item.phase}
                    </span>
                    <button
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ border: `1px solid rgba(83,207,207,0.4)`, color: TEAL }}
                      data-testid={`btn-explore-${idx}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 px-6 md:px-16 py-32">
        <div className="max-w-2xl mx-auto text-center content-section">
          <div className="reveal-element flex justify-center"><SectionLabel>Connect</SectionLabel></div>
          <h2 className="reveal-element font-display font-black mb-4" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)', lineHeight: 1.1 }}>
            Shape the Future<br />With Us
          </h2>
          <p className="reveal-element mb-10 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.60)', fontWeight: 300, lineHeight: 1.7 }}>
            Whether you are an investor, researcher, or potential partner, we invite you to join us in engineering tomorrow.
          </p>

          <GlassCard className="p-8 reveal-element text-left">
            <form onSubmit={(e) => e.preventDefault()} data-testid="contact-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { placeholder: 'Name', type: 'text', id: 'input-name' },
                  { placeholder: 'Email', type: 'email', id: 'input-email' },
                ].map(({ placeholder, type, id }) => (
                  <input
                    key={id}
                    type={type}
                    placeholder={placeholder}
                    data-testid={id}
                    className="rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = TEAL)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                ))}
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                data-testid="input-message"
                className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 resize-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                onFocus={e => (e.currentTarget.style.borderColor = TEAL)}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
              <button
                type="submit"
                data-testid="button-submit"
                className="w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300"
                style={{ background: TEAL, color: '#050810' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 28px rgba(83,207,207,0.45)`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                Send Inquiry
              </button>
            </form>
          </GlassCard>

          <div className="mt-10 pt-8 reveal-element flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}>
            <p>&copy; {new Date().getFullYear()} Indibiotek Private Limited. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'LinkedIn'].map(link => (
                <a key={link} href="#" className="transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEAL)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
