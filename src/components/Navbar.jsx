import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On non-home pages, always show scrolled (white) style
  const showScrolled = scrolled || !isHome

  const homeLinks = [
    { label: 'Services',  href: '#services'  },
    { label: 'Products',  href: '#products'  },
    { label: 'Why Klair', href: '#why-klair' },
    { label: 'Blog',      href: '/blog', isRoute: true },
    { label: 'Contact',   href: '#contact'   },
  ]

  return (
    <>
      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.3s ease;
          padding: 20px 0;
          background: transparent;
        }
        .nav--scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 24px rgba(15,23,42,0.08);
          padding: 12px 0;
        }
        .nav__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nav__logo-mark {
          width: 36px;
          height: 36px;
          background: var(--burgundy);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: -0.02em;
        }
        .nav__logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .nav__logo-name {
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: var(--burgundy);
          letter-spacing: -0.01em;
        }
        .nav__logo-sub {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--navy);
        }
        .nav__links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .nav__link {
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          transition: color 0.15s;
          text-decoration: none;
        }
        .nav__link:hover { color: var(--burgundy); }
        .nav__link--active { color: var(--burgundy) !important; font-weight: 700; }
        .nav__cta {
          font-size: 13px;
          font-weight: 600;
          color: white;
          background: var(--burgundy);
          border: none;
          border-radius: 8px;
          padding: 9px 20px;
          transition: background 0.15s;
          text-decoration: none;
          cursor: pointer;
        }
        .nav__cta:hover { background: var(--burgundy-light); }
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
          width: 22px;
          height: 2px;
          background: var(--dark);
          border-radius: 2px;
          transition: all 0.2s;
        }
        .nav__mobile {
          display: none;
          flex-direction: column;
          background: white;
          border-top: 1px solid var(--border);
          padding: 16px 24px;
          gap: 4px;
        }
        .nav__mobile-link {
          font-size: 15px;
          font-weight: 500;
          color: var(--dark);
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
        }
        .nav__mobile-cta {
          margin-top: 12px;
          width: 100%;
          padding: 12px;
          background: var(--burgundy);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          display: block;
        }
        @media (max-width: 768px) {
          .nav__links, .nav__cta { display: none; }
          .nav__hamburger { display: flex; }
          .nav__mobile { display: ${menuOpen ? 'flex' : 'none'}; }
        }
      `}</style>

      <nav className={`nav ${showScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__logo">
            <div className="nav__logo-mark">K</div>
            <div className="nav__logo-text">
              <span className="nav__logo-name">Klair</span>
              <span className="nav__logo-sub">Computer</span>
            </div>
          </Link>

          <ul className="nav__links">
            {homeLinks.map(l => (
              <li key={l.label}>
                {l.isRoute ? (
                  <Link
                    to={l.href}
                    className={`nav__link ${location.pathname.startsWith('/blog') ? 'nav__link--active' : ''}`}
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

          <a href={isHome ? '#contact' : '/#contact'} className="nav__cta">Get a Quote</a>

          <button className="nav__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>

        <div className="nav__mobile">
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
          <a href={isHome ? '#contact' : '/#contact'} className="nav__mobile-cta" onClick={() => setMenuOpen(false)}>
            Get a Quote
          </a>
        </div>
      </nav>
    </>
  )
}
