import { useEffect } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Atmospheric CSS background — always visible ── */
function AtmosphericBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      {/* Base gradient — deep midnight blue, NOT teal */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0D1B3E 0%, #04071A 55%, #02040F 100%)',
      }} />
      {/* Top-right: blue/indigo glow */}
      <div className="absolute" style={{
        top: '-10vh', right: '-8vw',
        width: '55vw', height: '55vw', maxWidth: 800, maxHeight: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(68,136,255,0.20) 0%, rgba(68,136,255,0.06) 45%, transparent 70%)',
      }} />
      {/* Bottom-left: brand teal glow */}
      <div className="absolute" style={{
        bottom: '0', left: '-10vw',
        width: '50vw', height: '50vw', maxWidth: 700, maxHeight: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(83,207,207,0.16) 0%, rgba(83,207,207,0.04) 50%, transparent 70%)',
      }} />
      {/* Centre-right: faint green accent */}
      <div className="absolute" style={{
        top: '35vh', right: '5vw',
        width: '30vw', height: '30vw', maxWidth: 400, maxHeight: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,136,0.08) 0%, transparent 65%)',
      }} />
      {/* Horizontal light band across middle */}
      <div className="absolute" style={{
        top: '48vh', left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(68,136,255,0.12) 30%, rgba(83,207,207,0.12) 70%, transparent)',
      }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6"
      style={{ background: 'rgba(83,207,207,0.10)', border: '1px solid rgba(83,207,207,0.28)', color: '#53CFCF' }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: '#53CFCF' }} />
      {children}
    </div>
  );
}

