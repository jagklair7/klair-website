export default function TermsOfService() {
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
          <div className="policy__eyebrow">Terms of Service</div>
          <h1 className="policy__heading">Terms and conditions for using our website</h1>
          <p className="policy__intro">
            These Terms of Service govern your use of the Klair Computer Inc. website and any related services we provide.
          </p>

          <div className="policy__section">
            <h2>Acceptance</h2>
            <p>
              By using this website, you agree to these terms. If you do not agree, please do not use this site.
            </p>
          </div>

          <div className="policy__section">
            <h2>Use of the Website</h2>
            <p>
              You may use the site for lawful business and informational purposes only. You agree not to misuse or interfere with the site.
            </p>
          </div>

          <div className="policy__section">
            <h2>Content and Intellectual Property</h2>
            <p>
              All content on this site is owned by Klair Computer Inc. or its licensors. You may not reproduce or distribute it without permission.
            </p>
          </div>

          <div className="policy__section">
            <h2>Disclaimers</h2>
            <p>
              The site is provided "as is" and we make no warranties regarding accuracy, reliability, or fitness for a particular purpose.
            </p>
          </div>

          <div className="policy__section">
            <h2>Limitation of Liability</h2>
            <p>
              To the extent permitted by law, Klair Computer Inc. is not liable for damages arising from your use of the website.
            </p>
          </div>

          <div className="policy__section">
            <h2>Contact</h2>
            <p>
              If you have questions about these terms, email info@klair.ca.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
