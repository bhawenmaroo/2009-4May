import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "R&D", href: "/rnd" },
  { label: "Lifesciences", href: "/lifesciences" },
  { label: "Agri", href: "/agri" },
  { label: "Scientific", href: "/scientific" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? "12px 32px" : "20px 40px",
        background: scrolled ? "rgba(5,26,14,0.78)" : "rgba(5,26,14,0.35)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: scrolled
          ? "1px solid rgba(120,255,212,0.10)"
          : "1px solid rgba(120,255,212,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/logo.png"
              alt="Indibiotek"
              style={{ height: 38, width: "auto", objectFit: "contain" }}
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? location === "/" : location.startsWith(item.href);
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
                    color: active ? "#7AFFD4" : "rgba(232,245,238,0.78)",
                    letterSpacing: "0.02em",
                    borderRadius: 6,
                    transition: "color 0.2s, background 0.2s",
                    display: "inline-block",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <Link href="/contact" data-testid="link-contact-cta">
          <span
            className="hidden md:inline-block cursor-pointer"
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background:
                "linear-gradient(135deg, rgba(62,230,168,0.22), rgba(90,200,255,0.18))",
              border: "1px solid rgba(122,255,212,0.40)",
              color: "#E8F5EE",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
          >
            Contact Us
          </span>
        </Link>

        {/* Mobile menu */}
        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          data-testid="button-mobile-menu"
          style={{
            background: "transparent",
            border: "1px solid rgba(122,255,212,0.30)",
            color: "#7AFFD4",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden mt-3 rounded-lg"
          style={{
            background: "rgba(5,26,14,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(120,255,212,0.12)",
            padding: 12,
          }}
        >
          {[...NAV, { label: "Contact", href: "/contact" }].map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: 14,
                  color: location === item.href ? "#7AFFD4" : "rgba(232,245,238,0.85)",
                  cursor: "pointer",
                  borderRadius: 6,
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
