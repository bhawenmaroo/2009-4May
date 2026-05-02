import { useEffect } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function VideoBg({ src, overlay = "rgba(5,20,30,0.35)" }: { src: string; overlay?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(1.15) saturate(1.3)' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach((section: any) => {
      const elements = section.querySelectorAll('.reveal-element');
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-primary/30 selection:text-primary" id="main-scroll-container">
      <Navbar />
      <Scene />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 z-10 overflow-hidden">
        <VideoBg src="/dna_hero_bg.mp4" overlay="rgba(2,20,28,0.18)" />
        <div className="relative z-10 max-w-5xl w-full mx-auto text-center content-section">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-teal-400/40 bg-teal-400/10 rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-8 reveal-element backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
            Biotechnology Redefined
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 reveal-element drop-shadow-2xl">
            Engineering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300">
              Future of Life
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-light reveal-element drop-shadow-lg">
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges, from our state-of-the-art facilities in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-element">
            <a
              href="#technology"
              data-testid="button-explore-tech"
              className="px-8 py-4 bg-teal-400 text-slate-900 rounded-full font-bold tracking-wide hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(83,207,207,0.6)] transition-all duration-300 w-full sm:w-auto text-base"
            >
              Explore Our Tech
            </a>
            <a
              href="#contact"
              data-testid="button-partner-hero"
              className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white/20 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto text-base"
            >
              Partner With Us
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
          <span className="text-xs uppercase tracking-widest font-medium text-teal-300">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-teal-400 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────── */}
      <section id="about" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, #0d3d4a 0%, #155e70 50%, #0a4050 100%)' }}
        />
        <div className="absolute inset-0 z-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #53CFCF 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center content-section">
          <div>
            <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 reveal-element text-white">
              Redefining Biological Boundaries
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-300 mb-8 reveal-element rounded-full" />
            <p className="text-lg text-white/80 mb-6 font-light leading-relaxed reveal-element">
              At Indibiotek Private Limited, we view biology not just as a science, but as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions.
            </p>
            <p className="text-lg text-white/70 font-light leading-relaxed reveal-element">
              Our multidisciplinary team of researchers, computational biologists, and engineers work at the intersection of nature and digital innovation to create sustainable therapies and materials for the next century.
            </p>
          </div>
          <div className="h-full min-h-[400px] border border-teal-400/20 bg-teal-900/20 backdrop-blur-md rounded-2xl p-8 reveal-element relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col justify-end h-full gap-8">
              {[
                { num: '15+', label: 'Active Research Pipelines' },
                { num: '4', label: 'Global Partnerships' },
                { num: '100%', label: 'Commitment to Innovation' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 mb-1">{num}</div>
                  <div className="text-lg font-medium text-white/90">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ──────────────────────────────────── */}
      <section id="technology" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24 overflow-hidden">
        <VideoBg src="/molecular_tech_bg.mp4" overlay="rgba(3,30,40,0.22)" />
        <div className="relative z-10 max-w-6xl w-full mx-auto content-section">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 backdrop-blur-sm rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
              Our Capabilities
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 reveal-element drop-shadow-lg">
              Proprietary Platforms
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light reveal-element">
              An interconnected ecosystem of bio-technologies that accelerates discovery from months to days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Synthetic Biology",
                desc: "Engineering novel biological systems and redesigning existing ones for useful purposes.",
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              },
              {
                title: "Computational Discovery",
                desc: "AI-driven molecular modeling to predict interactions and optimize therapeutic candidates.",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              },
              {
                title: "Precision Biomanufacturing",
                desc: "Scaling up biological processes with unprecedented control and environmental sustainability.",
                icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
              }
            ].map((tech, idx) => (
              <div key={idx} className="p-8 border border-teal-400/20 bg-white/5 backdrop-blur-md rounded-2xl hover:border-teal-400/60 hover:bg-teal-400/5 transition-all duration-500 reveal-element group">
                <div className="w-14 h-14 rounded-full bg-teal-400/20 flex items-center justify-center mb-6 text-teal-300 group-hover:bg-teal-400/30 transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tech.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-white">{tech.title}</h3>
                <p className="text-white/65 font-light leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ───────────────────────────────────── */}
      <section id="solutions" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24 overflow-hidden">
        <VideoBg src="/lab_bg.mp4" overlay="rgba(3,20,15,0.22)" />
        <div className="relative z-10 max-w-5xl w-full mx-auto content-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 backdrop-blur-sm rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
                Therapeutics & Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold reveal-element drop-shadow-lg">
                From Sequence to Scale
              </h2>
            </div>
            <p className="text-white/70 font-light max-w-md reveal-element">
              A robust pipeline of solutions addressing critical unmet needs in healthcare and industry.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { name: "IBT-001 (Oncology)", phase: "Pre-clinical", desc: "Targeted nanoparticle therapy for solid tumors." },
              { name: "SynEnzymes", phase: "Commercial", desc: "Custom-engineered biocatalysts for industrial applications." },
              { name: "BioMaterials", phase: "Development", desc: "Sustainable alternatives to petroleum-based polymers." }
            ].map((item, idx) => (
              <div key={idx} className="group relative border border-white/15 bg-black/25 backdrop-blur-md p-8 rounded-2xl overflow-hidden reveal-element hover:bg-white/10 hover:border-teal-400/40 transition-all duration-500">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-300 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-l-2xl" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-teal-300 transition-colors text-white">{item.name}</h3>
                    <p className="text-white/65 font-light">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 border border-teal-400/30 bg-teal-400/10 rounded-full text-sm font-medium tracking-wide uppercase text-teal-300">
                      {item.phase}
                    </span>
                    <button
                      className="w-10 h-10 rounded-full border border-teal-400/50 text-teal-300 flex items-center justify-center hover:bg-teal-400 hover:text-slate-900 transition-colors"
                      data-testid={`btn-explore-${idx}`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, #0f3d50 0%, #155e72 40%, #0a3a4a 100%)' }}
        />
        <div className="absolute inset-0 z-0 opacity-45"
          style={{ backgroundImage: 'radial-gradient(ellipse at 30% 60%, #53CFCF 0%, transparent 55%)' }}
        />
        <div className="relative z-10 max-w-4xl w-full mx-auto text-center content-section">
          <div className="inline-block px-3 py-1 border border-teal-400/40 bg-teal-400/10 backdrop-blur-sm rounded-full text-teal-300 text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
            Connect
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 reveal-element drop-shadow-lg">
            Shape the Future With Us
          </h2>
          <p className="text-xl text-white/75 mb-12 font-light max-w-2xl mx-auto reveal-element">
            Whether you are an investor, researcher, or potential partner, we invite you to join us in engineering tomorrow.
          </p>
          <form
            className="max-w-lg mx-auto space-y-4 mb-16 reveal-element"
            onSubmit={(e) => e.preventDefault()}
            data-testid="contact-form"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                data-testid="input-name"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 text-white w-full transition-colors placeholder:text-white/40 backdrop-blur-sm"
              />
              <input
                type="email"
                placeholder="Email"
                data-testid="input-email"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 text-white w-full transition-colors placeholder:text-white/40 backdrop-blur-sm"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={4}
              data-testid="input-message"
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 text-white w-full transition-colors resize-none placeholder:text-white/40 backdrop-blur-sm"
            />
            <button
              type="submit"
              data-testid="button-submit"
              className="w-full bg-teal-400 hover:bg-cyan-300 text-slate-900 font-bold py-4 rounded-lg transition-colors tracking-wide hover:shadow-[0_0_30px_rgba(83,207,207,0.5)]"
            >
              Send Inquiry
            </button>
          </form>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/45 reveal-element">
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
