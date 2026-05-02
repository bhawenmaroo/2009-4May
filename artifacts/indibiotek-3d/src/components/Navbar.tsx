import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav
      data-testid="navbar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '16px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(16px)',
        background: 'rgba(6,3,0,0.65)',
        borderBottom: '1px solid rgba(255,180,60,0.08)',
        animation: 'navbarIn 0.7s ease-out both',
      }}
    >
      <style>{`
        @keyframes navbarIn {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
      `}</style>

      <Link href="/">
        <img src="/logo.png" alt="Indibiotek" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['About', 'Technology', 'Solutions', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-testid={`link-${item.toLowerCase()}`}
            style={{
              color: 'rgba(255,240,220,0.75)',
              fontSize: 12, fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FF9A00')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,240,220,0.75)')}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          data-testid="button-partner"
          style={{
            padding: '9px 22px',
            background: 'transparent',
            border: '1px solid rgba(255,150,30,0.50)',
            color: '#FF9A00',
            fontWeight: 700, fontSize: 12,
            borderRadius: 3,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'rgba(255,150,30,0.15)';
            (e.target as HTMLElement).style.borderColor = '#FF9A00';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'transparent';
            (e.target as HTMLElement).style.borderColor = 'rgba(255,150,30,0.50)';
          }}
        >
          Partner With Us
        </a>
      </div>
    </nav>
  );
}
