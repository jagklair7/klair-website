export default function CTABanner() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .cta {
          padding: 96px 24px;
          background: var(--white);
        }
        .cta__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .cta__card {
          background: linear-gradient(135deg, #0f172a 0%, #1a237e 55%, #7c1c2e 100%);
          border-radius: 28px;
          padding: 80px 64px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .cta__card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .cta__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .cta__orb--1 {
          width: 300px; height: 300px;
          background: rgba(124,28,46,0.3);
          top: -100px; right: 200px;
        }
        .cta__orb--2 {
          width: 200px; height: 200px;
          background: rgba(26,35,126,0.4);
          bottom: -80px; left: 100px;
        }
        .cta__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
        }
        .cta__eyebrow-dot {
          width: 6px; height: 6px;
          background: #9e2a3f;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .cta__title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 48px);
          color: white;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .cta__title-accent {
          background: linear-gradient(135deg, #e8a0aa 0%, #c94060 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta__sub {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          max-width: 480px;
          position: relative;
          z-index: 1;
        }
        .cta__actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .cta__btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 32px;
          background: white;
          color: var(--burgundy);
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          transition: all 0.2s;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }
        .cta__btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .cta__btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 32px;
          background: rgba(255,255,255,0.08);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.2s;
          text-decoration: none;
        }
        .cta__btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }
        .cta__features {
          display: flex;
          gap: 24px;
          margin-top: 32px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .cta__feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .cta__feature-check {
          width: 18px; height: 18px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #4ade80;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .cta__card {
            grid-template-columns: 1fr;
            padding: 48px 32px;
            gap: 32px;
          }
          .cta__actions {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
        @media (max-width: 540px) {
          .cta { padding: 64px 20px; }
          .cta__card { padding: 40px 24px; }
          .cta__actions { flex-direction: column; }
          .cta__features { gap: 12px; }
        }
      `}} />

      <section className="cta">
        <div className="cta__inner">
          <div className="cta__card">
            <div className="cta__orb cta__orb--1" />
            <div className="cta__orb cta__orb--2" />

            <div>
              <div className="cta__eyebrow">
                <span className="cta__eyebrow-dot" />
                Free Consultation
              </div>
              <h2 className="cta__title">
                Ready to upgrade<br />
                your <span className="cta__title-accent">IT experience?</span>
              </h2>
              <p className="cta__sub">
                Book a free 30-minute assessment. We'll review your current setup,
                identify gaps, and show you exactly how Klair can help — no pressure, no sales pitch.
              </p>
              <div className="cta__features">
                {[
                  'No contracts required',
                  'Free IT assessment',
                  'Local Edmonton team',
                  'Same-day response',
                ].map(f => (
                  <div key={f} className="cta__feature">
                    <div className="cta__feature-check">✓</div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="cta__actions">
              <a href="#contact" className="cta__btn-primary">
                Book Free Assessment
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="tel:+17802650042" className="cta__btn-secondary">
                📞 Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}