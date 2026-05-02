import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav
      data-testid="navbar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '14px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        background: 'rgba(2,4,15,0.75)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
        <img src="/logo.png" alt="Indibiotek" style={{ height: 42, width: 'auto', objectFit: 'contain' }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['About', 'Technology', 'Solutions', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-testid={`link-${item.toLowerCase()}`}
            style={{
              color: 'rgba(220,235,255,0.80)',
              fontSize: 13, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#4488FF')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(220,235,255,0.80)')}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          data-testid="button-partner"
          style={{
            padding: '10px 22px',
            background: 'linear-gradient(100deg, #4488FF, #53CFCF)',
            color: '#02040F',
            fontWeight: 700, fontSize: 13,
            borderRadius: 999,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(68,136,255,0.30)',
            transition: 'opacity 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '0.85'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '1'; }}
        >
          Partner With Us
        </a>
      </div>
    </nav>
  );
}
