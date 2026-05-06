export default function WhyKlair() {
  const reasons = [
    {
      icon: '🏗️',
      title: 'We Build What We Sell',
      desc: 'Unlike most MSPs who resell third-party tools, we build our own software. That means deeper integration, faster support, and solutions tailored to how you actually work.',
      accent: '#7c1c2e',
      muted: '#f5e8eb',
    },
    {
      icon: '📍',
      title: 'Local. Edmonton Based.',
      desc: 'We\'re not a call centre in another timezone. We\'re an Edmonton company that shows up on-site, knows the local business landscape, and treats you like a neighbour.',
      accent: '#1a237e',
      muted: '#e8eaf6',
    },
    {
      icon: '⚡',
      title: 'One Team. Everything IT.',
      desc: 'MSP support, cybersecurity, cloud, hardware, and custom software — all from one team. No juggling vendors. No finger-pointing. Just one number to call.',
      accent: '#7c1c2e',
      muted: '#f5e8eb',
    },
    {
      icon: '🔮',
      title: 'Built for Where You\'re Going',
      desc: 'We don\'t just fix what\'s broken — we help you plan ahead. Scalable infrastructure, future-ready software, and a team that grows with your business.',
      accent: '#1a237e',
      muted: '#e8eaf6',
    },
  ]

  const metrics = [
    { value: '< 2hr', label: 'Average Response Time' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '20+', label: 'Years Experience' },
    { value: '5★', label: 'Client Satisfaction' },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .why {
          padding: 96px 24px;
          background: var(--white);
          position: relative;
          overflow: hidden;
        }
        .why::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(124,28,46,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .why__inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .why__eyebrow {
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
        .why__eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--burgundy);
          border-radius: 2px;
        }
        .why__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          max-width: 560px;
        }
        .why__sub {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 64px;
        }
        .why__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .why__reasons {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .why__reason {
          display: flex;
          gap: 20px;
          padding: 24px;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          transition: all 0.2s;
          background: white;
        }
        .why__reason:hover {
          border-color: transparent;
          box-shadow: 0 8px 32px rgba(15,23,42,0.08);
          transform: translateX(4px);
        }
        .why__reason-icon {
          font-size: 28px;
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--off-white);
        }
        .why__reason-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }
        .why__reason-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.7;
        }
        .why__right {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 100px;
        }
        .why__metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .why__metric {
          background: var(--off-white);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.2s;
        }
        .why__metric:hover {
          border-color: var(--burgundy);
          background: var(--burgundy-muted);
        }
        .why__metric-value {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: var(--burgundy);
          line-height: 1;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .why__metric-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.03em;
        }
        .why__quote {
          background: linear-gradient(135deg, #0f172a 0%, #1a237e 60%, #7c1c2e 100%);
          border-radius: 20px;
          padding: 32px;
          color: white;
        }
        .why__quote-text {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          line-height: 1.5;
          color: white;
          margin-bottom: 20px;
          font-style: italic;
        }
        .why__quote-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .why__quote-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .why__quote-name {
          font-size: 14px;
          font-weight: 600;
          color: white;
        }
        .why__quote-role {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
        @media (max-width: 900px) {
          .why__layout { grid-template-columns: 1fr; }
          .why__right { position: static; }
        }
        @media (max-width: 540px) {
          .why { padding: 64px 20px; }
          .why__metrics { grid-template-columns: 1fr 1fr; }
        }
      `}} />

      <section id="why-klair" className="why">
        <div className="why__inner">
          <div className="why__eyebrow">Why Klair</div>
          <h2 className="why__heading">
            The MSP that thinks<br />like a software company.
          </h2>
          <p className="why__sub">
            Most IT companies manage your tech. We manage it, build on top of it,
            and help you get more out of it — all from one team in Edmonton.
          </p>

          <div className="why__layout">
            {/* Left — reasons */}
            <div className="why__reasons">
              {reasons.map(r => (
                <div key={r.title} className="why__reason">
                  <div className="why__reason-icon"
                    style={{ background: r.muted }}>
                    {r.icon}
                  </div>
                  <div>
                    <div className="why__reason-title">{r.title}</div>
                    <div className="why__reason-desc">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — metrics + quote */}
            <div className="why__right">
              <div className="why__metrics">
                {metrics.map(m => (
                  <div key={m.label} className="why__metric">
                    <div className="why__metric-value">{m.value}</div>
                    <div className="why__metric-label">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="why__quote">
                <div className="why__quote-text">
                  "Klair doesn't just fix our computers — they built us a system
                  that actually works for our business. That's rare."
                </div>
                <div className="why__quote-author">
                  <div className="why__quote-avatar">👤</div>
                  <div>
                    <div className="why__quote-name">Local Business Owner</div>
                    <div className="why__quote-role">Edmonton, AB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}