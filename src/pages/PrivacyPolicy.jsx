export default function PrivacyPolicy() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .policy {
          padding: 96px 24px;
          background: var(--off-white);
          min-height: 70vh;
        }
        .policy__inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .policy__eyebrow {
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
        .policy__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          color: var(--dark);
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .policy__intro,
        .policy__section p,
        .policy__section li {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.8;
        }
        .policy__section {
          margin-top: 32px;
        }
        .policy__section h2 {
          font-size: 22px;
          margin-bottom: 12px;
          color: var(--dark);
        }
        .policy__section ul {
          padding-left: 20px;
          margin-top: 12px;
        }
        .policy__section li {
          margin-bottom: 10px;
        }
      `}} />

      <section className="policy">
        <div className="policy__inner">
          <div className="policy__eyebrow">Privacy Policy</div>
          <h1 className="policy__heading">How we collect and protect your information</h1>
          <p className="policy__intro">
            Klair Computer Inc. is committed to protecting your privacy. This policy explains the kinds of personal information we collect, how we use it, and your rights.
          </p>

          <div className="policy__section">
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly through our website contact forms, including your name, email address, phone number, company, service interest, and message content.
            </p>
          </div>

          <div className="policy__section">
            <h2>How We Use Your Information</h2>
            <p>
              We use submitted information to respond to inquiries, provide services, send updates, and improve our website experience.
            </p>
          </div>

          <div className="policy__section">
            <h2>Cookies and Tracking</h2>
            <p>
              Our website may use cookies or similar tracking technologies to enable basic functionality and improve performance.
            </p>
          </div>

          <div className="policy__section">
            <h2>Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share information with service providers who help us operate the website and deliver communications.
            </p>
          </div>

          <div className="policy__section">
            <h2>Contact Information</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your information, please contact us at info@klair.ca.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
