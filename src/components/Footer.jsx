export default function Footer({ onPolicyClick }) {
  const currentYear = new Date().getFullYear()

  const links = {
    Services: [
      { label: 'Managed IT Services', href: '#services' },
      { label: 'Network & Security', href: '#services' },
      { label: 'Cloud & Backup', href: '#services' },
      { label: 'Support & Maintenance', href: '#services' },
    ],
    Products: [
      { label: 'Klair Invoice', href: 'https://invoice.digital1now.com' },
      { label: 'Hotel TV Portal', href: 'https://app.digital1now.com' },
      { label: 'Custom Dashboards', href: '#contact' },
      { label: 'Custom Software', href: '#contact' },
    ],
    Company: [
      { label: 'Why Klair', href: '#why-klair' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Get a Quote', href: '#contact' },
    ],
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .footer {
          background: #0f172a;
          color: white;
          padding: 72px 24px 0;
        }
        .footer__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer__top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer__brand-mark {
          width: 44px;
          height: 44px;
          background: var(--burgundy);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          margin-bottom: 16px;
        }
        .footer__brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: white;
          margin-bottom: 2px;
        }
        .footer__brand-sub {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
        }
        .footer__brand-desc {
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 280px;
        }
        .footer__socials {
          display: flex;
          gap: 10px;
        }
        .footer__social {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.15s;
        }
        .footer__social:hover {
          background: var(--burgundy);
          border-color: var(--burgundy);
        }
        .footer__col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }
        .footer__links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
        }
        .footer__link {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer__link:hover { color: white; }
        .footer__bottom {
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer__copy {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }
        .footer__copy span { color: var(--burgundy); }
        .footer__bottom-links {
          display: flex;
          gap: 24px;
        }
        .footer__bottom-link {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.15s;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
        }
        .footer__bottom-link:hover { color: rgba(255,255,255,0.6); }
        .footer__badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 14px;
          margin-bottom: 24px;
        }
        .footer__badge-dot {
          width: 8px; height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .footer__badge-text {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          .footer__top {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 540px) {
          .footer { padding: 48px 20px 0; }
          .footer__top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer__bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .footer__bottom-links { flex-wrap: wrap; gap: 16px; }
        }
      `}} />

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">

            {/* Brand column */}
            <div>
              <div className="footer__brand-mark">K</div>
              <div className="footer__brand-name">Klair Computer</div>
              <div className="footer__brand-sub">MSP & SaaS Solutions</div>
              <div className="footer__badge">
                <div className="footer__badge-dot" />
                <span className="footer__badge-text">Serving Edmonton since 2008</span>
              </div>
              <p className="footer__brand-desc">
                Enterprise IT support, cybersecurity, cloud solutions,
                and in-house software — all from one local Edmonton team.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social" aria-label="LinkedIn">💼</a>
                <a href="#" className="footer__social" aria-label="Facebook">📘</a>
                <a href="#" className="footer__social" aria-label="Twitter">🐦</a>
                <a href="mailto:info@klair.ca" className="footer__social" aria-label="Email">📧</a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <div className="footer__col-title">{title}</div>
                <ul className="footer__links">
                  {items.map(item => (
                    <li key={item.label}>
                      <a href={item.href} className="footer__link"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="footer__bottom">
            <div className="footer__copy">
              © {currentYear} <span>Klair Computer Inc.</span> All rights reserved.
            </div>
            <div className="footer__bottom-links">
              <button type="button" className="footer__bottom-link" onClick={() => onPolicyClick('privacy')}>Privacy Policy</button>
              <button type="button" className="footer__bottom-link" onClick={() => onPolicyClick('terms')}>Terms of Service</button>
              <button type="button" className="footer__bottom-link" onClick={() => onPolicyClick('cookies')}>Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}