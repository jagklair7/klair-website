import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="https://klair.com" className="navbar__logo">
          <span className="navbar__logo-k">K</span>
          <span className="navbar__logo-text">Klair Support</span>
        </a>
        <a href="https://klair.com" className="navbar__back">← Back to Klair</a>
      </div>
    </nav>
  )
}
