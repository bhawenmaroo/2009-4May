import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between"
      data-testid="navbar"
      style={{
        animation: 'navbarSlideIn 0.8s ease-out forwards',
        backdropFilter: 'blur(12px)',
        background: 'rgba(5,8,16,0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <style>{`
        @keyframes navbarSlideIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <Link href="/" className="flex items-center">
        <img src="/logo.png" alt="Indibiotek Logo" className="h-10 md:h-12 w-auto object-contain" />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {['About', 'Technology', 'Solutions', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white hover:text-[#53CFCF] transition-colors uppercase tracking-widest"
            data-testid={`link-${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          className="px-6 py-2.5 bg-[#53CFCF] text-[#050810] font-bold rounded-full hover:bg-[#6EDDDD] transition-all duration-300 text-sm tracking-wide"
          data-testid="button-partner"
        >
          Partner With Us
        </a>
      </div>
    </nav>
  );
}
