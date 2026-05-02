import React, { useEffect, useRef } from 'react';
import { Scene } from '@/components/Scene';
import { Navbar } from '@/components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup scroll triggers for text reveals
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
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30 selection:text-primary" id="main-scroll-container" ref={mainRef}>
      <Navbar />
      <Scene />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 z-10">
        <div className="max-w-5xl w-full mx-auto text-center content-section">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 reveal-element">
            Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future of Life</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 font-light reveal-element">
            Pioneering breakthrough biotechnologies to solve humanity's most complex challenges from our state-of-the-art facilities in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-element">
            <a href="#technology" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium tracking-wide hover:shadow-[0_0_30px_rgba(83,207,207,0.4)] transition-all duration-300 w-full sm:w-auto">
              Explore Our Tech
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center content-section">
          <div>
            <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 reveal-element">
              Redefining Biological Boundaries
            </h2>
            <div className="w-20 h-1 bg-primary mb-8 reveal-element"></div>
            <p className="text-lg text-white/70 mb-6 font-light leading-relaxed reveal-element">
              At Indibiotek Private Limited, we view biology not just as a science, but as the most powerful technology platform on Earth. Based in India, we leverage global expertise to build scalable biotech solutions.
            </p>
            <p className="text-lg text-white/70 font-light leading-relaxed reveal-element">
              Our multidisciplinary team of researchers, computational biologists, and engineers are working at the intersection of nature and digital innovation to create sustainable therapies and materials for the next century.
            </p>
          </div>
          <div className="h-full min-h-[400px] border border-white/10 bg-black/20 backdrop-blur-md rounded-2xl p-8 reveal-element relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 flex flex-col justify-end h-full">
              <div className="text-6xl font-display font-bold text-primary mb-2">15+</div>
              <div className="text-xl font-medium mb-8">Active Research Pipelines</div>
              
              <div className="text-6xl font-display font-bold text-primary mb-2">4</div>
              <div className="text-xl font-medium mb-8">Global Partnerships</div>
              
              <div className="text-6xl font-display font-bold text-primary mb-2">100%</div>
              <div className="text-xl font-medium">Commitment to Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24 bg-gradient-to-b from-transparent via-black/50 to-transparent">
        <div className="max-w-6xl w-full mx-auto content-section">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
              Our Capabilities
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 reveal-element">
              Proprietary Platforms
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light reveal-element">
              We've built an interconnected ecosystem of bio-technologies that accelerate discovery from months to days.
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
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              }
            ].map((tech, idx) => (
              <div key={idx} className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl hover:border-primary/50 transition-colors duration-500 reveal-element">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tech.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">{tech.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / Products */}
      <section id="solutions" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24">
        <div className="max-w-5xl w-full mx-auto content-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
                Therapeutics & Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold reveal-element">
                From Sequence to Scale
              </h2>
            </div>
            <div className="reveal-element">
              <p className="text-white/60 font-light max-w-md">We are advancing a robust pipeline of solutions designed to address critical unmet needs in healthcare and industry.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {[
              { name: "IBT-001 (Oncology)", phase: "Pre-clinical", desc: "Targeted nanoparticle therapy for solid tumors." },
              { name: "SynEnzymes", phase: "Commercial", desc: "Custom-engineered biocatalysts for industrial applications." },
              { name: "BioMaterials", phase: "Development", desc: "Sustainable alternatives to petroleum-based polymers." }
            ].map((item, idx) => (
              <div key={idx} className="group relative border border-white/10 bg-black/40 backdrop-blur-md p-8 rounded-2xl overflow-hidden reveal-element hover:bg-white/5 transition-all duration-500">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-white/60 font-light">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 border border-white/20 rounded-full text-sm font-medium tracking-wide uppercase">
                      {item.phase}
                    </span>
                    <button className="w-10 h-10 rounded-full border border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-colors" data-testid={`btn-explore-${idx}`}>
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

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen flex items-center px-6 md:px-12 z-10 py-24 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-4xl w-full mx-auto text-center content-section">
          <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6 reveal-element">
            Connect
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 reveal-element">
            Shape the Future With Us
          </h2>
          <p className="text-xl text-white/60 mb-12 font-light max-w-2xl mx-auto reveal-element">
            Whether you are an investor, researcher, or potential partner, we invite you to join us in engineering tomorrow.
          </p>
          
          <form className="max-w-lg mx-auto space-y-4 mb-16 reveal-element" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white w-full transition-colors" />
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white w-full transition-colors" />
            </div>
            <textarea placeholder="Message" rows={4} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white w-full transition-colors resize-none"></textarea>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-lg transition-colors tracking-wide">
              Send Inquiry
            </button>
          </form>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 reveal-element">
            <p>&copy; {new Date().getFullYear()} Indibiotek Private Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
