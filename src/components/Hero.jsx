export default function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1a237e 50%, #7c1c2e 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 160px 24px 80px;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero__orb--1 {
          width: 500px; height: 500px;
          background: rgba(124, 28, 46, 0.3);
          top: -100px; right: -100px;
        }
        .hero__orb--2 {
          width: 400px; height: 400px;
          background: rgba(26, 35, 126, 0.4);
          bottom: -100px; left: -100px;
        }
        .hero__orb--3 {
          width: 300px; height: 300px;
          background: rgba(124, 28, 46, 0.15);
          top: 50%; left: 40%;
          transform: translate(-50%, -50%);
        }
        .hero__inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 24px;
        }
        .hero__eyebrow-dot {
          width: 6px; height: 6px;
          background: #9e2a3f;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero__title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 1.1;
          color: white;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        .hero__title-accent {
          background: linear-gradient(135deg, #e8a0aa 0%, #c94060 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__sub {
          font-size: 17px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 480px;
        }
        .hero__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero__btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #7c1c2e;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(124,28,46,0.4);
          text-decoration: none;
        }
        .hero__btn-primary:hover {
          background: #9e2a3f;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(124,28,46,0.5);
        }
        .hero__btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: rgba(255,255,255,0.08);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s;
          text-decoration: none;
        }
        .hero__btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-1px);
        }
        .hero__stats {
          display: flex;
          gap: 32px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hero__stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: white;
          line-height: 1;
          margin-bottom: 4px;
        }
        .hero__stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        .hero__visual {
          position: relative;
          height: 480px;
        }
        .hero__card {
          position: absolute;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 20px 24px;
          color: white;
        }
        .hero__card--main {
          top: 40px; left: 0; right: 40px;
          animation: float 6s ease-in-out infinite;
        }
        .hero__card--secondary {
          bottom: 60px; right: 0; left: 60px;
          animation: float 6s ease-in-out infinite 2s;
        }
        .hero__card--badge {
          top: 50%; right: -20px;
          transform: translateY(-50%);
          padding: 12px 16px;
          animation: float 6s ease-in-out infinite 1s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .hero__card-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }
        .hero__card-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .hero__card-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hero__card-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
        }
        .hero__card-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hero__badge-icon { font-size: 20px; margin-bottom: 4px; }
        .hero__badge-text { font-size: 12px; font-weight: 600; white-space: nowrap; }
        .hero__badge-sub { font-size: 10px; color: rgba(255,255,255,0.5); }
        @media (max-width: 900px) {
          .hero__inner { grid-template-columns: 1fr; gap: 48px; }
          .hero__visual { height: 320px; }
          .hero__sub { max-width: 100%; }
        }
        @media (max-width: 540px) {
          .hero { padding: 100px 20px 60px; }
          .hero__stats { gap: 20px; }
          .hero__visual { display: none; }
        }
      `}} />

      <section className="hero">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />

        <div className="hero__inner">
          <div>
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Edmonton's MSP & SaaS Company
            </div>

            <h1 className="hero__title">
              We Don't Just<br />
              Manage Tech —<br />
              <span className="hero__title-accent">We Build It.</span>
            </h1>

            <p className="hero__sub">
              Klair Computer delivers enterprise-grade IT support, cybersecurity,
              and cloud solutions — plus in-house software built for the businesses we serve.
            </p>

            <div className="hero__actions">
              <a href="#contact" className="hero__btn-primary">
                Get a Free Quote
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#products" className="hero__btn-secondary">
                See Our Products
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="hero__stats">
              <div>
                <div className="hero__stat-value">20+</div>
                <div className="hero__stat-label">Years in Business</div>
              </div>
              <div>
                <div className="hero__stat-value">200+</div>
                <div className="hero__stat-label">Clients Served</div>
              </div>
              <div>
                <div className="hero__stat-value">3+</div>
                <div className="hero__stat-label">In-House Products</div>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__card hero__card--main">
              <div className="hero__card-label">Managed IT Services</div>
              <div className="hero__card-title">Your IT. Handled.</div>
              <div className="hero__card-items">
                {['Network & Security', 'Cloud & Backup', 'Helpdesk Support', '24/7 Monitoring'].map((item, i) => (
                  <div key={i} className="hero__card-item">
                    <div className="hero__card-dot" style={{ background: i % 2 === 0 ? '#9e2a3f' : '#283593' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="hero__card hero__card--secondary">
              <div className="hero__card-label">In-House Software</div>
              <div className="hero__card-title">Built by us. For you.</div>
              <div className="hero__card-items">
                {['Klair Invoice', 'Hotel TV Portal', 'Custom Dashboards'].map((item, i) => (
                  <div key={i} className="hero__card-item">
                    <div className="hero__card-dot" style={{ background: i % 2 === 0 ? '#283593' : '#9e2a3f' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="hero__card hero__card--badge">
              <div className="hero__badge-icon">🏆</div>
              <div className="hero__badge-text">Trusted MSP</div>
              <div className="hero__badge-sub">Since 2008</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}