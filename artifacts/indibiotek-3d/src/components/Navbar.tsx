import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav
      data-testid="navbar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        background: 'rgba(5,8,16,0.70)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
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
        <img src="/logo.png" alt="Indibiotek" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['About', 'Technology', 'Solutions', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-testid={`link-${item.toLowerCase()}`}
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#53CFCF')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.85)')}
          >
            {item}
          </a>
        ))}

        <a
          href="#contact"
          data-testid="button-partner"
          style={{
            padding: '10px 24px',
            background: '#53CFCF',
            color: '#050810',
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 999,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = '#6EDDDD';
            (e.target as HTMLElement).style.boxShadow = '0 0 24px rgba(83,207,207,0.45)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = '#53CFCF';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        >
          Partner With Us
        </a>
      </div>
    </nav>
  );
}
