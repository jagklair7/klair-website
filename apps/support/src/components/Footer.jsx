import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <p>© {currentYear} Klair Computer. All rights reserved.</p>
          <div className="footer__links">
            <a href="https://klair.com">Main Website</a>
            <a href="https://klair.com#contact">Contact Us</a>
            <a href="https://klair.com#services">Services</a>
          </div>
        </div>
        <div className="footer__contact">
          <p>Phone: <a href="tel:+17805550123">(780) 555-0123</a></p>
          <p>Email: <a href="mailto:support@klair.com">support@klair.com</a></p>
        </div>
      </div>
    </footer>
  )
}
