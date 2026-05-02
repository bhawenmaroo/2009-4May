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

const LIME = "#C8FF4D";
const PILL_BG = "rgba(14,28,20,0.78)";
const PILL_BORDER = "rgba(255,255,255,0.08)";
const TXT = "rgba(255,255,255,0.78)";
const TXT_ACT = "#FFFFFF";

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      data-testid="navbar"
      className="fixed left-1/2 z-50"
      style={{
        top: 18,
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: 1180,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: 6,
          paddingLeft: 18,
          background: PILL_BG,
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: `1px solid ${PILL_BORDER}`,
          borderRadius: 16,
          boxShadow: scrolled
            ? "0 18px 50px rgba(11,28,18,0.35)"
            : "0 10px 30px rgba(11,28,18,0.20)",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <div
            className="cursor-pointer flex items-center gap-2"
            style={{ paddingRight: 14, marginRight: 4 }}
          >
            <img src="/logo.png" alt="Indibiotek" style={{ height: 28, width: "auto" }} />
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
                    padding: "10px 9px",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: active ? TXT_ACT : TXT,
                    letterSpacing: "0.005em",
                    borderRadius: 8,
                    transition: "all 0.2s",
                    display: "inline-block",
                    background: active ? "rgba(255,255,255,0.06)" : "transparent",
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

        {/* Ask Indibiotek search bar (decorative) — only on very wide screens */}
        <div
          className="hidden 2xl:flex items-center"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 10,
            padding: "0 12px 0 12px",
            height: 38,
            gap: 8,
            minWidth: 200,
            color: "rgba(255,255,255,0.45)",
            fontSize: 12.5,
            fontFamily: "Menlo, monospace",
          }}
          data-testid="search-ask"
        >
          {/* sparkle icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L13.5 9 L20.5 10.5 L13.5 12 L12 19 L10.5 12 L3.5 10.5 L10.5 9 Z"
              fill={LIME}
              opacity="0.95"
            />
            <circle cx="19" cy="5" r="1.5" fill={LIME} opacity="0.7" />
            <circle cx="4.5" cy="17" r="1" fill={LIME} opacity="0.5" />
          </svg>
          <input
            type="text"
            placeholder="Ask Indibiotek"
            className="bg-transparent outline-none border-0"
            style={{
              flex: 1,
              minWidth: 0,
              color: "#FFF",
              fontSize: 12.5,
              fontFamily: "inherit",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>→</span>
        </div>

        {/* Phone */}
        <a
          href="tel:+91"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 40, height: 38, borderRadius: 10,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: TXT,
          }}
          data-testid="link-phone"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>

        {/* DEMO white button */}
        <Link href="/contact" data-testid="link-demo">
          <span
            className="hidden md:inline-flex items-center justify-center cursor-pointer"
            style={{
              height: 38, padding: "0 18px", borderRadius: 10,
              background: "#FFFFFF",
              color: "#0E2A1C",
              fontSize: 12.5, fontWeight: 700, letterSpacing: "0.10em",
              fontFamily: "Menlo, monospace",
            }}
          >
            DEMO
          </span>
        </Link>

        {/* CONTACT lime button */}
        <Link href="/contact" data-testid="link-contact-cta">
          <span
            className="inline-flex items-center justify-center cursor-pointer"
            style={{
              height: 38, padding: "0 18px", borderRadius: 10,
              background: LIME,
              color: "#0E2A1C",
              fontSize: 12.5, fontWeight: 700, letterSpacing: "0.10em",
              fontFamily: "Menlo, monospace",
              boxShadow: "0 6px 18px rgba(200,255,77,0.25)",
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
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: TXT,
          }}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden mt-2 rounded-2xl"
          style={{
            background: PILL_BG,
            backdropFilter: "blur(22px)",
            border: `1px solid ${PILL_BORDER}`,
            padding: 12,
            boxShadow: "0 12px 40px rgba(11,28,18,0.30)",
          }}
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: 14,
                  color: location.startsWith(item.href) ? TXT_ACT : TXT,
                  cursor: "pointer",
                  borderRadius: 8,
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
