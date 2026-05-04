import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const NAV = [
  { label: "About",       href: "/about" },
  { label: "R&D",         href: "/rnd" },
  { label: "Lifesciences",href: "/lifesciences" },
  { label: "Agriculture", href: "/agri" },
  { label: "Scientific",  href: "/scientific" },
  { label: "Services",    href: "/services" },
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
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);

  // Close mobile menu when user scrolls
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 6) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <nav
      data-testid="navbar"
      className="fixed left-1/2 z-50"
      style={{
        top: 14,
        transform: "translateX(-50%)",
        width: "calc(100% - 20px)",
        maxWidth: 1180,
      }}
    >
      <div
        className="mx-auto flex items-center"
        style={{
          padding: "6px 8px 6px 12px",
          gap: 4,
          minWidth: 0,
          background: isDark
            ? scrolled ? "rgba(14,28,20,0.92)" : "rgba(14,28,20,0.78)"
            : scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: isDark
            ? "1px solid rgba(20,181,126,0.22)"
            : "1px solid rgba(14,42,28,0.10)",
          borderRadius: 999,
          boxShadow: scrolled
            ? isDark ? "0 14px 40px rgba(0,0,0,0.45)" : "0 14px 40px rgba(11,28,18,0.14)"
            : isDark ? "0 8px 28px rgba(0,0,0,0.35)" : "0 8px 28px rgba(11,28,18,0.10)",
          transition: "background 0.25s, box-shadow 0.25s, border-color 0.25s",
        }}
      >
        {/* Prominent logo */}
        <Link href="/" data-testid="link-logo">
          <div
            className="cursor-pointer flex items-center min-w-0"
            style={{ marginRight: 8, padding: "2px 0" }}
          >
            <img
              src="/logo.png"
              alt="Indibiotek — Biotech Solutions for People and Planet"
              className="h-7 sm:h-9"
              style={{ width: "auto", display: "block", maxWidth: "100%" }}
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
                    padding: "8px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: isDark
                      ? active ? "#F4F8F5" : "rgba(220,233,223,0.72)"
                      : active ? TEXT_ACT : TEXT_BODY,
                    letterSpacing: "0.005em",
                    borderRadius: 999,
                    transition: "all 0.2s",
                    display: "inline-block",
                    background: active
                      ? isDark ? "rgba(20,181,126,0.22)" : "rgba(20,181,126,0.12)"
                      : "transparent",
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

        {/* Theme toggle — Sun / Moon */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          data-testid="button-theme-toggle"
          className="flex items-center justify-center shrink-0"
          style={{
            width: 34, height: 34, borderRadius: 999,
            background: isDark ? "rgba(200,255,77,0.10)" : "rgba(14,42,28,0.05)",
            border: isDark
              ? "1px solid rgba(200,255,77,0.30)"
              : "1px solid rgba(14,42,28,0.10)",
            color: isDark ? "#C8FF4D" : TEXT_BODY,
            marginLeft: 4,
            cursor: "pointer",
            transition: "background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s",
          }}
        >
          {isDark ? (
            // Sun icon — shown in dark mode (click to go light)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // Moon icon — shown in light mode (click to go dark)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Phone — WhatsApp */}
        <a
          href="https://wa.me/919608768647"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 38, height: 38, borderRadius: 999,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(14,42,28,0.05)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(14,42,28,0.10)",
            color: isDark ? "rgba(220,233,223,0.78)" : TEXT_BODY,
            marginLeft: 4,
          }}
          data-testid="link-phone"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://in.linkedin.com/company/indibiotek-private-limited"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 38, height: 38, borderRadius: 999,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(14,42,28,0.05)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(14,42,28,0.10)",
            color: isDark ? "rgba(220,233,223,0.78)" : TEXT_BODY,
            marginLeft: 4,
          }}
          data-testid="link-linkedin"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
          </svg>
        </a>

        {/* Spacer for mobile to push controls to the right */}
        <div className="flex-1 md:hidden" />

        {/* CONTACT — opens WhatsApp */}
        <a
          href="https://wa.me/919608768647"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-contact-cta"
          className="inline-flex items-center justify-center cursor-pointer shrink-0"
          style={{
            height: 34,
            padding: "0 14px",
            borderRadius: 999,
            background: isDark ? LIME : TEXT_DARK,
            color: isDark ? "#0E2A1C" : LIME,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.10em",
            fontFamily: "Menlo, monospace",
            marginLeft: 4,
            boxShadow: isDark
              ? "0 6px 18px rgba(200,255,77,0.30)"
              : "0 6px 18px rgba(14,42,28,0.22)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          CONTACT
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden shrink-0"
          onClick={() => setOpen((v) => !v)}
          data-testid="button-mobile-menu"
          style={{
            width: 34, height: 34, borderRadius: 999, marginLeft: 4,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(14,42,28,0.05)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(14,42,28,0.10)",
            color: isDark ? "rgba(220,233,223,0.78)" : TEXT_BODY,
            fontSize: 16,
            lineHeight: 1,
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
            background: isDark ? "rgba(14,28,20,0.96)" : "rgba(255,255,255,0.96)",
            backdropFilter: "blur(22px)",
            border: isDark
              ? "1px solid rgba(20,181,126,0.18)"
              : "1px solid rgba(14,42,28,0.08)",
            padding: 12,
            boxShadow: isDark
              ? "0 12px 40px rgba(0,0,0,0.45)"
              : "0 12px 40px rgba(11,28,18,0.10)",
          }}
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: 14,
                  color: isDark
                    ? location.startsWith(item.href) ? "#F4F8F5" : "rgba(220,233,223,0.72)"
                    : location.startsWith(item.href) ? TEXT_ACT : TEXT_BODY,
                  cursor: "pointer",
                  borderRadius: 8,
                  background: location.startsWith(item.href)
                    ? isDark ? "rgba(20,181,126,0.20)" : "rgba(20,181,126,0.10)"
                    : "transparent",
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
