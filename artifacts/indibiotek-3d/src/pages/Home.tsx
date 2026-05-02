import { useEffect } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAL = '#53CFCF';

/* ── CSS glow orbs — always visible, no WebGL needed ── */
function GlowOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* top-right large teal orb */}
      <div style={{
        position: 'absolute', top: '-15vh', right: '-10vw',
        width: '60vw', height: '60vw', maxWidth: 900, maxHeight: 900,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(83,207,207,0.18) 0%, rgba(83,207,207,0.06) 40%, transparent 70%)',
        filter: 'blur(1px)',
      }} />
      {/* bottom-left green-teal orb */}
      <div style={{
        position: 'absolute', bottom: '5vh', left: '-12vw',
        width: '50vw', height: '50vw', maxWidth: 700, maxHeight: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(64,217,160,0.12) 0%, rgba(64,217,160,0.04) 45%, transparent 70%)',
        filter: 'blur(1px)',
      }} />
      {/* center subtle pulse */}
      <div style={{
        position: 'absolute', top: '30vh', left: '50%', transform: 'translateX(-50%)',
        width: '40vw', height: '40vw', maxWidth: 500, maxHeight: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(83,207,207,0.07) 0%, transparent 65%)',
      }} />
      {/* horizontal glow line */}
      <div style={{
        position: 'absolute', top: '50vh', left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(83,207,207,0.15) 25%, rgba(83,207,207,0.15) 75%, transparent)',
      }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-7"
      style={{ background: 'rgba(83,207,207,0.10)', border: `1px solid rgba(83,207,207,0.30)`, color: TEAL }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: TEAL }} />
      {children}
    </div>
  );
}

