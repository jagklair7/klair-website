import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitting(true)
    // TODO: wire up to email service (Resend, Formspree, etc.)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    setSubmitting(false)
  }

  const contactInfo = [
    { icon: '📍', label: 'Location', value: 'Edmonton, Alberta, Canada' },
    { icon: '📞', label: 'Phone', value: '(780) 265-0042', href: 'tel:+17802650042' },
    { icon: '📧', label: 'Email', value: 'info@klair.ca', href: 'mailto:info@klair.ca' },
    { icon: '🕐', label: 'Hours', value: 'Mon–Fri 8am–5pm MST' },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .contact {
          padding: 96px 24px;
          background: var(--off-white);
        }
        .contact__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .contact__eyebrow {
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
        .contact__eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--burgundy);
          border-radius: 2px;
        }
        .contact__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          max-width: 480px;
        }
        .contact__sub {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 56px;
        }
        .contact__layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: start;
        }
        .contact__info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact__info-card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
        }
        .contact__info-card:hover {
          border-color: var(--burgundy);
          box-shadow: 0 4px 16px rgba(124,28,46,0.08);
        }
        .contact__info-icon {
          font-size: 22px;
          width: 44px;
          height: 44px;
          background: var(--burgundy-muted);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact__info-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2px;
        }
        .contact__info-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--dark);
          text-decoration: none;
          transition: color 0.15s;
        }
        a.contact__info-value:hover { color: var(--burgundy); }
        .contact__form-card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 40px;
        }
        .contact__form-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }
        .contact__form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .contact__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact__field--full {
          grid-column: 1 / -1;
        }
        .contact__label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .contact__input,
        .contact__select,
        .contact__textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--dark);
          background: var(--off-white);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 11px 14px;
          outline: none;
          transition: all 0.15s;
          width: 100%;
        }
        .contact__input:focus,
        .contact__select:focus,
        .contact__textarea:focus {
          border-color: var(--burgundy);
          box-shadow: 0 0 0 3px rgba(124,28,46,0.08);
          background: white;
        }
        .contact__textarea {
          resize: vertical;
          min-height: 120px;
        }
        .contact__submit {
          width: 100%;
          padding: 14px;
          background: var(--burgundy);
          color: white;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .contact__submit:hover:not(:disabled) {
          background: var(--burgundy-light);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(124,28,46,0.3);
        }
        .contact__submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .contact__success {
          text-align: center;
          padding: 48px 24px;
        }
        .contact__success-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .contact__success-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: var(--dark);
          margin-bottom: 8px;
        }
        .contact__success-sub {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .contact__layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .contact { padding: 64px 20px; }
          .contact__form-card { padding: 24px 20px; }
          .contact__form-grid { grid-template-columns: 1fr; }
          .contact__field--full { grid-column: 1; }
        }
      `}} />

      <section id="contact" className="contact">
        <div className="contact__inner">
          <div className="contact__eyebrow">Get In Touch</div>
          <h2 className="contact__heading">
            Let's talk about<br />your IT needs.
          </h2>
          <p className="contact__sub">
            Whether you need managed IT support, a custom software solution,
            or just want to know where to start — we're here to help.
          </p>

          <div className="contact__layout">
            {/* Contact info */}
            <div className="contact__info">
              {contactInfo.map(c => (
                <div key={c.label} className="contact__info-card">
                  <div className="contact__info-icon">{c.icon}</div>
                  <div>
                    <div className="contact__info-label">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="contact__info-value">{c.value}</a>
                    ) : (
                      <div className="contact__info-value">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="contact__form-card">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-icon">✅</div>
                  <div className="contact__success-title">Message Sent!</div>
                  <div className="contact__success-sub">
                    Thanks for reaching out. A member of our team will
                    get back to you within one business day.
                  </div>
                </div>
              ) : (
                <>
                  <div className="contact__form-title">Send us a message</div>
                  <div className="contact__form-grid">
                    <div className="contact__field">
                      <label className="contact__label">Full Name *</label>
                      <input className="contact__input" name="name"
                        placeholder="John Smith"
                        value={form.name} onChange={handleChange} />
                    </div>
                    <div className="contact__field">
                      <label className="contact__label">Email *</label>
                      <input className="contact__input" name="email" type="email"
                        placeholder="john@company.com"
                        value={form.email} onChange={handleChange} />
                    </div>
                    <div className="contact__field">
                      <label className="contact__label">Phone</label>
                      <input className="contact__input" name="phone" type="tel"
                        placeholder="(780) 555-0000"
                        value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="contact__field">
                      <label className="contact__label">Company</label>
                      <input className="contact__input" name="company"
                        placeholder="Acme Corp"
                        value={form.company} onChange={handleChange} />
                    </div>
                    <div className="contact__field contact__field--full">
                      <label className="contact__label">I'm interested in</label>
                      <select className="contact__select" name="service"
                        value={form.service} onChange={handleChange}>
                        <option value="">Select a service...</option>
                        <option value="managed-it">Managed IT Services</option>
                        <option value="network-security">Network & Security</option>
                        <option value="cloud-backup">Cloud & Backup</option>
                        <option value="support">Support & Maintenance</option>
                        <option value="invoice">Klair Invoice</option>
                        <option value="hotel-tv">Hotel TV Portal</option>
                        <option value="custom">Custom Software</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="contact__field contact__field--full">
                      <label className="contact__label">Message *</label>
                      <textarea className="contact__textarea" name="message"
                        placeholder="Tell us about your business and what you're looking for..."
                        value={form.message} onChange={handleChange} />
                    </div>
                  </div>
                  <button className="contact__submit"
                    onClick={handleSubmit}
                    disabled={submitting || !form.name || !form.email || !form.message}>
                    {submitting ? (
                      <>
                        <div style={{
                          width: 16, height: 16,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: 'white',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite'
                        }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}