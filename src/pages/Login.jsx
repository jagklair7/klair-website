import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/monitoring')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        .login-wrap {
          min-height: 100vh;
          background: #07090f;
          background-image:
            radial-gradient(ellipse 60% 50% at 15% 0%, rgba(0,229,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 85% 100%, rgba(167,139,250,0.07) 0%, transparent 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Syne', sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
        }

        /* Wordmark */
        .login-wordmark {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
          justify-content: center;
        }
        .login-wordmark__logo {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #00e5ff, #a78bfa);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 17px;
          font-weight: 700;
          color: #07090f;
        }
        .login-wordmark__text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .login-wordmark__name {
          font-size: 15px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.01em;
        }
        .login-wordmark__sub {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* Panel */
        .login-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
        }
        .login-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          opacity: 0.4;
        }

        .login-panel__title {
          font-size: 22px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .login-panel__sub {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
          font-family: 'Space Mono', monospace;
        }

        /* Form */
        .login-field {
          margin-bottom: 16px;
        }
        .login-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
        }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'Space Mono', monospace;
          color: white;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: rgba(255,255,255,0.2); }
        .login-input:focus {
          border-color: rgba(0,229,255,0.4);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.08);
        }

        /* Error */
        .login-error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 12px;
          color: #f87171;
          margin-bottom: 16px;
          font-family: 'Space Mono', monospace;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Submit */
        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #00c8e0, #00e5ff);
          border: none;
          border-radius: 10px;
          padding: 13px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          color: #07090f;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 8px;
          letter-spacing: 0.02em;
        }
        .login-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .login-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(7,9,15,0.2);
          border-top-color: #07090f;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .login-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }
        .login-footer a {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.15s;
        }
        .login-footer a:hover { color: #00e5ff; }

        /* Grid decoration */
        .login-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }
      `}</style>

      <div className="login-grid" />

      <div className="login-wrap">
        <div className="login-card">

          {/* Wordmark */}
          <div className="login-wordmark">
            <div className="login-wordmark__logo">K</div>
            <div className="login-wordmark__text">
              <span className="login-wordmark__name">Klair Monitoring</span>
              <span className="login-wordmark__sub">Secure Portal</span>
            </div>
          </div>

          {/* Panel */}
          <div className="login-panel">
            <div className="login-panel__title">Sign in</div>
            <div className="login-panel__sub">Enter your credentials to access the dashboard</div>

            {error && (
              <div className="login-error">
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <label className="login-label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  className="login-input"
                  placeholder="you@klair.ca"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading && <span className="login-spinner" />}
                {loading ? 'Signing in…' : 'Sign in →'}
              </button>
            </form>
          </div>

          <div className="login-footer">
            <Link to="/">← Back to Klair Computer</Link>
          </div>

        </div>
      </div>
    </>
  )
}
