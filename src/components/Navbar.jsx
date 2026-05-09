import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showScrolled = scrolled || !isHome

  const homeLinks = [
    { label: 'Services',   href: '#services'    },
    { label: 'Products',   href: '#products'    },
    { label: 'Why Klair',  href: '#why-klair'   },
    { label: 'Blog',       href: '/blog',       isRoute: true },
    { label: 'Monitoring', href: '/login',      isRoute: true },
    { label: 'Contact',    href: '#contact'     },
  ]

  return (
    <>
      <style>{`
        /* ── Base nav ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
        }

        /* ── Glass pill wrapper (always visible) ── */
        .nav__glass {
          margin: 14px 24px;
          border-radius: 16px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

          /* Dark glass — default (over dark hero) */
          background: rgba(15, 17, 35, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
        }

        /* ── Scrolled: light glass ── */
        .nav--scrolled .nav__glass {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow:
            0 4px 32px rgba(15, 23, 42, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          margin: 10px 24px;
        }

        /* ── Logo ── */
        .nav__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav__logo-mark {
          width: 34px;
          height: 34px;
          background: var(--burgundy);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          font-weight: 400;
          letter-spacing: -0.02em;
          box-shadow: 0 2px 8px rgba(124, 28, 46, 0.4);
          flex-shrink: 0;
        }
        .nav__logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }
        .nav__logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 16px;
          color: var(--burgundy);
          letter-spacing: -0.01em;
        }
        .nav__logo-sub {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          transition: color 0.4s;
        }
        .nav--scrolled .nav__logo-sub {
          color: rgba(15, 23, 42, 0.45);
        }

        /* ── Desktop links ── */
        .nav__links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav__link {
          font-size: 13.5px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          color: rgba(255, 255, 255, 0.72);
        }
        .nav__link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.08);
        }
        .nav__link--active {
          color: white !important;
          background: rgba(255, 255, 255, 0.12) !important;
          font-weight: 600;
        }
        .nav--scrolled .nav__link {
          color: rgba(15, 23, 42, 0.65);
        }
        .nav--scrolled .nav__link:hover {
          color: var(--burgundy);
          background: rgba(124, 28, 46, 0.06);
        }
        .nav--scrolled .nav__link--active {
          color: var(--burgundy) !important;
          background: rgba(124, 28, 46, 0.08) !important;
        }

        /* ── Monitoring link gets a subtle live dot ── */
        .nav__link--monitoring {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav__link--monitoring::after {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00e5ff;
          opacity: 0.8;
          animation: nav-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes nav-blink { 0%,100%{opacity:0.8} 50%{opacity:0.2} }

        /* ── CTA button ── */
        .nav__cta {
          font-size: 13px;
          font-weight: 600;
          color: white;
          background: var(--burgundy);
          border: none;
          border-radius: 8px;
          padding: 8px 18px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(124, 28, 46, 0.35);
          white-space: nowrap;
        }
        .nav__cta:hover {
          background: #9b1e35;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(124, 28, 46, 0.45);
        }

        /* ── Hamburger ── */
        .nav__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
        }
        .nav__hamburger span {
          display: block;
          width: 20px;
          height: 1.5px;
          border-radius: 2px;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.8);
        }
        .nav--scrolled .nav__hamburger span {
          background: var(--dark);
        }

        /* ── Mobile menu ── */
        .nav__mobile {
          display: none;
          flex-direction: column;
          padding: 8px 24px 16px;
          gap: 2px;
        }
        .nav__mobile-inner {
          background: rgba(15, 17, 35, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 14px;
          padding: 8px;
          margin-top: 4px;
        }
        .nav--scrolled .nav__mobile-inner {
          background: rgba(255, 255, 255, 0.97);
          border-color: rgba(15, 23, 42, 0.08);
        }
        .nav__mobile-link {
          font-size: 14px;
          font-weight: 500;
          padding: 11px 16px;
          border-radius: 8px;
          text-decoration: none;
          display: block;
          transition: background 0.15s;
          color: rgba(255, 255, 255, 0.8);
        }
        .nav__mobile-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: white;
        }
        .nav--scrolled .nav__mobile-link {
          color: var(--dark);
        }
        .nav--scrolled .nav__mobile-link:hover {
          background: rgba(124, 28, 46, 0.06);
          color: var(--burgundy);
        }
        .nav__mobile-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.07);
          margin: 6px 8px;
        }
        .nav--scrolled .nav__mobile-divider {
          background: rgba(15, 23, 42, 0.08);
        }
        .nav__mobile-cta {
          margin: 8px 8px 4px;
          padding: 11px 16px;
          background: var(--burgundy);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          display: block;
          transition: opacity 0.15s;
        }
        .nav__mobile-cta:hover { opacity: 0.9; }

        @media (max-width: 768px) {
          .nav__links, .nav__cta { display: none; }
          .nav__hamburger { display: flex; }
          .nav__mobile { display: flex; }
          .nav__glass { margin: 10px 16px; padding: 10px 16px; }
        }
      `}</style>

      <nav className={`nav ${showScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__glass">
          {/* Logo */}
          <Link to="/" className="nav__logo">
            <div className="nav__logo-mark">K</div>
            <div className="nav__logo-text">
              <span className="nav__logo-name">Klair</span>
              <span className="nav__logo-sub">Computer</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="nav__links">
            {homeLinks.map(l => (
              <li key={l.label}>
                {l.isRoute ? (
                  <Link
                    to={l.href}
                    className={`nav__link ${
                      (location.pathname === l.href || (l.href === '/login' && location.pathname.startsWith('/dashboard')))
                        ? 'nav__link--active' : ''
                    } ${l.href === '/login' ? 'nav__link--monitoring' : ''}`}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={isHome ? l.href : `/${l.href}`}
                    className="nav__link"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={isHome ? '#contact' : '/#contact'} className="nav__cta">Get a Quote</a>
            <button className="nav__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="nav__mobile">
            <div className="nav__mobile-inner">
              {homeLinks.map(l => (
                l.isRoute ? (
                  <Link key={l.label} to={l.href} className="nav__mobile-link" onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={isHome ? l.href : `/${l.href}`} className="nav__mobile-link"
                    onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </a>
                )
              ))}
              <div className="nav__mobile-divider" />
              <a href={isHome ? '#contact' : '/#contact'} className="nav__mobile-cta" onClick={() => setMenuOpen(false)}>
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
