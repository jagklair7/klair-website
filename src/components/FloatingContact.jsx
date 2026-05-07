//src/components/FloatingContact.jsx
import { useState } from 'react'

const PHONE = '17802650042'
const EMAIL = 'info@klair.ca'

const buttons = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: `https://wa.me/${PHONE}`,
    bg: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    key: 'phone',
    label: 'Call Us',
    href: `tel:+${PHONE}`,
    bg: '#4CAF50',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    key: 'sms',
    label: 'Text Us',
    href: `sms:+${PHONE}`,
    bg: '#FF6B35',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
      </svg>
    ),
  },
  {
    key: 'email',
    label: 'Email Us',
    href: `mailto:${EMAIL}`,
    bg: '#7C1C2E',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .fc-wrap {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 12px;
        }
        .fc-toggle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--burgundy, #7C1C2E);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(124,28,46,0.45);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
          position: relative;
          z-index: 2;
        }
        .fc-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(124,28,46,0.55);
        }
        .fc-toggle-icon {
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fc-toggle-icon.open {
          transform: rotate(45deg);
        }
        .fc-items {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 10px;
        }
        .fc-item {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(16px) scale(0.85);
          transition: opacity 0.25s, transform 0.3s cubic-bezier(.34,1.56,.64,1);
          pointer-events: none;
        }
        .fc-item.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .fc-item:nth-child(1) { transition-delay: 0.00s; }
        .fc-item:nth-child(2) { transition-delay: 0.05s; }
        .fc-item:nth-child(3) { transition-delay: 0.10s; }
        .fc-item:nth-child(4) { transition-delay: 0.15s; }
        .fc-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          box-shadow: 0 3px 12px rgba(0,0,0,0.25);
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
          flex-shrink: 0;
        }
        .fc-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .fc-label {
          background: rgba(20,20,20,0.82);
          backdrop-filter: blur(6px);
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 6px;
          white-space: nowrap;
          letter-spacing: 0.02em;
          pointer-events: none;
        }
        @media (max-width: 480px) {
          .fc-wrap { bottom: 20px; right: 16px; }
          .fc-label { display: none; }
        }
        @keyframes fc-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(124,28,46,0.45); }
          50% { box-shadow: 0 4px 28px rgba(124,28,46,0.7), 0 0 0 8px rgba(124,28,46,0.1); }
        }
        .fc-toggle.idle {
          animation: fc-pulse 2.5s ease-in-out infinite;
        }
      `}} />

      <div className="fc-wrap">
        <button
          className={`fc-toggle ${open ? '' : 'idle'}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Contact options"
        >
          <span className={`fc-toggle-icon ${open ? 'open' : ''}`}>
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" width="22" height="22">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            )}
          </span>
        </button>

        <div className="fc-items">
          {buttons.map((btn, i) => (
            <div key={btn.key} className={`fc-item ${open ? 'visible' : ''}`} style={{ transitionDelay: open ? `${i * 0.05}s` : '0s' }}>
              <span className="fc-label">{btn.label}</span>
              <a
                href={btn.href}
                className="fc-btn"
                style={{ background: btn.bg }}
                aria-label={btn.label}
                target={btn.key === 'whatsapp' ? '_blank' : undefined}
                rel={btn.key === 'whatsapp' ? 'noopener noreferrer' : undefined}
              >
                {btn.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
