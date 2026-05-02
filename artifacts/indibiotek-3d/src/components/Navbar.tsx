import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between animate-navbar"
      data-testid="navbar"
      style={{ animation: 'navbarSlideIn 1s ease-out forwards' }}
    >
      <style>{`
        @keyframes navbarSlideIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-navbar { animation: navbarSlideIn 1s ease-out forwards; }
      `}</style>
      <Link href="/" className="flex items-center gap-3 group">
        <img
          src="/logo.png"
          alt="Indibiotek Logo"
          className="h-10 md:h-14 w-auto object-contain"
        />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {['About', 'Technology', 'Solutions', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white/70 hover:text-primary transition-colors uppercase tracking-widest"
            data-testid={`link-${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          className="px-6 py-2.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full font-medium tracking-wide text-sm"
          data-testid="button-partner"
        >
          Partner With Us
        </a>
      </div>
    </nav>
  );
}
