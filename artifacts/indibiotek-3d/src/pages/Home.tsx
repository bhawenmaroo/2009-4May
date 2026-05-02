import { useEffect } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GlassSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative backdrop-blur-md bg-black/25 border border-white/10 rounded-3xl shadow-2xl ${className}`}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/5 via-transparent to-cyan-400/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen text-white" id="main-scroll-container">
      <Navbar />
      <Scene />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end justify-start px-8 md:px-16 pb-20 z-10">
        <div className="max-w-3xl content-section">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-teal-400/40 bg-teal-400/10 rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
            Biotechnology Redefined
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 reveal-element">
            Engineering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300">
              Future of Life
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-xl mb-10 font-light reveal-element">
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges, from our state-of-the-art facilities in India.
          </p>
          <div className="flex flex-wrap gap-4 reveal-element">
            <a
              href="#technology"
              data-testid="button-explore-tech"
              className="px-8 py-4 bg-teal-400 text-slate-900 rounded-full font-bold tracking-wide hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(83,207,207,0.5)] transition-all duration-300"
            >
              Explore Our Tech
            </a>
            <a
              href="#contact"
              data-testid="button-partner-hero"
              className="px-8 py-4 bg-white/10 border border-white/25 text-white rounded-full font-medium tracking-wide hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-medium text-teal-300 rotate-90 origin-center translate-y-6">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-teal-400 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="relative z-10 px-8 md:px-16 py-32">
        <div className="max-w-6xl mx-auto content-section">
          <GlassSection className="p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-5 reveal-element">
                Redefining<br />Biological Boundaries
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-cyan-300 mb-8 rounded-full reveal-element" />
              <p className="text-white/75 font-light leading-relaxed mb-5 reveal-element">
                At Indibiotek Private Limited, we view biology not just as a science, but as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions.
              </p>
              <p className="text-white/65 font-light leading-relaxed reveal-element">
                Our multidisciplinary team of researchers, computational biologists, and engineers work at the intersection of nature and digital innovation to create sustainable therapies and materials for the next century.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 reveal-element">
              {[
                { num: '15+', label: 'Active Research Pipelines' },
                { num: '4', label: 'Global Partnerships' },
                { num: '100%', label: 'Commitment to Innovation' },
              ].map(({ num, label }) => (
                <div key={label} className="border border-teal-400/20 bg-teal-400/5 rounded-2xl px-8 py-6 flex items-center gap-6">
                  <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 shrink-0">{num}</div>
                  <div className="text-white/80 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </GlassSection>
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────── */}
      <section id="technology" className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto content-section">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 backdrop-blur-sm rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-5 reveal-element">
              Our Capabilities
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 reveal-element">
              Proprietary Platforms
            </h2>
            <p className="text-white/60 max-w-xl mx-auto font-light reveal-element">
              An interconnected ecosystem of bio-technologies that accelerates discovery from months to days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Synthetic Biology',
                desc: 'Engineering novel biological systems and redesigning existing ones for useful purposes.',
                icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
              },
              {
                title: 'Computational Discovery',
                desc: 'AI-driven molecular modeling to predict interactions and optimize therapeutic candidates.',
                icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              },
              {
                title: 'Precision Biomanufacturing',
                desc: 'Scaling up biological processes with unprecedented control and environmental sustainability.',
                icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
              },
            ].map((tech, idx) => (
              <GlassSection key={idx} className="p-8 reveal-element group hover:border-teal-400/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-2xl bg-teal-400/15 flex items-center justify-center mb-5 text-teal-300 group-hover:bg-teal-400/25 transition-colors">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tech.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">{tech.title}</h3>
                <p className="text-white/55 font-light leading-relaxed text-sm">{tech.desc}</p>
              </GlassSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ─────────────────────────────────────── */}
      <section id="solutions" className="relative z-10 px-8 md:px-16 py-24">
        <div className="max-w-5xl mx-auto content-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 backdrop-blur-sm rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-5 reveal-element">
                Therapeutics & Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold reveal-element">
                From Sequence to Scale
              </h2>
            </div>
            <p className="text-white/60 font-light max-w-sm reveal-element">
              A robust pipeline addressing critical unmet needs in healthcare and industry.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { name: 'IBT-001 (Oncology)', phase: 'Pre-clinical', desc: 'Targeted nanoparticle therapy for solid tumors.' },
              { name: 'SynEnzymes', phase: 'Commercial', desc: 'Custom-engineered biocatalysts for industrial applications.' },
              { name: 'BioMaterials', phase: 'Development', desc: 'Sustainable alternatives to petroleum-based polymers.' },
            ].map((item, idx) => (
              <GlassSection key={idx} className="px-8 py-7 reveal-element group hover:border-teal-400/30 transition-all duration-500">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-300 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 rounded-l-3xl" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-1 group-hover:text-teal-300 transition-colors">{item.name}</h3>
                    <p className="text-white/55 font-light text-sm">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="px-4 py-1.5 border border-teal-400/30 bg-teal-400/10 rounded-full text-xs font-bold tracking-widest uppercase text-teal-300">
                      {item.phase}
                    </span>
                    <button
                      className="w-9 h-9 rounded-full border border-teal-400/40 text-teal-300 flex items-center justify-center hover:bg-teal-400 hover:text-slate-900 transition-colors"
                      data-testid={`btn-explore-${idx}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </GlassSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="relative z-10 px-8 md:px-16 py-32">
        <div className="max-w-3xl mx-auto text-center content-section">
          <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 backdrop-blur-sm rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
            Connect
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 reveal-element">
            Shape the Future With Us
          </h2>
          <p className="text-white/65 mb-12 font-light max-w-lg mx-auto reveal-element">
            Whether you are an investor, researcher, or potential partner, we invite you to join us in engineering tomorrow.
          </p>
          <GlassSection className="p-8 md:p-10 reveal-element text-left">
            <form onSubmit={(e) => e.preventDefault()} data-testid="contact-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  data-testid="input-name"
                  className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 text-white placeholder:text-white/35 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  data-testid="input-email"
                  className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 text-white placeholder:text-white/35 transition-colors text-sm"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={4}
                data-testid="input-message"
                className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 text-white placeholder:text-white/35 transition-colors resize-none text-sm"
              />
              <button
                type="submit"
                data-testid="button-submit"
                className="w-full bg-teal-400 hover:bg-cyan-300 text-slate-900 font-bold py-4 rounded-xl transition-all duration-300 tracking-wide hover:shadow-[0_0_30px_rgba(83,207,207,0.4)]"
              >
                Send Inquiry
              </button>
            </form>
          </GlassSection>
          <div className="mt-10 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/35 reveal-element">
            <p>&copy; {new Date().getFullYear()} Indibiotek Private Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-teal-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-teal-300 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