function GlassCard({ children, className = '', style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`rounded-2xl ${className}`} style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 4px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
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
      <AtmosphericBg />

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="max-w-5xl mx-auto content-section">
          {/* pill badge */}
          <div className="reveal-element mb-8 flex justify-center">
            <SectionLabel>Biotechnology Redefined</SectionLabel>
          </div>

          {/* main heading */}
          <h1
            className="reveal-element font-display font-black leading-none mb-7"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 8.5rem)', letterSpacing: '-0.03em' }}
          >
            <span style={{ color: '#E8F4FF' }}>Engineer</span>
            <br />
            <span style={{
              display: 'inline-block',
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(100deg, #4488FF 0%, #53CFCF 50%, #39FF88 100%)',
              filter: 'drop-shadow(0 0 36px rgba(68,136,255,0.45))',
            }}>
              The Future
            </span>
          </h1>

          {/* sub-headline */}
          <p
            className="reveal-element mx-auto mb-10"
            style={{ fontSize: '1.1rem', color: 'rgba(220,235,255,0.65)', fontWeight: 300, maxWidth: 540, lineHeight: 1.8, letterSpacing: '0.01em' }}
          >
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges — from our state-of-the-art facilities in India.
          </p>

          {/* CTAs */}
          <div className="reveal-element flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#technology"
              data-testid="button-explore-tech"
              className="relative px-9 py-4 rounded-full font-bold text-base tracking-wide overflow-hidden"
              style={{ background: 'linear-gradient(100deg, #4488FF, #53CFCF)', color: '#02040F', boxShadow: '0 4px 24px rgba(68,136,255,0.35)' }}
            >
              Explore Our Tech →
            </a>
            <a
              href="#contact"
              data-testid="button-partner-hero"
              className="px-9 py-4 rounded-full font-medium text-base tracking-wide transition-all duration-300"
              style={{ border: '1.5px solid rgba(255,255,255,0.22)', color: '#E8F4FF' }}
            >
              Partner With Us
            </a>
          </div>
        </div>

        {/* scroll mouse indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1.5px solid rgba(68,136,255,0.6)' }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: '#4488FF' }} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 px-6 md:px-20 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center content-section">
            <div>
              <div className="reveal-element"><SectionLabel>Who We Are</SectionLabel></div>
              <h2 className="reveal-element font-display font-black mb-5"
                style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E8F4FF' }}>
                Redefining<br />Biological<br />Boundaries
              </h2>
              <div className="reveal-element w-16 h-[3px] rounded-full mb-8"
                style={{ background: 'linear-gradient(to right, #4488FF, #53CFCF, #39FF88)' }} />
              <p className="reveal-element mb-5 leading-relaxed"
                style={{ color: 'rgba(210,228,255,0.72)', fontWeight: 300, fontSize: '1.05rem' }}>
                At Indibiotek, we view biology as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions.
              </p>
              <p className="reveal-element leading-relaxed"
                style={{ color: 'rgba(210,228,255,0.50)', fontWeight: 300 }}>
                Our multidisciplinary team works at the intersection of nature and digital innovation — creating therapies and materials for the next century.
              </p>
            </div>

            <div className="reveal-element grid gap-4">
              {[
                { num: '15+', label: 'Active Research Pipelines', col: '#4488FF' },
                { num: '4',   label: 'Global Partnerships',       col: '#53CFCF' },
                { num: '∞',   label: 'Commitment to Innovation',  col: '#39FF88' },
              ].map(({ num, label, col }) => (
                <GlassCard key={label} className="px-8 py-5 flex items-center gap-6">
                  <span className="font-display font-black text-3xl shrink-0" style={{ color: col }}>{num}</span>
                  <span className="font-medium" style={{ color: 'rgba(220,235,255,0.82)' }}>{label}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section id="technology" className="relative z-10 px-6 md:px-20 py-24">
        <div className="max-w-6xl mx-auto content-section">
          <div className="text-center mb-16">
            <div className="reveal-element flex justify-center"><SectionLabel>Our Capabilities</SectionLabel></div>
            <h2 className="reveal-element font-display font-black mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em', color: '#E8F4FF' }}>
              Proprietary Platforms
            </h2>
            <p className="reveal-element max-w-md mx-auto"
              style={{ color: 'rgba(210,228,255,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
              An interconnected ecosystem of bio-technologies accelerating discovery from months to days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Synthetic Biology', desc: 'Engineering novel biological systems and redesigning existing ones for targeted purposes.', icon: '🧬', num: '01', accent: '#4488FF' },
              { title: 'Computational Discovery', desc: 'AI-driven molecular modeling to predict interactions and optimize therapeutic candidates.', icon: '🤖', num: '02', accent: '#53CFCF' },
              { title: 'Precision Biomanufacturing', desc: 'Scaling biological processes with unprecedented control and environmental sustainability.', icon: '⚗️', num: '03', accent: '#39FF88' },
            ].map((tech) => (
              <GlassCard key={tech.num} className="p-8 reveal-element flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `rgba(${tech.accent === '#4488FF' ? '68,136,255' : tech.accent === '#53CFCF' ? '83,207,207' : '57,255,136'},0.10)` }}>
                    {tech.icon}
                  </div>
                  <span className="font-display font-black text-5xl" style={{ color: `${tech.accent}18`, lineHeight: 1 }}>
                    {tech.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: '#E8F4FF' }}>{tech.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(210,228,255,0.50)', fontWeight: 300 }}>{tech.desc}</p>
                <div className="mt-6 text-sm font-semibold" style={{ color: tech.accent }}>Learn more →</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section id="solutions" className="relative z-10 px-6 md:px-20 py-24">
        <div className="max-w-5xl mx-auto content-section">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <div>
              <div className="reveal-element"><SectionLabel>Therapeutics & Solutions</SectionLabel></div>
              <h2 className="reveal-element font-display font-black"
                style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.02em', color: '#E8F4FF' }}>
                From Sequence<br />to Scale
              </h2>
            </div>
            <p className="reveal-element lg:max-w-xs lg:text-right"
              style={{ color: 'rgba(210,228,255,0.50)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7 }}>
              A robust pipeline addressing critical unmet needs in healthcare and industry.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'IBT-001', category: 'Oncology', phase: 'Pre-clinical', desc: 'Targeted nanoparticle therapy for solid tumors.', progress: 30, accent: '#FF4466' },
              { name: 'SynEnzymes', category: 'Industrial', phase: 'Commercial', desc: 'Custom-engineered biocatalysts for industrial applications.', progress: 100, accent: '#39FF88' },
              { name: 'BioMaterials', category: 'Sustainability', phase: 'Development', desc: 'Sustainable alternatives to petroleum-based polymers.', progress: 55, accent: '#4488FF' },
            ].map((item, idx) => (
              <GlassCard key={idx} className="px-8 py-7 reveal-element">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-4">
                  <div className="flex items-start gap-5">
                    <span className="font-display font-black text-4xl shrink-0" style={{ color: `${item.accent}28`, lineHeight: 1 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-bold text-xl" style={{ color: '#E8F4FF' }}>{item.name}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(220,235,255,0.45)' }}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(210,228,255,0.50)', fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
                      style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}44`, color: item.accent }}>
                      {item.phase}
                    </span>
                  </div>
                </div>
                <div className="h-[2px] rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: item.accent }} />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 px-6 md:px-20 py-36">
        <div className="max-w-2xl mx-auto text-center content-section">
          <div className="reveal-element flex justify-center"><SectionLabel>Connect</SectionLabel></div>
          <h2 className="reveal-element font-display font-black mb-5"
            style={{ fontSize: 'clamp(2.5rem,8vw,5.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E8F4FF' }}>
            Shape the<br />
            <span style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(100deg, #4488FF, #53CFCF)',
            }}>
              Future.
            </span>
          </h2>
          <p className="reveal-element mb-10 max-w-sm mx-auto"
            style={{ color: 'rgba(210,228,255,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            Investor, researcher, or potential partner — join us in engineering tomorrow.
          </p>

          <GlassCard className="p-8 md:p-10 reveal-element text-left">
            <form onSubmit={(e) => e.preventDefault()} data-testid="contact-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { placeholder: 'Name', type: 'text', id: 'input-name' },
                  { placeholder: 'Email', type: 'email', id: 'input-email' },
                ].map(({ placeholder, type, id }) => (
                  <input key={id} type={type} placeholder={placeholder} data-testid={id}
                    className="rounded-xl px-4 py-3.5 text-sm text-white outline-none w-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', transition: 'border-color 0.3s' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#4488FF')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')} />
                ))}
              </div>
              <textarea placeholder="Tell us about your interest…" rows={4} data-testid="input-message"
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', transition: 'border-color 0.3s' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#4488FF')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')} />
              <button type="submit" data-testid="button-submit"
                className="w-full py-4 rounded-xl font-bold text-base tracking-wide"
                style={{ background: 'linear-gradient(100deg, #4488FF, #53CFCF)', color: '#02040F', boxShadow: '0 4px 24px rgba(68,136,255,0.30)' }}>
                Send Inquiry →
              </button>
            </form>
          </GlassCard>

          <div className="reveal-element mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(210,228,255,0.30)' }}>
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
