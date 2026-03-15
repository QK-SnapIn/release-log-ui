import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/releaslyy-logo-main.png";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const handleNav = (href, isPage) => {
    if (isPage) { navigate(href); } else { window.location.hash = href.replace('#', ''); }
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? "rgba(255,255,255,.85)" : "transparent",
      backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(1.4)" : "none",
      borderBottom: scrolled || menuOpen ? "1px solid var(--land-border)" : "1px solid transparent",
      transition: "all .35s ease",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => { navigate('/'); setMenuOpen(false); }}>
          <img src={logo} alt="Releaslyy" style={{ height: 30 }} />
        </div>
        <button className="land-nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen
            ? <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            : <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          }
        </button>
        <div className={`land-nav-links${menuOpen ? ' open' : ''}`}>
          {["Features", "Pricing", "Docs"].map((t) => {
            const isPage = t === "Pricing" || t === "Docs";
            const href = isPage ? `/${t.toLowerCase()}` : `#${t.toLowerCase()}`;
            return (
              <a key={t}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href, isPage); }}
                style={{ fontSize: 14, color: "var(--land-muted)", fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={(e) => e.target.style.color = "var(--land-text)"}
                onMouseLeave={(e) => e.target.style.color = "var(--land-muted)"}
              >{t}</a>
            );
          })}
          <button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="land-btn land-btn-p" style={{ padding: "8px 20px", fontSize: 13 }}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}
