export default function CookiePolicy() {
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
          <div className="policy__eyebrow">Cookie Policy</div>
          <h1 className="policy__heading">How we use cookies on this site</h1>
          <p className="policy__intro">
            Klair Computer Inc. uses cookies and similar technologies to improve your experience and help our website function correctly.
          </p>

          <div className="policy__section">
            <h2>What are cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help the site remember preferences and support analytics.
            </p>
          </div>

          <div className="policy__section">
            <h2>How we use cookies</h2>
            <ul>
              <li>Essential cookies for core website functionality.</li>
              <li>Performance cookies to understand how visitors use the site.</li>
              <li>Preference cookies to remember language or display settings.</li>
            </ul>
          </div>

          <div className="policy__section">
            <h2>Managing cookies</h2>
            <p>
              You can control cookies through your browser settings and privacy preferences. Disabling cookies may affect site functionality.
            </p>
          </div>

          <div className="policy__section">
            <h2>Third-party cookies</h2>
            <p>
              We may use third-party services that set cookies for analytics or content delivery. These cookies are subject to the third party's own privacy policies.
            </p>
          </div>

          <div className="policy__section">
            <h2>Contact</h2>
            <p>
              If you have questions about our Cookie Policy, contact us at info@klair.ca.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