function GlassCard({ children, className = '', style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`rounded-2xl ${className}`} style={{
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.09)',
      backdropFilter: 'blur(24px)',
      boxShadow: '0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach((section: any) => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-element'),
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <Scene />
      <GlowOrbs />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="max-w-5xl mx-auto content-section">
          <div className="reveal-element mb-8 flex justify-center">
            <SectionLabel>Biotechnology Redefined</SectionLabel>
          </div>

          {/* giant headline */}
          <h1
            className="reveal-element font-display font-black leading-none mb-8"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 9rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            <span style={{ color: '#ffffff' }}>Engineer</span>
            <br />
            <span style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: `linear-gradient(135deg, ${TEAL} 0%, #40D9A0 50%, #7EE8FA 100%)`,
              display: 'inline-block',
              filter: 'drop-shadow(0 0 40px rgba(83,207,207,0.5))',
            }}>
              The Future
            </span>
          </h1>

          {/* subline */}
          <p
            className="reveal-element mx-auto mb-10 text-lg md:text-xl"
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 300,
              maxWidth: 560,
              lineHeight: 1.75,
              letterSpacing: '0.01em',
            }}
          >
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges — from our state-of-the-art facilities in India.
          </p>

          {/* CTA buttons */}
          <div className="reveal-element flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#technology"
              data-testid="button-explore-tech"
              className="relative px-9 py-4 rounded-full font-bold text-base tracking-wide overflow-hidden group"
              style={{ background: TEAL, color: '#050810' }}
            >
              <span className="relative z-10">Explore Our Tech →</span>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #6EDDDD, #40D9A0)', boxShadow: `0 0 40px rgba(83,207,207,0.6)` }} />
            </a>
            <a
              href="#contact"
              data-testid="button-partner-hero"
              className="px-9 py-4 rounded-full font-medium text-base tracking-wide transition-all duration-300 hover:bg-white/8"
              style={{ border: '1.5px solid rgba(255,255,255,0.30)', color: '#fff' }}
            >
              Partner With Us
            </a>
          </div>
        </div>

        {/* decorative scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-35">
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1.5px solid rgba(83,207,207,0.5)' }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: TEAL }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 px-6 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center content-section">
            {/* text */}
            <div>
              <div className="reveal-element"><SectionLabel>Who We Are</SectionLabel></div>
              <h2 className="reveal-element font-display font-black mb-5"
                style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Redefining<br />Biological<br />Boundaries
              </h2>
              <div className="reveal-element w-16 h-[3px] rounded-full mb-8"
                style={{ background: `linear-gradient(to right, ${TEAL}, #40D9A0)` }} />
              <p className="reveal-element mb-5 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.70)', fontWeight: 300, fontSize: '1.05rem' }}>
                At Indibiotek, we view biology as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions.
              </p>
              <p className="reveal-element leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.50)', fontWeight: 300 }}>
                Our multidisciplinary team works at the intersection of nature and digital innovation — creating therapies and materials for the next century.
              </p>
            </div>

            {/* stats */}
            <div className="reveal-element grid gap-4">
              {[
                { num: '15+', label: 'Active Research Pipelines', icon: '🔬' },
                { num: '4', label: 'Global Partnerships', icon: '🌍' },
                { num: '∞', label: 'Commitment to Innovation', icon: '⚡' },
              ].map(({ num, label, icon }) => (
                <GlassCard key={label} className="px-8 py-6 flex items-center gap-6">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <div className="font-display font-black text-3xl mb-0.5" style={{ color: TEAL }}>{num}</div>
                    <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ────────────────────────────────────────── */}
      <section id="technology" className="relative z-10 px-6 md:px-20 py-24">
        <div className="max-w-6xl mx-auto content-section">
          <div className="text-center mb-16">
            <div className="reveal-element flex justify-center"><SectionLabel>Our Capabilities</SectionLabel></div>
            <h2 className="reveal-element font-display font-black mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em' }}>
              Proprietary Platforms
            </h2>
            <p className="reveal-element max-w-md mx-auto"
              style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
              An interconnected ecosystem of bio-technologies accelerating discovery from months to days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Synthetic Biology',
                desc: 'Engineering novel biological systems and redesigning existing ones for useful purposes.',
                icon: '🧬',
                num: '01',
              },
              {
                title: 'Computational Discovery',
                desc: 'AI-driven molecular modeling to predict interactions and optimize therapeutic candidates.',
                icon: '🤖',
                num: '02',
              },
              {
                title: 'Precision Biomanufacturing',
                desc: 'Scaling biological processes with unprecedented control and environmental sustainability.',
                icon: '⚗️',
                num: '03',
              },
            ].map((tech) => (
              <GlassCard key={tech.num} className="p-8 reveal-element flex flex-col"
                style={{ transition: 'border-color 0.4s, box-shadow 0.4s' }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(83,207,207,0.10)' }}>
                    {tech.icon}
                  </div>
                  <span className="font-display font-black text-5xl" style={{ color: 'rgba(83,207,207,0.15)', lineHeight: 1 }}>
                    {tech.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-white">{tech.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.50)', fontWeight: 300 }}>
                  {tech.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium" style={{ color: TEAL }}>
                  Learn more <span>→</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ──────────────────────────────────────────── */}
      <section id="solutions" className="relative z-10 px-6 md:px-20 py-24">
        <div className="max-w-5xl mx-auto content-section">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <div className="reveal-element"><SectionLabel>Therapeutics & Solutions</SectionLabel></div>
              <h2 className="reveal-element font-display font-black"
                style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em' }}>
                From Sequence<br />to Scale
              </h2>
            </div>
            <p className="reveal-element lg:max-w-xs lg:text-right"
              style={{ color: 'rgba(255,255,255,0.50)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7 }}>
              A robust pipeline addressing critical unmet needs in healthcare and industry.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'IBT-001', category: 'Oncology', phase: 'Pre-clinical', desc: 'Targeted nanoparticle therapy for solid tumors.', progress: 30 },
              { name: 'SynEnzymes', category: 'Industrial', phase: 'Commercial', desc: 'Custom-engineered biocatalysts for industrial applications.', progress: 100 },
              { name: 'BioMaterials', category: 'Sustainability', phase: 'Development', desc: 'Sustainable alternatives to petroleum-based polymers.', progress: 55 },
            ].map((item, idx) => (
              <GlassCard key={idx} className="px-8 py-7 reveal-element">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-4">
                  <div className="flex items-start gap-5">
                    <span className="font-display font-black text-4xl shrink-0"
                      style={{ color: 'rgba(83,207,207,0.20)', lineHeight: 1 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-bold text-xl text-white">{item.name}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.50)' }}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.50)', fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ background: 'rgba(83,207,207,0.10)', border: `1px solid rgba(83,207,207,0.25)`, color: TEAL }}>
                      {item.phase}
                    </span>
                    <button className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ border: `1px solid rgba(83,207,207,0.30)`, color: TEAL }}
                      data-testid={`btn-explore-${idx}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* progress bar */}
                <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%`, background: `linear-gradient(to right, ${TEAL}, #40D9A0)` }} />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 px-6 md:px-20 py-36">
        <div className="max-w-2xl mx-auto text-center content-section">
          <div className="reveal-element flex justify-center"><SectionLabel>Connect</SectionLabel></div>
          <h2 className="reveal-element font-display font-black mb-5"
            style={{ fontSize: 'clamp(2.5rem,8vw,5.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
            Shape the<br />
            <span style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: `linear-gradient(135deg, ${TEAL}, #40D9A0)`,
            }}>
              Future.
            </span>
          </h2>
          <p className="reveal-element mb-10 max-w-sm mx-auto"
            style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            Investor, researcher, or potential partner — join us in engineering tomorrow.
          </p>

          <GlassCard className="p-8 md:p-10 reveal-element text-left">
            <form onSubmit={(e) => e.preventDefault()} data-testid="contact-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" data-testid="input-name"
                  className="rounded-xl px-4 py-3.5 text-sm text-white outline-none w-full"
                  style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', transition: 'border-color 0.3s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = TEAL)}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')} />
                <input type="email" placeholder="Email" data-testid="input-email"
                  className="rounded-xl px-4 py-3.5 text-sm text-white outline-none w-full"
                  style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', transition: 'border-color 0.3s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = TEAL)}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')} />
              </div>
              <textarea placeholder="Tell us about your interest…" rows={4} data-testid="input-message"
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', transition: 'border-color 0.3s' }}
                onFocus={e => (e.currentTarget.style.borderColor = TEAL)}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')} />
              <button type="submit" data-testid="button-submit"
                className="relative w-full py-4 rounded-xl font-bold text-base tracking-wide overflow-hidden group"
                style={{ background: TEAL, color: '#050810' }}>
                <span className="relative z-10">Send Inquiry →</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #6EDDDD, #40D9A0)' }} />
              </button>
            </form>
          </GlassCard>

          {/* footer */}
          <div className="reveal-element mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.30)' }}>
            <p>&copy; {new Date().getFullYear()} Indibiotek Private Limited.</p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'LinkedIn'].map(link => (
                <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
