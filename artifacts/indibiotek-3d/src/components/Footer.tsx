import { Link } from "wouter";

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-24"
      data-testid="footer"
      style={{
        background: "linear-gradient(180deg, #ECF3EE 0%, #DCE9DF 100%)",
        borderTop: "1px solid rgba(20,181,126,0.18)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <img
              src="/logo.png"
              alt="Indibiotek"
              style={{ height: 44, width: "auto", marginBottom: 18 }}
            />
            <p
              style={{
                color: "rgba(14,42,28,0.70)",
                fontSize: 13,
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              Pioneering biotechnologies across lifesciences, agriculture, healthcare and waste management.
            </p>
          </div>

          {[
            {
              title: "Divisions",
              items: [
                ["Lifesciences", "/lifesciences"],
                ["Agri", "/agri"],
                ["Scientific", "/scientific"],
                ["R&D", "/rnd"],
              ],
            },
            {
              title: "Company",
              items: [
                ["About Us", "/about"],
                ["Services", "/services"],
                ["Careers", "/careers"],
                ["Contact Us", "/contact"],
              ],
            },
            {
              title: "Get in Touch",
              items: [
                ["info@indibiotek.com", "mailto:info@indibiotek.com"],
                ["+91 — Headquarters", "/contact"],
                ["India", "/contact"],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  color: "#0B6A4D",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.items.map(([label, href]) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    {href.startsWith("/") ? (
                      <Link href={href}>
                        <span
                          className="cursor-pointer"
                          style={{
                            color: "rgba(14,42,28,0.72)",
                            fontSize: 13.5,
                          }}
                        >
                          {label}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={href}
                        style={{
                          color: "rgba(14,42,28,0.72)",
                          fontSize: 13.5,
                          textDecoration: "none",
                        }}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(20,181,126,0.18)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
            color: "rgba(14,42,28,0.55)",
            fontSize: 12.5,
          }}
        >
          <span>© {new Date().getFullYear()} Indibiotek Private Limited. All rights reserved.</span>
          <span>Designed with care for the future of biology.</span>
        </div>
      </div>
    </footer>
  );
}
