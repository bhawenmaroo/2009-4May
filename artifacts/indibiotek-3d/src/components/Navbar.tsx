import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

const NAV = [
  { label: "About",       href: "/about" },
  { label: "R&D",         href: "/rnd" },
  { label: "Lifesciences",href: "/lifesciences" },
  { label: "Agri",        href: "/agri" },
  { label: "Scientific",  href: "/scientific" },
  { label: "Services",    href: "/services" },
  { label: "Careers",     href: "/careers" },
];

const LIME       = "#C8FF4D";
const ACCENT     = "#0B6A4D";
const TEXT_DARK  = "#0E2A1C";
const TEXT_BODY  = "rgba(14,42,28,0.72)";
const TEXT_ACT   = "#0E2A1C";

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(14,42,28,0.10)"
          : "1px solid rgba(14,42,28,0.06)",
        boxShadow: scrolled
          ? "0 6px 24px rgba(11,28,18,0.08)"
          : "0 1px 0 rgba(14,42,28,0.03)",
        transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
      }}
    >
      <div
        className="mx-auto flex items-center"
        style={{
          maxWidth: 1320,
          padding: "12px 24px",
          gap: 4,
        }}
      >
        {/* Prominent logo */}
        <Link href="/" data-testid="link-logo">
          <div
            className="cursor-pointer flex items-center"
            style={{ marginRight: 18, padding: "4px 0" }}
          >
            <img
              src="/logo.png"
              alt="Indibiotek — Biotech Solutions for People and Planet"
              style={{ height: 44, width: "auto", display: "block" }}
            />
          </div>
        </Link>

        {/* Nav items */}
        <div className="hidden md:flex items-center" style={{ gap: 0 }}>
          {NAV.map((item) => {
            const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-${item.label.toLowerCase().replace(/[^a-z]/g, "")}`}
              >
                <span
                  className="cursor-pointer"
                  style={{
                    padding: "10px 12px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: active ? TEXT_ACT : TEXT_BODY,
                    letterSpacing: "0.005em",
                    borderRadius: 8,
                    transition: "all 0.2s",
                    display: "inline-block",
                    background: active ? "rgba(20,181,126,0.10)" : "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden md:block" />

        {/* Ask Indibiotek search bar — only on very wide screens */}
        <div
          className="hidden 2xl:flex items-center"
          style={{
            background: "rgba(14,42,28,0.04)",
            border: "1px solid rgba(14,42,28,0.10)",
            borderRadius: 10,
            padding: "0 12px",
            height: 38,
            gap: 8,
            minWidth: 200,
            color: TEXT_BODY,
            fontSize: 12.5,
            fontFamily: "Menlo, monospace",
          }}
          data-testid="search-ask"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L13.5 9 L20.5 10.5 L13.5 12 L12 19 L10.5 12 L3.5 10.5 L10.5 9 Z"
              fill={ACCENT}
              opacity="0.95"
            />
            <circle cx="19" cy="5" r="1.5" fill={ACCENT} opacity="0.7" />
            <circle cx="4.5" cy="17" r="1" fill={ACCENT} opacity="0.5" />
          </svg>
          <input
            type="text"
            placeholder="Ask Indibiotek"
            className="bg-transparent outline-none border-0"
            style={{
              flex: 1, minWidth: 0,
              color: TEXT_DARK, fontSize: 12.5, fontFamily: "inherit",
            }}
          />
          <span style={{ color: TEXT_BODY, fontSize: 14 }}>→</span>
        </div>

        {/* Phone */}
        <a
          href="tel:+91"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 40, height: 38, borderRadius: 10,
            background: "rgba(14,42,28,0.04)",
            border: "1px solid rgba(14,42,28,0.10)",
            color: TEXT_BODY,
            marginLeft: 4,
          }}
          data-testid="link-phone"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>

        {/* DEMO outlined dark */}
        <Link href="/contact" data-testid="link-demo">
          <span
            className="hidden md:inline-flex items-center justify-center cursor-pointer"
            style={{
              height: 38, padding: "0 18px", borderRadius: 10,
              background: "transparent",
              color: TEXT_DARK,
              border: `1px solid ${TEXT_DARK}`,
              fontSize: 12.5, fontWeight: 700, letterSpacing: "0.10em",
              fontFamily: "Menlo, monospace",
              marginLeft: 4,
            }}
          >
            DEMO
          </span>
        </Link>

        {/* CONTACT — solid dark forest with lime hover (matches light ribbon better) */}
        <Link href="/contact" data-testid="link-contact-cta">
          <span
            className="inline-flex items-center justify-center cursor-pointer"
            style={{
              height: 38, padding: "0 18px", borderRadius: 10,
              background: TEXT_DARK,
              color: LIME,
              fontSize: 12.5, fontWeight: 700, letterSpacing: "0.10em",
              fontFamily: "Menlo, monospace",
              marginLeft: 4,
              boxShadow: "0 6px 18px rgba(14,42,28,0.20)",
            }}
          >
            CONTACT
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          data-testid="button-mobile-menu"
          style={{
            width: 40, height: 38, borderRadius: 10, marginLeft: 4,
            background: "rgba(14,42,28,0.04)",
            border: "1px solid rgba(14,42,28,0.10)",
            color: TEXT_BODY,
          }}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden mx-4 mb-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(22px)",
            border: "1px solid rgba(14,42,28,0.08)",
            padding: 12,
            boxShadow: "0 12px 40px rgba(11,28,18,0.10)",
          }}
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: 14,
                  color: location.startsWith(item.href) ? TEXT_ACT : TEXT_BODY,
                  cursor: "pointer",
                  borderRadius: 8,
                  background: location.startsWith(item.href) ? "rgba(20,181,126,0.10)" : "transparent",
                }}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
