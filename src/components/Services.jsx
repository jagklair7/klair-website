export default function Services() {
  const services = [
    {
      icon: '🖥️',
      title: 'Managed IT Services',
      desc: 'Proactive monitoring, maintenance, and support for your entire IT infrastructure — so you can focus on running your business.',
      items: ['24/7 Monitoring', 'Helpdesk Support', 'Patch Management', 'Asset Tracking'],
      color: '#1a237e',
      muted: '#e8eaf6',
    },
    {
      icon: '🔒',
      title: 'Network & Security',
      desc: 'Enterprise-grade firewall, VPN, and threat detection to keep your business protected from modern cyber threats.',
      items: ['Firewall Management', 'VPN Setup', 'Threat Detection', 'Security Audits'],
      color: '#7c1c2e',
      muted: '#f5e8eb',
    },
    {
      icon: '☁️',
      title: 'Cloud & Backup',
      desc: 'Seamless cloud migration, Microsoft 365 management, and automated backups so your data is always safe and accessible.',
      items: ['Microsoft 365', 'Cloud Migration', 'Automated Backups', 'Disaster Recovery'],
      color: '#1a237e',
      muted: '#e8eaf6',
    },
    {
      icon: '🛠️',
      title: 'Support & Maintenance',
      desc: 'On-site and remote support when you need it. Hardware repairs, software installs, and everything in between.',
      items: ['On-site Support', 'Remote Support', 'Hardware Repair', 'Software Setup'],
      color: '#7c1c2e',
      muted: '#f5e8eb',
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .services {
          padding: 96px 24px;
          background: var(--white);
        }
        .services__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .services__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--burgundy);
          margin-bottom: 16px;
        }
        .services__eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--burgundy);
          border-radius: 2px;
        }
        .services__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          max-width: 560px;
        }
        .services__sub {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 56px;
        }
        .services__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .services__card {
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          background: white;
        }
        .services__card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--burgundy), var(--navy));
          opacity: 0;
          transition: opacity 0.2s;
        }
        .services__card:hover {
          border-color: transparent;
          box-shadow: 0 8px 40px rgba(15,23,42,0.1);
          transform: translateY(-2px);
        }
        .services__card:hover::before { opacity: 1; }
        .services__card-icon {
          font-size: 32px;
          margin-bottom: 16px;
          display: block;
        }
        .services__card-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .services__card-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .services__card-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .services__card-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 0.03em;
        }
        .services__cta {
          margin-top: 56px;
          background: linear-gradient(135deg, #0f172a 0%, #1a237e 60%, #7c1c2e 100%);
          border-radius: 20px;
          padding: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .services__cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: white;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }
        .services__cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
        }
        .services__cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: white;
          color: var(--burgundy);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          transition: all 0.2s;
          text-decoration: none;
        }
        .services__cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .services__grid { grid-template-columns: 1fr; }
          .services__cta { padding: 32px 24px; }
          .services__cta-title { font-size: 22px; }
        }
      `}} />

      <section id="services" className="services">
        <div className="services__inner">
          <div className="services__eyebrow">Managed IT Services</div>
          <h2 className="services__heading">
            Everything your business needs.<br />Nothing you don't.
          </h2>
          <p className="services__sub">
            From day-to-day helpdesk support to full network infrastructure —
            we handle your IT so your team can focus on what matters.
          </p>

          <div className="services__grid">
            {services.map(s => (
              <div key={s.title} className="services__card">
                <span className="services__card-icon">{s.icon}</span>
                <div className="services__card-title">{s.title}</div>
                <div className="services__card-desc">{s.desc}</div>
                <div className="services__card-items">
                  {s.items.map(item => (
                    <span key={item} className="services__card-tag"
                      style={{ background: s.muted, color: s.color }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="services__cta">
            <div>
              <div className="services__cta-title">Not sure what you need?</div>
              <div className="services__cta-sub">
                Book a free 30-minute IT assessment — no strings attached.
              </div>
            </div>
            <a href="#contact" className="services__cta-btn">
              Book Free Assessment
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}