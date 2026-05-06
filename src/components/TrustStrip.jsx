import { useState, useEffect } from 'react'

export default function TrustStrip() {
  const partners = [
    {
      name: 'Microsoft',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="1" y="1" width="10.5" height="10.5" fill="#f25022"/>
          <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7fba00"/>
          <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00a4ef"/>
          <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#ffb900"/>
        </svg>
      ),
    },
    {
      name: 'Cisco',
      icon: (
        <svg width="32" height="24" viewBox="0 0 48 24" fill="none">
          <rect x="21" y="8" width="6" height="12" rx="3" fill="#049fd9"/>
          <rect x="12" y="11" width="6" height="9" rx="3" fill="#049fd9"/>
          <rect x="30" y="11" width="6" height="9" rx="3" fill="#049fd9"/>
          <rect x="3" y="14" width="6" height="6" rx="3" fill="#049fd9"/>
          <rect x="39" y="14" width="6" height="6" rx="3" fill="#049fd9"/>
        </svg>
      ),
    },
    {
      name: 'Trend Micro',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#d71921"/>
          <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: 'Brother',
      icon: (
        <svg width="28" height="24" viewBox="0 0 48 24" fill="none">
          <rect x="2" y="4" width="44" height="16" rx="3" fill="#003087"/>
          <text x="24" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">brother</text>
        </svg>
      ),
    },
    {
      name: 'Xerox',
      icon: (
        <svg width="28" height="24" viewBox="0 0 48 24" fill="none">
          <circle cx="24" cy="12" r="10" fill="#E4002B"/>
          <text x="24" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">XEROX</text>
        </svg>
      ),
    },
  ]

  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActive(prev => (prev + 1) % partners.length)
        setVisible(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .trust {
          background: var(--off-white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 24px 0;
          overflow: hidden;
        }
        .trust__inner {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .trust__top {
          width: 100%;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .trust__label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }
        .trust__label-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: var(--border);
        }
        .trust__certified {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .trust__certified-text {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          white-space: nowrap;
        }
        .trust__certified-badge {
          font-size: 11px;
          font-weight: 700;
          color: var(--burgundy);
          background: var(--burgundy-muted);
          border-radius: 4px;
          padding: 2px 8px;
          white-space: nowrap;
        }
        .trust__fade-row {
          border-top: 1px solid var(--border);
          padding: 16px 24px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
        }
        .trust__partner {
          display: flex;
          align-items: center;
          gap: 10px;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .trust__partner--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .trust__partner--hidden {
          opacity: 0;
          transform: translateY(6px);
        }
        .trust__partner-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--dark);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .trust__dots {
          display: flex;
          gap: 6px;
        }
        .trust__dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s;
          background: var(--border);
        }
        .trust__dot--active {
          background: var(--burgundy);
          width: 18px;
          border-radius: 3px;
        }
        @media (max-width: 768px) {
          .trust__label-line { max-width: 60px; }
        }
      `}} />

      <div className="trust">
        <div className="trust__inner">

          {/* Top row */}
          <div className="trust__top">
            <div className="trust__label-line" />
            <div className="trust__label">Certified Partners</div>
            <div className="trust__certified">
              <span className="trust__certified-text">Edmonton Based</span>
              <span className="trust__certified-badge">Since 2008</span>
            </div>
            <div className="trust__label-line" />
          </div>

          {/* Fade row */}
          <div className="trust__fade-row">
            <div className={`trust__partner ${visible ? 'trust__partner--visible' : 'trust__partner--hidden'}`}>
              {partners[active].icon}
              <span className="trust__partner-name">{partners[active].name}</span>
            </div>
            <div className="trust__dots">
              {partners.map((_, i) => (
                <button
                  key={i}
                  className={`trust__dot ${i === active ? 'trust__dot--active' : ''}`}
                  onClick={() => { setVisible(false); setTimeout(() => { setActive(i); setVisible(true) }, 400) }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}