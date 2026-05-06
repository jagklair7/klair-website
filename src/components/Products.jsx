export default function Products() {
  const products = [
    {
      tag: 'Live',
      tagColor: '#dcfce7',
      tagText: '#166534',
      icon: '🧾',
      name: 'Klair Invoice',
      desc: 'A full-featured invoicing and billing platform built for small to mid-size businesses. Send invoices, track payments, and manage customers — all in one place.',
      url: 'https://invoice.digital1now.com',
      urlLabel: 'invoice.digital1now.com',
      features: ['Invoice Management', 'Payment Tracking', 'Customer Portal', 'PDF Export', 'Multi-Org Support'],
      accent: '#7c1c2e',
      muted: '#f5e8eb',
    },
    {
      tag: 'Live',
      tagColor: '#dcfce7',
      tagText: '#166534',
      icon: '📺',
      name: 'Hotel TV Portal',
      desc: 'A custom hotel TV management system that lets hospitality businesses control in-room entertainment, branding, and guest information displays from one dashboard.',
      url: 'https://app.digital1now.com',
      urlLabel: 'app.digital1now.com',
      features: ['Room Management', 'Custom Branding', 'Content Control', 'Guest Info Display', 'Remote Updates'],
      accent: '#1a237e',
      muted: '#e8eaf6',
    },
    {
      tag: 'Coming Soon',
      tagColor: '#fef9c3',
      tagText: '#854d0e',
      icon: '📊',
      name: 'Custom Dashboards',
      desc: 'Bespoke business intelligence dashboards tailored to your workflows. Visualize your data, track KPIs, and make better decisions — built specifically for your business.',
      url: null,
      urlLabel: null,
      features: ['Custom KPIs', 'Data Visualization', 'Role-Based Access', 'Live Data', 'Export Reports'],
      accent: '#7c1c2e',
      muted: '#f5e8eb',
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .products {
          padding: 96px 24px;
          background: var(--off-white);
        }
        .products__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .products__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--navy);
          margin-bottom: 16px;
        }
        .products__eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--navy);
          border-radius: 2px;
        }
        .products__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .products__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          max-width: 520px;
        }
        .products__heading-accent {
          color: var(--burgundy);
          font-style: italic;
        }
        .products__sub {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 360px;
        }
        .products__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .products__card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .products__card:hover {
          border-color: transparent;
          box-shadow: 0 12px 48px rgba(15,23,42,0.1);
          transform: translateY(-3px);
        }
        .products__card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .products__card-icon {
          font-size: 36px;
          line-height: 1;
        }
        .products__card-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
        }
        .products__card-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--dark);
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }
        .products__card-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 24px;
          flex: 1;
        }
        .products__card-features {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }
        .products__card-feature {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 0.02em;
        }
        .products__card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.15s;
        }
        .products__card-link:hover { gap: 10px; }
        .products__card-link--disabled {
          color: var(--muted);
          cursor: default;
          font-size: 13px;
          font-weight: 500;
        }
        .products__bottom {
          margin-top: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          gap: 16px;
          padding: 48px;
          border: 2px dashed var(--border);
          border-radius: 20px;
        }
        .products__bottom-icon {
          font-size: 32px;
        }
        .products__bottom-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: var(--dark);
          letter-spacing: -0.01em;
        }
        .products__bottom-sub {
          font-size: 14px;
          color: var(--muted);
          max-width: 400px;
          line-height: 1.6;
        }
        .products__bottom-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--burgundy);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          margin-top: 8px;
        }
        .products__bottom-btn:hover {
          background: var(--burgundy-light);
          transform: translateY(-1px);
        }
        @media (max-width: 900px) {
          .products__grid { grid-template-columns: 1fr; }
          .products__header { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 540px) {
          .products { padding: 64px 20px; }
          .products__bottom { padding: 32px 20px; }
        }
      `}} />

      <section id="products" className="products">
        <div className="products__inner">

          <div className="products__eyebrow">In-House Software</div>

          <div className="products__header">
            <h2 className="products__heading">
              Software <span className="products__heading-accent">built</span> by us.<br />
              Deployed for you.
            </h2>
            <p className="products__sub">
              We don't just recommend software — we build it.
              Every product we offer was created to solve a real problem
              for businesses we work with every day.
            </p>
          </div>

          <div className="products__grid">
            {products.map(p => (
              <div key={p.name} className="products__card">
                <div className="products__card-top">
                  <span className="products__card-icon">{p.icon}</span>
                  <span className="products__card-tag"
                    style={{ background: p.tagColor, color: p.tagText }}>
                    {p.tag}
                  </span>
                </div>
                <div className="products__card-name">{p.name}</div>
                <div className="products__card-desc">{p.desc}</div>
                <div className="products__card-features">
                  {p.features.map(f => (
                    <span key={f} className="products__card-feature"
                      style={{ background: p.muted, color: p.accent }}>
                      {f}
                    </span>
                  ))}
                </div>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="products__card-link"
                    style={{ color: p.accent }}>
                    {p.urlLabel}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ) : (
                  <span className="products__card-link--disabled">
                    🚧 In Development
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="products__bottom">
            <div className="products__bottom-icon">💡</div>
            <div className="products__bottom-title">Have a custom project in mind?</div>
            <div className="products__bottom-sub">
              We've built invoicing systems, hotel portals, and custom dashboards.
              If you have a workflow problem, we'll build you a solution.
            </div>
            <a href="#contact" className="products__bottom-btn">
              Tell Us About Your Project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}